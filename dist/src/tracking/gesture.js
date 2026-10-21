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
const distance = (a, b) =>
  Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
const angle = (a, b, c) => {
  const ab = [a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0)],
    cb = [c.x - b.x, c.y - b.y, (c.z || 0) - (b.z || 0)];
  const length = Math.hypot(...ab) * Math.hypot(...cb);
  return length < 1e-10
    ? 180
    : (Math.acos(
        clamp(ab.reduce((v, x, i) => v + x * cb[i], 0) / length, -1, 1),
      ) *
        180) /
        Math.PI;
};
export function fingerCurled(landmarks, mcp, pip, dip, tip) {
  if (
    ![0, mcp, pip, dip, tip].every(
      (i) =>
        landmarks?.[i] &&
        ["x", "y", "z"].every((k) => Number.isFinite(landmarks[i][k])),
    )
  )
    return false;
  const bend = angle(landmarks[mcp], landmarks[pip], landmarks[dip]);
  const endBend = angle(landmarks[pip], landmarks[dip], landmarks[tip]);
  const tucked =
    distance(landmarks[tip], landmarks[0]) <
    distance(landmarks[pip], landmarks[0]) * 1.08;
  return bend < 140 && (endBend < 160 || tucked);
}
export function inspectRightHand(result) {
  let index = -1,
    confidence = 0;
  for (let i = 0; i < (result?.handedness?.length || 0); i++) {
    const category = result.handedness[i]?.[0];
    if (
      category?.categoryName === "Right" &&
      category.score >= 0.7 &&
      category.score > confidence
    ) {
      index = i;
      confidence = category.score;
    }
  }
  if (index < 0)
    return {
      hasRight: false,
      allowed: false,
      curled: [false, false, false],
      landmarks: null,
    };
  const landmarks = result.landmarks?.[index],
    world = result.worldLandmarks?.[index];
  if (!landmarks?.[8] || !Number.isFinite(landmarks[8].y))
    return {
      hasRight: false,
      allowed: false,
      curled: [false, false, false],
      landmarks: null,
    };
  const shape = world?.length === 21 ? world : landmarks;
  const curled = [
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ].map((ids) => fingerCurled(shape, ...ids));
  const normalized = clamp(
    (PITCH_BINDING.bottom - landmarks[8].y) /
      (PITCH_BINDING.bottom - PITCH_BINDING.top),
  );
  return {
    hasRight: true,
    allowed: curled.every(Boolean),
    curled,
    landmarks,
    normalized,
    pitch: denormalize("pitch", normalized),
    confidence,
  };
}

export class GestureBinding {
  constructor() {
    this.reset();
  }
  reset(pitch = 220) {
    this.active = false;
    this.readySince = null;
    this.invalidSince = null;
    this.lastTime = null;
    this.logPitch = Math.log(pitch);
  }
  update(result, time) {
    const sample = inspectRightHand(result),
      dt =
        this.lastTime === null
          ? 0
          : Math.max(0, Math.min(100, time - this.lastTime));
    this.lastTime = time;
    if (sample.allowed) {
      this.invalidSince = null;
      if (this.readySince === null) this.readySince = time;
      if (time - this.readySince >= PITCH_BINDING.acquireMs) this.active = true;
      if (this.active) {
        const alpha = 1 - Math.exp(-dt / PITCH_BINDING.smoothingMs);
        this.logPitch += (Math.log(sample.pitch) - this.logPitch) * alpha;
      }
    } else {
      this.readySince = null;
      if (this.invalidSince === null) this.invalidSince = time;
      if (time - this.invalidSince >= PITCH_BINDING.releaseMs)
        this.active = false;
    }
    // Invalid poses freeze pitch immediately, including during the short release hysteresis.
    return {
      ...sample,
      active: this.active,
      pitch: this.active && sample.allowed ? Math.exp(this.logPitch) : null,
    };
  }
}
