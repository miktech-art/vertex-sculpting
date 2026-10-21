import test from "node:test";
import assert from "node:assert/strict";
import { NativeAudioEngine, encodeWav } from "../dist/src/audio/engine.js";
import { BASE, PRESETS, duration } from "../dist/src/model.js";

class Param {
  constructor() {
    this.value = 0;
    this.events = [];
  }
  setValueAtTime(value, time) {
    this.events.push({ type: "set", value, time });
  }
  linearRampToValueAtTime(value, time) {
    this.events.push({ type: "ramp", value, time });
  }
  setTargetAtTime(value, time) {
    this.events.push({ type: "target", value, time });
  }
  cancelAndHoldAtTime(time) {
    this.events.push({ type: "hold", time });
  }
  cancelScheduledValues(time) {
    this.events.push({ type: "cancel", time });
  }
}
class Node {
  constructor(type) {
    this.type = type;
    this.connections = [];
    for (const p of [
      "gain",
      "frequency",
      "detune",
      "pan",
      "Q",
      "delayTime",
      "threshold",
      "knee",
      "ratio",
      "attack",
      "release",
    ])
      this[p] = new Param();
    this.disconnected = false;
  }
  connect(node) {
    this.connections.push(node);
    return node;
  }
  disconnect() {
    this.disconnected = true;
  }
  start(time) {
    this.startTime = time;
  }
  stop(time) {
    this.stopTime = time;
  }
  setPeriodicWave(wave) {
    this.wave = wave;
  }
}
class Context {
  constructor() {
    this.currentTime = 10;
    this.sampleRate = 100;
    this.destination = new Node("destination");
  }
  resume() {
    return Promise.resolve();
  }
  createGain() {
    return new Node("gain");
  }
  createDynamicsCompressor() {
    return new Node("compressor");
  }
  createWaveShaper() {
    return new Node("shaper");
  }
  createBiquadFilter() {
    return new Node("filter");
  }
  createOscillator() {
    return new Node("oscillator");
  }
  createStereoPanner() {
    return new Node("pan");
  }
  createBufferSource() {
    return new Node("bufferSource");
  }
  createDelay() {
    return new Node("delay");
  }
  createConvolver() {
    return new Node("convolver");
  }
  createPeriodicWave(real, imag) {
    return { real, imag };
  }
  createBuffer(channels, length, sampleRate) {
    const data = Array.from(
      { length: channels },
      () => new Float32Array(length),
    );
    return {
      length,
      numberOfChannels: channels,
      sampleRate,
      getChannelData: (i) => data[i],
    };
  }
}
globalThis.window = { AudioContext: Context };
globalThis.GainNode = Node;
test("muting before audio initialization keeps the first note muted", async () => {
  const engine = new NativeAudioEngine();
  engine.setMuted(true);
  const event = await engine.trigger(BASE);
  assert.equal(engine.master.gain.value, 0);
  engine.disposeVoice(event);
});
test("the engine schedules complete ADSR events and cleans every owned audio node", async () => {
  for (const preset of PRESETS) {
    const engine = new NativeAudioEngine(),
      event = await engine.trigger(preset.params);
    assert.equal(engine.voices.size, 1);
    assert.equal(event.duration, duration(preset.params));
    const envelope = event.nodes.find(
      (n) => n.type === "gain" && n.gain.events.length === 5,
    );
    assert.ok(envelope, "An envelope with all five scheduled stages exists");
    const times = envelope.gain.events.map((e) => e.time);
    assert.ok(times.every((t, i) => !i || t >= times[i - 1]));
    assert.equal(envelope.gain.events[4].value, 0);
    assert.equal(times[4], event.start + event.duration);
    const oscillators = event.sources.filter(
      (s) => s.type === "oscillator" && s.wave,
    );
    assert.equal(oscillators.length, 2);
    assert.equal(oscillators[0].frequency.value, preset.params.pitch);
    assert.ok(event.sources.every((n) => n.stopTime > event.start));
    engine.disposeVoice(event);
    assert.equal(engine.voices.size, 0);
    assert.ok(event.nodes.every((n) => n.disconnected));
  }
});
test("effects only create feedback loops when delay is enabled", async () => {
  for (const mix of [0, 0.4]) {
    const engine = new NativeAudioEngine(),
      event = await engine.trigger({ ...BASE, delayMix: mix });
    const delays = event.nodes.filter((n) => n.type === "delay");
    assert.equal(delays.length, mix ? 1 : 0);
    if (mix) {
      assert.ok(
        event.nodes.some(
          (n) => n.type === "gain" && n.connections.includes(delays[0]),
        ),
      );
    }
    engine.disposeVoice(event);
  }
});
test("the default sound has a broad harmonic spectrum and active modulation/effects", async () => {
  const engine = new NativeAudioEngine(),
    voice = await engine.trigger(PRESETS[0].params);
  const oscillator = voice.pitchedSources[0];
  assert.equal(oscillator.wave.imag.length, 97);
  assert.ok(oscillator.wave.imag[64] > 0);
  assert.ok(voice.nodes.some((n) => n.type === "convolver"));
  assert.ok(voice.nodes.some((n) => n.type === "delay"));
  assert.ok(voice.sources.some((n) => n.type === "bufferSource"));
  engine.disposeVoice(voice);
});
test("live pitch updates pitched voices without changing the tremolo rate", async () => {
  const engine = new NativeAudioEngine(),
    voice = await engine.trigger(PRESETS[0].params);
  const lfo = voice.sources.find((s) => s.type === "oscillator" && !s.wave);
  engine.setPitch(440);
  assert.ok(
    voice.pitchedSources.every((s) => s.frequency.events.at(-1).value === 440),
  );
  assert.equal(lfo.frequency.events.length, 0);
  engine.disposeVoice(voice);
});
test("gesture voices sustain until released and then have a finite effect tail", async () => {
  const engine = new NativeAudioEngine(),
    voice = await engine.trigger(PRESETS[0].params, { held: true });
  assert.equal(voice.held, true);
  assert.equal(voice.total, Infinity);
  assert.ok(voice.sources.every((source) => source.stopTime === undefined));
  engine.context.currentTime += 2;
  engine.release(voice);
  assert.equal(voice.held, false);
  assert.equal(voice.released, true);
  assert.ok(Number.isFinite(voice.total) && voice.total > voice.duration);
  assert.equal(voice.envelope.gain.events.at(-1).value, 0);
  assert.ok(voice.sources.every((source) => source.stopTime > engine.now()));
  engine.disposeVoice(voice);
});
test("WAV export interleaves stereo samples with a valid PCM header", async () => {
  const buffer = {
    numberOfChannels: 2,
    sampleRate: 44100,
    length: 3,
    getChannelData: (i) =>
      i === 0 ? new Float32Array([0, 1, -1]) : new Float32Array([0.5, -0.5, 0]),
  };
  const blob = encodeWav(buffer),
    v = new DataView(await blob.arrayBuffer());
  assert.equal(blob.type, "audio/wav");
  assert.equal(blob.size, 56);
  assert.equal(v.getUint16(22, true), 2);
  assert.equal(v.getUint32(24, true), 44100);
  assert.equal(v.getUint32(40, true), 12);
  assert.equal(v.getInt16(44, true), 0);
  assert.equal(v.getInt16(46, true), 16383);
  assert.equal(v.getInt16(48, true), 32767);
  assert.equal(v.getInt16(50, true), -16384);
  assert.equal(v.getInt16(52, true), -32768);
});

