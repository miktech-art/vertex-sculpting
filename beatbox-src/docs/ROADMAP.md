# Roadmap

## 0 · Restructure to match Veikko's other projects — done (Oct 2026)
Moved to `C:\dev2\vertex-sequencer`, git initialised, build ported to `scripts/build.mjs` + npm scripts (Python dropped).
Output was verified byte-identical to the old build.

## 0b · Vite — done (Oct 2026)
Parts → ES modules in `src/`, three.js from npm (0.170.0), stems as `public/stems/*.wav`, `build:single` for the one-file
version, ESLint (incl. load-order rule), `check:timing` with playwright-core.

## 1 · Hand controls (MediaPipe)
Library: `@mediapipe/tasks-vision` → `HandLandmarker` (21 landmarks per hand, up to 2 hands, runs in the browser via WASM,
model file `hand_landmarker.task` from Google's storage). Needs a camera, so serve over `http://localhost` (`npm run dev` /
`npm run preview`).

Note for later: once hand tracking exists, `build:single` is no longer fully offline — MediaPipe loads its WASM files and the
hand model at runtime (from a CDN, or from files we ship). The camera also won't work from `file://`. Decide then whether
the single file keeps hand controls (CDN) or leaves them to the served build.

Proposed shape of the feature (to confirm): toggle with **H**; small mirrored camera preview with the hand skeleton;
a fingertip cursor projected into the scene.

**Open questions — ask Veikko before building:**
1. Mainly for **performing** (shaping sound live) or for **building** (placing/editing forms)?
2. Gesture mapping — proposal: pinch (thumb + index) = grab & move a form, release over a form = stack · pinch on a dot +
   move up/down = pitch · open palm turning = orbit · two hands apart/together = zoom · fist = play/stop.
3. Should hand pose (distance to camera, rotation) drive effect amounts live? Which effects? Recordable as motion loops?
4. One hand or two (e.g. one hand picks *what*, the other sets *how much*)?

## Ideas parked
- Clean the module split into a shared `state` module (instead of the load-order chain + setters) — when hand controls give it a reason.
- Per-state look settings (REST / HIT / PULSE) — currently one shared set.
- Height = stem length (gate the sample by form height) — offered, not decided.
- More effects: reverb as an effect, filter sweep (low-pass ↔ high-pass).
