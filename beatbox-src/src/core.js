import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import INLINE_STEMS from 'virtual:stems';
import { readSculptures, mergeSculptures, sculptSoundId, sculptureSound, nearestTonic } from '../../dist/src/sculpt-instruments.js';
import { readSession } from './lib/session.js';
import { degreeAt as stepsAbove, noteOfDegree } from './lib/pitch.js';

// work directly in display (sRGB) values: hex in = pixels out, which keeps the palette exact
THREE.ColorManagement.enabled = false;

export const $ = id => document.getElementById(id);
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
export const smooth = t => t * t * (3 - 2 * t);

/* =========================================================
   TIME = DISTANCE
   one grid unit = one beat · 4 units of path = one bar · snap = 1/16
   ========================================================= */
export const UNITS_PER_BAR = 4;
export const SNAP = 0.25;
export const LA = 0.1;                                         // audio look-ahead (s)

export const MODES = [
  ['LYDIAN', 'DUR', [0, 2, 4, 6, 7, 9, 11]],
  ['IONIAN', 'DUR', [0, 2, 4, 5, 7, 9, 11]],
  ['MIXOLYDIAN', 'DUR', [0, 2, 4, 5, 7, 9, 10]],
  ['DORIAN', 'MOLL', [0, 2, 3, 5, 7, 9, 10]],
  ['AEOLIAN', 'MOLL', [0, 2, 3, 5, 7, 8, 10]],
  ['PHRYGIAN', 'MOLL', [0, 1, 3, 5, 7, 8, 10]],
  ['LOCRIAN', 'MOLL', [0, 1, 3, 5, 6, 8, 10]],
];
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// only the sounds from the song: the five stems
export const SOUNDS = {
  stem_kick:   { label: 'KICK',   stem: 'kick',   db: -0.7, oct: 0 },
  stem_clap:   { label: 'CLAP',   stem: 'clap',   db: +4.1, oct: 0 },
  stem_cymbal: { label: 'CYMBAL', stem: 'cymbal', db: +4.1, oct: 0 },
  stem_synth:  { label: 'SYNTH',  stem: 'synth',  db: +1.7, oct: -12, root: 53 },   // F3 pluck
  stem_bass:   { label: 'BASS',   stem: 'bass',   db: -3.6, oct: -24, root: 34 },   // Bb1 pump
};

/* palette from the reference image (acid lime, ink) + coral, sand, cobalt. colour = instrument, brightness = pitch
   (sand replaces the old cream: cream vanished on the pale void once the contrast halos were gone) */
export const PALETTE = [
  { key: 'ink',    hex: '#17121C', label: 'KICK',   sounds: ['stem_kick'] },
  { key: 'coral',  hex: '#EE7A6B', label: 'CLAP',   sounds: ['stem_clap'] },
  { key: 'sand',   hex: '#A8915F', label: 'CYMBAL', sounds: ['stem_cymbal'] },
  { key: 'lime',   hex: '#D4E30A', label: 'SYNTH',  sounds: ['stem_synth'] },
  { key: 'cobalt', hex: '#3D5BD9', label: 'BASS',   sounds: ['stem_bass'] },
];
const FAMILY = {};
PALETTE.forEach(f => f.sounds.forEach(s => FAMILY[s] = f));
export const familyOf = snd => SOUNDS[snd]?.sculpt
  ? { key: 'sculpt', hex: '#7355bc', label: SOUNDS[snd].label, sounds: [snd] }
  : FAMILY[snd] ?? PALETTE[3];
export const restoredSession = readSession(localStorage);
export const savedSculptures = readSculptures(localStorage);
export const sculptInstruments = mergeSculptures(restoredSession?.instruments, savedSculptures);
for (const doc of sculptInstruments) SOUNDS[sculptSoundId(doc.libraryId)] = sculptureSound(doc);

// stems from "HNTR - Shook Ones Pt. III (colors)" — 16-bit WAV, trimmed: public/stems/*.wav, fetched while the page loads so
// they are ready by the first click. build:single inlines them as base64 instead (virtual:stems, see vite.config.js).
export const STEM_BYTES = {};   // stem name -> Promise<ArrayBuffer>
for (const k of new Set(Object.values(SOUNDS).map(S => S.stem).filter(Boolean)))
  STEM_BYTES[k] = INLINE_STEMS[k] ? Promise.resolve(Uint8Array.from(atob(INLINE_STEMS[k]), ch => ch.charCodeAt(0)).buffer)
    : fetch(`${import.meta.env.BASE_URL}stems/${k}.wav`).then(r => { if (!r.ok) throw new Error(`${r.status} ${r.url}`); return r.arrayBuffer(); });
export const settings = { key: 0, mode: 1, bpm: 120, mirror: true, trackpad: false, snap: true };
export const barLen = () => 240 / settings.bpm;

