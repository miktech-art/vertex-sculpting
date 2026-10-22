import test from "node:test";
import assert from "node:assert/strict";
import {
  inspectLoopHand,
  inspectReleaseHands,
  inspectAttackHands,
  AttackBinding,
  LoopBinding,
  ReleaseBinding,
} from "../apps/sculpt/src/tracking/gesture.js";

import { fixture, combine, releaseFixture, attackFixture, loopFixture } from "./hand-fixtures.js";
test("a single raised anatomical left index gates Loop, without requiring palm contact", () => {
  assert.equal(inspectLoopHand(loopFixture()).allowed, true);
  assert.equal(inspectLoopHand(loopFixture({hand:"Right"})).allowed, false);
  assert.equal(inspectLoopHand(loopFixture({score:0.6})).allowed, false);
  assert.equal(inspectLoopHand(loopFixture({closed:false})).allowed, false);
  assert.equal(inspectLoopHand(loopFixture({indexStraight:false})).allowed, false);
  const loose = loopFixture();
  for (const tip of [12,16,20]) loose.worldLandmarks[0][tip].z = 0.5;
  assert.equal(inspectLoopHand(loose).allowed, true, "loose curls need not touch the palm");
  loose.worldLandmarks[0][4] = {x:0,y:0,z:2};
  assert.equal(inspectLoopHand(loose).allowed, true, "thumb pose is unrestricted");
});
test("finger height and hand screen position cannot modify pitch or Loop recognition", () => {
  for (const y of [0,0.2,0.5,0.8,1]) {
    const sample = inspectLoopHand(loopFixture({y}));
    assert.equal(sample.allowed, true);
    assert.equal("pitch" in sample, false);
    assert.equal("normalized" in sample, false);
  }
  for (const order of [false,true]) {
    const result = combine(loopFixture({hand:"Left",x:0.8}),loopFixture({x:0.2}));
    if (order) for (const key of ["landmarks","worldLandmarks","handedness"]) result[key].reverse();
    assert.equal(inspectLoopHand(result).allowed,true);
  }
});
test("loop index points upward independent of palm facing, and dropping it turns the gate off", () => {
  for (const yaw of [0,90,180,270]) {
    const result = loopFixture();
    result.worldLandmarks[0] = rotate(result.worldLandmarks[0],{yaw});
    assert.equal(inspectLoopHand(result).allowed,true);
    result.worldLandmarks[0] = rotate(result.worldLandmarks[0],{tilt:90});
    result.landmarks[0] = rotate(result.landmarks[0],{tilt:90});
    assert.equal(inspectLoopHand(result).allowed,false);
  }
});
test("Loop acquires once, tolerates brief jitter, and turns off after lowered or missing index", () => {
  const binding = new LoopBinding();
  assert.equal(binding.update(loopFixture(),0).active,false);
  assert.equal(binding.update(loopFixture(),80).active,false);
  assert.equal(binding.update(loopFixture(),160).active,true);
  assert.equal(binding.update({},200).active,true);
  assert.equal(binding.update(loopFixture(),240).active,true);
  assert.equal(binding.update(loopFixture({indexStraight:false}),280).active,true);
  assert.equal(binding.update(loopFixture({indexStraight:false}),400).active,false);
  assert.equal(binding.update(loopFixture(),440).active,false);
  assert.equal(binding.update(loopFixture(),600).active,true);
  assert.equal(binding.update({},640).active,true);
  assert.equal(binding.update({},760).active,false);
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
  const malformed = loopFixture();
  malformed.worldLandmarks[0][12].z = NaN;
  const degenerate = loopFixture();
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
    assert.equal(inspectLoopHand(result).allowed, false);
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

test("a visibly raised index survives incorrect world depth and naturally bent joints", () => {
  const result = loopFixture();
  result.worldLandmarks[0][6].z = 0.5;
  result.worldLandmarks[0][7].z = -0.3;
  result.worldLandmarks[0][8].z = 0.9;
  assert.equal(inspectLoopHand(result).indexRaised, true);
  // A natural curve in the visible finger also remains raised.
  result.landmarks[0][7].x += 0.025;
  result.landmarks[0][8].x += 0.04;
  assert.equal(inspectLoopHand(result).allowed, true);
});
test("a straight world index cannot rescue a visibly dropped or hooked finger", () => {
  const result = loopFixture();
  const image = result.landmarks[0];
  image[8].y = image[5].y + 0.03;
  assert.equal(inspectLoopHand(result).indexRaised, false);
  const hooked = loopFixture();
  hooked.landmarks[0][8].y = hooked.landmarks[0][6].y + 0.015;
  assert.equal(inspectLoopHand(hooked).indexRaised, false);
});
test("visible-index detection handles aspect ratio, scale, screen position and edge-on hands", () => {
  for (const yaw of [0, 90, 180, 270]) {
    const result = loopFixture();
    const rotated = rotate(result.worldLandmarks[0], { yaw });
    result.landmarks[0] = rotated.map(p => ({ x:0.5+p.x*0.08, y:0.7+p.y*0.12, z:0 }));
    result.frameAspectRatio = 4/3;
    assert.equal(inspectLoopHand(result).allowed, true, `yaw ${yaw}`);
    for (const point of result.landmarks[0]) {
      point.x = 0.2 + point.x*0.4;
      point.y = 0.3 + point.y*0.4;
    }
    assert.equal(inspectLoopHand(result).allowed, true);
  }
  const result = loopFixture();
  result.frameAspectRatio = 16/9;
  assert.equal(inspectLoopHand(result).allowed, true);
});
