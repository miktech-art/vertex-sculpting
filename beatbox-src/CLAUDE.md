# CLAUDE.md — Vertex Sequencer

Instructions for Claude Code working in this repo. Read this file first, then `docs/ARCHITECTURE.md` and `docs/DECISIONS.md`.

## What this is
A 3D shape sequencer and music visualiser. A black dot travels each form's outline; every corner it reaches plays a note.
Geometry is the composition: perimeter = loop length, corners = steps, open faces = rests, dot height = pitch.
Three.js r170 (npm, pinned `0.170.0`) + Web Audio, built with Vite. `npm run build:single` ships it as one self-contained file.

The owner is Veikko (3D artist / creative technologist; Blender, Rhino, Three.js, R3F). He works in VS Code with Claude Code on
Windows / PowerShell. **He prefers ask-before-coding:** before implementing anything non-trivial, list your uncertainties and the
defaults you would choose, then wait for his answers. Keep explanations short and plain; deliver working results.

## Repo
Lives at `C:\dev2\vertex-sequencer`, local git only (no remote). If it is ever pushed, the repo must be **private**.
Layout follows Veikko's other projects (`veikko-net`, `smc-site`): `README.md` + `CLAUDE.md` at the root, `docs/`,
Node tooling in `scripts/*.mjs` run via npm scripts, build output ignored. npm packages: `three`, `vite`, and dev tools
`eslint`, `globals`, `playwright-core` (later `@mediapipe/tasks-vision`). No Python.

- `public/stems/*.wav` (and any audio files) contain samples from someone else's track (HNTR — "Shook Ones Pt. III").
  **Never commit them**, to any repo. `dist/` and `dist-single/` contain them, so they are ignored too. See README → "Stems".
- The single-file output (`npm run build:single` → `dist-single/index.html`) must keep working: Veikko opens it directly in Chrome.
- Line endings are LF (`.gitattributes`).

## Module load order — easy to break
The modules share top-level state and run code as they load, so they must evaluate in the order
core → render → shape → cloud → audio → view → edit → ui → scene → loop (`ORDER` in `eslint.config.js`).
Each module's **first statement imports its predecessor** (`import './core.js';` in render.js, …) and `main.js` imports `loop.js`;
ES module evaluation then walks down the chain and runs it from core upwards. Never let an import sorter / "Organize Imports"
reorder those lines. A new module must be inserted into the chain and into `ORDER`. `npm run lint` enforces all of this.

Imported bindings are read-only: a top-level `let` that another module writes needs a setter in its own module
(`setBars`, `setActive`, `setCamera`, … next to the declarations). Lint's `no-import-assign` catches a missed one.

## Build & run
```powershell
npm run dev            # dev server, http://localhost:5173 (test hooks on)
npm run build          # -> dist/ (needs a server: npm run preview)
npm run build:debug    # dist/ with the test hooks
npm run build:single   # -> dist-single/index.html, one file with the JS and stems inlined; opens from file://
npm run preview        # serve dist/ at http://localhost:4173 (webcam needs http://localhost, not file://)
```
Stems: `core.js` fetches `public/stems/*.wav` while the page loads; in single mode the `virtual:stems` plugin in
`vite.config.js` inlines them as base64 instead.

## How to verify changes
- `npm run lint`: undefined names, writes to imported bindings, module load order.
- Test hooks: `npm run dev` and debug builds expose `window._dbg` (shapes, stacks, bars, settings, audio, toScreen…) and
  `window._ev` (every scheduled note: `[sound, time, freq, vel, ctxTime]`), behind
  `import.meta.env.DEV || import.meta.env.MODE === 'debug'`; release builds drop them.
- **Timing regression test — `npm run check:timing`, before every commit.** In the default scene every bar must be — kick 16ths
  {0,4,8,12}, clap {4,12}, cymbal {2,6,10,14}, synth {2,6,10,14} at 174.61 Hz (F3), bass {0,4,8,12} at 58.27 Hz (B♭1), at
  132 BPM. If a change alters this, it is a bug. The script builds a debug build, plays 4 bars in Chrome (400×260 window,
  autoplay allowed) and checks every note; `npm run check:timing -- <url>` checks a running page (e.g. the dev server).
- **Unit tests — `npm run test`** (Node's built-in runner, `test/*.test.mjs`): the pure modules in `src/lib/` (height = pitch maths).
- Visual: look at it. Low frame rates in headless browsers make the audio clock skip (frames > 0.6 s are dropped on purpose),
  which is why the timing check runs in a small window.

## Rules that are easy to break
- **Strictly functional design:** every visual or control needs one unique, intuitive job, and nothing shows the same thing twice.
  Don't add decoration; when something has no job, propose cutting it or giving it one.
- Distance = time: `UNITS_PER_BAR = 4` (1 unit = 1 beat), snap = 1/16 = 0.25 units. Never change a form's perimeter silently.
- Only the five song stems exist as sounds. Don't reintroduce synthesized voices unless asked.
- Colour = instrument (palette in `core.js`); brightness only *shows* pitch. Pitch comes from height above the floor (scale steps,
  a C-plane per octave, `PITCH` in `core.js`); never let height change timing — loop length is measured from above.
- Look defaults live in `FX_DEFAULT` (`core.js`). Veikko tunes them in the shader menu (N, dev/debug builds only) and sends JSON from its COPY button;
  paste those values into `FX_DEFAULT` exactly.
- Controls follow Blender (G/R/S, Tab edit mode, 1/2/3 vert/edge/face, Shift+A, Shift+D, numpad views) plus a Rhino-style gumball.
- Keep `docs/DECISIONS.md` up to date when a design decision is made or reversed.

## Next feature on the list
Hand controls with MediaPipe (`@mediapipe/tasks-vision` HandLandmarker) — see `docs/ROADMAP.md`. The gesture mapping is
**not decided yet**: ask the open questions listed there before building.
