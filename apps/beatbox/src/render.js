// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './core.js';
import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { $, V3, FX, ROOM } from './core.js';

/* =========================================================
   RENDERER · LAYERS · MILK PIPELINE
   soft layer  -> offscreen, airbrushed (reverb halos, floor glow, open-curve strokes)
   grid layer  -> dotted grid on the grey void
   milk layer  -> offscreen thickness: every closed form is a milky volume, lighter than the void, warmer where it is thick
   star layer  -> offscreen: the star inside every closed form, seen through the milk
   ink layer   -> offscreen, blurred: the bleed of the dot's ink trail, its glow and the ink pools at corners
   sharp layer -> path curves, dots, stack connectors (never blurred)
   overlay     -> gizmo, edit overlays, tools
   ========================================================= */
export const L_SOFT = 1, L_GRID = 2, L_SHARP = 3, L_MILK = 4, L_STAR = 5, L_INK = 6, L_FOCUS = 7, L_SEL = 8;
export const BG = new THREE.Color('#cccccb');
// the milk's colours: thin = ivory, thick = warm; its rim and its lavender shadow
const MILK = { ivory: new THREE.Color('#f1f2ea'), warm: new THREE.Color('#b59c7c'), rim: new THREE.Color('#6d6878'), lav: new THREE.Color('#7e7a9e') };

export const canvas = $('c');
export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;   // no conversion: colours are already display values
renderer.toneMapping = THREE.NoToneMapping;

export const scene = new THREE.Scene();
export const overlay = new THREE.Scene();
export const persp = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.03, 300);
export const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400);
export let camera = persp;
export function setCamera(c) { camera = c; }   // view.js switches cameras

// every LineMaterial needs the viewport size
export const lineMats = new Set();
export function lineMat(opts) { const m = new LineMaterial({ worldUnits: false, ...opts }); m.resolution.set(innerWidth, innerHeight); lineMats.add(m); return m; }
export function dropLineMat(m) { lineMats.delete(m); m.dispose(); }

export const radialTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.55)');
  gr.addColorStop(0.7, 'rgba(255,255,255,.12)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
})();

/* ---------- render targets ---------- */
const rtOpts = { type: THREE.HalfFloatType, depthBuffer: true, colorSpace: THREE.NoColorSpace };
let rtForms, rtA, rtB, rtBase, rtT, rtTa, rtTb, rtO, rtOa, rtOb, rtI, rtIa, rtIb, rtS, rtSa, rtSb, rtM, rtMa, rtMb, rtSel;
export function makeTargets() {
  const s = renderer.getDrawingBufferSize(new THREE.Vector2()), w = s.x, h = s.y;
  const full = (samples = 0) => new THREE.WebGLRenderTarget(w, h, { ...rtOpts, depthBuffer: false, samples });
  const half = () => new THREE.WebGLRenderTarget(Math.max(2, w >> 1), Math.max(2, h >> 1), { ...rtOpts, depthBuffer: false });
  [rtForms, rtA, rtB, rtBase, rtT, rtTa, rtTb, rtO, rtOa, rtOb, rtI, rtIa, rtIb, rtS, rtSa, rtSb, rtM, rtMa, rtMb, rtSel].forEach(r => r && r.dispose());
  rtSel = full(4);                                // selected forms' silhouettes (r: selected, g: the active one)
  rtS = new THREE.WebGLRenderTarget(w, h, { ...rtOpts, samples: 4 }); rtSa = half(); rtSb = half();   // edit mode: the frame, to blur
  rtM = half(); rtMa = half(); rtMb = half();                                                        // edit mode: the edited form's mask
  rtForms = new THREE.WebGLRenderTarget(w, h, rtOpts);
  rtA = new THREE.WebGLRenderTarget(Math.max(2, w >> 1), Math.max(2, h >> 1), { ...rtOpts, depthBuffer: false });
  rtB = new THREE.WebGLRenderTarget(Math.max(2, w >> 1), Math.max(2, h >> 1), { ...rtOpts, depthBuffer: false });
  rtBase = full();                                // void + grid + soft layer: what lies under the milk
  rtT = full(4); rtTa = full(); rtTb = full();    // milk thickness: multisampled (crisp rims), softened at full resolution
  rtO = full(4); rtOa = full(); rtOb = full();    // the star, the same way
  rtI = full(4);                                  // ink: its bleed is soft anyway, so it is blurred at half resolution
  rtIa = new THREE.WebGLRenderTarget(Math.max(2, w >> 1), Math.max(2, h >> 1), { ...rtOpts, depthBuffer: false });
  rtIb = new THREE.WebGLRenderTarget(Math.max(2, w >> 1), Math.max(2, h >> 1), { ...rtOpts, depthBuffer: false });
}
makeTargets();
// a transparent 1×1 stand-in for a layer that is not drawn
const blank = new THREE.DataTexture(new Uint8Array(4), 1, 1); blank.needsUpdate = true;

