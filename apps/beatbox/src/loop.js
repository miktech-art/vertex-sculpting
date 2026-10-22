// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './scene.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { UNITS_PER_BAR, clamp, V3, LA, barLen, boostSat, pitchColor, familyOf, FX, semisOf, settings, $, PITCH, octaveH, work, planeOf, PLANES } from './core.js';
import { lineMat, L_SHARP, scene, renderFrame, persp, renderer, makeTargets, lineMats, setPlanes, setRoomRing } from './render.js';
import { stacks, rebuildStacks, shapes, layout, idMap, fitThickness, veinAt, startW } from './shape.js';
import { audio, visualEvents, rec } from './audio.js';
import { stepView, ex, viewMode, trans, setViewMode, topv, view, applyView } from './view.js';
import { playing, mrec, sampleMotion, showRecBadge, showTakeBadge, xf, selected, active, tc, modal, mode, selCentroid, pivot,
  updateOverlays, toScreen, pickObject } from './edit.js';
import { fxOpen, fxPreview, refreshLoopInfo } from './ui.js';

/* =========================================================
   STACK TIMING — a stack plays its forms in order (each as long as one cycle: around, or there and back), then loops
   ========================================================= */
function stackTimes() {
  stacks.forEach(ch => {
    let acc = 0;
    ch.forEach(f => { f.stS = acc; f.stL = Math.max(f.loopBars(), 1 / 64); acc += f.stL; });
    ch.T = acc;
  });
}
function stackPhase(b) {
  stacks.forEach(ch => {
    const u = ((b % ch.T) + ch.T) % ch.T;
    let act = ch.length - 1;
    for (let i = 0; i < ch.length; i++) if (u < ch[i].stS + ch[i].stL) { act = i; break; }
    ch.forEach((f, i) => { f.stackActive = i === act; if (i === act) f.localPh = clamp((u - f.stS) / f.stL, 0, 0.99999); });
  });
}
// fire every corner crossed between bar positions b0 -> b1 (audio times t0 -> t0+dt)
function stackAdvance(ch, b0, b1, t0, dt) {
  const T = ch.T; if (!(T > 0) || b1 <= b0) return;
  const at = x => t0 + (x - b0) / (b1 - b0) * dt;
  ch.forEach(f => {
    for (const h of f.hits()) {
      if (f.notes[h.k].mute) continue;                               // a muted note is a rest
      const base = f.stS + ((h.t + f.phaseOff) % 1) * f.stL;           // (rotation = start offset)
      let x = base + (Math.floor((b0 - base) / T) + 1) * T;
      for (let g = 0; x <= b1 && g < 64; x += T, g++) f.hit(h.k, at(x));
    }
  });
}

/* chain veins: from where each loop's dot starts to where the next one's starts, arching (solid); from the last back to the
   first (dashed: then it repeats). The ink trail flows through them at each hand-over. */
const connMat = lineMat({ color: 0x4b3b4b, linewidth: 1.2, transparent: true, opacity: 0.45 });
const retMat = lineMat({ color: 0x4b3b4b, linewidth: 1.2, transparent: true, opacity: 0.35, dashed: true, dashSize: 0.07, gapSize: 0.06 });
const conn = new LineSegments2(new LineSegmentsGeometry(), connMat), connRet = new LineSegments2(new LineSegmentsGeometry(), retMat);
[conn, connRet].forEach(o => { o.layers.set(L_SHARP); o.frustumCulled = false; o.visible = false; scene.add(o); });
let connKey = '';
function updateConnectors() {
  const p = [], r = [];
  const vein = (A, B, out) => { const a = V3(), b = V3(); for (let k = 0; k < 24; k++) { veinAt(A, B, k / 24, a); veinAt(A, B, (k + 1) / 24, b); out.push(a.x, a.y, a.z, b.x, b.y, b.z); } };
  stacks.forEach(ch => {
    if (ch.length < 2) return;
    const S = ch.map(f => startW(f));
    for (let i = 0; i < ch.length - 1; i++) vein(S[i], S[i + 1], p);
    vein(S[ch.length - 1], S[0], r);
  });
  const key = p.concat(r).map(v => v.toFixed(3)).join();
  if (key === connKey) return; connKey = key;
  conn.visible = p.length > 0; connRet.visible = r.length > 0;
  if (p.length) { conn.geometry.dispose(); conn.geometry = new LineSegmentsGeometry(); conn.geometry.setPositions(p); }
  if (r.length) { connRet.geometry.dispose(); connRet.geometry = new LineSegmentsGeometry(); connRet.geometry.setPositions(r); connRet.computeLineDistances(); }
}

/* =========================================================
   LOOP
   ========================================================= */
