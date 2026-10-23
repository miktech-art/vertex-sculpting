import { reverbImpulse } from "./reverb.js";
import { wavetableCoefficients } from '../oscillator/wavetable.js';
import { delayFeedback } from "../delay.js";
import { filterSettings } from "../spectral/filter.js";
import { duration, tailDuration, clamp } from "../model.js";
import { voiceEnvelopeAt, futureEnvelope } from "./live-envelope.js";

const RAMP = 0.02;
function createMaster(context, level = 0.72) {
  const master = context.createGain(),
    limiter = context.createDynamicsCompressor();
  master.gain.value = level;
  limiter.threshold.value = -12;
  limiter.knee.value = 8;
  limiter.ratio.value = 12;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.15;
  master.connect(limiter).connect(context.destination);
  return master;
}
function driveCurve(amount) {
  const curve = new Float32Array(2048),
    k = 1 + amount * 18;
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = amount < 0.001 ? x : Math.tanh(x * k) / Math.tanh(k);
  }
  return curve;
}

// Future external audio adapters can implement trigger/update/stop with the same clock.
export class NativeAudioEngine {
  constructor() {
    this.context = null;
    this.voices = new Set();
    this.impulses = new Map();
    this.waves = new Map();
    this.muted = false;
  }
  async init() {
    if (!this.context) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) throw new Error("This browser does not support Web Audio.");
      this.context = new C();
      this.master = createMaster(this.context, this.muted ? 0 : 0.72);
    }
    await this.context.resume();
  }
  now() {
    return this.context?.currentTime ?? 0;
  }
  setMuted(value) {
    this.muted = value;
    if (this.master)
      this.master.gain.setTargetAtTime(value ? 0 : 0.72, this.now(), RAMP);
  }
  impulse(seconds) {
    const c = this.context,
      key = seconds.toFixed(1);
    if (this.impulses.has(key)) return this.impulses.get(key);
    const n = Math.ceil(c.sampleRate * Number(key)),
      buffer = c.createBuffer(2, n, c.sampleRate);
    const {channels} = reverbImpulse(seconds,c.sampleRate);
    for (let ch = 0; ch < 2; ch++) buffer.getChannelData(ch).set(channels[ch]);
    this.impulses.set(key, buffer);
    if (this.impulses.size > 20)
      this.impulses.delete(this.impulses.keys().next().value);
    return buffer;
  }
  wave(amount, position = 0, table = 0) {
    const key = `${amount.toFixed(3)}:${position.toFixed(3)}:${table}`;
    if (this.waves.has(key)) return this.waves.get(key);
    const { real, imag } = wavetableCoefficients({ harmonics: amount, wavePosition: position, waveTable: table });
    const wave = this.context.createPeriodicWave(real, imag);
    this.waves.set(key, wave);
    if (this.waves.size > 32) this.waves.delete(this.waves.keys().next().value);
    return wave;
  }
  defer(v, fn, ms) {
    const timer = setTimeout(() => {
      v.tasks.delete(timer);
      if (this.voices.has(v) && !v.stopping) fn();
    }, ms);
    v.tasks.add(timer);
    return timer;
  }
  async trigger(params, { held = false } = {}) {
    await this.init();
    const c = this.context,
      p = { ...params },
      start = c.currentTime + 0.015;
    const v = {
      start,
      params: p,
      nodes: [],
      sources: [],
      pitchedSources: [],
      tones: [],
      tasks: new Set(),
      held,
      released: false,
      releaseAt: null,
      releaseLevel: 0,
      stopping: false,
    };
    v.own = (node) => {
      v.nodes.push(node);
      return node;
    };
    const own = v.own;
    v.input = own(c.createGain());
    v.envelope = own(c.createGain());
    v.level = own(c.createGain());
    v.amp = own(c.createGain());
    v.output = own(c.createGain());
    v.filters = {
      low: own(c.createBiquadFilter()),
      high: own(c.createBiquadFilter()),
    };
    v.filters.low.type = "highpass";
    v.filters.high.type = "lowpass";
    const settings = filterSettings(p, c.sampleRate);
    v.filters.low.frequency.value = settings.low;
    v.filters.high.frequency.value = settings.high;
    for (const filter of Object.values(v.filters))
      filter.Q.value = settings.resonance;
    v.drive = this.makeDrive(v, p.drive);
    v.drive.gate.gain.value = 1;
    v.filters.low
      .connect(v.filters.high)
      .connect(v.envelope)
      .connect(v.amp)
      .connect(v.output)
      .connect(v.level)
      .connect(this.master);
    v.output.gain.value = 0.52;
    v.level.gain.value = p.volume;
    v.amp.gain.value = 1 - p.motion / 2;
    const wave = this.wave(p.harmonics, p.wavePosition, p.waveTable);
    for (let i = 0; i < 2; i++) {
      const sign = i ? 1 : -1,
        osc = own(c.createOscillator()),
        gain = own(c.createGain()),
        pan = own(c.createStereoPanner());
      osc.setPeriodicWave(wave);
      osc.frequency.value = p.pitch;
      osc.detune.value = (sign * p.detune) / 2;
      gain.gain.value = (1 - p.noise) * 0.5;
      pan.pan.value = sign * p.width * 0.85;
      osc.connect(gain).connect(pan).connect(v.input);
      osc.start(start);
      v.sources.push(osc);
      v.pitchedSources.push(osc);
      v.tones.push({ osc, gain, pan, sign });
    }
    if (p.noise > 0) this.ensureNoise(v, start);
    if (p.motion > 0) this.ensureMotion(v, start);
    if (p.delayMix > 0) this.ensureDelay(v, true);
    if (p.reverbMix > 0) this.ensureReverb(v, true);
    const gain = v.envelope.gain;
    gain.setValueAtTime(0, start);
    gain.linearRampToValueAtTime(1, start + p.attack);
    gain.linearRampToValueAtTime(p.sustain, start + p.attack + p.decay);
    if (!held) {
      gain.setValueAtTime(p.sustain, start + p.attack + p.decay + p.hold);
      gain.linearRampToValueAtTime(0, start + duration(p));
    }
    this.voices.add(v);
    this.refreshLifetime(v);
    return v;
  }
  makeDrive(v, amount) {
    // WaveShaper.curve cannot be reassigned portably. Crossfade replacement nodes.
    const shaper = v.own(this.context.createWaveShaper()),
      gate = v.own(this.context.createGain());
    shaper.curve = driveCurve(amount);
    shaper.oversample = "2x";
    gate.gain.value = 0;
    v.input.connect(shaper).connect(gate).connect(v.filters.low);
    return { shaper, gate };
  }
  replaceDrive(v) {
    const now = this.now(),
      before = v.drive,
      next = this.makeDrive(v, v.params.drive);
    v.drive = next;
    before.gate.gain.setTargetAtTime(0, now, RAMP);
    next.gate.gain.setTargetAtTime(1, now, RAMP);
    this.defer(
      v,
      () => {
        try {
          v.input.disconnect(before.shaper);
        } catch {}
        for (const node of [before.shaper, before.gate]) {
          node.disconnect();
          const index = v.nodes.indexOf(node);
          if (index >= 0) v.nodes.splice(index, 1);
        }
      },
      120,
    );
    v.lastDrive = now;
  }
  queueDrive(v) {
    if (v.driveTask) {
      clearTimeout(v.driveTask);
      v.tasks.delete(v.driveTask);
    }
    const wait = Math.max(0, 0.04 - (this.now() - (v.lastDrive ?? -Infinity)));
    if (!wait) this.replaceDrive(v);
    else
      v.driveTask = this.defer(
        v,
        () => {
          v.driveTask = null;
          this.replaceDrive(v);
        },
        wait * 1000,
      );
  }
  ensureNoise(v, start = this.now()) {
    if (v.noise) return;
    if (!this.noiseBuffer) {
      const c = this.context,
        b = c.createBuffer(2, c.sampleRate * 2, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = b.getChannelData(ch);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = b;
    }
    const source = v.own(this.context.createBufferSource()),
      gain = v.own(this.context.createGain());
    source.buffer = this.noiseBuffer;
    source.loop = true;
    gain.gain.value = start === v.start ? v.params.noise * 0.65 : 0;
    source.connect(gain).connect(v.input);
    source.start(start);
    v.sources.push(source);
    v.noise = { source, gain };
  }
  ensureMotion(v, start = this.now()) {
    if (v.motion) return;
    const source = v.own(this.context.createOscillator()),
      depth = v.own(this.context.createGain());
    source.frequency.value = v.params.rate;
    depth.gain.value = start === v.start ? v.params.motion / 2 : 0;
    source.connect(depth).connect(v.amp.gain);
    source.start(start);
    v.sources.push(source);
    v.motion = { source, depth };
  }
  ensureDelay(v, initial = false) {
    if (v.delay) return;
    const node = v.own(this.context.createDelay(1)),
      feedback = v.own(this.context.createGain()),
      wet = v.own(this.context.createGain());
    node.delayTime.value = v.params.delayTime;
    feedback.gain.value = delayFeedback(v.params.feedback);
    wet.gain.value = initial ? v.params.delayMix : 0;
    v.output.connect(node);
    node.connect(feedback).connect(node);
    node.connect(wet).connect(v.level);
    v.delay = { node, feedback, wet };
  }
  ensureReverb(v, initial = false) {
    if (v.reverb) return;
    const wet = v.own(this.context.createGain()),
      banks = [];
    wet.gain.value = initial ? v.params.reverbMix : 0;
    wet.connect(v.level);
    for (let i = 0; i < 2; i++) {
      const convolver = v.own(this.context.createConvolver()),
        gain = v.own(this.context.createGain());
      convolver.buffer = this.impulse(v.params.reverbDecay);
      gain.gain.value = i ? 0 : 1;
      v.output.connect(convolver).connect(gain).connect(wet);
      banks.push({ convolver, gain });
    }
    v.reverb = {
      wet,
      banks,
      active: 0,
      decay: v.params.reverbDecay.toFixed(1),
      lastChange: this.now(),
    };
  }
  queueReverb(v) {
    if (!v.reverb || v.reverb.decay === v.params.reverbDecay.toFixed(1)) return;
    if (v.reverbTask) {
      clearTimeout(v.reverbTask);
      v.tasks.delete(v.reverbTask);
    }
    const swap = () => {
      const effect = v.reverb,
        previous = effect.banks[effect.active],
        next = effect.banks[1 - effect.active],
        now = this.now();
      next.convolver.buffer = this.impulse(v.params.reverbDecay);
      previous.gain.gain.setTargetAtTime(0, now, RAMP);
      next.gain.gain.setTargetAtTime(1, now, RAMP);
      effect.active = 1 - effect.active;
      effect.decay = v.params.reverbDecay.toFixed(1);
      effect.lastChange = now;
    };
    const wait = Math.max(0, 0.12 - (this.now() - v.reverb.lastChange));
    if (!wait) swap();
    else
      v.reverbTask = this.defer(
        v,
        () => {
          v.reverbTask = null;
          swap();
        },
        wait * 1000,
      );
  }
  update(params, only = null) {
    if (!this.context) return;
    const now = this.now();
    for (const v of only ? [only] : this.voices) {
      if (v.stopping) continue;
      const old = { ...v.params },
        changed = (id) => old[id] !== params[id];
      if (!Object.keys(old).some(changed)) continue;
      const sourceAlive = v.held || now < v.start + v.duration;
      const envelopeChanged = [
        "attack",
        "decay",
        "sustain",
        "hold",
        "release",
      ].some(changed);
      const oldEnvelope = { ...old },
        oldState = {
          held: v.held,
          releaseAt: v.releaseAt,
          releaseLevel: v.releaseLevel,
        };
      Object.assign(v.params, params);
      if (!sourceAlive)
        for (const id of ["attack", "decay", "sustain", "hold", "release"])
          v.params[id] = old[id];
      if (changed("pitch"))
        for (const osc of v.pitchedSources)
          osc.frequency.setTargetAtTime(params.pitch, now, 0.03);
      if (["harmonics", "wavePosition", "waveTable"].some(changed)) {
        const wave = this.wave(params.harmonics, params.wavePosition, params.waveTable);
        for (const osc of v.pitchedSources) osc.setPeriodicWave(wave);
      }
      for (const tone of v.tones) {
        if (changed("detune"))
          tone.osc.detune.setTargetAtTime(
            (tone.sign * params.detune) / 2,
            now,
            RAMP,
          );
        if (changed("width"))
          tone.pan.pan.setTargetAtTime(
            tone.sign * params.width * 0.85,
            now,
            RAMP,
          );
        if (changed("noise"))
          tone.gain.gain.setTargetAtTime((1 - params.noise) * 0.5, now, RAMP);
      }
      if (changed("volume"))
        v.level.gain.setTargetAtTime(params.volume, now, RAMP);
      if (changed("drive")) this.queueDrive(v);
      if (["cutoffLow", "cutoff", "resonance"].some(changed)) {
        const settings = filterSettings(params, this.context.sampleRate);
        v.filters.low.frequency.setTargetAtTime(settings.low, now, 0.025);
        v.filters.high.frequency.setTargetAtTime(settings.high, now, 0.025);
        for (const filter of Object.values(v.filters))
          filter.Q.setTargetAtTime(settings.resonance, now, 0.025);
      }
      if (changed("noise")) {
        if (params.noise > 0) this.ensureNoise(v);
        v.noise?.gain.gain.setTargetAtTime(params.noise * 0.65, now, RAMP);
      }
      if (changed("motion") || changed("rate")) {
        if (params.motion > 0) this.ensureMotion(v);
        v.amp.gain.setTargetAtTime(1 - params.motion / 2, now, RAMP);
        v.motion?.source.frequency.setTargetAtTime(params.rate, now, RAMP);
        v.motion?.depth.gain.setTargetAtTime(params.motion / 2, now, RAMP);
      }
      if (["delayMix", "delayTime", "feedback"].some(changed)) {
        if (params.delayMix > 0) this.ensureDelay(v);
        if (v.delay) {
          v.delay.node.delayTime.setTargetAtTime(params.delayTime, now, 0.03);
          v.delay.wet.gain.setTargetAtTime(params.delayMix, now, RAMP);
          v.delay.feedback.gain.setTargetAtTime(delayFeedback(params.feedback), now, RAMP);
        }
      }
      if (["reverbMix", "reverbDecay"].some(changed)) {
        if (params.reverbMix > 0) this.ensureReverb(v);
        v.reverb?.wet.gain.setTargetAtTime(params.reverbMix, now, RAMP);
        this.queueReverb(v);
      }
      if (envelopeChanged && sourceAlive)
        this.reshapeEnvelope(v, now, oldEnvelope, oldState);
      this.refreshLifetime(v, { bridge: envelopeChanged && sourceAlive });
    }
  }
  reshapeEnvelope(v, now, oldParams = v.params, oldState = v) {
    const elapsed = Math.max(0, now - v.start),
      gain = v.envelope.gain,
      bridge = RAMP;
    if (gain.cancelAndHoldAtTime) gain.cancelAndHoldAtTime(now);
    else {
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(voiceEnvelopeAt(oldParams, elapsed, oldState), now);
    }
    gain.linearRampToValueAtTime(
      voiceEnvelopeAt(v.params, elapsed + bridge, v),
      now + bridge,
    );
    for (const point of futureEnvelope(v.params, elapsed + bridge, v))
      gain.linearRampToValueAtTime(point.value, v.start + point.time);
  }
  refreshLifetime(v, { bridge = false } = {}) {
    v.duration = v.held
      ? Infinity
      : v.releaseAt !== null
        ? v.releaseAt + v.params.release
        : duration(v.params);
    v.sourceEnd = bridge
      ? Math.max(v.duration, this.now() - v.start + RAMP)
      : (v.sourceEnd ?? v.duration);
    const end = v.sourceEnd;
    v.total = v.held
      ? Infinity
      : end + tailDuration(v.params) - duration(v.params);
    clearTimeout(v.timer);
    if (!v.held)
      v.timer = setTimeout(
        () => this.disposeVoice(v),
        Math.max(0, (v.start + v.total + 0.3 - this.now()) * 1000),
      );
  }
  setPitch(hz) {
    for (const v of this.voices)
      if (!v.stopping) this.updateVoicePatch(v, { pitch: clamp(hz, 55, 1760) });
  }
  setFilter(params) {
    for (const v of this.voices)
      if (!v.stopping)
        this.updateVoicePatch(v, {
          cutoffLow: params.cutoffLow ?? 20,
          cutoff: params.cutoff,
          resonance: params.resonance,
        });
  }
  setRelease(seconds) {
    for (const v of this.voices)
      if (v.held)
        this.updateVoicePatch(v, { release: clamp(seconds, 0.02, 3) });
  }
  updateVoicePatch(v, patch) {
    this.update({ ...v.params, ...patch }, v);
  }
  release(v) {
    if (!v || !v.held || !this.voices.has(v)) return;
    const now = this.now(),
      elapsed = Math.max(0, now - v.start),
      oldState = { held: true, releaseAt: null };
    v.releaseLevel = voiceEnvelopeAt(v.params, elapsed, oldState);
    v.releaseAt = elapsed;
    v.held = false;
    v.released = true;
    this.reshapeEnvelope(v, now, v.params, oldState);
    this.refreshLifetime(v, { bridge: true });
  }
  disposeVoice(v) {
    clearTimeout(v.timer);
    for (const timer of v.tasks) clearTimeout(timer);
    v.tasks.clear();
    for (const source of v.sources) {
      try {
        source.stop();
      } catch {}
    }
    for (const node of v.nodes) {
      try {
        node.disconnect();
      } catch {}
    }
    this.voices.delete(v);
  }
  stop() {
    for (const v of this.voices) {
      v.stopping = true;
      v.level.gain.setTargetAtTime(0, this.now(), 0.008);
      clearTimeout(v.timer);
      v.timer = setTimeout(() => this.disposeVoice(v), 60);
    }
  }
  async render(params) {
    const context = new OfflineAudioContext(
        2,
        Math.ceil((tailDuration(params) + 0.25) * 44100),
        44100,
      ),
      engine = new NativeAudioEngine();
    engine.context = context;
    engine.master = createMaster(context);
    engine.init = async () => {};
    await engine.trigger(params);
    const buffer = await context.startRendering();
    for (const v of [...engine.voices]) engine.disposeVoice(v);
    return buffer;
  }
}

