export const MAX_ECHOES = 10;
export const MIN_ECHO_LEVEL = 0.008;

// All copies share one seconds-to-longitudinal-distance scale and identical size.
export function buildEchoLayout(
  duration,
  length,
  { mix = 0, delay = 0.28, feedback = 0, separation = 32 } = {},
) {
  const unitsPerSecond = length / duration,
    copies = [
      { index: 0, time: 0, gain: 1, scale: 1, offset: { x: 0, y: 0, z: 0 } },
    ];
  for (let i = 1; i <= MAX_ECHOES; i++) {
    const gain = mix * feedback ** (i - 1);
    if (gain < MIN_ECHO_LEVEL) break;
    copies.push({
      index: i,
      time: i * delay,
      gain,
      scale: 1,
      offset: { x: i * delay * unitsPerSecond, y: i * separation, z: 0 },
    });
  }
  const last = copies.at(-1);
  return {
    copies,
    unitsPerSecond,
    duration: duration + last.time,
    length: length + last.offset.x,
  };
}

// A single global "now" plane intersects each copy at its own local sound time.
export function presentProgress(
  elapsed,
  copyTime,
  soundDuration,
  sceneDuration,
  held = false,
) {
  if (elapsed < 0) return null;
  const time = (held ? elapsed % sceneDuration : elapsed) - copyTime;
  return time >= 0 && time <= soundDuration ? time / soundDuration : null;
}
export function timeTickStep(visibleSeconds) {
  const rough = Math.max(0.001, visibleSeconds / 8),
    power = 10 ** Math.floor(Math.log10(rough));
  return [1, 2, 5, 10].find((n) => n * power >= rough) * power;
}
