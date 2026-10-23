/* ---------- recorded rhythms: taps on the bar clock -> a loop's notes ---------- */

// how many whole bars a take lasts: from the bar it started on to where R was pressed again, rounded (at least 1)
export const takeBars = (start, end, max = 16) => Math.min(max, Math.max(1, Math.round(end - start)));

// taps (bar positions on the transport clock) -> note places f (0…1 of the loop's path, from above = time), snapped to the
// 1/16 grid. The loop is `len` bars and plays in step with the transport (f = 0 on every bar that is a multiple of len),
// so the notes are turned to where the take started: it plays on exactly as it was played. A tap up to half a 1/16 early
// counts as the first step; taps before that or after the end are dropped; two taps on one step are one note.
export function tapNotes(taps, start, len, grid = 16) {
  const steps = len * grid, out = new Set();
  for (const b of taps) {
    const q = Math.round((b - start) * grid);
    if (q < 0 || q >= steps) continue;
    const at = ((Math.round(start * grid) + q) % steps + steps) % steps;
    out.add(at / steps);
  }
  return [...out].sort((a, b) => a - b);
}
