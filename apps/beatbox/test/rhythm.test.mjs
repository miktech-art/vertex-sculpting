// npm run test — recorded rhythms (src/lib/rhythm.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { takeBars, tapNotes } from '../src/lib/rhythm.js';

test('takeBars rounds to whole bars, at least one, at most max', () => {
  assert.equal(takeBars(4, 4.3), 1);
  assert.equal(takeBars(4, 5.4), 1);
  assert.equal(takeBars(4, 5.6), 2);
  assert.equal(takeBars(4, 40), 16);
  assert.equal(takeBars(4, 60, 8), 8);
});

test('tapNotes snaps to 1/16 and keeps one note per step', () => {
  assert.deepEqual(tapNotes([3, 3.26, 3.24, 3.5, 3.74], 3, 1), [0, 0.25, 0.5, 0.75]);
});

test('a slightly early downbeat counts, earlier and later taps are dropped', () => {
  assert.deepEqual(tapNotes([2.98, 2.9, 4.1], 3, 1), [0]);
});

test('a take is turned so it plays in step with the transport', () => {
  // 2-bar loop recorded from bar 3: bar 3 is the second half of the loop (bars 2-3, 4-5, ...)
  assert.deepEqual(tapNotes([3, 4], 3, 2), [0, 0.5]);
  assert.deepEqual(tapNotes([3.25], 3, 2), [0.625]);
  assert.deepEqual(tapNotes([4.25], 4, 2), [0.125]);
});
