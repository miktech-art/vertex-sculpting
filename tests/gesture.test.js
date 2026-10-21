import test from "node:test";
import assert from "node:assert/strict";
import {
  inspectRightHand,
  inspectReleaseHands,
  GestureBinding,
  ReleaseBinding,
} from "../dist/src/tracking/gesture.js";

import { fixture, combine, releaseFixture } from "./hand-fixtures.js";
test("pitch selects only anatomical right hand with all three fingertips at palm and straight index", () => {
  assert.equal(inspectRightHand(fixture()).allowed, true);
  assert.equal(inspectRightHand(fixture({ hand: "Left" })).allowed, false);
  assert.equal(inspectRightHand(fixture({ score: 0.6 })).allowed, false);
  for (const tip of [12, 16, 20]) {
    const result = fixture();
    result.worldLandmarks[0][tip].z = 0.5;
    assert.equal(
      inspectRightHand(result).allowed,
      false,
      `tip ${tip} lifted away from palm`,
    );
  }
  assert.equal(inspectRightHand(fixture({ closed: false })).allowed, false);
  assert.equal(
    inspectRightHand(fixture({ indexStraight: false })).allowed,
    false,
  );
});
test("a curled finger away from the palm surface cannot activate pitch", () => {
  const result = fixture();
  // Move the entire bent middle-finger chain beyond the palm, preserving joint angles.
  for (const i of [9, 10, 11, 12]) result.worldLandmarks[0][i].x += 2;
  assert.equal(inspectRightHand(result).allowed, false);
});
test("pitch ignores thumb pose but rejects a bent index joint", () => {
  const result = fixture();
  result.worldLandmarks[0][4] = { x: 0, y: 0, z: 2 };
  assert.equal(inspectRightHand(result).allowed, true);
  result.worldLandmarks[0][7].z = 0.6;
  assert.equal(inspectRightHand(result).allowed, false);
});
test("palm contact and straightness are invariant to 3D rotation, translation and scale", () => {
  const result = fixture();
  result.worldLandmarks[0] = result.worldLandmarks[0].map((p) => ({
    x: 4 + p.y * 0.03,
    y: 2 - p.z * 0.03,
    z: 9 - p.x * 0.03,
  }));
  assert.equal(inspectRightHand(result).allowed, true);
});
test("moving the index upward increases bounded logarithmic pitch", () => {
  assert.equal(inspectRightHand(fixture({ y: 0 })).pitch, 1760);
  assert.equal(inspectRightHand(fixture({ y: 1 })).pitch, 55);
  assert.ok(
    inspectRightHand(fixture({ y: 0.25 })).pitch >
      inspectRightHand(fixture({ y: 0.75 })).pitch,
  );
});
test("hand order and crossing left/right screen positions do not change anatomical assignment", () => {
  for (const results of [
    [fixture({ hand: "Left", y: 0.8, x: 0.8 }), fixture({ y: 0.2, x: 0.2 })],
    [fixture({ y: 0.2, x: 0.8 }), fixture({ hand: "Left", y: 0.8, x: 0.2 })],
  ])
    assert.equal(
      inspectRightHand(combine(...results)).normalized,
      inspectRightHand(fixture({ y: 0.2 })).normalized,
    );
});
test("stable pitch acquisition, invalid-pose freeze and delayed note release", () => {
  const binding = new GestureBinding();
  binding.reset(220);
  assert.equal(binding.update(fixture({ y: 0.2 }), 0).active, false);
  assert.equal(binding.update(fixture({ y: 0.2 }), 80).pitch, null);
  assert.ok(binding.update(fixture({ y: 0.2 }), 160).pitch > 220);
  const invalid = binding.update(fixture({ indexStraight: false }), 180);
  assert.equal(invalid.pitch, null);
  assert.equal(invalid.active, true);
  assert.equal(binding.update({}, 300).active, false);
});
test("release requires all five left fingers extended, four vertical, and right pinch", () => {
  assert.equal(inspectReleaseHands(releaseFixture()).allowed, true);
  const closed = combine(
    fixture({ hand: "Left", closed: true }),
    fixture({ pinch: true, indexStraight: false }),
  );
  assert.equal(inspectReleaseHands(closed).allowed, false);
  const noPinch = combine(fixture({ hand: "Left", closed: false }), fixture());
  assert.equal(inspectReleaseHands(noPinch).allowed, false);
  const thumb = releaseFixture();
  thumb.worldLandmarks[0][4] = { x: 0, y: -0.1, z: 0.8 };
  assert.equal(inspectReleaseHands(thumb).allowed, false);
  const tilted = releaseFixture();
  tilted.landmarks[0] = tilted.landmarks[0].map((p) => ({
    x: 0.5 - (p.y - 0.5),
    y: 0.5 + (p.x - 0.5),
    z: p.z,
  }));
  assert.equal(inspectReleaseHands(tilted).allowed, false);
  const swapped = releaseFixture();
  swapped.handedness.reverse();
  assert.equal(inspectReleaseHands(swapped).allowed, false);
});
test("lateral separation lengthens release, vertical motion does not, and range is clamped", () => {
  const near = inspectReleaseHands(releaseFixture({ leftX: 0.3, rightX: 0.3 }));
  const far = inspectReleaseHands(
    releaseFixture({ leftX: 0.05, rightX: 0.95 }),
  );
  assert.equal(near.release, 0.02);
  assert.equal(far.release, 3);
  const regular = releaseFixture(),
    before = inspectReleaseHands(regular).release;
  regular.landmarks[1] = regular.landmarks[1].map((p) => ({
    ...p,
    y: p.y + 0.2,
  }));
  assert.equal(inspectReleaseHands(regular).release, before);
  assert.ok(
    inspectReleaseHands(releaseFixture({ leftX: 0.2, rightX: 0.6 })).release >
      inspectReleaseHands(releaseFixture({ leftX: 0.2, rightX: 0.4 })).release,
  );
});
test("release freezes immediately if pinch or left pose breaks, without jumping on reacquisition", () => {
  const binding = new ReleaseBinding();
  binding.reset(0.8);
  assert.equal(binding.update(releaseFixture(), 0).release, null);
  const active = binding.update(releaseFixture(), 200);
  assert.equal(active.active, true);
  assert.ok(active.release > 0);
  assert.equal(binding.update({}, 220).release, null);
  assert.equal(binding.update({}, 340).active, false);
  assert.equal(binding.update(releaseFixture(), 360).release, null);
});
test("missing, malformed or degenerate landmarks cannot activate either binding", () => {
  const malformed = fixture();
  malformed.worldLandmarks[0][12].z = NaN;
  const degenerate = fixture();
  degenerate.worldLandmarks[0] = Array.from({ length: 21 }, () => ({
    x: 0,
    y: 0,
    z: 0,
  }));
  for (const result of [
    {},
    null,
    { handedness: [[{ categoryName: "Right", score: 1 }]], landmarks: [] },
    malformed,
    degenerate,
  ]) {
    assert.equal(inspectRightHand(result).allowed, false);
    assert.equal(inspectReleaseHands(result).allowed, false);
  }
});
