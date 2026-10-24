import {createUnisonBandEnvelope} from '../spectral/unison.js';
import {unisonCount} from '../oscillator/unison.js';
import {modulatedParams} from "../audio/modulation.js";
import {voiceEnvelopeAt} from "../audio/live-envelope.js";
import {getLfos,modulationEnvelopes,activeLfos} from "../lfo.js";
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
  resolveMappings,
  routeContribution,
  DEFAULT_ROUTES,
} from "../model.js";

const TAU = Math.PI * 2;
const PRESENT_WINDOW_HALF_WIDTH = 0.055 / 3;
// Keep the most recent immutable noise fields shared by the main and mini views.
const noiseFields = new Map();
const timelineReferences=new Map();
function timeAxisReference(document){
  const routes=document?.routes??DEFAULT_ROUTES;
  // Match this sound's envelope and tuning, reserving only the space needed by
  // a full-harmonic, full-width saw. Do not reserve an unrelated maximum envelope.
  const params={...(document?.params??BASE),harmonics:1,width:1,unison:1,detune:0,waveTable:0,wavePosition:2/3};
  const key=JSON.stringify([params,routes]);
  if(!timelineReferences.has(key)){
    const geometry=buildGeometry(params,resolveMappings(params,routes));
    timelineReferences.set(key,{key,length:geometry.length,points:geometry.lines.flatMap(line=>line.points)});
    if(timelineReferences.size>8)timelineReferences.delete(timelineReferences.keys().next().value);
  }
  return timelineReferences.get(key);
}

