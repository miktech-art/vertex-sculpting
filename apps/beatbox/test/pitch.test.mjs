// npm run test — height = pitch (src/lib/pitch.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { degreeAt, noteOfDegree, planLengths, fitColumns, pingPong, cornerHits, startOffset, travelDir } from '../src/lib/pitch.js';

const STEP = 0.25, THICK = 0.5;
const AEOLIAN = [0, 2, 3, 5, 7, 8, 10];
const SYNTH_FLOOR = 46;   // A#2: key A# (10) + 48 − 12 (the synth's register)

test('a form resting on the floor plays step 0; each 1/16 of height is one step', () => {
  assert.equal(degreeAt(THICK / 2, STEP, THICK), 0);
  assert.equal(degreeAt(THICK / 2 + 4 * STEP, STEP, THICK), 4);
  assert.equal(degreeAt(THICK / 2 + 7 * STEP, STEP, THICK), 7);     // one octave = 1.75 units
  assert.equal(degreeAt(THICK / 2 - STEP, STEP, THICK), -1);        // below the floor: below the floor's octave
  assert.equal(degreeAt(THICK / 2 + 0.4 * STEP, STEP, THICK), 0);   // unsnapped heights round to the nearest step
  assert.equal(degreeAt(THICK / 2 + 0.6 * STEP, STEP, THICK), 1);
});

test('steps map to notes of the mode, octaves wrap', () => {
  assert.equal(noteOfDegree(0, SYNTH_FLOOR, AEOLIAN), 46);          // A#2
  assert.equal(noteOfDegree(4, SYNTH_FLOOR, AEOLIAN), 53);          // F3: the default synth, 4 steps up
  assert.equal(noteOfDegree(7, SYNTH_FLOOR, AEOLIAN), 58);          // A#3: the next C-plane
  assert.equal(noteOfDegree(-1, SYNTH_FLOOR, AEOLIAN), 44);         // G#2: one step below the floor
  assert.equal(noteOfDegree(-7, SYNTH_FLOOR, AEOLIAN), 34);         // A#1: one plane down
});

test('loop length is measured from above: raising corners never changes it', () => {
  const sq = [{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 1, y: 0, z: 1 }, { x: 0, y: 0, z: 1 }];
  const L = new Float32Array(4);
  assert.equal(planLengths(sq, L), 4);
  sq[1].y = 1.75; sq[2].y = 0.75;
  assert.equal(planLengths(sq, L), 4);
  assert.deepEqual([...L], [1, 1, 1, 1]);
});

test('corner columns keep their thickness', () => {
  const col = (b, t) => [{ y: b }, { y: t }];
  // the top follows a moved bottom
  let [b0, t0] = col(1, 0.5);
  assert.equal(fitColumns([b0], [t0], 0.5), true);
  assert.deepEqual([b0.y, t0.y], [1, 1.5]);
  // a moved top pulls its bottom along (index n + i = a top)
  [b0, t0] = col(0, 1.25);
  fitColumns([b0], [t0], 0.5, new Set([1]));
  assert.deepEqual([b0.y, t0.y], [0.75, 1.25]);
  // both moved (e.g. a scaled face): the bottom leads
  [b0, t0] = col(0.25, 1.25);
  fitColumns([b0], [t0], 0.5, new Set([0, 1]));
  assert.deepEqual([b0.y, t0.y], [0.25, 0.75]);
  // already right: nothing changes
  assert.equal(fitColumns([{ y: 0 }], [{ y: 0.5 }], 0.5), false);
});

test('an open curve has no closing segment', () => {
  const line = [{ x: 0, z: 0 }, { x: 1, z: 0 }, { x: 1, z: 1 }];
  const L = new Float32Array(3);
  assert.equal(planLengths(line, L, false), 2);
  assert.deepEqual([...L], [1, 1, 0]);
  assert.ok(Math.abs(planLengths(line, L, true) - (2 + Math.SQRT2)) < 1e-6);   // (Float32Array, like Shape.L)
});

