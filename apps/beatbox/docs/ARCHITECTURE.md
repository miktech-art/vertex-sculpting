# Architecture

ES modules in `src/`, bundled by Vite; markup and CSS in `index.html`. No framework.
The modules are the former concatenated parts, kept as they were: they share top-level state and run code as they load, so they
form a **load-order chain** — each module's first statement imports its predecessor, `main.js` imports the last, and evaluation
runs core → … → loop exactly like the old concatenation (rule and check: `ORDER` in `eslint.config.js`). Import cycles between
modules are fine because functions are hoisted and only called later. A top-level `let` written from another module has a
setter in its owner (`setBars`, `setSimTime`, `setFxPulseT` in loop.js · `setActive`, `setPointFocus`, `setStarted`,
`setLastState`, `setLastPick` in edit.js · `setCamera` in render.js · `setViewAnim`, `setTopAnim` in view.js).

## Modules
| module | contents |
|---|---|
| `index.html` | markup, CSS (light theme), top bar, tool column, properties panel, effects panel, shader menu (dev/debug), overlays |
| `main.js` | entry: `import './loop.js'` |
| `core.js` | three imports, constants, time model, `SOUNDS` (the 5 stems), `PALETTE` (colour = instrument), `STEM_BYTES` (stem fetch / inline), `settings`, `FX_DEFAULT` + localStorage, `noteFor`, `pitchColor`, `boostSat` |
| `render.js` | renderer, cameras (`persp`, `ortho`), layers, render targets, blur, background, grid shader, `renderFrame()` |
| `shape.js` | `Shape` class (notes, path through them, beads, ink dot), prism helpers (`barPrism`, `notesAt`), `setCorners`, `chainLevels`, add/remove, chains (`rebuildStacks`, `layout` = row along x, anchors), free spots (`freeSpot`, `clearRow`, `standsAt`), `veinAt`, `startW` |
| `cloud.js` | `EFFECTS` list, the star inside each closed form: `makeStar`, `syncStar` (vertex-shader displacement per effect), `starHit` (the old name stays: load-order chain) |
| `audio.js` | `audio` object: init, buses, stems decode, per-form chain, effect chain + `fxSync`, stem playback, recording/export |
| `view.js` | view state, top ⇄ 3D transition (`ex` explode factor), framing, pan/zoom |
| `edit.js` | selection (in click order), gumball, transform sessions (`xf`: object · edit · notes), `fitPerimeter`, undo, picking, overlays, polygon tool, placing notes (`startPlace`, `outlineHit`), notes in edit mode (`clickNotes`, `startNoteDrag`, `muteNotes`, `deleteNotes`), linking (`linkSel`, `unlinkSel`), modal G/R/S, motion loops, presets, actions |
| `ui.js` | properties + effects panel, `describe()`, `fmtBars()`, shader menu (`FX_SPEC`, `toggleFx`), hints, key sheet, all input handlers |
| `scene.js` | `begin()`, the default scene |
| `loop.js` | chain timing (`stackTimes`, `stackPhase`, `stackAdvance`), chain veins, the frame loop, test hooks, resize |
| `lib/pitch.js` | outside the chain: pure height = pitch maths (`degreeAt`, `noteOfDegree`, `planLengths`, `fitColumns`), unit-tested by `test/pitch.test.mjs` (`npm run test`); lint keeps `src/lib/` free of browser globals and chain imports |

## Build
- `vite.config.js`, modes: production (`dist/`), `debug` (keeps `window._dbg` / `window._ev`), `single` (`dist-single/index.html`).
- Stems: `core.js` starts fetching `public/stems/*.wav` at load (`STEM_BYTES`, promises of ArrayBuffers); `audio.init()` decodes
  them on the first click. `import INLINE_STEMS from 'virtual:stems'` is `{}` normally and the base64 WAVs in single mode.
- Single mode: no public dir, and the `inline-script` plugin replaces the bundle's `<script src>` with the code itself.

## Time
- `bars` is a monotonic bar counter advanced on the AudioContext clock, `LA` = 0.1 s ahead (look-ahead scheduling).
- A form's cycle in bars (`loopBars()`) = its path length seen from above / 4: around a closed form, **there and back** along an
  open curve (`closed: false`, ping-pong: `pingPong` in `lib/pitch.js`). Nothing else changes it (the SPEED control was removed).
