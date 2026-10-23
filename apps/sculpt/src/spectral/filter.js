import { wavetablePartial } from '../oscillator/wavetable.js';
export { harmonicAmplitude } from '../oscillator/wavetable.js';
// Shared audio/visual transfer model. Resonance uses Web Audio low/high-pass Q
// in dB: https://www.w3.org/TR/webaudio-1.0/#filters-characteristics
export const FILTER_MIN = 20;
export const FILTER_MAX = 18000;
export function filterSettings(params, sampleRate = 48000) {
  const ceiling = Math.min(FILTER_MAX, sampleRate * 0.499);
  const high = Math.max(
    FILTER_MIN,
    Math.min(ceiling, params.cutoff ?? FILTER_MAX),
  );
  return {
    low: Math.max(FILTER_MIN, Math.min(high, params.cutoffLow ?? FILTER_MIN)),
    high,
    resonance: Math.max(0.1, Math.min(16, params.resonance ?? 0.1)),
    sampleRate,
  };
}
export function filterCoefficients(
  type,
  frequency,
  resonance,
  sampleRate = 48000,
) {
  const w =
      (2 * Math.PI * Math.min(frequency, sampleRate * 0.499)) / sampleRate,
    cos = Math.cos(w),
    alpha = Math.sin(w) / (2 * 10 ** (resonance / 20));
  const b =
    type === "highpass"
      ? [(1 + cos) / 2, -(1 + cos), (1 + cos) / 2]
      : [(1 - cos) / 2, 1 - cos, (1 - cos) / 2];
  return { b, a: [1 + alpha, -2 * cos, 1 - alpha] };
}
export function responseMagnitude(coefficients, frequency, sampleRate = 48000) {
  if (frequency <= 0 || frequency >= sampleRate / 2) return 0;
  const w = (2 * Math.PI * frequency) / sampleRate;
  const power = (values) => {
    const re =
        values[0] + values[1] * Math.cos(w) + values[2] * Math.cos(2 * w),
      im = -values[1] * Math.sin(w) - values[2] * Math.sin(2 * w);
    return re * re + im * im;
  };
  return Math.sqrt(
    power(coefficients.b) / Math.max(1e-20, power(coefficients.a)),
  );
}
export function createFilterResponse(params, sampleRate = 48000) {
  const s = filterSettings(params, sampleRate),
    low = filterCoefficients("highpass", s.low, s.resonance, sampleRate),
    high = filterCoefficients("lowpass", s.high, s.resonance, sampleRate);
  return (frequency) =>
    responseMagnitude(low, frequency, sampleRate) *
    responseMagnitude(high, frequency, sampleRate);
}

// Individual low partials and grouped higher partials keep the form readable.
// Every synthesized harmonic belongs to exactly one fixed frequency band.
const CENTERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 19, 23, 28, 34, 41, 50, 61, 74,
  88, 96,
];
export const HARMONIC_BANDS = CENTERS.map((center, i) => ({
  center,
  partials: Array.from({ length: 96 }, (_, h) => h + 1).filter((h) => {
    let nearest = 0;
    for (let j = 1; j < CENTERS.length; j++)
      if (Math.abs(h - CENTERS[j]) < Math.abs(h - CENTERS[nearest]))
        nearest = j;
    return nearest === i;
  }),
}));
export function bandAmplitude(band, params, response) {
  let before = 0,
    after = 0;
  for (const h of band.partials) {
    const amplitude = wavetablePartial(h, params);
    before += amplitude * amplitude;
    after += (amplitude * response(params.pitch * h)) ** 2;
  }
  return {
    source: Math.sqrt(before / band.partials.length),
    gain: before > 0 ? Math.sqrt(after / before) : 0,
  };
}

// Resonance uses the original crinkled-ridge language, localized in log frequency.
export function cutoffResonanceWeight(frequency, low, high, amount) {
  if (amount <= 0 || frequency <= 0) return 0;
  const width = 0.45 - 0.22 * amount;
  const proximity = (cutoff) =>
    Math.exp(-0.5 * (Math.log2(frequency / cutoff) / width) ** 2);
  return amount * Math.max(proximity(low), proximity(high));
}
