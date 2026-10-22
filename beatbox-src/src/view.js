// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './audio.js';
import * as THREE from 'three';
import { V3, smooth, clamp } from './core.js';
import { persp, ortho, camera, setCamera } from './render.js';
import { shapes } from './shape.js';
import { tc, cancelTool, updateGumball, active } from './edit.js';
import { setHint, refreshPanel } from './ui.js';

/* =========================================================
   VIEWS — orthographic TOP (all forms concentric) ⇄ perspective 3D (exploded)
   ========================================================= */
export const view = { target: V3(0, 1.4, 0), radius: 11, theta: 0.62, phi: 1.18 };   // 3D turntable (Blender-style)
export const topv = { cx: 0, cz: 0, h: 2.6 };                                      // orthographic half-height
export let viewMode = '3d', ex = 1, viewAnim = null, trans = null;
export function setViewAnim(v) { viewAnim = v; }   // for ui.js
function placePersp(cam, v) {
  cam.position.setFromSpherical(new THREE.Spherical(v.radius, v.phi, v.theta)).add(v.target);
  cam.up.set(0, 1, 0); cam.lookAt(v.target); cam.updateMatrixWorld();
}
function setOrtho() {
  const a = innerWidth / innerHeight;
  ortho.left = -topv.h * a; ortho.right = topv.h * a; ortho.top = topv.h; ortho.bottom = -topv.h; ortho.updateProjectionMatrix();
  ortho.position.set(topv.cx, 80, topv.cz); ortho.up.set(0, 0, -1); ortho.lookAt(topv.cx, 0, topv.cz); ortho.updateMatrixWorld();
}
const topEquiv = () => ({ target: V3(topv.cx, 0, topv.cz), radius: topv.h / Math.tan(THREE.MathUtils.degToRad(persp.fov / 2)), theta: 0, phi: 0.0006 });
const cloneV = v => ({ target: v.target.clone(), radius: v.radius, theta: v.theta, phi: v.phi });
const isTop = () => viewMode === 'top' && !trans;
export function applyView() {
  if (trans) { placePersp(persp, trans.cur); setCamera(persp); }
  else if (viewMode === 'top') { setOrtho(); setCamera(ortho); }
  else { placePersp(persp, view); setCamera(persp); }
  if (tc.camera !== camera) tc.camera = camera;
}
export function setViewMode(m) {
  if (m === viewMode && !trans) return;
  cancelTool(); viewAnim = null;
  const from = trans ? cloneV(trans.cur) : (viewMode === 'top' ? topEquiv() : cloneV(view));
  const to = m === 'top' ? topEquiv() : cloneV(view);
  let dth = (to.theta - from.theta) % (Math.PI * 2);
  if (dth > Math.PI) dth -= Math.PI * 2; if (dth < -Math.PI) dth += Math.PI * 2;
  trans = { t: 0, from, to: { ...to, theta: from.theta + dth }, mode: m, ex0: ex, cur: cloneV(from) };
  viewMode = m;
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('on', b.dataset.view === m));
  updateGumball(); setHint(); refreshPanel();
}
export function stepView(dt) {
  if (trans) {
    trans.t = Math.min(1, trans.t + dt / 0.8);
    const e = smooth(smooth(trans.t)), f = trans.from, t = trans.to, c = trans.cur;
    c.target.lerpVectors(f.target, t.target, e);
    c.radius = Math.exp(Math.log(f.radius) + (Math.log(t.radius) - Math.log(f.radius)) * e);
    c.theta = f.theta + (t.theta - f.theta) * e; c.phi = f.phi + (t.phi - f.phi) * e;
    // forms fly out of / back into the common origin
    const k = smooth(clamp(trans.mode === 'top' ? trans.t * 1.25 : trans.t * 1.25 - 0.25, 0, 1));
    ex = trans.mode === 'top' ? trans.ex0 * (1 - k) : trans.ex0 + (1 - trans.ex0) * k;
    if (trans.t >= 1) { ex = trans.mode === 'top' ? 0 : 1; trans = null; updateGumball(); }
  } else if (viewAnim && viewMode === '3d') {
    viewAnim.t = Math.min(1, viewAnim.t + dt / 0.3);
    const e = 1 - Math.pow(1 - viewAnim.t, 3), f = viewAnim.from, t = viewAnim.to;
    view.target.lerpVectors(f.target, t.target, e); view.radius = f.radius + (t.radius - f.radius) * e;
    view.theta = f.theta + (t.theta - f.theta) * e; view.phi = f.phi + (t.phi - f.phi) * e;
    if (viewAnim.t >= 1) viewAnim = null;
  } else if (topAnim && viewMode === 'top') {
    topAnim.t = Math.min(1, topAnim.t + dt / 0.3); const e = 1 - Math.pow(1 - topAnim.t, 3);
    topv.h = topAnim.h0 + (topAnim.h1 - topAnim.h0) * e; topv.cx = topAnim.x0 * (1 - e); topv.cz = topAnim.z0 * (1 - e);
    if (topAnim.t >= 1) topAnim = null;
  }
  applyView();
}
export let topAnim = null;
export function setTopAnim(v) { topAnim = v; }
export function animateView(to) {
  const from = cloneV(view);
  let dth = ((to.theta ?? from.theta) - from.theta) % (Math.PI * 2);
  if (dth > Math.PI) dth -= Math.PI * 2; if (dth < -Math.PI) dth += Math.PI * 2;
  viewAnim = { from, to: { target: to.target ?? from.target, radius: to.radius ?? from.radius, theta: from.theta + dth, phi: to.phi ?? from.phi }, t: 0 };
}
export function frameObjects(list) {
  if (!list.length) return;
  if (viewMode === 'top') {
    const r = Math.max(...list.map(s => Math.max(...s.ringW.map(v => Math.hypot(v.x - s.group.position.x, v.z - s.group.position.z)))));
    topAnim = { t: 0, h0: topv.h, h1: clamp(r * 1.7, 1, 60), x0: topv.cx, z0: topv.cz }; return;
  }
  const box = new THREE.Box3();
  list.forEach(s => { s.group.updateMatrixWorld(); box.expandByObject(s.mesh); });
  const c = box.getCenter(V3()), r = box.getBoundingSphere(new THREE.Sphere()).radius;
  animateView({ target: c, radius: clamp(r / Math.sin(THREE.MathUtils.degToRad(persp.fov / 2)) * 1.15, 1.2, 90) });
}
export function frameVerts() {
  if (!active || !active.editSel.size || viewMode !== '3d') return frameObjects(active ? [active] : shapes);
  const box = new THREE.Box3();
  active.editSel.forEach(i => box.expandByPoint(active.vert(i).clone().applyMatrix4(active.group.matrixWorld)));
  const c = box.getCenter(V3()), r = Math.max(0.4, box.getBoundingSphere(new THREE.Sphere()).radius);
  animateView({ target: c, radius: clamp(r / Math.sin(THREE.MathUtils.degToRad(persp.fov / 2)) * 1.4, 1, 40) });
}
export function panBy(dx, dy) {
  if (viewMode === 'top') { const k = 2 * topv.h / innerHeight; topv.cx -= dx * k; topv.cz -= dy * k; return; }
  const k = 2 * view.radius * Math.tan(THREE.MathUtils.degToRad(persp.fov / 2)) / innerHeight;
  const r = V3(1, 0, 0).applyQuaternion(persp.quaternion), u = V3(0, 1, 0).applyQuaternion(persp.quaternion);
  view.target.addScaledVector(r, -dx * k).addScaledVector(u, dy * k);
}
export function zoomBy(f) { if (viewMode === 'top') topv.h = clamp(topv.h * f, 0.4, 80); else view.radius = clamp(view.radius * f, 0.4, 120); }

