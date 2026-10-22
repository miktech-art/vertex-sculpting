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
  acquireMs: 80,
  releaseMs: 180,
  acquireGraceMs: 180,
  smoothingMs: 100,
  uprightEnterDegrees: 15,
  uprightExitDegrees: 22,
  pinchEnterRatio: 0.4,
  pinchExitRatio: 0.62,
  poseAcquireMs: 50,
  poseDropoutMs: 180,
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
export function selectHand(
  result,
  hand,
  { minConfidence = 0.7, requirePalm = true } = {},
) {
  let selected = null;
  for (let i = 0; i < (result?.handedness?.length || 0); i++) {
    const category = result.handedness[i]?.[0],
      landmarks = result.landmarks?.[i];
    if (
      category?.categoryName !== hand ||
      !Number.isFinite(category.score) ||
      category.score < minConfidence ||
      !landmarks?.length ||
      !landmarks.every(finite) ||
      landmarks.length !== 21
    )
      continue;
    const shape =
      result.worldLandmarks?.[i]?.length === 21
        ? result.worldLandmarks[i]
        : landmarks;
    if (!shape.every(finite) || (requirePalm && !palmFrame(shape))) continue;
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
// A global 3D finger direction is unchanged by turning the palm toward/away from
// the camera. Three clear long fingers suffice when the fourth is occluded.
function uprightMetrics(hand) {
  if (!hand) return { tilt: Infinity, extended: 0 };
  const points = hand.shape,
    directions = [];
  for (const [m, p, d, t] of FINGERS) {
    const chain =
      distance(points[m], points[p]) +
      distance(points[p], points[d]) +
      distance(points[d], points[t]);
    if (
      chain > 1e-6 &&
      distance(points[m], points[t]) / chain >= 0.82 &&
      angle(points[m], points[p], points[d]) >= 145 &&
      angle(points[p], points[d], points[t]) >= 135
    ) {
      directions.push(unit(sub(points[t], points[m])));
    }
  }
  if (!directions.length) return { tilt: Infinity, extended: 0 };
  const axis = [0, 1, 2].map(
    (i) => directions.reduce((sum, v) => sum + v[i], 0) / directions.length,
  );
  const tilt =
    (Math.atan2(Math.hypot(axis[0], axis[2]), -axis[1]) * 180) / Math.PI;
  return { tilt, extended: directions.length };
}
function pinchMetrics(hand, aspect) {
  if (!hand) return { ratio: Infinity, imageRatio: Infinity };
  const points = hand.shape,
    image = hand.landmarks;
  const scale = Math.max(
    distance(points[5], points[17]),
    distance(points[0], points[9]) * 0.75,
  );
  const pixels = (a, b) => Math.hypot((a.x - b.x) * aspect, a.y - b.y);
  const imageScale = Math.max(
    pixels(image[5], image[17]),
    pixels(image[0], image[9]) * 0.75,
  );
  return {
    ratio: scale > 1e-6 ? distance(points[4], points[8]) / scale : Infinity,
    imageRatio:
      imageScale > 1e-6 ? pixels(image[4], image[8]) / imageScale : Infinity,
  };
}
function inspectEnvelopeHands(
  result,
  { uprightLatched = false, pinchLatched = false },
  uprightSide,
  parameter,
) {
  // Envelope gestures do not require a well-conditioned palm plane (an edge-on hand can
  // collapse its projected width). Pitch retains its stricter palm-contact checks.
  const selection = { minConfidence: 0.55, requirePalm: false };
  const left = selectHand(result, "Left", selection),
    right = selectHand(result, "Right", selection);
  const upright = uprightSide === "Left" ? left : right,
    pinching = uprightSide === "Left" ? right : left;
  const { tilt, extended } = uprightMetrics(upright);
  const aspect = Number.isFinite(result?.frameAspectRatio)
    ? result.frameAspectRatio
    : 4 / 3;
  const { ratio, imageRatio } = pinchMetrics(pinching, aspect);
  const uprightOpen =
    extended >= 3 &&
    tilt <=
      (uprightLatched
        ? RELEASE_BINDING.uprightExitDegrees
        : RELEASE_BINDING.uprightEnterDegrees);
  // Use 2D proximity to tolerate uncertain depth when touching fingertips occlude
  // one another, while rejecting a large 3D separation seen in projection.
  const pinched =
    ratio <=
      (pinchLatched
        ? RELEASE_BINDING.pinchExitRatio
        : RELEASE_BINDING.pinchEnterRatio) ||
    (imageRatio <= (pinchLatched ? 0.42 : 0.28) && ratio <= 0.85);
  let pinch = null,
    anchor = null,
    normalized = 0;
  if (pinching)
    pinch = {
      x: (pinching.landmarks[4].x + pinching.landmarks[8].x) / 2,
      y: (pinching.landmarks[4].y + pinching.landmarks[8].y) / 2,
    };
  if (upright)
    anchor = {
      x: [0, 5, 9, 13, 17].reduce((s, i) => s + upright.landmarks[i].x, 0) / 5,
      y: [0, 5, 9, 13, 17].reduce((s, i) => s + upright.landmarks[i].y, 0) / 5,
    };
  if (pinch && anchor)
    normalized = clamp(
      (Math.abs(pinch.x - anchor.x) - RELEASE_BINDING.near) /
        (RELEASE_BINDING.far - RELEASE_BINDING.near),
    );
  return {
    allowed: uprightOpen && pinched,
    [`${uprightSide.toLowerCase()}Tilt`]: tilt,
    [`${uprightSide.toLowerCase()}Extended`]: extended,
    pinchRatio: ratio,
    pinchImageRatio: imageRatio,
    [`${uprightSide.toLowerCase()}Open`]: uprightOpen,
    pinched,
    left,
    right,
    pinch,
    anchor,
    normalized,
    [parameter]: denormalize(parameter, normalized),
  };
}

export function inspectReleaseHands(
  result,
  { leftLatched = false, pinchLatched = false } = {},
) {
  return inspectEnvelopeHands(
    result, { uprightLatched: leftLatched, pinchLatched }, "Left", "release",
  );
}
export function inspectAttackHands(
  result,
  { rightLatched = false, pinchLatched = false } = {},
) {
  return inspectEnvelopeHands(
    result, { uprightLatched: rightLatched, pinchLatched }, "Right", "attack",
  );
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
      if (this.invalidSince === null) this.invalidSince = time;
      if (
        !this.config.acquireGraceMs ||
        time - this.invalidSince >= this.config.acquireGraceMs
      )
        this.readySince = null;
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
// Each pose has its own stable state, so alternating noisy frames do not force
// the two hands to satisfy raw entry thresholds on the exact same frame.
class PoseLatch {
  constructor() {
    this.reset();
  }
  reset() {
    this.active = false;
    this.readySince = null;
    this.invalidSince = null;
  }
  update(enter, stay, time) {
    if (this.active ? stay : enter) {
      this.invalidSince = null;
      if (this.readySince === null) this.readySince = time;
      if (time - this.readySince >= RELEASE_BINDING.poseAcquireMs)
        this.active = true;
    } else {
      this.readySince = null;
      if (this.invalidSince === null) this.invalidSince = time;
      if (time - this.invalidSince >= RELEASE_BINDING.poseDropoutMs)
        this.active = false;
    }
    return this.active;
  }
}
class EnvelopeDistanceBinding extends SmoothedBinding {
  constructor(inspect, key, side, initial) {
    super(inspect, key, RELEASE_BINDING, initial);
    const openKey = `${side}Open`;
    this.uprightLatch = new PoseLatch();
    this.pinchLatch = new PoseLatch();
    this.inspect = (result) => {
      const raw = inspect(result);
      const relaxed = inspect(result, {
        [`${side}Latched`]: true,
        pinchLatched: true,
      });
      const uprightOpen = this.uprightLatch.update(
        raw[openKey],
        relaxed[openKey],
        this.sampleTime,
      );
      const pinched = this.pinchLatch.update(
        raw.pinched,
        relaxed.pinched,
        this.sampleTime,
      );
      return {
        ...relaxed,
        rawAllowed: raw.allowed,
        [openKey]: uprightOpen,
        pinched,
        // Missing or clearly broken poses freeze edits immediately; the stable
        // indicators and activation survive a brief tracking dropout.
        allowed: uprightOpen && pinched && relaxed[openKey] && relaxed.pinched,
      };
    };
  }
  reset(value = 1) {
    super.reset(value);
    this.uprightLatch?.reset();
    this.pinchLatch?.reset();
  }
  update(result, time) {
    this.sampleTime = time;
    return super.update(result, time);
  }
}

export class ReleaseBinding extends EnvelopeDistanceBinding {
  constructor() {
    super(inspectReleaseHands, "release", "left", 1);
  }
}
export class AttackBinding extends EnvelopeDistanceBinding {
  constructor() {
    super(inspectAttackHands, "attack", "right", 0.08);
  }
}
