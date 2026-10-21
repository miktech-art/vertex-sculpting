// Shared delay response for live audio, offline tails, and sculpture copies.
export const MAX_ECHOES = 30;
export const MIN_ECHO_LEVEL = 0.008;

// Stretch the decay by 3x without changing repeat timing or first-repeat level.
export function delayFeedback(value) {
  return Math.cbrt(Math.max(0, Math.min(0.65, value)));
}
export function delayEchoes(mix, feedback) {
  const decay = delayFeedback(feedback), echoes = [];
  for (let index = 1; index <= MAX_ECHOES; index++) {
    const gain = mix * decay ** (index - 1);
    if (gain < MIN_ECHO_LEVEL) break;
    echoes.push({ index, gain });
  }
  return echoes;
}
