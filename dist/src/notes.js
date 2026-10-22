import { DEFAULT_NOTE_FREQUENCY } from "./model.js";

export const PIANO_NOTES = [60, 62, 64, 65, 67, 69, 71, 72].map((midi, i) => ({
  key: "asdfghjk"[i],
  midi,
}));
export const midiFrequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

// Transient performance state; patch persistence and undo never contain pitch.
// One representative note is selected using most-recent-note priority.
export class NoteInput {
  constructor({ onChange = () => {}, onTrigger = () => {} } = {}) {
    this.onChange = onChange;
    this.onTrigger = onTrigger;
    this.active = new Map();
    this.frequency = DEFAULT_NOTE_FREQUENCY;
  }
  noteOn(midi, owner = "external") {
    if (!Number.isInteger(midi) || midi < 0 || midi > 127) return;
    const owners = this.active.get(midi) ?? new Set();
    if (owners.has(owner)) return;
    owners.add(owner);
    this.active.delete(midi);
    this.active.set(midi, owners);
    this.frequency = midiFrequency(midi);
    this.onChange(this);
    this.onTrigger(midi);
  }
  noteOff(midi, owner = "external") {
    const owners = this.active.get(midi);
    if (!owners?.delete(owner)) return;
    if (!owners.size) this.active.delete(midi);
    if (this.active.size)
      this.frequency = midiFrequency([...this.active.keys()].at(-1));
    this.onChange(this);
  }
  clear() {
    this.active.clear();
    this.onChange(this);
  }
}

export function installNoteKeyboard(target, notes, hasDialog = () => false) {
  const pressed = new Map();
  const releaseAll = () => {
    for (const [code, midi] of pressed) notes.noteOff(midi, code);
    pressed.clear();
  };
  target.addEventListener("keydown", (event) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.repeat ||
      hasDialog()
    )
      return;
    if (
      event.target?.isContentEditable ||
      event.target?.matches('textarea,select,input:not([type="range"])')
    )
      return;
    const match = PIANO_NOTES.find(
      ({ key }) => event.code === `Key${key.toUpperCase()}`,
    );
    if (!match || pressed.has(event.code)) return;
    event.preventDefault();
    pressed.set(event.code, match.midi);
    notes.noteOn(match.midi, event.code);
  });
  target.addEventListener("keyup", (event) => {
    const midi = pressed.get(event.code);
    if (midi === undefined) return;
    pressed.delete(event.code);
    notes.noteOff(midi, event.code);
  });
  target.addEventListener("visibilitychange", () => {
    if (target.hidden) releaseAll();
  });
  target.defaultView?.addEventListener("blur", releaseAll);
  return releaseAll;
}
