import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { Store } from '../apps/sculpt/src/state.js';
import { BASE, PRESETS, makeDocument } from '../apps/sculpt/src/model.js';
const data = new Map();
let blocked = false;
globalThis.localStorage = {
  getItem: key => data.get(key) ?? null,
  setItem: (key, value) => { if (blocked) throw new Error('quota'); data.set(key, value); },
};
const stores = [];
function fresh() { const store = new Store(); stores.push(store); return store; }
afterEach(() => { for (const store of stores) clearTimeout(store.persistTimer); stores.length = 0; data.clear(); blocked = false; });
test('saved sounds are independent snapshots and survive reload with their selection', () => {
  const store = fresh();
  store.edit(d => { d.params.harmonics = 0.23; d.routes = d.routes.slice(0, 2); });
  store.commit();
  const saved = store.save('First sound', { asNew: true });
  store.edit(d => d.params.harmonics = 0.8); store.commit();
  assert.equal(saved.params.harmonics, 0.23);
  assert.equal(saved.routes.length, 2);
  assert.equal(store.hasUnsavedChanges, true);
  store.persist();
  const reload = fresh();
  assert.equal(reload.saved[0].name, 'First sound');
  assert.equal(reload.saved[0].params.harmonics, 0.23);
  assert.equal(reload.activeSavedId, saved.libraryId);
  assert.equal(reload.document.params.harmonics, 0.8);
  assert.equal(reload.hasUnsavedChanges, true);
});
test('saving edits updates a selected sound, while Save as new keeps both', () => {
  const store = fresh(); const first = store.save('First', { asNew: true });
  store.edit(d => d.params.harmonics = 0.4); store.commit();
  store.save('Updated');
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].libraryId, first.libraryId);
  assert.equal(store.hasUnsavedChanges, false);
  store.save('Copy', { asNew: true });
  assert.equal(store.saved.length, 2);
  assert.notEqual(store.saved[0].libraryId, first.libraryId);
});
test('new sounds start clean and can be undone without changing library snapshots', () => {
  const store = fresh(); const first = store.save('First', { asNew: true });
  store.load(makeDocument({name: 'Untitled', params: BASE}));
  assert.equal(store.activeSavedId, null);
  assert.equal(store.saved.length, 1);
  store.edit(d => d.params.noise = 0.3); store.commit();
  store.save('Second');
  store.load(first, first.libraryId);
  assert.equal(store.hasUnsavedChanges, false);
  store.undo();
  assert.equal(store.document.name, 'Second');
  assert.equal(store.saved.length, 2);
});
test('library never silently drops earlier sounds after forty saves', () => {
  const store = fresh();
  for (let i = 0; i < 45; i++) store.save(`Sound ${i}`, { asNew: true });
  const reload = fresh();
  assert.equal(reload.saved.length, 45);
  assert.equal(reload.saved.at(-1).name, 'Sound 0');
});
test('storage failure rolls back a save and preserves edited work', () => {
  const store = fresh(); store.save('First', { asNew: true });
  store.edit(d => d.params.noise = 0.4); store.commit();
  blocked = true;
  assert.throws(() => store.save('Failed', { asNew: true }), /Could not save/);
  assert.equal(store.saved.length, 1);
  assert.equal(store.document.name, 'First');
  assert.equal(store.document.params.noise, 0.4);
  assert.equal(store.hasUnsavedChanges, true);
  blocked = false;
  store.save('Recovered');
  assert.equal(fresh().saved[0].name, 'Recovered');
});
test('existing revision three libraries gain IDs without losing sounds', () => {
  data.set('sound-form:session:v1', JSON.stringify({ revision: 3, document: makeDocument(), saved: [makeDocument()] }));
  const store = fresh();
  assert.equal(store.saved.length, 1);
  assert.ok(store.saved[0].libraryId);
  const id = store.saved[0].libraryId;
  assert.equal(fresh().saved[0].libraryId, id);
});