test('ping-pong: out to the end at half the cycle, back to the start at the end', () => {
  assert.equal(pingPong(0), 0);
  assert.equal(pingPong(0.25), 0.5);
  assert.equal(pingPong(0.5), 1);
  assert.equal(pingPong(0.75), 0.5);
  assert.equal(pingPong(1.25), 0.5);
});

test('closed loops fire every corner once, arriving over the face before it', () => {
  assert.deepEqual(cornerHits([0, 0.25, 0.5, 0.75], true), [
    { t: 0, k: 0, seg: 3 }, { t: 0.25, k: 1, seg: 0 }, { t: 0.5, k: 2, seg: 1 }, { t: 0.75, k: 3, seg: 2 }]);
});

test('open curves fire the ends once and the inner corners on the way out and back', () => {
  // three points, two equal segments: 0 —— 1 —— 2
  const h = cornerHits([0, 0.5, 1], false);
  assert.deepEqual(h, [
    { t: 0, k: 0, seg: 0 }, { t: 0.25, k: 1, seg: 0 }, { t: 0.5, k: 2, seg: 1 },   // out
    { t: 0.75, k: 1, seg: 1 }]);                                                     // back (corner 0 again at t = 1 = 0)
  // a single segment: start and end, once each
  assert.deepEqual(cornerHits([0, 1], false), [{ t: 0, k: 0, seg: 0 }, { t: 0.5, k: 1, seg: 0 }]);
});

test('rotation = start offset: a quarter turn of a one-bar form moves its pattern by a beat', () => {
  const Q = Math.PI / 2;
  assert.equal(startOffset(0, 1, 1), 0);
  assert.equal(startOffset(-Q, 1, 1), 0.25);
  assert.equal(startOffset(Q, 1, 1), 0.75);
  assert.equal(startOffset(Q, -1, 1), 0.25);                       // travelling the other way round
  assert.equal(startOffset(2 * Math.PI, 1, 1), 0);                 // a full turn: back where it was
  assert.equal(startOffset(-0.1, 1, 1), 0);                        // 0.016 of a cycle rounds to the grid
  assert.equal(startOffset(-Math.PI / 8, 1, 1), 1 / 16);           // 22.5° = one sixteenth of a one-bar form
  assert.equal(startOffset(-Q, 1, 2), 0.25);                       // a two-bar form: a quarter turn is half a bar
});

test('travel direction from the corner order', () => {
  const ccw = [{ x: 1, z: 0 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 0, z: -1 }];
  assert.equal(travelDir(ccw), 1);
  assert.equal(travelDir([...ccw].reverse()), -1);
});

test('placed notes fire at their place; open curves out and back, the ends once', async () => {
  const { noteHits } = await import('../src/lib/pitch.js');
  assert.deepEqual(noteHits([0, 0.25, 0.75], true).map(h => h.t), [0, 0.25, 0.75]);
  assert.deepEqual(noteHits([0, 0.5, 1], false).map(h => [h.t, h.k]), [[0, 0], [0.25, 1], [0.75, 1], [0.5, 2]]);
});

test('a placed note snaps to the 1/16 grid along the path', async () => {
  const { snapFrac } = await import('../src/lib/pitch.js');
  assert.equal(snapFrac(0.26, 4, 0.25, true), 0.25);        // 1-bar loop: 1.04 units -> 1.0
  assert.equal(snapFrac(0.99, 4, 0.25, true), 0);           // wraps to the start
  assert.equal(snapFrac(1.2, 4, 0.25, false), 1);           // open: stays at the end
});

test('the path rises to each note and slopes between them, round the loop', async () => {
  const { heightAt } = await import('../src/lib/pitch.js');
  const N = [{ f: 0, y: 0 }, { f: 0.5, y: 1 }];
  assert.equal(heightAt(0.25, N, true), 0.5);
  assert.equal(heightAt(0.75, N, true), 0.5);               // back down towards the first note across the start
  assert.equal(heightAt(0.75, N, false), 1);                // open: level after the last note
});
