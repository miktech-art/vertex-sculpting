# Architecture

`apps/sculpt/` is a buildless native ES-module application. Its source layout is also its served layout. `index.html` loads `src/app.js`, which composes the Sculpt and Connections views.

- `model.js`: parameter ranges, physical units, factory preset, validation, and visual mappings.
- `state.js`: current document, saved and deleted sounds, persistence, and undo/redo.
- `audio/`: native Web Audio synthesis, effects, live envelope editing, and offline WAV rendering.
- `visual/`: deterministic geometry generated from the sound and its mappings; canvas rendering and temporal echoes.
- `ui/`: envelope, filter-band, slider, and connection controls.

Both views share one document. Sculpt's localStorage key remains `sound-form:session:v1`; preset schema and library IDs remain compatible. No accounts or backend library are required. Files can be exported and imported as JSON; rendering to WAV runs in the browser.

`npm run dev` serves source directly with the Node static server. `npm run build` replaces `dist/` with a clean copy of `apps/sculpt/`. `npm run preview` serves the resulting static site. Neither development nor production needs a package install. CI runs the Node tests and static build without a bundler.

`.openai/hosting.json` retains the existing hosted project's identity and declares `dist/` as the static output. Publication and GitHub synchronization remain separate.

`docs/sculpt-reference.md` preserves historical synthesis and visual design notes; use the root README for current paths and commands. The standalone branch preserves previous application history without rewriting it.
