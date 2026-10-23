import { buildNoiseTexture, buildReverbGlow } from "./texture.js";
import { ridgeDecibels, ridgeStrength } from "../spectral/ridges.js";
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
// Keep the most recent immutable noise fields shared by the main and mini views.
const noiseFields = new Map();
// Geometry is deterministic: identical sound + mapping always gives the same object.
export function buildGeometry(params, m, sampleRate = 48000) {
  const lowCut = denormalize("cutoffLow", m.spectralLow ?? 0),
    highCut = denormalize("cutoff", m.spectralHigh ?? 1);
  const crinkle = (frequency) =>
    cutoffResonanceWeight(frequency, lowCut, highCut, m.spectralPeak ?? 0);
  // Spectral levels follow the actual source/filter settings. Connections may
  // sculpt their geometry, but cannot invent oscillator partials or bypass filtering.
  const response = createFilterResponse(params, sampleRate);
  const toneGain = 1 - params.noise;
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
    twist = m.twist * 3.6,
    spread = m.spread * 34;
  const points = 121,
    bands =
      body > 0.05 || m.edge > 0.04
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
    spectralLevel: ridgeStrength(response(params.pitch)) * toneGain ** 2,
    levelDb: ridgeDecibels(response(params.pitch) * toneGain),
  });
  for (let j = 0; j < bands.length; j++) {
    const band = bands[j],
      position = Math.log(band.center) / Math.log(96),
      energy = bandAmplitude(band, params, response),
      spectralAmplitude = energy.source * energy.gain * toneGain,
      spectralLevel = ridgeStrength(energy.source * energy.gain) * toneGain ** 2,
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
          radius = (body * position * modal + teeth) * e ** 0.6 * wave;
        line.push({
          x: (u - 0.5) * length,
          y: sign * (Math.cos(a) * radius + spread * e * position),
          z: sign * Math.sin(a) * radius * 0.8,
          u,
          e,
        });
      }
      lines.push({
        points: line,
        alpha: spectralLevel,
        spectralLevel,
        levelDb: ridgeDecibels(spectralAmplitude),
        width: 0.5 + 0.35 * (m.edge + resonanceShape),
        kind: "filament",
        side:sign,
        frequency: params.pitch * band.center,
        partials: band.partials,
        filterGain: energy.gain,
      });
    }
  }
  const grain=Math.round(m.grain*8)/8;
  const noiseKey=JSON.stringify([params.noise,params.volume,params.cutoffLow,params.cutoff,params.resonance,sampleRate,length,total,contour,grain]);
  let noise=noiseFields.get(noiseKey);
  if(!noise){
    noise=buildNoiseTexture(params,{length,total,contour,response,sampleRate,grain});
    noiseFields.set(noiseKey,noise);if(noiseFields.size>3)noiseFields.delete(noiseFields.keys().next().value);
  }
  const particles = noise.particles;
  const glow = buildReverbGlow(params,{length,total,contour,response,noiseAmplitude:noise.amplitude,sampleRate,spread:m.halo,extent:m.haloTail,lines,particles});
  const echoLayout = buildEchoLayout(total,length,{
    mix:denormalize("delayMix",m.echoes),delay:denormalize("delayTime",m.echoSpacing),
    feedback:denormalize("feedback",m.persistence),separation:Math.max(32,body*.7 + params.noise*24),
  });
  if(glow.length) {
    echoLayout.duration = Math.max(echoLayout.duration,total + params.reverbDecay);
    echoLayout.length = echoLayout.duration * echoLayout.unitsPerSecond;
  }
  let minY = 0,
    maxY = 0;
  for (const line of lines)
    for (const point of line.points) {
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
  for (const point of particles) {
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }
  return {
    lines,
    particles,
    noiseBatches:noise.batches,
    noiseLevelDb:noise.levelDb,
    glow,
    bounds: { minY, maxY },
    length,
    total,
    thickness: 0.65 + m.thickness * 4.4,
    brightness: clamp(m.brightness / normalize("volume", BASE.volume), 0, 1.5),
    echoLayout,
    halo: m.halo,
  };
}

