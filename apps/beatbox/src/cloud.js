// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './shape.js';
import * as THREE from 'three';
import { clamp, FX, pitchColor, familyOf, semisOf, boostSat, SOUNDS } from './core.js';
import { L_STAR, L_SHARP, renderer } from './render.js';
import { BoxSculpture } from './visual/sculpture.js';
import { audio } from './audio.js';
import { cloudT } from './loop.js';

/* =========================================================
   THE STAR INSIDE + EFFECT DISPLACEMENT
   one star per closed form, an arm toward every note that plays, in nested layers, in the instrument's colour (brightness =
   pitch). An arm flares when its corner plays. It drifts as loud as the form plays (silent = still); each audio effect bends
   it in its own way, as hard as the effect is working. (The module keeps its old name, cloud.js: the load-order chain.)
   ========================================================= */
export const EFFECTS = [
  // key, label, modulated (has a sweep rate)
  ['comp', 'COMPRESSOR', false],
  ['dist', 'DISTORTION', false],
  ['crush', 'BITCRUSHER', false],
  ['chorus', 'CHORUS', true],
  ['flanger', 'FLANGER', true],
  ['phaser', 'PHASER', true],
  ['echo', 'ECHO', false],         // tempo-synced echo send (was: floating)
  ['lowcut', 'LOW CUT', false],    // high-pass 20 Hz … 5 kHz (was: sinking) — height is pitch now
];
export const FX_RATES = [0.25, 0.5, 1, 2, 4];
export const fxBlank = () => ({ comp: 0, dist: 0, crush: 0, chorus: 0, flanger: 0, phaser: 0, echo: 0, lowcut: 0 });
export const rateBlank = () => ({ chorus: 1, flanger: 2, phaser: 4 });

const MAXARM = 32, ECHOES = 3;
const premult = { transparent: true, depthTest: false, depthWrite: false, blending: THREE.CustomBlending,
  blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor };
const PALE = new THREE.Color('#efefea'), WHITE = new THREE.Color('#ffffff');

const starVS = `
  uniform float uTime, uDrift, uSeed, uComp, uPha, uPhaPh, uFlg, uFlgPh, uCho, uChoPh, uDist, uCrush, uLift, uHalfH;
  uniform vec3 uC; uniform float uArmA[${MAXARM}]; uniform float uArmF[${MAXARM}]; uniform int uArms; uniform float uArmW;
  varying vec3 vN; varying vec3 vV; varying float vFl; varying float vY;
  float h1(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  void main(){
    // the arm this vertex belongs to: it flares when its corner plays
    float th = atan(position.z, position.x), fl = 0.0;
    for (int i = 0; i < ${MAXARM}; i++) {
      if (i >= uArms) break;
      float d = abs(mod(th - uArmA[i] + 3.14159265, 6.2831853) - 3.14159265);
      fl = max(fl, uArmF[i] * exp(-d * d / (2.0 * uArmW * uArmW)));
    }
    vFl = fl; vY = position.y / uHalfH;                                                             // -1 bottom … 1 top
    vec4 w = modelMatrix * vec4(position, 1.0);
    w.y += uLift;                                                                                          // echo copies
    vec3 q = w.xyz - uC;
    float t = uTime;
    q += vec3(sin(t * 1.1 + w.y * 9.0 + uSeed), sin(t * 0.8 + w.z * 7.0 + uSeed * 1.7), sin(t * 0.9 + w.x * 8.0 + uSeed * 2.3)) * 0.018 * uDrift;
    float k = clamp(uComp, 0.0, 0.9); q.xz *= 1.0 - k * 0.35; q.y *= 1.0 - k * 0.3;                         // compressor: squeeze
    q.xz *= 1.0 + uFlg * 0.3 * sin(6.2832 * (length(q.xz) * 2.0 - uFlgPh));                                 // flanger: travelling bands
    float ang = uPha * 1.2 * sin(6.2832 * (length(q.xz) * 1.25 + uPhaPh));                                   // phaser: twist
    float ca = cos(ang), sa = sin(ang); q.xz = vec2(ca * q.x - sa * q.z, sa * q.x + ca * q.z);
    q.xz += uCho * 0.05 * vec2(cos(6.2832 * uChoPh + uSeed), sin(6.2832 * uChoPh + uSeed));                  // chorus: sway
    float st = floor(uTime * 20.0);
    q += (vec3(h1(position + st), h1(position.yzx + st * 1.3), h1(position.zxy + st * 1.7)) - 0.5) * uDist * 0.06;   // distortion
    w.xyz = uC + q;
    float cell = uCrush * 0.1; if (cell > 0.003) w.xyz = floor(w.xyz / cell + 0.5) * cell;                  // bitcrusher
    vec4 mv = viewMatrix * w; gl_Position = projectionMatrix * mv;
    vN = normalize(mat3(viewMatrix) * mat3(modelMatrix) * normal);
    vV = isOrthographic ? vec3(0.0, 0.0, 1.0) : normalize(-mv.xyz);
  }`;
