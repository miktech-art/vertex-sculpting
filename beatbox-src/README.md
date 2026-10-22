## Sound/Sculpt integration

The WAV files omitted from the original archive have now been supplied by the user and are included in `public/stems/` for this private Site. The Sound/Sculpt build copies them to `dist/beatbox/stems/`. The original documentation below describes the upstream project.

---

# Vertex Sequencer

A 3D shape sequencer: a dot travels each form's outline and plays the notes placed along it.
Three.js (npm, r170) + Web Audio, built with Vite.

For Claude Code: start with `CLAUDE.md`, then `docs/`.

## Build
    npm install
    npm run dev               # dev server at http://localhost:5173 (with the window._dbg / window._ev test hooks)
    npm run build             # dist/ — index.html + assets + stems; needs a server (npm run preview)
    npm run build:debug       # same, keeping the test hooks
    npm run build:single      # dist-single/index.html — one self-contained file (JS + stems inlined), opens from file://
    npm run preview           # serves dist/ at http://localhost:4173
    npm run lint              # ESLint: undefined names, writes to imports, module load order
    npm run check:timing      # timing regression test in Chrome (see CLAUDE.md)
    npm run test              # unit tests (node --test): the pure modules in src/lib/

Webcam features need `http://localhost` (dev / preview), not `file://`.

## Stems
The five stems (kick, clap, cymbal, synth, bass) are `public/stems/*.wav`, 16-bit, trimmed — the exact audio the app plays.
They are samples from someone else's track (HNTR — "Shook Ones Pt. III"), so they are **not in git**, and neither are `dist/`
and `dist-single/`, which contain them.

They exist only on disk. A backup lives in `C:\Users\veikk\Music\vertex-sequencer-stems` (the same five WAVs, plus the old
`stems.json`). If `public/stems/` is lost, copy `kick.wav clap.wav cymbal.wav synth.wav bass.wav` from there back into it.

## Docs
- `CLAUDE.md` — working instructions for Claude Code
- `docs/ARCHITECTURE.md` — how the systems fit together
- `docs/DECISIONS.md` — design decisions so far
- `docs/ROADMAP.md` — next steps (hand controls) and open questions

## Layout
| path | what |
|---|---|
| `index.html` | markup, CSS (light theme), panels, shader menu (dev/debug) |
| `src/` | the app as ES modules (table below) |
| `public/stems/` | the stems (not in git, see above) |
| `scripts/check-timing.mjs` | timing regression test (Playwright + installed Chrome) |
| `test/*.test.mjs` | unit tests for `src/lib/` (Node's built-in runner) |
| `vite.config.js` | build modes, the stems plugin, single-file inlining |
| `eslint.config.js` | lint rules and the module load order (`ORDER`) |
| `docs/` | architecture, decisions, roadmap |
| `dist/`, `dist-single/` | build output (not in git) |

## Source (`src/`, in load order)
| module | what |
|---|---|
| main.js | entry: imports loop.js, which pulls in the chain below |
| core.js | constants, distance = time (1 unit = 1 beat, 4 = 1 bar, snap 1/16), stems as SOUNDS, palette (colour = instrument, hue = pitch), FX look defaults |
| render.js | renderer, layers (soft/blurred, grid, sharp, overlay), airbrush blur, background, dotted 1/16 grid |
| shape.js | Shape class (milk volume, path, beads, ink dot + trail, halo, floor glow, open-curve stroke), geometry → sound features, stacks (layout, anchors) |
| cloud.js | effects list; the star inside each form: arms toward the notes that play, drift by level, effect displacement shaders |
| audio.js | audio engine: stems, per-form chain (effects → low cut → panner → buses), compressor/limiter, recording |
| view.js | orthographic top view (concentric) ⇄ perspective 3D (exploded) |
| edit.js | selection, gumball, G/R/S with snapping, placing and editing notes, linking loops, picking, polygon tool, motion loops, presets |
| ui.js | properties panel, effects panel, shader menu (N, dev/debug), hints, input |
| scene.js | default scene: the Shook Ones Pt. III groove, one form per stem |
| loop.js | chain timing (note hits on the bar clock), chain veins, frame loop |

## Key facts
- Loop length = path length / 4 bars, nothing else: around a closed form, there and back along an open curve. Linked loops
  (Ctrl+click in order, Ctrl+L) play one after another, then repeat; in 3D they sit in a row along x.
- Add a square (Shift+A), click its outline to place notes (snapped to 1/16), Enter. In edit mode (Tab): click the path to add,
  drag / G to slide, Z = note up / down, M mute, X delete.
- Polygon tool works like Rhino's: open until you click the first point again, and it plays while you draw.
- Height = pitch: each note plays at its height above the floor, in steps of the key/mode (0.5 of height = one step,
  a plane every octave = 3.5); the path rises and falls with the notes. Whole forms snap by octaves, notes by steps; brightness shows pitch.
- You work on one plane at a time: Alt+wheel = an octave up / down (the view follows), ↑ / ↓ = the selected form an octave up / down
  (the plane follows it). Forms on other planes play on in grey. New forms land on the work plane at the cursor, never on another form.
- Edit mode blurs everything but the form you edit and turns the others grey.
- Distance from centre = room (beyond the dashed circle; the halo shows it); echo and low cut are effects.
- Turning a form around its vertical axis shifts where its pattern starts. The mix is heard from a fixed spot in front.
- Milky volumes on a grey void, a star inside each in the instrument colour (an arm toward each note that plays, flaring on its hit,
  drifting as loud as the form plays), the dot a bead of rust ink that lights up on every note and trails one beat of ink.
- Look settings live in `FX_DEFAULT` (core.js); the shader menu (N, dev/debug builds only) COPY button exports them.
