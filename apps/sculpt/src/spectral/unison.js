import {unisonVoices} from '../oscillator/unison.js';
import {wavetablePartial} from '../oscillator/wavetable.js';

// Narrow-band RMS envelope of the coherent voice sum, averaged across the two
// ears. Equal-power pan and 1/N voice gain match the audio graph. The common
// carrier cancels: only differences in accumulated oscillator cycles matter.
// Linear filter magnitude and phase are included; nonlinear drive/compression are not modeled.
export function createUnisonBandEnvelope(band,params,response){
  const voices=unisonVoices(params).map(v=>({...v,ratio:2**(v.cents/1200),angle:(v.pan+1)*Math.PI/4}));
  let constant=0;const pairs=[];
  for(const h of band.partials){
    const source=wavetablePartial(h,params),weights=voices.map(v=>source*response(params.pitch*h*v.ratio)*v.gain),
      phases=voices.map(v=>response.phase?.(params.pitch*h*v.ratio)??0);
    for(let i=0;i<voices.length;i++){
      constant+=weights[i]**2;
      for(let j=0;j<i;j++)pairs.push({
        delta:(voices[i].ratio-voices[j].ratio)*h,phase:phases[i]-phases[j],
        weight:2*weights[i]*weights[j]*Math.cos(voices[i].angle-voices[j].angle),
      });
    }
  }
  return (cycles,window=0)=>{
    let power=constant;
    for(const {delta,weight,phase} of pairs){
      // Average sub-pixel beating rather than drawing aliased zigzags.
      const smoothing=Math.exp(-.5*(2*Math.PI*delta*params.pitch*window)**2);
      power+=weight*Math.cos(2*Math.PI*delta*cycles+phase)*smoothing;
    }
    return Math.sqrt(Math.max(0,power));
  };
}
export const unisonBandAmplitude=(band,params,cycles,response,window=0)=>createUnisonBandEnvelope(band,params,response)(cycles,window);
