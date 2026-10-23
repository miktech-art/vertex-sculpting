# Sound/Sculpt

A browser instrument for sculpting sound and exploring its visual mappings. **Sculpt** edits a native synthesizer and its 3D form; **Connections** edits the relationships between sound parameters and visual properties.

The interface and sculpture rendering use only black, white, and gray. There is no camera access, hand tracking, or model download.

This branch, `mikael/sculpt`, is the standalone version. It was created from `mikael/integration`; the combined application remains on that branch.

## Run locally

Use Node.js 24+ (or `nvm install` with the included `.nvmrc`). There are no package dependencies to install.

```sh
git clone --branch mikael/sculpt https://github.com/miktech-art/vertex-sculpting.git
cd vertex-sculpting
npm run dev
```

Open **http://localhost:5177**. Source changes appear after refreshing the browser. Stop with Ctrl+C; set `PORT` to choose a different port. Audio begins after a user interaction.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Serve source directly, with no build or installation |
| `npm test` | Test synthesis, geometry, saved sounds, and the local server |
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
tests/                   Node test suite
scripts/                 Static build and local server
docs/                    Architecture and reference notes
dist/                    Generated output, ignored by Git
```

## Sounds and controls

The upper-right oscillator displays a stack of wavetable frames in black and white; the bright line is the active waveform. Choose **Basic shapes**, **Hollow**, or **Formant**, then turn **Position** to morph between frames. Basic shapes travels from sine through triangle and saw to square, with the same 32 displayed frames. The table menu uses the app’s monochrome styling. Table and position are saved with each sound and used in native WAV export. Presets without oscillator settings default to the saw position.

All numeric parameter and connection controls use minimal knobs: drag up/down with the pointer hidden (40% faster sensitivity), hold Shift for fine changes, double-click the dial to reset, or click the value to type. Arrow keys adjust focused knobs (Shift for fine steps); Home/End select limits. Typed values accept units such as Hz, kHz, ms, s, and %. Filter cutoff knobs stop at one another. The ADSR graph retains direct handle editing.

Four factory sounds—kick, bass, hi-hat, and synth—always appear at the left of the sound bar. Each starts with its own source, filter, and envelope settings. Working edits are remembered automatically for each factory sound, saved sound, and the New sound workspace, including across reloads. Switching sounds never asks you to save. Save sound names or overwrites a saved version, or creates a separate copy; comparison and reset use that version. Hold Space to loop and release to stop; L and the Loop button still toggle continuous looping. Source, Contour, and Space provide live parameter editing; Connections controls visual mappings.

Use the bottom shelf to save, rename, delete, restore, and switch sounds. **Import preset**, below My sounds, creates and selects a separate saved card. Export JSON for portable backups and WAV for rendered audio.

The session, sound library, and Recently deleted collection use browser localStorage. Existing saved sounds and working edits retain their settings. Browsers, domains, and ports have separate storage; GitHub does not synchronize your personal library.

## Development and publishing

See [contributing](CONTRIBUTING.md) and [architecture](docs/ARCHITECTURE.md). Edit source in `apps/sculpt/`; generated `dist/` files are replaced by builds. CI tests and builds this branch and pull requests. It does not deploy automatically.

The existing [hosted app](https://sound-form-mikvesch.sandywasp257.chatgpt.site/) uses the identity in `.openai/hosting.json` and serves `dist/`. Local commits, GitHub pushes, and publishing are separate actions. Commit and publish verified changes as requested; push only when authorized.

Third-party provenance and licenses are documented in [third-party notes](docs/THIRD_PARTY.md).

Harmonic ridge strength uses the oscillator coefficients and actual low/high-pass response (including resonance), summed as band power and displayed on a −60 to 0 dB relative scale with a gentle visual fade. The playhead uses the same strength, so absent harmonics stay absent during playback. Connections affect geometry without introducing extra spectral energy. This is an analytical source/filter spectrum, not a measured post-effects spectrogram or an SPL-calibrated hearing model; drive, delay, reverb, detune, and headphone response are not included in those harmonic levels.

Noise adds a dense deterministic particle field, weighted by broadband noise power through the actual filters and shaped by the amplitude envelope. It does not jitter harmonic ridges; at 100% noise the tonal ridges fade while the particles remain. Reverb adds a faint radial-gradient glow behind the dry form, with a convolution-shaped trailing decay on the same time axis. The glow is subdued beneath the dry envelope and becomes more distinct in the tail. These are perceptually informed visual models rather than measurements of the final output.

Noise density now follows the instantaneous modeled RMS level in dB relative to the original unit-tone baseline at the default output level. The filter response, output level, and ADSR all affect the grain count; the noise bandwidth no longer shrinks into a diffuse ball during attacks. Full noise uses a cached, dense black-and-white static texture. The reverb shell follows the visible harmonic/noise footprint with spectral-weighted inner lobes, padding outside the ridges, and a trailing decay. These are relative source models, not measured post-master dBFS or headphone SPL.