/* ---------- milk: thickness ----------
   front faces add −depth, back faces +depth: the length of every view ray inside the milk, summed over all forms.
   Depth is counted from uRef (about the camera's distance) so the numbers stay small enough for half floats. */
export const thickMat = new THREE.ShaderMaterial({
  uniforms: { uRef: { value: 0 } },
  vertexShader: `uniform float uRef; varying float vZ; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vZ = -mv.z - uRef; gl_Position = projectionMatrix * mv; }`,
  fragmentShader: `varying float vZ; void main(){ gl_FragColor = vec4(gl_FrontFacing ? -vZ : vZ, 0.0, 0.0, 1.0); }`,
  side: THREE.DoubleSide, depthTest: false, depthWrite: false, transparent: true,
  blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneFactor,
});

/* ---------- fullscreen passes ---------- */
const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
const quadScene = new THREE.Scene(); quadScene.add(quad);
const QVS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const blurMat = new THREE.ShaderMaterial({
  uniforms: { tex: { value: null }, dir: { value: new THREE.Vector2() }, texel: { value: new THREE.Vector2() }, radius: { value: 1 } },
  vertexShader: QVS, depthTest: false, depthWrite: false,
  fragmentShader: `
    uniform sampler2D tex; uniform vec2 dir; uniform vec2 texel; uniform float radius; varying vec2 vUv;
    void main(){
      vec2 o1 = dir * texel * 1.3846153846 * radius, o2 = dir * texel * 3.2307692308 * radius;
      vec4 c = texture2D(tex, vUv) * 0.2270270270;
      c += (texture2D(tex, vUv + o1) + texture2D(tex, vUv - o1)) * 0.3162162162;
      c += (texture2D(tex, vUv + o2) + texture2D(tex, vUv - o2)) * 0.0702702703;
      gl_FragColor = c;
    }`,
});
// the void: flat grey, darker than the milk so the milk reads as light
const bgMat = new THREE.ShaderMaterial({
  uniforms: { uGrey: { value: 0.8 } },
  vertexShader: QVS, depthTest: false, depthWrite: false,
  fragmentShader: `uniform float uGrey; void main(){ gl_FragColor = vec4(uGrey, uGrey, uGrey * 0.985, 1.0); }`,
});
// milk composite over what lies under it (void, grid, soft layer): lavender shadow -> milk -> the star seen through the milk
// -> rim at every silhouette -> ink bleed
const milkMat = new THREE.ShaderMaterial({
  uniforms: { tBase: { value: null }, tT: { value: null }, tTb: { value: null }, tO: { value: blank }, tIb: { value: blank }, texel: { value: new THREE.Vector2() },
    uIvory: { value: MILK.ivory }, uWarmC: { value: MILK.warm }, uRimC: { value: MILK.rim }, uLav: { value: MILK.lav },
    milkDen: { value: 1 }, milkMax: { value: 1 }, warm: { value: 1 }, rim: { value: 1 }, shadow: { value: 1 }, shadowOff: { value: 0 }, veil: { value: 0 }, bleed: { value: 0 } },
  vertexShader: QVS, depthTest: false, depthWrite: false,
  fragmentShader: `
    uniform sampler2D tBase, tT, tTb, tO, tIb; uniform vec2 texel; uniform vec3 uIvory, uWarmC, uRimC, uLav;
    uniform float milkDen, milkMax, warm, rim, shadow, shadowOff, veil, bleed; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tBase, vUv).rgb;
      float Tb = max(texture2D(tTb, vUv).r, 0.0), m = 1.0 - exp(-Tb * milkDen);
      float Ts = max(texture2D(tTb, vUv + vec2(-1.0, 1.0) * shadowOff * texel).r, 0.0);
      c = mix(c, uLav, (1.0 - exp(-Ts * milkDen * 2.0)) * shadow * (1.0 - m));     // lavender shadow, outside the milk
      vec3 milk = mix(uIvory, uWarmC, 1.0 - exp(-Tb * warm));                       // warmer where thick / where forms overlap
      c = mix(c, milk, m * milkMax);
      vec4 o = texture2D(tO, vUv);
      if (o.a > 1e-4) { vec3 oc = o.rgb / o.a; oc = mix(oc, milk, veil * m); c = mix(c, oc, clamp(o.a, 0.0, 1.0)); }
      float e = abs(texture2D(tT, vUv + vec2(texel.x, 0.0)).r - texture2D(tT, vUv - vec2(texel.x, 0.0)).r)
              + abs(texture2D(tT, vUv + vec2(0.0, texel.y)).r - texture2D(tT, vUv - vec2(0.0, texel.y)).r);
      c = mix(c, uRimC, clamp(e * rim, 0.0, 1.0) * 0.55);                            // rim: every silhouette, also those behind
      vec4 ib = texture2D(tIb, vUv) * bleed; c = c * (1.0 - clamp(ib.a, 0.0, 1.0)) + ib.rgb;
      gl_FragColor = vec4(c, 1.0);
    }`,
});
const compMat = new THREE.ShaderMaterial({
  uniforms: { tSharp: { value: null }, tBlur: { value: null }, uSoft: { value: 0.8 } },
  vertexShader: QVS, depthTest: false, depthWrite: false, transparent: true,
  blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
  blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
  fragmentShader: `
    uniform sampler2D tSharp, tBlur; uniform float uSoft; varying vec2 vUv;
    void main(){
      vec4 s = texture2D(tSharp, vUv), b = texture2D(tBlur, vUv);
      vec4 c = mix(s, b, uSoft);
      c += b * 0.18 * (1.0 - c.a);          // a little extra bloom-bleed beyond the silhouette
      gl_FragColor = c;
    }`,
});
// edit mode: the form being edited stays sharp — its silhouette, softly widened (a blurred mask) — everything else is blurred
const maskMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, depthTest: false, depthWrite: false });
const focusMat = new THREE.ShaderMaterial({
  uniforms: { tSharp: { value: null }, tBlur: { value: null }, tMask: { value: null }, uAmt: { value: 0 } },
  vertexShader: QVS, depthTest: false, depthWrite: false,
  fragmentShader: `
    uniform sampler2D tSharp, tBlur, tMask; uniform float uAmt; varying vec2 vUv;
    void main(){
      float k = max(smoothstep(0.0, 0.5, texture2D(tMask, vUv).r), 1.0 - uAmt);
      gl_FragColor = vec4(mix(texture2D(tBlur, vUv).rgb, texture2D(tSharp, vUv).rgb, k), 1.0);
    }`,
});
// selection (Blender's way): an orange line just outside the silhouette of every selected form, lighter for the active one
const SEL = { col: new THREE.Color('#e8641c'), act: new THREE.Color('#ffa64d'), w: 1.6 };   // w = line width in CSS px
const selMaskMat = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, depthTest: false, depthWrite: false });
const outlineMat = new THREE.ShaderMaterial({
  uniforms: { tMask: { value: null }, texel: { value: new THREE.Vector2() }, uW: { value: 1 }, uCol: { value: SEL.col }, uAct: { value: SEL.act } },
  vertexShader: QVS, depthTest: false, depthWrite: false, transparent: true,
  fragmentShader: `
    uniform sampler2D tMask; uniform vec2 texel; uniform float uW; uniform vec3 uCol, uAct; varying vec2 vUv;
    void main(){
      vec2 c = texture2D(tMask, vUv).rg, m = vec2(0.0);
      for (int i = 0; i < 12; i++) {                 // the nearest silhouette within uW pixels, in 12 directions
        float a = float(i) * 0.5235988;
        m = max(m, texture2D(tMask, vUv + vec2(cos(a), sin(a)) * uW * texel).rg);
        m = max(m, texture2D(tMask, vUv + vec2(cos(a), sin(a)) * uW * 0.5 * texel).rg);
      }
      float a = m.r * (1.0 - c.r);                   // outside the form, next to it
      if (a < 0.01) discard;
      gl_FragColor = vec4(mix(uCol, uAct, step(0.5, m.g)), a);
    }`,
});
function drawQuad(mat) { quad.material = mat; renderer.render(quadScene, quadCam); }
function blurPass(src, dst, dx, dy, r) {
  blurMat.uniforms.tex.value = src.texture; blurMat.uniforms.dir.value.set(dx, dy);
  blurMat.uniforms.texel.value.set(1 / dst.width, 1 / dst.height); blurMat.uniforms.radius.value = r;
  renderer.setRenderTarget(dst); drawQuad(blurMat);
}
// two growing passes; softness 0 = no blur at all (crisp)
function soften(src, a, b, r) {
  if (r < 0.05) return src;
  blurPass(src, a, 1, 0, r); blurPass(a, b, 0, 1, r); blurPass(b, a, 1, 0, r * 1.8); blurPass(a, b, 0, 1, r * 1.8);
  return b;
}
// one scene layer into a render target, cleared to transparent
function layerTo(rt, layer) {
  camera.layers.set(layer); renderer.setRenderTarget(rt); renderer.setClearColor(0x000000, 0); renderer.clear(true, true, true);
  renderer.render(scene, camera);
}