// a glassy shell: colour gathers at its silhouette, so nested layers draw crisp contours
const starFS = `
  uniform vec3 uCol, uFlareCol, uPale; uniform float uA, uRest, uEdge, uLow;
  varying vec3 vN; varying vec3 vV; varying float vFl; varying float vY;
  void main(){
    if (vY < uLow * 2.0 - 1.0) discard;                                                // low cut: the bottom is cut away
    float ndv = abs(dot(normalize(vN), normalize(vV)));
    float a = uA * (0.1 + 0.9 * pow(1.0 - ndv, uEdge)) * smoothstep(0.0, 0.05, ndv) * (0.85 + 0.15 * vFl);
    vec3 c = mix(mix(uPale, uCol, uRest), uFlareCol, vFl);
    gl_FragColor = vec4(c * a, a);
  }`;

function starMat(seed) {
  return new THREE.ShaderMaterial({ vertexShader: starVS, fragmentShader: starFS, ...premult,
    uniforms: { uTime: { value: 0 }, uDrift: { value: 0 }, uSeed: { value: seed }, uC: { value: new THREE.Vector3() }, uLift: { value: 0 },
      uComp: { value: 0 }, uPha: { value: 0 }, uPhaPh: { value: 0 }, uFlg: { value: 0 }, uFlgPh: { value: 0 }, uCho: { value: 0 }, uChoPh: { value: 0 },
      uDist: { value: 0 }, uCrush: { value: 0 }, uLow: { value: 0 }, uHalfH: { value: 1 },
      uArmA: { value: new Float32Array(MAXARM) }, uArmF: { value: new Float32Array(MAXARM) }, uArms: { value: 0 }, uArmW: { value: 0.3 },
      uCol: { value: new THREE.Color() }, uFlareCol: { value: new THREE.Color() }, uPale: { value: PALE }, uA: { value: 1 }, uRest: { value: 1 }, uEdge: { value: 2 } } });
}

