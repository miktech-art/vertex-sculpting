// How a form's geometry becomes notes and time — the pure maths (no DOM, no app state): height = pitch, distance = time,
// open curves, rotation = start offset. core.js and shape.js use it, test/pitch.test.mjs checks it.

// the dot runs through the middle of a form `thick` tall: its height -> whole scale steps above the floor
export const degreeAt = (y, step, thick) => Math.round((y - thick / 2) / step);

// a scale step (any integer, also below the floor) -> MIDI note, from the floor's note and the mode's 7 semitone offsets
export function noteOfDegree(deg, floor, scale) {
  const oc = Math.floor(deg / 7), di = deg - oc * 7;
  return floor + 12 * oc + scale[di];
}

// distance = time, measured from above: segment lengths of a ring in the floor plane (x, z), written to `out`; returns the
// path length. Heights never enter, so raising a corner changes its note but never the rhythm. An open curve has no
// closing segment (out[n−1] = 0).
export function planLengths(ring, out, closed = true) {
  let per = 0;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    out[i] = closed || i < ring.length - 1 ? Math.hypot(b.x - a.x, b.z - a.z) : 0; per += out[i];
  }
  return per;
}

/* ---------- open curves: the dot runs there and back (ping-pong); one cycle = twice the curve's length ---------- */

// cycle phase 0…1 -> how far along the curve the dot is, 0…1
export const pingPong = ph => { ph -= Math.floor(ph); return ph < 0.5 ? ph * 2 : 2 - ph * 2; };

// when each corner fires within one cycle (t, 0…1) and the segment the dot arrived over (seg: an open face there = a rest).
// c[k] = distance to corner k as a fraction of the path. Closed: corner k at c[k], arriving over segment k−1.
// Open: on the way out corners 0…n−1 at c[k]/2 (corner 0 at the start, having just come back over segment 0; the end corner
// once, at the turn), on the way back n−2…1 at 1 − c[k]/2, arriving over segment k.
export function cornerHits(c, closed) {
  const n = c.length, out = [];
  if (closed) { for (let k = 0; k < n; k++) out.push({ t: c[k], k, seg: (k - 1 + n) % n }); return out; }
  for (let k = 0; k < n; k++) out.push({ t: c[k] / 2, k, seg: k ? k - 1 : 0 });
  for (let k = n - 2; k >= 1; k--) out.push({ t: 1 - c[k] / 2, k, seg: k });
  return out;
}

// every corner column is exactly `t` tall. bottom/top: arrays of {y}; moved: Set of edited vertex indices (0…n−1 bottoms,
// n…2n−1 tops) or nothing. A moved top pulls its bottom along, otherwise the top follows the bottom. Returns whether anything changed.
export function fitColumns(bottom, top, t, moved) {
  const n = bottom.length; let changed = false;
  for (let i = 0; i < n; i++) {
    const B = bottom[i], T = top[i];
    if (Math.abs(T.y - B.y - t) < 1e-6) continue;
    if (moved && moved.has(i + n) && !moved.has(i)) B.y = T.y - t; else T.y = B.y + t;
    changed = true;
  }
  return changed;
}

/* ---------- rotation = start offset ---------- */

// turning a form shifts its pattern in time, like a record under a needle: the dot always starts facing the same way, so a
// yaw of θ moves the start θ/2π of the cycle against the direction of travel (dir = +1 / −1 around +Y), rounded to the
// 1/16 grid. Returns the offset as a fraction of the cycle, 0…1.
export function startOffset(yaw, dir, cycleBars) {
  const steps = Math.max(1, Math.round(cycleBars * 16));
  const off = ((-dir * yaw / (2 * Math.PI)) % 1 + 1) % 1;
  return (Math.round(off * steps) % steps) / steps;
}
// +1 if the corners run counter-clockwise in (x, z) (atan2(z, x) grows), −1 if clockwise
export function travelDir(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p.x * q.z - q.x * p.z; }
  return a >= 0 ? 1 : -1;
}

/* ---------- placed notes: the dot plays the points placed along its path, not the corners ---------- */

// a note's place on the path, f = 0…1 of the path's length (measured from above, like all time). When each note fires
// within one cycle: closed paths at f; open curves (there and back) at f/2 on the way out and 1 − f/2 on the way back,
// the two ends once. Returns [{ t, k }] with k = the note's index.
export function noteHits(fs, closed) {
  const out = [];
  fs.forEach((f, k) => {
    if (closed) { out.push({ t: ((f % 1) + 1) % 1, k }); return; }
    out.push({ t: f / 2, k });
    if (f > 1e-6 && f < 1 - 1e-6) out.push({ t: 1 - f / 2, k });
  });
  return out;
}
// snap a place on the path so its distance from the start is a whole number of steps (1/16 = 0.25 units): wraps on a
// closed path, stays between the ends on an open one
export function snapFrac(f, perim, step, closed) {
  if (!(perim > 0)) return 0;
  let d = Math.round(f * perim / step) * step;
  d = closed ? ((d % perim) + perim) % perim : Math.min(perim, Math.max(0, d));
  return d / perim;
}
// the path's height at place f: notes set it, between two notes it slopes evenly (round the loop when closed);
// before the first / after the last note of an open curve it stays level. notes: [{ f, y }] sorted by f, at least one.
export function heightAt(f, notes, closed) {
  const n = notes.length;
  if (n === 1) return notes[0].y;
  for (let i = 0; i < n - 1; i++) {
    const a = notes[i], b = notes[i + 1];
    if (f >= a.f && f <= b.f) return b.f - a.f > 1e-9 ? a.y + (b.y - a.y) * (f - a.f) / (b.f - a.f) : a.y;
  }
  const first = notes[0], last = notes[n - 1];
  if (!closed) return f < first.f ? first.y : last.y;
  const span = first.f + 1 - last.f, u = f >= last.f ? f - last.f : f + 1 - last.f;   // the stretch across the start
  return span > 1e-9 ? last.y + (first.y - last.y) * u / span : last.y;
}
