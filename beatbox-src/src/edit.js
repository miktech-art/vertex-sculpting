// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './view.js';
import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { settings, SNAP, V3, $, UNITS_PER_BAR, clamp, barLen, PITCH, octaveH, noteFor, noteName, work, PLANES, planeOf } from './core.js';
import { scene, camera, canvas, overlay } from './render.js';
import { stacks, aboveMap, rootOf, rebuildStacks, shapes, Shape, addShape, nextName, removeShape, barPrism, rectPrism,
  prismName, freeSpot, clearRow, standsAt, fitThickness, replaceShape, notesAt } from './shape.js';
import { viewMode, trans, ex, view } from './view.js';
import { mouseCtrl, fxOpen, fmtBars, refreshPanel, setHint } from './ui.js';
import { snapFrac } from './lib/pitch.js';
import { simTime, bars, setSimTime, setBars } from './loop.js';

/* =========================================================
   SELECTION / MODES / GUMBALL
   ========================================================= */
export const selected = new Set();
export let active = null;
export let mode = 'object';        // 'object' | 'edit'
export let selMode = 'p';          // 'p' points (notes) | 'v' vertices | 'e' edges
let gumMode = 'translate';  // 'translate' | 'rotate' | 'scale' | null
export let playing = true;
export let started = false;
// setters for the modules that write these (an imported binding is read-only)
export function setActive(s) { active = s; }
export function setStarted(v) { started = v; }

export const pivot = new THREE.Object3D(); scene.add(pivot);
export const tc = new TransformControls(camera, canvas);
tc.setSpace('world'); tc.setSize(0.85);
overlay.add(tc.getHelper());
const snapOn = () => settings.snap !== mouseCtrl;     // Ctrl inverts the snap
export const snapv = v => Math.round(v / SNAP) * SNAP;

export function selCentroid() {
  const c = V3(); let k = 0;
  if (mode === 'object') { selected.forEach(s => { c.add(s.mesh.geometry.boundingSphere.center.clone().applyMatrix4(s.group.matrixWorld)); k++; }); }
  else if (active && selMode === 'p') { active.noteSel.forEach(i => { if (!active.notes[i]) return; c.add(active.notePos(i, V3()).applyMatrix4(active.group.matrixWorld)); k++; }); }
  else if (active) { active.editSel.forEach(i => { c.add(active.vert(i).clone().applyMatrix4(active.group.matrixWorld)); k++; }); }
  return k ? c.divideScalar(k) : null;
}
export function updateGumball() {
  if (tc.dragging) return;
  const topMove = viewMode === 'top' && mode === 'object' && gumMode === 'translate';
  const notesMode = mode === 'edit' && selMode === 'p';           // notes never use the gumball
  const c = (gumMode && !modal && !poly && !place && !trans && !topMove && !fxOpen && !notesMode) ? selCentroid() : null;
  if (!c) { if (tc.object) tc.detach(); return; }
  pivot.position.copy(c); pivot.rotation.set(0, 0, 0); pivot.scale.set(1, 1, 1); pivot.updateMatrixWorld(true);
  if (tc.object !== pivot) tc.attach(pivot);
  tc.setMode(gumMode);
  tc.setTranslationSnap(settings.snap ? SNAP : null);
  tc.setRotationSnap(settings.snap ? Math.PI / 12 : null);
  tc.showY = !(viewMode === 'top' && gumMode === 'translate');
}
// Alt+wheel: the octave you work on (the camera rides along, forms on other planes go grey)
export function setPlane(k) {
  k = clamp(Math.round(k), PLANES.lo, PLANES.hi); if (k === work.plane) return;
  work.plane = k;
  const a = Math.abs(k);
  flashMsg(k ? `PLANE ${k > 0 ? '+' : '−'}${a} · ${a} OCTAVE${a > 1 ? 'S' : ''} ${k > 0 ? 'UP' : 'DOWN'}` : 'PLANE 0 · THE FLOOR', 900);
}
// ↑ / ↓: the selected forms an octave up or down (plane to plane); the work plane goes with them, so you keep working on them
export function octaveSel(dir) {
  if (mode !== 'object' || !selected.size || xf || modal) return;
  const oh = octaveH(), list = [...selected];
  if (list.some(s => { const p = planeOf(s.dy + dir * oh); return p < PLANES.lo || p > PLANES.hi; })) { flashMsg(dir > 0 ? 'THE HIGHEST PLANE' : 'THE LOWEST PLANE', 900); return; }
  list.forEach(s => { s.dy = cleanDy(s.dy + dir * oh); s.group.position.y += dir * oh; s.group.updateMatrixWorld(true); });   // moved now, so the panel reads the new notes
  const lead = active && selected.has(active) ? active : list[0];
  setPlane(planeOf(lead.dy));
  pushUndo(); refreshPanel();
  flashMsg(`${list.length > 1 ? list.length + ' FORMS' : lead.name} · AN OCTAVE ${dir > 0 ? 'UP' : 'DOWN'} · PLANE ${work.plane > 0 ? '+' : ''}${work.plane}`, 1100);
}
export function flashMsg(t, ms = 1600) {
  const h = $('modalHdr'); h.textContent = t; h.style.display = 'block';
  clearTimeout(flashMsg.tm); flashMsg.tm = setTimeout(() => { if (!modal && !mrec) h.style.display = 'none'; }, ms);
}

