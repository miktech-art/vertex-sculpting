# Sound / Form

A native browser instrument for exploring sound → visual mappings. Version 0.3.

## Run locally

Requires Python 3 to serve static modules. No installation or compilation is needed.

```sh
npm run dev
```

Open http://localhost:5177. Run the automated checks with `npm test` (Node 20+).

## Use

- One starting sound: saw, a paired detuned source with 96 harmonics, low-pass filtering, saturation, noise, tremolo, delay, and reverb. Lower pitch increases line thickness under the default mapping.
- Drag the A, D, S, and R envelope handles to edit attack, decay/sustain level, hold/sustain level, and release. Arrow keys adjust the focused handle; Shift uses larger increments.
- Source, Contour and Space expose 21 editable parameters. Pitch changes update active voices immediately. Other audio changes take effect on the next trigger. Loop to audition changes repeatedly.
- Space / Play triggers the current sound; L toggles looping; Escape stops. Undo / redo uses Command/Ctrl Z and Shift Command/Ctrl Z.
- Drag to orbit; scroll to zoom; double-click to reset. Front gives an unrotated view.
- The complete sculpture stays visible when paused. Playback highlights the form over time. Delay produces repeated impressions; reverb adds diffuse structure.
- Connections supports drag or click between endpoints. Select a line to audition its source value and adjust strength, response curve, inversion, smoothing, or disconnection. Negative strengths subtract before the target is clamped.
- Save sound stores sound parameters and mappings together in this browser. JSON import/export is portable. WAV renders a stereo sound including delay and reverb.

## Architecture

The app deliberately has no framework or runtime dependencies. `dist/` is the complete deployable app and also its source.

- `src/model.js`: parameter definitions, normalization, physical units, ADSR, route resolver, the saw preset, strict versioned file validation.
- `src/state.js`: document state, transactions, undo/redo and browser persistence.
- `src/audio/engine.js`: native Web Audio adapter, voice lifecycle, effects, offline rendering and WAV encoding.
- `src/visual/sculpture.js`: deterministic geometry independent of audio nodes; a canvas renderer with 3D projection and playback lighting. Geometry generation can be moved to WebGL without changing the audio or document format.
- `src/ui/mapping.js`: accessible connection endpoints, wires and route controls.
- `src/ui/contour.js`: pointer and keyboard envelope editing, bounded stage updates, and playback timeline.
- `src/app.js`: interface composition, transport and file actions.

The audio adapter contract is `trigger(params) -> Promise<{start, duration, total, params}>`, `now()`, and `stop()`. A future DAW adapter can supply events and timing through this boundary. External parameter names, limits and capabilities should be translated into the parameter model rather than coupled to the renderer.

Visual route values are normalized and aggregated per target. Each route has a response exponent, signed amount, inversion and smoothing time constant. The renderer applies smoothing to changes in the static parameter values. Playback time remains a separate input, so the paused sculpture does not depend on previous playback history.

## Preset format

`schema: "sound-form/preset-v1"` includes `name`, a complete `params` object, and an array of `routes`. Each route contains `source`, `target`, `amount` (-2…2), `curve` (0.2…4), `smoothing` (0…2 seconds), and `invert`. Import validates all parameters and endpoints before changing the document. IDs are recreated on import.

## Current boundaries

This is an editable additive/noise synth with paired detuned voices, a saturator, low-pass filter, tremolo, delay and convolution reverb. It imports this app's JSON presets, not Ableton, VST, Serum, or other third-party formats. Recording upload and external routing are deferred.

The static form describes synthesis settings through authored mappings; it is not a reconstruction of the output waveform or a perceptual audio analyzer. Disconnecting a connection can intentionally remove a quality from its visual representation. Modulation rate has no audible effect at zero depth; effect timing has no audible effect at zero mix.

Sounds are finite ADSR gestures: attack → decay → hold → release. Changes apply to the next trigger. Existing effect tails can overlap in Loop mode. Simultaneous playback is bounded at the interface; Stop fades active voices and disconnects their graphs. Sounds are limited at the output, but extreme resonance and effect settings can change perceived level.

Session and saved sounds live in localStorage. There is no account database or cloud library synchronization. Export JSON for backup.

## Validation

Automated checks cover preset/import constraints, parameter scale round trips, pitch → thickness, sine's single line, ADSR timing, mapping composition, deterministic finite geometry, session undo/redo, voice scheduling/cleanup, conditional delay graphs, and stereo WAV encoding. Browser interaction and visual QA are performed against the private hosted app.

## Reference

Visual direction informed by Chronophase and the user's local VoidWave sculpture designs. This implementation uses original procedural geometry and does not bundle source or media from those projects.

Version 0.2 resets prior browser sounds and custom connections once, keeps only the sine factory preset, inverts the pitch/thickness default connection, and increases interface fonts by 2 px. New saves and mapping edits persist normally after the reset.

## Camera and hand binding (v0.3)

Enable Camera in the upper right. The browser must allow camera access. Video and the hand overlay are visible in the camera panel. No audio is recorded. Camera frames are processed locally; the app has no video upload endpoint. MediaPipe assets are served from this same app origin.

The single movement binding is anatomical right-index Y → pitch, logarithmically spanning 55–1760 Hz between 88% and 12% of image height. Middle, ring, and little fingers must all be curled. The thumb and index curl do not add requirements. The captured image is explicitly mirrored before inference, matching MediaPipe's handedness convention; the preview is mirrored the same way.

The pose must remain valid for 140 ms to activate. While active, index height updates pitch with a 75 ms smoothing constant and a 30 ms audio ramp. Invalid poses stop pitch updates immediately. The note releases after 100 ms of invalid pose to avoid gate chatter; a tracking watchdog handles stalled frames. A valid pose starts a sustained ADSR note; opening the pose releases it. Manual playback remains a finite ADSR event. Stop/Escape disarms the binding until the hand opens. Hiding the page or disabling Camera stops the camera tracks and worker.

`src/tracking/gesture.js` contains the camera-independent geometry and binding state. `controller.js` owns the stream, mirrored frames, preview, and callbacks. `worker.js` runs MediaPipe Hand Landmarker off the UI thread, with at most one in-flight frame (25 Hz cap). Vendor runtime version is 1.1.1 and the model is Hand Landmarker float16 v1. Source references and license are in `dist/vendor/mediapipe/`.

The v0.3 migration replaces the active v0.2 sound with the saw preset while preserving its connections and saved library. Future edits persist normally. Gesture pitch changes are one undo transaction per pose.

Real hand and lighting variations affect curl estimation. Unit tests use geometry fixtures for gating, handedness, range, rotation, missing data, and smoothing; camera/model startup and UI are checked in the hosted browser. End-to-end movement should also be tried with the user's own right hand.
