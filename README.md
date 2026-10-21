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

Sounds are finite ADSR gestures: attack → decay → hold → release. Pitch changes live; other settings apply to the next trigger, with release also updating held notes. Existing effect tails can overlap in Loop mode. Simultaneous playback is bounded at the interface; Stop fades active voices and disconnects their graphs. Sounds are limited at the output, but extreme resonance and effect settings can change perceived level.

Session and saved sounds live in localStorage. There is no account database or cloud library synchronization. Export JSON for backup.

## Validation

Automated checks cover preset/import constraints, parameter scale round trips, pitch → thickness, sine's single line, ADSR timing, mapping composition, deterministic finite geometry, session undo/redo, voice scheduling/cleanup, conditional delay graphs, and stereo WAV encoding. Browser interaction and visual QA are performed against the private hosted app.

## Reference

Visual direction informed by Chronophase and the user's local VoidWave sculpture designs. This implementation uses original procedural geometry and does not bundle source or media from those projects.

Version 0.2 resets prior browser sounds and custom connections once, keeps only the sine factory preset, inverts the pitch/thickness default connection, and increases interface fonts by 2 px. New saves and mapping edits persist normally after the reset.

## Camera and hand bindings (v0.4.1)

Enable Camera in the upper right. The browser must allow camera access. Video and both labeled hand overlays are visible in the panel. Camera frames stay in the browser; MediaPipe assets are served from the app's origin.

Pitch: anatomical right-index Y → pitch, logarithmically spanning 55–1760 Hz between 88% and 12% of image height. Middle, ring, and pinky fingertips must be tightly curled into the palm, with the index straight at both joints (at least 165°). The thumb is unrestricted. Contact estimation checks tight joint angles plus the fingertip's position within the 3D palm region and within 18% of palm width of its plane. A webcam cannot verify physical skin contact; occlusion and landmark accuracy can affect this estimate.

Inference now receives the original, unmirrored camera frames, correcting the observed reversed hand assignment. Only the preview and overlay are mirrored. Hand selection uses model handedness with at least 70% confidence, never left/right screen position. Overlay labels L and R identify the selected anatomical hands.

Release: hold an open left hand within 15° of vertical in 3D, regardless of which side faces the camera. Its overall long-finger direction sets tilt, rather than testing every finger in the image. Three clear extended long fingers suffice, tolerating one occluded finger; thumb pose is unrestricted for this binding. Once acquired, tilt can drift to 22° before disengaging, avoiding boundary flicker.

Pinch the right thumb and index. Pinch entry allows a fingertip gap of 40% of palm scale (the larger of 3D palm width or 75% of wrist-to-middle-knuckle length); it stays pinched up to 62%. Close 2D fingertips can compensate for moderate 3D depth uncertainty at contact. Large 3D gaps still reject accidental projected overlap. Release accepts handedness confidence ≥55%; pitch retains its stricter ≥70% and palm-contact checks.

Horizontal separation between the left palm center and right pinch spans 20 ms–3 s logarithmically, from 8% to 60% of camera width. Greater separation means longer release; vertical motion does not affect it. Release changes update the preset, ADSR graph and sculpture. They apply to subsequent triggered notes and to held notes when released; finite notes already scheduled keep their original envelope. This gesture takes priority over pitch and does not trigger a note itself.

Release pose indicators have independent 50 ms acquisition and 180 ms dropout tolerance. The combined binding acquires after another 80 ms, with short interruptions tolerated rather than restarting acquisition. Missing hands or clearly broken poses freeze edits immediately, while stable indicators persist through short tracking gaps. Release values use 100 ms smoothing. Pitch acquisition (140 ms), smoothing (75 ms plus a 30 ms audio ramp), immediate invalid-pose freeze and 100 ms gate release are unchanged.

A valid pitch pose starts a sustained note; breaking it releases the note. Manual playback uses finite ADSR. Stop/Escape disarms both gestures until relaxed. Hiding the page or disabling Camera stops camera tracks and the worker. Each continuous gesture session is one undo transaction, including transitions between bindings.

`src/tracking/gesture.js` contains camera-independent geometry and binding state; `controller.js` owns camera frames, preview, and callbacks; `worker.js` runs MediaPipe off the UI thread with at most one frame in flight (25 Hz cap). Runtime is MediaPipe Tasks Vision 1.1.1, model Hand Landmarker float16 v1; license and sources are in `dist/vendor/mediapipe/`.

The v0.3 migration replaces the active v0.2 sound with saw, preserving connections and saves. v0.4 preserves the preset and edits.

Geometry tests cover contact proximity, index extension, left-hand yaw through 360°, ±14° acceptance and excess tilt rejection, occluded fingers, pinch rotation/depth uncertainty, simultaneous pose jitter/dropouts, hand order/crossing, ranges and smoothing. Camera/model startup and UI are checked in the hosted browser. Physical poses and hand assignment still need the user's live test.

## Frequency band filter (v0.5)

Filter band has two handles on a shared logarithmic 20 Hz–18 kHz track. The left handle sets the high-pass edge; the right handle sets the low-pass edge. Handles stop at one another. Pointer/touch dragging, clicking the nearest handle, arrow keys, and double-click reset work; each drag is one undo step. Both cutoff controls and resonance update active unreleased voices with 25 ms smoothing. Presets missing the low cutoff import at 20 Hz; previous default cutoff/detail and resonance/ridges routes migrate to the frequency-amplitude targets. Other parameters, saves and custom connections are preserved.

Audio uses a resonant second-order high-pass followed by a resonant second-order low-pass, including WAV export. Resonance is Web Audio's low/high-pass Q in dB. `src/spectral/filter.js` shares cutoff constraints, biquad response equations and oscillator partial amplitudes between audio and visuals. See [Web Audio filter characteristics](https://www.w3.org/TR/webaudio-1.0/#filters-characteristics).

The sculpture draws the fundamental in the center and fixed bands of increasing harmonic frequency outward. Low partials have individual bands; higher partials are grouped to keep the form readable. All 96 oscillator harmonics are represented once in the band model. Each band's brightness is scaled by the RMS neutral-resonance filter response across its partials, with visual amplitude compression for readability. Resonance uses a separate geometric encoding, as requested. Filter attenuation never alters strand count or coordinates. Resonance restores the original crinkled-ridge deformation, weighted by proximity to each cutoff in log frequency. It does not add brightness or glow, or deform distant bands. Moving a cutoff moves the localized crinkle region across bands. Core, particles, playback ripples and delay copies share the attenuation. Level can now dim the form fully to black.

This is an STFT-inspired, model-based harmonic view, not a measured spectrogram of the final effected signal. Detune, nonlinear drive, noise and reverb remain stylized, and frequency bands are visually compressed. Filter response uses the actual audio sample rate once initialized. Filter bounds, resonance localization, waveform topology, migration, audio routing, live updates and slider bounds have automated tests; the hosted browser is used to verify real pointer interactions and keyboard access.
