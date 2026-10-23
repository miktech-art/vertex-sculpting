# Vertex Sculpting — Sound/Sculpt + Beatbox

A browser instrument and shape sequencer. Sculpt creates sounds and their visual mappings; Connections edits those mappings; Beatbox sequences notes around editable 3D shapes. The pages keep their own visual styles and share saved Sculpt instruments.

## Quick start

Use Node.js 24+ and npm. With nvm, run `nvm install` to use `.nvmrc`.

```sh
git clone https://github.com/miktech-art/vertex-sculpting.git
cd vertex-sculpting
npm run setup
npm run dev
```

Open **http://localhost:5177**. All three tabs run on this same origin so saved sounds are available to Beatbox. Camera access works on localhost or HTTPS and requires browser permission. Audio starts after a user interaction.

In development, refresh after editing Sculpt. Beatbox rebuilds automatically when its source changes; refresh once the terminal reports the build finished. Stop with Ctrl+C. Set `PORT` to change the default port.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run setup` | Install Beatbox's exact locked dependencies; repeat after its lockfile changes |
| `npm run dev` | Build, serve Sculpt source, and watch/rebuild Beatbox |
| `npm test` | Run all Sculpt and Beatbox unit tests |
| `npm run test:sculpt` | Run Sculpt and shared-module tests |
| `npm run test:beatbox` | Run Beatbox unit tests |
| `npm run build` | Generate the complete static site in `dist/` |
| `npm run build:beatbox` | Rebuild only `dist/beatbox/` |
| `npm run preview` | Serve the existing production build on localhost:5177 |

Python is no longer required. The root project has no npm dependencies; `setup` installs the separate Beatbox package.

## Where to edit

```text
apps/
  sculpt/                 Sculpt + Connections: HTML, CSS, native ES modules
    src/audio/            Web Audio engine, live envelopes, WAV export
    src/tracking/         Camera worker and gesture bindings
    src/sculpt-instruments.js  Shared saved-instrument adapter
    vendor/mediapipe/     Camera runtime, model, licenses
  beatbox/                Vertex Sequencer: Vite + Three.js
    src/                  Scene, editing, transport, sampler, persistence
    public/stems/         Five bundled WAVs; replace source copies here
tests/                   Sculpt, shared-module, and local-server tests
scripts/                 Build and local development tools
docs/                    Architecture and retained implementation notes
dist/                    Generated site, ignored by Git
```

Edit source in `apps/`, never generated `dist/`. Beatbox imports the native audio engine and saved-instrument adapter from Sculpt; changing those modules can affect both apps. See [architecture](docs/ARCHITECTURE.md) and [contributing](CONTRIBUTING.md).

## Saved sounds and scenes

- Sculpt's bottom bar saves, renames, deletes, and restores sounds. JSON export/import provides portable sound backups.
- **Import preset**, below My sounds, adds each valid preset as a separate saved sound and selects its card. Importing never replaces an existing library entry. The factory saw starts with harmonics and a simple ADSR envelope; detune, noise, drive, tremolo, delay, and reverb are off. Existing saved sounds and resumed working edits retain their settings.
- Beatbox restores boxes, notes, effects, instruments, tempo, selection, and view after navigation or reload. Playback returns paused. Its intro appears once per browser; F1 opens help.
- Save a Sculpt sound, return to Beatbox, select a box, and choose **Instrument → Sculpted sounds**. The box shows that sound's static 3D sculpture instead of its usual cloud. Choosing a preset instrument restores the cloud. Assigned definitions are archived in the scene so deleting a library sound does not break existing boxes.

These records live in browser localStorage, not in GitHub. Different browsers, ports, and domains have separate storage. Local development does not automatically receive the live site's saved sounds, and collaborators do not automatically share libraries.

## Samples and third-party files

The supplied samples are included in `apps/beatbox/public/stems/`: `kick.wav`, `clap.wav`, `cymbal.wav`, `synth.wav`, and `bass.wav`. Replace those exact filenames and rebuild. Do not edit copies under `dist/`.

MediaPipe's runtime and hand model are retained locally so camera tracking does not depend on a runtime CDN. See [third-party notes](docs/THIRD_PARTY.md) for provenance and licenses.

## Collaboration and publishing

Work in separate branches, open pull requests, and merge passing changes into `main`. Ongoing integration work uses `mikael/integration`. GitHub Actions runs the tests and production build on pull requests and pushes to `main` or `mikael/integration`.

The current hosted app is [Sound/Sculpt](https://sound-form-mikvesch.sandywasp257.chatgpt.site/). This repository retains its `.openai/hosting.json` identity and builds the expected `dist/` directory. GitHub pushes do **not** deploy it automatically. Deploy a tested build from merged `main` through the existing Sites publishing workflow. Bring any hosting-side source changes back into this repository before the next deployment.