/* look settings: tuned in the shader menu (N, dev and debug builds only), which stores them in this browser */
// (Veikko's values: milk prototype 2026-10-21, retuned 2026-10-22)
export const FX_DEFAULT = { haloStr: 2.5, haloSize: 0.68, pathW: 1, pathA: 0.18, beadSize: 7, connW: 0.4,
  satRest: 0.54, satFull: 1.5, field: 0.44,
  bg: 0.86, milkDen: 0.56, milkMax: 0.25, warm: 0.15, milkBlur: 0.4, rim: 3.9, shadow: 0.23, shadowOff: 0,
  organA: 0.48, drift: 0.64, organBlur: 0.25, veil: 0.37, organFlare: 1, restCol: 1,
  starSize: 0.95, starInner: 0.28, starArm: 0.32, starThick: 0.8, layers: 3, layerGap: 0.22, starEdge: 2.2, litFade: 0.23, floor: 0,
  dotSize: 9.5, lit: 1.05, trail: 1, trailW: 11, inkBlur: 2.2, bleed: 1.25, core: 4.1, pool: 1,
  focusBlur: 0.1 };
export const FX = { ...FX_DEFAULT };
if (import.meta.env.DEV || import.meta.env.MODE === 'debug') try { const saved = JSON.parse(localStorage.getItem('vertex.fx.v1') || '{}'); for (const k in FX_DEFAULT) if (typeof saved[k] === 'number') FX[k] = saved[k]; } catch (e) { }
export function saveFx() { try { localStorage.setItem('vertex.fx.v1', JSON.stringify(FX)); } catch (e) { } }
const _hsl2 = {};
export function boostSat(c, k) { c.getHSL(_hsl2); c.setHSL(_hsl2.h, clamp(_hsl2.s * k, 0, 1), _hsl2.l); return c; }
// LOW CUT effect amount 0–1 -> high-pass frequency
export const hpFreq = a => a > 0.004 ? clamp(20 * Math.pow(2, a * 8), 20, 8000) : 10;

/* =========================================================
   HEIGHT = PITCH
   a note is how high the dot passes it above the floor, in steps of the key's scale: one step = 0.5 (twice the 1/16 snap, so
   the octave planes sit well apart), 7 steps = one octave, a C-plane every 3.5 units. Forms are 1 step thick and the dot runs through their middle,
   so a form resting on a C-plane plays that octave's root. Live-tunable as window._dbg.pitch (dev/debug).
   ========================================================= */
export const PITCH = { step: 2 * SNAP, thick: 0.5, light: 0.12 };   // light = brightness change per octave
// reverb from position: none inside the circle of radius `start` around the centre, full at start + span
export const ROOM = { start: 4, span: 8 };
export const octaveH = () => PITCH.step * 7;
// the work plane: the octave you are working on (Alt+wheel). The floor grid is drawn there and the camera rides along; forms
// standing on other planes keep playing but lose their colour. y = where it is drawn right now (it glides to plane · octaveH).
export const work = { plane: 0, y: 0 };
export const PLANES = { lo: -3, hi: 5 };
export const planeOf = y => Math.floor(y / octaveH() + 1e-4);    // the plane a form's lowest point rests on (or floats above)
export const degreeAt = y => stepsAbove(y, PITCH.step, PITCH.thick);
// the instrument's own pitch: the synth and bass stems have one; the drums play their original sound on the floor
export const sampleRoot = snd => SOUNDS[snd].root ?? 48 + settings.key + SOUNDS[snd].oct;
const floorNote = snd => SOUNDS[snd].sculpt ? nearestTonic(SOUNDS[snd].root, settings.key) : 48 + settings.key + SOUNDS[snd].oct;

// note k of a form: its height above the floor in scale steps (without notes: the ring's height)
export function noteFor(shape, k = 0) {
  return noteOfDegree(degreeAt(shape.noteWorldY(k)), floorNote(shape.sound), MODES[settings.mode][2]);
}
export const noteName = m => NOTE_NAMES[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
// semitones above the floor; without k, the average of the notes that play
export function semisOf(shape, k) {
  if (k !== undefined) return noteFor(shape, k) - floorNote(shape.sound);
  const ks = shape.notes.map((n, i) => i).filter(i => !shape.notes[i].mute);
  if (!ks.length) return noteFor(shape) - floorNote(shape.sound);
  let a = 0; for (const i of ks) a += noteFor(shape, i);
  return a / ks.length - floorNote(shape.sound);
}

// brightness follows pitch: on the floor the instrument's own colour, lighter every octave up, darker below
const _hsl = {};
export function pitchColor(hex, semis, out = new THREE.Color()) {
  out.set(hex); out.getHSL(_hsl);
  out.setHSL(_hsl.h, _hsl.s, clamp(_hsl.l + clamp(semis, -12, 24) / 12 * PITCH.light, 0.04, 0.94));
  return out;
}
