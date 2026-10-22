// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './render.js';
import * as THREE from 'three';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { V3, SOUNDS, clamp, semisOf, familyOf, pitchColor, FX, barLen, boostSat, UNITS_PER_BAR, hpFreq, SNAP, LA, PITCH, ROOM, work, planeOf } from './core.js';
import { L_SOFT, radialTex, scene, lineMat, L_SHARP, L_MILK, L_INK, thickMat, renderer, dropLineMat } from './render.js';
import { fxBlank, rateBlank, makeStar, syncStar, starHit, starClear } from './cloud.js';
import { audio, visualEvents } from './audio.js';
import { handsOn, selected, active, setActive, mode } from './edit.js';
import { bars } from './loop.js';
import { planLengths, fitColumns, pingPong, cornerHits, startOffset, travelDir, noteHits, heightAt } from './lib/pitch.js';

/* =========================================================
   FORMS — milk volume with a star inside (closed) / soft stroke (open curve), reverb halo, path + dot
   ========================================================= */
const WHITE = new THREE.Color('#ffffff');
const PANW = 0.35;      // stereo width of the 3D layout (keeps exploded stems near the centre)
const _eul = new THREE.Euler();

/* the dot is a bead of rust ink: it lights up on every corner it plays, trails one beat of ink behind it (a crisp core on the
   sharp layer, a soft bleed on the ink layer) and leaves a pool of ink at the corner, fading over FX.pool beats */
const INK = { rust: new THREE.Color('#8a3b33'), lit: new THREE.Color('#e8714a'), pool: new THREE.Color('#6b2a2c') };
const TRAIL = 320, MAXN = 64;     // trail samples; at most this many ink pools (one per note)
const inkBlend = { transparent: true, depthTest: false, depthWrite: false, blending: THREE.CustomBlending,
  blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor };
// soft round points with their own alpha, size and colour; uK scales the size (bleed: 1, crisp core: core px / trail px)
const inkMat = () => new THREE.ShaderMaterial({ ...inkBlend,
  uniforms: { uPR: { value: renderer.getPixelRatio() }, uK: { value: 1 } },
  vertexShader: `attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC; uniform float uPR, uK;
    void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = max(1.5, aS * uK) * uPR; vA = aA; vC = aC; }`,
  fragmentShader: `varying float vA; varying vec3 vC;
    void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard; float a = vA * (1.0 - smoothstep(0.35, 1.0, r)); gl_FragColor = vec4(vC * a, a); }` });
const PATH = new THREE.Color('#4b3b4b');
// linked loops hand the ink over through a vein: a curve arching from where one loop's dot starts (and ends) to where the
// next one's starts. HAND = how many beats of trail the vein takes up (only the ink travels it; the dot is never late).
const HAND = 0.125;
export function veinAt(A, B, t, out) {
  const h = 0.3 + 0.12 * A.distanceTo(B), u = 1 - t;
  out.set(u * u * A.x + 2 * u * t * (A.x + B.x) / 2 + t * t * B.x, u * u * A.y + 2 * u * t * ((A.y + B.y) / 2 + h) + t * t * B.y, u * u * A.z + 2 * u * t * (A.z + B.z) / 2 + t * t * B.z);
  return out;
}
// where a loop's dot starts (and, after one cycle, ends), in the world
export const startW = (s, out = V3()) => s.posAt(-s.phaseOff, out).applyMatrix4(s.group.matrixWorld);
// beads: a small filled rust bead where a corner plays, a hollow ink-violet ring at a rest
const beadMat = new THREE.ShaderMaterial({ ...inkBlend,
  uniforms: { uPR: { value: renderer.getPixelRatio() }, uSize: { value: 7 }, uRust: { value: INK.rust }, uPath: { value: PATH } },
  vertexShader: `attribute float aRest; varying float vRest; uniform float uPR, uSize;
    void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = uSize * uPR; vRest = aRest; }`,
  fragmentShader: `varying float vRest; uniform vec3 uRust, uPath;
    void main(){
      float r = length(gl_PointCoord - 0.5) * 2.0, a; vec3 c;
      if (vRest > 0.5) { a = (1.0 - smoothstep(0.86, 1.0, r)) * smoothstep(0.5, 0.64, r); c = uPath; }
      else { a = 1.0 - smoothstep(0.42, 0.58, r); c = uRust; }
      a *= 0.85; gl_FragColor = vec4(c * a, a);
    }` });
const dotMat = () => new THREE.ShaderMaterial({ ...inkBlend,
  uniforms: { uPR: { value: renderer.getPixelRatio() }, uSize: { value: 8 }, uCol: { value: new THREE.Color() } },
  vertexShader: `uniform float uPR, uSize; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = uSize * uPR; }`,
  fragmentShader: `uniform vec3 uCol; void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = 1.0 - smoothstep(0.8, 1.0, r); gl_FragColor = vec4(uCol * a, a); }` });

export const shapes = [];
let uid = 0;
const nameCount = {};
export function nextName(base) {
  nameCount[base] = (nameCount[base] ?? -1) + 1;
  return nameCount[base] === 0 ? base : `${base}.${String(nameCount[base]).padStart(3, '0')}`;
}