test('revision four visual-only sessions preserve their saved library when audio returns', () => {
  const visual = makeDocument();
  visual.schema = 'sound-sculpt/visual-preset-v2';
  visual.name = 'Visual sound';
  delete visual.params.pitch;
  visual.params.harmonics = 0.37;
  visual.routes = visual.routes.map(route => route.source === 'pitch' ? { ...route, source: 'notePitch' } : route);
  data.set('sound-form:session:v1', JSON.stringify({ revision: 4, document: visual, initial: visual, saved: [{ ...visual, libraryId: 'existing-visual' }], activeSavedId: 'existing-visual' }));
  const store = fresh();
  assert.equal(store.document.name, 'Visual sound');
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].params.harmonics, 0.37);
  assert.equal(store.saved[0].params.pitch, BASE.pitch);
  assert.equal(store.activeSavedId, 'existing-visual');
  assert.equal(store.hasUnsavedChanges, false);
  assert.ok(store.saved[0].routes.some(route => route.source === 'pitch'));
  assert.ok(!store.saved[0].routes.some(route => route.source === 'notePitch'));
  assert.equal(JSON.parse(data.get('sound-form:session:v1')).revision, 5);
  assert.equal(fresh().saved[0].name, 'Visual sound');
});

test('rename targets its ID and preserves unsaved edits, saved settings, and undo history', () => {
  const store = fresh(); const first = store.save('Same name', { asNew: true });
  const second = store.save('Same name', { asNew: true });
  store.edit(doc => doc.params.noise = 0.42); store.commit();
  store.renameSaved(second.libraryId, '  Renamed  ');
  assert.equal(store.saved.find(doc => doc.libraryId === first.libraryId).name, 'Same name');
  assert.equal(store.saved.find(doc => doc.libraryId === second.libraryId).name, 'Renamed');
  assert.equal(store.saved.find(doc => doc.libraryId === second.libraryId).params.noise, second.params.noise);
  assert.equal(store.document.name, 'Renamed');
  assert.equal(store.document.params.noise, 0.42);
  assert.equal(store.hasUnsavedChanges, true);
  store.undo();
  assert.equal(store.document.name, 'Renamed');
  assert.equal(store.hasUnsavedChanges, false);
  const reload = fresh();
  assert.equal(reload.saved.find(doc => doc.libraryId === second.libraryId).name, 'Renamed');
  assert.throws(() => store.renameSaved(second.libraryId, '   '), /Enter a sound name/);
});
test('delete and restore preserve complete saved sounds across reload and keep the current edits', () => {
  const store = fresh(); const first = store.save('First', { asNew: true });
  store.save('Second', { asNew: true });
  store.load(first, first.libraryId);
  store.edit(doc => doc.params.noise = 0.33); store.commit();
  const working = structuredClone(store.document);
  store.deleteSaved(first.libraryId);
  assert.deepEqual(store.document, working);
  assert.equal(store.activeSavedId, null);
  assert.equal(store.saved.length, 1);
  assert.deepEqual(store.deleted[0], first);
  const reload = fresh();
  assert.equal(reload.saved.length, 1);
  assert.deepEqual(reload.deleted[0].params, first.params);
  assert.equal(reload.deleted[0].routes.length, first.routes.length);
  reload.restoreSaved(first.libraryId);
  assert.equal(reload.deleted.length, 0);
  assert.equal(reload.saved.length, 2);
  assert.equal(fresh().saved[0].libraryId, first.libraryId);
  assert.equal(fresh().deleted.length, 0);
});
test('failed rename, delete, and restore leave stored sounds and working state intact', () => {
  const store = fresh(); const saved = store.save('Original', { asNew: true });
  blocked = true;
  assert.throws(() => store.renameSaved(saved.libraryId, 'Failed'), /Could not update/);
  assert.equal(store.document.name, 'Original');
  assert.equal(store.saved[0].name, 'Original');
  assert.throws(() => store.deleteSaved(saved.libraryId), /Could not update/);
  assert.equal(store.activeSavedId, saved.libraryId);
  assert.equal(store.deleted.length, 0);
  blocked = false;
  store.deleteSaved(saved.libraryId);
  blocked = true;
  assert.throws(() => store.restoreSaved(saved.libraryId), /Could not update/);
  assert.equal(store.saved.length, 0);
  assert.equal(store.deleted[0].libraryId, saved.libraryId);
  blocked = false;
  assert.equal(fresh().deleted[0].libraryId, saved.libraryId);
});
test('undo after deleting the active sound cannot target a deleted library entry', () => {
  const store = fresh(); const saved = store.save('Deleted', { asNew: true });
  store.edit(doc => doc.params.noise = 0.2); store.commit();
  store.deleteSaved(saved.libraryId);
  store.undo();
  assert.equal(store.activeSavedId, null);
  store.save('New save');
  assert.equal(store.deleted[0].libraryId, saved.libraryId);
  assert.notEqual(store.saved[0].libraryId, saved.libraryId);
});

