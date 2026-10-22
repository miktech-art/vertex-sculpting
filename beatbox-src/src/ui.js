// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './edit.js';
import { $, PALETTE, SOUNDS, NOTE_NAMES, MODES, familyOf, settings, noteName, noteFor, semisOf, UNITS_PER_BAR, V3,
  barLen, clamp, FX, saveFx, FX_DEFAULT, work } from './core.js';
import { scene, canvas } from './render.js';
import { setCorners, shapes } from './shape.js';
import { EFFECTS, FX_RATES } from './cloud.js';
import { audio, rec, stopRec, startRec, download } from './audio.js';
import { setViewMode, frameVerts, frameObjects, viewMode, viewAnim, topAnim, trans, view, panBy,
  zoomBy, animateView, setViewAnim, setTopAnim } from './view.js';
import { PRESETS, selected, active, pushUndo, mode, setMode, updateGumball, clearMotion, unstack, deleteSel,
  togglePlay, toggleEdit, linkSel, unlinkSel, setSelMode, setGum, poly, cancelTool, startPoly, addPreset, addPrism, flashMsg, modal, endModal,
  playing, started, mouse, toScreen, finishPoly, addPolyPoint, undoPolyPoint, setLastSound, updatePolyPreview, setAddAt, tc,
  updateModal, pickObject, select, pickEdit, selMode, edgesOf, lastPick, startMotionRec, mrec,
  finishMotionRec, redo, undo, copySel, pasteClip, invertSel, selectNone, selectAll, startModal, duplicateSel,
  clickNotes, startNoteDrag, muteNotes, deleteNotes, pickNote,
  place, placeClick, finishPlace, cancelPlace, undoPlace, updatePlacePreview,
  resetPhases, setActive, setLastPick, setPlane, octaveSel } from './edit.js';
import { begin } from './scene.js';
import { fxPulseT, setFxPulseT } from './loop.js';

/* =========================================================
   PROPERTIES PANEL
   ========================================================= */
(() => {
  $('pSw').innerHTML = PALETTE.map(f => `<button class="sw" data-fam="${f.key}" title="${f.label}" style="--c:${f.hex}"></button>`).join('');
  $('keySel').innerHTML = NOTE_NAMES.map((n, i) => `<option value="${i}">${n}</option>`).join('');
  $('modeSel').innerHTML = MODES.map((m, i) => `<option value="${i}">${m[0]} · ${m[1]}</option>`).join('');
  $('presetList').innerHTML = Object.entries(PRESETS).map(([k, p]) => {
    const f = familyOf(p.make().sound);
    return `<button data-preset="${k}"><span style="color:var(--fg)"><i style="background:${f.hex}"></i>${p.label}</span><span>${p.desc}</span></button>`;
  }).join('');
})();
const targets = () => (selected.size ? [...selected] : (active ? [active] : []));
$('pFx').innerHTML = EFFECTS.map(([k, l, m]) => `<div class="fader"><div class="top"><span>${l}</span><span style="display:flex;gap:8px;align-items:center"><span id="pfxv_${k}">0%</span>${m ? `<select id="pfxr_${k}" style="padding:1px 3px;font-size:9px">${FX_RATES.map(r => `<option value="${r}">${r < 1 ? '1/' + (1 / r) : r} BAR</option>`).join('')}</select>` : ''}</span></div><input type="range" id="pfx_${k}" min="0" max="1" step="0.01"></div>`).join('');
EFFECTS.forEach(([k, , m]) => {
  const el = $('pfx_' + k);
  el.addEventListener('input', () => { targets().forEach(s => s.fx[k] = +el.value); refreshPanel(); });
  el.addEventListener('change', () => { pushUndo(); el.blur(); });
  el.addEventListener('dblclick', () => { targets().forEach(s => s.fx[k] = 0); pushUndo(); refreshPanel(); });
  if (m) $('pfxr_' + k).addEventListener('change', e => { targets().forEach(s => s.fxRate[k] = +e.target.value); pushUndo(); refreshPanel(); e.target.blur(); });
});