/* ---------- dotted grid: beat lines, 1/16 dots ---------- */
const gridMat = new THREE.ShaderMaterial({
  uniforms: { uCam: { value: V3() }, uFar: { value: 40 }, uCol: { value: new THREE.Color('#77757f') }, uField: { value: 0.22 } },
  transparent: true, depthWrite: false, extensions: { derivatives: true },
  vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: `
    uniform vec3 uCam; uniform float uFar; uniform vec3 uCol; uniform float uField; varying vec3 vW;
    float fwX, fwZ;
    float lineA(float c, float sp, float fw){ float d = abs(fract(c / sp + 0.5) - 0.5) * sp; return 1.0 - smoothstep(0.5 * fw, 1.4 * fw, d); }
    // dotted lines: dots at a fixed on-screen spacing, so they stay dotted at any distance
    float dash(float a, float sp, float fw){ float f = fract(a / (fw * 7.0)); return 1.0 - smoothstep(0.22, 0.42, abs(f - 0.5) * 2.0 * 0.5 + 0.0) ; }
    float dens(float sp, float fw){ return smoothstep(5.0, 14.0, sp / fw); }
    void main(){
      fwX = fwidth(vW.x); fwZ = fwidth(vW.z); float fw = max(fwX, fwZ);
      float a = 0.0;
      a = max(a, max(lineA(vW.x, 1.0, fwX) * dash(vW.z, 0.125, fwZ), lineA(vW.z, 1.0, fwZ) * dash(vW.x, 0.125, fwX)) * 0.16 * dens(1.0, fw));
      // field: a dot on every 1/16 inside every cell
      vec2 g = abs(fract(vW.xz / 0.25 + 0.5) - 0.5) * 0.25;
      a = max(a, (1.0 - smoothstep(0.8 * fw, 1.6 * fw, length(g))) * uField * smoothstep(3.0, 8.0, 0.25 / fw));
      // the common origin
      float o = (1.0 - smoothstep(fw, 2.0 * fw, abs(vW.x))) * step(abs(vW.z), 0.35) + (1.0 - smoothstep(fw, 2.0 * fw, abs(vW.z))) * step(abs(vW.x), 0.35);
      a = max(a, min(o, 1.0) * 0.7);
      a *= 1.0 - smoothstep(uFar * 0.45, uFar, length(vW.xz - uCam.xz));
      if (a < 0.003) discard;
      gl_FragColor = vec4(uCol, a);
    }`,
});
const grid = new THREE.Mesh(new THREE.PlaneGeometry(600, 600).rotateX(-Math.PI / 2), gridMat);
grid.position.y = -0.002; grid.layers.set(L_GRID); grid.frustumCulled = false; scene.add(grid);