test('an invalid working session cannot erase valid saved or deleted sounds', () => {
  const good = { ...makeDocument(), libraryId: 'kept', name: 'Keep me' };
  const invalid = makeDocument(); invalid.params.rate = 101;
  const raw = JSON.stringify({revision: 5, document: invalid, initial: invalid, saved: [invalid, good], deleted: [{...good, libraryId: 'trash'}]});
  data.set('sound-form:session:v1', raw);
  const store = fresh();
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].name, 'Keep me');
  assert.equal(store.deleted.length, 1);
  assert.equal(data.get('sound-form:session:v1:recovery'), raw);
  assert.equal(fresh().saved[0].name, 'Keep me');
});
test('unreadable data is not overwritten when its recovery backup cannot be stored', () => {
  const raw = '{invalid JSON';
  data.set('sound-form:session:v1', raw);
  blocked = true;
  const store = fresh();
  assert.equal(data.get('sound-form:session:v1'), raw);
  blocked = false;
  assert.equal(store.persist(), true);
  assert.equal(data.get('sound-form:session:v1:recovery'), raw);
});

test('import creates a separate saved sound, persists it, and never replaces an existing selection', () => {
  const store = fresh(), first = store.save('Existing', { asNew: true });
  const incoming = makeDocument(); incoming.name = 'Imported'; incoming.params.noise = 0.42;
  incoming.libraryId = first.libraryId;
  const imported = store.importSaved(incoming);
  assert.notEqual(imported.libraryId, first.libraryId);
  assert.equal(store.saved.length, 2);
  assert.deepEqual(store.saved[1], first);
  assert.equal(store.activeSavedId, imported.libraryId);
  assert.equal(store.hasUnsavedChanges, false);
  assert.equal(fresh().saved[0].params.noise, 0.42);
  store.undo();
  assert.equal(store.activeSavedId, first.libraryId);
  assert.equal(store.saved.length, 2);
  const duplicate = store.importSaved(incoming);
  assert.notEqual(duplicate.libraryId, imported.libraryId);
});
test('failed or malformed imports leave the current sound, library and undo history intact', () => {
  const store = fresh(); store.save('Existing', { asNew: true });
  store.edit(doc => { doc.params.noise = 0.17; }); store.commit();
  const snapshot = store.snapshot(), saved = structuredClone(store.saved), undo = structuredClone(store.undoStack);
  blocked = true;
  assert.throws(() => store.importSaved(makeDocument()), /Could not update/);
  assert.deepEqual(store.snapshot(), snapshot);
  assert.deepEqual(store.saved, saved);
  assert.deepEqual(store.undoStack, undo);
  blocked = false;
  assert.throws(() => store.importSaved({ schema: 'bad' }));
  assert.deepEqual(store.snapshot(), snapshot);
  assert.deepEqual(store.saved, saved);
});