// lengths in bars, written as musicians count them; anything off the 1/16 grid is flagged
export function fmtBars(b) {
  const six = b * 16, n = Math.round(six);
  if (Math.abs(six - n) > 0.03) return `${b.toFixed(3)} BAR · OFF GRID`;
  if (n === 0) return '0';
  const whole = Math.floor(n / 16); let rem = n % 16, den = 16;
  while (rem && rem % 2 === 0 && den > 1) { rem /= 2; den /= 2; }
  const frac = rem ? `${rem}/${den}` : '';
  if (!whole) return `${frac} BAR`;
  return `${whole}${frac ? ' + ' + frac : ''} BAR${whole > 1 || frac ? 'S' : ''}`;
}
export function refreshPanel() {
  const s = active;
  $('pEmpty').style.display = s ? 'none' : ''; $('pBody').style.display = s ? '' : 'none';
  if (!s) return;
  const multi = selected.size > 1;
  $('pName').textContent = s.name + (multi ? `  +${selected.size - 1}` : '');
  const fam = familyOf(s.sound);
  document.querySelectorAll('#pSw .sw').forEach(b => b.classList.toggle('on', b.dataset.fam === fam.key));
  $('pFam').textContent = fam.label;
  $('pMute').checked = s.mute;
  $('pNotes').textContent = notesText(s);
  const tk = Object.entries(s.tracks).map(([k, t]) => `${{ obj: 'OBJECT', verts: 'VERTS', notes: 'NOTES' }[k]} ${t.len < 1 ? t.len * 4 + ' BEAT' : t.len + ' BAR'}`);
  $('pMotion').textContent = tk.length ? tk.join(' · ') : 'NONE · R WHILE DRAGGING';
  $('pMotionClear').style.display = tk.length ? '' : 'none';
  EFFECTS.forEach(([k, , m]) => {
    if (document.activeElement !== $('pfx_' + k)) $('pfx_' + k).value = s.fx[k];
    $('pfxv_' + k).textContent = Math.round(s.fx[k] * 100) + '%';
    if (m && document.activeElement !== $('pfxr_' + k)) $('pfxr_' + k).value = s.fxRate[k];
  });
  $('pCorners').textContent = s.n;
  refreshLoopInfo();
}
// the notes of one cycle, in order (rests left out, repeats folded): names for synth and bass, semitones for the drums
function notesText(s) {
  const named = SOUNDS[s.sound].root !== undefined, seq = [];
  for (const { k } of s.hits().sort((a, b) => (a.t + s.phaseOff) % 1 - (b.t + s.phaseOff) % 1)) {
    if (s.notes[k].mute) continue;
    const st = semisOf(s, k), t = named ? noteName(noteFor(s, k)) : st ? `${st > 0 ? '+' : ''}${st} ST` : 'ORIGINAL';
    const last = seq.at(-1);
    if (last && last.t === t) last.c++; else seq.push({ t, c: 1 });
  }
  const parts = seq.map(x => x.c > 1 ? `${x.t} ×${x.c}` : x.t);
  return !parts.length ? '—' : parts.length > 6 ? parts.slice(0, 6).join(' · ') + ' …' : parts.join(' · ');
}
function describe(s) {
  const F = s.feat; if (!F) return '';
  const out = [SOUNDS[s.sound].label];
  const steps = s.notes.filter(n => !n.mute).length, rests = s.notes.length - steps;
  out.push(!steps ? 'SILENT' : `${steps} STEPS` + (rests ? ` · ${rests} REST${rests > 1 ? 'S' : ''}` : ''));
  if (!s.closed) out.push('THERE AND BACK');
  if (s.phaseOff) out.push(`STARTS ${fmtBars(s.phaseOff * s.loopBars())} LATE`);
  const L = [...s.L].slice(0, s.segs()), mL = L.reduce((a, b) => a + b, 0) / L.length;
  if (mL > 0 && L.some(l => Math.abs(l - mL) / mL > 0.08)) out.push('SWING');
  if (new Set(s.notes.map((n, k) => noteFor(s, k))).size > 1) out.push('MELODY');
  if (F.room > 0.05) out.push('ROOM');
  EFFECTS.forEach(([k, l]) => { if (s.fx[k] > 0.005) out.push(`${l} ${Math.round(s.fx[k] * 100)}%`); });
  return out.join(' · ');
}
export function refreshLoopInfo() {
  const s = active; if (!s) return;
  const b = s.loopBars();
  $('pLoop').textContent = `${fmtBars(b)} · ${(b * barLen()).toFixed(2)} S`;
  const ch = s.stack, T = ch.reduce((a, f) => a + f.stL, 0);
  $('pStack').textContent = ch.length > 1 ? `${s.stackIdx + 1} / ${ch.length} · ${fmtBars(T)}` : 'SINGLE';
  $('pUnstack').style.display = s.below != null ? '' : 'none';
  $('pChar').textContent = describe(s);
}
// a swatch picks the instrument; stems stay stems where the family has one
document.querySelectorAll('#pSw .sw').forEach(b => b.addEventListener('click', () => {
  const fam = PALETTE.find(f => f.key === b.dataset.fam);
  targets().forEach(s => { s.sound = fam.sounds[0]; }); setLastSound(fam.sounds[0]);
  pushUndo(); refreshPanel(); if (active) audio.preview(active);
}));
$('pMute').addEventListener('change', e => { targets().forEach(s => s.mute = e.target.checked); pushUndo(); e.target.blur(); });

