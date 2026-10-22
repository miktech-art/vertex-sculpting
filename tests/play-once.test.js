import test from "node:test";
import assert from "node:assert/strict";
import { installPlayOnceShortcut } from "../dist/src/ui/play-once.js";

test("Space plays once from buttons and sliders, suppresses native activation and ignores key repeat", () => {
  let listener, calls = 0;
  installPlayOnceShortcut({ addEventListener(type, fn, capture) { assert.equal(type, "keydown"); assert.equal(capture, true); listener = fn; } }, () => calls++, () => false);
  for (const kind of ["button", "range"]) {
    let prevented = 0, stopped = 0;
    const event = { code: "Space", target: { matches: () => false }, preventDefault() { prevented++; }, stopPropagation() { stopped++; } };
    listener(event);
    listener({ ...event, repeat: true });
    assert.equal(prevented, 2, kind);
    assert.equal(stopped, 2, kind);
  }
  assert.equal(calls, 2);
});
test("Space keeps text fields, editable content, dialogs and modified shortcuts usable", () => {
  let listener, dialog = false, calls = 0;
  installPlayOnceShortcut({ addEventListener(_, fn) { listener = fn; } }, () => calls++, () => dialog);
  const event = { code: "Space", target: { matches: () => false }, preventDefault() { throw new Error("must preserve native behavior"); } };
  listener({ ...event, target: { matches: () => true } });
  listener({ ...event, target: { isContentEditable: true } });
  for (const key of ["metaKey", "ctrlKey", "altKey"]) listener({ ...event, [key]: true });
  listener({ ...event, code: "KeyL" });
  dialog = true;
  listener(event);
  assert.equal(calls, 0);
});
