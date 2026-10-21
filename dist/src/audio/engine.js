import { filterSettings, harmonicAmplitude } from "../spectral/filter.js";
import { duration, tailDuration, clamp } from "../model.js";

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

// Adapter contract: trigger(params) -> {start, duration, total, params}; stop(); now().
// A future external instrument adapter can implement the same contract.
export class NativeAudioEngine {
  constructor() {
    this.context = null;
    this.voices = new Set();
    this.impulses = new Map();
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
      this.master.gain.setTargetAtTime(value ? 0 : 0.72, this.now(), 0.02);
  }
  impulse(seconds) {
    const c = this.context,
      key = seconds.toFixed(2);
    if (this.impulses.has(key)) return this.impulses.get(key);
    const n = Math.ceil(c.sampleRate * seconds),
      b = c.createBuffer(2, n, c.sampleRate);
    let seed = 43;
    for (let ch = 0; ch < 2; ch++) {
      const data = b.getChannelData(ch);
      for (let i = 0; i < n; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        data[i] = ((seed / 4294967296) * 2 - 1) * (1 - i / n) ** 2.8 * 0.7;
      }
    }
    this.impulses.set(key, b);
    if (this.impulses.size > 10)
      this.impulses.delete(this.impulses.keys().next().value);
    return b;
  }
  async trigger(params, { held = false } = {}) {
    await this.init();
    const p = { ...params },
      c = this.context,
      start = c.currentTime + 0.015,
      nodes = [],
      sources = [],
      pitchedSources = [];
    const own = (n) => {
      nodes.push(n);
      return n;
    };
    const input = own(c.createGain()),
      drive = own(c.createWaveShaper()),
      filter = own(c.createBiquadFilter()),
      highpass = own(c.createBiquadFilter()),
      env = own(c.createGain()),
      amp = own(c.createGain()),
      output = own(c.createGain());
    const curve = new Float32Array(2048),
      k = 1 + p.drive * 18;
    for (let i = 0; i < curve.length; i++) {
      const x = (i / (curve.length - 1)) * 2 - 1;
      curve[i] = p.drive < 0.001 ? x : Math.tanh(x * k) / Math.tanh(k);
    }
    drive.curve = curve;
    drive.oversample = "2x";
    filter.type = "lowpass";
    const settings = filterSettings(p, c.sampleRate);
    filter.frequency.value = settings.high;
    filter.Q.value = settings.resonance;
    highpass.type = "highpass";
    highpass.frequency.value = settings.low;
    highpass.Q.value = settings.resonance;
    input
      .connect(drive)
      .connect(highpass)
      .connect(filter)
      .connect(env)
      .connect(amp)
      .connect(output);
    output.gain.value = 0.52;
    const real = new Float32Array(97),
      imag = new Float32Array(97);
    imag[1] = 1;
    for (let h = 2; h < 97; h++) imag[h] = harmonicAmplitude(h, p.harmonics);
    const wave = c.createPeriodicWave(real, imag);
    for (let v = 0; v < 2; v++) {
      const osc = own(c.createOscillator()),
        gain = own(c.createGain()),
        pan = own(c.createStereoPanner());
      osc.setPeriodicWave(wave);
      osc.frequency.value = p.pitch;
      osc.detune.value = ((v ? 1 : -1) * p.detune) / 2;
      gain.gain.value = (1 - p.noise) * 0.5;
      pan.pan.value = (v ? 1 : -1) * p.width * 0.85;
      osc.connect(gain).connect(pan).connect(input);
      osc.start(start);
      sources.push(osc);
      pitchedSources.push(osc);
    }
    if (p.noise > 0) {
      const noise = own(c.createBufferSource()),
        gain = own(c.createGain()),
        buf = c.createBuffer(2, c.sampleRate * 2, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const a = buf.getChannelData(ch);
        for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1;
      }
      noise.buffer = buf;
      noise.loop = true;
      gain.gain.value = p.noise * 0.65;
      noise.connect(gain).connect(input);
      noise.start(start);
      sources.push(noise);
    }
    const gate = p.attack + p.decay + p.hold,
      end = duration(p);
    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(p.volume, start + p.attack);
    env.gain.linearRampToValueAtTime(
      p.volume * p.sustain,
      start + p.attack + p.decay,
    );
    if (!held) {
      env.gain.setValueAtTime(p.volume * p.sustain, start + gate);
      env.gain.linearRampToValueAtTime(0, start + end);
    }
    amp.gain.value = 1 - p.motion / 2;
    if (p.motion > 0) {
      const lfo = own(c.createOscillator()),
        depth = own(c.createGain());
      lfo.frequency.value = p.rate;
      depth.gain.value = p.motion / 2;
      lfo.connect(depth).connect(amp.gain);
      lfo.start(start);
      sources.push(lfo);
    }
    output.connect(this.master);
    if (p.delayMix > 0) {
      const delay = own(c.createDelay(1)),
        feedback = own(c.createGain()),
        wet = own(c.createGain());
      delay.delayTime.value = p.delayTime;
      feedback.gain.value = p.feedback;
      wet.gain.value = p.delayMix;
      output.connect(delay);
      delay.connect(feedback).connect(delay);
      delay.connect(wet).connect(this.master);
    }
    if (p.reverbMix > 0) {
      const convolver = own(c.createConvolver()),
        wet = own(c.createGain());
      convolver.buffer = this.impulse(p.reverbDecay);
      wet.gain.value = p.reverbMix;
      output.connect(convolver).connect(wet).connect(this.master);
    }
    if (!held) for (const source of sources) source.stop(start + end + 0.03);
    const voice = {
      start,
      duration: held ? Infinity : end,
      total: held ? Infinity : tailDuration(p),
      params: p,
      nodes,
      sources,
      pitchedSources,
      envelope: env,
      filters: { low: highpass, high: filter },
      held,
      released: false,
    };
    this.voices.add(voice);
    if (!held)
      voice.timer = setTimeout(
        () => this.disposeVoice(voice),
        (voice.total + 0.3) * 1000,
      );
    return voice;
  }
  setPitch(hz) {
    const pitch = clamp(hz, 55, 1760),
      now = this.now();
    for (const voice of this.voices) {
      if (voice.released) continue;
      for (const source of voice.pitchedSources)
        source.frequency.setTargetAtTime(pitch, now, 0.03);
      voice.params.pitch = pitch;
    }
  }
  setFilter(params) {
    const now = this.now();
    for (const voice of this.voices) {
      if (voice.released) continue;
      const settings = filterSettings(params, this.context.sampleRate);
      voice.filters.low.frequency.setTargetAtTime(settings.low, now, 0.025);
      voice.filters.high.frequency.setTargetAtTime(settings.high, now, 0.025);
      for (const node of Object.values(voice.filters))
        node.Q.setTargetAtTime(settings.resonance, now, 0.025);
      Object.assign(voice.params, {
        cutoffLow: settings.low,
        cutoff: settings.high,
        resonance: settings.resonance,
      });
    }
  }
  setRelease(seconds) {
    for (const voice of this.voices)
      if (voice.held) voice.params.release = clamp(seconds, 0.02, 3);
  }
  release(voice) {
    if (!voice || !voice.held || !this.voices.has(voice)) return;
    const now = this.now(),
      p = voice.params,
      elapsed = Math.max(0, now - voice.start),
      gain = voice.envelope.gain;
    if (typeof gain.cancelAndHoldAtTime === "function")
      gain.cancelAndHoldAtTime(now);
    else {
      gain.cancelScheduledValues(now);
      const level =
        elapsed < p.attack
          ? elapsed / p.attack
          : elapsed < p.attack + p.decay
            ? 1 - ((1 - p.sustain) * (elapsed - p.attack)) / p.decay
            : p.sustain;
      gain.setValueAtTime(p.volume * level, now);
    }
    gain.linearRampToValueAtTime(0, now + p.release);
    for (const source of voice.sources) source.stop(now + p.release + 0.03);
    voice.held = false;
    voice.released = true;
    voice.duration = elapsed + p.release;
    const effectTail = tailDuration(p) - duration(p);
    voice.total = voice.duration + effectTail;
    voice.timer = setTimeout(
      () => this.disposeVoice(voice),
      (p.release + effectTail + 0.3) * 1000,
    );
  }
  disposeVoice(v) {
    clearTimeout(v.timer);
    for (const s of v.sources) {
      try {
        s.stop();
      } catch {}
    }
    for (const n of v.nodes) {
      try {
        n.disconnect();
      } catch {}
    }
    this.voices.delete(v);
  }
  stop() {
    for (const v of this.voices) {
      const now = this.now();
      for (const n of v.nodes) {
        if (n instanceof GainNode) n.gain.setTargetAtTime(0, now, 0.008);
      }
      clearTimeout(v.timer);
      v.timer = setTimeout(() => this.disposeVoice(v), 60);
    }
  }
  async render(params) {
    // Use the same synthesis graph through a temporary adapter and an offline context.
    const length = Math.ceil((tailDuration(params) + 0.25) * 44100);
    const context = new OfflineAudioContext(2, length, 44100);
    const engine = new NativeAudioEngine();
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