/* transform sessions shared by gumball and G/R/S */
export let xf = null;
function beginXform() {
  scene.updateMatrixWorld(true);
  if (mode === 'object') {
    const set = new Set(); [...selected].forEach(s => s.stack.forEach(f => set.add(f)));   // a linked chain moves as one row
    xf = { kind: 'object', items: [...set].map(s => ({ s, m: s.group.matrix.clone() })) };
  } else if (active && selMode === 'p') {
    const s = active, items = [...s.noteSel].filter(k => s.notes[k]).map(k => ({ k, f: s.notes[k].f, y: s.notes[k].y }));
    xf = items.length ? { kind: 'notes', s, items } : null;
  } else if (active) {
    const mw = active.group.matrixWorld.clone(), inv = mw.clone().invert();
    const items = [...active.editSel].map(i => ({ i, w: active.vert(i).clone().applyMatrix4(mw) }));
    const pairs = [];
    if (settings.mirror) {
      const n = active.n, eps = 1e-3 * Math.max(0.2, active.mesh.geometry.boundingSphere.radius);
      active.editSel.forEach(i => {
        const v = active.vert(i), ring = i < n ? 0 : n;
        for (let j = ring; j < ring + n; j++) {
          if (j === i || active.editSel.has(j)) continue;
          const u = active.vert(j);
          if (Math.abs(u.x + v.x) < eps && Math.abs(u.z - v.z) < eps && Math.abs(u.y - v.y) < eps) { pairs.push([i, j]); break; }
        }
      });
    }
    xf = { kind: 'edit', s: active, inv, items, pairs, orig: [...Array(active.n * 2).keys()].map(i => active.vert(i).clone()) };
  }
  if (xf) xf.per0 = active ? active.perim : 0;
}
// notes: slide every selected note by df along the path (wrapping round a closed one) and raise it by dy (local units)
function applyNotes(df, dy) {
  const s = xf.s;
  xf.items.forEach(({ k, f, y }) => {
    let nf = f + df; nf = s.closed ? nf - Math.floor(nf) : clamp(nf, 0, 1);
    if (snapOn() && df) nf = snapFrac(nf, s.perim, SNAP, s.closed);
    s.notes[k].f = nf; s.notes[k].y = y + dy;
  });
  s.ringKey = ''; s.star.key = '';
}
function applyDelta(M) {
  if (!xf) return;
  if (xf.kind === 'notes') { if (M.elements.every((v, i) => v === (i % 5 ? 0 : 1))) applyNotes(0, 0); return; }   // identity = put back
  if (xf.kind === 'object') {
    xf.items.forEach(({ s, m }) => {
      const r = new THREE.Matrix4().multiplyMatrices(M, m); r.decompose(s.group.position, s.group.quaternion, s.group.scale); s.group.updateMatrixWorld(true);
      if (fitThickness(s)) s.rebuild();     // scaling in Y stretches the melody, never the thickness
    });
  } else {
    const s = xf.s;
    xf.orig.forEach((v, i) => s.vert(i).copy(v));
    xf.items.forEach(({ i, w }) => s.vert(i).copy(w).applyMatrix4(M).applyMatrix4(xf.inv));
    xf.pairs.forEach(([i, j]) => { const p = s.vert(i); s.vert(j).set(-p.x, p.y, p.z); });
    fitThickness(s, new Set([...xf.items.map(it => it.i), ...xf.pairs.map(pr => pr[1])]));   // a corner moves as a whole column
    s.rebuild();
  }
}
const cleanDy = v => Math.abs(v) < 0.02 ? 0 : v;
// diagonal edges have irrational lengths: after a snapped edit, scale the form a hair so the loop lands on the 1/16 grid
function fitPerimeter(s, quiet) {
  s.group.updateMatrixWorld(true); s.measure();
  const per = s.perim, tgt = Math.max(SNAP, Math.round(per / SNAP) * SNAP);
  if (per < 1e-4 || Math.abs(tgt - per) < 1e-4) return false;
  const f = tgt / per, c = V3(); s.bottom.forEach(v => c.add(v)); c.divideScalar(s.n);
  [...s.bottom, ...s.top].forEach(v => { v.x = c.x + (v.x - c.x) * f; v.z = c.z + (v.z - c.z) * f; });
  s.rebuild(); s.group.updateMatrixWorld(true); s.measure();
  if (!quiet) flashMsg(`FITTED TO ${fmtBars(s.loopBars())} · HOLD CTRL FOR A FREE LENGTH`);
  return true;
}
// after a drag in 3D: every moved form keeps the height it was dropped at (height = pitch); a chain's first loop takes the
// new place of the row (linking is Ctrl+L, never dropping)
function resolveDrops(X) {
  X.items.forEach(({ s }) => {
    s.dy = cleanDy(s.group.position.y + s.minB * s.group.scale.y);
    if (s.stackIdx === 0) s.anchor = [s.group.position.x, s.group.position.z];
  });
  rebuildStacks();
}
function endXform(commit) {
  if (!xf) return;
  if (!commit) applyDelta(new THREE.Matrix4());
  else {
    if (xf.kind === 'object' && ex > 0.99) resolveDrops(xf);
    if (xf.kind === 'object') xf.items.forEach(({ s }) => { if (s.fresh) s.anchor = freeSpot(s.stack, ...s.anchor); });
    if (xf.kind === 'edit' && snapOn()) {           // a reshaped outline: notes keep their share of the path, back on the 1/16 grid
      fitPerimeter(xf.s); const s = xf.s; s.updateLines(); s.notes.forEach(n => { n.f = snapFrac(n.f, s.perim, SNAP, s.closed); }); s.ringKey = ''; s.star.key = '';
    }
    shiftLoops(xf);
  }
  motionJustSet = false;
  if (!commit && xf.kind === 'object' && xf.items.some(({ s }) => s.fresh)) {     // a copy never stays on top of its original
    xf.items.forEach(({ s }) => { if (s.fresh) s.anchor = freeSpot(s.stack, ...s.anchor); }); lastState = snapshot();
  }
  if (xf.kind === 'object') xf.items.forEach(({ s }) => { delete s.fresh; });
  xf = null;
  if (commit) pushUndo();
  scene.updateMatrixWorld(true);
  updateGumball(); refreshPanel();
}
let pivotStartInv = new THREE.Matrix4(), pivotY0 = 0;
tc.addEventListener('mouseDown', () => { beginXform(); pivot.updateMatrixWorld(true); pivotStartInv.copy(pivot.matrixWorld).invert(); pivotY0 = pivot.position.y; });
tc.addEventListener('objectChange', () => {
  if (!xf) return;
  // whole forms move up and down by octaves (plane to plane); corners snap to scale steps
  if (tc.mode === 'translate' && snapOn()) { const sy = xf.kind === 'object' ? octaveH() : PITCH.step; pivot.position.y = pivotY0 + Math.round((pivot.position.y - pivotY0) / sy) * sy; }
  pivot.updateMatrixWorld(true);
  applyDelta(new THREE.Matrix4().multiplyMatrices(pivot.matrixWorld, pivotStartInv));
});
tc.addEventListener('mouseUp', () => { finishMotionRec(true); endXform(true); });

export function setMode(m) {
  if (m === 'edit' && !active) return;
  cancelTool();
  mode = m;
  $('modeBtn').textContent = m === 'edit' ? 'EDIT MODE' : 'OBJECT MODE';
  $('modeBtn').classList.toggle('on', m === 'edit');
  $('selModes').style.display = m === 'edit' ? 'flex' : 'none';
  $('mirrorBtn').style.display = m === 'edit' ? '' : 'none';
  if (m === 'edit') { selected.clear(); selected.add(active); setSelMode('p'); }
  updateGumball(); refreshPanel(); setHint();
}
export function setSelMode(sm) {
  selMode = sm;
  document.querySelectorAll('#selModes button').forEach(b => b.classList.toggle('on', b.dataset.sm === sm));
  updateGumball(); setHint();
}

/* ---------- notes in edit mode: click the path to add, click a note to select, drag / G to slide, Z = up/down ---------- */
export function pickNote(x, y) {
  const s = active; if (!s) return -1;
  let best = -1, bd = 12;
  s.notes.forEach((n, k) => { const q = toScreen(s.notePos(k, V3()).applyMatrix4(s.group.matrixWorld)); const d = Math.hypot(q.x - x, q.y - y); if (q.z < 1 && d < bd) { bd = d; best = k; } });
  return best;
}
// a click in points mode: on a note = select it (⇧ adds / removes), on the path = a new note there (at the path's height)
export function clickNotes(x, y, shift) {
  const s = active; if (!s) return;
  const k = pickNote(x, y);
  if (k >= 0) { if (!shift) s.noteSel.clear(); if (shift && s.noteSel.has(k)) s.noteSel.delete(k); else s.noteSel.add(k); }
  else {
    const h = outlineHit(s, x, y);
    if (!h) { if (!shift) s.noteSel.clear(); }
    else { s.notes.push({ f: h.f, y: s.pathAt(h.f, V3()).y, mute: false }); if (!shift) s.noteSel.clear(); s.noteSel.add(s.notes.length - 1); s.ringKey = ''; s.star.key = ''; pushUndo(); }
  }
  refreshPanel();
}
// press on a note and drag: it slides along the path (Z while dragging: up / down instead)
export function startNoteDrag(x, y, shift) {
  const s = active, k = pickNote(x, y); if (!s || k < 0) return false;
  if (shift) s.noteSel.add(k); else if (!s.noteSel.has(k)) { s.noteSel.clear(); s.noteSel.add(k); }
  startModal('G'); if (modal) modal.drag = true;
  return !!modal;
}
export function muteNotes() {
  const s = active; if (!s || !s.noteSel.size) return;
  const on = [...s.noteSel].some(k => s.notes[k] && !s.notes[k].mute);
  s.noteSel.forEach(k => { if (s.notes[k]) s.notes[k].mute = on; });
  s.ringKey = ''; s.star.key = ''; pushUndo(); refreshPanel();
}
export function deleteNotes() {
  const s = active; if (!s || !s.noteSel.size) return;
  s.notes = s.notes.filter((n, k) => !s.noteSel.has(k)); s.noteSel.clear();
  delete s.tracks.notes; s.buildMotionLines();      // its indices no longer fit
  s.ringKey = ''; s.star.key = ''; pushUndo(); refreshPanel();
}
export function setGum(m) {
  gumMode = m === 'none' ? null : m;
  document.querySelectorAll('#tools [data-gum]').forEach(b => b.classList.toggle('on', b.dataset.gum === (gumMode ?? 'none')));
  updateGumball();
}
export function select(s, extend) {
  if (!extend) selected.clear();
  if (s) {
    if (extend && selected.has(s) && active === s) { selected.delete(s); active = [...selected].pop() ?? null; }
    else { selected.add(s); active = s; }
  } else if (!extend) active = null;
  updateGumball(); refreshPanel();
}