export class Shape {
  constructor(d) {
    this.id = d.id ?? ++uid; uid = Math.max(uid, this.id);
    this.name = d.name;
    this.bottom = d.bottom.map(v => V3(...v));
    this.top = d.top.map(v => V3(...v));
    this.n = this.bottom.length;
    this.sound = SOUNDS[d.sound] ? d.sound : 'stem_synth';
    this.mute = !!d.mute;
    this.open = new Set(d.open ?? []);              // open side faces = rests
    this.closed = d.closed ?? true;                 // false: an open curve (a wall); the dot runs there and back
    this.tracks = d.tracks ? { ...d.tracks } : {};  // recorded motion loops
    delete this.tracks.height;                      // (old pitch loops: the dot height no longer exists)
    this.below = d.below ?? null;                   // chain: id of the loop that plays before this one (Ctrl+L)
    this.anchor = d.anchor ? [...d.anchor] : null;  // first loop of a chain: place of the row in the exploded 3D layout
    this.dy = d.dy ?? 0;                            // height of the form's lowest point above the floor (height = pitch)
    this.fx = { ...fxBlank(), ...(d.fx ?? {}) }; this.fxRate = { ...rateBlank(), ...(d.fxRate ?? {}) };
    this.feat = null; this.stack = [this]; this.stackIdx = 0; this.stackActive = true; this.localPh = 0; this.phaseOff = 0;
    this.stS = 0; this.stL = 1; this.base = V3(); this.rootAnchor = [0, 0];
    this.editSel = new Set([...Array(this.n * 2).keys()]);
    this.noteSel = new Set();                      // edit mode: selected notes (indices into notes)
    this.flare = 0; this.flareTau = 0.1; this.flareCol = new THREE.Color(); this.cur = new THREE.Color(); this.focus = 1;
    this.L = new Float32Array(this.n); this.perim = 1;
    this.ringL = Array.from({ length: this.n }, () => V3());
    this.ringW = Array.from({ length: this.n }, () => V3());
    this.ringKey = '';

    const g = this.group = new THREE.Group();
    if (d.quat) g.quaternion.fromArray(d.quat);
    if (d.scale) g.scale.fromArray(d.scale);
    g.userData.shape = this;
    fitThickness(this);

    // the solid is never drawn directly; it is kept for picking, faces and framing
    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    this.mesh.visible = false; this.mesh.userData.shape = this;
    g.add(this.mesh);
    // the milk: the same closed solid, drawn into the thickness pass (closed forms only; an open curve keeps its stroke)
    this.milk = new THREE.Mesh(this.mesh.geometry, thickMat); this.milk.layers.set(L_MILK); this.milk.frustumCulled = false;
    g.add(this.milk);
    this.halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialTex, transparent: true, depthWrite: false, opacity: 0.5 }));
    this.halo.renderOrder = 1; this.halo.layers.set(L_SOFT); g.add(this.halo);
    this.floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ map: radialTex, transparent: true, depthWrite: false, opacity: 0.4 }));
    this.floor.renderOrder = 0; this.floor.layers.set(L_SOFT); scene.add(this.floor);

    // top view: the volume collapses to an airbrushed stroke
    const lg = () => { const l = new LineGeometry(); l.setPositions([0, 0, 0, 1, 0, 0]); return l; };
    this.soft = new Line2(lg(), lineMat({ linewidth: 12, transparent: true, opacity: 0.95, depthWrite: false, depthTest: false }));
    this.soft.renderOrder = 4; this.soft.layers.set(L_SOFT); this.soft.frustumCulled = false; g.add(this.soft);
    // the hard marks: the dot's path (a thin ink-violet vein through the notes), a bead at every note — filled where it plays,
    // hollow where it is muted
    this.path = new LineSegments2(new LineSegmentsGeometry(), lineMat({ color: PATH, linewidth: 1, transparent: true, opacity: 0.2, depthWrite: false }));
    this.path.layers.set(L_SHARP); this.path.frustumCulled = false; g.add(this.path);
    this.beads = new THREE.Points(new THREE.BufferGeometry(), beadMat);
    this.beads.layers.set(L_SHARP); this.beads.renderOrder = 7; this.beads.frustumCulled = false; g.add(this.beads);
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
    this.dot = new THREE.Points(pg, dotMat());
    // the ink: trail behind the dot, a pool at every note, the dot's glow — one buffer, drawn twice (bleed, crisp core)
    const N = TRAIL + MAXN + 1, ig = new THREE.BufferGeometry();
    ig.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    ig.setAttribute('aA', new THREE.BufferAttribute(new Float32Array(N), 1));
    ig.setAttribute('aS', new THREE.BufferAttribute(new Float32Array(N), 1));
    ig.setAttribute('aC', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    this.ink = new THREE.Points(ig, inkMat()); this.ink.layers.set(L_INK); this.ink.frustumCulled = false; g.add(this.ink);
    this.inkCore = new THREE.Points(ig, inkMat()); this.inkCore.layers.set(L_SHARP); this.inkCore.renderOrder = 8; this.inkCore.frustumCulled = false; g.add(this.inkCore);
    this.lit = 0; this.pool = new Float32Array(MAXN);
    this.dot.renderOrder = 9; this.dot.layers.set(L_SHARP); this.dot.frustumCulled = false; g.add(this.dot);

    makeStar(this);
    this.chain = null;
    scene.add(g);
    this.rebuild();
    g.updateMatrixWorld(true); this.measure();
    // the notes: points placed along the path, { f: 0…1 of the path (from above = time), y: local height (= pitch), mute }.
    // Data without notes (older forms) gets one on every corner that used to play.
    this.notes = d.notes ? d.notes.map(n => ({ f: n.f, y: n.y, mute: !!n.mute })) : this.cornerNotes(this.open);
    this.buildMotionLines();
  }
  cornerNotes(open) {
    const c = this.cum(), ks = new Set(cornerHits(c, this.closed).filter(h => !open.has(h.seg)).map(h => h.k));
    return [...ks].sort((a, b) => a - b).map(k => ({ f: c[k], y: this.ringL[k].y, mute: false }));
  }

  vert(i) { return i < this.n ? this.bottom[i] : this.top[i - this.n]; }

  rebuild() {
    const n = this.n, B = this.bottom, T = this.top;
    let A = 0;
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; A += B[i].x * B[j].z - B[j].x * B[i].z; }
    const s = A >= 0 ? 1 : -1;
    const pos = [], triFace = [];
    const e1 = V3(), e2 = V3(), nn = V3();
    const pushTri = (a, b, c, face, want) => {
      e1.subVectors(b, a); e2.subVectors(c, a); nn.crossVectors(e1, e2);
      if (nn.dot(want) < 0) [b, c] = [c, b];
      for (const p of [a, b, c]) pos.push(p.x, p.y, p.z);
      triFace.push(face);
    };
    if (this.closed) {                              // an open curve is a wall: no caps
      const tris = THREE.ShapeUtils.triangulateShape(B.map(v => new THREE.Vector2(v.x, v.z)), []);
      const UP = V3(0, 1, 0), DN = V3(0, -1, 0);
      for (const [a, b, c] of tris) { pushTri(B[a], B[b], B[c], 0, DN); pushTri(T[a], T[b], T[c], 1, UP); }
    }
    for (let i = 0; i < this.segs(); i++) {           // open faces (rests) too: the solid is only for picking, and a rest must stay clickable
      const j = (i + 1) % n;
      const out = V3((B[j].z - B[i].z) * s, 0, -(B[j].x - B[i].x) * s);
      pushTri(B[i], B[j], T[j], 2 + i, out);
      pushTri(B[i], T[j], T[i], 2 + i, out);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeBoundingSphere(); g.computeBoundingBox();
    this.mesh.geometry.dispose(); this.mesh.geometry = g; this.milk.geometry = g;
    this.triFace = triFace;
    this.minB = Math.min(...B.map(v => v.y)); this.maxT = Math.max(...T.map(v => v.y));
  }

  // the dot's ring through the middle of the form (its heights are the notes), segment lengths (= time), sound features
  measure() {
    const n = this.n, m = this.group.matrixWorld, B = this.bottom, T = this.top;
    for (let i = 0; i < n; i++) {
      this.ringL[i].lerpVectors(B[i], T[i], 0.5);
      this.ringW[i].copy(this.ringL[i]).applyMatrix4(m);
    }
    this.perim = planLengths(this.ringW, this.L, this.closed);   // time is measured from above: raising a corner never changes the rhythm
    // turning the form around its vertical axis shifts where its cycle starts (rotation = start offset)
    this.phaseOff = startOffset(_eul.setFromQuaternion(this.group.quaternion, 'YXZ').y, travelDir(B), this.loopBars());

    const ws = this.group.getWorldScale(V3());
    const sxz = (Math.abs(ws.x) + Math.abs(ws.z)) / 2, sy = Math.abs(ws.y);
    const cB = V3(), cT = V3(); B.forEach(v => cB.add(v)); T.forEach(v => cT.add(v)); cB.divideScalar(n); cT.divideScalar(n);
    const H = new Float32Array(n);
    let r = 0, Hs = 0;
    for (let i = 0; i < n; i++) {
      r += Math.hypot(B[i].x - cB.x, B[i].z - cB.z);
      H[i] = (T[i].y - B[i].y) * sy; Hs += H[i];
    }
    r = Math.max(0.02, r / n * sxz);
    const Hm = Hs / n;
    const ra = this.rootAnchor, dist = Math.hypot(ra[0], ra[1]);
    const cw = cB.clone().lerp(cT, 0.5).applyMatrix4(m);
    this.feat = {
      r, dist, Hm,
      centre: V3(ra[0] * PANW, cw.y, ra[1] * PANW),                          // audio position: from the 3D layout, same in both views
      room: clamp((dist - ROOM.start) / ROOM.span, 0, 1),                      // far out in the layout -> room
    };
  }

  segs() { return this.closed ? this.n : this.n - 1; }
  // one cycle in bars: around a closed form, there and back along an open curve
  loopBars() { return (this.closed ? this.perim : 2 * this.perim) / UNITS_PER_BAR; }
  cum() {
    const c = new Float32Array(this.n); let acc = 0;
    for (let k = 0; k < this.n; k++) { c[k] = this.perim > 1e-9 ? acc / this.perim : k / Math.max(1, this.segs()); acc += this.L[k]; }
    return c;
  }
  // every note hit in one cycle: { t: 0…1 of the cycle, k: note } (open curves: out and back); muted notes are skipped by
  // whoever plays them
  hits() { return noteHits(this.notes.map(n => n.f), this.closed); }
  // the point of the outline at place f (0…1 of the path, from above), at the ring's own height
  ringAt(f, out) {
    let d = clamp(f, 0, 1) * this.perim;
    for (let i = 0; i < this.n; i++) {
      const L = this.L[i];
      if (d <= L || i === this.n - 1) return out.lerpVectors(this.ringL[i], this.ringL[(i + 1) % this.n], L > 1e-9 ? clamp(d / L, 0, 1) : 0);
      d -= L;
    }
    return out.copy(this.ringL[0]);
  }
  notePos(k, out) { this.ringAt(this.notes[k].f, out); out.y = this.notes[k].y; return out; }
  // a note's height in the world (= its pitch); without notes, the ring's
  noteWorldY(k) { return this.notes[k] ? this.notePos(k, V3()).applyMatrix4(this.group.matrixWorld).y : this.ringW[0].y; }
  // the dot on the path at cycle phase ph: the path runs through the notes, rising and falling with them
  posAt(ph, out) {
    ph -= Math.floor(ph);
    return this.pathAt(this.closed ? ph : pingPong(ph), out);
  }
  // the path at place f (0…1 of its length from above), at its height there
  pathAt(f, out) {
    if (!this.pathF) this.updateLines();
    const F = this.pathF, P = this.pathP;
    for (let i = 0; i < F.length - 1; i++) {
      if (f <= F[i + 1] || i === F.length - 2) return out.lerpVectors(P[i], P[i + 1], F[i + 1] - F[i] > 1e-9 ? clamp((f - F[i]) / (F[i + 1] - F[i]), 0, 1) : 0);
    }
    return out.copy(P[0]);
  }
  // a note played (at its audible time): it lights up
  lightUp(k) { starHit(this, k); this.lit = 1; if (k < MAXN) this.pool[k] = 1; }
  lightClear() { starClear(this); this.lit = 0; this.pool.fill(0); }
  hit(k, time) {
    const dur = !this.mute && audio.ctx ? audio.note(this, time, k) : 0;
    visualEvents.push({ t: time, s: this, i: k, semis: semisOf(this, k), dur });
  }

  // the path through corners and notes (corners take the height of the slope between their neighbouring notes), its line,
  // the open-curve stroke and the beads; rebuilt when the ring or the notes change
  updateLines() {
    const R = this.ringL, N = this.notes ?? [];
    const key = R.map(v => v.x.toFixed(4) + v.y.toFixed(4) + v.z.toFixed(4)).join() + '|' + N.map(n => `${n.f.toFixed(5)},${n.y.toFixed(4)},${+n.mute}`).join(';') + '|' + this.closed;
    if (key === this.ringKey && this.pathF) return;
    this.ringKey = key;
    const c = this.cum(), byF = N.map(n => ({ f: n.f, y: n.y })).sort((a, b) => a.f - b.f), pts = [];
    R.forEach((v, k) => pts.push({ f: c[k], p: v.clone().setY(byF.length ? heightAt(c[k], byF, this.closed) : v.y) }));
    N.forEach((n, k) => pts.push({ f: n.f, p: this.notePos(k, V3()) }));
    pts.sort((a, b) => a.f - b.f);
    if (this.closed) pts.push({ f: 1, p: pts[0].p.clone() });
    this.pathF = Float32Array.from(pts.map(q => q.f)); this.pathP = pts.map(q => q.p);
    const p = []; this.pathP.forEach(v => p.push(v.x, v.y, v.z));
    this.soft.geometry.dispose(); this.soft.geometry = new LineGeometry(); this.soft.geometry.setPositions(p);
    const seg = [];
    for (let i = 0; i < this.pathP.length - 1; i++) { const a = this.pathP[i], b = this.pathP[i + 1]; seg.push(a.x, a.y, a.z, b.x, b.y, b.z); }
    this.path.geometry.dispose(); this.path.geometry = new LineSegmentsGeometry(); this.path.visible = seg.length > 0;
    if (seg.length) this.path.geometry.setPositions(seg);
    const bg = new THREE.BufferGeometry().setFromPoints(N.map((_, k) => this.notePos(k, V3())));
    bg.setAttribute('aRest', new THREE.Float32BufferAttribute(N.map(n => n.mute ? 1 : 0), 1));
    this.beads.geometry.dispose(); this.beads.geometry = bg;
  }

  // visuals for this frame (timing already resolved by the stack)
  update(dt, isSel, isAct, barsVis, ex) {
    this.updateLines();
    const fam = familyOf(this.sound);
    const vivid = pitchColor(fam.hex, semisOf(this), this._vivid ??= new THREE.Color());
    const pale = (this._pale ??= new THREE.Color()).copy(vivid).lerp(WHITE, 1 - FX.satRest);   // lighter at rest, saturates on every hit
    this.flare *= Math.exp(-dt / Math.max(0.01, this.flareTau));   // the flash lasts as long as the note it shows
    const fl = this.flare;
    this.cur.copy(pale).lerp(this.flareCol, fl);
    // off the work plane a form keeps playing in grey (saturation 0), and in edit mode every form but the edited one;
    // the change is quick but not a cut
    const want = (mode === 'edit' ? this === active : planeOf(this.dy) === work.plane) ? 1 : 0;
    this.focus = dt > 0 ? this.focus + (want - this.focus) * (1 - Math.exp(-dt / 0.06)) : want;
    boostSat(this.cur, this.focus);
    const idle = this.mute ? 0.9 : !this.stackActive ? 0.38 : 0;
    this.idle = idle > 0;

    syncStar(this, dt, idle > 0, barsVis);
    // halo sprite around the volume
    const F = this.feat, ws = this.group.scale;
    const cl = V3(); this.bottom.forEach(v => cl.add(v)); this.top.forEach(v => cl.add(v)); cl.divideScalar(this.n * 2);
    this.halo.position.copy(cl);
    // the halo is the reverb: none inside the reverb circle, growing and brightening the farther out the form stands
    const hs = (F.r * 3.4 + F.Hm * 0.8) * (0.7 + 0.8 * F.room) * FX.haloSize;
    this.halo.scale.set(hs / Math.abs(ws.x || 1), hs / Math.abs(ws.y || 1), 1);
    this.halo.material.color.copy(this.cur); this.halo.material.opacity = Math.min(1, (0.15 + 0.6 * F.room) * (1 - idle * 0.7) * FX.haloStr) * ex;
    this.halo.visible = ex > 0.01 && F.room > 0.005;
    // floor glow: where a stack stands (its forms may float above it, height = pitch)
    const isRoot = this.stackIdx === 0;
    this.floor.visible = isRoot && ex > 0.01 && FX.floor > 0.005;
    if (this.floor.visible) {
      this.floor.position.set(this.group.position.x, 0.004, this.group.position.z);
      const fs = F.r * 3.6 * FX.haloSize; this.floor.scale.set(fs, 1, fs);
      this.floor.material.color.copy(this.cur); this.floor.material.opacity = Math.min(1, 0.42 * FX.haloStr) * FX.floor * ex * (this.stack.some(f => !f.idle) ? 1 : 0.5);
    }
    // the milk volume (closed forms); an open curve has no inside: it is a soft stroke, in the top view and in 3D alike
    this.milk.visible = this.closed;
    this.soft.visible = !this.closed;
    this.soft.material.color.copy(this.cur); this.soft.material.opacity = idle ? 0.22 : 0.95;
    this.soft.material.linewidth = 12 + fl * 6;
    // the path (stronger when selected), the beads and the dot
    this.path.material.opacity = (isSel ? (isAct ? 0.9 : 0.6) : FX.pathA) * (idle ? 0.5 : 1);
    this.path.material.linewidth = FX.pathW * (isSel ? (isAct ? 1.85 : 1.45) : 1);
    beadMat.uniforms.uSize.value = FX.beadSize;
    this.dot.visible = this.stackActive && !this.mute;
    if (this.dot.visible) this.posAt(this.localPh - this.phaseOff, this.dot.position);
    this.updateInk(dt);

    if (this.chain && audio.ctx) {
      const C = this.chain, c = F.centre, now = audio.ctx.currentTime;
      if (C.p.positionX) { C.p.positionX.value = c.x; C.p.positionY.value = c.y; C.p.positionZ.value = c.z; }
      else C.p.setPosition(c.x, c.y, c.z);
      const L = chainLevels(this);
      for (const k of ['dry', 'rev', 'dly']) C[k].gain.setTargetAtTime(L[k], now, 0.08);
      C.hp.frequency.setTargetAtTime(L.hp, now, 0.05);
      audio.fxSync(this);
    }
  }

  // the ink dot: light-up, one-beat trail, pools at the notes it played
  updateInk(dt) {
    this.lit *= Math.exp(-dt / Math.max(0.01, FX.litFade));
    const pt = FX.pool * barLen() / 4; for (let k = 0; k < MAXN; k++) this.pool[k] *= pt > 0.01 ? Math.exp(-dt / pt) : 0;
    const lit = Math.min(1, this.lit * FX.lit), on = this.dot.visible;
    const du = this.dot.material.uniforms; du.uSize.value = FX.dotSize * (1 + 0.45 * lit); du.uCol.value.copy(INK.rust).lerp(INK.lit, lit);
    const g = this.ink.geometry.attributes, p = V3(), col = this._inkCol ??= new THREE.Color();
    const ph = this.localPh - this.phaseOff, span = FX.trail / 4 / Math.max(1e-3, this.loopBars());   // FX.trail beats of the cycle
    // in a chain, the part of the trail older than this loop's turn runs back through the vein into the loop before
    const prev = this.stack.length > 1 ? this.stack[(this.stackIdx - 1 + this.stack.length) % this.stack.length] : null;
    const inv = prev && (this._inv ??= new THREE.Matrix4()).copy(this.group.matrixWorld).invert();
    for (let j = 0; j < TRAIL; j++) {
      const f = j / TRAIL, back = f * span - this.localPh;           // how far before this loop's turn (in its cycles)
      if (prev && back > 0) {
        const beats = back * this.loopBars() * 4;
        if (beats < HAND) veinAt(startW(prev, this._a ??= V3()), startW(this, this._b ??= V3()), 1 - beats / HAND, p);
        else prev.posAt(1 - (beats - HAND) / 4 / Math.max(1e-3, prev.loopBars()) - prev.phaseOff, p).applyMatrix4(prev.group.matrixWorld);
        p.applyMatrix4(inv);
      } else this.posAt(ph - f * span, p);
      g.position.setXYZ(j, p.x, p.y, p.z); g.aA.setX(j, on && FX.trail > 0 ? Math.pow(1 - f, 1.3) : 0); g.aS.setX(j, FX.trailW * (1 - 0.55 * f));
      col.copy(INK.rust).lerp(INK.lit, lit * Math.max(0, 1 - f * 4)); g.aC.setXYZ(j, col.r, col.g, col.b);
    }
    for (let k = 0; k < MAXN; k++) {
      const i = TRAIL + k, has = k < this.notes.length, c = has ? this.notePos(k, p) : p;
      g.position.setXYZ(i, c.x, c.y, c.z); g.aA.setX(i, has ? this.pool[k] * 0.9 : 0); g.aS.setX(i, FX.trailW * 2.4); g.aC.setXYZ(i, INK.pool.r, INK.pool.g, INK.pool.b);
    }
    const gi = TRAIL + MAXN, d = this.dot.position; col.copy(INK.rust).lerp(INK.lit, lit);
    g.position.setXYZ(gi, d.x, d.y, d.z); g.aA.setX(gi, on ? 0.55 + 0.4 * lit : 0); g.aS.setX(gi, FX.dotSize * 2.4 * (1 + 0.8 * lit)); g.aC.setXYZ(gi, col.r, col.g, col.b);
    for (const k in g) g[k].needsUpdate = true;
    this.inkCore.material.uniforms.uK.value = FX.core / Math.max(0.1, FX.trailW);
  }

  // play recorded vertex and note loops (object loops are applied by the layout, relative to the stack position)
  applyTracks(b) {
    const tr = this.tracks.verts;
    if (tr && !handsOn(this, 'verts')) {
      const v = sampleTrack(tr, b);
      tr.idx.forEach((vi, q) => this.vert(vi).set(v(q * 3), v(q * 3 + 1), v(q * 3 + 2)));
      this.rebuild();
    }
    const tn = this.tracks.notes;
    if (tn && !handsOn(this, 'notes')) {
      const v = sampleTrack(tn, b);
      tn.idx.forEach((k, q) => { const n = this.notes[k]; if (!n) return; const f = v(q * 2); n.f = this.closed ? f - Math.floor(f) : clamp(f, 0, 1); n.y = v(q * 2 + 1); });
    }
  }
  buildMotionLines() {
    for (const l of [this.mlVerts, this.mlObj]) if (l) { l.parent?.remove(l); l.geometry.dispose(); l.material.dispose(); }
    this.mlVerts = this.mlObj = null;
    const mat = () => new THREE.LineBasicMaterial({ color: 0x17121c, transparent: true, opacity: 0.35, depthWrite: false });
    const tv = this.tracks.verts;
    if (tv) {
      const pts = [];
      tv.idx.forEach((vi, q) => tv.frames.forEach((fr, j) => {
        const nx = tv.frames[(j + 1) % tv.frames.length];
        pts.push(fr[q * 3], fr[q * 3 + 1], fr[q * 3 + 2], nx[q * 3], nx[q * 3 + 1], nx[q * 3 + 2]);
      }));
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      this.mlVerts = new THREE.LineSegments(g, mat()); this.mlVerts.layers.set(L_SHARP); this.group.add(this.mlVerts);
    }
    const to = this.tracks.obj;
    if (to) {
      const pts = to.frames.map(fr => V3(fr[0], fr[1] + 0.003, fr[2]));
      this.mlObj = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), mat()); this.mlObj.layers.set(L_SHARP); scene.add(this.mlObj);
    }
  }

  serialize() {
    return {
      id: this.id, name: this.name,
      bottom: this.bottom.map(v => v.toArray()), top: this.top.map(v => v.toArray()),
      quat: this.group.quaternion.toArray(), scale: this.group.scale.toArray(),
      sound: this.sound, mute: this.mute, closed: this.closed,
      open: [...this.open], notes: this.notes.map(n => ({ ...n })), tracks: { ...this.tracks }, fx: { ...this.fx }, fxRate: { ...this.fxRate },
      below: this.below, anchor: this.anchor ? [...this.anchor] : null, dy: this.dy,
    };
  }
  applyData(d) {
    d.bottom.forEach((v, i) => this.bottom[i].fromArray(v)); d.top.forEach((v, i) => this.top[i].fromArray(v));
    this.group.quaternion.fromArray(d.quat); this.group.scale.fromArray(d.scale);
    this.sound = d.sound; this.mute = d.mute; this.closed = d.closed ?? true;
    this.open = new Set(d.open ?? []);
    this.notes = (d.notes ?? []).map(n => ({ f: n.f, y: n.y, mute: !!n.mute }));
    this.tracks = d.tracks ? { ...d.tracks } : {};
    this.below = d.below ?? null; this.anchor = d.anchor ? [...d.anchor] : null; this.dy = d.dy ?? 0;
    this.fx = { ...fxBlank(), ...(d.fx ?? {}) }; this.fxRate = { ...rateBlank(), ...(d.fxRate ?? {}) };
    fitThickness(this); this.rebuild(); this.buildMotionLines(); this.ringKey = '';
  }
  dispose() {
    scene.remove(this.group); scene.remove(this.floor);
    if (this.mlObj) { scene.remove(this.mlObj); this.mlObj.geometry.dispose(); this.mlObj.material.dispose(); }
    [this.path, this.soft].forEach(l => dropLineMat(l.material));
    this.group.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material && !(o.material instanceof LineMaterial) && o.material !== thickMat && o.material !== beadMat) o.material.dispose(); });
    this.floor.geometry.dispose(); this.floor.material.dispose();
    if (this.chain) { Object.values(this.chain).forEach(nd => { try { nd.disconnect(); } catch (e) { } }); }
  }
}
// every form is PITCH.thick tall at every corner, so height only ever means pitch. `moved` = vertex indices just edited:
// a moved top pulls its bottom along, otherwise the top follows the bottom. Returns whether anything changed.
export function fitThickness(s, moved) { return fitColumns(s.bottom, s.top, PITCH.thick / Math.max(1e-6, Math.abs(s.group.scale.y)), moved); }
function sampleTrack(tr, b) {
  const N = tr.frames.length, ph = ((b / tr.len) % 1 + 1) % 1 * N;
  const i = Math.floor(ph) % N, j = (i + 1) % N, f = ph - Math.floor(ph);
  const A = tr.frames[i], B = tr.frames[j];
  return k => A[k] + (B[k] - A[k]) * f;
}

