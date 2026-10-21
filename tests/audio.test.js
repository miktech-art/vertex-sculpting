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