/* ---------- edit topology helpers ---------- */
export function edgesOf(s) {
  const n = s.n, m = s.segs(), e = [];          // an open curve has no closing edges
  for (let i = 0; i < n; i++) e.push([i, n + i]);
  for (let i = 0; i < m; i++) e.push([i, (i + 1) % n]);
  for (let i = 0; i < m; i++) e.push([n + i, n + (i + 1) % n]);
  return e;
}
export function facesOf(s) {
  const n = s.n, f = [[...Array(n).keys()], [...Array(n).keys()].map(i => i + n)];
  for (let i = 0; i < n; i++) f.push([i, (i + 1) % n, n + (i + 1) % n, n + i]);
  return f;
}

/* =========================================================
   UNDO
   ========================================================= */
const undoStack = [], redoStack = [];
export let lastState = null;
export function setLastState(v) { lastState = v; }
export const snapshot = () => shapes.map(s => s.serialize());
export function pushUndo() { if (lastState) undoStack.push(lastState); if (undoStack.length > 120) undoStack.shift(); lastState = snapshot(); redoStack.length = 0; }
function restore(state) {
  const byId = new Map(shapes.map(s => [s.id, s]));
  const keep = new Set();
  state.forEach(d => { const s = byId.get(d.id); if (s && s.n === d.bottom.length) { s.applyData(d); keep.add(s); } else { if (s) { const i = shapes.indexOf(s); shapes.splice(i, 1); s.dispose(); } const ns = new Shape(d); shapes.push(ns); keep.add(ns); } });
  [...shapes].forEach(s => { if (!keep.has(s)) { const i = shapes.indexOf(s); shapes.splice(i, 1); selected.delete(s); s.dispose(); } });
  // keep the saved order so stacks rebuild identically
  const order = new Map(state.map((d, i) => [d.id, i])); shapes.sort((a, b) => order.get(a.id) - order.get(b.id));
  rebuildStacks();
  if (active && !shapes.includes(active)) active = null;
  [...selected].forEach(s => { if (!shapes.includes(s)) selected.delete(s); });
  if (mode === 'edit' && !active) setMode('object');
  scene.updateMatrixWorld(true); updateGumball(); refreshPanel();
}
// when an undo moves the active form to another octave, the work plane follows it (as it did on the way there)
function follow(fn) { const a = active, p = a && planeOf(a.dy); fn(); if (a && shapes.includes(a) && planeOf(a.dy) !== p) setPlane(planeOf(a.dy)); }
export function undo() { if (!undoStack.length) return; follow(() => { redoStack.push(lastState); lastState = undoStack.pop(); restore(lastState); }); }
export function redo() { if (!redoStack.length) return; follow(() => { undoStack.push(lastState); lastState = redoStack.pop(); restore(lastState); }); }

/* =========================================================
   PICKING
   ========================================================= */
const raycaster = new THREE.Raycaster(); raycaster.layers.enableAll();
const ndc = (x, y) => new THREE.Vector2((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1);
export function toScreen(v) { const p = v.clone().project(camera); return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight, z: p.z }; }
function distSeg(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, l = dx * dx + dy * dy;
  const t = l ? clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / l, 0, 1) : 0;
  return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
}
export let lastPick = null;
export function setLastPick(v) { lastPick = v; }
export function pickObject(x, y) {
  // forms only: notes are picked in edit mode
  if (viewMode === 'top' || trans) {
    // concentric forms: nearest curve, else the innermost ring under the cursor; repeated clicks cycle overlaps
    const p = { x, y }, cand = [];
    shapes.forEach(s => {
      const sc = s.ringW.map(v => toScreen(v));
      let d = Infinity, area = 0, inside = false;
      for (let i = 0, j = sc.length - 1; i < sc.length; j = i++) {
        if (s.closed || i) d = Math.min(d, distSeg(p, sc[j], sc[i]));      // (an open curve has no closing segment)
        area += sc[j].x * sc[i].y - sc[i].x * sc[j].y;
        if ((sc[i].y > y) !== (sc[j].y > y) && x < (sc[j].x - sc[i].x) * (y - sc[i].y) / (sc[j].y - sc[i].y) + sc[i].x) inside = !inside;
      }
      if (d < 9) cand.push({ s, k: d + (s.idle ? 6 : 0) });
      else if (inside && s.closed) cand.push({ s, k: 20 + Math.abs(area) / 2000 + (s.idle ? 6 : 0) });
    });
    if (!cand.length) return null;
    cand.sort((a, b) => a.k - b.k);
    let pick = cand[0].s;
    if (lastPick && Math.hypot(lastPick.x - x, lastPick.y - y) < 5) {
      const i = cand.findIndex(c => c.s === lastPick.s); if (i >= 0) pick = cand[(i + 1) % cand.length].s;
    }
    lastPick = { x, y, s: pick };
    return { shape: pick, point: false };
  }
  raycaster.setFromCamera(ndc(x, y), camera);
  const hm = raycaster.intersectObjects(shapes.map(s => s.mesh), false);
  if (hm.length) return { shape: hm[0].object.userData.shape, point: false };
  return null;
}
// where the cursor meets the work plane (new forms and polygons go there)
export function groundHit(x, y) {
  raycaster.setFromCamera(ndc(x, y), camera);
  return raycaster.ray.intersectPlane(new THREE.Plane(V3(0, 1, 0), -work.plane * octaveH()), V3());
}
export function pickEdit(x, y) {
  const s = active; if (!s) return null;
  const mw = s.group.matrixWorld, n = s.n;
  const scr = [...Array(n * 2).keys()].map(i => toScreen(s.vert(i).clone().applyMatrix4(mw)));
  const p = { x, y };
  if (selMode === 'v') {
    let best = null, bd = 14;
    scr.forEach((q, i) => { if (q.z > 1) return; const d = Math.hypot(q.x - x, q.y - y); if (d < bd) { bd = d; best = i; } });
    if (best !== null && viewMode === 'top') { const tb = best % n; return [tb, tb + n]; }   // from above, a corner is its whole vertical edge
    return best === null ? null : [best];
  }
  if (selMode === 'e') {
    let best = null, bd = 10;
    edgesOf(s).forEach(([a, b]) => { const d = distSeg(p, scr[a], scr[b]); if (d < bd) { bd = d; best = [a, b]; } });
    if (best && viewMode === 'top' && best[0] < n && best[1] < n) best = [best[0], best[1], best[0] + n, best[1] + n];
    return best;
  }
  return null;
}