- **Notes, not corners, play** (2026-10-22): `Shape.notes` = points placed along the path, `{ f, y, mute }` (f = 0…1 of the path
  seen from above = time, y = local height = pitch). `Shape.hits()` = `noteHits` (lib/pitch.js): a closed path fires note k at f,
  an open curve at f/2 and 1 − f/2 (the ends once). Muted notes are skipped. Corners only turn the path.
- Chains (the code says stacks): loops linked with Ctrl+L by `below` ids play in order; `stackTimes` gives each form `stS` (start)
  and `stL` (length), chain `T` = sum. `stackAdvance` fires every note hit crossed between `b0` and `b1`.
- Placing notes (edit.js): a new form (Shift+A, or a finished polygon) starts with no notes; `startPlace` → every click on the
  outline (`outlineHit`: nearest point of the path on screen, `snapFrac` to 1/16) adds one at the path's height there; Enter /
  RMB = done, ⌫ = take the last back, Esc = drop the form.
- Polygon tool (edit.js): Rhino-style. Each click rebuilds the drawn form (`replaceShape`), so it plays from the second point on,
  on the global clock; open until the first point is clicked again (closed = loops), Enter / RMB = done as an open curve,
  ⌫ / Ctrl+Z = undo point, Esc = cancel. The curve takes the last swatch picked (`setLastSound`).