test("release edits apply to held voices at gate-off without altering already scheduled notes", async () => {
  const engine = new NativeAudioEngine();
  const held = await engine.trigger(PRESETS[0].params, { held: true });
  const finite = await engine.trigger(PRESETS[0].params);
  const original = finite.params.release;
  engine.setRelease(2.5);
  assert.equal(held.params.release, 2.5);
  assert.equal(finite.params.release, original);
  engine.release(held);
  assert.equal(held.envelope.gain.events.at(-1).time, engine.now() + 2.5);
  engine.disposeVoice(held);
  engine.disposeVoice(finite);
});

test("audio routes a resonant highpass and lowpass in series and supports live band edits", async () => {
  const engine = new NativeAudioEngine();
  await engine.init();
  engine.context.sampleRate = 48000;
  const voice = await engine.trigger({
    ...PRESETS[0].params,
    cutoffLow: 500,
    cutoff: 5000,
  });
  assert.equal(voice.filters.low.type, "highpass");
  assert.equal(voice.filters.high.type, "lowpass");
  assert.ok(voice.filters.low.connections.includes(voice.filters.high));
  assert.equal(voice.filters.low.frequency.value, 500);
  assert.equal(voice.filters.high.frequency.value, 5000);
  engine.setFilter({ cutoffLow: 1000, cutoff: 4000, resonance: 12 });
  assert.equal(voice.filters.low.frequency.events.at(-1).value, 1000);
  assert.equal(voice.filters.high.frequency.events.at(-1).value, 4000);
  assert.ok(
    Object.values(voice.filters).every((n) => n.Q.events.at(-1).value === 12),
  );
  engine.disposeVoice(voice);
});
