import test from "node:test";
import assert from "node:assert/strict";
import { installLiveRange } from "../apps/sculpt/src/ui/live-range.js";

test("pointer movement emits live input before pointer release; release commits once", () => {
  const listeners = new Map(),
    events = [];
  const input = {
    min: "0",
    max: "1000",
    value: "0",
    style: {},
    focus() {},
    setPointerCapture() {},
    getBoundingClientRect: () => ({ left: 0, width: 207 }),
    addEventListener: (name, fn) => {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(fn);
    },
    dispatchEvent: (event) => {
      events.push([event.type, input.value]);
      for (const fn of listeners.get(event.type) || []) fn(event);
    },
  };
  installLiveRange(input);
  const emit = (type, x) =>
    (listeners.get(type) || []).forEach((fn) =>
      fn({ button: 0, clientX: x, pointerId: 1, preventDefault() {} }),
    );
  emit("pointerdown", 3.5);
  emit("pointermove", 103.5);
  assert.deepEqual(events, [
    ["input", "0"],
    ["input", "500"],
  ]);
  emit("pointermove", 203.5);
  assert.equal(input.value, "1000");
  assert.equal(
    events.some(([type]) => type === "change"),
    false,
  );
  emit("pointerup", 203.5);
  emit("pointerup", 203.5);
  assert.equal(events.filter(([type]) => type === "change").length, 1);
});