## Shape data (serialized)
`bottom[]`, `top[]` (local vertices; every top is `PITCH.thick` above its bottom), `quat`, `scale`, `sound`, `mute`, `notes[]` (`{ f, y, mute }`;
missing in old data → one on every corner that used to play), `open[]` (old rests; only used for that conversion),
`closed` (false = open curve: a wall without caps, the dot runs there and back), `tracks` (motion loops: `obj` deltas, `verts`, `notes` = `[f, y]` per moved note), `below` (the loop before it in its chain), `anchor` ([x,z] for a chain's first loop),
`dy` (height of the form's lowest point above the floor: pitch), `fx` (effect amounts 0–1, incl. `echo`, `lowcut`),
`fxRate` (bars per sweep). Old data's `height` and `tracks.height` are ignored.

## Geometry → sound
**Height = pitch** (`PITCH` in core.js, live as `_dbg.pitch`): the dot runs through the middle of each form (forms are
`PITCH.thick` = 0.5 = 1 step tall); note k = `degreeAt(noteWorldY(k))` = round((y − thick/2) / step) scale steps above
the floor, step = 0.5 (twice the 1/16 snap, so the planes sit well apart), 7 steps = one octave = 3.5 units, a plane every octave.
A form resting on a plane plays that octave's root. Each instrument keeps its register (`SOUNDS[].oct`); all five stems are
repitched tape-style (`playbackRate` = note / `sampleRoot`): on the floor the drums play their original sound, the bass B♭1.
Axes follow Rhino (`AX` in edit.js): X right, Y into the scene (north in the top view, three.js −z), Z up (three.js y); G/R/S
headers show Rhino x y z, the gumball's up arrow is blue and its Y arrow green. Up and down always goes by scale steps: G → Z
(forms, corners, notes) like a knob, one step per 20 px of mouse travel (`Z_PX`, at any zoom); the gumball's blue arrow by steps;
⇧↑ / ⇧↓ one step and ↑ / ↓ an octave (`raiseSel`: the selected forms, or the selected notes in edit mode). A corner moves as a
whole column (`fitThickness`). R → Z turns a form around its vertical axis (= start offset).
The path runs through the notes at their heights (`heightAt`: corners take the slope between neighbouring notes), so the melody
shows as height while time stays in plan. Brightness shows pitch (`pitchColor`: ±`PITCH.light` per octave).
In 3D a chain sits in a row along +x in playing order (`layout`, 0.5 apart), each loop at its own height; the top view keeps every
form on the common centre.
**Work plane** (`work` in core.js): the octave you work on. Alt+wheel moves it one octave a notch (−3…+5); `work.y` glides
there in ~0.15 s and the camera target rides along (loop.js), so the plane you work on always sits where the floor was. The grid
and the reverb circle are drawn on it; every other octave from the lowest form to the plane above the highest is a faint outline
(`setPlanes`). A form belongs to the plane its lowest point rests on (`planeOf(dy)`); off the work plane it keeps playing but
its instrument colour goes to saturation 0 (`Shape.focus`, also used by the star). ↑ / ↓ move the selected forms an octave and
the work plane follows them (`octaveSel`; an undo that moves the active form to another octave follows it too).
New forms (add, paste, a dropped or cancelled duplicate, a loop taken out of a chain) land on the work plane at the cursor
(`groundHit` meets the work plane), moved to the nearest spot on the 1/16 grid where they touch nothing on the same plane
(`freeSpot`: boxes from above, turned and scaled, `GAP` = 1/16 apart; other octaves may stand right above each other).
A chain that grows by Ctrl+L pushes the forms it runs into aside (`clearRow`), which changes their place in the room (pan, reverb).

perimeter **seen from above** → loop length (height never changes timing) · a note's place along the path → when it fires ·
muted notes → rests · anchor distance from centre (> `ROOM.start` = 4 units, full at 12) → reverb · anchor × `PANW` (0.35) →
panner position, heard by a fixed listener in front of the scene (`LISTENER` in audio.js; orbiting never changes the mix) ·
yaw (rotation around Y) → start offset `phaseOff` (`startOffset` in lib/pitch.js: a turn of θ moves the start θ/2π of the cycle
against the travel direction, rounded to 1/16 of a bar; note hits are fired at (t + phaseOff) mod 1, the dot drawn at
localPh − phaseOff; R around Y snaps to the same grid).
Echo and low cut are effects now (`fx.echo` → echo send, `fx.lowcut` → high-pass 20 Hz × 2^(8·amount)).
`feat` holds only what these use (`r`, `dist`, `Hm`, `centre`, `room`).

Sound → picture: each hit flares the form's colour (halo, open-curve stroke) for as long as the note is audible (`audio.stemLen` =
time to −40 dB, divided by the playback rate; flare time constant = half of that) · `Shape.lightUp(k)` at the hit's audible time:
the dot lights up, an ink pool appears at note k, the star's arm toward k flares · the star drifts as loud as the form plays
(`audio.level`, an AnalyserNode after the high-pass; silent = still) · effects displace the star (compressor on the real gain
reduction, flanger bands, phaser twist, chorus sway, distortion jitter, bitcrusher grid, echo: fading copies above the form,
low cut: the bottom cut away).

## Audio graph
stem source → gain (stem dB) → **effects** (compressor → distortion → bitcrusher → chorus → flanger → phaser) → high-pass →
panner → { clean bus → peak limiter (−2 dBFS, makeup removed) → master, reverb send, tempo-synced echo send } → master →
(a level meter taps each form after the high-pass) →
destination + MediaStream (video export) + ScriptProcessor tap (WAV export).
Effect sweeps are scheduled from `bars` each frame, the same phase the star shader uses.

## Rendering — the milk look (2026-10-22, from Veikko's prototype)
1. soft layer (halo sprites = reverb, only outside the reverb circle; floor glow = where a stack stands, `FX.floor`, 0 by
   default; open-curve strokes) → offscreen, 2 separable blur passes at half res
2. milk layer (`L_MILK`): each closed form's solid with `thickMat` → `rtT` (half float, 4× MSAA). Front faces add −depth,
   back faces +depth, additive, so a pixel holds the length of its view ray inside all forms (depth counted from `uRef` ≈ the
   camera's distance, to keep half floats precise). Softened at full res (`FX.milkBlur`; 0 = no blur).
3. star layer (`L_STAR`): the stars → `rtO` (premultiplied, 4× MSAA), softened (`FX.organBlur`)
4. ink layer (`L_INK`): ink points (trail, pools, the dot's glow) → `rtI` (4× MSAA), blurred at half res (`FX.inkBlur`)
5. base: flat grey void (`FX.bg`) → grid layer (1/16 field on the work plane, other planes' outlines, reverb circle) → blurred soft layer → `rtBase`
6. screen: `milkMat` over `rtBase`: lavender shadow outside the milk → milk (ivory, warmer with thickness) → the star seen
   through the milk (`veil`) → rim where the sharp thickness steps (every silhouette) → ink bleed; then the sharp layer (path,
   beads, ink core, the dot, connectors) → overlay (gizmo, edit overlays, polygon tool)
7. edit mode only (`focus`): steps 6's milk and sharp layer go to `rtS` instead; the edited form's milk mesh alone is drawn
   white on `L_FOCUS` → `rtM` and blurred (its silhouette, softly widened); `rtS` is blurred at half res in three growing rounds
   (`FX.focusBlur`); `focusMat` mixes sharp inside the mask, blurred outside, faded in by `uAmt`; then the overlay. Every other
   form is grey meanwhile (`Shape.focus`).
8. object mode, something selected: every selected form's pick mesh (also open curves) drawn flat on `L_SEL` → `rtSel`
   (r = selected, g = active); `outlineMat` draws an orange line just outside each silhouette (`SEL` in render.js: #e8641c,
   the active form #ffa64d, 1.1 px), then the overlay.
- The solid prism mesh is never drawn: it stays for picking, edit-mode faces and framing; the milk mesh shares its geometry.
- The star: one inflated star per closed form (a unit sphere whose footprint follows an arm toward each note that plays,
  each arm leaning to its note's height), `FX.layers` nested shells; each shell's colour gathers at its silhouette so the
  layers read as contours. Instrument colour, brightness = pitch; an arm flares when its note plays.
- The dot is a bead of rust ink (`INK` in shape.js): light-up on every note it plays (`FX.lit`, `litFade`), a trail of
  `FX.trail` beats (crisp core on the sharp layer, bleed on the ink layer), ink pools at notes fading over `FX.pool` beats. In a chain the trail of a loop that just took over runs
  back through the vein (`veinAt`, an arch between the loops' start points; `HAND` = 1/8 beat of trail) into the previous loop.
- Beads on the sharp layer: filled rust at a note that plays, hollow ink-violet ring at a muted one. The path is one solid thin vein
  through corners and notes. Chain veins (loop.js) replace the old stack connectors: solid arches in order, a dashed one back.
- One colour per instrument (`PALETTE`); the star, halo, floor glow and stroke use it. Ink is rust for every form.
- Colour management is off (`THREE.ColorManagement.enabled = false`, linear output) so palette hex = screen pixels.
- Top view: orthographic, every stack at the origin (`ex` = 0), same milk / star / ink as in 3D.
- Open curves have no inside: no milk, no star; their soft stroke shows in both views.
- The pick mesh keeps every side face (forms can't be clicked "through"). Edit mode: 1 points (notes: click the path to add, click /
  box to select, drag or G to slide by 1/16, Z = up / down by steps, M mute, X delete, R while dragging records a `notes` loop),
  2 vertices and 3 edges (reshape; notes keep their share of the path, re-snapped). Faces are not selectable.
- Not stereo-safe yet: the screen-space softening/bleed and pixel-sized points/lines (fine on a monitor; a WebXR port would
  need per-eye passes and world-sized ink).
- 3D only: the other octave planes' outlines (`setPlanes`) and the dashed reverb circle (`setRoomRing`), both in the grid layer.

## Shader menu (N) — dev and debug builds only
A tuning tool for `FX_DEFAULT`, not a feature: release builds ignore N and don't read localStorage. Pauses transport and motion; sliders write `FX` live and save to localStorage `vertex.fx.v1`; RESET → `FX_DEFAULT`;
COPY → JSON for new defaults. Keys: halo = reverb + floor glow (`haloStr`, `haloSize`, `floor`), lines (`pathW`, `pathA`,
`beadSize`, `connW`), void (`bg`), milk (`milkDen`, `milkMax`, `warm`, `milkBlur`, `rim`, `shadow`, `shadowOff`), saturation
(`satRest`, `satFull`), star (`organA`, `starSize`, `starInner`, `starArm`, `starThick`, `layers`, `layerGap`, `starEdge`,
`drift` = at full level, `organBlur`, `veil`, `restCol`, `organFlare`), dot · ink (`dotSize`, `lit`, `litFade`, `trail` in beats,
`trailW`, `inkBlur`, `bleed`, `core`, `pool` in beats), grid (`field`). The key names match the milk prototype, so its COPY JSON
pastes straight into `FX_DEFAULT`.
