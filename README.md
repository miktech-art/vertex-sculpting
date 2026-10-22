# Sound/Sculpt

Version 0.10.0. A silent sound sculpture visualizer with editable preview values and a sound-to-visual Connections editor. The Serum/Ableton bridge is the next integration step; this version does not connect to a DAW.

## Run locally

No installation or compilation is required. With Python 3 installed, run from this folder:

```sh
python3 -m http.server 5177 --directory dist
```

Open http://localhost:5177. With Node.js 20 or newer, run `npm test` to check the model, note input, envelope, mappings, filters, echoes and input handling.

## Preview

- A S D F G H J K select C4 D4 E4 F4 G4 A4 B4 C5. On-screen note buttons also work. Each new press starts one finite, silent timeline pass. Holding a key does not retrigger it.
- Chords select the most recently pressed note; releasing it falls back to a remaining held note. After all notes are released, the static sculpture keeps the last note. This is a representative-note preview, not separate polyphonic rendering.
- Space previews one timeline pass, L toggles visual looping, Escape stops. Preview produces no audio or MIDI output.
- Note pitch is transient performance state, not one of the 21 editable or saved parameters. It is a dynamic connection source in Connections. Lower notes make thicker lines under the default mapping.
- The Source, Contour and Space controls edit visual preview settings while the external bridge is unavailable. The status explicitly says Serum is not connected. Dragging the ADSR handles edits the same preview model.
- Connections retains editable routes, response curves, strength, inversion, smoothing and the instructional visual examples. Dynamic Note pitch has no editable source-value slider.
- Drag the sculpture to orbit, Shift-drag to pan, scroll to zoom, double-click to reset. Fit time frames the full source and echo train. The time axis is always visible.
- Filtering dims the appropriate fixed harmonic bands; resonance crinkles the bands around the cutoffs. Echoes are offset along time and transversally. These are authored visual representations, not measured audio analysis.
- Save sound stores preview settings and mappings in this browser. JSON export/import is portable. This importer does not accept Serum presets yet.

## Structure

`dist/` contains both the complete source and deployable app. There are no runtime dependencies.

- `src/model.js`: 21 static parameter definitions, a separate dynamic note source, units, validation, envelope and mappings.
- `src/notes.js`: transient MIDI-note selection, representative-note policy and keyboard handling. Note events can be supplied here by a future adapter without changing the stored patch.
- `src/state.js`: documents, undo/redo and browser persistence. Notes never enter history or saved patch values.
- `src/visual/sculpture.js`: deterministic geometry, camera projection and timeline rendering. Fundamental frequency is supplied separately from patch parameters.
- `src/spectral/filter.js`: harmonic bands and an approximate frequency-response model used only for visualization.
- `src/delay.js` and `src/visual/echoes.js`: echo persistence, translations and time layout.
- `src/ui/`: envelope editing, dual cutoff range, continuous sliders, Connections and instructional diagrams.
- `src/app.js`: interface, silent preview transport and file actions.

The previous synthesis engine, WAV export, mute controls, tracking runtime, model assets and associated tests are removed. The intact v0.9.1 backup remains outside this project.

## Persistence and compatibility

New exports use `sound-sculpt/visual-preset-v2`. Legacy `sound-form/preset-v1` imports remain supported: saved `params.pitch` is discarded and route sources named `pitch` migrate to dynamic `notePitch`. Other parameter values and custom route settings are preserved. Session revision 4 migrates revision 2/3 browser sessions, initial snapshots and saved presets using the same validator. The existing storage key is preserved.

## Next integration

Serum will synthesize the sound inside Ableton. A Max for Live companion can observe exposed Serum parameters and MIDI note events, translate units into this visual model, and update the renderer. No bridge or external connection is claimed by this version. Begin with a simple initialized Serum patch before interpreting arbitrary presets. LFO interpretation and multiple-note sculptures are deferred.
