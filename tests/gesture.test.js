import test from "node:test";
import assert from "node:assert/strict";
import {
  inspectRightHand,
  inspectReleaseHands,
  inspectAttackHands,
  AttackBinding,
  GestureBinding,
  ReleaseBinding,
} from "../dist/src/tracking/gesture.js";

import { fixture, combine, releaseFixture, attackFixture } from "./hand-fixtures.js";
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
test("release requires an upright open left hand and right pinch, without thumb-orientation constraints", () => {
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
  assert.equal(inspectReleaseHands(thumb).allowed, true);
  const tilted = releaseFixture();
  tilted.worldLandmarks[0] = tilted.worldLandmarks[0].map((p) => ({
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
  for (const t of [40, 80, 120, 160]) binding.update(releaseFixture(), t);
  const active = binding.update(releaseFixture(), 200);
  assert.equal(active.active, true);
  assert.ok(active.release > 0);
  assert.equal(binding.update({}, 220).release, null);
  assert.equal(binding.update({}, 420).active, false);
  assert.equal(binding.update(releaseFixture(), 440).release, null);
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

function rotate(points, { yaw = 0, tilt = 0 } = {}) {
  const y = (yaw * Math.PI) / 180,
    t = (tilt * Math.PI) / 180;
  return points.map((p) => {
    const x = p.x * Math.cos(y) + p.z * Math.sin(y),
      z = -p.x * Math.sin(y) + p.z * Math.cos(y);
    return {
      x: x * Math.cos(t) - p.y * Math.sin(t),
      y: x * Math.sin(t) + p.y * Math.cos(t),
      z,
    };
  });
}
function pose({ yaw = 0, tilt = 0, gap = 0.05, score = 0.99 } = {}) {
  const result = releaseFixture();
  result.worldLandmarks[0] = rotate(result.worldLandmarks[0], { yaw, tilt });
  result.worldLandmarks[1][4] = {
    ...result.worldLandmarks[1][8],
    x: result.worldLandmarks[1][8].x + gap * 1.05,
  };
  result.handedness.forEach((hand) => (hand[0].score = score));
  return result;
}
test("upright left hand works palm-on, pinky-on, thumb-on and back-on within 15 degrees", () => {
  for (const yaw of [0, 45, 90, 135, 180, 225, 270, 315]) {
    for (const tilt of [-14, 0, 14])
      assert.equal(
        inspectReleaseHands(pose({ yaw, tilt })).leftOpen,
        true,
        `yaw ${yaw}, tilt ${tilt}`,
      );
    assert.equal(inspectReleaseHands(pose({ yaw, tilt: 25 })).leftOpen, false);
  }
  const forward = pose();
  forward.worldLandmarks[0] = forward.worldLandmarks[0].map((p) => ({
    x: p.x,
    y: p.y * Math.cos(0.4) - p.z * Math.sin(0.4),
    z: p.y * Math.sin(0.4) + p.z * Math.cos(0.4),
  }));
  assert.equal(
    inspectReleaseHands(forward).leftOpen,
    false,
    "depth tilt is also measured",
  );
});
test("one occluded long finger and an unreliable thumb do not reject an otherwise open hand", () => {
  const result = pose();
  result.worldLandmarks[0][16] = { x: -0.3, y: -0.6, z: 0.05 };
  result.worldLandmarks[0][4] = { x: 0, y: 0, z: 0.5 };
  assert.equal(inspectReleaseHands(result).leftOpen, true);
  result.worldLandmarks[0][20] = { x: -0.6, y: -0.6, z: 0.05 };
  assert.equal(
    inspectReleaseHands(result).leftOpen,
    false,
    "a mostly curled hand still fails",
  );
});
test("pinch tolerates contact-pad spacing, rotation, depth uncertainty and moderate handedness confidence", () => {
  for (const yaw of [0, 90, 180, 270]) {
    const result = pose({ gap: 0.32, score: 0.6 });
    result.worldLandmarks[1] = rotate(result.worldLandmarks[1], { yaw });
    assert.equal(inspectReleaseHands(result).pinched, true);
  }
  const uncertain = pose({ gap: 0.65 });
  assert.equal(
    inspectReleaseHands(uncertain).pinched,
    true,
    "close image tips rescue moderate depth error",
  );
  const separate = pose({ gap: 1.1 });
  assert.equal(
    inspectReleaseHands(separate).pinched,
    false,
    "large depth separation cannot be rescued by image overlap",
  );
  const spread = pose({ gap: 0.55 });
  spread.landmarks[1][4].x = spread.landmarks[1][8].x + 0.2;
  assert.equal(inspectReleaseHands(spread).pinched, false);
});
test("both poses stay acquired through boundary jitter and brief tracking loss", () => {
  const binding = new ReleaseBinding();
  binding.reset(0.8);
  for (const t of [0, 40, 80, 120, 160])
    binding.update(pose({ tilt: 14, gap: 0.35 }), t);
  for (let t = 200; t <= 800; t += 40) {
    const result = pose({
      tilt: t % 80 === 0 ? 18 : 14,
      gap: t % 80 === 0 ? 0.5 : 0.35,
    });
    // Keep image tips apart here so only the 3D hysteresis maintains the pinch.
    result.landmarks[1][4].x = result.landmarks[1][8].x + 0.2;
    const sample = binding.update(result, t);
    assert.equal(sample.leftOpen, true);
    assert.equal(sample.pinched, true);
    assert.equal(sample.active, true);
    assert.ok(sample.release !== null);
  }
  const missing = binding.update({}, 840);
  assert.equal(missing.leftOpen, true);
  assert.equal(missing.pinched, true);
  assert.equal(
    missing.release,
    null,
    "missing hands freeze values despite stable indicators",
  );
  assert.ok(binding.update(pose(), 880).release !== null);
  const broken = pose({ tilt: 50, gap: 1.1 });
  assert.equal(binding.update(broken, 920).release, null);
  const ended = binding.update(broken, 1120);
  assert.equal(ended.leftOpen, false);
  assert.equal(ended.pinched, false);
  assert.equal(ended.active, false);
});

test("attack mirrors release across anatomical hands, preserves orientation tolerance and rejects the reverse pose", () => {
  assert.equal(inspectAttackHands(releaseFixture()).allowed, false);
  assert.equal(inspectReleaseHands(attackFixture()).allowed, false);
  for (const yaw of [0, 90, 180, 270]) {
    for (const tilt of [-14, 0, 14, 25]) {
      const result = attackFixture();
      result.worldLandmarks[1] = rotate(result.worldLandmarks[1], { yaw, tilt });
      assert.equal(inspectAttackHands(result).allowed, tilt !== 25);
    }
  }
  const reordered = attackFixture();
  for (const key of ["landmarks", "worldLandmarks", "handedness"]) reordered[key].reverse();
  assert.equal(inspectAttackHands(reordered).allowed, true);
  assert.equal(inspectAttackHands({}).allowed, false);
});
test("attack distance is lateral, bounded to its own parameter range, and longer when spread apart", () => {
  assert.equal(inspectAttackHands(attackFixture({ leftX: 0.3, rightX: 0.3 })).attack, 0.005);
  assert.equal(inspectAttackHands(attackFixture({ leftX: 0.05, rightX: 0.95 })).attack, 1.6);
  const regular = attackFixture(), before = inspectAttackHands(regular).attack;
  regular.landmarks[0] = regular.landmarks[0].map(p => ({ ...p, y: p.y + 0.25 }));
  assert.equal(inspectAttackHands(regular).attack, before);
  assert.ok(inspectAttackHands(attackFixture({leftX:0.1,rightX:0.8})).attack > before);
});
test("attack uses the same acquisition, hysteresis, smoothing and immediate invalid-pose freeze as release", () => {
  const binding = new AttackBinding();
  binding.reset(0.08);
  for (const t of [0, 40, 80, 120]) assert.equal(binding.update(attackFixture(), t).attack, null);
  const active = binding.update(attackFixture(), 160);
  assert.ok(active.attack > 0.08 && active.attack < inspectAttackHands(attackFixture()).attack);
  const relaxed = attackFixture();
  relaxed.worldLandmarks[1] = rotate(relaxed.worldLandmarks[1], { yaw:90, tilt:18 });
  assert.ok(binding.update(relaxed, 200).attack !== null);
  assert.equal(binding.update({}, 240).attack, null);
  assert.equal(binding.update({}, 440).active, false);
});
