import { makeDocument, validateDocument } from "./model.js";
const KEY = "sound-form:session:v1";
const REVISION = 5;
export class Store {
  constructor() {
    this.listeners = new Set();
    this.document = makeDocument();
    this.saved = [];
    this.deleted = [];
    this.activeSavedId = null;
    let initial;
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      // Apply the requested sound/library/connection reset once, then persist new edits normally.
      if ([2, 3, 4, REVISION].includes(data?.revision) && data?.document)
        this.document = validateDocument(data.document);
      if ([2, 3, 4, REVISION].includes(data?.revision) && data?.initial)
        initial = validateDocument(data.initial);
      if ([2, 3, 4, REVISION].includes(data?.revision) && Array.isArray(data?.saved))
        this.saved = data.saved.flatMap((doc) => {
          try {
            return [{ ...validateDocument(doc), libraryId: doc.libraryId || crypto.randomUUID() }];
          } catch { return []; }
        });
      if ([2, 3, 4, REVISION].includes(data?.revision) && Array.isArray(data?.deleted))
        this.deleted = data.deleted.flatMap((doc) => {
          try { return [{ ...validateDocument(doc), libraryId: doc.libraryId || crypto.randomUUID() }]; }
          catch { return []; }
        });
      this.activeSavedId = this.saved.some((doc) => doc.libraryId === data?.activeSavedId)
        ? data.activeSavedId : null;
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
          deleted: this.deleted,
          activeSavedId: this.activeSavedId,
        }),
      );
    } catch { return false; }
    return true;
  }
  begin() {
    if (!this.checkpoint) this.checkpoint = this.snapshot();
  }
  snapshot() {
    return structuredClone({ document: this.document, initial: this.initial, activeSavedId: this.activeSavedId });
  }
  restore(snapshot) {
    this.document = snapshot.document;
    this.initial = snapshot.initial;
    this.activeSavedId = this.saved.some((doc) => doc.libraryId === snapshot.activeSavedId)
      ? snapshot.activeSavedId : null;
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
  load(document, savedId = null) {
    const next = validateDocument(document);
    this.begin();
    this.document = next;
    this.activeSavedId = savedId;
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
  updateLibrary(fn) {
    const previous = this.snapshot(), saved = this.saved, deleted = this.deleted;
    const result = fn();
    clearTimeout(this.persistTimer);
    if (!this.persist()) {
      this.saved = saved;
      this.deleted = deleted;
      this.restore(previous);
      throw new Error("Could not update sounds in this browser. Free up browser storage and try again.");
    }
    this.emit("library");
    return result;
  }
  renameSaved(id, name) {
    const nextName = name.trim().slice(0, 60);
    if (!nextName) throw new Error("Enter a sound name.");
    if (!this.saved.some((doc) => doc.libraryId === id)) throw new Error("This sound is no longer saved.");
    this.updateLibrary(() => {
      this.saved = this.saved.map((doc) => doc.libraryId === id ? { ...doc, name: nextName } : doc);
      if (this.activeSavedId === id) {
        this.document = { ...this.document, name: nextName };
        this.initial = { ...this.initial, name: nextName };
      }
    });
    // Parameter undo must not revive an old library name.
    for (const snapshot of [...this.undoStack, ...this.redoStack, this.checkpoint]) {
      if (snapshot?.activeSavedId === id) {
        snapshot.document.name = nextName;
        snapshot.initial.name = nextName;
      }
    }
  }
  deleteSaved(id) {
    const doc = this.saved.find((item) => item.libraryId === id);
    if (!doc) throw new Error("This sound is no longer saved.");
    return this.updateLibrary(() => {
      this.saved = this.saved.filter((item) => item.libraryId !== id);
      this.deleted = [doc, ...this.deleted];
      if (this.activeSavedId === id) this.activeSavedId = null;
      return doc;
    });
  }
  restoreSaved(id) {
    const doc = this.deleted.find((item) => item.libraryId === id);
    if (!doc) throw new Error("This sound is no longer in Recently deleted.");
    return this.updateLibrary(() => {
      this.deleted = this.deleted.filter((item) => item.libraryId !== id);
      this.saved = [doc, ...this.saved];
      return doc;
    });
  }
  get hasUnsavedChanges() {
    const baseline = this.saved.find((doc) => doc.libraryId === this.activeSavedId) || this.initial;
    return JSON.stringify(validateDocument(this.document)) !== JSON.stringify(validateDocument(baseline));
  }
  save(name, { asNew = false } = {}) {
    const previous = this.snapshot(), previousSaved = this.saved;
    const existing = !asNew && this.saved.find((doc) => doc.libraryId === this.activeSavedId);
    const doc = structuredClone(this.document);
    doc.name = name.trim().slice(0, 60) || "Untitled";
    const saved = { ...structuredClone(doc), libraryId: existing?.libraryId || crypto.randomUUID() };
    this.saved = existing
      ? this.saved.map((item) => item.libraryId === existing.libraryId ? saved : item)
      : [saved, ...this.saved];
    this.document = doc;
    this.initial = structuredClone(doc);
    this.activeSavedId = saved.libraryId;
    clearTimeout(this.persistTimer);
    if (!this.persist()) {
      this.restore(previous);
      this.saved = previousSaved;
      throw new Error("Could not save in this browser. Free up browser storage or export JSON to keep this sound.");
    }
    this.emit("save");
    return saved;
  }
}