export class SculptureRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.createNoiseCanvas = () => document.createElement("canvas");
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
        // Primary mouse drag always rotates; other pointer/gesture controls stay intact.
        panning: e.shiftKey && !(e.button === 0 && e.pointerType === "mouse"),
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
    const lastY = g.echoLayout.copies.at(-1).offset.y;
    this.zoom = clamp(
      Math.min(
        (this.size.width * 0.85) / (g.echoLayout.length * base),
        (this.size.height * 0.72) /
          ((g.bounds.maxY - g.bounds.minY + lastY + 20) * base),
      ),
      0.02,
      1,
    );
    this.pan = {
      x: (-(g.echoLayout.length - g.length) * base * this.zoom) / 2,
      y: (-(g.bounds.minY + g.bounds.maxY + lastY) * base * this.zoom) / 2,
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
    if(g.particles.length)this.drawNoise(g);
    this.drawTimeAxis(g);
  }
  drawTimeAxis(g) {
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
    c.strokeStyle = "#383838";
    c.fillStyle = "#797979";
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
    if (g.glow?.length && copy.index === 0) this.drawHalo(g,copy,opacity);
    for (const line of g.lines) {
      const pts = line.points;
      const amplitude = line.spectralLevel ?? Math.min(3, line.filterGain ?? 1) ** 0.7;

      // Use the same level for the static ridge AND playhead; an absent partial
      // must not reappear as a bright sweep during playback.
      if (amplitude < 0.002) continue;
      const baseAlpha = line.spectralLevel === undefined ? line.alpha : line.kind === 'core' ? 1 : .85;
      c.strokeStyle = `rgba(237,237,237,${clamp(baseAlpha * amplitude * g.brightness * opacity)})`;
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
  }
  drawNoise(g) {
    const {width,height}=this.size;
    const key=JSON.stringify([width,height,this.yaw,this.pitch,this.zoom,this.pan,g.echoLayout.copies]);
    const render=c=>{
      for(const copy of [...g.echoLayout.copies].reverse()){
        const opacity=copy.gain ** .7;
        for(const batch of g.noiseBatches){
          c.fillStyle=`rgba(${batch.shade},${batch.shade},${batch.shade},${clamp(batch.alpha*opacity)})`;
          for(const pt of batch.particles){const v=this.project(pt,copy.offset,copy.scale);c.fillRect(v.x,v.y,pt.size,pt.size);}
        }
      }
    };
    this.noiseCanvas ||= this.createNoiseCanvas?.();
    if(!this.noiseCanvas){render(this.ctx);return;}
    if(this.noiseParticles!==g.particles || this.noiseCacheKey!==key){
      this.noiseCanvas.width=Math.ceil(width);this.noiseCanvas.height=Math.ceil(height);
      render(this.noiseCanvas.getContext('2d'));
      this.noiseCacheKey=key;this.noiseParticles=g.particles;
    }
    this.ctx.save();this.ctx.globalAlpha=clamp(g.brightness);this.ctx.imageSmoothingEnabled=false;
    this.ctx.drawImage(this.noiseCanvas,0,0,width,height);this.ctx.restore();
  }
  drawHalo(g,copy,opacity) {
    const c=this.ctx;
    c.save();
    for(const halo of g.glow) {
      const center=this.project(halo,copy.offset,copy.scale);
      const vectors=[['x',halo.radiusX],['y',halo.radiusY],['z',halo.radiusZ]].map(([axis,radius])=>{
        const edges=[-1,1].map(sign=>this.project({...halo,[axis]:halo[axis]+sign*radius},copy.offset,copy.scale));
        const edge=edges.reduce((a,b)=>Math.hypot(a.x-center.x,a.y-center.y)>Math.hypot(b.x-center.x,b.y-center.y)?a:b);
        return {x:edge.x-center.x,y:edge.y-center.y};
      });
      const a=vectors.reduce((sum,v)=>sum+v.x*v.x,0),b=vectors.reduce((sum,v)=>sum+v.x*v.y,0),d=vectors.reduce((sum,v)=>sum+v.y*v.y,0);
      const disc=Math.sqrt((a-d)**2+4*b*b),angle=.5*Math.atan2(2*b,a-d);
      const major=Math.max(1,Math.sqrt((a+d+disc)/2)),minor=Math.max(1,Math.sqrt(Math.max(0,(a+d-disc)/2)));
      const alpha=halo.alpha*opacity*g.brightness;
      c.save();c.translate(center.x,center.y);c.rotate(angle);c.scale(major,minor);
      const gradient=c.createRadialGradient(0,0,0,0,0,1);
      gradient.addColorStop(0,`rgba(255,255,255,${alpha})`);
      gradient.addColorStop(.25,`rgba(255,255,255,${alpha*.82})`);
      gradient.addColorStop(.5,`rgba(255,255,255,${alpha*.43})`);
      gradient.addColorStop(.75,`rgba(255,255,255,${alpha*.13})`);
      gradient.addColorStop(1,'rgba(255,255,255,0)');
      c.fillStyle=gradient;c.fillRect(-1,-1,2,2);c.restore();
    }
    c.restore();
  }
  destroy() {
    this.observer.disconnect();
  }
}