/* ---------- the other octave planes (height = pitch): a faint outline each; the work plane is the grid ---------- */
const planeMat = new THREE.ShaderMaterial({
  uniforms: { uCol: { value: new THREE.Color('#77757f') }, uAlpha: { value: 0 }, uR: { value: 8 } },
  transparent: true, depthWrite: false, side: THREE.DoubleSide, extensions: { derivatives: true },
  vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: `
    uniform vec3 uCol; uniform float uAlpha, uR; varying vec3 vW;
    void main(){
      float fw = max(fwidth(vW.x), fwidth(vW.z)), d = length(vW.xz);
      if (d > uR + 2.0 * fw) discard;
      float rim = 1.0 - smoothstep(0.6 * fw, 1.6 * fw, abs(d - uR));       // a crisp outline: where the octave level is
      float a = max(0.035, rim) * uAlpha;               // on a barely-there film
      if (a < 0.003) discard;
      gl_FragColor = vec4(uCol, a);
    }`,
});
const planes = Array.from({ length: 9 }, () => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), planeMat);
  m.layers.set(L_GRID); m.frustumCulled = false; m.visible = false; scene.add(m); return m;
});
/* ---------- the reverb circle: inside it a form sounds dry; standing farther out it gets reverb (and a halo) ---------- */
const roomRing = (() => {
  const pts = []; for (let i = 0; i <= 128; i++) { const a = i / 128 * Math.PI * 2; pts.push(V3(Math.cos(a) * ROOM.start, 0.003, Math.sin(a) * ROOM.start)); }
  const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineDashedMaterial({ color: 0x77757f, dashSize: 0.18, gapSize: 0.14, transparent: true, depthWrite: false }));
  l.computeLineDistances(); l.layers.set(L_GRID); l.frustumCulled = false; scene.add(l);
  return l;
})();
export function setRoomRing(alpha) { roomRing.material.opacity = alpha; roomRing.visible = alpha > 0.01; }
// an outline at every octave from plane lo to hi except the work plane, a disc of radius R around the centre;
// the grid and the reverb circle sit on the work plane (y = where it is drawn right now)
export function setPlanes(octH, lo, hi, work, y, R, alpha) {
  let i = 0;
  for (let k = lo; k <= hi && i < planes.length; k++) {
    if (k === work) continue;
    const m = planes[i++]; m.position.y = k * octH; m.scale.set(2 * R, 1, 2 * R); m.visible = alpha > 0.01;
  }
  for (; i < planes.length; i++) planes[i].visible = false;
  planeMat.uniforms.uR.value = R; planeMat.uniforms.uAlpha.value = alpha;
  grid.position.y = y - 0.002; roomRing.position.y = y;
}

