import { clamp, denormalize } from "../model.js";

export const PITCH_BINDING = Object.freeze({
  hand: "Right",
  tip: 8,
  top: 0.12,
  bottom: 0.88,
  acquireMs: 140,
  releaseMs: 100,
  smoothingMs: 75,
});
export const RELEASE_BINDING = Object.freeze({
  near: 0.08,
  far: 0.6,
  acquireMs: 180,
  releaseMs: 100,
  smoothingMs: 100,
});
const sub = (a, b) => [a.x - b.x, a.y - b.y, a.z - b.z];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.hypot(...a);
const unit = (a) => a.map((x) => x / norm(a));
const distance = (a, b) => norm(sub(a, b));
const finite = (p) => p && ["x", "y", "z"].every((k) => Number.isFinite(p[k]));
const angle = (a, b, c) => {
  const ab = sub(a, b),
    cb = sub(c, b),
    length = norm(ab) * norm(cb);
  return length < 1e-10
    ? 0
    : (Math.acos(clamp(dot(ab, cb) / length, -1, 1)) * 180) / Math.PI;
};
const FINGERS = [
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20],
];

function palmFrame(points) {
  if (![0, 5, 9, 17].every((i) => finite(points?.[i]))) return null;
  const across = sub(points[5], points[17]),
    width = norm(across);
  if (width < 1e-6) return null;
  const u = unit(across),
    lengthwise = sub(points[9], points[0]);
  const along = lengthwise.map((x, i) => x - u[i] * dot(lengthwise, u)),
    length = norm(along);
  if (length < width * 0.3) return null;
  const v = unit(along),
    n = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ];
  return { u, v, n, width, length };
}
export function fingerExtended(points, mcp, pip, dip, tip) {
  if (![mcp, pip, dip, tip].every((i) => finite(points?.[i]))) return false;
  const chain =
    distance(points[mcp], points[pip]) +
    distance(points[pip], points[dip]) +
    distance(points[dip], points[tip]);
  return (
    chain > 1e-6 &&
    angle(points[mcp], points[pip], points[dip]) >= 165 &&
    angle(points[pip], points[dip], points[tip]) >= 165 &&
    distance(points[mcp], points[tip]) >= chain * 0.94
  );
}
// Contact is inferred from a tight curl AND a fingertip in the palm surface region.
// A webcam cannot measure skin contact; tolerance includes landmark/pad depth uncertainty.
export function fingertipAtPalm(points, mcp, pip, dip, tip) {
  if (![mcp, pip, dip, tip].every((i) => finite(points?.[i]))) return false;
  const palm = palmFrame(points);
  if (
    !palm ||
    angle(points[mcp], points[pip], points[dip]) > 105 ||
    angle(points[pip], points[dip], points[tip]) > 115
  )
    return false;
  const p = sub(points[tip], points[0]),
    x = dot(p, palm.u),
    y = dot(p, palm.v),
    z = dot(p, palm.n);
  const left = dot(sub(points[17], points[0]), palm.u),
    right = dot(sub(points[5], points[0]), palm.u);
  return (
    y >= palm.length * 0.18 &&
    y <= palm.length * 1.04 &&
    x >= left - palm.width * 0.08 &&
    x <= right + palm.width * 0.08 &&
    Math.abs(z) <= palm.width * 0.18
  );
}
export function selectHand(result, hand) {
  let selected = null;
  for (let i = 0; i < (result?.handedness?.length || 0); i++) {
    const category = result.handedness[i]?.[0],
      landmarks = result.landmarks?.[i];
    if (
      category?.categoryName !== hand ||
      !Number.isFinite(category.score) ||
      category.score < 0.7 ||
      !landmarks?.length ||
      !landmarks.every(finite) ||
      landmarks.length !== 21
    )
      continue;
    const shape =
      result.worldLandmarks?.[i]?.length === 21
        ? result.worldLandmarks[i]
        : landmarks;
    if (!shape.every(finite) || !palmFrame(shape)) continue;
    if (!selected || category.score > selected.confidence)
      selected = { landmarks, shape, confidence: category.score };
  }
  return selected;
}
export function inspectRightHand(result) {
  const hand = selectHand(result, "Right");
  if (!hand)
    return {
      hasRight: false,
      allowed: false,
      curled: [false, false, false],
      indexExtended: false,
      landmarks: null,
    };
  const curled = FINGERS.slice(1).map((ids) =>
    fingertipAtPalm(hand.shape, ...ids),
  );
  const indexExtended = fingerExtended(hand.shape, ...FINGERS[0]);
  const normalized = clamp(
    (PITCH_BINDING.bottom - hand.landmarks[8].y) /
      (PITCH_BINDING.bottom - PITCH_BINDING.top),
  );
  return {
    ...hand,
    hasRight: true,
    allowed: curled.every(Boolean) && indexExtended,
    curled,
    indexExtended,
    normalized,
    pitch: denormalize("pitch", normalized),
  };
}
function uprightOpen(hand) {
  if (!hand) return false;
  const p = hand.shape,
    image = hand.landmarks;
  if (!FINGERS.every((ids) => fingerExtended(p, ...ids))) return false;
  // An extended thumb is naturally diagonal; the four long fingers point toward the roof.
  if (
    angle(p[1], p[2], p[3]) < 150 ||
    angle(p[2], p[3], p[4]) < 155 ||
    distance(p[4], p[17]) < distance(p[5], p[17]) * 0.95 ||
    image[4].y >= image[2].y
  )
    return false;
  const palmLength = Math.hypot(
    image[9].x - image[0].x,
    image[9].y - image[0].y,
  );
  return (
    palmLength > 0.01 &&
    image[9].y < image[0].y &&
    FINGERS.every(([m, , , t]) => {
      const dx = image[t].x - image[m].x,
        up = image[m].y - image[t].y;
      return up > palmLength * 0.45 && Math.abs(dx) <= up * 0.58;
    })
  );
}
export function inspectReleaseHands(result) {
  const left = selectHand(result, "Left"),
    right = selectHand(result, "Right");
  const leftOpen = uprightOpen(left),
    pinched =
      !!right &&
      distance(right.shape[4], right.shape[8]) <=
        palmFrame(right.shape).width * 0.22;
  let pinch = null,
    anchor = null,
    normalized = 0;
  if (right)
    pinch = {
      x: (right.landmarks[4].x + right.landmarks[8].x) / 2,
      y: (right.landmarks[4].y + right.landmarks[8].y) / 2,
    };
  if (left)
    anchor = {
      x: [0, 5, 9, 13, 17].reduce((s, i) => s + left.landmarks[i].x, 0) / 5,
      y: [0, 5, 9, 13, 17].reduce((s, i) => s + left.landmarks[i].y, 0) / 5,
    };
  if (pinch && anchor)
    normalized = clamp(
      (Math.abs(pinch.x - anchor.x) - RELEASE_BINDING.near) /
        (RELEASE_BINDING.far - RELEASE_BINDING.near),
    );
  return {
    allowed: leftOpen && pinched,
    leftOpen,
    pinched,
    left,
    right,
    pinch,
    anchor,
    normalized,
    release: denormalize("release", normalized),
  };
}

