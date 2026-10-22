import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { Store } from '../dist/src/state.js';
import { BASE, makeDocument } from '../dist/src/model.js';
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
  const saved = store.save('First sound');
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
  const store = fresh(); const first = store.save('First');
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
  const store = fresh(); const first = store.save('First');
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
  const store = fresh(); store.save('First');
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
  const store = fresh(); const first = store.save('Same name');
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
  const store = fresh(); const first = store.save('First');
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
  const store = fresh(); const saved = store.save('Original');
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
  const store = fresh(); const saved = store.save('Deleted');
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
