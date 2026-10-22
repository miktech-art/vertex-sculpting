import test from "node:test";
import assert from "node:assert/strict";
import { delayEchoes, delayFeedback, MAX_ECHOES, MIN_ECHO_LEVEL } from "../dist/src/delay.js";
import { BASE, duration, tailDuration } from "../dist/src/model.js";
import { buildEchoLayout } from "../dist/src/visual/echoes.js";

test("expanded delay yields about three times the repeats, including low feedback", () => {
  for (const [mix, feedback] of [[0.25575, 0.0156], [0.14, 0.28], [0.4, 0.5], [0.55, 0.65]]) {
    let former = 0;
    while (mix * feedback ** former >= MIN_ECHO_LEVEL && former < 10) former++;
    const echoes = delayEchoes(mix, feedback);
    assert.ok(echoes.length >= former * 2 && echoes.length <= former * 3);
    assert.equal(echoes[0].gain, mix);
    assert.ok(echoes.every((e, i) => !i || e.gain < echoes[i - 1].gain));
    assert.ok(echoes.length <= MAX_ECHOES);
  }
  assert.equal(delayEchoes(0.25575, 0.0156).length, 3);
  assert.equal(delayEchoes(0.55, 0.65).length, 30);
});
test("zero mix stays dry, zero feedback has one repeat, and the loop stays stable", () => {
  assert.deepEqual(delayEchoes(0, 0.65), []);
  assert.deepEqual(delayEchoes(0.4, 0), [{ index: 1, gain: 0.4 }]);
  for (const input of [0, 0.01, 0.3, 0.65, 1]) assert.ok(delayFeedback(input) < 1);
});
test("preview tail length covers the expanded echo train", () => {
  for (const feedback of [0, 0.0156, 0.28, 0.5, 0.65]) {
    const p = { ...BASE, delayMix: 0.55, feedback, delayTime: 0.85, reverbMix: 0 };
    const layout = buildEchoLayout(duration(p), 500, { mix: p.delayMix, feedback, delay: p.delayTime });
    assert.equal(tailDuration(p), layout.duration);
  }
});