// an inflated star: a unit sphere whose footprint follows the arms (r = core … arm length), each arm leaning to its corner's height
function starGeo(arms, core, width, halfH) {
  const g = new THREE.SphereGeometry(1, 192, 48), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), th = Math.atan2(z, x);
    let r = core, lift = 0, best = 0;
    for (const a of arms) {
      const d = Math.abs(((th - a.ang + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
      const wgt = Math.exp(-(d * d) / (2 * width * width)), rr = core + (a.len - core) * wgt;
      if (rr > r) r = rr;
      if (wgt > best) { best = wgt; lift = a.dy * wgt; }
    }
    p.setXYZ(i, x * r, y * halfH + lift, z * r);
  }
  g.computeVertexNormals(); return g;
}

// the star group of a form: rebuilt when its corners, its rests or the star's shape sliders change
export function makeStar(s) {
  const g = new THREE.Group(); g.layers.set(L_STAR); s.group.add(g);
  s.star = { group: g, key: '', layers: [], echoes: [], arms: [], armFl: new Float32Array(MAXARM) };
}
function buildStar(s) {
  const S = s.star, R = s.ringL, n = s.n;
  const key = s.ringKey + '|' + [FX.starInner, FX.starArm, Math.round(FX.layers), FX.starThick, s.closed].join();
  if (key === S.key) return; S.key = key;
  [...S.layers, ...S.echoes].forEach(m => { S.group.remove(m); m.material.dispose(); });
  if (S.geo) S.geo.dispose();
  S.layers = []; S.echoes = []; S.geo = null;
  if (!s.closed) return;                                            // an open curve has no inside
  const c = new THREE.Vector3(); R.forEach(v => c.add(v)); c.divideScalar(n);
  // an arm toward every note that plays (muted notes have none)
  S.arms = s.notes.map((nt, k) => ({ nt, k, p: s.notePos(k, new THREE.Vector3()) })).filter(a => !a.nt.mute).map(({ k, p }) => ({ k,
    ang: Math.atan2(p.z - c.z, p.x - c.x), len: Math.hypot(p.x - c.x, p.z - c.z), dy: p.y - c.y })).slice(0, MAXARM);
  const mean = R.reduce((acc, v) => acc + Math.hypot(v.x - c.x, v.z - c.z), 0) / n;
  const halfH = (s.maxT - s.minB) / 2 * FX.starThick;
  S.geo = starGeo(S.arms, FX.starInner * mean, FX.starArm, Math.max(halfH, 1e-3));
  S.centre = c; S.halfH = halfH;
  const L = Math.max(1, Math.round(FX.layers));
  for (let i = 0; i < L + ECHOES; i++) {
    const m = new THREE.Mesh(S.geo, starMat(s.id * 1.7 + i * 0.7));
    m.layers.set(L_STAR); m.frustumCulled = false; m.position.copy(c);
    const u = m.material.uniforms; u.uArms.value = S.arms.length; S.arms.forEach((a, j) => u.uArmA.value[j] = a.ang);
    S.group.add(m); (i < L ? S.layers : S.echoes).push(m);
  }
}
// a corner played: its arm flares
export function starHit(s, k) { const j = s.star.arms.findIndex(a => a.k === k); if (j >= 0) s.star.armFl[j] = 1; }
export function starClear(s) { s.star.armFl.fill(0); }

// per frame: what the effects are doing right now, and the star's look
export function syncStar(s, dt, idle, barsV) {
  const document = SOUNDS[s.sound]?.sculpt;
  s.star.group.visible = !document;
  if (document) {
    s.sculpture ??= new BoxSculpture(s.group, L_SHARP);
    s.sculpture.setDocument(document);
    s.sculpture.fit(s.mesh.geometry.boundingBox, s.group.getWorldScale(new THREE.Vector3()), {
      idle, focus: s.focus, pixelRatio: renderer.getPixelRatio(),
    });
    return;
  }
  if (s.sculpture) { s.sculpture.dispose(); s.sculpture = null; }
  buildStar(s);
  const S = s.star, fx = s.fx, rt = s.fxRate;
  if (!S.layers.length) return;
  const col = boostSat(pitchColor(familyOf(s.sound).hex, semisOf(s), S.col ??= new THREE.Color()), s.focus);   // grey off the work plane
  const flareCol = (S.flareCol ??= new THREE.Color()).copy(col).lerp(WHITE, 0.35);
  const tau = Math.max(0.01, FX.litFade * 1.6);
  for (let j = 0; j < S.arms.length; j++) S.armFl[j] *= Math.exp(-dt / tau);
  // the compressor squeezes by how much gain it is actually taking away
  const red = s.chain?.fx ? -s.chain.fx.comp.reduction : 0;
  s.compEnv = Math.max(clamp(red / 10, 0, 1), (s.compEnv ?? 0) * 0.86);
  const ph = k => ((barsV / rt[k]) % 1 + 1) % 1, drift = FX.drift * audio.level(s);
  const cw = S.centre.clone().applyMatrix4(s.group.matrixWorld);
  const L = S.layers.length, ws = s.group.getWorldScale(new THREE.Vector3());
  const echoes = fx.echo > 0.005;
  [...S.layers, ...S.echoes].forEach((m, i) => {
    const echo = i >= L, e = i - L + 1;
    m.visible = !echo || echoes;
    if (!m.visible) return;
    const sc = echo ? 1 : Math.max(0.05, 1 - i * FX.layerGap);
    m.scale.set(FX.starSize * sc, sc, FX.starSize * sc);
    const u = m.material.uniforms;
    u.uTime.value = cloudT; u.uHalfH.value = Math.max(S.halfH, 1e-3); u.uDrift.value = drift; u.uC.value.copy(cw);
    u.uLift.value = echo ? fx.echo * 0.45 * (S.halfH * 2 + 0.3) * Math.abs(ws.y) * e : 0;
    u.uA.value = FX.organA * (echo ? Math.pow(0.5, e) * Math.min(1, fx.echo * 4) : (L > 1 ? 0.6 + 0.4 * i / (L - 1) : 1)) * (idle ? 0.4 : 1);
    u.uRest.value = FX.restCol; u.uEdge.value = FX.starEdge; u.uArmW.value = FX.starArm;
    u.uCol.value.copy(col); u.uFlareCol.value.copy(flareCol);
    for (let j = 0; j < S.arms.length; j++) u.uArmF.value[j] = S.armFl[j] * FX.organFlare;
    u.uComp.value = fx.comp * (0.3 + 0.7 * s.compEnv);
    u.uCho.value = fx.chorus; u.uChoPh.value = ph('chorus');
    u.uFlg.value = fx.flanger; u.uFlgPh.value = ph('flanger');
    u.uPha.value = fx.phaser; u.uPhaPh.value = ph('phaser');
    u.uDist.value = fx.dist; u.uCrush.value = fx.crush; u.uLow.value = fx.lowcut * 0.9;
  });
}