// Geometry is deterministic: identical sound + mapping always gives the same object.
export function buildGeometry(params, m, sampleRate = 48000, routes = DEFAULT_ROUTES, voice = null) {
  const lowCut = denormalize("cutoffLow", m.spectralLow ?? 0),
    highCut = denormalize("cutoff", m.spectralHigh ?? 1);
  const crinkle = (frequency) =>
    cutoffResonanceWeight(frequency, lowCut, highCut, m.spectralPeak ?? 0);
  // Spectral levels follow the actual source/filter settings. Connections may
  // sculpt their geometry, but cannot invent oscillator partials or bypass filtering.
  const response = createFilterResponse(params, sampleRate);
  const toneGain = 1 - params.noise;
  const contour = {
    ...(params.envelopeEnabled===false?{envelopeEnabled:false}:{}),
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
  const beating=unisonCount(params)>1&&params.detune>0&&toneGain>0;
  const modulated=activeLfos(params).some(l=>l.target!=='none'&&l.amount!==0)||modulationEnvelopes(params).some(e=>e.amount!==0);
  const maxRate=Math.max(...getLfos(params).map(l=>l.rate),modulationEnvelopes(params).some(e=>e.amount!==0&&e.target.startsWith('lfoRate:'))?100:0);
  const points = modulated||beating?Math.max(121,Math.min(2049,Math.ceil(total*Math.max(maxRate*16,beating?800:0))+1)):121;
  const baseMappings=modulated?resolveMappings(params,routes):null;
  const state={...(voice||{}),lfoPhaseCache:new Map()};
  const offset=voice?.timeOffset||0;
  const samples=modulated?Array.from({length:points},(_,i)=>{
    const t=i/(points-1)*total,at=t+offset,mod=modulatedParams(params,at,state);
    const p={...params,pitch:mod.pitch,wavePosition:mod.wavePosition,cutoff:mod.cutoff,volume:mod.amplitude};
    const mapped=resolveMappings(p,routes);
    for(const id in mapped)mapped[id]=clamp((m[id]??0)+mapped[id]-baseMappings[id]);
    const filter=createFilterResponse(p,sampleRate);
    const amplitude=params.volume?mod.amplitude/params.volume:0;
    return {t,params:p,mapped,response:filter,amplitude,
      e:voice?voiceEnvelopeAt(contour,at,state):envelopeAt(contour,Math.min(total-.00001,t))};
  }):null;
  let cycles=0;
  const phaseCycles=Array.from({length:points},(_,i)=>{
    if(i)cycles+=((samples?.[i-1].params.pitch??params.pitch)+(samples?.[i].params.pitch??params.pitch))/2*total/(points-1);
    return cycles;
  });
  const unisonLevels=beating?HARMONIC_BANDS.map(band=>{
    const model=samples?null:createUnisonBandEnvelope(band,params,response);
    return Array.from({length:points},(_,i)=>(model||createUnisonBandEnvelope(band,samples[i].params,samples[i].response))(phaseCycles[i],total/(points-1)/2));
  }):null;
  const bands =
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
    const sample=samples?.[i];
    const localE=sample?sample.e*sample.amplitude*wave: e;
    const p=sample?.params||params;
    const amplitude=beating?unisonLevels[0][i]:null;
    const strength=beating?ridgeStrength(amplitude)*toneGain**2*(sample?.amplitude??1):sample?ridgeStrength(sample.response(p.pitch))*toneGain**2*sample.amplitude:null;
    return {
      ...(sample||beating?{spectralLevel:strength,thickness:(.65+(sample?.mapped.thickness??m.thickness)*4.4)*(beating?amplitude/Math.max(1e-12,(sample?.response||response)(p.pitch)):1),frequency:p.pitch,levelDb:ridgeDecibels((amplitude??sample.response(p.pitch))*toneGain)}:{}),
      x: (u - 0.5) * length,
      y: (sample?cutoffResonanceWeight(p.pitch,denormalize("cutoffLow",sample.mapped.spectralLow),denormalize("cutoff",sample.mapped.spectralHigh),sample.mapped.spectralPeak):crinkle(p.pitch)) * 13 * Math.sin(u * TAU * 22) ** 7 * localE ** 0.6,
      z: 0,
      u,
      e:localE,
    };
  });
  lines.push({
    points: center,
    dynamic:modulated||beating,
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
          sample=samples?.[i],p=sample?.params||params,
          localResonance=sample?cutoffResonanceWeight(p.pitch*band.center,denormalize('cutoffLow',sample.mapped.spectralLow),denormalize('cutoff',sample.mapped.spectralHigh),sample.mapped.spectralPeak):resonanceShape,
          e = envelopeAt(contour, Math.min(total - 0.00001, t)),
          a = (sample?sample.mapped.twist*3.6:twist) * TAU * u,
          modal = 0.65 + 0.35 * Math.sin(u * Math.PI),
          teeth =
            m.edge *
              8 *
              position *
              Math.sin(u * TAU * (8 + 18 * m.detail) + j * 0.7) ** 7 +
            localResonance * 13 * Math.sin(u * TAU * 22 + j * 0.7) ** 7,
          wave =
            1 -
            m.motion * 0.5 +
            m.motion * 0.5 * Math.sin(t * denormalize("rate", m.rate) * TAU),
          localEnergy=sample?bandAmplitude(band,p,sample.response):energy,
          combinedAmplitude=beating?unisonLevels[j+1][i]:localEnergy.source*localEnergy.gain,
          beatGain=beating?combinedAmplitude/Math.max(1e-12,localEnergy.source*localEnergy.gain):1,
          strength=sample||beating?ridgeStrength(combinedAmplitude)*toneGain**2*(sample?.amplitude??1):spectralLevel,
          localE=sample?sample.e*sample.amplitude:e,
          localBody=sample?sample.mapped.body*100+sample.mapped.twist*15+sample.mapped.spread*14:body,
          radius = (localBody * position * modal + teeth) * localE ** 0.6 * wave * beatGain;
        line.push({
          ...(sample||beating?{spectralLevel:strength,frequency:p.pitch*band.center,levelDb:ridgeDecibels(combinedAmplitude*toneGain)}:{}),
          // Actual cents occupy only a narrow interval on this logarithmic
          // frequency scale; never exaggerate them into a large spatial twist.
          ...(beating?{frequencySpread:(localBody*modal+spread)*localE**.6*Math.LN2*params.detune/2400/Math.log(96)}:{}),
          x: (u - 0.5) * length,
          y: sign * (Math.cos(a) * radius + (sample?sample.mapped.spread*34:spread) * localE * position * beatGain),
          z: sign * Math.sin(a) * radius * 0.8,
          u,
          e:localE,
        });
      }
      lines.push({
        points: line,
        dynamic:modulated||beating,
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
  const noiseKey=JSON.stringify([modulated?samples.map(s=>[s.params.cutoff,s.params.volume,s.e]):null,params.noise,params.volume,params.cutoffLow,params.cutoff,params.resonance,sampleRate,length,total,contour,grain]);
  let noise=noiseFields.get(noiseKey);
  if(!noise){
    noise=buildNoiseTexture(params,{length,total,contour,response,sampleRate,grain,samples});
    noiseFields.set(noiseKey,noise);if(noiseFields.size>3)noiseFields.delete(noiseFields.keys().next().value);
  }
  const particles = noise.particles;
  const glow = buildReverbGlow(params,{length,total,contour,response,noiseAmplitude:noise.amplitude,sampleRate,spread:m.halo,extent:m.haloTail,lines,particles,samples});
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
    modulated:modulated||beating,
    samples,
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
    this.stageLift = canvas.id === "sculpture" ? 32 : 0;
    this.createSceneCanvas = () => document.createElement("canvas");
    this.createHaloCanvas = () => document.createElement("canvas");
    this.ctx = canvas.getContext("2d");
    this.yaw = 0;
    this.pitch = 0;
    this.axialRotation = 0;
    this.zoom = 1;
    this.pan = { x: 0, y: 0 };
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
        axialRotation: this.axialRotation,
        axisLock: null,
        axialDrag: e.pointerType === "mouse" && e.button === 0,
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
      const dx=e.clientX-this.drag.x, dy=e.clientY-this.drag.y;
      if(this.drag.axialDrag){
        if(!this.drag.axisLock){
          if(Math.hypot(dx,dy)<4)return;
          this.drag.axisLock=Math.abs(dx)>=Math.abs(dy)?'horizontal':'vertical';
        }
        if(this.drag.axisLock==='horizontal')this.yaw=this.drag.yaw+dx*.007;
        else this.axialRotation=this.drag.axialRotation+dy*.006;
        return;
      }
      this.yaw = this.drag.yaw + dx * 0.007;
      this.pitch = clamp(
        this.drag.pitch + dy * 0.006,
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
  }
  resetView() {
    this.yaw = 0;
    this.pitch = 0;
    this.axialRotation = 0;
    this.zoom = 1;
    this.pan = { x: 0, y: 0 };
    this.fitTimeline();
  }
  frontView() {
    this.resetView();
  }
  fitTimeline() {
    const g = this.geometry;
    if (!g || !this.size.width || !this.size.height) return;
    this.yaw = 0;
    this.pitch = 0;
    this.axialRotation = 0;
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
  }
  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.size = { width: r.width, height: r.height };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.pixelRatio=dpr;
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
    if (instant) {
      this.routeValues.clear();
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
      const next = routeContribution(doc.params,r),
        prev = r.source==='detune'&&Math.round(doc.params.unison??2)===1
          ? next : this.routeValues.get(r.id) ?? next,
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
      this.geometry = buildGeometry(doc.params, vals, this.sampleRate ?? 48000, doc.routes, this.modulationVoice);
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
    const axial = this.axialRotation ?? 0,
      localY = y * Math.cos(axial) - z * Math.sin(axial),
      localZ = y * Math.sin(axial) + z * Math.cos(axial);
    const xx = x * cy + localZ * sy,
      zz = -x * sy + localZ * cy,
      yy = localY * cp - zz * sp,
      depth = localY * sp + zz * cp;
    const camera = 1000 / (1000 + depth);
    const fit = Math.min(w / 680, h / 180) * this.zoom;
    return {
      x: w / 2 + this.pan.x + xx * fit * camera,
      y: h / 2 - (this.stageLift||0) + this.pan.y + yy * fit * camera,
      depth,
    };
  }
  draw(now) {
    const dt = this.lastFrame ? Math.min(0.1, now - this.lastFrame) : 0.016;
    this.lastFrame = now;
    const doc=this.compare||this.document,last=this.events.at(-1);
    const active=doc&&(activeLfos(doc.params).some(l=>l.target!=='none'&&l.amount!==0)||modulationEnvelopes(doc.params).some(e=>e.amount!==0));
    const state=active&&last&&now>=last.start?last:null;
    const windowDuration=this.geometry?.echoLayout.duration||duration(doc?.params||BASE);
    const timeOffset=state?.held?Math.floor((now-state.start)/windowDuration)*windowDuration:0;
    const stateKey=state?`${state.start}:${state.held}:${state.releaseAt}:${timeOffset}`:'idle';
    if(this.modulationStateKey!==stateKey){
      this.modulationStateKey=stateKey;this.modulationVoice=state?{held:state.held,releaseAt:state.releaseAt,releaseLevel:state.releaseLevel,timeOffset}:null;
      if(active)this.needsBuild=true;
    }
    this.updateMapping(dt);
    const c = this.ctx,
      { width: w, height: h } = this.size,
      g = this.geometry;
    if (!g) return;
    c.clearRect(0, 0, w, h);
    this.events = this.events.filter((e) => now - e.start < e.total + 0.25);
    // Cache time-varying spectral paths, rather than repainting every segment.
    if(g.modulated)this.drawModulatedScene(g,now);
    else for (const copy of [...g.echoLayout.copies].reverse())this.drawObject(g,copy,now);
    if(g.particles.length)this.drawNoise(g);
    this.drawTimeAxis(g);
  }
  drawTimeAxis(g) {
    const c = this.ctx,{width:w,height:h}=this.size;
    const reference=timeAxisReference(this.compare||this.document);
    const viewKey=JSON.stringify([w,h,this.yaw,this.pitch,this.axialRotation,this.zoom,this.pan,this.stageLift,g.length,reference.key]);
    if(this.axisViewKey!==viewKey){
      // Anchor to a fully wide, fully harmonic saw instead of the visible ridges.
      // Harmonic/width/wavetable edits leave the ruler fixed; camera controls still work.
      const scaleX=g.length/reference.length;
      let bottom=h/2-(this.stageLift||0)+this.pan.y;
      for(const pt of reference.points)bottom=Math.max(bottom,this.project({...pt,x:pt.x*scaleX}).y);
      this.axisY=clamp(bottom+8,40,h-78);this.axisViewKey=viewKey;
    }
    const y=this.axisY;
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
    if(g.modulated){for(const line of g.lines)this.drawModulatedLine(g,line,copy,now);return;}
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
  drawModulatedScene(g,now){
    this.sceneCanvas ||= this.createSceneCanvas?.();
    if(!this.sceneCanvas){for(const copy of [...g.echoLayout.copies].reverse())this.drawObject(g,copy,now);return;}
    const {width,height}=this.size;
    const key=JSON.stringify([width,height,this.yaw,this.pitch,this.axialRotation,this.zoom,this.pan,this.stageLift,this.pixelRatio]);
    if(this.sceneGeometry!==g||this.sceneKey!==key){
      const dpr=this.pixelRatio||1;
      this.sceneCanvas.width=Math.ceil(width*dpr);this.sceneCanvas.height=Math.ceil(height*dpr);
      const previous=this.ctx,events=this.events;
      try{
        this.ctx=this.sceneCanvas.getContext('2d');this.ctx.setTransform(dpr,0,0,dpr,0,0);this.events=[];
        for(const copy of [...g.echoLayout.copies].reverse())this.drawObject(g,copy,0);
      }finally{this.ctx=previous;this.events=events;}
      this.sceneGeometry=g;this.sceneKey=key;
    }
    this.ctx.drawImage(this.sceneCanvas,0,0,width,height);
    for(const copy of g.echoLayout.copies)for(const line of g.lines)this.drawModulatedLine(g,line,copy,now,true);
  }
  drawModulatedLine(g,line,copy,now,highlightOnly=false){
    const c=this.ctx,pts=line.points,opacity=copy.gain**.7;
    const draw=(i,highlight=false)=>{
      const a=pts[i-1],b=pts[i],strength=(a.spectralLevel+b.spectralLevel)/2;
      if(strength<.002)return;
      const start=this.project(a,copy.offset,copy.scale),end=this.project(b,copy.offset,copy.scale);
      const core=line.kind==='core',alpha=clamp(strength*g.brightness*opacity*(core?1:.85));
      c.strokeStyle=`rgba(255,255,255,${alpha})`;c.lineCap='butt';
      const spread=a.frequencySpread?Math.abs(this.project({...a,y:a.y+a.frequencySpread},copy.offset,copy.scale).y-start.y):0;
      c.lineWidth=core?.12+((a.thickness+b.thickness)/2)*(a.e+b.e)/2:line.width+spread*2;
      if(highlight)c.lineWidth+=1.05;
      c.beginPath();c.moveTo(start.x,start.y);c.lineTo(end.x,end.y);c.stroke();
    };
    if(!highlightOnly)for(let i=1;i<pts.length;i++)draw(i);
    for(const event of this.events){
      const u=presentProgress(now-event.start,copy.time,g.total,g.echoLayout.duration,event.held);
      if(u===null)continue;
      for(let i=Math.max(1,Math.floor((u-PRESENT_WINDOW_HALF_WIDTH)*(pts.length-1)));i<pts.length&&pts[i].u<=u+PRESENT_WINDOW_HALF_WIDTH;i++)draw(i,true);
    }
  }
  drawNoise(g) {
    const {width,height}=this.size;
    const key=JSON.stringify([width,height,this.yaw,this.pitch,this.axialRotation,this.zoom,this.pan,g.echoLayout.copies]);
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
    // Accumulate faint gradients at higher exposure, then attenuate the whole
    // layer once. Otherwise each audible low-level contribution rounds to zero
    // separately in Canvas's 8-bit alpha channel.
    this.haloCanvas ||= this.createHaloCanvas?.();
    const layer=this.haloCanvas;
    const peak=Math.max(...g.glow.map(pt=>pt.alpha))*opacity*g.brightness;
    const exposure=layer?Math.min(16,.5/Math.max(1e-9,peak*12)):1;
    const c=layer?layer.getContext('2d'):this.ctx;
    if(layer){
      const {width,height}=this.size;
      if(layer.width!==Math.ceil(width)||layer.height!==Math.ceil(height)){
        layer.width=Math.ceil(width);layer.height=Math.ceil(height);
      }
      c.clearRect(0,0,layer.width,layer.height);
    }
    c.save();
    if(layer)c.globalCompositeOperation='lighter';
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
      const alpha=halo.alpha*opacity*g.brightness*exposure;
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
    if(layer){
      this.ctx.save();this.ctx.globalAlpha=1/exposure;
      this.ctx.drawImage(layer,0,0,this.size.width,this.size.height);this.ctx.restore();
    }
  }
  destroy() {
    this.observer.disconnect();
  }
}
