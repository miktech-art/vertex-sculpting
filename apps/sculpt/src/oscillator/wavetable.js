export const WAVETABLES = ['Basic shapes', 'Hollow', 'Formant'];
export const FRAME_COUNT = 32;
export const harmonicAmplitude = (h, amount) => h === 1 ? 1 : amount / h ** (1.1 + (1 - amount) * 1.5);
const clamp = n => Math.max(0, Math.min(1, n));
function framePartial(h, frame, table, harmonics) {
  const t = frame / (FRAME_COUNT - 1), amplitude = harmonicAmplitude(h, harmonics);
  if (h === 1) return 1;
  if (table === 1) {
    const duty = 0.5 - t * 0.42;
    return amplitude * Math.sin(h * Math.PI * duty) / Math.sin(Math.PI * duty);
  }
  if (table === 2) {
    const center = 2 + t * 18;
    return amplitude * (0.12 + 2.8 * Math.exp(-0.5 * ((h - center) / (1.2 + t * 2)) ** 2));
  }
  // Saw → square → triangle → sine. Frame zero is the original oscillator.
  const shapes = [1, h % 2 ? 1 : 0, h % 2 ? (h % 4 === 1 ? 1 : -1) / h : 0, 0];
  const x = t * 3, i = Math.min(2, Math.floor(x)), mix = x - i;
  return amplitude * (shapes[i] * (1 - mix) + shapes[i + 1] * mix);
}
export function wavetablePartial(h, params) {
  const position = clamp(params.wavePosition ?? 0) * (FRAME_COUNT - 1);
  const frame = Math.floor(position), mix = position - frame;
  const table = Math.max(0, Math.min(2, Math.round(params.waveTable ?? 0)));
  return framePartial(h, frame, table, params.harmonics) * (1 - mix) +
    framePartial(h, Math.min(FRAME_COUNT - 1, frame + 1), table, params.harmonics) * mix;
}
export function wavetableCoefficients(params) {
  const real = new Float32Array(97), imag = new Float32Array(97);
  for (let h = 1; h < imag.length; h++) imag[h] = wavetablePartial(h, params);
  return { real, imag };
}
export function waveform(params, count = 160) {
  const { imag } = wavetableCoefficients(params);
  const samples = Array.from({ length: count }, (_, i) => {
    let y = 0;
    for (let h = 1; h < imag.length; h++) y += imag[h] * Math.sin(2 * Math.PI * i / (count - 1) * h);
    return y;
  });
  const peak = Math.max(1, ...samples.map(Math.abs));
  return samples.map(y => y / peak);
}
