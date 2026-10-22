// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './ui.js';
import { $, settings, PITCH, restoredSession, SOUNDS, work } from './core.js';
import { introSeen, markIntroSeen, saveSession } from './lib/session.js';
import { barPrism, addShape, nextName, notesAt, shapes } from './shape.js';
import { audio } from './audio.js';
import { view, topv, viewMode, setViewMode, applyView } from './view.js';
import { started, resetPhases, togglePlay, lastState, snapshot, setGum, setSelMode, setStarted, setLastState, restore, selected, active, setActive, setMode, mode } from './edit.js';
import { setHint, refreshPanel } from './ui.js';
import { bars, setBars, setSimTime } from './loop.js';

/* =========================================================
   START
   ========================================================= */
export function begin() {
  if (started) return;
  setStarted(true);
  audio.ensure();
  $('start').style.display = 'none';
  if (!restoredSession) resetPhases();
  togglePlay(true); setHint();
}
$('beginBtn').addEventListener('click', begin);

/* default scene: the full "Shook Ones Pt. III (colors)" groove — 132 BPM, Bb minor.
   no build-up: every instrument is one form of exactly one bar (perimeter 4 = 4 beats) and plays from the first beat.
   height = pitch: everything rests on the floor (its own sound / the bass on Bb1) except the synth, 4 scale steps up = F3. */
settings.bpm = 132; settings.key = 10; settings.mode = 4;
{
  const T = PITCH.thick, F3 = 4 * PITCH.step, BEATS = [0, 0.25, 0.5, 0.75], OFF8 = [1, 3, 5, 7].map(k => k / 8);
  [
    { name: 'Kick',   ...barPrism(4, 1, T), sound: 'stem_kick',   notes: notesAt(BEATS), anchor: [-3.0, -0.25] },              // every beat
    { name: 'Clap',   ...barPrism(4, 1, T), sound: 'stem_clap',   notes: notesAt([0.25, 0.75]), anchor: [-1.5, 0.75] },        // beats 2 and 4
    { name: 'Cymbal', ...barPrism(4, 1, T), sound: 'stem_cymbal', notes: notesAt(OFF8), anchor: [0, 1.25] },                   // offbeat 8ths
    { name: 'Synth',  ...barPrism(4, 1, T), sound: 'stem_synth',  notes: notesAt(OFF8), dy: F3, anchor: [1.5, 0.75] },         // offbeat 8ths, F3
    { name: 'Bass',   ...barPrism(4, 1, T), sound: 'stem_bass',   notes: notesAt(BEATS), anchor: [3.0, -0.25] },               // every beat, Bb1
  ].forEach(d => addShape({ ...d, name: nextName(d.name) }));
}
$('keySel').value = settings.key; $('modeSel').value = settings.mode;
$('gBpm').value = settings.bpm; $('gBpmV').textContent = settings.bpm;
view.target.set(0, 0.5, 0.3); view.radius = 10.5; view.theta = 0; view.phi = 1.15;
setLastState(snapshot());
setGum('translate'); setSelMode('v'); refreshPanel(); setHint(); applyView();


// Save both the scene and its instrument definitions. A sound already assigned to
// a box keeps working if it is later removed from the Sculpt library.
function captureSession() {
  const ids = new Set(shapes.map(s => s.sound));
  return {
    revision: 1, shapes: snapshot(), settings: { ...settings },
    instruments: [...ids].flatMap(id => SOUNDS[id]?.sculpt ? [SOUNDS[id].sculpt] : []),
    view: { target: view.target.toArray(), radius: view.radius, theta: view.theta, phi: view.phi,
      mode: viewMode, top: { ...topv } },
    plane: work.plane, bars,
    selected: [...selected].map(s => s.id), active: active?.id ?? null, editMode: mode,
  };
}
let lastSavedFingerprint = null;
function persistBeatbox() {
  const state = captureSession();
  const fingerprint = JSON.stringify(state);
  if (fingerprint === lastSavedFingerprint) return;
  const saved = saveSession(localStorage, state);
  if (saved) lastSavedFingerprint = fingerprint;
  $('sceneSaveStatus').textContent = saved ? 'Saved locally' : 'Could not save scene';
  if (!saved) console.warn('Beatbox scene could not be saved.');
}
// scene.js is evaluated before loop.js initializes its clock exports. Delay the
// restore to the next microtask, once the complete module chain is initialized.
queueMicrotask(() => {
  if (restoredSession) {
    Object.assign(settings, restoredSession.settings);
    restore(restoredSession.shapes);
    view.target.fromArray(restoredSession.view.target);
    Object.assign(view, { radius: restoredSession.view.radius, theta: restoredSession.view.theta, phi: restoredSession.view.phi });
    Object.assign(topv, restoredSession.view.top);
    if (restoredSession.view.mode === 'top') setViewMode('top');
    work.plane = restoredSession.plane; work.y = work.plane * PITCH.step * 7;
    setBars(restoredSession.bars); setSimTime(null);
    selected.clear();
    shapes.filter(s => restoredSession.selected?.includes(s.id)).forEach(s => selected.add(s));
    setActive(shapes.find(s => s.id === restoredSession.active) ?? null);
    if (restoredSession.editMode === 'edit' && active) setMode('edit');
    setLastState(snapshot());
  }
  const seen = introSeen(localStorage);
  markIntroSeen(localStorage);
  if (seen) {
    $('start').style.display = 'none';
    setStarted(true);
    togglePlay(false);
  }
  $('keySel').value = settings.key; $('modeSel').value = settings.mode;
  $('gBpm').value = settings.bpm; $('gBpmV').textContent = settings.bpm;
  $('snapBtn').classList.toggle('on', settings.snap);
  $('padBtn').classList.toggle('on', settings.trackpad);
  for (const id of new Set(shapes.map(s => s.sound))) {
    if (SOUNDS[id]?.sculpt) audio.prepareSculpt(id).catch(e => {
      if (active?.sound === id) $('pSculptStatus').textContent = `Could not prepare sound: ${e.message}`;
      console.warn('sculpt sound render failed', e);
    });
  }
  $('sceneSaveStatus').textContent = restoredSession ? 'Scene restored' : 'New scene';
  refreshPanel(); setHint(); applyView();
  // View-only tabs must not overwrite edits made in another Beatbox tab.
  lastSavedFingerprint = JSON.stringify(restoredSession || captureSession());
  setInterval(() => { if (!document.hidden) persistBeatbox(); }, 1500);
});
addEventListener('pagehide', () => { persistBeatbox(); audio.ctx?.suspend(); });
document.querySelectorAll('#soundsculpt-pages a').forEach(link => link.addEventListener('click', persistBeatbox));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { persistBeatbox(); togglePlay(false); audio.ctx?.suspend(); }
});
addEventListener('pageshow', event => {
  if (event.persisted) { togglePlay(false); setSimTime(null); }
});

document.addEventListener('change', persistBeatbox);
