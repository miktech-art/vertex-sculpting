// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './ui.js';
import { $, settings, PITCH } from './core.js';
import { barPrism, addShape, nextName, notesAt } from './shape.js';
import { audio } from './audio.js';
import { view, applyView } from './view.js';
import { started, resetPhases, togglePlay, lastState, snapshot, setGum, setSelMode, setStarted, setLastState } from './edit.js';
import { setHint, refreshPanel } from './ui.js';

/* =========================================================
   START
   ========================================================= */
export function begin() {
  if (started) return;
  setStarted(true);
  audio.init(); audio.ctx.resume();
  $('start').style.display = 'none';
  resetPhases(); togglePlay(true); setHint();
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