/* ---------- prisms sized in bars ---------- */
function regularPrism(n, side, h) {
  const r = side / (2 * Math.sin(Math.PI / n)), B = [], T = [];
  for (let k = 0; k < n; k++) {
    const a = Math.PI / 2 + Math.PI / n + 2 * Math.PI * k / n;
    B.push([Math.cos(a) * r, 0, Math.sin(a) * r]); T.push([Math.cos(a) * r, h, Math.sin(a) * r]);
  }
  return { bottom: B, top: T };
}
// notes at places f (0…1 of the path) at the dot's own height: the middle of a form PITCH.thick tall
export const notesAt = fs => fs.map(f => ({ f, y: PITCH.thick / 2, mute: false }));
export const barPrism = (n, bars, h) => regularPrism(n, bars * UNITS_PER_BAR / n, h);   // perimeter = exactly `bars` bars
export function rectPrism(w, d, h) {
  const B = [[-w / 2, 0, -d / 2], [w / 2, 0, -d / 2], [w / 2, 0, d / 2], [-w / 2, 0, d / 2]];
  return { bottom: B, top: B.map(v => [v[0], h, v[2]]) };
}
const PRISM_NAMES = { 3: 'Triangle', 4: 'Square', 5: 'Pentagon', 6: 'Hexagon', 7: 'Heptagon', 8: 'Octagon', 9: 'Nonagon', 10: 'Decagon', 12: 'Dodecagon', 16: 'Sixteen' };
export const prismName = n => PRISM_NAMES[n] ?? `${n}-Gon`;

