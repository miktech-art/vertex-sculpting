import test from "node:test";
import assert from "node:assert/strict";
import { HandController } from "../dist/src/tracking/controller.js";
import { fixture, releaseFixture } from "./hand-fixtures.js";

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
  hand.consume(releaseFixture(), 200);
  hand.consume(releaseFixture(), 250);
  hand.consume({}, 300);
  hand.consume({}, 420);
  hand.consume({}, 500);
  assert.deepEqual(
    events.filter(([k]) => k === "edit"),
    [
      ["edit", true],
      ["edit", false],
    ],
  );
  hand.consume(releaseFixture(), 600);
  hand.consume(releaseFixture(), 800);
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
  hand.consume(releaseFixture(), 0);
  hand.consume(releaseFixture(), 200);
  events.length = 0;
  hand.consume(fixture({ hand: "Left", closed: false }), 220);
  assert.equal(
    events.some(([k]) => k === "release" || k === "pitch"),
    false,
  );
});