function cornersTo(n) {
  if (mode === 'edit') setMode('object');
  const ts = targets(); if (!ts.length) return;
  ts.forEach(s => setCorners(s, n));
  scene.updateMatrixWorld(true); updateGumball(); refreshPanel();
  pushUndo();
}
$('pNminus').addEventListener('click', () => active && cornersTo(active.n - 1));
$('pNplus').addEventListener('click', () => active && cornersTo(active.n + 1));
$('pMotionClear').addEventListener('click', clearMotion);
$('pUnstack').addEventListener('click', () => unstack(active));
const delAny = () => { if (mode === 'edit') setMode('object'); deleteSel(); };
$('pDelete').addEventListener('click', delAny);
$('delBtn').addEventListener('click', delAny);
$('keySel').addEventListener('change', e => { settings.key = +e.target.value; refreshPanel(); e.target.blur(); });
$('modeSel').addEventListener('change', e => { settings.mode = +e.target.value; refreshPanel(); e.target.blur(); });
$('gBpm').addEventListener('input', e => {
  settings.bpm = +e.target.value; $('gBpmV').textContent = settings.bpm;
  if (audio.ctx) audio.delay.delayTime.setTargetAtTime(0.75 * 60 / settings.bpm, audio.ctx.currentTime, 0.05);
});
$('gBpm').addEventListener('change', e => e.target.blur());
$('playBtn').addEventListener('click', () => togglePlay());
$('recBtn').addEventListener('click', () => rec.on ? stopRec() : startRec());
$('expVid').addEventListener('click', () => rec.video && download(rec.video, rec.video.type.includes('mp4') ? 'mp4' : 'webm'));
$('expWav').addEventListener('click', () => rec.wav && download(rec.wav, 'wav'));
$('modeBtn').addEventListener('click', toggleEdit);
document.querySelectorAll('#selModes button').forEach(b => b.addEventListener('click', () => setSelMode(b.dataset.sm)));
$('mirrorBtn').addEventListener('click', () => { settings.mirror = !settings.mirror; $('mirrorBtn').classList.toggle('on', settings.mirror); });
document.querySelectorAll('#tools [data-gum]').forEach(b => b.addEventListener('click', () => setGum(b.dataset.gum)));
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setViewMode(b.dataset.view)));
$('snapBtn').addEventListener('click', () => { settings.snap = !settings.snap; $('snapBtn').classList.toggle('on', settings.snap); updateGumball(); });
$('frameBtn').addEventListener('click', () => mode === 'edit' ? frameVerts() : frameObjects(selected.size ? [...selected] : shapes));
$('padBtn').addEventListener('click', () => { settings.trackpad = !settings.trackpad; $('padBtn').classList.toggle('on', settings.trackpad); setHint(); });
$('polyBtn').addEventListener('click', () => poly ? finishPoly(false) : startPoly());
$('addBtn').addEventListener('click', e => { const r = e.target.getBoundingClientRect(); setAddAt(innerWidth / 2, innerHeight / 2); openAddMenu(r.right + 10, r.top); });
$('helpBtn').addEventListener('click', () => toggleHelp());
$('helpClose').addEventListener('click', () => toggleHelp(false));

function openAddMenu(x, y) {
  const m = $('addMenu'); m.style.display = 'block';
  m.style.left = Math.min(x, innerWidth - 290) + 'px'; m.style.top = Math.max(10, Math.min(y, innerHeight - m.offsetHeight - 10)) + 'px';
}
function closeAddMenu() { $('addMenu').style.display = 'none'; }
document.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => { closeAddMenu(); addPreset(b.dataset.preset); }));
document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
  closeAddMenu(); const k = b.dataset.add; if (k === 'poly') startPoly(); else addPrism(k);
}));
document.addEventListener('pointerdown', e => { if (!e.target.closest('#addMenu') && !e.target.closest('#addBtn')) closeAddMenu(); });
/* =========================================================
   SHADER MENU (N) — everything pauses while you tune the look
   ========================================================= */
