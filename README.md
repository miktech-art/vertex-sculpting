# Sound/Sculpt

A browser instrument for sculpting sound and exploring its visual mappings. **Sculpt** edits a native synthesizer and its 3D form; **Connections** edits the relationships between sound parameters and visual properties.

This branch, `mikael/sculpt`, is the standalone version. It was created from `mikael/integration`; the combined application remains on that branch.

## Run locally

Use Node.js 24+ (or `nvm install` with the included `.nvmrc`). There are no package dependencies to install.

```sh
git clone --branch mikael/sculpt https://github.com/miktech-art/vertex-sculpting.git
cd vertex-sculpting
npm run dev
```

Open **http://localhost:5177**. Source changes appear after refreshing the browser. Stop with Ctrl+C; set `PORT` to choose a different port. Camera tracking requires permission and localhost or HTTPS. Audio begins after a user interaction.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Serve source directly, with no build or installation |
| `npm test` | Test synthesis, geometry, gestures, saved sounds, and the local server |
| `npm run build` | Generate the complete static site in `dist/` |
| `npm run preview` | Serve an existing production build on localhost:5177 |

## Source layout

```text
apps/sculpt/
  index.html, style.css   Interface and styles
  src/model.js           Parameters, preset validation, mapping definitions
  src/state.js           Persistence, sound library, undo/redo
  src/audio/             Native Web Audio synthesis and WAV export
  src/visual/            Procedural sculpture geometry and rendering
  src/ui/                Envelope, filter, and connection controls
  src/tracking/          Camera worker and hand gestures
  vendor/mediapipe/      Bundled runtime, model, and licenses
tests/                   Node test suite
scripts/                 Static build and local server
docs/                    Architecture and reference notes
dist/                    Generated output, ignored by Git
```

## Sounds and controls

The factory saw starts with harmonics and a short ADSR envelope. Detune, noise, drive, tremolo, delay, and reverb start off. Source, Contour, and Space provide live parameter editing; Connections controls visual mappings. Camera gestures can control the envelope and Loop transport.

Use the bottom shelf to save, rename, delete, restore, and switch sounds. **Import preset**, below My sounds, creates and selects a separate saved card. Export JSON for portable backups and WAV for rendered audio.

The session, sound library, and Recently deleted collection use browser localStorage. Existing saved sounds and working edits retain their settings. Browsers, domains, and ports have separate storage; GitHub does not synchronize your personal library.

## Development and publishing

See [contributing](CONTRIBUTING.md) and [architecture](docs/ARCHITECTURE.md). Edit source in `apps/sculpt/`; generated `dist/` files are replaced by builds. CI tests and builds this branch and pull requests. It does not deploy automatically.

The existing [hosted app](https://sound-form-mikvesch.sandywasp257.chatgpt.site/) uses the identity in `.openai/hosting.json` and serves `dist/`. Local commits, GitHub pushes, and publishing are separate actions. Commit and publish verified changes as requested; push only when authorized.

Third-party provenance and licenses are documented in [third-party notes](docs/THIRD_PARTY.md).
