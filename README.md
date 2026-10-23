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

Noise adds a dense deterministic particle field, weighted by broadband noise power through the actual filters and shaped by the amplitude envelope. It does not jitter harmonic ridges. Tonal contrast fades with the remaining oscillator power, `(1 − noise)²`: at 75% noise it is 6.25% of its original strength, at 90% it is 1%, and at 100% it is absent. Noise density uses instantaneous modeled RMS relative to a unit sine at the default output level; filter response, output level, and ADSR affect grain count without rounding off sharp attacks. Full noise uses a cached black-and-white static texture.

Reverb's audio return now reaches 100% (dry audio remains present); existing saved physical return levels are preserved. Audio and visuals share the identical deterministic stereo impulse. The visual model integrates its squared samples in 1 ms bins, applies the Web Audio convolver's RMS normalization, and convolves this energy with the source envelope power. A continuous RMS-amplitude display scale replaces the old logarithmic boost and arbitrary dry masking; this keeps audible low-level returns visible above Canvas colour quantization. Each glow stores an estimated pre-master RMS dB level, follows the visible harmonic/noise footprint, and has longitudinal blur bounded at the source onset. Tail energy decays after the source ends. This is an expected-energy estimate with sampled oscillator peak normalization, not a measured post-effects spectrogram or headphone SPL: exact tonal phase cancellation in the impulse, drive, tremolo, detune interference, and master compression are not modeled.

Primary mouse horizontal drag rotates around the central vertical axis; vertical drag spins around the local time/fundamental axis before yaw, keeping the base-frequency line fixed during that spin. Shift does not change primary-drag behavior. Middle drag retains rotation and Shift-middle retains panning. Wheel/trackpad zoom remains unchanged. Only the circle-and-cross view button resets and fits the view: parameter edits, sound switching, loading, comparison, resizing and double-clicks do not reframe it. Trackpad clicks arrive as mouse events in browsers, so the primary-drag restriction applies to those clicks too; scroll/pinch gestures are unchanged.

Left-drag locks to the first dominant direction after 4 pixels of movement and keeps that axis until release. Saved sound cards render the saved parameters and connections through the main sculpture renderer; unsaved workspace edits survive sound switching without changing those previews. The compact Save and New controls live under Undo/Redo. Save updates the selected saved sound directly, or asks for a name when creating its first saved instance.

The EG strip contains the contour knobs at the right and envelope selectors at the left. The filled circle selects the amplitude envelope by default; + adds an independent envelope with its own ADSR/hold settings, destination and signed depth (pitch in semitones, wavetable position in percent, or low-pass cutoff in octaves). Up to eight modulation envelopes add together. They are stored with the sound, workspace draft and JSON export. Modulation uses audio-clock curves, including offline WAV export; wavetable modulation crossfades a phase-aligned 32-frame oscillator bank. The main sculpture remains the base patch representation rather than a full time-varying modulated spectrum.

Transport and sound selection now sit below the workspace tabs. The bottom strip pairs EG and LFO panels, with eight EG knobs arranged in two rows of four. LFOs have independent instances, sine/triangle/rising saw/falling saw/square/sample-and-hold shapes, and rate, depth, phase, delay, fade and offset controls. They route to pitch, wavetable position, cutoff or amplitude. Additional EGs can modulate any LFO instance's rate (octaves) or depth (normalized to that destination's range). Legacy sounds start with a zero-depth sine LFO. LFOs persist in drafts, saved sounds and JSON, use the audio clock during playback and WAV export, and continue updating on held notes until release.
