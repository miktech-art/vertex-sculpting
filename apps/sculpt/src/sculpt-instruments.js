import { validateDocument } from './model.js';

export const SCULPT_STORAGE_KEY = 'sound-form:session:v1';
export const sculptSoundId = (id) => `sculpt:${id}`;

export function validSculptures(documents = []) {
  if (!Array.isArray(documents)) return [];
  return documents.flatMap((doc) => {
    if (typeof doc?.libraryId !== 'string' || !doc.libraryId) return [];
    try { return [{ ...validateDocument(doc), libraryId: doc.libraryId }]; }
    catch { return []; }
  });
}

// Read-only: opening Beatbox must never rewrite Sound/Sculpt's session.
export function readSculptures(storage) {
  try { return validSculptures(JSON.parse(storage.getItem(SCULPT_STORAGE_KEY))?.saved); }
  catch { return []; }
}

export function mergeSculptures(archived, current) {
  const byId = new Map(validSculptures(archived).map((doc) => [doc.libraryId, doc]));
  for (const doc of validSculptures(current)) byId.set(doc.libraryId, doc);
  return [...byId.values()];
}

export function sculptureSound(doc) {
  return {
    label: doc.name, db: 0, oct: 0,
    root: 69 + 12 * Math.log2(doc.params.pitch / 440),
    sculpt: structuredClone(doc),
  };
}

export function nearestTonic(root, key) {
  const tonic = 48 + key;
  return tonic + 12 * Math.round((root - tonic) / 12);
}