export let simTime = null, last = performance.now(), infoT = 0, bars = -0.0005, fxPulseT = 0, cloudT = 0;
let thickNow = PITCH.thick;
// setters for the modules that write these (an imported binding is read-only)
export function setSimTime(v) { simTime = v; }
export function setBars(v) { bars = v; }
export function setFxPulseT(v) { fxPulseT = v; }
function clockNow() { return audio.ctx ? audio.ctx.currentTime : performance.now() / 1000; }
let focusAmt = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  stepView(dt);
  if (!fxOpen) cloudT += dt;            // the star's drift clock, frozen only by the shader menu

  // simulation on the audio clock, LA seconds ahead
  const target = clockNow() + LA;
  if (simTime === null) simTime = target;
  let sdt = target - simTime; if (sdt < 0) sdt = 0; if (sdt > 0.6) sdt = 0;
  const t0 = target - sdt; simTime = target;
  const bl = barLen(), b0 = bars;
  if (playing && sdt > 0) bars += sdt / bl;
  const bVis = bars - LA / bl;
  if (mrec) { sampleMotion(); showRecBadge(); }
  showTakeBadge();

  rebuildStacks();
  if (PITCH.thick !== thickNow) { thickNow = PITCH.thick; shapes.forEach(s => { fitThickness(s); s.rebuild(); }); }   // _dbg.pitch.thick
  shapes.forEach(s => s.applyTracks(bVis));
  layout(ex);
  shapes.forEach(s => s.measure());
  // the work plane glides to its octave fast (snappy) and the camera rides along; an outline at every other octave from the
  // lowest form to the plane above the highest, around the layout; 3D only
  const oh = octaveH(), wy0 = work.y;
  work.y += (work.plane * oh - work.y) * (1 - Math.exp(-dt / 0.045)); if (Math.abs(work.plane * oh - work.y) < 1e-3) work.y = work.plane * oh;
  if (work.y !== wy0) { view.target.y += work.y - wy0; applyView(); }
  let topY = 0, botY = 0, R = 4; shapes.forEach(s => s.ringW.forEach(v => { topY = Math.max(topY, v.y); botY = Math.min(botY, v.y); R = Math.max(R, Math.hypot(v.x, v.z) + 2); }));
  setPlanes(oh, clamp(Math.min(work.plane, planeOf(botY)), PLANES.lo, 0), clamp(Math.max(work.plane, Math.ceil(topY / oh), 1), 1, PLANES.hi), work.plane, work.y, R, 0.5 * ex);
  setRoomRing(0.55 * ex);                                              // where reverb starts; 3D only
  stackTimes(); stackPhase(bVis);
  if (playing && sdt > 0) stacks.forEach(ch => stackAdvance(ch, b0, bars, t0, sdt));

  // visual flares at their audible time — hue of the note that just played
  const cn = clockNow();
  for (let i = visualEvents.length - 1; i >= 0; i--) {
    const ev = visualEvents[i];
    if (ev.t <= cn) { ev.s.lightUp(ev.i); ev.s.flare = 1; ev.s.flareTau = Math.max(0.05, ev.dur * 0.5); boostSat(pitchColor(familyOf(ev.s.sound).hex, ev.semis, ev.s.flareCol), FX.satFull); visualEvents.splice(i, 1); }
  }
  // shader menu open: time stands still; the preview decides whether forms show at rest, on a hit, or pulsing
  let dtV = dt;
  if (fxOpen) {
    const hitCol = s => boostSat(pitchColor(familyOf(s.sound).hex, semisOf(s), s.flareCol), FX.satFull);
    const lightAll = s => s.notes.forEach((n, k) => { if (!n.mute) s.lightUp(k); });
    if (fxPreview === 'rest') { dtV = 0; shapes.forEach(s => { s.flare = 0; s.lightClear(); }); }
    else if (fxPreview === 'hit') { dtV = 0; shapes.forEach(s => { if (!s.idle) { s.flare = 1; hitCol(s); lightAll(s); } }); }
    else if ((fxPulseT += dt) >= barLen() / 4) { fxPulseT = 0; shapes.forEach(s => { if (!s.idle) { s.flare = 1; hitCol(s); lightAll(s); } }); }
  }
  connMat.linewidth = FX.connW; retMat.linewidth = FX.connW;
  shapes.forEach(s => { s.update(dtV, selected.has(s), s === active, bVis, ex); if (s.mlObj) s.mlObj.position.copy(s.base); });
  updateConnectors();
  audio.listener();

  if (!tc.dragging && !modal && (mode === 'edit' || selected.size)) {
    const c = selCentroid(); if (c && tc.object) pivot.position.copy(c);
  }
  updateOverlays();
  // edit mode: the edited form in focus, everything else blurred (and grey: Shape.update)
  focusAmt += ((mode === 'edit' && active ? 1 : 0) - focusAmt) * (1 - Math.exp(-dt / 0.08));
  renderFrame(viewMode === 'top' || trans ? 0.74 : 0.8, active && focusAmt > 0.01 ? { obj: active.milk, amt: focusAmt } : null,
    mode === 'object' ? [...selected].map(s => ({ obj: s.mesh, act: s === active })) : []);   // object mode: the orange outline

  if ((infoT += dt) > 0.25) {
    infoT = 0; refreshLoopInfo();
    $('info').textContent = `PLANE ${work.plane > 0 ? '+' : ''}${work.plane} · ${shapes.length} FORMS${stacks.some(ch => ch.length > 1) ? ` · ${stacks.filter(ch => ch.length > 1).length} LINKED` : ''} · ${playing ? 'PLAYING' : 'STOPPED'} · ${settings.bpm} BPM · BAR ${Math.max(0, Math.floor(bars)) + 1}`;
    if (rec.on) { const s = (performance.now() - rec.t0) / 1000; $('recTime').textContent = `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`; }
    else $('recTime').textContent = '';
  }
}
requestAnimationFrame(frame);

// test hooks for npm run dev / build:debug (scripts/check-timing.mjs); release builds drop this
if (import.meta.env.DEV || import.meta.env.MODE === 'debug')
  window._dbg = { audio, shapes, settings, get stacks() { return stacks; }, get bars() { return bars; }, setViewMode, get ex() { return ex; }, get viewMode() { return viewMode; }, rebuildStacks, get selected() { return [...selected]; }, get active() { return active; }, toScreen, pickObject, get topv() { return topv; }, pitch: PITCH };

addEventListener('resize', () => {
  persp.aspect = innerWidth / innerHeight; persp.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight); makeTargets();
  lineMats.forEach(m => m.resolution.set(innerWidth, innerHeight));
});