// a tuning tool for the look defaults (FX_DEFAULT), not a feature: dev and debug builds only
const LOOK_MENU = import.meta.env.DEV || import.meta.env.MODE === 'debug';
export let fxOpen = false, fxPreview = 'rest', fxWasPlaying = false;
const pct = v => Math.round(v * 100) + '%', px = d => v => v.toFixed(d) + ' PX', x2 = v => '×' + v.toFixed(2);
const FX_SPEC = [
  ['HALO = REVERB · FLOOR GLOW', [['haloStr', 'STRENGTH', 0, 2.5, 0.01, x2], ['haloSize', 'SIZE', 0.3, 2.5, 0.01, x2], ['floor', 'FLOOR GLOW · WHERE A STACK STANDS', 0, 1, 0.01, pct]]],
  ['LINE WEIGHTS', [['pathW', 'PATH CURVE', 0.5, 5, 0.1, px(1)], ['pathA', 'PATH OPACITY', 0, 1, 0.01, pct], ['beadSize', 'BEADS · STEP / REST', 2, 16, 0.5, px(1)], ['connW', 'STACK CONNECTORS', 0.4, 4, 0.1, px(1)]]],
  ['VOID', [['bg', 'GREY', 0.5, 1, 0.005, pct]]],
  ['FOCUS · EDIT MODE', [['focusBlur', 'BLUR AROUND THE EDITED FORM', 0, 4, 0.05, x2]]],
  ['MILK · THE VOLUME', [['milkDen', 'DENSITY', 0, 4, 0.01, x2], ['milkMax', 'OPACITY', 0, 1, 0.01, pct], ['warm', 'WARMER WITH THICKNESS', 0, 2, 0.01, x2],
    ['milkBlur', 'SOFTNESS', 0, 8, 0.1, px(1)], ['rim', 'RIM', 0, 6, 0.05, x2], ['shadow', 'SHADOW', 0, 1, 0.01, pct], ['shadowOff', 'SHADOW OFFSET', 0, 20, 0.5, px(1)]]],
  ['SATURATION', [['satRest', 'DEFAULT', 0, 1, 0.01, pct, 'rest'], ['satFull', 'FULL · ON HIT', 0.3, 1.6, 0.01, pct, 'hit']]],
  ['STAR · INSTRUMENT COLOUR', [['organA', 'OPACITY', 0, 1, 0.01, pct], ['starSize', 'SIZE', 0.2, 1.2, 0.01, x2], ['starInner', 'CORE', 0.05, 0.8, 0.01, x2],
    ['starArm', 'ARM WIDTH', 0.05, 0.8, 0.01, x2], ['starThick', 'THICKNESS', 0.1, 1, 0.01, x2], ['layers', 'LAYERS', 1, 6, 1, v => String(v)],
    ['layerGap', 'LAYER STEP', 0.05, 0.4, 0.01, x2], ['starEdge', 'EDGE CRISPNESS', 0.5, 6, 0.1, x2], ['drift', 'DRIFT · AT FULL LEVEL', 0, 3, 0.01, x2],
    ['organBlur', 'SOFTNESS', 0, 6, 0.05, px(2)], ['veil', 'SEEN THROUGH MILK', 0, 1, 0.01, pct], ['restCol', 'COLOUR AT REST', 0, 1, 0.01, pct, 'rest'],
    ['organFlare', 'ARM FLARE ON HIT', 0, 1, 0.01, pct, 'hit']]],
  ['DOT · INK', [['dotSize', 'DOT', 3, 20, 0.5, px(1)], ['lit', 'LIGHT-UP ON A CORNER', 0, 2, 0.01, x2, 'hit'],
    ['litFade', 'LIGHT-UP FADE', 0.02, 1, 0.01, v => Math.round(v * 1000) + ' MS', 'pulse'], ['trail', 'TRAIL', 0, 4, 0.05, v => v.toFixed(2) + ' BEAT'],
    ['trailW', 'TRAIL WIDTH', 1, 24, 0.5, px(1)], ['inkBlur', 'BLEED SOFTNESS', 0, 8, 0.1, px(1)], ['bleed', 'BLEED', 0, 1.5, 0.01, x2],
    ['core', 'CRISP CORE', 0, 6, 0.1, px(1)], ['pool', 'INK POOL AT A CORNER', 0, 4, 0.05, v => v.toFixed(2) + ' BEAT', 'pulse']]],
  ['GRID · 1/16 DOTS', [['field', 'DOT FIELD IN EVERY CELL', 0, 1, 0.01, pct]]],
];
$('fxBody').innerHTML = FX_SPEC.map(([t, rows]) => `<div class="sec">— ${t}</div>` + rows.map(([k, l, mn, mx, st]) =>
  `<div class="fader"><div class="top"><span>${l}</span><span id="fxv_${k}"></span></div><input type="range" id="fx_${k}" min="${mn}" max="${mx}" step="${st}"></div>`).join('')).join('');
function refreshFx() {
  FX_SPEC.forEach(([, rows]) => rows.forEach(([k, , , , , fmt]) => { const el = $('fx_' + k); if (document.activeElement !== el) el.value = FX[k]; $('fxv_' + k).textContent = fmt(FX[k]); }));
  document.querySelectorAll('[data-pv]').forEach(b => b.classList.toggle('on', b.dataset.pv === fxPreview));
}
function setPreview(p) { fxPreview = p; setFxPulseT(1e9); refreshFx(); }
FX_SPEC.forEach(([, rows]) => rows.forEach(([k, , , , , , pv]) => {
  const el = $('fx_' + k);
  el.addEventListener('input', () => { FX[k] = +el.value; if (pv && fxPreview !== pv) setPreview(pv); refreshFx(); saveFx(); });
  el.addEventListener('change', () => el.blur());
}));
document.querySelectorAll('[data-pv]').forEach(b => b.addEventListener('click', () => setPreview(b.dataset.pv)));
$('fxReset').addEventListener('click', () => { Object.assign(FX, FX_DEFAULT); saveFx(); refreshFx(); });
$('fxCopy').addEventListener('click', () => {
  const t = JSON.stringify(Object.fromEntries(Object.entries(FX).map(([k, v]) => [k, +v.toFixed(3)])));
  const ok = () => flashMsg('LOOK SETTINGS COPIED · PASTE THEM TO MAKE THEM THE DEFAULTS');
  const fallback = () => { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { flashMsg(t, 8000); } ta.remove(); };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(t).then(ok, fallback); else fallback();
});
$('fxClose').addEventListener('click', () => toggleFx(false));
function toggleFx(force) {
  const on = LOOK_MENU && (force ?? !fxOpen);
  if (on === fxOpen) return;
  if (on) {
    if (modal) endModal(false);
    if (poly) cancelTool();
    fxWasPlaying = playing; if (playing) togglePlay(false);
    fxOpen = true; fxPreview = 'rest';
    $('fx').style.display = 'block'; $('tools').style.display = 'none';
    refreshFx();
  } else {
    fxOpen = false; shapes.forEach(s => s.flare = 0); saveFx();
    $('fx').style.display = 'none'; $('tools').style.display = '';
    if (fxWasPlaying) togglePlay(true);
  }
  updateGumball(); setHint();
}