/* =========================================================
   OVERLAYS (edit mode, polygon tool, 3D cursor)
   ========================================================= */
const MAXV = 512;
const ovVerts = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ size: 7, sizeAttenuation: false, vertexColors: true, depthTest: false, transparent: true }));
ovVerts.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAXV * 3), 3));
ovVerts.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAXV * 3), 3));
const ovEdges = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, transparent: true }));
ovEdges.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAXV * 6), 3));
ovEdges.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAXV * 6), 3));
const ovFaces = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: 0x6c52b8, transparent: true, opacity: 0.2, depthTest: false, side: THREE.DoubleSide }));
[ovVerts, ovEdges, ovFaces].forEach(o => { o.frustumCulled = false; o.renderOrder = 10; overlay.add(o); });

const polyLine = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0x17121c, depthTest: false }));
polyLine.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(130 * 3), 3));
const polyPts = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ size: 7, sizeAttenuation: false, color: 0x17121c, depthTest: false }));
polyPts.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(130 * 3), 3));
[polyLine, polyPts].forEach(o => { o.frustumCulled = false; o.visible = false; overlay.add(o); });

export function updateOverlays() {
  const show = mode === 'edit' && active;
  ovVerts.visible = ovEdges.visible = !!show; ovFaces.visible = false;
  if (!show) return;
  const s = active, n = s.n, mw = s.group.matrixWorld;
  const W = [...Array(n * 2).keys()].map(i => s.vert(i).clone().applyMatrix4(mw));
  const sel = s.editSel;
  const SEL = [0.42, 0.32, 0.72], UNS = [0.36, 0.35, 0.4], EUN = [0.55, 0.54, 0.6];
  const vp = ovVerts.geometry.attributes.position.array, vc = ovVerts.geometry.attributes.color.array;
  let vn = 0;
  if (selMode === 'p') {                             // the notes: violet when selected
    s.notes.forEach((nt, k) => { if (vn >= MAXV) return; const w = s.notePos(k, V3()).applyMatrix4(mw); vp.set([w.x, w.y, w.z], vn * 3); vc.set(s.noteSel.has(k) ? SEL : UNS, vn * 3); vn++; });
  } else W.forEach((w, i) => { vp.set([w.x, w.y, w.z], vn * 3); vc.set(sel.has(i) ? SEL : (selMode === 'v' ? UNS : EUN), vn * 3); vn++; });
  ovVerts.geometry.setDrawRange(0, vn); ovVerts.geometry.attributes.position.needsUpdate = ovVerts.geometry.attributes.color.needsUpdate = true;
  ovVerts.material.size = selMode === 'p' ? 9 : 7;
  const ep = ovEdges.geometry.attributes.position.array, ec = ovEdges.geometry.attributes.color.array;
  let en = 0;
  edgesOf(s).forEach(([a, b]) => {
    const col = selMode !== 'p' && sel.has(a) && sel.has(b) ? SEL : EUN;
    ep.set([W[a].x, W[a].y, W[a].z, W[b].x, W[b].y, W[b].z], en * 6); ec.set([...col, ...col], en * 6); en++;
  });
  ovEdges.geometry.setDrawRange(0, en * 2); ovEdges.geometry.attributes.position.needsUpdate = ovEdges.geometry.attributes.color.needsUpdate = true;
}

/* =========================================================
   POLYGON TOOL — Rhino-style: the curve stays open until you click its first point again. It plays from the first segment
   on, on the global bar clock: an open curve runs there and back (ping-pong), a closed one loops. Points snap to the
   1/16 grid, so every edge is a whole number of sixteenths. The segment following the mouse stays silent.
   ========================================================= */
export let poly = null;
let lastSound = 'stem_synth';                      // a new curve plays the instrument picked last
export function setLastSound(k) { lastSound = k; }
export function startPoly() {
  if (mode === 'edit') setMode('object');
  cancelTool(); poly = { pts: [], shape: null, origin: null };
  polyLine.visible = polyPts.visible = true; $('polyBtn').classList.add('on'); canvas.style.cursor = 'crosshair';
  updateGumball(); setHint(); updatePolyPreview();
}
export function snapPt(p) { if (p && snapOn()) { p.x = snapv(p.x); p.z = snapv(p.z); } return p; }
function polyPerim(pts, closed) { let L = 0; for (let i = 1; i < pts.length; i++) L += pts[i].distanceTo(pts[i - 1]); if (closed && pts.length > 2) L += pts[0].distanceTo(pts.at(-1)); return L; }
const nearFirst = (x, y) => poly.pts.length >= 3 && (q => Math.hypot(q.x - x, q.y - y) < 12)(toScreen(poly.pts[0]));
// the form so far, rebuilt from the points: local to the first point in 3D (it stays where you draw it), to the common
// centre in the top view (where the top view draws every form)
function polySync(closed) {
  if (poly.pts.length < 2) { if (poly.shape) { removeShape(poly.shape); poly.shape = null; } return; }
  const o = poly.origin, B = poly.pts.map(p => [p.x - o.x, 0, p.z - o.z]), old = poly.shape;
  const d = { id: old?.id, name: old?.name ?? nextName('Polygon'), sound: old?.sound ?? lastSound, closed,
    bottom: B, top: B.map(v => [v[0], PITCH.thick, v[2]]), anchor: old ? old.anchor : viewMode === '3d' ? [o.x, o.z] : null, dy: old ? old.dy : work.plane * octaveH() };
  poly.shape = old ? replaceShape(old, d) : addShape(d);
}
export function updatePolyPreview() {
  if (!poly) return;
  const pts = [...poly.pts], closing = nearFirst(mouse.x, mouse.y), g = snapPt(groundHit(mouse.x, mouse.y));
  if (closing) pts.push(poly.pts[0]); else if (g) pts.push(g);
  const lp = polyLine.geometry.attributes.position.array, pp = polyPts.geometry.attributes.position.array;
  const y = work.plane * octaveH() + PITCH.thick / 2;   // at the dot's height on the work plane: the guide runs on the curve's own path
  pts.forEach((p, i) => { lp.set([p.x, y, p.z], i * 3); pp.set([p.x, y, p.z], i * 3); });
  polyLine.geometry.setDrawRange(0, pts.length);
  polyPts.geometry.setDrawRange(0, poly.pts.length);
  polyLine.geometry.attributes.position.needsUpdate = polyPts.geometry.attributes.position.needsUpdate = true;
  const now = poly.pts.length > 1 ? ` · PLAYING ${fmtBars(2 * polyPerim(poly.pts, false) / UNITS_PER_BAR)} THERE AND BACK` : '';
  if (closing) flashMsg(`POLYGON · CLICK TO CLOSE · THEN IT LOOPS ${fmtBars(polyPerim(pts, false) / UNITS_PER_BAR)}`, 60000);
  else if (poly.pts.length) flashMsg(`POLYGON${now} · CLICK THE FIRST POINT TO CLOSE · ENTER / RMB DONE`, 60000);
}
export function addPolyPoint(x, y) {
  if (!poly) return;
  if (nearFirst(x, y)) { finishPoly(true); return; }
  const g = snapPt(groundHit(x, y)); if (!g) return;
  const last = poly.pts.at(-1); if (last && last.distanceTo(g) < 1e-6) return;
  if (!poly.origin) poly.origin = viewMode === '3d' ? g.clone() : V3();
  if (poly.pts.length < 64) { poly.pts.push(g); polySync(false); }
  updatePolyPreview();
}
export function undoPolyPoint() { if (!poly) return; poly.pts.pop(); polySync(false); updatePolyPreview(); }
// done: closed after a click on the first point, else as an open curve (Enter / RMB). Too few points: nothing to keep
export function finishPoly(close) {
  if (!poly) return;
  if (poly.pts.length < (close ? 3 : 2)) { cancelTool(); return; }
  polySync(close);
  const s = poly.shape; poly.shape = null;          // it stays: cancelTool only removes an unfinished curve
  if (snapOn()) fitPerimeter(s, true);
  select(s, false); confirmPoly();
  startPlace(s);                                     // then its notes
}
export function cancelTool() {
  if (!poly) return;
  if (poly.shape) removeShape(poly.shape);
  poly = null; polyLine.visible = polyPts.visible = false; $('polyBtn').classList.remove('on'); canvas.style.cursor = '';
  $('modalHdr').style.display = 'none';
  updateGumball(); refreshPanel(); setHint();
}
export function confirmPoly() {
  poly = null; polyLine.visible = polyPts.visible = false; $('polyBtn').classList.remove('on'); canvas.style.cursor = '';
  $('modalHdr').style.display = 'none';
  pushUndo(); updateGumball(); refreshPanel(); setHint();
}

