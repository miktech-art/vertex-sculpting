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
    echoes: m.echoes,
    echoSpacing: 25 + m.echoSpacing * 90,
    persistence: m.persistence,
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
      };
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("dragging");
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!this.drag) return;
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
        this.zoom = clamp(this.zoom * Math.exp(-e.deltaY * 0.001), 0.45, 2.4);
      },
      { passive: false },
    );
    canvas.addEventListener("dblclick", () => this.resetView());
  }
  resetView() {
    this.yaw = 0;
    this.pitch = 0;
    this.zoom = 1;
  }
  frontView() {
    this.yaw = 0;
    this.pitch = 0;
    this.zoom = 1;
  }
  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.size = { width: r.width, height: r.height };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
    if (instant) this.routeValues.clear();
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
      x: w / 2 + xx * fit * camera,
      y: h / 2 + yy * fit * camera,
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
    const p = (this.compare || this.document).params;
    // The paused object is always fully present. Playback only lights its existing geometry.
    const echoCount =
      g.echoes > 0.001 ? Math.min(6, 2 + Math.round(g.persistence * 5)) : 0;
    for (let i = echoCount; i >= 1; i--) {
      const alpha = g.echoes * 0.38 * (0.22 + g.persistence * 0.7) ** (i - 1);
      this.drawObject(
        g,
        alpha,
        { x: i * g.echoSpacing * 0.25, y: i * 7, z: i * g.echoSpacing },
        1 - i * 0.025,
        now,
        p,
        true,
      );
    }
    this.drawObject(g, 1, { x: 0, y: 0, z: 0 }, 1, now, p, false);
    for (const event of this.events) {
      const t = now - event.start;
      if (t < 0) continue;
      const ep = event.params;
      const repetitions =
        ep.delayMix > 0 ? Math.min(6, 1 + Math.ceil(ep.feedback * 7)) : 0;
      for (let i = 1; i <= repetitions; i++) {
        const age = t - ep.delayTime * i;
        if (age < 0 || age > event.duration + 0.25) continue;
        const energy =
          ep.delayMix *
          ep.feedback ** (i - 1) *
          Math.max(0, 1 - age / (event.duration + 0.25));
        if (energy > 0.004)
          this.drawObject(
            g,
            energy * 1.6,
            { x: i * g.echoSpacing * 0.25, y: i * 7, z: i * g.echoSpacing },
            1 - i * 0.025,
            now,
            p,
            true,
            true,
          );
      }
    }
  }
  drawObject(g, opacity, offset, scale, now, p, ghost = false, lit = false) {
    const c = this.ctx;
    for (const line of g.lines) {
      const pts = line.points;
      const amplitude = Math.min(3, line.filterGain ?? 1) ** 0.7;

      if (amplitude < 0.002) continue;
      c.strokeStyle = `rgba(238,237,232,${clamp(line.alpha * amplitude * g.brightness * opacity * (lit ? 1.8 : 1))})`;
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
          const half =
            (0.12 +
              g.thickness * (ghost ? 0.65 : 1) * Math.max(0.015, pts[i].e)) /
            2;
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
        c.fillStyle = `rgba(255,255,255,${clamp(amplitude * g.brightness * opacity * (lit ? 1.8 : 1))})`;
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
      if (!ghost) {
        for (const event of this.events) {
          const t = now - event.start;
          if (t < 0 || t > event.duration) continue;
          const u = event.held
            ? (t % duration(event.params)) / duration(event.params)
            : t / event.duration;
          c.beginPath();
          let started = false;
          for (const pt of pts) {
            if (Math.abs(pt.u - u) > 0.055) {
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
    if (!ghost) {
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