function toggleHelp(force) { const h = $('help'); const on = force ?? h.style.display !== 'flex'; h.style.display = on ? 'flex' : 'none'; }

/* =========================================================
   STATUS / HINTS
   ========================================================= */
const K = (k, d) => `<span><b>${k}</b> ${d}</span>`;
export function setHint() {
  let h;
  if (fxOpen) h = [K('N / ESC', 'CLOSE & RESUME'), K('REST · HIT · PULSE', 'PREVIEW'), K('MMB / WHEEL', 'LOOK AROUND'), K('RESET · COPY', 'DEFAULTS · SHARE VALUES')];
  else if (place) h = [K('LMB ON THE OUTLINE', 'PLACE A NOTE · SNAPS 1/16'), K('LMB ON A NOTE', 'TAKE IT AWAY'), K('ENTER / RMB', 'DONE'), K('⌫', 'UNDO NOTE'), K('CTRL', settings.snap ? 'FREE' : 'SNAP'), K('ESC', 'DROP THE FORM')];
  else if (poly) h = [K('LMB', 'PLACE POINT · PLAYS AS YOU DRAW'), K('CLICK 1ST POINT', 'CLOSE = LOOP'), K('ENTER / RMB', 'DONE · OPEN = THERE AND BACK'), K('⌫', 'UNDO POINT'), K('CTRL', settings.snap ? 'FREE' : 'SNAP'), K('ESC', 'CANCEL')];
  else if (mode === 'edit' && selMode === 'p') h = [K('1/2/3', 'POINTS/VERTS/EDGES'), K('LMB ON THE PATH', 'ADD A NOTE'), K('LMB ON A NOTE', 'SELECT · ⇧ ADD'), K('DRAG / G', 'SLIDE · SNAPS 1/16'), K('Z', 'NOTE UP / DOWN'), K('M', 'MUTE'), K('X', 'DELETE'), K('R WHILE DRAGGING', 'LOOP MOTION'), K('TAB', 'OBJECT MODE')];
  else if (mode === 'edit') h = [K('1/2/3', 'POINTS/VERTS/EDGES'), K('LMB', 'SELECT'), K('A', 'ALL'), K('G/R/S', 'GRAB/ROT/SCALE · RESHAPE'), K('R WHILE DRAGGING', 'LOOP MOTION'), K('TAB', 'OBJECT MODE')];
  else if (viewMode === 'top') h = [K('LMB', 'SELECT · CLICK AGAIN TO CYCLE'), K('⇧A', 'ADD'), K('POLYGON', 'DRAW ON THE GRID'), K('S', 'SCALE · SNAPS TO 1/16'), K('TAB', 'EDIT'), K('MMB / WHEEL', 'PAN / ZOOM'), K('NUM 5', '3D'), K('SPACE', 'PLAY')];
  else h = [K('LMB', 'SELECT'), K('⇧A', 'ADD'), K('G', 'MOVE'), K('CTRL LMB · CTRL L', 'LINK IN CLICK ORDER'), K('TAB', 'EDIT'),
    settings.trackpad ? K('2-FINGER', 'ORBIT · ⇧ PAN · PINCH ZOOM') : K('MMB', 'ORBIT · ⇧ PAN'), K('ALT WHEEL', 'PLANE'), K('NUM 7', 'TOP'), K('SPACE', 'PLAY')];
  $('hint').innerHTML = h.join('');
}
const KEYS = [
  ['NAVIGATE', [['NUMPAD 7 · 5', 'TOP · 3D'], ['MMB DRAG', 'ORBIT (3D) · PAN (TOP)'], ['⇧ + MMB', 'PAN'], ['WHEEL', 'ZOOM'], ['ALT + WHEEL', 'WORK PLANE · OCTAVE UP / DOWN'], ['ALT + LMB', 'ORBIT (NO MMB)'], ['NUMPAD . / HOME', 'FRAME SEL / ALL']]],
  ['FORMS & STACKS', [['LMB / ⇧ OR CTRL LMB', 'SELECT / ADD (IN ORDER)'], ['⇧ A', 'ADD (1 BAR) · THEN PLACE NOTES · ENTER'], ['G · R · S', 'MOVE · ROTATE · SCALE'], ['→ X / Y / Z', 'LOCK AXIS (⇧ = PLANE)'], ['CTRL L', 'LINK LOOPS · PLAY IN CLICK ORDER'], ['ALT L · UNSTACK', 'TAKE A LOOP OUT'], ['HEIGHT', 'PITCH · A PLANE PER OCTAVE'], ['↑ · ↓', 'FORM AN OCTAVE UP · DOWN (THE PLANE FOLLOWS)'], ['G UP / DOWN', 'WHOLE FORM: OCTAVE · EDIT: SCALE STEP'], ['⇧ D · CTRL C/V', 'DUPLICATE · COPY/PASTE'], ['X / DEL · CTRL Z', 'DELETE · UNDO']]],
  ['EDIT & SOUND', [['TAB / DBL-CLICK', 'EDIT MODE'], ['1 · 2 · 3', 'POINTS · VERTS · EDGES'], ['A · ALT A · CTRL I', 'ALL · NONE · INVERT'], ['LMB ON THE PATH (1)', 'ADD A NOTE · LMB NOTE SELECT'], ['DRAG / G · THEN Z', 'SLIDE · NOTE UP / DOWN'], ['CTRL WHILE MOVING', 'INVERT SNAP'], ['M · X (POINTS)', 'MUTE · DELETE NOTES'], ['R WHILE DRAGGING', 'RECORD MOTION LOOP'], ['ALT R', 'CLEAR MOTION'], ['SPACE · ⇧ ←', 'PLAY · RESTART'], ...(LOOK_MENU ? [['N', 'SHADER MENU · PAUSES']] : []), ['⇧ N · T · F1', 'PANELS · THIS SHEET']]],
];
const keysHTML = KEYS.map(([t, rows]) => `<div style="display:block;border:none;padding:0"><h4>${t}</h4>${rows.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>`).join('');
$('keysStart').innerHTML = keysHTML; $('keysHelp').innerHTML = keysHTML;

