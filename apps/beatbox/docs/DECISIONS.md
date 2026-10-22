# Design decisions (as made with Veikko, Oct 2026)

Keep this list current; add the date when something changes.

## Principle (2026-10-21)
- **Strictly functional design:** every visual or control has one job, and no two show the same thing.

## Concept
- A dot moves along each form's outline; each corner plays a note. Rhythm comes purely from geometry.
- **Distance = time.** 1 grid unit = 1 beat, 4 units = 1 bar. The grid cell is 1 bar with 1/16 subdivisions; snapping is on by
  default (Ctrl inverts) so drawn shapes land on exact bars. After a snapped edit, a form with diagonal edges is scaled very
  slightly so its perimeter lands on the nearest 1/16.
- **Stacks replace the node system.** Drop a form onto another (in 3D) to chain bars; the stack plays them in order and loops.
  Black connector from each form's end to the next form's start; dashed line from top back to bottom. Drag off / UNSTACK to split.
  Since 2026-10-21 stacks chain in place: a stacked form shares the column but keeps its own height (height = pitch).
- ~~Sinking = low cut; floating = echo~~ — replaced 2026-10-21: height is pitch, echo and low cut are effects.
- No staged build-up in the default loop: every instrument plays its one bar from the first beat.

## Sound
- **Only the five stems from the song** (kick, clap, cymbal, synth, bass — HNTR "Shook Ones Pt. III (colors)", 132 BPM, B♭ minor).
  All synthesized voices were removed on request. Stem levels were fitted to the original mix (band energies within ~0.3 dB).
- **Height = pitch** (2026-10-21, replaces dot height + corner-height steps). A corner's note is its height above the floor in
  scale steps of the global key + mode (0.25 per step, 7 per octave); a C-plane marks every octave. Forms are 0.5 thick, the dot
  runs through the middle. Whole forms move by octaves, corners and faces by steps. Loop length is measured from above, so height
  never changes timing. All five stems follow height (drums play their own sound on the floor). Synth stem root F3, bass B♭1.
- Effects per form (any combination, one amount each): compressor, distortion, bitcrusher, chorus, flanger, phaser, echo,
  low cut. Sweeps are tempo-synced (¼–4 bars). Reverb comes from position (distance from the centre).
- **Rotation = start offset** (2026-10-21): turning a form around its vertical axis shifts where its cycle starts, like a
  record under a needle (a quarter turn of a one-bar form = one beat), snapped to the 1/16 grid. The default scene's
  decorative rotations were removed (its squares and octagons now overlap in the top view).
- **Fixed listener** (2026-10-21): the mix is heard from a fixed spot in front of the scene, so orbiting or switching views
  never changes it; the layout decides the mix.

## Look
- Reference: pale grey-lavender void, soft airbrushed glowing forms (cream / acid lime / ink / violet / blush / amber).
- **Colour = instrument**, brightness shows pitch (2026-10-21; the hue shift was dropped). Five swatches: kick ink, clap coral, cymbal sand, synth lime, bass cobalt.
  One colour per instrument (2026-10-21): the contrast halo colours were dropped (they made the clap read teal, the synth
  lavender); cymbal cream became sand so it stays visible on the pale void.
- Forms are pale at rest and flare to full saturation on every hit; the flare lasts as long as the note is audible (2026-10-21).
- The only hard lines are the dot's path curve and the black dot (plus stack connectors).
- **The point cloud is the volume** (2026-10-21: the solid airbrushed body is no longer drawn). It drifts as loud as the form
  plays (silent = still); effects displace it in proportion to how hard they work (the compressor uses the real gain reduction).
- Look values are Veikko's tuned defaults in `FX_DEFAULT` — change only when he sends new values.
- Every form in the default scene is one bar around and 0.5 thick (2 scale steps).
- **Halo = reverb** (2026-10-21): a dashed circle on the floor (radius 4) marks where reverb starts; only forms standing
  outside it have a halo, growing with their reverb. The floor glow marks where a stack stands (its forms may float above it).
- Rests (open faces) show as dashed segments of the path (2026-10-21; the solid body that showed them as holes is gone).
- Removed 2026-10-21 as having no job of their own: background shine, grain, ruler dots, the second top-view stroke, the logo.

## Views & controls
- Only two views: **orthographic top** (numpad 7) where all forms sit concentric on one origin and render as curves, and
  **perspective 3D** (numpad 5) where they explode to their own spots. No front/right views. Objects can't be moved in top view.
- Blender controls: MMB orbit/Shift pan/wheel zoom, G/R/S + axis, Tab/double-click edit mode, 1/2/3 vert/edge/face,
  Shift+A add (at the mouse), Shift+D duplicate, X delete (in edit mode X opens a face = rest, F closes it), Ctrl+Z.
  Walk mode and the 3D cursor were removed (2026-10-21).
- **Polygon tool works like Rhino's** (2026-10-21): open until you click the first point again, Enter / right-click = done
  (open), Esc = cancel. It plays while you draw. An open curve is a wall whose dot runs there and back (one cycle = twice its
  length); a closed one loops. A new curve takes the last instrument picked.
  Rhino-style gumball; X-mirror for symmetric edits.
- R while dragging records a motion loop (snapped to ¼–8 bars, bar-locked).
- N = shader menu (pauses everything) in dev/debug builds only: it is a tool for tuning `FX_DEFAULT`, not a feature (2026-10-21).
  Shift+N = properties panel, T = tool column, F1 = key sheet.
- Loop length = perimeter, nothing else: the SPEED control was removed (2026-10-21). SONG / PLAYS BARS and the SOUND dropdown
  (same choice as the swatches) were removed too.
- Record / export: video (MP4/WebM) and WAV.

## Repo & build (2026-10-20)
- Lives in `C:\dev2\vertex-sequencer`, local git only; if it is ever pushed, the repo is private.
- **Vite build, npm packages allowed** (changed 2026-10-20; the first restructure was Node-only with no packages): `vite`,
  `three` (pinned 0.170.0), later `@mediapipe/tasks-vision`; dev tools `eslint`, `globals`, `playwright-core`. No Python.
- Source is ES modules in `src/`, kept as close to the old parts as possible: a load-order chain plus setters, checked by lint.
  A cleanup into a shared state module can come later, when hand controls give it a reason.
- Two outputs: `dist/` (served) and `npm run build:single` → `dist-single/index.html`, one self-contained file that opens from `file://`.
- Stems are `public/stems/*.wav` — the trimmed 16-bit files the levels were fitted on. They, `dist/` and `dist-single/` are
  never committed. Backup outside the repo (see README → "Stems").
- `npm run check:timing` passes before every commit. Line endings are LF.
