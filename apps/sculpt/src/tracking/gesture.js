import { clamp, denormalize } from "../model.js";

export const LOOP_BINDING = Object.freeze({
  hand: "Left",
  acquireMs: 140,
  releaseMs: 100,
  enterDegrees: 50,
  exitDegrees: 60,
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
export function selectHand(
  result,
  hand,
  { minConfidence = 0.7 } = {},
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
    if (!shape.every(finite) ||
      Math.max(distance(shape[0], shape[9]), distance(shape[5], shape[17])) < 1e-6
    ) continue;
    if (!selected || category.score > selected.confidence)
      selected = { landmarks, shape, confidence: category.score };
  }
  return selected;
}
// Use the visible finger silhouette for Loop. World-landmark depth and joint
// angles are too unstable to require a rigidly straight 3D index here.
function raisedIndex(hand, aspect, latched) {
  const image = hand.landmarks.map(p => ({ x: p.x * aspect, y: p.y, z: 0 }));
  const [mcp, pip, dip, tip] = [5, 6, 7, 8].map(i => image[i]);
  const chain = distance(mcp, pip) + distance(pip, dip) + distance(dip, tip);
  const palmScale = Math.max(distance(image[0], image[9]), distance(image[5], image[17]));
  const reach = distance(mcp, tip);
  const extended = palmScale > 1e-6 && chain >= palmScale * 0.35 &&
    reach >= chain * (latched ? 0.75 : 0.82);
  const tilt = Math.atan2(Math.abs(tip.x - mcp.x), mcp.y - tip.y) * 180 / Math.PI;
  return {
    extended,
    raised: extended && tip.y < pip.y - chain * 0.12 &&
      tilt <= (latched ? LOOP_BINDING.exitDegrees : LOOP_BINDING.enterDegrees),
  };
}
// A single upward index, with the other long fingers bent. No palm contact test.
export function inspectLoopHand(result, { latched = false } = {}) {
  const hand = selectHand(result, LOOP_BINDING.hand);
  if (!hand) return {
    hasLoopHand: false, allowed: false, curled: [false, false, false],
    indexExtended: false, indexRaised: false, landmarks: null,
  };
  const points = hand.shape;
  const curled = FINGERS.slice(1).map(([m, p, d, t]) =>
    !fingerExtended(points, m, p, d, t) &&
    (angle(points[m], points[p], points[d]) < 145 ||
      angle(points[p], points[d], points[t]) < 145),
  );
  const aspect = Number.isFinite(result?.frameAspectRatio) && result.frameAspectRatio > 0
    ? result.frameAspectRatio : 4 / 3;
  const index = raisedIndex(hand, aspect, latched);
  const indexExtended = index.extended, indexRaised = index.raised;
  return {
    ...hand, hasLoopHand: true, curled, indexExtended, indexRaised,
    allowed: indexRaised && curled.every(Boolean),
  };
}
export class LoopBinding {
  constructor() { this.reset(); }
  reset() {
    this.active = false;
    this.readySince = null;
    this.invalidSince = null;
  }
  update(result, time) {
    const sample = inspectLoopHand(result, { latched: this.active });
    if (sample.allowed) {
      this.invalidSince = null;
      if (this.readySince === null) this.readySince = time;
      if (time - this.readySince >= LOOP_BINDING.acquireMs) this.active = true;
    } else {
      this.readySince = null;
      if (this.invalidSince === null) this.invalidSince = time;
      if (time - this.invalidSince >= LOOP_BINDING.releaseMs) this.active = false;
    }
    return { ...sample, active: this.active };
  }
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
  // collapse its projected width).
  const selection = { minConfidence: 0.55 };
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
