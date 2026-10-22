const NS = "http://www.w3.org/2000/svg";
const n = value => Number(value.toFixed(2));
const path = (d, opacity = 1, width = 0.8) => ({ tag: "path", d, opacity, "stroke-width": width });
const line = (x1, y1, x2, y2, opacity = 1, width = 0.8) =>
  path(`M${n(x1)},${n(y1)}L${n(x2)},${n(y2)}`, opacity, width);
const wave = (amplitude, cycles, y = 14, phase = 0, opacity = 1) => path(
  Array.from({ length: 49 }, (_, i) => {
    const x = i * 30 / 48;
    return `${i ? "L" : "M"}${n(x)},${n(y + amplitude * Math.sin(i / 48 * Math.PI * 2 * cycles + phase))}`;
  }).join(""), opacity,
);
const body = (height, opacity = 1, width = 30, x = 0, y = 14) => path(
  `M${x},${y}Q${n(x + width / 2)},${n(y - height * 2)} ${x + width},${y}Q${n(x + width / 2)},${n(y + height * 2)} ${x},${y}`,
  opacity,
);
const dots = (amount, width = 30, tail = false) => Array.from({ length: 18 }, (_, i) => ({
  tag: "circle", cx: n((i * 17 % 31) / 30 * width),
  cy: n(14 + (i * 13 % 19 - 9) * amount), r: 0.55,
  opacity: (tail ? 1 - (i * 17 % 31) / 40 : 1) * (amount * 0.65),
  fill: "currentColor", stroke: "none",
}));
const envelope = (a, d, sustain, end = 30, opacity = 1) => path(
  `M0,23L${a},5L${d},${n(23 - sustain * 18)}L${n(end - 6)},${n(23 - sustain * 18)}L${end},23`, opacity,
);
const bands = (id, a) => [-8, -4, 0, 4, 8].map(y => {
  const inner = Math.abs(y) <= 4;
  const alpha = id === "spectralLow" ? (inner ? 1 - a * 0.88 : 0.7)
    : id === "spectralHigh" ? (inner ? 0.9 : 1 - a * 0.9) : 0.8;
  return id === "spectralPeak" && Math.abs(y) === 4
    ? wave(a * 1.6, 6, 14 + y, 0, alpha)
    : line(0, 14 + y, 30, 14 + y, alpha);
});
const echo = (a, kind) => {
  const gap = kind === "echoSpacing" ? 2 + a * 3 : 4;
  const decay = kind === "persistence" ? 0.18 + a * 0.6 : 0.62;
  return Array.from({ length: 4 }, (_, i) => body(2.2,
    i ? (kind === "echoes" ? a : 0.8) * decay ** i : 1,
    17, i * gap, 7 + i * 4,
  ));
};

// Each preview compares a lower value (left) with a higher value (right).
// These are explanatory SVGs, independent of audio, mappings and rendering state.
export const VISUAL_EXAMPLES = {
  spectralLow: a => bands("spectralLow", a),
  spectralHigh: a => bands("spectralHigh", a),
  spectralPeak: a => bands("spectralPeak", a),
  thickness: a => [line(0, 14, 30, 14, 1, 0.7 + a * 2.5)],
  body: a => [body(1 + a * 7), line(0, 14, 30, 14, 0.35)],
  grain: a => [wave(a * 0.8, 13), ...dots(a)],
  twist: a => [wave(4, 0.5 + a * 2, 14), wave(4, 0.5 + a * 2, 14, Math.PI, 0.4)],
  detail: a => Array.from({ length: 2 + Math.round(a * 5) }, (_, i) => body(1 + i * 1.25, 0.6)),
  edge: a => [body(6, 0.3), wave(a * 1.4, 8, 8), wave(a * 1.4, 8, 20)],
  brightness: a => [body(5, 0.15 + a * 0.85)],
  spread: a => [body(2, 0.7, 30, 0, 14 - (1 + a * 5)), body(2, 0.7, 30, 0, 14 + (1 + a * 5))],
  onset: a => [envelope(2 + a * 12, 18, 0.6)],
  decayShape: a => [envelope(4, 8 + a * 14, 0.35)],
  plateau: a => [envelope(4, 10, 0.15 + a * 0.75)],
  length: a => [body(5, 1, 12 + a * 18)],
  tail: a => [path(`M0,23L4,6L8,13L${n(28 - a * 15)},13L30,23`)],
  motion: a => [wave(0.5 + a * 5, 2)],
  rate: a => [wave(3, 1 + a * 4)],
  echoes: a => echo(a, "echoes"),
  echoSpacing: a => echo(a, "echoSpacing"),
  persistence: a => echo(a, "persistence"),
  halo: a => [body(3, 0.8), ...dots(a)],
  haloTail: a => [body(3, 0.8, 12), ...dots(0.8, 12 + a * 18, true)],
};

export function createVisualExample(target) {
  const svg = document.createElementNS(NS, "svg");
  svg.classList.add("visual-example");
  svg.setAttribute("viewBox", "0 0 90 28");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${target.label}: lower to higher value`);
  svg.setAttribute("focusable", "false");
  const title = document.createElementNS(NS, "title");
  title.textContent = `${target.description} Lower value → higher value.`;
  svg.append(title);
  const append = (parent, spec) => {
    const { tag, ...attributes } = spec;
    const element = document.createElementNS(NS, tag);
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    parent.append(element);
  };
  for (const [amount, x] of [[0, 3], [1, 57]]) {
    const group = document.createElementNS(NS, "g");
    group.setAttribute("transform", `translate(${x},0)`);
    for (const spec of VISUAL_EXAMPLES[target.id](amount)) append(group, spec);
    svg.append(group);
  }
  append(svg, path("M40,14H50M47,11L50,14L47,17", 0.35, 0.6));
  return svg;
}