/* =========================================================
   PLACING NOTES — a new form plays nothing until you place its notes: every click on its outline puts one there, snapped
   to 1/16 along the path, at the path's height at that spot (a click on a note takes it away again). Enter / right click =
   done, ⌫ = take the last one back, Esc = drop the new form.
   ========================================================= */
export let place = null;
const placeMark = new THREE.Points(new THREE.BufferGeometry().setFromPoints([V3()]),
  new THREE.PointsMaterial({ size: 9, sizeAttenuation: false, color: 0x6c52b8, transparent: true, opacity: 0.85, depthTest: false }));
placeMark.frustumCulled = false; placeMark.visible = false; placeMark.renderOrder = 11; overlay.add(placeMark);
// the place on a form's path nearest the mouse (on screen): { f snapped to 1/16, w: world point }, or null if too far away
export function outlineHit(s, x, y, maxPx = 22) {
  if (!s.pathF) s.updateLines();
  const mw = s.group.matrixWorld, P = s.pathP.map(v => toScreen(v.clone().applyMatrix4(mw))), F = s.pathF;
  let best = null, bd = maxPx;
  for (let i = 0; i < P.length - 1; i++) {
    const a = P[i], b = P[i + 1], dx = b.x - a.x, dy = b.y - a.y, l = dx * dx + dy * dy;
    const t = l ? clamp(((x - a.x) * dx + (y - a.y) * dy) / l, 0, 1) : 0, d = Math.hypot(x - a.x - t * dx, y - a.y - t * dy);
    if (d < bd) { bd = d; best = F[i] + (F[i + 1] - F[i]) * t; }
  }
  if (best === null) return null;
  const f = snapOn() ? snapFrac(best, s.perim, SNAP, s.closed) : best;
  return { f, w: s.pathAt(f, V3()).applyMatrix4(mw) };
}
export function startPlace(s) {
  if (mode === 'edit') setMode('object');
  cancelTool(); place = { s, added: [] }; select(s, false);
  canvas.style.cursor = 'crosshair'; placeHdr(); updateGumball(); setHint();
}
const placeHdr = () => flashMsg(`${place.s.name} · ${fmtBars(place.s.loopBars())} · CLICK THE OUTLINE TO PLACE A NOTE · ${place.s.notes.length} PLACED · ENTER DONE`, 600000);
export function updatePlacePreview() {
  const h = place && outlineHit(place.s, mouse.x, mouse.y);
  placeMark.visible = !!h; if (h) placeMark.position.copy(h.w);
}
export function placeClick(x, y) {
  if (!place) return;
  const s = place.s, h = outlineHit(s, x, y); if (!h) return;
  const near = s.notes.findIndex(n => Math.abs(n.f - h.f) < 1e-4 || (s.closed && Math.abs(Math.abs(n.f - h.f) - 1) < 1e-4));
  if (near >= 0) { s.notes.splice(near, 1); place.added = place.added.filter(n => s.notes.includes(n)); }
  else {
    const n = { f: h.f, y: s.pathAt(h.f, V3()).y, mute: false };   // at the height the path has there now
    s.notes.push(n); place.added.push(n); s.lightUp(s.notes.length - 1);
  }
  s.ringKey = ''; s.star.key = ''; placeHdr(); refreshPanel(); updatePlacePreview();
}
export function undoPlace() {
  if (!place) return;
  const n = place.added.pop(); if (!n) return;
  const s = place.s; s.notes.splice(s.notes.indexOf(n), 1); s.ringKey = ''; s.star.key = ''; placeHdr(); refreshPanel();
}
export function finishPlace() {
  if (!place) return;
  const s = place.s; place = null; placeMark.visible = false; canvas.style.cursor = ''; $('modalHdr').style.display = 'none';
  pushUndo(); updateGumball(); refreshPanel(); setHint();
  flashMsg(`${s.name} · ${s.notes.length} NOTE${s.notes.length === 1 ? '' : 'S'} · ${fmtBars(s.loopBars())}`);
}
export function cancelPlace() {
  if (!place) return;
  const s = place.s; place = null; placeMark.visible = false; canvas.style.cursor = ''; $('modalHdr').style.display = 'none';
  removeShape(s); active = null; selected.clear(); updateGumball(); refreshPanel(); setHint();
}

/* =========================================================
   MODAL G / R / S
   ========================================================= */
