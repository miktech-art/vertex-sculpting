# Sound / Form

A native browser instrument for exploring sound → visual mappings. Version 0.1.

## Run locally

Requires Python 3 to serve static modules. No installation or compilation is needed.

```sh
npm run dev
```

Open http://localhost:5177. Run the automated checks with `npm test` (Node 20+).

## Use

- Five starting sounds: Origin, Velvet, Fold, Afterimage, and Porous.
- Origin is a pure sine tone represented by a white line. Higher pitch increases line thickness under the default mapping.
- Source, Contour and Space expose 21 editable parameters. Audio changes take effect on the next trigger. Loop to audition changes repeatedly.
- Space / Play triggers the current sound; L toggles looping; Escape stops. Undo / redo uses Command/Ctrl Z and Shift Command/Ctrl Z.
- Drag to orbit; scroll to zoom; double-click to reset. Front gives an unrotated view.
- The complete sculpture stays visible when paused. Playback highlights the form over time. Delay produces repeated impressions; reverb adds diffuse structure.
- Connections supports drag or click between endpoints. Select a line to audition its source value and adjust strength, response curve, inversion, smoothing, or disconnection. Negative strengths subtract before the target is clamped.
- Save sound stores sound parameters and mappings together in this browser. JSON import/export is portable. WAV renders a stereo sound including delay and reverb.

## Architecture

The app deliberately has no framework or runtime dependencies. `dist/` is the complete deployable app and also its source.

- `src/model.js`: parameter definitions, normalization, physical units, ADSR, route resolver, factory presets, strict versioned file validation.
- `src/state.js`: document state, transactions, undo/redo and browser persistence.
- `src/audio/engine.js`: native Web Audio adapter, voice lifecycle, effects, offline rendering and WAV encoding.
- `src/visual/sculpture.js`: deterministic geometry independent of audio nodes; a canvas renderer with 3D projection and playback lighting. Geometry generation can be moved to WebGL without changing the audio or document format.
- `src/ui/mapping.js`: accessible connection endpoints, wires and route controls.
- `src/ui/contour.js`: amplitude envelope timeline.
- `src/app.js`: interface composition, transport and file actions.

The audio adapter contract is `trigger(params) -> Promise<{start, duration, total, params}>`, `now()`, and `stop()`. A future DAW adapter can supply events and timing through this boundary. External parameter names, limits and capabilities should be translated into the parameter model rather than coupled to the renderer.

Visual route values are normalized and aggregated per target. Each route has a response exponent, signed amount, inversion and smoothing time constant. The renderer applies smoothing to changes in the static parameter values. Playback time remains a separate input, so the paused sculpture does not depend on previous playback history.

## Preset format

`schema: "sound-form/preset-v1"` includes `name`, a complete `params` object, and an array of `routes`. Each route contains `source`, `target`, `amount` (-2…2), `curve` (0.2…4), `smoothing` (0…2 seconds), and `invert`. Import validates all parameters and endpoints before changing the document. IDs are recreated on import.

## Current boundaries

This is an editable additive/noise synth with paired detuned voices, a saturator, low-pass filter, tremolo, delay and convolution reverb. It imports this app's JSON presets, not Ableton, VST, Serum, or other third-party formats. Recording upload, hand tracking and external routing are deferred.

The static form describes synthesis settings through authored mappings; it is not a reconstruction of the output waveform or a perceptual audio analyzer. Disconnecting a connection can intentionally remove a quality from its visual representation. Modulation rate has no audible effect at zero depth; effect timing has no audible effect at zero mix.

Sounds are finite ADSR gestures: attack → decay → hold → release. Changes apply to the next trigger. Existing effect tails can overlap in Loop mode. Simultaneous playback is bounded at the interface; Stop fades active voices and disconnects their graphs. Sounds are limited at the output, but extreme resonance and effect settings can change perceived level.

Session and saved sounds live in localStorage. There is no account database or cloud library synchronization. Export JSON for backup.

## Validation

Automated checks cover preset/import constraints, parameter scale round trips, pitch → thickness, Origin's single line, ADSR timing, mapping composition, deterministic finite geometry, session undo/redo, voice scheduling/cleanup, conditional delay graphs, and stereo WAV encoding. Browser interaction and visual QA are performed against the private hosted app.

## Reference

Visual direction informed by Chronophase and the user's local VoidWave sculpture designs. This implementation uses original procedural geometry and does not bundle source or media from those projects.
