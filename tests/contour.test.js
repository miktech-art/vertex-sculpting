import test from "node:test";
import assert from "node:assert/strict";
import { BASE, duration } from "../apps/sculpt/src/model.js";
import { editEnvelopeHandle, envelopeExtent } from "../apps/sculpt/src/ui/contour.js";

test("attack handle changes attack without changing the other stages", () => {
  const p = { ...BASE };
  const edited = { ...p, ...editEnvelopeHandle(p, "attack", 0.4) };
  assert.equal(edited.attack, 0.4);
  assert.equal(edited.decay, p.decay);
  assert.equal(edited.hold, p.hold);
  assert.equal(edited.release, p.release);
});
test("decay and hold handles control time and the shared sustain level", () => {
  const p = { ...BASE, attack: 0.1, decay: 0.2, hold: 0.3 };
  const decay = editEnvelopeHandle(p, "decay", 0.6, 0.45);
  assert.equal(decay.decay, 0.5);
  assert.equal(decay.sustain, 0.45);
  const hold = editEnvelopeHandle(p, "hold", 1, 0.7);
  assert.ok(Math.abs(hold.hold - 0.7) < 1e-9);
  assert.equal(hold.sustain, 0.7);
});
test("release is measured after note-off and can extend beyond the initial endpoint", () => {
  const p = { ...BASE, attack: 0.1, decay: 0.2, hold: 0.3, release: 0.4 };
  const edited = editEnvelopeHandle(p, "release", 1.4);
  assert.ok(Math.abs(edited.release - 0.8) < 1e-9);
  assert.ok(envelopeExtent(p) > duration(p));
});
test("dragging beyond the graph keeps every time and level within synth limits", () => {
  for (const handle of ["attack", "decay", "hold", "release"]) {
    for (const [seconds, level] of [
      [-100, -100],
      [100, 100],
    ]) {
      const values = editEnvelopeHandle(BASE, handle, seconds, level);
      assert.ok(values[handle] > 0 && Number.isFinite(values[handle]));
      if ("sustain" in values)
        assert.ok(values.sustain >= 0 && values.sustain <= 1);
    }
  }
});
