import { duration, envelopeAt, clamp } from "../model.js";

export function voiceEnvelopeAt(
  params,
  elapsed,
  { held = false, releaseAt = null, releaseLevel = 0 } = {},
) {
  if (elapsed < 0) return 0;
  if(params.envelopeEnabled===false){
    if(releaseAt!==null)return clamp(1-(elapsed-releaseAt)/.01);
    return held?1:clamp((duration(params)-elapsed)/.01);
  }
  if (releaseAt !== null)
    return releaseLevel * clamp(1 - (elapsed - releaseAt) / params.release);
  if (held && elapsed >= params.attack + params.decay) return params.sustain;
  return envelopeAt(params, elapsed);
}
// Future landmarks remain anchored to the original note start; no attack retrigger.
export function futureEnvelope(
  params,
  elapsed,
  { held = false, releaseAt = null, releaseLevel = 0 } = {},
) {
  if(params.envelopeEnabled===false){
    const points=releaseAt!==null?[{time:releaseAt+.01,value:0}]:held?[]:[{time:Math.max(0,duration(params)-.01),value:1},{time:duration(params),value:0}];
    return points.filter(p=>p.time>elapsed);
  }
  if (releaseAt !== null)
    return [{ time: releaseAt + params.release, value: 0 }].filter(
      (p) => p.time > elapsed,
    );
  const points = [
    { time: params.attack, value: 1 },
    { time: params.attack + params.decay, value: params.sustain },
  ];
  if (!held)
    points.push(
      {
        time: params.attack + params.decay + params.hold,
        value: params.sustain,
      },
      { time: duration(params), value: 0 },
    );
  return points.filter((p) => p.time > elapsed);
}
