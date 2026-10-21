import {
  TARGETS,
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
export function buildGeometry(params, m) {
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
  const points = 181,
    strands =
      body > 0.05 || grain > 0.05 || m.edge > 0.04
        ? Math.round(8 + 14 * m.detail)
        : 0,
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
    return { x: (u - 0.5) * length, y: 0, z: 0, u, e };
  });
  lines.push({ points: center, alpha: 0.8, width: 1, kind: "core" });
  for (let j = 0; j < strands; j++) {
    const line = [],
      angle0 = (j / strands) * TAU;
    for (let i = 0; i < points; i++) {
      const u = i / (points - 1),
        t = u * total,
        e = envelopeAt(contour, Math.min(total - 0.00001, t)),
        a = angle0 + twist * TAU * u;
      const modal =
        (0.65 + 0.35 * Math.sin(u * Math.PI)) *
        (0.7 + 0.3 * Math.sin(j * 2.2 + 0.5));
      const teeth =
        m.edge * 13 * Math.sin(u * TAU * (8 + 18 * m.detail) + j * 0.7) ** 7;
      const wave =
        1 -
        m.motion * 0.5 +
        m.motion * 0.5 * Math.sin(t * denormalize("rate", m.rate) * TAU);
      const radius = (body * modal + teeth) * e ** 0.6 * wave;
      const jitter = (hash(i, j) - 0.5) * grain * Math.sin(Math.PI * u) ** 0.5;
      const y = Math.cos(a) * radius + jitter + (j % 2 ? 1 : -1) * spread * e;
      const z =
        Math.sin(a) * radius * 0.8 + (hash(i + 31, j) - 0.5) * grain * 0.6;
      line.push({ x: (u - 0.5) * length, y, z, u, e });
    }
    lines.push({
      points: line,
      alpha: 0.26 + 0.33 * ((j % 4) / 3),
      width: 0.5 + 0.35 * m.edge,
      kind: "filament",
    });
    if (j % 3 === 0 && body > 5) {
      const second = line.map((pt, i) => ({
        ...pt,
        y: pt.y * (1.05 + 0.04 * Math.sin(i * 0.12)),
        z: pt.z * 1.07,
      }));
      lines.push({ points: second, alpha: 0.13, width: 0.5, kind: "filament" });
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
      alpha: 0.08 + hash(i, 70) * 0.32,
      size: 0.35 + hash(i, 76) * 0.8,
    });
  }
  return {
    lines,
    particles,
    length,
    total,
    thickness: 0.65 + m.thickness * 4.4,
    brightness: 0.35 + m.brightness * 0.65,
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
    this.yaw = 0.22;
    this.pitch = -0.16;
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
    this.yaw = 0.22;
    this.pitch = -0.16;
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
    for (const id in vals) vals[id] = clamp(vals[id]);
    const changed = Object.keys(vals).some(
      (k) => Math.abs((this.targets[k] ?? -1) - vals[k]) > 0.00001,
    );
    if (changed || this.needsBuild) {
      this.targets = vals;
      this.geometry = buildGeometry(doc.params, vals);
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
      c.strokeStyle = `rgba(238,237,232,${clamp(line.alpha * g.brightness * opacity * (lit ? 1.8 : 1))})`;
      c.lineCap = "round";
      if (line.kind === "core") {
        let previous = this.project(pts[0], offset, scale);
        for (let i = 1; i < pts.length; i++) {
          const v = this.project(pts[i], offset, scale);
          c.beginPath();
          c.moveTo(previous.x, previous.y);
          c.lineTo(v.x, v.y);
          c.lineWidth =
            0.12 +
            g.thickness *
              (ghost ? 0.65 : 1) *
              Math.max(0.015, (pts[i].e + pts[i - 1].e) / 2);
          c.stroke();
          previous = v;
        }
      } else {
        c.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const v = this.project(pts[i], offset, scale);
          if (i === 0) c.moveTo(v.x, v.y);
          else c.lineTo(v.x, v.y);
        }
        c.lineWidth = line.width;
        c.stroke();
      }
      if (!ghost) {
        for (const event of this.events) {
          const t = now - event.start;
          if (t < 0 || t > event.duration) continue;
          const u = t / event.duration;
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
          c.strokeStyle = `rgba(255,248,231,${line.kind === "core" ? 0.95 : 0.75})`;
          c.lineWidth =
            (line.kind === "core" ? g.thickness : line.width) + 1.05;
          c.shadowColor = "rgba(255,240,212,.7)";
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
