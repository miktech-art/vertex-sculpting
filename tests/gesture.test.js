import test from "node:test";
import assert from "node:assert/strict";
import {
  inspectRightHand,
  GestureBinding,
} from "../dist/src/tracking/gesture.js";

function fixture({
  hand = "Right",
  curled = [true, true, true],
  y = 0.5,
  score = 0.99,
} = {}) {
  const world = Array.from({ length: 21 }, () => ({ x: 0, y: 0, z: 0 }));
  for (const [f, mcp] of [9, 13, 17].entries()) {
    const x = (f - 1) * 0.3;
    world[mcp] = { x, y: 1, z: 0 };
    world[mcp + 1] = { x, y: 2, z: 0 };
    world[mcp + 2] = { x, y: curled[f] ? 1.5 : 3, z: curled[f] ? 0.5 : 0 };
    world[mcp + 3] = { x, y: curled[f] ? 1 : 4, z: curled[f] ? 0.8 : 0 };
  }
  const image = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
  image[8].y = y;
  return {
    handedness: [[{ categoryName: hand, score }]],
    worldLandmarks: [world],
    landmarks: [image],
  };
}
test("only the right hand with all three non-thumb/non-index fingers curled is allowed", () => {
  assert.equal(inspectRightHand(fixture()).allowed, true);
  assert.equal(inspectRightHand(fixture({ hand: "Left" })).allowed, false);
  for (let i = 0; i < 3; i++) {
    const curled = [true, true, true];
    curled[i] = false;
    assert.equal(inspectRightHand(fixture({ curled })).allowed, false);
  }
  assert.equal(inspectRightHand(fixture({ score: 0.6 })).allowed, false);
});
test("thumb and index curl do not add extra gate requirements", () => {
  const result = fixture();
  for (const i of [1, 2, 3, 4, 5, 6, 7, 8])
    result.worldLandmarks[0][i] = { x: 20 + i, y: -i, z: 3 };
  assert.equal(inspectRightHand(result).allowed, true);
});
test("curl detection is invariant to hand rotation and translation", () => {
  const result = fixture();
  result.worldLandmarks[0] = result.worldLandmarks[0].map((p) => ({
    x: 4 + p.y,
    y: 2 - p.z,
    z: 9 - p.x,
  }));
  assert.equal(inspectRightHand(result).allowed, true);
});
test("moving the index upward increases pitch across a bounded logarithmic range", () => {
  const high = inspectRightHand(fixture({ y: 0 })),
    low = inspectRightHand(fixture({ y: 1 }));
  assert.equal(high.pitch, 1760);
  assert.equal(low.pitch, 55);
  assert.ok(
    inspectRightHand(fixture({ y: 0.25 })).pitch >
      inspectRightHand(fixture({ y: 0.75 })).pitch,
  );
});
test("a left hand does not prevent the other, right hand from being selected", () => {
  const left = fixture({ hand: "Left" }),
    right = fixture({ y: 0.2 });
  const sample = inspectRightHand({
    handedness: [...left.handedness, ...right.handedness],
    landmarks: [...left.landmarks, ...right.landmarks],
    worldLandmarks: [...left.worldLandmarks, ...right.worldLandmarks],
  });
  assert.equal(sample.allowed, true);
  assert.equal(sample.normalized, inspectRightHand(right).normalized);
});
test("activation requires a stable pose and invalid poses stop pitch updates immediately", () => {
  const binding = new GestureBinding();
  binding.reset(220);
  assert.equal(binding.update(fixture({ y: 0.2 }), 0).active, false);
  assert.equal(binding.update(fixture({ y: 0.2 }), 80).pitch, null);
  const active = binding.update(fixture({ y: 0.2 }), 160);
  assert.equal(active.active, true);
  assert.ok(active.pitch > 220);
  const invalid = binding.update(fixture({ curled: [true, false, true] }), 180);
  assert.equal(invalid.pitch, null);
  assert.equal(invalid.active, true);
  assert.equal(binding.update({}, 300).active, false);
});
test("missing or malformed landmarks cannot activate the binding", () => {
  for (const result of [
    {},
    null,
    { handedness: [[{ categoryName: "Right", score: 1 }]], landmarks: [] },
  ])
    assert.equal(inspectRightHand(result).allowed, false);
  const result = fixture();
  result.worldLandmarks[0][12].z = NaN;
  assert.equal(inspectRightHand(result).allowed, false);
});