export let modal = null;
export const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
export function startModal(type) {
  if (poly || place || trans) return;
  if (mode === 'object' && !selected.size) return;
  if (mode === 'edit' && (!active || !(selMode === 'p' ? active.noteSel.size : active.editSel.size))) return;
  if (mode === 'edit' && selMode === 'p' && type !== 'G') return;   // notes only move (slide, or Z: up / down)
  if (type === 'G' && mode === 'object' && viewMode === 'top') { flashMsg('TOP VIEW KEEPS EVERY FORM ON THE COMMON CENTRE · MOVE FORMS IN 3D'); return; }
  beginXform();
  const p = selCentroid(); if (!p) { xf = null; return; }
  const ps = toScreen(p);
  modal = { type, axis: null, exclude: false, p, ps, m0: { x: mouse.x, y: mouse.y } };
  tc.detach(); updateModal(); showModalHdr();
}
const AX = { x: V3(1, 0, 0), y: V3(0, 1, 0), z: V3(0, 0, 1) };
export function updateModal() {
  if (!modal) return;
  const { p, ps, m0 } = modal, M = new THREE.Matrix4();
  const camDir = camera.getWorldDirection(V3());
  if (xf && xf.kind === 'notes') {
    const s = xf.s;
    if (modal.axis === 'z') {                         // up / down: the note (pitch), by scale steps
      const nrm = V3().crossVectors(V3(0, 1, 0), V3().crossVectors(camDir, V3(0, 1, 0))); if (nrm.lengthSq() < 1e-8) nrm.copy(camDir);
      const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(nrm.normalize(), p);
      raycaster.setFromCamera(ndc(m0.x, m0.y), camera); const a = raycaster.ray.intersectPlane(plane, V3());
      raycaster.setFromCamera(ndc(mouse.x, mouse.y), camera); const b = raycaster.ray.intersectPlane(plane, V3());
      let dy = (a && b ? b.y - a.y : 0) / Math.max(1e-6, Math.abs(s.group.scale.y));
      if (snapOn()) dy = Math.round(dy / PITCH.step) * PITCH.step;
      applyNotes(0, dy); modal.val = { dy };
    } else {                                          // slide along the path, by 1/16
      modal.f0 ??= outlineHit(s, m0.x, m0.y, 1e9)?.f ?? 0;
      const h = outlineHit(s, mouse.x, mouse.y, 1e9);
      let df = h ? h.f - modal.f0 : 0; if (s.closed) df -= Math.round(df);
      applyNotes(df, 0); modal.val = { df };
    }
    showModalHdr(); return;
  }
  const axis = modal.axis ? AX[modal.axis] : null;
  if (modal.type === 'G') {
    let nrm;
    if (!axis) nrm = camDir.clone();
    else if (modal.exclude) nrm = axis.clone();
    else { nrm = V3().crossVectors(axis, V3().crossVectors(camDir, axis)); if (nrm.lengthSq() < 1e-8) nrm = camDir.clone(); }
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(nrm.normalize(), p);
    raycaster.setFromCamera(ndc(m0.x, m0.y), camera); const a = raycaster.ray.intersectPlane(plane, V3());
    raycaster.setFromCamera(ndc(mouse.x, mouse.y), camera); const b = raycaster.ray.intersectPlane(plane, V3());
    const d = (a && b) ? b.sub(a) : V3();
    if (axis && !modal.exclude) { const k = d.dot(axis); d.copy(axis).multiplyScalar(k); }
    if (axis && modal.exclude) d.addScaledVector(axis, -d.dot(axis));
    // up and down: whole forms jump plane to plane (octaves), corners and faces by scale steps
    if (snapOn()) { const sy = xf.kind === 'object' ? octaveH() : PITCH.step; d.x = snapv(d.x); d.z = snapv(d.z); d.y = Math.round(d.y / sy) * sy; }
    M.makeTranslation(d.x, d.y, d.z); modal.val = d;
  } else if (modal.type === 'R') {
    let ang = Math.atan2(mouse.y - ps.y, mouse.x - ps.x) - Math.atan2(m0.y - ps.y, m0.x - ps.x);
    let ax = camDir.clone();
    if (axis) { ax = axis.clone(); if (axis.dot(camDir) < 0) ang = -ang; }
    // turning a form around its vertical axis moves its start (rotation = start offset): snap to the 1/16 grid of its cycle
    const turn = mode === 'object' && active && ((modal.axis === 'y' && !modal.exclude) || (!axis && viewMode === 'top'));
    const st = turn ? 2 * Math.PI / Math.max(1, Math.round(active.loopBars() * 16)) : Math.PI / 12;
    if (snapOn()) ang = Math.round(ang / st) * st;
    M.makeTranslation(p.x, p.y, p.z).multiply(new THREE.Matrix4().makeRotationAxis(ax.normalize(), ang)).multiply(new THREE.Matrix4().makeTranslation(-p.x, -p.y, -p.z));
    modal.val = ang;
  } else {
    const d0 = Math.max(4, Math.hypot(m0.x - ps.x, m0.y - ps.y));
    let f = Math.hypot(mouse.x - ps.x, mouse.y - ps.y) / d0;
    // uniform (or XZ) scaling snaps so the loop lands on a whole number of sixteenths
    const ringScales = !axis || (modal.axis === 'y' && modal.exclude);
    if (snapOn() && ringScales && xf.per0 > 1e-4) { const tgt = Math.max(SNAP, Math.round(xf.per0 * f / SNAP) * SNAP); f = tgt / xf.per0; }
    else if (snapOn()) f = Math.round(f * 10) / 10;
    const sv = V3(f, f, f);
    if (axis) { const k = modal.axis; if (modal.exclude) sv[k] = 1; else { sv.set(1, 1, 1); sv[k] = f; } }
    M.makeTranslation(p.x, p.y, p.z).multiply(new THREE.Matrix4().makeScale(Math.max(sv.x, 0.01), Math.max(sv.y, 0.01), Math.max(sv.z, 0.01))).multiply(new THREE.Matrix4().makeTranslation(-p.x, -p.y, -p.z));
    modal.val = sv;
  }
  applyDelta(M); showModalHdr();
}
export function endModal(commit) {
  if (!modal) return;
  finishMotionRec(commit);
  modal = null; $('modalHdr').style.display = 'none';
  endXform(commit);
}
function showModalHdr() {
  const h = $('modalHdr'); h.style.display = 'block';
  if (mrec) { showRecBadge(); return; }
  if (xf && xf.kind === 'notes') {
    const s = xf.s, k = xf.items[0].k;
    h.textContent = modal.axis === 'z' ? `NOTE ${noteName(noteFor(s, k))}  ·  Z = BACK TO SLIDING · LMB / RELEASE CONFIRM · RMB / ESC CANCEL`
      : `SLIDE · ${fmtBars(s.notes[k].f * s.perim / UNITS_PER_BAR)} INTO THE LOOP  ·  Z = NOTE UP / DOWN · CTRL ${settings.snap ? 'FREE' : 'SNAP'} · LMB / RELEASE CONFIRM · RMB / ESC CANCEL`;
    return;
  }
  const nm = { G: 'MOVE', R: 'ROTATE', S: 'SCALE' }[modal.type];
  const ax = modal.axis ? ` · ${modal.exclude ? 'PLANE ⊥' : 'AXIS'} ${modal.axis.toUpperCase()}` : '';
  let v = '';
  if (modal.type === 'G' && modal.val) v = `${modal.val.x.toFixed(2)} ${modal.val.y.toFixed(2)} ${modal.val.z.toFixed(2)}`;
  if (modal.type === 'R' && modal.val !== undefined) v = `${THREE.MathUtils.radToDeg(modal.val).toFixed(1)}°`;
  if (modal.type === 'S' && modal.val) v = `${modal.val.x.toFixed(2)} ${modal.val.y.toFixed(2)} ${modal.val.z.toFixed(2)}`;
  const len = active ? ` · ${fmtBars(active.loopBars())}` : '';
  h.textContent = `${nm} ${v}${ax}${len}  ·  X/Y/Z AXIS · ⇧+AXIS PLANE · CTRL ${settings.snap ? 'FREE' : 'SNAP'} · LMB CONFIRM · RMB/ESC CANCEL`;
}

/* =========================================================
   MOTION LOOPS — press R while dragging, release to loop
   ========================================================= */
export let mrec = null, motionJustSet = false;
const LOOP_LENS = [0.25, 0.5, 1, 2, 4, 8];

