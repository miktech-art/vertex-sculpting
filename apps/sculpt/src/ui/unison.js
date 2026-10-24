import {unisonVoices} from '../oscillator/unison.js';
// Vertical position is the voice's fixed tuning in cents; horizontal offset is pan.
// At zero detune the pitches coincide, so their lines deliberately overlap.
export function unisonTraces(params){
  return unisonVoices(params).map(voice=>{
    const y=32-voice.cents/20*24,x=14+voice.pan*9;
    return {voice,path:`M${x.toFixed(2)} ${y.toFixed(2)} L${(x+92).toFixed(2)} ${y.toFixed(2)}`};
  });
}
export function renderUnison(container,params){
  const traces=unisonTraces(params);
  container.setAttribute('aria-label',`${traces.length} unison ${traces.length===1?'voice':'voices'}, ${(traces.length===1?0:params.detune).toFixed(1)} cents detune, ${Math.round(params.width*100)} percent stereo width`);
  container.innerHTML=`<svg viewBox="0 0 120 64" aria-hidden="true">${traces.map(({path})=>`<path d="${path}"/>`).join('')}</svg>`;
  container.style.opacity=params.noise===1?'0':String(.45+.45*(1-params.noise));
}
