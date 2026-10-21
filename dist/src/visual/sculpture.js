import { buildEchoLayout, presentProgress, timeTickStep } from "./echoes.js";
import {
  createFilterResponse,
  HARMONIC_BANDS,
  bandAmplitude,
  cutoffResonanceWeight,
} from "../spectral/filter.js";
import {
  TARGETS,
  BASE,
  normalize,
  clamp,
  denormalize,
  envelopeAt,
  duration,
} from "../model.js";

const TAU = Math.PI * 2;
const PRESENT_WINDOW_HALF_WIDTH = 0.055 / 3;
const hash = (i, j = 0) => {
  let n = Math.imul(i + 171, 374761393) ^ Math.imul(j + 439, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};

// Geometry is deterministic: identical sound + mapping always gives the same object.
export function buildGeometry(params, m, sampleRate = 48000) {
  const lowCut = denormalize("cutoffLow", m.spectralLow ?? 0),
    highCut = denormalize("cutoff", m.spectralHigh ?? 1);
  const crinkle = (frequency) =>
    cutoffResonanceWeight(frequency, lowCut, highCut, m.spectralPeak ?? 0);
  const response = createFilterResponse(
    {
      cutoffLow: denormalize("cutoffLow", m.spectralLow ?? 0),
      cutoff: denormalize("cutoff", m.spectralHigh ?? 1),
      // Brightness encodes rejection; resonance is drawn as crinkles, not glow.
      resonance: 0.1,
    },
    sampleRate,
  );
  const spectrumParams = {
    ...params,
    harmonics: Math.max(params.harmonics, m.edge * 0.35),
  };
  const contour = {
    attack: denormalize("attack", m.onset),
    decay: denormalize("decay", m.decayShape),
    sustain: m.plateau,
    hold: denormalize("hold", m.length),
    release: denormalize("release", m.tail),
  };
  const total = duration(contour),
    length = 360 + Math.min(220, total * 38),
    body = m.body * 100 + m.twist * 15 + m.spread * 14,
    grain = m.grain * 52,
    twist = m.twist * 3.6,
    spread = m.spread * 34;
  const points = 121,
    bands =
      body > 0.05 || grain > 0.05 || m.edge > 0.04
        ? HARMONIC_BANDS.slice(1)
        : [],
    lines = [];
  const center = Array.from({ length: points }, (_, i) => {
    const u = i / (points - 1),
      wave =
        1 -
        m.motion * 0.5 +
        m.motion *
          0.5 *
          Math.sin(u * total * denormalize("rate", m.rate) * TAU),
      e = envelopeAt(contour, Math.min(total - 0.00001, u * total)) * wave;
    return {
      x: (u - 0.5) * length,
      y: crinkle(params.pitch) * 13 * Math.sin(u * TAU * 22) ** 7 * e ** 0.6,
      z: 0,
      u,
      e,
    };
  });
  lines.push({
    points: center,
    alpha: 1,
    width: 1,
    kind: "core",
    frequency: params.pitch,
    filterGain: response(params.pitch),
  });
  for (let j = 0; j < bands.length; j++) {
    const band = bands[j],
      position = Math.log(band.center) / Math.log(96),
      energy = bandAmplitude(band, spectrumParams, response),
      resonanceShape = crinkle(params.pitch * band.center);
    for (const sign of [-1, 1]) {
      const line = [];
      for (let i = 0; i < points; i++) {
        const u = i / (points - 1),
          t = u * total,
          e = envelopeAt(contour, Math.min(total - 0.00001, t)),
          a = twist * TAU * u,
          modal = 0.65 + 0.35 * Math.sin(u * Math.PI),
          teeth =
            m.edge *
              8 *
              position *
              Math.sin(u * TAU * (8 + 18 * m.detail) + j * 0.7) ** 7 +
            resonanceShape * 13 * Math.sin(u * TAU * 22 + j * 0.7) ** 7,
          wave =
            1 -
            m.motion * 0.5 +
            m.motion * 0.5 * Math.sin(t * denormalize("rate", m.rate) * TAU),
          radius = (body * position * modal + teeth) * e ** 0.6 * wave,
          jitter = (hash(i, j) - 0.5) * grain * Math.sin(Math.PI * u) ** 0.5;
        line.push({
          x: (u - 0.5) * length,
          y: sign * (Math.cos(a) * radius + spread * e * position) + jitter,
          z:
            sign * Math.sin(a) * radius * 0.8 +
            (hash(i + 31, j) - 0.5) * grain * 0.6,
          u,
          e,
        });
      }
      lines.push({
        points: line,
        alpha: (0.32 + 0.16 * ((j % 4) / 3)) * energy.source ** 0.28,
        width: 0.5 + 0.35 * (m.edge + resonanceShape),
        kind: "filament",
        frequency: params.pitch * band.center,
        partials: band.partials,
        filterGain: energy.gain,
      });
    }
  }
  const particles = [];
  const n = Math.round(m.grain * 650 + m.halo * 650);
  for (let i = 0; i < n; i++) {
    const u = hash(i, 57),
      e = envelopeAt(contour, u * total),
      a = hash(i, 63) * TAU,
      r =
        (body + grain + 15 + m.halo * 46) *
        (0.3 + hash(i, 39)) *
        (0.15 + e * 0.85);
    particles.push({
      x: (u - 0.5) * length + (hash(i, 78) - 0.5) * m.haloTail * 90,
      y: Math.cos(a) * r,
      z: Math.sin(a) * r * 0.8,
      u,
      alpha:
        (0.08 + hash(i, 70) * 0.32) *
        Math.min(
          2.5,
          response(
            params.pitch *
              HARMONIC_BANDS[Math.floor(hash(i, 91) * HARMONIC_BANDS.length)]
                .center,
          ),
        ) **
          0.7,
      size: 0.35 + hash(i, 76) * 0.8,
    });
  }
  return {
    lines,
    particles,
    length,
    total,
    thickness: 0.65 + m.thickness * 4.4,
    brightness: clamp(m.brightness / normalize("volume", BASE.volume), 0, 1.5),
    echoLayout: buildEchoLayout(total, length, {
      mix: denormalize("delayMix", m.echoes),
      delay: denormalize("delayTime", m.echoSpacing),
      feedback: denormalize("feedback", m.persistence),
    }),
    halo: m.halo,
  };
}

export class SculptureRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.yaw = 0;
    this.pitch = 0;
    this.zoom = 1;
    this.pan = { x: 0, y: 0 };
    this.autoFit = true;
    this.targets = {};
    this.routeValues = new Map();
    this.geometry = null;
    this.needsBuild = true;
    this.drag = null;
    this.events = [];
    this.hover = null;
    this.size = { width: 1, height: 1 };
    this.lastFrame = 0;
    this.compare = null;
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
    this.resize();
    canvas.addEventListener("pointerdown", (e) => {
      this.drag = {
        x: e.clientX,
        y: e.clientY,
        yaw: this.yaw,
        pitch: this.pitch,
        pan: { ...this.pan },
        panning: e.shiftKey,
      };
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("dragging");
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!this.drag) return;
      if (this.drag.panning) {
        this.pan.x = this.drag.pan.x + e.clientX - this.drag.x;
        this.pan.y = this.drag.pan.y + e.clientY - this.drag.y;
        return;
      }
      this.yaw = this.drag.yaw + (e.clientX - this.drag.x) * 0.007;
      this.pitch = clamp(
        this.drag.pitch + (e.clientY - this.drag.y) * 0.006,
        -1.1,
        1.1,
      );
    });
    const end = () => {
      this.drag = null;
      canvas.classList.remove("dragging");
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const before = this.zoom;
        this.zoom = clamp(this.zoom * Math.exp(-e.deltaY * 0.001), 0.02, 2.4);
        this.pan.x *= this.zoom / before;
        this.pan.y *= this.zoom / before;
      },
      { passive: false },
    );
    canvas.addEventListener("dblclick", () => this.resetView());
  }
  resetView() {
    this.yaw = 0;
    this.pitch = 0;
    this.zoom = 1;
    this.pan = { x: 0, y: 0 };
    this.autoFit = true;
  }
  frontView() {
    this.resetView();
  }
  fitTimeline() {
    const g = this.geometry;
    if (!g || !this.size.width || !this.size.height) return;
    this.yaw = 0;
    this.pitch = 0;
    const base = Math.min(this.size.width / 680, this.size.height / 180);
    this.zoom = clamp(
      (this.size.width * 0.85) / (g.echoLayout.length * base),
      0.02,
      1,
    );
    this.pan = {
      x: (-(g.echoLayout.length - g.length) * base * this.zoom) / 2,
      y: 0,
    };
    this.autoFit = false;
  }
  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.size = { width: r.width, height: r.height };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.autoFit && this.geometry) this.fitTimeline();
  }
  setSampleRate(rate) {
    if (this.sampleRate !== rate) {
      this.sampleRate = rate;
      this.needsBuild = true;
    }
  }
  setDocument(doc, instant = false) {
    this.document = doc;
    this.needsBuild = true;
    if (instant) {
      this.routeValues.clear();
      this.autoFit = true;
    }
  }
  setCompare(doc) {
    this.compare = doc;
    this.needsBuild = true;
    this.routeValues.clear();
  }
  trigger(event) {
    this.events.push(event);
    if (this.events.length > 12) this.events.shift();
  }
  stop() {
    this.events = [];
  }
  updateMapping(dt) {
    const doc = this.compare || this.document;
    if (!doc) return;
    const vals = Object.fromEntries(TARGETS.map((t) => [t.id, 0]));
    let moving = false;
    const valid = new Set();
    for (const r of doc.routes) {
      valid.add(r.id);
      let n = normalize(r.source, doc.params[r.source]);
      if (r.invert) n = 1 - n;
      const next = n ** r.curve * r.amount,
        prev = this.routeValues.get(r.id) ?? next,
        alpha =
          r.smoothing === 0
            ? 1
            : 1 - Math.exp(-dt / Math.max(0.001, r.smoothing));
      const v =
        Math.abs(next - prev) < 0.0001 ? next : prev + (next - prev) * alpha;
      this.routeValues.set(r.id, v);
      vals[r.target] += v;
      if (Math.abs(next - v) > 0.0001) moving = true;
    }
    for (const id of this.routeValues.keys())
      if (!valid.has(id)) this.routeValues.delete(id);
    for (const target of TARGETS)
      vals[target.id] = doc.routes.some((r) => r.target === target.id)
        ? clamp(vals[target.id])
        : (target.default ?? 0);
    const changed = Object.keys(vals).some(
      (k) => Math.abs((this.targets[k] ?? -1) - vals[k]) > 0.00001,
    );
    if (changed || this.needsBuild) {
      this.targets = vals;
      this.geometry = buildGeometry(doc.params, vals, this.sampleRate ?? 48000);
      this.needsBuild = false;
      if (this.autoFit) this.fitTimeline();
    }
    return moving;
  }
  project(p, offset = { x: 0, y: 0, z: 0 }, scale = 1) {
    const { width: w, height: h } = this.size;
    const x = p.x * scale + offset.x,
      y = p.y * scale + offset.y,
      z = p.z * scale + offset.z;
    const cy = Math.cos(this.yaw),
      sy = Math.sin(this.yaw),
      cp = Math.cos(this.pitch),
      sp = Math.sin(this.pitch);
    const xx = x * cy + z * sy,
      zz = -x * sy + z * cy,
      yy = y * cp - zz * sp,
      depth = y * sp + zz * cp;
    const camera = 1000 / (1000 + depth);
    const fit = Math.min(w / 680, h / 180) * this.zoom;
    return {
      x: w / 2 + this.pan.x + xx * fit * camera,
      y: h / 2 + this.pan.y + yy * fit * camera,
      depth,
    };
  }
  draw(now) {
    const dt = this.lastFrame ? Math.min(0.1, now - this.lastFrame) : 0.016;
    this.lastFrame = now;
    this.updateMapping(dt);
    const c = this.ctx,
      { width: w, height: h } = this.size,
      g = this.geometry;
    if (!g) return;
    c.clearRect(0, 0, w, h);
    this.events = this.events.filter((e) => now - e.start < e.total + 0.25);
    // Echoes are translations in time, with a small transverse separation.
    // Draw every static copy once; the present slice then intersects each copy.
    for (const copy of [...g.echoLayout.copies].reverse())
      this.drawObject(g, copy, now);
    this.drawTimeAxis(g);
  }
  drawTimeAxis(g) {
    if (g.echoLayout.copies.length === 1) return;
    const c = this.ctx,
      { width: w, height: h } = this.size,
      y = h - 72;
    const x = (seconds) =>
      this.project({
        x: -g.length / 2 + seconds * g.echoLayout.unitsPerSecond,
        y: 0,
        z: 0,
      }).x;
    c.lineWidth = 0.6;
    c.strokeStyle = "#343934";
    c.fillStyle = "#737b70";
    c.font = "10px SFMono-Regular,Consolas,monospace";
    c.textAlign = "center";
    c.beginPath();
    c.moveTo(Math.max(14, x(0)), y);
    c.lineTo(Math.min(w - 14, x(g.echoLayout.duration)), y);
    c.stroke();
    const base = Math.min(w / 680, h / 180) * this.zoom;
    const step = timeTickStep(w / (base * g.echoLayout.unitsPerSecond));
    let lastX = -Infinity;
    for (let t = 0; t <= g.echoLayout.duration + step * 0.01; t += step) {
      const xx = x(t);
      if (xx < 18 || xx > w - 18 || xx - lastX < 40) continue;
      lastX = xx;
      c.beginPath();
      c.moveTo(xx, y);
      c.lineTo(xx, y + 4);
      c.stroke();
      c.fillText(`${Number(t.toFixed(3))} s`, xx, y + 17);
    }
  }
  drawObject(g, copy, now) {
    const opacity = copy.gain ** 0.7,
      offset = copy.offset,
      scale = copy.scale;
    const c = this.ctx;
    for (const line of g.lines) {
      const pts = line.points;
      const amplitude = Math.min(3, line.filterGain ?? 1) ** 0.7;

      if (amplitude < 0.002) continue;
      c.strokeStyle = `rgba(238,237,232,${clamp(line.alpha * amplitude * g.brightness * opacity)})`;
      c.lineCap = "round";
      if (line.kind === "core") {
        // One filled ribbon avoids overlapping translucent caps and their visible texture.
        const projected = pts.map((pt) => this.project(pt, offset, scale));
        const upper = [],
          lower = [];
        for (let i = 0; i < pts.length; i++) {
          const before = projected[Math.max(0, i - 1)],
            after = projected[Math.min(pts.length - 1, i + 1)],
            v = projected[i];
          const dx = after.x - before.x,
            dy = after.y - before.y,
            len = Math.max(0.001, Math.hypot(dx, dy));
          const half = (0.12 + g.thickness * Math.max(0.015, pts[i].e)) / 2;
          upper.push({
            x: v.x - (dy / len) * half,
            y: v.y + (dx / len) * half,
          });
          lower.push({
            x: v.x + (dy / len) * half,
            y: v.y - (dx / len) * half,
          });
        }
        c.beginPath();
        c.moveTo(upper[0].x, upper[0].y);
        for (const v of upper) c.lineTo(v.x, v.y);
        for (const v of lower.reverse()) c.lineTo(v.x, v.y);
        c.closePath();
        c.fillStyle = `rgba(255,255,255,${clamp(amplitude * g.brightness * opacity)})`;
        c.fill();
        c.shadowBlur = 0;
      } else {
        c.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const v = this.project(pts[i], offset, scale);
          if (i === 0) c.moveTo(v.x, v.y);
          else c.lineTo(v.x, v.y);
        }
        c.lineWidth = line.width;
        c.stroke();
        c.shadowBlur = 0;
      }
      {
        for (const event of this.events) {
          const u = presentProgress(
            now - event.start,
            copy.time,
            g.total,
            g.echoLayout.duration,
            event.held,
          );
          if (u === null) continue;
          c.beginPath();
          let started = false;
          for (const pt of pts) {
            if (Math.abs(pt.u - u) > PRESENT_WINDOW_HALF_WIDTH) {
              started = false;
              continue;
            }
            const v = this.project(pt, offset, scale);
            if (!started) {
              c.moveTo(v.x, v.y);
              started = true;
            } else c.lineTo(v.x, v.y);
          }
          c.strokeStyle = `rgba(255,255,255,${clamp((line.kind === "core" ? 0.95 : 0.75) * amplitude * g.brightness * opacity)})`;
          c.lineWidth =
            (line.kind === "core" ? g.thickness : line.width) + 1.05;
          c.shadowColor = `rgba(255,255,255,${clamp(0.7 * amplitude * g.brightness * opacity)})`;
          c.shadowBlur = 9;
          c.stroke();
          c.shadowBlur = 0;
        }
      }
    }
    {
      for (const pt of g.particles) {
        const v = this.project(pt, offset, scale);
        c.fillStyle = `rgba(229,229,223,${pt.alpha * opacity * g.brightness})`;
        c.fillRect(v.x, v.y, pt.size, pt.size);
      }
    }
  }
  destroy() {
    this.observer.disconnect();
  }
}