class SmoothedBinding {
  constructor(inspect, key, config, initial) {
    this.inspect = inspect;
    this.key = key;
    this.config = config;
    this.reset(initial);
  }
  reset(value = 220) {
    this.active = false;
    this.readySince = null;
    this.invalidSince = null;
    this.lastTime = null;
    this.logValue = Math.log(value);
  }
  update(result, time) {
    const sample = this.inspect(result),
      dt =
        this.lastTime === null
          ? 0
          : Math.max(0, Math.min(100, time - this.lastTime));
    this.lastTime = time;
    if (sample.allowed) {
      this.invalidSince = null;
      if (this.readySince === null) this.readySince = time;
      if (time - this.readySince >= this.config.acquireMs) this.active = true;
      if (this.active)
        this.logValue +=
          (Math.log(sample[this.key]) - this.logValue) *
          (1 - Math.exp(-dt / this.config.smoothingMs));
    } else {
      this.readySince = null;
      if (this.invalidSince === null) this.invalidSince = time;
      if (time - this.invalidSince >= this.config.releaseMs)
        this.active = false;
    }
    return {
      ...sample,
      active: this.active,
      [this.key]:
        this.active && sample.allowed ? Math.exp(this.logValue) : null,
    };
  }
}
export class GestureBinding extends SmoothedBinding {
  constructor() {
    super(inspectRightHand, "pitch", PITCH_BINDING, 220);
  }
}
export class ReleaseBinding extends SmoothedBinding {
  constructor() {
    super(inspectReleaseHands, "release", RELEASE_BINDING, 1);
  }
}