/* =========================================================
   INPUT
   ========================================================= */
export let nav = null, boxSel = null, mouseCtrl = false;
canvas.addEventListener('contextmenu', e => e.preventDefault());

canvas.addEventListener('pointerdown', e => {
  if (!started) return;
  canvas.focus();
  mouse.x = e.clientX; mouse.y = e.clientY; mouseCtrl = e.ctrlKey || e.metaKey;
  if (modal) { endModal(e.button === 0); return; }
  if (e.button === 1 || (e.button === 0 && e.altKey)) {
    setViewAnim(null); setTopAnim(null);
    nav = { type: (e.shiftKey || viewMode === 'top') ? 'pan' : (e.ctrlKey ? 'zoom' : 'orbit'), x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId); e.preventDefault(); return;
  }
  if (trans || fxOpen) return;
  if (place) {
    if (e.button === 2) finishPlace(); else if (e.button === 0) placeClick(e.clientX, e.clientY);
    return;
  }
  if (poly) {
    if (e.button === 2) { finishPoly(false); return; }   // Rhino: right click = done
    if (e.button === 0) addPolyPoint(e.clientX, e.clientY);
    return;
  }
  if (e.button !== 0) return;
  if (tc.dragging || tc.axis !== null) return;   // gumball handles it
  if (mode === 'edit' && selMode === 'p' && !e.ctrlKey && startNoteDrag(e.clientX, e.clientY, e.shiftKey)) return;   // press on a note: drag it
  boxSel = { x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY, moved: false, shift: e.shiftKey, ctrl: e.ctrlKey || e.metaKey };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', e => {
  mouse.x = e.clientX; mouse.y = e.clientY; mouseCtrl = e.ctrlKey || e.metaKey;
  if (modal) { updateModal(); return; }
  if (poly) updatePolyPreview();
  if (place) updatePlacePreview();
  if (nav) {
    const dx = e.clientX - nav.x, dy = e.clientY - nav.y; nav.x = e.clientX; nav.y = e.clientY;
    if (nav.type === 'orbit') { view.theta -= dx * 0.006; view.phi = clamp(view.phi - dy * 0.006, 0.001, Math.PI - 0.001); }
    else if (nav.type === 'pan') panBy(dx, dy);
    else zoomBy(Math.exp(dy * 0.006));
    return;
  }
  if (boxSel) {
    boxSel.x1 = e.clientX; boxSel.y1 = e.clientY;
    if (!boxSel.moved && Math.hypot(boxSel.x1 - boxSel.x0, boxSel.y1 - boxSel.y0) > 5) boxSel.moved = true;
    if (boxSel.moved) {
      const b = $('box'); b.style.display = 'block';
      b.style.left = Math.min(boxSel.x0, boxSel.x1) + 'px'; b.style.top = Math.min(boxSel.y0, boxSel.y1) + 'px';
      b.style.width = Math.abs(boxSel.x1 - boxSel.x0) + 'px'; b.style.height = Math.abs(boxSel.y1 - boxSel.y0) + 'px';
    }
  }
});
canvas.addEventListener('pointerup', e => {
  if (nav) { nav = null; return; }
  if (modal && modal.drag && e.button === 0) { endModal(true); return; }
  if (!boxSel) return;
  const b = boxSel; boxSel = null; $('box').style.display = 'none';
  if (b.moved) doBoxSelect(b); else doClickSelect(e.clientX, e.clientY, b.shift || (b.ctrl && mode === 'object'));
});
function doClickSelect(x, y, shift) {
  if (mode === 'object') {
    const h = pickObject(x, y);
    select(h ? h.shape : null, shift);
  } else if (selMode === 'p') clickNotes(x, y, shift);
  else {
    const ids = pickEdit(x, y), sel = active.editSel;
    if (!ids) { if (!shift) sel.clear(); }
    else if (shift) { const all = ids.every(i => sel.has(i)); ids.forEach(i => all ? sel.delete(i) : sel.add(i)); }
    else { sel.clear(); ids.forEach(i => sel.add(i)); }
    updateGumball();
  }
}
function doBoxSelect(b) {
  const x0 = Math.min(b.x0, b.x1), x1 = Math.max(b.x0, b.x1), y0 = Math.min(b.y0, b.y1), y1 = Math.max(b.y0, b.y1);
  const inside = q => q.z < 1 && q.x >= x0 && q.x <= x1 && q.y >= y0 && q.y <= y1;
  if (mode === 'object') {
    if (!b.shift && !b.ctrl) selected.clear();
    shapes.forEach(s => {
      const mw = s.group.matrixWorld;
      const hit = [...Array(s.n * 2).keys()].some(i => inside(toScreen(s.vert(i).clone().applyMatrix4(mw))));
      if (hit) { if (b.ctrl) selected.delete(s); else { selected.add(s); setActive(s); } }
    });
    if (!selected.has(active)) setActive([...selected].pop() ?? null);
  } else if (selMode === 'p') {
    const s = active, mw = s.group.matrixWorld;
    if (!b.shift && !b.ctrl) s.noteSel.clear();
    s.notes.forEach((n, k) => { if (inside(toScreen(s.notePos(k, V3()).applyMatrix4(mw)))) b.ctrl ? s.noteSel.delete(k) : s.noteSel.add(k); });
  } else {
    const s = active, mw = s.group.matrixWorld;
    if (!b.shift && !b.ctrl) s.editSel.clear();
    const inV = [...Array(s.n * 2).keys()].filter(i => inside(toScreen(s.vert(i).clone().applyMatrix4(mw))));
    let ids = inV;
    if (selMode === 'e') { const set = new Set(inV); ids = edgesOf(s).filter(([a, c]) => set.has(a) && set.has(c)).flat(); }
    ids.forEach(i => b.ctrl ? s.editSel.delete(i) : s.editSel.add(i));
  }
  updateGumball(); refreshPanel();
}
canvas.addEventListener('dblclick', e => {
  if (!started || modal || poly || place || trans) return;
  if (mode === 'object') { setLastPick(null); const h = pickObject(e.clientX, e.clientY); if (h) { select(h.shape, false); setMode('edit'); } }
  else if (selMode === 'p' ? pickNote(e.clientX, e.clientY) < 0 : !pickEdit(e.clientX, e.clientY)) setMode('object');
});
let planeAcc = 0, planeT = 0;
canvas.addEventListener('wheel', e => {
  e.preventDefault(); if (!started) return;
  if (e.altKey) {                                     // one notch = one octave (a trackpad has to travel about as far)
    const d = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
    if (performance.now() - planeT > 300) planeAcc = 0;
    planeT = performance.now(); planeAcc += d;
    if (Math.abs(planeAcc) >= 50) { setPlane(work.plane - Math.sign(planeAcc)); planeAcc = 0; }
    return;
  }
  setViewAnim(null); setTopAnim(null);
  if (e.ctrlKey) { zoomBy(Math.exp(e.deltaY * 0.01)); return; }
  if (settings.trackpad) {
    if (e.shiftKey || viewMode === 'top') panBy(-e.deltaX, -e.deltaY);
    else { view.theta += e.deltaX * 0.004; view.phi = clamp(view.phi + e.deltaY * 0.004, 0.001, Math.PI - 0.001); }
    return;
  }
  const d = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
  zoomBy(Math.exp(d * 0.0012));
}, { passive: false });

