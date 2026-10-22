export const SESSION_KEY = 'vertex.session.v1';
export const INTRO_KEY = 'vertex.intro.seen.v1';
const finite = Number.isFinite;
const vector = (value, n) => Array.isArray(value) && value.length === n && value.every(finite);
function shapeOK(shape) {
  return shape && Number.isInteger(shape.id) && shape.id > 0 && typeof shape.name === 'string' &&
    typeof shape.sound === 'string' && Array.isArray(shape.bottom) && shape.bottom.length >= 2 && shape.bottom.length <= 256 &&
    shape.bottom.every(v => vector(v, 3)) && Array.isArray(shape.top) && shape.top.length === shape.bottom.length && shape.top.every(v => vector(v, 3)) &&
    vector(shape.quat, 4) && vector(shape.scale, 3) && shape.scale.every(v => v !== 0) &&
    Array.isArray(shape.notes) && shape.notes.length <= 4096 && shape.notes.every(n => finite(n.f) && finite(n.y)) &&
    finite(shape.dy) && (shape.anchor === null || vector(shape.anchor, 2));
}
export function validSession(value) {
  return value?.revision === 1 && Array.isArray(value.shapes) && value.shapes.length <= 1000 &&
    value.shapes.every(shapeOK) && new Set(value.shapes.map(s => s.id)).size === value.shapes.length &&
    value.settings && finite(value.settings.bpm) && value.settings.bpm >= 60 && value.settings.bpm <= 180 &&
    Number.isInteger(value.settings.key) && value.settings.key >= 0 && value.settings.key <= 11 &&
    Number.isInteger(value.settings.mode) && value.settings.mode >= 0 && value.settings.mode <= 6 &&
    value.view && vector(value.view.target, 3) && [value.view.radius, value.view.theta, value.view.phi].every(finite) &&
    value.view.radius > 0 && ['3d', 'top'].includes(value.view.mode) &&
    value.view.top && [value.view.top.cx, value.view.top.cz, value.view.top.h].every(finite) && value.view.top.h > 0 &&
    Number.isInteger(value.plane) && value.plane >= -3 && value.plane <= 5 && finite(value.bars);
}
export function readSession(storage) {
  let raw;
  try {
    raw = storage.getItem(SESSION_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (validSession(value)) return value;
  } catch { /* Keep malformed state recoverable rather than crashing the editor. */ }
  if (raw) try { storage.setItem(`${SESSION_KEY}:recovery`, raw); } catch { /* Storage may be unavailable. */ }
  return null;
}
export function saveSession(storage, value) {
  if (!validSession(value)) return false;
  try { storage.setItem(SESSION_KEY, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function introSeen(storage) {
  try { return storage.getItem(INTRO_KEY) === '1'; } catch { return false; }
}
export function markIntroSeen(storage) {
  try { storage.setItem(INTRO_KEY, '1'); } catch { /* Private storage may be unavailable. */ }
}
