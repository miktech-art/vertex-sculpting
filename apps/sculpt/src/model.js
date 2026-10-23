import { WAVETABLES } from './oscillator/wavetable.js';
import { delayEchoes } from "./delay.js";

// Sound definitions are independent of UI, renderer, and audio backend.
export const SCHEMA = "sound-form/preset-v1";
export const PARAMETERS = [
  {
    id: "pitch",
    label: "Pitch",
    group: "source",
    min: 55,
    max: 1760,
    value: 220,
    unit: "Hz",
    scale: "log",
    description:
      "Fundamental frequency. Lower pitch makes the line thicker by default.",
  },
  {
    id: "volume",
    label: "Level",
    group: "source",
    min: 0,
    max: 0.8,
    value: 0.35,
    unit: "%",
    description: "Output level before the master limiter.",
  },
  {
    id: "harmonics",
    label: "Harmonics",
    group: "source",
    min: 0,
    max: 1,
    value: 0,
    unit: "%",
    description: "Adds up to 96 harmonics to the fundamental.",
  },
  {
    id: "detune",
    label: "Detune",
    group: "source",
    min: 0,
    max: 40,
    value: 0,
    unit: "ct",
    description: "Separates a pair of voices in pitch.",
  },
  {
    id: "noise",
    label: "Noise",
    group: "source",
    min: 0,
    max: 1,
    value: 0,
    unit: "%",
    description: "Blends filtered noise into the tone.",
  },
  {
    id: "cutoff",
    label: "High cutoff",
    group: "source",
    min: 20,
    max: 18000,
    value: 18000,
    unit: "Hz",
    scale: "log",
    description: "Upper edge of the pass band. Frequencies above it fade out.",
  },
  {
    id: "cutoffLow",
    label: "Low cutoff",
    group: "source",
    min: 20,
    max: 18000,
    value: 20,
    unit: "Hz",
    scale: "log",
    description: "Lower edge of the pass band. Frequencies below it fade out.",
  },
  {
    id: "resonance",
    label: "Resonance",
    group: "source",
    min: 0.1,
    max: 16,
    value: 0.1,
    unit: "dB",
    scale: "log",
    description: "Boosts frequency bands near the low and high cutoffs.",
  },
  {
    id: "drive",
    label: "Drive",
    group: "source",
    min: 0,
    max: 1,
    value: 0,
    unit: "%",
    description: "Soft saturation before the filter.",
  },
  {
    id: "width",
    label: "Stereo width",
    group: "source",
    min: 0,
    max: 1,
    value: 0,
    unit: "%",
    description: "Spreads the paired voices across the stereo field.",
  },
  {
    id: "attack",
    label: "Attack",
    group: "contour",
    min: 0.005,
    max: 1.6,
    value: 0.01,
    unit: "s",
    scale: "log",
    description: "Time to rise from silence to full level.",
  },
  {
    id: "decay",
    label: "Decay",
    group: "contour",
    min: 0.02,
    max: 2,
    value: 0.12,
    unit: "s",
    scale: "log",
    description: "Time to settle from full level to sustain.",
  },
  {
    id: "sustain",
    label: "Sustain",
    group: "contour",
    min: 0,
    max: 1,
    value: 1,
    unit: "%",
    description: "Level held after the decay.",
  },
  {
    id: "hold",
    label: "Hold",
    group: "contour",
    min: 0.1,
    max: 2,
    value: 0.65,
    unit: "s",
    description: "Time at the sustain level before release.",
  },
  {
    id: "release",
    label: "Release",
    group: "contour",
    min: 0.02,
    max: 3,
    value: 0.08,
    unit: "s",
    scale: "log",
    description: "Time to return from sustain to silence.",
  },
  {
    id: "motion",
    label: "Tremolo",
    group: "contour",
    min: 0,
    max: 0.8,
    value: 0,
    unit: "%",
    description: "Periodic movement in amplitude.",
  },
  {
    id: "rate",
    label: "Motion rate",
    group: "contour",
    min: 0.2,
    max: 100,
    value: 3,
    unit: "Hz",
    scale: "log",
    description: "Speed of the amplitude movement.",
  },
  {
    id: "delayMix",
    label: "Delay",
    group: "space",
    min: 0,
    max: 0.55,
    value: 0,
    unit: "%",
    description: "Level of the first delayed impression.",
  },
  {
    id: "delayTime",
    label: "Delay time",
    group: "space",
    min: 0.08,
    max: 0.85,
    value: 0.28,
    unit: "s",
    description: "Time between repeats.",
  },
  {
    id: "feedback",
    label: "Feedback",
    group: "space",
    min: 0,
    max: 0.65,
    value: 0.3,
    unit: "%",
    description: "Repeat persistence, with an expanded decay range.",
  },
  {
    id: "reverbMix",
    label: "Reverb",
    group: "space",
    min: 0,
    max: 0.65,
    value: 0,
    unit: "%",
    description: "Level of a diffuse reverberant space.",
  },
  {
    id: "reverbDecay",
    label: "Reverb tail",
    group: "space",
    min: 0.2,
    max: 4,
    value: 1.8,
    unit: "s",
    description: "Duration of the reverberant decay.",
  },
  { id: "wavePosition", label: "Position", group: "oscillator", min: 0, max: 1, value: 0, unit: "%", description: "Morph continuously through the selected wavetable." },
  { id: "waveTable", label: "Wavetable", group: "oscillator", min: 0, max: 2, value: 0, unit: "", description: "Choose Basic shapes, Hollow, or Formant." },
];
export const PARAM_BY_ID = Object.fromEntries(PARAMETERS.map((p) => [p.id, p]));
export const BASE = Object.freeze(
  Object.fromEntries(PARAMETERS.map((p) => [p.id, p.value])),
);
export const TARGETS = [
  {
    id: "spectralLow",
    label: "Low-frequency fade",
    description: "Attenuates inner frequency bands below a cutoff.",
  },
  {
    id: "spectralHigh",
    label: "High-frequency fade",
    default: 1,
    description: "Attenuates outer frequency bands above a cutoff.",
  },
  {
    id: "spectralPeak",
    label: "Cutoff resonance",
    description: "Crinkles frequency-band lines near each cutoff.",
  },

  {
    id: "thickness",
    label: "Line thickness",
    description: "Width of the primary white line.",
  },
  {
    id: "body",
    label: "Body / expansion",
    description: "Radial size of the filament structure.",
  },
  {
    id: "grain",
    label: "Grain",
    description: "Fine displacement and particles.",
  },
  {
    id: "twist",
    label: "Twist",
    description: "Turns of the filaments along the sound.",
  },
  {
    id: "detail",
    label: "Filament detail",
    description: "Visible high-frequency structure.",
  },
  {
    id: "edge",
    label: "Ridges",
    description: "Concentrated edges around the body.",
  },
  {
    id: "brightness",
    label: "Luminance",
    description: "Intensity of the sculpture.",
  },
  {
    id: "spread",
    label: "Stereo spread",
    description: "Separation of the two voice structures.",
  },
  {
    id: "onset",
    label: "Leading taper",
    description: "Extent of the attack region.",
  },
  {
    id: "decayShape",
    label: "Body slope",
    description: "Extent of the decay region.",
  },
  {
    id: "plateau",
    label: "Body fullness",
    description: "Fullness after the initial peak.",
  },
  {
    id: "length",
    label: "Held length",
    description: "Extent of the sustain region.",
  },
  {
    id: "tail",
    label: "Trailing taper",
    description: "Extent of the release region.",
  },
  {
    id: "motion",
    label: "Ripple depth",
    description: "Periodic variation along the form.",
  },
  {
    id: "rate",
    label: "Ripple frequency",
    description: "Number of periodic variations.",
  },
  {
    id: "echoes",
    label: "Echo impressions",
    description: "Strength of repeated whole sculptures.",
  },
  {
    id: "echoSpacing",
    label: "Echo spacing",
    description: "Separation between impressions.",
  },
  {
    id: "persistence",
    label: "Echo persistence",
    description: "How long successive impressions remain.",
  },
  {
    id: "halo",
    label: "Diffuse halo",
    description: "A fine cloud around the form.",
  },
  {
    id: "haloTail",
    label: "Halo extent",
    description: "Extent of the reverberant cloud.",
  },
];
const pairs = [
  ["pitch", "thickness"],
  ["harmonics", "body"],
  ["noise", "grain"],
  ["detune", "twist"],
  ["cutoff", "spectralHigh"],
  ["resonance", "spectralPeak"],
  ["volume", "brightness"],
  ["width", "spread"],
  ["attack", "onset"],
  ["decay", "decayShape"],
  ["sustain", "plateau"],
  ["hold", "length"],
  ["release", "tail"],
  ["motion", "motion"],
  ["rate", "rate"],
  ["delayMix", "echoes"],
  ["delayTime", "echoSpacing"],
  ["feedback", "persistence"],
  ["reverbMix", "halo"],
  ["reverbDecay", "haloTail"],
];
export const DEFAULT_ROUTES = pairs.map(([source, target], i) => ({
  id: `route-${i}`,
  source,
  target,
  amount: 1,
  invert: source === "pitch" && target === "thickness",
  curve: 1,
  smoothing: 0.08,
}));
DEFAULT_ROUTES.push({
  id: "route-drive",
  source: "drive",
  target: "edge",
  amount: 0.45,
  invert: false,
  curve: 1,
  smoothing: 0.08,
});
DEFAULT_ROUTES.push({
  id: "route-cutoff-low",
  source: "cutoffLow",
  target: "spectralLow",
  amount: 1,
  invert: false,
  curve: 1,
  smoothing: 0.08,
});
export const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
export function normalize(id, value) {
  const p = PARAM_BY_ID[id];
  return clamp(
    p.scale === "log"
      ? Math.log(value / p.min) / Math.log(p.max / p.min)
      : (value - p.min) / (p.max - p.min),
  );
}
export function denormalize(id, n) {
  const p = PARAM_BY_ID[id];
  return p.scale === "log"
    ? p.min * (p.max / p.min) ** clamp(n)
    : p.min + (p.max - p.min) * clamp(n);
}
export function formatValue(id, value) {
  const p = PARAM_BY_ID[id];
  if (id === "waveTable") return WAVETABLES[Math.round(value)];
  if (id === "rate") return `${value.toFixed(1)} Hz`;
  if (p.unit === "%") return `${Math.round(value * 100)}%`;
  if (p.unit === "s")
    return value < 1
      ? `${Math.round(value * 1000)} ms`
      : `${value.toFixed(2)} s`;
  if (p.unit === "Hz")
    return value >= 1000
      ? `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} kHz`
      : `${Math.round(value)} Hz`;
  if (p.unit === "ct") return `${value.toFixed(1)} ct`;
  return value.toFixed(2);
}
export const duration = (p) => p.attack + p.decay + p.hold + p.release;
export function envelopeAt(p, t) {
  if (t < 0) return 0;
  if (t < p.attack) return t / p.attack;
  t -= p.attack;
  if (t < p.decay) return 1 - ((1 - p.sustain) * t) / p.decay;
  t -= p.decay;
  if (t < p.hold) return p.sustain;
  t -= p.hold;
  return t < p.release ? p.sustain * (1 - t / p.release) : 0;
}
export function tailDuration(p) {
  const repeats = p.delayTime * delayEchoes(p.delayMix, p.feedback).length;
  return duration(p) + Math.max(repeats, p.reverbMix > 0 ? p.reverbDecay : 0);
}
export function noteName(hz) {
  const midi = Math.round(69 + 12 * Math.log2(hz / 440));
  return `${["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"][((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}
export function resolveMappings(params, routes) {
  const values = Object.fromEntries(TARGETS.map((t) => [t.id, 0]));
  for (const r of routes) {
    let n = normalize(r.source, params[r.source]);
    if (r.invert) n = 1 - n;
    values[r.target] += n ** r.curve * r.amount;
  }
  for (const target of TARGETS)
    values[target.id] = routes.some((r) => r.target === target.id)
      ? clamp(values[target.id])
      : (target.default ?? 0);
  return values;
}
export function validateDocument(input) {
  // Visual-only presets did not store a played pitch. Restore a neutral A3
  // while retaining their settings and mapping the note input back to pitch.
  if (input?.schema === "sound-sculpt/visual-preset-v2") {
    input = {
      ...input,
      schema: SCHEMA,
      params: input.params ? { ...input.params, pitch: BASE.pitch } : input.params,
      routes: Array.isArray(input.routes) ? input.routes.map((route) =>
        route?.source === "notePitch" ? { ...route, source: "pitch" } : route
      ) : input.routes,
    };
  }
  if (!input || input.schema !== SCHEMA)
    throw new Error("This file is not a Sound/Sculpt v1 preset.");
  if (
    !input.params ||
    !Array.isArray(input.routes) ||
    input.routes.length > 100
  )
    throw new Error("Missing sound parameters or valid connections.");
  const legacyFilter = !Object.hasOwn(input.params, "cutoffLow");
  const params = {};
  for (const p of PARAMETERS) {
    const v = p.id === "cutoffLow" && legacyFilter ? 20 :
      ["wavePosition", "waveTable"].includes(p.id) && !Object.hasOwn(input.params, p.id) ? p.value : input.params[p.id];
    if (typeof v !== "number" || !Number.isFinite(v) || v < p.min || v > p.max)
      throw new Error(`Invalid ${p.label.toLowerCase()} value.`);
    params[p.id] = v;
  }
  if (!Number.isInteger(params.waveTable)) throw new Error("Invalid wavetable selection.");
  if (params.cutoffLow > params.cutoff)
    throw new Error("Low cutoff must not exceed high cutoff.");
  const routes = input.routes.map((r, i) => {
    if (
      !r ||
      !Object.hasOwn(PARAM_BY_ID, r.source) ||
      !TARGETS.some((t) => t.id === r.target)
    )
      throw new Error(`Unknown endpoint in connection ${i + 1}.`);
    if (
      !Number.isFinite(r.amount) ||
      Math.abs(r.amount) > 2 ||
      !Number.isFinite(r.curve) ||
      r.curve < 0.2 ||
      r.curve > 4 ||
      !Number.isFinite(r.smoothing) ||
      r.smoothing < 0 ||
      r.smoothing > 2 ||
      typeof r.invert !== "boolean"
    )
      throw new Error(`Invalid settings in connection ${i + 1}.`);
    const id = `import-${i}`;
    return {
      id,
      source: r.source,
      target:
        legacyFilter &&
        r.amount === 1 &&
        !r.invert &&
        r.curve === 1 &&
        r.smoothing === 0.08
          ? r.source === "cutoff" && r.target === "detail"
            ? "spectralHigh"
            : r.source === "resonance" && r.target === "edge"
              ? "spectralPeak"
              : r.target
          : r.target,
      amount: r.amount,
      curve: r.curve,
      smoothing: r.smoothing,
      invert: r.invert,
    };
  });
  if (
    legacyFilter &&
    routes.some((r) => r.target === "spectralHigh" && r.source === "cutoff") &&
    !routes.some((r) => r.source === "cutoffLow")
  )
    routes.push({ ...DEFAULT_ROUTES.find((r) => r.source === "cutoffLow") });
  return {
    schema: SCHEMA,
    name: typeof input.name === "string" ? input.name.slice(0, 60) : "Untitled",
    params,
    routes,
  };
}
// Factory sounds are always available separately from the user's saved library.
export const PRESETS = [
  { id: 'kick', name: 'kick', params: { ...BASE, pitch: 55, volume: .5, wavePosition: 1,
    cutoff: 850, attack: .005, decay: .18, sustain: 0, hold: .1, release: .06 } },
  { id: 'bass', name: 'bass', params: { ...BASE, pitch: 73.42, volume: .32, harmonics: .75,
    cutoff: 950, resonance: .8, attack: .01, decay: .18, sustain: .65, hold: .65, release: .15 } },
  { id: 'hi-hat', name: 'hi-hat', params: { ...BASE, volume: .22, noise: 1,
    cutoffLow: 6500, cutoff: 16000, attack: .005, decay: .045, sustain: 0, hold: .1, release: .025 } },
  { id: 'synth', name: 'synth', params: { ...BASE, pitch: 220, volume: .3, harmonics: .86,
    attack: .01, decay: .2, sustain: .7, hold: .65, release: .2 } },
];
export function makeDocument(preset = PRESETS[0]) {
  return {
    schema: SCHEMA,
    name: preset.name,
    params: { ...preset.params },
    routes: structuredClone(DEFAULT_ROUTES),
  };
}