/* ---------- one frame ---------- */
// focus = { obj (the edited form's milk mesh), amt 0…1 } in edit mode, else null; sel = [{ obj (pick mesh), act }] to outline
export function renderFrame(softAmt, focus, sel = []) {
  // 1 · soft layer offscreen, transparent, airbrushed (two growing passes at half resolution)
  layerTo(rtForms, L_SOFT);
  blurPass(rtForms, rtA, 1, 0, 2.6); blurPass(rtA, rtB, 0, 1, 2.6);
  blurPass(rtB, rtA, 1, 0, 4.8); blurPass(rtA, rtB, 0, 1, 4.8);
  // 2 · milk thickness, softened
  thickMat.uniforms.uRef.value = camera.position.length();
  layerTo(rtT, L_MILK);
  const tb = soften(rtT, rtTa, rtTb, FX.milkBlur);
  layerTo(rtO, L_STAR);
  const ob = soften(rtO, rtOa, rtOb, FX.organBlur);
  layerTo(rtI, L_INK);
  const ib = soften(rtI, rtIa, rtIb, FX.inkBlur);
  // 3 · what lies under the milk: void, grid, soft layer
  renderer.setRenderTarget(rtBase); renderer.setClearColor(BG, 1); renderer.clear(true, true, true);
  renderer.autoClear = false;
  bgMat.uniforms.uGrey.value = FX.bg;
  gridMat.uniforms.uField.value = FX.field;
  drawQuad(bgMat);
  gridMat.uniforms.uCam.value.copy(camera === ortho ? V3(ortho.position.x, 0, ortho.position.z) : persp.position);
  gridMat.uniforms.uFar.value = camera === ortho ? 400 : 16 + persp.position.length() * 0.9;
  camera.layers.set(L_GRID); renderer.render(scene, camera);
  compMat.uniforms.tSharp.value = rtForms.texture; compMat.uniforms.tBlur.value = rtB.texture; compMat.uniforms.uSoft.value = softAmt;
  drawQuad(compMat);
  // 4 · screen: the milk over it, then the hard line work and the overlay
  const u = milkMat.uniforms;
  u.tBase.value = rtBase.texture; u.tT.value = rtT.texture; u.tTb.value = tb.texture; u.tO.value = ob.texture; u.tIb.value = ib.texture; u.texel.value.set(1 / rtT.width, 1 / rtT.height);
  for (const k of ['milkDen', 'milkMax', 'warm', 'rim', 'shadow', 'veil', 'bleed']) u[k].value = FX[k];
  u.shadowOff.value = FX.shadowOff * renderer.getPixelRatio() * (camera === ortho ? 1 : 1.6);
  const F = focus && focus.amt > 0.01 && FX.focusBlur > 0.01;
  renderer.setRenderTarget(F ? rtS : null); renderer.clear(true, true, true);
  drawQuad(milkMat);
  renderer.clearDepth();
  camera.layers.set(L_SHARP); renderer.render(scene, camera);
  if (F) {
    const o = focus.obj, keep = o.layers.mask;
    o.layers.set(L_FOCUS); scene.overrideMaterial = maskMat;
    layerTo(rtM, L_FOCUS);
    scene.overrideMaterial = null; o.layers.mask = keep;
    blurPass(rtM, rtMa, 1, 0, 5); blurPass(rtMa, rtMb, 0, 1, 5); blurPass(rtMb, rtMa, 1, 0, 9); blurPass(rtMa, rtMb, 0, 1, 9);
    const r = 1.5 * FX.focusBlur;                    // three growing rounds: wide, but without streaks
    blurPass(rtS, rtSa, 1, 0, r); blurPass(rtSa, rtSb, 0, 1, r);
    blurPass(rtSb, rtSa, 1, 0, 2 * r); blurPass(rtSa, rtSb, 0, 1, 2 * r);
    blurPass(rtSb, rtSa, 1, 0, 3 * r); blurPass(rtSa, rtSb, 0, 1, 3 * r);
    const u = focusMat.uniforms; u.tSharp.value = rtS.texture; u.tBlur.value = rtSb.texture; u.tMask.value = rtMb.texture; u.uAmt.value = focus.amt;
    renderer.setRenderTarget(null); drawQuad(focusMat);
  }
  if (sel.length) {
    // every selected form's pick mesh in red, the active one again in yellow (r: selected, g: active)
    renderer.setRenderTarget(rtSel); renderer.setClearColor(0x000000, 0); renderer.clear(true, true, true);
    camera.layers.set(L_SEL); scene.overrideMaterial = selMaskMat;
    [...sel.filter(o => !o.act), ...sel.filter(o => o.act)].forEach(({ obj, act }) => {
      const vis = obj.visible, keep = obj.layers.mask;
      obj.visible = true; obj.layers.set(L_SEL); selMaskMat.color.setRGB(1, act ? 1 : 0, 0);
      renderer.render(scene, camera);
      obj.visible = vis; obj.layers.mask = keep;
    });
    scene.overrideMaterial = null;
    const u = outlineMat.uniforms; u.tMask.value = rtSel.texture; u.texel.value.set(1 / rtSel.width, 1 / rtSel.height); u.uW.value = SEL.w * renderer.getPixelRatio();
    renderer.setRenderTarget(null); drawQuad(outlineMat);
  }
  renderer.clearDepth();
  camera.layers.set(0); renderer.render(overlay, camera);
  renderer.autoClear = true;
}