addEventListener('keyup', e => { mouseCtrl = e.ctrlKey || e.metaKey; });
addEventListener('keydown', e => {
  if (e.target.closest && e.target.closest('input,select,textarea')) { if (e.key === 'Escape') e.target.blur(); return; }
  if (!started) { if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); begin(); } return; }
  const k = e.code, ctrl = e.ctrlKey || e.metaKey; mouseCtrl = ctrl;
  if (k === 'F1') { e.preventDefault(); toggleHelp(); return; }
  if ($('help').style.display === 'flex' && k === 'Escape') { toggleHelp(false); return; }
  if (fxOpen) { if ((k === 'KeyN' && !e.shiftKey) || k === 'Escape') toggleFx(false); e.preventDefault(); return; }
  if (k === 'KeyR' && !e.repeat && !e.altKey && !ctrl && (tc.dragging || modal)) { e.preventDefault(); startMotionRec(); return; }
  if (k === 'Escape' && mrec && tc.dragging) { finishMotionRec(false); return; }
  if (modal) {
    e.preventDefault();
    if (modal.drag && k !== 'KeyZ' && ['KeyX', 'KeyY'].includes(k)) return;   // notes: only Z (up / down)
    if (modal.type !== 'H' && ['KeyX', 'KeyY', 'KeyZ'].includes(k)) {
      const a = k[3].toLowerCase();
      if (modal.axis === a && modal.exclude === e.shiftKey) modal.axis = null; else { modal.axis = a; modal.exclude = e.shiftKey; }
      updateModal();
    } else if (k === 'Escape') endModal(false);
    else if (k === 'Enter' || k === 'NumpadEnter' || k === 'Space') endModal(true);
    else if (k === 'ControlLeft' || k === 'ControlRight' || k === 'MetaLeft') updateModal();
    return;
  }
  if (place) {
    if (k === 'Enter' || k === 'NumpadEnter') { e.preventDefault(); finishPlace(); return; }
    if (k === 'Escape') { cancelPlace(); return; }
    if (k === 'Backspace' || (ctrl && k === 'KeyZ')) { e.preventDefault(); undoPlace(); return; }
  }
  if (poly) {
    if (k === 'Escape') { cancelTool(); return; }
    if (k === 'Enter' || k === 'NumpadEnter') { e.preventDefault(); finishPoly(false); return; }
    if (k === 'Backspace' || (ctrl && k === 'KeyZ')) { e.preventDefault(); undoPolyPoint(); return; }   // (a global undo would pull the curve out from under the tool)
  }
  if (ctrl) {
    if (k === 'KeyL') { e.preventDefault(); linkSel(); return; }
    if (k === 'KeyZ') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    else if (k === 'KeyY') { e.preventDefault(); redo(); }
    else if (k === 'KeyC') copySel();
    else if (k === 'KeyV') pasteClip();
    else if (k === 'KeyI') { e.preventDefault(); invertSel(); }
    return;
  }
  switch (k) {
    case 'Space': e.preventDefault(); togglePlay(); break;
    case 'Tab': e.preventDefault(); toggleEdit(); break;
    case 'KeyA': e.preventDefault(); if (e.shiftKey) { setAddAt(mouse.x, mouse.y); openAddMenu(mouse.x, mouse.y); } else if (e.altKey) selectNone(); else selectAll(); break;
    case 'KeyG': startModal('G'); break;
    case 'KeyR': if (e.altKey) { e.preventDefault(); clearMotion(); } else startModal('R'); break;
    case 'KeyS': startModal('S'); break;
    case 'KeyD': if (e.shiftKey) duplicateSel(); break;
    case 'KeyL': if (e.altKey) { e.preventDefault(); unlinkSel(); } break;
    case 'KeyX': case 'Delete': if (mode === 'edit') { if (selMode === 'p') deleteNotes(); } else deleteSel(); break;
    case 'KeyM': if (mode === 'edit' && selMode === 'p') muteNotes(); break;
    case 'KeyN': if (e.shiftKey) $('props').style.display = $('props').style.display === 'none' ? '' : 'none'; else toggleFx(); break;
    case 'KeyT': $('tools').style.display = $('tools').style.display === 'none' ? '' : 'none'; break;
    case 'Digit1': if (mode === 'edit') setSelMode('p'); break;
    case 'Digit2': if (mode === 'edit') setSelMode('v'); break;
    case 'Digit3': if (mode === 'edit') setSelMode('e'); break;
    case 'Numpad7': setViewMode(viewMode === 'top' ? '3d' : 'top'); break;
    case 'Numpad5': case 'Numpad1': case 'Numpad3': setViewMode('3d'); break;
    case 'Numpad4': if (viewMode === '3d') animateView({ theta: view.theta - Math.PI / 12 }); break;
    case 'Numpad6': if (viewMode === '3d') animateView({ theta: view.theta + Math.PI / 12 }); break;
    case 'Numpad8': if (viewMode === '3d') animateView({ phi: clamp(view.phi - Math.PI / 12, 0.001, Math.PI - 0.001) }); break;
    case 'Numpad2': if (viewMode === '3d') animateView({ phi: clamp(view.phi + Math.PI / 12, 0.001, Math.PI - 0.001) }); break;
    case 'NumpadAdd': zoomBy(0.85); break;
    case 'NumpadSubtract': zoomBy(1 / 0.85); break;
    case 'NumpadDecimal': case 'Period': mode === 'edit' ? frameVerts() : frameObjects(selected.size ? [...selected] : shapes); break;
    case 'Home': frameObjects(shapes); break;
    case 'ArrowLeft': if (e.shiftKey) resetPhases(); break;
    case 'ArrowUp': case 'ArrowDown': e.preventDefault(); octaveSel(k === 'ArrowUp' ? 1 : -1); break;
    case 'Escape': closeAddMenu(); break;
  }
});
