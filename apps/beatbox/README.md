# Beatbox / Vertex Sequencer

The integrated Three.js + Web Audio shape sequencer. Use the **root README** for setup, development, tests, and production builds. Run the complete app on one origin so Sculpt instruments and all three navigation tabs work together.

## Editing

`index.html` holds the light theme and panels; `src/` holds the scene, geometry, editor, audio engine, and frame loop. `src/lib/` contains the pure pitch and scene-persistence helpers.

The original module chain has initialization dependencies. Read `docs/ARCHITECTURE.md` before changing module load order. Current integration boundaries are documented in the root `docs/ARCHITECTURE.md`.

## Stems

All five supplied WAVs are included in `public/stems/`. Replace `kick.wav`, `clap.wav`, `cymbal.wav`, `synth.wav`, or `bass.wav` here and run `npm run build` from the repository root. Do not replace generated copies under `dist/`.

## Saved Sculpt instruments

`core.js` reads Sculpt's browser library through `../sculpt/src/sculpt-instruments.js` (relative to this app directory). `audio.js` uses the native Sculpt renderer to cache pitched samples. Definitions assigned to boxes are archived in the scene. Returning from Sculpt refreshes the available library and restores the Beatbox scene paused.

## Additional developer commands

From this directory, `npm test` runs Beatbox's unit tests, `npm run lint` runs its existing ESLint configuration, `npm run build:debug` includes debug hooks, and `npm run build:single` creates an embedded standalone HTML build in `dist-single/`. Standalone builds cannot share storage with the hosted Sculpt page.

`npm run check:timing` is an optional browser timing check that needs installed Google Chrome. It is separate from the root unit-test and CI commands. The existing standalone Vite development server is useful for isolated Beatbox work; use the root development command for integration work.

Original design references are retained in `docs/ORIGINAL_README.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md`, and `docs/ORIGINAL_AGENT_NOTES.md`. They describe the upstream app before this integration.