// rebuild as a regular n-gon with the SAME perimeter, so the loop keeps its length in bars
export function setCorners(s, n) {
  n = clamp(Math.round(n), 3, 16);
  if (n === s.n || !s.closed) return s;   // corners of a regular polygon: closed forms only
  const B = s.bottom; let P = 0; for (let i = 0; i < s.n; i++) { const j = (i + 1) % s.n; P += Math.hypot(B[j].x - B[i].x, B[j].z - B[i].z); }
  const cB = V3(); B.forEach(v => cB.add(v)); cB.divideScalar(s.n);
  const d = s.serialize();
  Object.assign(d, regularPrism(n, P / n, PITCH.thick), { open: [] });
  if (d.tracks) { d.tracks = { ...d.tracks }; delete d.tracks.verts; }
  d.bottom.forEach(v => { v[0] += cB.x; v[2] += cB.z; }); d.top.forEach(v => { v[0] += cB.x; v[2] += cB.z; });
  const base = s.name.replace(/\.\d{3}$/, '');
  if (Object.values(PRISM_NAMES).includes(base) || /^\d+-Gon$/.test(base) || base === 'Cube') d.name = nextName(prismName(n));
  return replaceShape(s, d);
}
// swap a form for a new one built from `d` (a different corner count needs new buffers), in the same place in the list
export function replaceShape(s, d) {
  const idx = shapes.indexOf(s), wasSel = selected.has(s), wasActive = active === s;
  s.dispose(); selected.delete(s);
  const ns = new Shape(d); if (idx >= 0) shapes.splice(idx, 1, ns); else shapes.push(ns);
  if (wasSel) selected.add(ns); if (wasActive) setActive(ns);
  rebuildStacks();
  return ns;
}

