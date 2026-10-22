# First Serum/Ableton reference session

Use your existing Serum 2 instrument inside Ableton. No separate Serum application is needed for this integration.

## Reference patch

Start with Menu → Init Preset. Keep a simple harmonically rich saw wave on OSC A, rather than a complex factory preset. The purpose is to establish a known patch where each observed control is easy to identify.

Suggested starting values (these are a reference recipe, not an exact acoustic match to the old browser synthesizer):

| Section | Starting setting |
| --- | --- |
| OSC A | Saw wave, four unison voices, modest detune |
| Other oscillators | Off initially |
| Noise | Optional, at a low level |
| ENV 1 | Attack 80 ms, decay 450 ms, sustain about 70%, release about 1 s |
| FILTER 1 | Low 12 low-pass, OSC A routed through it, cutoff about 4 kHz, modest resonance |
| Modulation | Leave LFO assignments, arpeggiator and sequencer unused initially |
| Effects | Start with delay/reverb bypassed; add them after basic synchronization works |

The second filter can later provide the low-frequency edge. Filter and effects routing will be verified from the saved patch before translating their settings into the visual model. There is no need to manually wire every visual property yet.

Save the patch as **SoundSculpt Reference.SerumPreset** and supply that file for decoder inspection.

## Ableton preparation

1. Keep Serum 2 on its own MIDI track. Rename it **SoundSculpt Reference**.
2. Arm the track if you want to play through an external MIDI keyboard or Live's computer MIDI keyboard.
3. Make a simple repeating MIDI clip: one note held for roughly one second, then enough silence to hear the release. Use a note near 220 Hz (MIDI note 57); octave naming differs between apps.
4. For this test, generate notes through Live's MIDI clip or a controller feeding the track. This provides incoming note events that a companion MIDI device can observe, rather than depending on Serum's own clickable keyboard.
5. In Serum's Live device panel, click **Configure**. Move ENV 1 attack, decay, sustain and release; Filter 1 cutoff and resonance; and master level to expose those controls. Exit Configure. These seven are sufficient for the first synchronization test; the remaining bindings can be added afterward.
6. Save the Live Set. This saves the selected plugin parameter configuration with the session.

The planned companion will be a Max for Live MIDI device before Serum, observing the selected Serum instance and receiving the incoming notes. No companion has been installed or connected by v0.10.0. Live's Trial includes Max for Live.

## Sources

- [Xfer: creating a new sound](https://xferrecords.com/web-manual/serum-2/creating-a-new-sound)
- [Xfer: routing an oscillator or filter](https://xferrecords.com/web-manual/serum-2/routing-an-oscillator-or-filter)
- [Ableton: plug-in Configure mode](https://www.ableton.com/en/live-manual/12/using-plug-ins/#plug-in-configure-mode)
- [Ableton: Live Trial features](https://help.ableton.com/hc/en-us/articles/209071129-Installing-the-Live-Trial)
