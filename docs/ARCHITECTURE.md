# Architecture

## Applications

`apps/sculpt/` is a buildless application: its source layout is also its served layout. `index.html` loads `src/app.js`; `src/model.js` defines synthesis parameters and preset validation; `src/state.js` manages documents, undo history, and browser persistence. UI, procedural visuals, audio, and camera tracking have separate modules. The camera worker loads bundled MediaPipe assets relative to itself.

`apps/beatbox/` is a Vite application using Three.js and Web Audio. Its original module chain and runtime behavior are preserved. `src/lib/session.js` serializes and validates scenes; `core.js` loads the saved Sculpt instrument list; `audio.js` renders Sculpt presets to cached AudioBuffers with the native Sculpt engine. The original subsystem notes remain in `apps/beatbox/docs/`.

## Integration boundaries

- Navigation: Sculpt and Connections use root hash views; Beatbox is `/beatbox/`.
- Instrument reading: `apps/sculpt/src/sculpt-instruments.js` reads Sculpt's saved library without writing it.
- Rendering: Beatbox imports `apps/sculpt/src/audio/engine.js`; Vite bundles this engine and its dependencies into Beatbox. There is no second copy of its source.
- Persistence: Sculpt uses `sound-form:session:v1`. Beatbox uses `vertex.session.v1` and `vertex.intro.seen.v1`. Assigned Sculpt definitions are archived in the Beatbox scene. Names and stable IDs remain separate.
- Both pages must share the same scheme, hostname, and port to see the same localStorage. There is no backend or shared account database.

## Build and development

`npm run build` clears root `dist/`, copies `apps/sculpt/` into it, builds Beatbox from its locked package, and copies that output into `dist/beatbox/`. Source samples are copied by Vite. Generated files are not committed.

`npm run dev` first builds everything, then serves Sculpt directly from `apps/sculpt/` and Beatbox from `dist/beatbox/`. Vite watches Beatbox and the Sculpt modules it imports. Refresh to see changes. `npm run preview` serves only the completed production output, useful for checking the exact deployment artifact. Local servers bind to loopback and require no Python or extra server dependencies.

`.openai/hosting.json` retains the existing hosted project's identity and declares root `dist/` as its static directory. The GitHub workflow only checks code; publishing remains separate. Source history from the managed Site is retained before the repository-layout cleanup commit.

## Tests and historical notes

`npm test` uses Node's built-in runner for both applications and the local server. Tests import source directly, so they can run before a build. Production bundling then verifies cross-application imports and all five sample paths.

`docs/sculpt-reference.md` and Beatbox's `docs/ORIGINAL_*.md` preserve original design and implementation context. Their old paths and setup commands are historical; current workflow instructions live in the root README and CONTRIBUTING.md.