export function encodeWav(buffer) {
  const frames = buffer.length,
    channels = buffer.numberOfChannels,
    bytes = new ArrayBuffer(44 + frames * channels * 2),
    v = new DataView(bytes);
  let o = 0;
  const str = (s) => {
      for (const ch of s) v.setUint8(o++, ch.charCodeAt(0));
    },
    u16 = (x) => {
      v.setUint16(o, x, true);
      o += 2;
    },
    u32 = (x) => {
      v.setUint32(o, x, true);
      o += 4;
    };
  str("RIFF");
  u32(36 + frames * channels * 2);
  str("WAVEfmt ");
  u32(16);
  u16(1);
  u16(channels);
  u32(buffer.sampleRate);
  u32(buffer.sampleRate * channels * 2);
  u16(channels * 2);
  u16(16);
  str("data");
  u32(frames * channels * 2);
  const data = Array.from({ length: channels }, (_, i) =>
    buffer.getChannelData(i),
  );
  for (let i = 0; i < frames; i++)
    for (let ch = 0; ch < channels; ch++) {
      const n = clamp(data[ch][i], -1, 1);
      v.setInt16(o, n < 0 ? n * 32768 : n * 32767, true);
      o += 2;
    }
  return new Blob([bytes], { type: "audio/wav" });
}
