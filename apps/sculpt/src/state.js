import { BASE, makeDocument, validateDocument, PRESETS } from "./model.js";
const KEY = "sound-form:session:v1";
const REVISION = 6;
export class Store {
  constructor() {
    this.listeners = new Set();
    this.document = makeDocument();
    this.saved = [];
    this.deleted = [];
    this.activeSavedId = null;
    this.drafts = new Map();
    let initial, data, raw;
    let unreadable = false;
    try {
      raw = localStorage.getItem(KEY);
      data = JSON.parse(raw);
    } catch { unreadable = !!raw; }
    const decode = (doc) => {
      try { return validateDocument(doc); }
      catch { unreadable = true; return null; }
    };
    if ([2, 3, 4, 5, REVISION].includes(data?.revision)) {
      if (data.document) this.document = decode(data.document) || this.document;
      if (data.initial) initial = decode(data.initial);
      for (const collection of ["saved", "deleted"]) {
        if (!Array.isArray(data[collection])) continue;
        this[collection] = data[collection].flatMap((doc) => {
          const valid = decode(doc);
          return valid ? [{ ...valid, libraryId: doc.libraryId || crypto.randomUUID() }] : [];
        });
      }
      this.activeSavedId = this.saved.some((doc) => doc.libraryId === data.activeSavedId)
        ? data.activeSavedId : null;
      if (data.revision === 2) {
        this.document = { ...makeDocument(), routes: this.document.routes };
        initial = structuredClone(this.document);
      }
    } else if (raw) unreadable = true;
    this.initial = initial || structuredClone(this.document);
    const factory = PRESETS.find(p => p.name === this.document.name);
    this.activeSoundKey = typeof data?.activeSoundKey === 'string' ? data.activeSoundKey :
      this.activeSavedId ? `saved:${this.activeSavedId}` : factory ? `factory:${factory.id}` : 'new';
    for (const [key, draft] of Object.entries(data?.drafts || {})) {
      const document = decode(draft?.document), baseline = decode(draft?.initial);
      if (document && baseline) this.drafts.set(key, { document, initial: baseline });
    }
    if(data?.revision!==REVISION){
      // The four starter sounds become ordinary library instances exactly once.
      // Keep saved factory overrides and unsaved per-sound drafts separately.
      const basics=PRESETS.map(preset=>{
        const key=`factory:${preset.id}`,libraryId=`basic-${preset.id}`;
        const rawSaved=data?.factorySaved?.[preset.id];
        const saved=(rawSaved&&decode(rawSaved))||makeDocument(preset);
        const draft=this.drafts.get(key);
        if(draft){this.drafts.set(`saved:${libraryId}`,draft);this.drafts.delete(key);}
        if(this.activeSoundKey===key){this.activeSavedId=libraryId;this.activeSoundKey=`saved:${libraryId}`;}
        return {...saved,libraryId};
      });
      this.saved=[...basics,...this.saved];
    }
    // Preserve unreadable input, including malformed cached workspaces.
    this.recoveryRaw = unreadable ? raw : null;
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
  remember() {
    this.drafts.set(this.activeSoundKey, structuredClone({ document: this.document, initial: this.initial }));
  }
  persist() {
    this.remember();
    try {
      if (this.recoveryRaw) {
        localStorage.setItem(`${KEY}:recovery`, this.recoveryRaw);
        this.recoveryRaw = null;
      }
      localStorage.setItem(
        KEY,
        JSON.stringify({
          revision: REVISION,
          document: this.document,
          initial: this.initial,
          saved: this.saved,
          deleted: this.deleted,
          activeSavedId: this.activeSavedId,
          activeSoundKey: this.activeSoundKey,
          drafts: Object.fromEntries(this.drafts),
        }),
      );
    } catch { return false; }
    return true;
  }
  begin() {
    if (!this.checkpoint) this.checkpoint = this.snapshot();
  }
  snapshot() {
    return structuredClone({ document: this.document, initial: this.initial, activeSavedId: this.activeSavedId, activeSoundKey: this.activeSoundKey });
  }
  restore(snapshot) {
    this.document = snapshot.document;
    this.activeSoundKey = snapshot.activeSoundKey;
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
  load(document, savedId = null, soundKey = savedId ? `saved:${savedId}` : null) {
    const next = validateDocument(document);
    this.begin();
    this.remember();
    const draft = soundKey && this.drafts.get(soundKey);
    this.document = structuredClone(draft?.document || next);
    this.activeSavedId = savedId;
    this.activeSoundKey = soundKey || `draft:${crypto.randomUUID()}`;
    this.initial = structuredClone(draft?.initial || next);
    this.commit();
    this.emit("load");
  }
  undo() {
    if (!this.undoStack.length) return;
    this.remember();
    this.redoStack.push(this.snapshot());
    this.restore(this.undoStack.pop());
    this.checkpoint = null;
    this.emit("load");
  }
  redo() {
    if (!this.redoStack.length) return;
    this.remember();
    this.undoStack.push(this.snapshot());
    this.restore(this.redoStack.pop());
    this.checkpoint = null;
    this.emit("load");
  }
  updateLibrary(fn, kind="library") {
    const previous = this.snapshot(), saved = this.saved, deleted = this.deleted, drafts = new Map(this.drafts);
    const result = fn();
    clearTimeout(this.persistTimer);
    if (!this.persist()) {
      this.saved = saved;
      this.deleted = deleted;
      this.drafts = drafts;
      this.restore(previous);
      throw new Error("Could not update sounds in this browser. Free up browser storage and try again.");
    }
    this.emit(kind);
    return result;
  }
  renameSaved(id, name) {
    const nextName = name.trim().slice(0, 60);
    if (!nextName) throw new Error("Enter a sound name.");
    if (!this.saved.some((doc) => doc.libraryId === id)) throw new Error("This sound is no longer saved.");
    this.updateLibrary(() => {
      this.saved = this.saved.map((doc) => doc.libraryId === id ? { ...doc, name: nextName } : doc);
      const key = `saved:${id}`, draft = this.drafts.get(key);
      if (draft) this.drafts.set(key, { document: { ...draft.document, name: nextName }, initial: { ...draft.initial, name: nextName } });
      if (this.activeSavedId === id) {
        this.document = { ...this.document, name: nextName };
        this.initial = { ...this.initial, name: nextName };
      }
    },"rename");
    // Parameter undo must not revive an old library name.
    for (const snapshot of [...this.undoStack, ...this.redoStack, this.checkpoint]) {
      if (snapshot?.activeSavedId === id) {
        snapshot.document.name = nextName;
        snapshot.initial.name = nextName;
      }
    }
  }
  duplicateSaved(id){
    const source=this.saved.find(doc=>doc.libraryId===id);
    if(!source)throw new Error("This sound is no longer saved.");
    this.remember();
    const working=this.drafts.get(`saved:${id}`)?.document||source;
    const base=source.name.replace(/ \(\d+\)$/,'').slice(0,54);
    const names=new Set(this.saved.map(doc=>doc.name));
    let suffix=1,name;
    do{name=`${base} (${suffix++})`;}while(names.has(name));
    const copy={...structuredClone(working),name,libraryId:crypto.randomUUID()};
    this.updateLibrary(()=>{
      const index=this.saved.findIndex(doc=>doc.libraryId===id);
      this.saved=[...this.saved.slice(0,index+1),copy,...this.saved.slice(index+1)];
    });
    this.load(copy,copy.libraryId);
    return copy;
  }
  createSound() {
    const names = new Set(this.saved.map(doc => doc.name));
    let name = "Untitled", suffix = 2;
    while (names.has(name)) name = `Untitled ${suffix++}`;
    return this.importSaved(makeDocument({ name, params: BASE }));
  }
  importSaved(input) {
    const document = validateDocument(input);
    this.remember();
    const previous = this.snapshot();
    const saved = { ...structuredClone(document), libraryId: crypto.randomUUID() };
    this.updateLibrary(() => {
      this.saved = [saved, ...this.saved];
      this.document = document;
      this.initial = structuredClone(document);
      this.activeSavedId = saved.libraryId;
      this.activeSoundKey = `saved:${saved.libraryId}`;
    });
    this.undoStack.push(previous);
    if (this.undoStack.length > 60) this.undoStack.shift();
    this.redoStack = [];
    this.checkpoint = null;
    this.emit("load");
    return saved;
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
    this.remember();
    const previous = this.snapshot(), previousSaved = this.saved, previousDrafts = new Map(this.drafts);
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
    this.activeSoundKey = `saved:${saved.libraryId}`;
    if (previous.activeSoundKey === 'new' || previous.activeSoundKey.startsWith('draft:')) this.drafts.delete(previous.activeSoundKey);
    clearTimeout(this.persistTimer);
    if (!this.persist()) {
      this.restore(previous);
      this.saved = previousSaved;
      this.drafts = previousDrafts;
      throw new Error("Could not save in this browser. Free up browser storage or export JSON to keep this sound.");
    }
    this.emit("save");
    return saved;
  }
}
