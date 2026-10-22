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
    onGate: (active) => events.push(["note", active]),
    onPitch: (value) => events.push(["pitch", value]),
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
test("right pitch pose gates notes while release gesture only edits release", () => {
  const { hand, events } = controller();
  hand.consume(fixture(), 0);
  hand.consume(fixture(), 160);
  assert.ok(events.some(([kind, v]) => kind === "note" && v === true));
  assert.ok(events.some(([kind]) => kind === "pitch"));
  events.length = 0;
  hand.consume(releaseFixture(), 200);
  hand.consume(releaseFixture(), 320);
  hand.consume(releaseFixture(), 400);
  assert.ok(events.some(([kind, v]) => kind === "note" && v === false));
  assert.ok(events.some(([kind]) => kind === "release"));
  assert.equal(
    events.some(([kind]) => kind === "pitch"),
    false,
  );
  assert.equal(
    events.some(([kind, v]) => kind === "note" && v === true),
    false,
  );
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
    events.some(([k]) => k === "release" || k === "pitch"),
    false,
  );
});

test("attack edits only attack and transitions to release within one undo transaction", () => {
  const { hand, events } = controller();
  for (const t of [0, 40, 80, 120, 160, 200]) hand.consume(attackFixture(), t);
  assert.ok(events.some(([k]) => k === "attack"));
  assert.equal(events.some(([k]) => ["pitch", "release", "note"].includes(k)), false);
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