function factory(store, id) {
  const preset = PRESETS.find(p => p.id === id);
  store.load(makeDocument(preset), null, `factory:${id}`);
}
test('each factory sound keeps independent parameters and connections across switches and reload', () => {
  const store=fresh(); factory(store,'kick');
  store.edit(d=>{d.params.pitch=80;d.routes[0].amount=.31;});store.commit();
  factory(store,'bass'); store.edit(d=>d.params.pitch=110);store.commit();store.persist();
  const reload=fresh();factory(reload,'kick');
  assert.equal(reload.document.params.pitch,80);assert.equal(reload.document.routes[0].amount,.31);
  assert.equal(reload.initial.params.pitch,55);
  factory(reload,'bass');assert.equal(reload.document.params.pitch,110);
  assert.equal(reload.saved.length,0);
});
test('saved sound working edits survive switching without overwriting its named comparison baseline', () => {
  const store=fresh(), first=store.save('First', { asNew: true });
  store.edit(d=>d.params.noise=.27);store.commit();factory(store,'bass');store.persist();
  const reload=fresh();reload.load(first,first.libraryId);
  assert.equal(reload.document.params.noise,.27);assert.equal(reload.initial.params.noise,first.params.noise);
  assert.equal(reload.saved[0].params.noise,first.params.noise);
  reload.save('First updated');factory(reload,'synth');reload.load(reload.saved[0],first.libraryId);
  assert.equal(reload.document.params.noise,.27);assert.equal(reload.initial.params.noise,.27);
});
test('saving a copy keeps the source working state, and New sound resumes until it is named', () => {
  const store=fresh();factory(store,'kick');store.edit(d=>d.params.pitch=82);store.commit();
  store.save('Kick copy', { asNew: true });factory(store,'kick');assert.equal(store.document.params.pitch,82);
  store.load(makeDocument({name:'Untitled',params:BASE}),null,'new');
  store.edit(d=>d.params.noise=.41);store.commit();factory(store,'synth');store.persist();
  const reload=fresh();reload.load(makeDocument({name:'Untitled',params:BASE}),null,'new');
  assert.equal(reload.document.params.noise,.41);reload.save('Named draft');
  reload.load(makeDocument({name:'Untitled',params:BASE}),null,'new');
  assert.equal(reload.document.params.noise,BASE.noise);
});
test('rename and delete/restore preserve an inactive sound workspace', () => {
  const store=fresh(), saved=store.save('Original', { asNew: true });
  store.edit(d=>d.params.noise=.38);store.commit();factory(store,'bass');
  store.renameSaved(saved.libraryId,'Renamed');store.deleteSaved(saved.libraryId);store.persist();
  const reload=fresh();reload.restoreSaved(saved.libraryId);reload.load(reload.saved[0],saved.libraryId);
  assert.equal(reload.document.name,'Renamed');assert.equal(reload.document.params.noise,.38);
});
test('undoing a resumed edit is retained when switching away and back', () => {
  const store=fresh();factory(store,'kick');store.edit(d=>d.params.pitch=88);store.commit();store.undo();
  factory(store,'bass');factory(store,'kick');assert.equal(store.document.params.pitch,55);
});
test('failed copy save restores its sound identity and cached edits', () => {
  const store=fresh();factory(store,'kick');store.edit(d=>d.params.pitch=86);store.commit();
  blocked=true;assert.throws(()=>store.save('Copy'),/Could not save/);blocked=false;
  assert.equal(store.activeSoundKey,'factory:kick');factory(store,'bass');factory(store,'kick');
  assert.equal(store.document.params.pitch,86);assert.equal(store.saved.length,0);
});

