import test from "node:test";
import assert from "node:assert/strict";
import {
  NoteInput,
  midiFrequency,
  installNoteKeyboard,
} from "../dist/src/notes.js";

test("chords use the most recent note and fall back to remaining held notes", () => {
  let triggers = 0;
  const notes = new NoteInput({ onTrigger: () => triggers++ });
  notes.noteOn(60);
  notes.noteOn(64);
  notes.noteOn(67);
  assert.equal(notes.frequency, midiFrequency(67));
  assert.equal(notes.active.size, 3);
  notes.noteOff(67);
  assert.equal(notes.frequency, midiFrequency(64));
  notes.noteOff(64);
  notes.noteOff(60);
  assert.equal(notes.active.size, 0);
  assert.equal(notes.frequency, midiFrequency(60));
  assert.equal(triggers, 3);
});

test("separate pointer and keyboard owners cannot release each other's note", () => {
  let triggers = 0;
  const notes = new NoteInput({ onTrigger: () => triggers++ });
  notes.noteOn(69, "KeyH");
  notes.noteOn(69, "KeyH");
  notes.noteOn(69, "pointer-1");
  notes.noteOff(69, "KeyH");
  assert.equal(notes.active.has(69), true);
  notes.noteOff(69, "pointer-1");
  assert.equal(notes.active.has(69), false);
  assert.equal(triggers, 2);
  for (const midi of [-1, 128, NaN, 60.5]) notes.noteOn(midi);
  assert.equal(notes.active.size, 0);
  notes.noteOn(60);
  notes.clear();
  assert.equal(notes.active.size, 0);
});

test("piano shortcuts preserve text entry and modifiers and release even if a dialog opens", () => {
  const listeners = {},
    windowListeners = {};
  const target = {
    addEventListener: (name, fn) => (listeners[name] = fn),
    defaultView: {
      addEventListener: (name, fn) => (windowListeners[name] = fn),
    },
  };
  const notes = new NoteInput();
  let dialog = false;
  installNoteKeyboard(target, notes, () => dialog);
  const base = {
    code: "KeyA",
    target: { matches: () => false },
    preventDefault() {},
  };
  for (const extras of [
    { ctrlKey: true },
    { metaKey: true },
    { altKey: true },
    { repeat: true },
    { target: { matches: () => true } },
    { target: { isContentEditable: true } },
  ])
    listeners.keydown({ ...base, ...extras });
  assert.equal(notes.active.size, 0);
  listeners.keydown(base);
  assert.equal(notes.frequency, midiFrequency(60));
  dialog = true;
  listeners.keyup(base);
  assert.equal(notes.active.size, 0);
  listeners.keydown({ ...base, code: "KeyK" });
  assert.equal(notes.active.size, 0);
  dialog = false;
  listeners.keydown({ ...base, code: "KeyK" });
  assert.equal(notes.frequency, midiFrequency(72));
  windowListeners.blur();
  assert.equal(notes.active.size, 0);
});
