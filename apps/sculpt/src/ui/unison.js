import {unisonVoices} from '../oscillator/unison.js';
// Each row is one voice's phase relative to the base pitch over two seconds.
// Horizontal displacement follows its actual stereo pan.
export function unisonTraces(params){
  const voices=unisonVoices(params);
  return voices.map((voice,index)=>{
    const y=voices.length===1?32:8+index*48/(voices.length-1);
    const points=Array.from({length:97},(_,j)=>{
      const t=j/96*2,x=14+j/96*92+voice.pan*9;
      return `${j?'L':'M'}${x.toFixed(2)} ${(y-Math.sin(2*Math.PI*(voice.frequency-params.pitch)*t)*2.5).toFixed(2)}`;
    }).join(' ');
    return {voice,path:points};
  });
}
export function renderUnison(container,params){
  const traces=unisonTraces(params);
  container.setAttribute('aria-label',`${traces.length} unison ${traces.length===1?'voice':'voices'}, ${params.detune.toFixed(1)} cents detune, ${Math.round(params.width*100)} percent stereo width`);
  container.innerHTML=`<svg viewBox="0 0 120 64" aria-hidden="true">${traces.map(({path})=>`<path d="${path}"/>`).join('')}</svg>`;
  container.style.opacity=params.noise===1?'0':String(.45+.45*(1-params.noise));
}
