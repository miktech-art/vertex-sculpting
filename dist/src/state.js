import { makeDocument, validateDocument } from "./model.js";
const KEY = "sound-form:session:v1";
const REVISION = 3;
export class Store {
  constructor() {
    this.listeners = new Set();
    this.document = makeDocument();
    this.saved = [];
    let initial;
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      // Apply the requested sound/library/connection reset once, then persist new edits normally.
      if ([2, REVISION].includes(data?.revision) && data?.document)
        this.document = validateDocument(data.document);
      if ([2, REVISION].includes(data?.revision) && data?.initial)
        initial = validateDocument(data.initial);
      if ([2, REVISION].includes(data?.revision) && Array.isArray(data?.saved))
        this.saved = data.saved.slice(0, 40).map(validateDocument);
      if (data?.revision === 2) {
        this.document = { ...makeDocument(), routes: this.document.routes };
        initial = structuredClone(this.document);
      }
    } catch {
      /* Invalid or unavailable storage starts clean. */
    }
    this.initial = initial || structuredClone(this.document);
    this.undoStack = [];
    this.redoStack = [];
    this.checkpoint = null;
    this.persist();
  }
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  emit(kind = "change") {
    for (const fn of this.listeners) fn(this.document, kind);
    clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => this.persist(), 200);
  }
  persist() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          revision: REVISION,
          document: this.document,
          initial: this.initial,
          saved: this.saved,
        }),
      );
    } catch {}
  }
  begin() {
    if (!this.checkpoint) this.checkpoint = this.snapshot();
  }
  snapshot() {
    return structuredClone({ document: this.document, initial: this.initial });
  }
  restore(snapshot) {
    this.document = snapshot.document;
    this.initial = snapshot.initial;
  }
  commit() {
    if (
      this.checkpoint &&
      JSON.stringify(this.checkpoint) !== JSON.stringify(this.snapshot())
    ) {
      this.undoStack.push(this.checkpoint);
      if (this.undoStack.length > 60) this.undoStack.shift();
      this.redoStack = [];
    }
    this.checkpoint = null;
    this.emit("commit");
  }
  edit(fn, kind = "change") {
    this.begin();
    fn(this.document);
    this.emit(kind);
  }
  transaction(fn, kind = "load") {
    this.begin();
    fn(this.document);
    this.commit();
    this.emit(kind);
  }
  load(document) {
    const next = validateDocument(document);
    this.begin();
    this.document = next;
    this.initial = structuredClone(next);
    this.commit();
    this.emit("load");
  }
  undo() {
    if (!this.undoStack.length) return;
    this.redoStack.push(this.snapshot());
    this.restore(this.undoStack.pop());
    this.checkpoint = null;
    this.emit("load");
  }
  redo() {
    if (!this.redoStack.length) return;
    this.undoStack.push(this.snapshot());
    this.restore(this.redoStack.pop());
    this.checkpoint = null;
    this.emit("load");
  }
  save(name) {
    const doc = structuredClone(this.document);
    doc.name = name.trim().slice(0, 60) || "Untitled";
    this.document.name = doc.name;
    this.saved.unshift(doc);
    this.saved = this.saved.slice(0, 40);
    this.emit("save");
  }
}