test('New creates an immediate library instance with clean defaults and preserves the source draft', () => {
  const store=fresh(),source=store.save('Original', { asNew: true });
  store.edit(d=>d.params.noise=.42);store.commit();
  const created=store.createSound();
  assert.equal(store.saved.length,2);assert.equal(created.name,'Untitled');
  assert.notEqual(created.libraryId,source.libraryId);assert.equal(store.activeSavedId,created.libraryId);
  assert.deepEqual(store.document.params,BASE);assert.equal(store.hasUnsavedChanges,false);
  store.edit(d=>d.params.noise=.65);store.commit();store.persist();
  assert.equal(store.saved[0].params.noise,BASE.noise);
  const reload=fresh();assert.equal(reload.activeSavedId,created.libraryId);assert.equal(reload.document.params.noise,.65);
  reload.load(source,source.libraryId);assert.equal(reload.document.params.noise,.42);
  reload.load(created,created.libraryId);assert.equal(reload.document.params.noise,.65);
});
test('consecutive New actions create uniquely named independent sounds and Save updates just the active one', () => {
  const store=fresh(),first=store.createSound(),second=store.createSound();
  assert.equal(first.name,'Untitled');assert.equal(second.name,'Untitled 2');
  assert.notEqual(first.libraryId,second.libraryId);
  store.edit(d=>d.params.pitch=330);store.commit();store.save(second.name);
  assert.equal(store.saved.length,2);assert.equal(store.saved[0].params.pitch,330);
  assert.equal(store.saved[1].params.pitch,BASE.pitch);
});
test('failed New preserves the active sound and library', () => {
  const store=fresh(),source=store.save('Original', { asNew: true });store.edit(d=>d.params.noise=.42);store.commit();
  blocked=true;assert.throws(()=>store.createSound(),/Could not update sounds/);blocked=false;
  assert.equal(store.saved.length,1);assert.equal(store.activeSavedId,source.libraryId);
  assert.equal(store.document.params.noise,.42);assert.equal(store.document.name,'Original');
});

test('Save replaces each basic sound in its fixed slot and survives reload without adding a library copy',()=>{
  const store=fresh();
  for(const [index,preset] of PRESETS.entries()){
    factory(store,preset.id);store.edit(d=>d.params.pitch=100+index);store.commit();
    store.save(preset.name);
    assert.equal(store.activeSoundKey,`factory:${preset.id}`);
    assert.equal(store.activeSavedId,null);assert.equal(store.hasUnsavedChanges,false);
    assert.equal(store.saved.length,0);
    assert.equal(store.factoryDocument(preset).params.pitch,100+index);
  }
  const reload=fresh();
  for(const [index,preset] of PRESETS.entries()){
    factory(reload,preset.id);
    assert.equal(reload.document.params.pitch,100+index);
    assert.equal(reload.initial.params.pitch,100+index);
    assert.equal(reload.hasUnsavedChanges,false);
  }
  assert.equal(reload.saved.length,0);
});
test('basic sound previews retain their saved snapshot until Save, and Save as new preserves that snapshot',()=>{
  const store=fresh(),preset=PRESETS[0];factory(store,preset.id);
  store.edit(d=>d.params.pitch=80);store.commit();store.save(preset.name);
  store.edit(d=>d.params.pitch=90);store.commit();
  assert.equal(store.factoryDocument(preset).params.pitch,80);
  store.save('Kick copy',{asNew:true});
  assert.equal(store.saved.length,1);assert.equal(store.saved[0].params.pitch,90);
  assert.equal(store.factoryDocument(preset).params.pitch,80);
  factory(store,preset.id);assert.equal(store.document.params.pitch,90);
  assert.equal(store.initial.params.pitch,80);assert.equal(store.hasUnsavedChanges,true);
});
test('failed basic sound overwrite preserves its previous saved preview and the current unsaved edit',()=>{
  const store=fresh(),preset=PRESETS[0];factory(store,preset.id);
  store.edit(d=>d.params.pitch=80);store.commit();store.save(preset.name);
  store.edit(d=>d.params.pitch=90);store.commit();
  blocked=true;assert.throws(()=>store.save(preset.name),/Could not save/);blocked=false;
  assert.equal(store.factoryDocument(preset).params.pitch,80);
  assert.equal(store.document.params.pitch,90);assert.equal(store.hasUnsavedChanges,true);
  assert.equal(store.activeSoundKey,'factory:kick');assert.equal(store.saved.length,0);
});
