import test from "node:test";
import assert from "node:assert/strict";
import { HandController } from "../dist/src/tracking/controller.js";
import { fixture, releaseFixture, attackFixture } from "./hand-fixtures.js";

function controller() {
  globalThis.document = {
    querySelector: () => ({ addEventListener() {} }),
    addEventListener() {},
  };
  globalThis.window = { addEventListener() {} };
  const events = [];
  const hand = new HandController({
    onLoop: (active) => events.push(["loop", active]),
    onRelease: (value) => events.push(["release", value]),
    onAttack: (value) => events.push(["attack", value]),
    onEditing: (active) => events.push(["edit", active]),
  });
  hand.active = true;
  hand.draw = () => {};
  hand.indicators = () => {};
  hand.setStatus = () => {};
  return { hand, events };
}
test("right index emits one loop-on edge and one loop-off edge, without editing the preset", () => {
  const {hand,events} = controller();
  for (const t of [0,80,160,240,320,400]) hand.consume(fixture(),t);
  assert.deepEqual(events,[["loop",true]]);
  for (const t of [440,560,640]) hand.consume(fixture({indexStraight:false}),t);
  assert.deepEqual(events,[["loop",true],["loop",false]]);
});
test("release takes priority over Loop and never turns Loop on", () => {
  const {hand,events} = controller();
  hand.consume(fixture(),0);
  hand.consume(fixture(),160);
  events.length = 0;
  for (const t of [200,280,360,440]) hand.consume(releaseFixture(),t);
  assert.ok(events.some(([k,v]) => k === "loop" && v === false));
  assert.ok(events.some(([k]) => k === "release"));
  assert.equal(events.some(([k,v]) => k === "loop" && v === true),false);
});
test("manual disarm stops a raised-index loop and blocks it until lowered and raised again", () => {
  const {hand,events} = controller();
  hand.consume(fixture(),0);
  hand.consume(fixture(),160);
  hand.disarm();
  for (const t of [200,400,600]) hand.consume(fixture(),t);
  assert.deepEqual(events,[["loop",true],["loop",false]]);
  hand.consume({},640);
  for (const t of [680,760,840]) hand.consume(fixture(),t);
  assert.deepEqual(events,[["loop",true],["loop",false],["loop",true]]);
});
test("one undo transaction covers a gesture and commits on loss or manual stop", () => {
  const { hand, events } = controller();
  hand.consume(releaseFixture(), 0);
  for (const t of [40, 80, 120, 160, 200, 250])
    hand.consume(releaseFixture(), t);
  hand.consume({}, 300);
  hand.consume({}, 490);
  hand.consume({}, 500);
  assert.deepEqual(
    events.filter(([k]) => k === "edit"),
    [
      ["edit", true],
      ["edit", false],
    ],
  );
  for (const t of [600, 640, 680, 720, 760, 800])
    hand.consume(releaseFixture(), t);
  hand.disarm();
  assert.deepEqual(
    events.filter(([k]) => k === "edit"),
    [
      ["edit", true],
      ["edit", false],
      ["edit", true],
      ["edit", false],
    ],
  );
  events.length = 0;
  hand.consume(releaseFixture(), 1000);
  assert.equal(events.length, 0, "stop blocks an existing pose until relaxed");
});
test("breaking either release pose freezes edits immediately, including release hysteresis", () => {
  const { hand, events } = controller();
  for (const t of [0, 40, 80, 120, 160, 200]) hand.consume(releaseFixture(), t);
  assert.ok(events.some(([k]) => k === "release"));
  events.length = 0;
  hand.consume(fixture({ hand: "Left", closed: false }), 220);
  assert.equal(
    events.some(([k]) => k === "release" || k === "loop"),
    false,
  );
});

test("attack edits only attack and transitions to release within one undo transaction", () => {
  const { hand, events } = controller();
  for (const t of [0, 40, 80, 120, 160, 200]) hand.consume(attackFixture(), t);
  assert.ok(events.some(([k]) => k === "attack"));
  assert.equal(events.some(([k]) => ["loop", "release"].includes(k)), false);
  const attackCount = events.filter(([k]) => k === "attack").length;
  hand.consume({}, 220);
  assert.equal(events.filter(([k]) => k === "attack").length, attackCount);
  for (const t of [240, 280, 320, 360, 400, 440]) hand.consume(releaseFixture(), t);
  assert.ok(events.some(([k]) => k === "release"));
  hand.consume({}, 460);
  hand.consume({}, 700);
  assert.deepEqual(events.filter(([k]) => k === "edit"), [["edit", true], ["edit", false]]);
});
test("manual stop blocks the attack pose until both hands relax", () => {
  const { hand, events } = controller();
  for (const t of [0, 40, 80, 120, 160]) hand.consume(attackFixture(), t);
  hand.disarm();
  events.length = 0;
  for (const t of [200, 280, 360, 440]) hand.consume(attackFixture(), t);
  assert.equal(events.length, 0);
  hand.consume({}, 500);
  for (const t of [540, 580, 620, 660, 700, 740]) hand.consume(attackFixture(), t);
  assert.ok(events.some(([k]) => k === "attack"));
});

test("visible raised-index depth errors still turn Loop on; visibly dropping it turns Loop off", () => {
  const { hand, events } = controller();
  const raised = fixture();
  raised.worldLandmarks[0][6].z = 0.5;
  raised.worldLandmarks[0][8].z = 1;
  for (const t of [0, 80, 160, 240]) hand.consume(raised, t);
  assert.deepEqual(events, [["loop", true]]);
  const lowered = structuredClone(raised);
  lowered.landmarks[0][8].y = lowered.landmarks[0][5].y + 0.04;
  hand.consume(lowered, 280);
  hand.consume(lowered, 400);
  assert.deepEqual(events, [["loop", true], ["loop", false]]);
});