export function chainLevels(s) {
  const F = s.feat;
  return { dry: 1 - 0.4 * F.room, rev: 0.85 * F.room, dly: 0.75 * s.fx.echo, hp: hpFreq(s.fx.lowcut) };
}
export function addShape(d) { const s = new Shape(d); shapes.push(s); rebuildStacks(); return s; }
export function removeShape(s) {
  // close the gap: whatever came after this form now follows what came before it
  const above = aboveMap.get(s.id);
  if (above) { above.below = s.below; if (s.below == null) above.anchor = s.anchor; }
  const i = shapes.indexOf(s); if (i >= 0) shapes.splice(i, 1);
  selected.delete(s); if (active === s) setActive(null); s.dispose();
  rebuildStacks();
}

/* =========================================================
   CHAINS (the code calls them stacks) — loops linked with Ctrl+L play one after another, then repeat. In 3D they sit in a
   row along x in playing order, each at its own height (height = pitch); the connectors show the order.
   ========================================================= */
export let idMap = new Map(), aboveMap = new Map(), stacks = [];
export function rebuildStacks() {
  idMap = new Map(shapes.map(s => [s.id, s])); aboveMap = new Map();
  shapes.forEach(s => { if (s.below != null && !idMap.has(s.below)) s.below = null; });
  shapes.forEach(s => { if (s.below == null) return; if (aboveMap.has(s.below)) { s.below = null; return; } aboveMap.set(s.below, s); });
  shapes.forEach(s => {
    const seen = new Set([s]); let c = s;
    while (c.below != null) { const b = idMap.get(c.below); if (!b || seen.has(b)) { aboveMap.delete(c.below); c.below = null; break; } seen.add(b); c = b; }
  });
  stacks = shapes.filter(s => s.below == null).map(r => {
    const ch = [r]; let c = r;
    for (let g = 0; g < 999; g++) { const a = aboveMap.get(c.id); if (!a) break; ch.push(a); c = a; }
    return ch;
  });
  stacks.forEach(ch => ch.forEach((f, i) => { f.stack = ch; f.stackIdx = i; if (i) f.anchor = null; }));
  stacks.forEach(ch => { if (!ch[0].anchor) ch[0].anchor = freeSpot(ch, 0, 0); });
}
export const rootOf = s => s.stack[0];
export const chainAbove = s => s.stack.slice(s.stackIdx);
/* free spots: forms on the same plane keep at least GAP apart, seen from above (forms on other planes may stand right
   above each other: they are other octaves) */
