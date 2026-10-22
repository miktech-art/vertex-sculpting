import test from 'node:test';
import assert from 'node:assert/strict';
import { makeDocument } from '../dist/src/model.js';
import { readSculptures, mergeSculptures, sculptureSound, sculptSoundId, nearestTonic } from '../dist/src/sculpt-instruments.js';
const sound = (id, name = 'Saved sound') => ({ ...makeDocument(), libraryId: id, name });
test('Beatbox reads saved Sculpt sounds without rewriting either library or working sound', () => {
  const doc = sound('one'); const raw = JSON.stringify({revision: 5, document: makeDocument(), saved: [doc]});
  let writes = 0;
  const storage = { getItem: () => raw, setItem: () => writes++ };
  const docs = readSculptures(storage);
  assert.equal(writes, 0);
  assert.equal(docs.length, 1);
  assert.equal(docs[0].libraryId, 'one');
  assert.deepEqual(docs[0].params, doc.params);
});
test('current definitions update assigned instruments while deleted definitions remain usable', () => {
  const old = sound('edited'); old.params.noise = 0.1;
  const latest = sound('edited', 'Renamed'); latest.params.noise = 0.4;
  const deleted = sound('removed');
  const docs = mergeSculptures([old, deleted], [latest]);
  assert.equal(docs.length, 2);
  assert.equal(docs.find(d => d.libraryId === 'edited').name, 'Renamed');
  assert.equal(docs.find(d => d.libraryId === 'edited').params.noise, 0.4);
  assert.equal(docs.find(d => d.libraryId === 'removed').name, deleted.name);
});
test('malformed records are isolated and duplicate names retain distinct instrument identities', () => {
  const bad = sound('bad'); bad.params.pitch = -10;
  const docs = readSculptures({getItem: () => JSON.stringify({saved:[sound('a'), bad, sound('b')]})});
  assert.deepEqual(docs.map(d => sculptSoundId(d.libraryId)), ['sculpt:a','sculpt:b']);
  assert.deepEqual(readSculptures({getItem: () => '{broken'}), []);
});
test('instrument sampling retains all sound settings, effects, and accurate source pitch', () => {
  const doc = sound('a'); doc.params.pitch = 440; doc.params.reverbMix = 0.5;
  const instrument = sculptureSound(doc);
  assert.equal(instrument.root, 69);
  assert.deepEqual(instrument.sculpt.params, doc.params);
  doc.params.reverbMix = 0;
  assert.equal(instrument.sculpt.params.reverbMix, 0.5);
  assert.equal(nearestTonic(50, 10), 46);
  assert.equal(nearestTonic(69, 9), 69);
});