function captureState(s, kind) {
  if (kind === 'obj') { const p = s.group.position, b = s.base; return [p.x - b.x, p.y - b.y, p.z - b.z, ...s.group.quaternion.toArray(), ...s.group.scale.toArray()]; }
  if (kind === 'notes') return s.notes.flatMap(n => [n.f, n.y]);
  const a = new Array(s.n * 6);
  for (let i = 0; i < s.n * 2; i++) { const v = s.vert(i); a[i * 3] = v.x; a[i * 3 + 1] = v.y; a[i * 3 + 2] = v.z; }
  return a;
}
export function startMotionRec() {
  if (mrec) return;
  let kind, list;
  if (mode === 'object') { kind = 'obj'; list = [...selected]; }
  else { kind = selMode === 'p' ? 'notes' : 'verts'; list = active ? [active] : []; }
  if (!list.length) return;
  mrec = { kind, t0: performance.now(), items: list.map(s => ({ s, samples: [] })) };
  sampleMotion(); showRecBadge();
}
export function sampleMotion() {
  if (!mrec) return;
  const t = (performance.now() - mrec.t0) / 1000;
  mrec.items.forEach(it => it.samples.push({ t, v: captureState(it.s, mrec.kind) }));
}
export function showRecBadge() {
  if (!mrec) return;
  const h = $('modalHdr'); h.style.display = 'block';
  const sec = (performance.now() - mrec.t0) / 1000, bars_ = sec / barLen();
  h.textContent = `● RECORDING ${{ obj: 'OBJECT', verts: 'VERTICES', notes: 'NOTES' }[mrec.kind]} MOTION  ${bars_.toFixed(2)} BAR  ·  RELEASE TO LOOP · ESC CANCEL`;
  h.style.borderColor = '#c8473b'; h.style.color = '#c8473b';
}
function hideRecBadge() { const h = $('modalHdr'); h.style.borderColor = ''; h.style.color = ''; if (!modal) h.style.display = 'none'; }
export function finishMotionRec(commit) {
  const R = mrec; mrec = null; hideRecBadge();
  if (!R || !commit) return;
  R.items.forEach(it => it.samples.push({ t: (performance.now() - R.t0) / 1000, v: captureState(it.s, R.kind) }));
  const dur = R.items[0].samples.at(-1).t;
  if (dur < 0.2) return;
  const raw = dur / barLen();
  const len = LOOP_LENS.reduce((a, b) => Math.abs(Math.log2(b / raw)) < Math.abs(Math.log2(a / raw)) ? b : a);
  R.items.forEach(({ s, samples }) => {
    const N = clamp(Math.round(len * 64), 16, 512);
    let frames = [], k = 0;
    for (let j = 0; j < N; j++) {
      const tt = j / N * dur;
      while (k < samples.length - 2 && samples[k + 1].t < tt) k++;
      const A = samples[k], B = samples[Math.min(k + 1, samples.length - 1)];
      const f = B.t > A.t ? clamp((tt - A.t) / (B.t - A.t), 0, 1) : 0;
      frames.push(A.v.map((a, i) => a + (B.v[i] - a) * f));
    }
    const b0 = Math.floor(N * 0.88);
    for (let j = b0; j < N; j++) { const w = (j - b0) / (N - b0), e = w * w * (3 - 2 * w); frames[j] = frames[j].map((v, i) => v + (frames[0][i] - v) * e); }
    let idx;
    if (R.kind === 'notes') {                         // only the notes that moved; their places unwrapped so a loop round the start stays smooth
      idx = s.notes.map((n, k) => k).filter(k => frames.some(fr => Math.abs(fr[k * 2] - frames[0][k * 2]) + Math.abs(fr[k * 2 + 1] - frames[0][k * 2 + 1]) > 1e-4));
      if (!idx.length) return;
      frames = frames.map(fr => idx.flatMap(k => [fr[k * 2], fr[k * 2 + 1]]));
      if (s.closed) for (let q = 0; q < idx.length; q++) for (let j = 1; j < frames.length; j++) frames[j][q * 2] -= Math.round(frames[j][q * 2] - frames[j - 1][q * 2]);
    } else if (R.kind === 'verts') {
      idx = [];
      for (let i = 0; i < s.n * 2; i++) {
        let dev = 0;
        for (const fr of frames) dev = Math.max(dev, Math.abs(fr[i * 3] - frames[0][i * 3]) + Math.abs(fr[i * 3 + 1] - frames[0][i * 3 + 1]) + Math.abs(fr[i * 3 + 2] - frames[0][i * 3 + 2]));
        if (dev > 1e-4) idx.push(i);
      }
      if (!idx.length) return;
      frames = frames.map(fr => idx.flatMap(i => [fr[i * 3], fr[i * 3 + 1], fr[i * 3 + 2]]));
    }
    s.tracks[R.kind] = { len, frames, idx };
    motionJustSet = true;
    s.buildMotionLines();
  });
  refreshPanel();
}
export function clearMotion() {
  const list = mode === 'edit' && active ? [active] : [...selected];
  let any = false;
  list.forEach(s => { if (Object.keys(s.tracks).length) { s.tracks = {}; s.buildMotionLines(); any = true; } });
  if (any) { pushUndo(); refreshPanel(); }
}
export function handsOn(s, kind) {
  if (mrec && mrec.kind === kind && mrec.items.some(it => it.s === s)) return true;
  if (xf && kind === 'obj' && xf.kind === 'object' && xf.items.some(it => it.s === s)) return true;
  if (xf && kind === 'verts' && xf.kind === 'edit' && xf.s === s) return true;
  if (xf && kind === 'notes' && xf.kind === 'notes' && xf.s === s) return true;
  return false;
}
// a plain drag on looping vertices moves the whole vertex loop (object loops are relative to the stack already)
function shiftLoops(X) {
  if (motionJustSet) { motionJustSet = false; return; }
  if (X.kind === 'notes') {                          // a plain drag on looping notes moves their whole loop
    const s = X.s, tr = s.tracks.notes; if (!tr) return;
    const d = new Map(X.items.map(({ k, f, y }) => [k, [s.notes[k].f - f, s.notes[k].y - y]]));
    tr.frames = tr.frames.map(fr => fr.map((v, i) => { const dd = d.get(tr.idx[Math.floor(i / 2)]); return dd ? v + dd[i % 2] : v; }));
    return;
  }
  if (X.kind === 'edit') {
    const s = X.s, tr = s.tracks.verts; if (!tr) return;
    tr.frames = tr.frames.map(fr => fr.map((v, k) => { const vi = tr.idx[Math.floor(k / 3)], c = k % 3; return v + (s.vert(vi).getComponent(c) - X.orig[vi].getComponent(c)); }));
    s.buildMotionLines();
  }
}

/* =========================================================
   ACTIONS
   ========================================================= */