const GAP = SNAP;
// a form from above, turned and scaled, relative to where it stands: [x0, x1, z0, z1]
function footprint(f) {
  const v = V3(), b = [Infinity, -Infinity, Infinity, -Infinity];
  f.bottom.forEach(p => {
    v.copy(p).multiply(f.group.scale).applyQuaternion(f.group.quaternion);
    b[0] = Math.min(b[0], v.x); b[1] = Math.max(b[1], v.x); b[2] = Math.min(b[2], v.z); b[3] = Math.max(b[3], v.z);
  });
  return b;
}
// every loop of a chain whose first loop stands on (ax, az): its plane and box from above
function chainBoxes(ch, ax, az) {
  const xs = rowX(ch);
  return ch.map((f, i) => { const b = footprint(f); return { p: planeOf(f.dy), b: [b[0] + ax + xs[i], b[1] + ax + xs[i], b[2] + az, b[3] + az] }; });
}
const meets = (a, b, ox = 0, oz = 0) => a.p === b.p && a.b[0] + ox < b.b[1] + GAP && b.b[0] < a.b[1] + ox + GAP && a.b[2] + oz < b.b[3] + GAP && b.b[2] < a.b[3] + oz + GAP;
let near = null;                                     // offsets on the 1/16 grid, nearest first
function nearFirst() {
  if (!near) { near = []; for (let i = -64; i <= 64; i++) for (let j = -64; j <= 64; j++) near.push([i * SNAP, j * SNAP]); near.sort((a, b) => Math.hypot(...a) - Math.hypot(...b)); }
  return near;
}
// the free spot nearest (x, z) for a chain's first loop, on the 1/16 grid
export function freeSpot(ch, x, z) {
  const others = []; stacks.forEach(o => { if (o[0].anchor && !o.includes(ch[0])) others.push(...chainBoxes(o, ...o[0].anchor)); });
  x = Math.round(x / SNAP) * SNAP; z = Math.round(z / SNAP) * SNAP;
  const mine = chainBoxes(ch, x, z);
  for (const [dx, dz] of nearFirst()) if (mine.every(m => others.every(o => !meets(m, o, dx, dz)))) return [x + dx, z + dz];
  return [x, z];
}
// where a form stands in 3D, unexploded: its chain's anchor plus its place in the row
export const standsAt = s => { const a = s.stack[0].anchor ?? [0, 0]; return [a[0] + rowX(s.stack)[s.stackIdx], a[1]]; };
// a chain that grew pushes the forms it now runs into aside, each to the nearest free spot (that is their new place in the room)
export function clearRow(ch) {
  const mine = chainBoxes(ch, ...ch[0].anchor);
  stacks.forEach(o => {
    if (o.includes(ch[0]) || !o[0].anchor) return;
    if (chainBoxes(o, ...o[0].anchor).some(t => mine.some(m => meets(t, m)))) o[0].anchor = freeSpot(o, ...o[0].anchor);
  });
}
// place every form: a chain's first loop on its anchor, the next ones in a row along +x (a ROW_GAP apart), all scaled by
// the explode factor (the top view keeps every form on the common centre); each form at its own height
const ROW_GAP = 0.5;
// each loop's x in its chain's row, from the first loop's anchor
function rowX(ch) {
  let x = 0, prevRight = 0;
  return ch.map((f, i) => {
    const bb = f.mesh.geometry.boundingBox, sx = Math.abs(f.group.scale.x);
    if (i && bb) x = prevRight + ROW_GAP - bb.min.x * sx;
    if (bb) prevRight = x + bb.max.x * sx;
    return x;
  });
}
export function layout(ex) {
  stacks.forEach(ch => {
    const root = ch[0], ax = root.anchor[0], az = root.anchor[1], xs = rowX(ch);
    ch.forEach((f, i) => {
      const sy = f.group.scale.y, x = xs[i];
      f.rootAnchor = root.anchor;
      f.base.set((ax + x) * ex, f.dy - f.minB * sy, az * ex);
      if (!handsOn(f, 'obj')) {
        f.group.position.copy(f.base);
        const tr = f.tracks.obj;
        if (tr) {
          const v = sampleTrack(tr, bars - LA / barLen());
          f.group.position.add(V3(v(0), v(1), v(2)));
          f.group.quaternion.set(v(3), v(4), v(5), v(6)).normalize();
          f.group.scale.set(v(7), v(8), v(9));
        }
      }
      f.group.updateMatrixWorld(true);
    });
  });
}
