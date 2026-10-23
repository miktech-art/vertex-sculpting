// Decibels relative to a unit source fundamental, not dB SPL or an audibility test.
// This display curve avoids promoting tiny partials into conspicuous full-bright ridges.
export const RIDGE_FLOOR_DB = -60;
export function ridgeDecibels(amplitude) {
  return amplitude > 0 ? 20 * Math.log10(amplitude) : -Infinity;
}
export function ridgeStrength(amplitude) {
  const normalized = Math.max(0, Math.min(1, (ridgeDecibels(amplitude) - RIDGE_FLOOR_DB) / -RIDGE_FLOOR_DB));
  return normalized ** 2.4;
}