const F3 = () => 4 * PITCH.step;   // 4 scale steps up: the synth stem on F3 (key A#, Aeolian)
const T = () => PITCH.thick;
const BEATS = [0, 0.25, 0.5, 0.75], OFF8 = [1, 3, 5, 7].map(k => k / 8);
export const PRESETS = {
  kick:   { label: 'KICK',   desc: 'square · every beat',     make: () => ({ name: 'Kick',   ...barPrism(4, 1, T()), sound: 'stem_kick', notes: notesAt(BEATS) }) },
  clap:   { label: 'CLAP',   desc: 'square · beats 2 + 4',    make: () => ({ name: 'Clap',   ...barPrism(4, 1, T()), sound: 'stem_clap', notes: notesAt([0.25, 0.75]) }) },
  cymbal: { label: 'CYMBAL', desc: 'square · offbeats',       make: () => ({ name: 'Cymbal', ...barPrism(4, 1, T()), sound: 'stem_cymbal', notes: notesAt(OFF8) }) },
  cym16:  { label: 'CYMBAL', desc: 'square · sixteenths',     make: () => ({ name: 'Cymbal', ...barPrism(4, 1, T()), sound: 'stem_cymbal', notes: notesAt([...Array(16).keys()].map(k => k / 16)) }) },
  synth:  { label: 'SYNTH',  desc: 'square · offbeats · F3',  make: () => ({ name: 'Synth',  ...barPrism(4, 1, T()), sound: 'stem_synth', notes: notesAt(OFF8), dy: F3() }) },
  bass:   { label: 'BASS',   desc: 'square · every beat',     make: () => ({ name: 'Bass',   ...barPrism(4, 1, T()), sound: 'stem_bass', notes: notesAt(BEATS) }) },
};
// new forms land on the work plane where the add menu was opened (the mouse for ⇧A, the screen centre for the ADD button),
// moved to the nearest spot where they touch nothing; in the top view (all forms on the centre) near the middle of the 3D view
let addAt = null;
export function setAddAt(x, y) { addAt = viewMode === '3d' ? groundHit(x, y) : null; }
const onPlane = dy => dy - planeOf(dy) * octaveH() + work.plane * octaveH();   // same height within its octave, on the work plane
function landFree(s, at) { const c = at ?? view.target; s.anchor = freeSpot(s.stack, c.x, c.z); }
function addFromData(d) {
  if (mode === 'edit') setMode('object');
  const s = addShape({ ...d, name: nextName(d.name), anchor: [0, 0], dy: onPlane(d.dy ?? 0) });
  landFree(s, addAt);
  select(s, false);
  return s;
}
// a bare form plays nothing yet: straight on to placing its notes (the sound shapes come with theirs)
export function addPrism(kind) {
  const d = kind === 'rect' ? { name: 'Rectangle', ...rectPrism(1.5, 0.5, T()) } : { name: prismName(+kind), ...barPrism(+kind, 1, T()) };
  startPlace(addFromData({ ...d, sound: lastSound, notes: [] }));
}
export function addPreset(key) {
  const s = addFromData(PRESETS[key].make()); pushUndo();
  if (viewMode === 'top') flashMsg(`${s.name} · ${fmtBars(s.loopBars())} · ADDED TO THE COMMON CENTRE`);
}
export function duplicateSel(thenGrab = true) {
  if (mode !== 'object' || !selected.size) return;
  const src = [...selected], made = [];
  selected.clear();
  src.forEach(s => {
    const d = s.serialize(); delete d.id; d.name = nextName(s.name.replace(/\.\d{3}$/, ''));
    d.below = null; d.anchor = standsAt(s);               // a copy starts as its own loop, where the original stands, same height
    const n = addShape(d); made.push(n); selected.add(n);
  });
  active = made[made.length - 1];
  rebuildStacks();
  const grab = thenGrab && viewMode === '3d';
  made.forEach(n => { if (grab) n.fresh = true; else n.anchor = freeSpot(n.stack, ...n.anchor); });   // a dropped copy moves free
  pushUndo(); refreshPanel();
  if (grab) { scene.updateMatrixWorld(true); startModal('G'); flashMsg('MOVE THE COPY · CLICK TO DROP'); }
}
let clipboard = null;
export function copySel() { if (mode === 'object' && selected.size) clipboard = [...selected].map(s => ({ ...s.serialize(), anchor: [...rootOf(s).anchor] })); }
export function pasteClip() {
  if (!clipboard || mode !== 'object') return;
  selected.clear();
  const at = viewMode === '3d' ? groundHit(mouse.x, mouse.y) : null;    // at the cursor on the work plane, moved free
  clipboard.forEach(d0 => {
    const d = structuredClone(d0); delete d.id; d.name = nextName(d.name.replace(/\.\d{3}$/, ''));
    d.below = null; d.anchor = [0, 0]; d.dy = onPlane(d.dy ?? 0);
    const s = addShape(d); landFree(s, at); selected.add(s); active = s;
  });
  pushUndo(); updateGumball(); refreshPanel();
}
export function deleteSel() {
  if (mode !== 'object' || !selected.size) return;
  [...selected].forEach(removeShape); selected.clear(); active = null;
  pushUndo(); updateGumball(); refreshPanel();
}
/* ---------- linked loops: a chain plays its loops one after another, then repeats; in 3D they sit in a row along x ---------- */
// take a loop out of its chain and close the gap (the rest of the chain stays where it is)
function takeOut(s) {
  const above = aboveMap.get(s.id), wasRoot = s.below == null, at = standsAt(s);
  if (above) { above.below = s.below; if (wasRoot) above.anchor = s.anchor; }
  s.below = null;
  rebuildStacks();
  if (wasRoot && !above) return;
  s.anchor = freeSpot(s.stack, ...at);               // the nearest free spot to where it stood in the row
}
// Ctrl+L: link the selected loops in the order they were clicked (the first one plays first); a loop already in a chain
// brings that chain along, the others are appended after its last loop
export function linkSel() {
  const list = mode === 'object' ? [...selected] : [];
  if (list.length < 2) { flashMsg('CTRL+CLICK OR ⇧+CLICK TWO OR MORE LOOPS IN PLAYING ORDER, THEN CTRL+L'); return; }
  const first = list[0];
  for (const s of list.slice(1)) {
    if (first.stack.includes(s)) continue;
    takeOut(s);
    s.below = first.stack.at(-1).id; s.anchor = null;
    rebuildStacks();
  }
  clearRow(first.stack);                              // the longer row pushes whatever it now runs into aside
  pushUndo(); refreshPanel();
  flashMsg(`LINKED · ${first.stack.length} LOOPS · ${fmtBars(first.stack.reduce((a, f) => a + f.loopBars(), 0))} · ALT+L TAKES ONE OUT`);
}
// Alt+L / UNSTACK: take the selected loops out of their chains
export function unlinkSel(list = [...selected]) {
  const ls = list.filter(s => s && s.stack.length > 1); if (!ls.length) return;
  ls.forEach(takeOut);
  pushUndo(); refreshPanel();
}
export const unstack = s => unlinkSel([s]);
export function togglePlay(force) {
  playing = force ?? !playing;
  $('playBtn').textContent = playing ? '■ STOP' : '▶ PLAY'; $('playBtn').classList.toggle('on', playing);
  if (playing) setSimTime(null);
}
export function toggleEdit() { if (mode === 'edit') setMode('object'); else if (active) setMode('edit'); }
export function selectAll() {
  if (mode === 'edit' && active && selMode === 'p') active.notes.forEach((n, k) => active.noteSel.add(k));
  else if (mode === 'edit' && active) { for (let i = 0; i < active.n * 2; i++) active.editSel.add(i); }
  else { shapes.forEach(s => selected.add(s)); if (!active) active = shapes[0] ?? null; }
  updateGumball(); refreshPanel();
}
export function selectNone() {
  if (mode === 'edit' && active) (selMode === 'p' ? active.noteSel : active.editSel).clear(); else { selected.clear(); active = null; }
  updateGumball(); refreshPanel();
}
export function invertSel() {
  if (mode === 'edit' && active && selMode === 'p') active.notes.forEach((n, k) => active.noteSel.has(k) ? active.noteSel.delete(k) : active.noteSel.add(k));
  else if (mode === 'edit' && active) { for (let i = 0; i < active.n * 2; i++) active.editSel.has(i) ? active.editSel.delete(i) : active.editSel.add(i); }
  else { shapes.forEach(s => selected.has(s) ? selected.delete(s) : selected.add(s)); active = [...selected][0] ?? null; }
  updateGumball(); refreshPanel();
}
export function resetPhases() { setBars(-0.0005); setSimTime(null); }
