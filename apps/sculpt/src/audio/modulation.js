import {duration,clamp} from '../model.js';
import {voiceEnvelopeAt} from './live-envelope.js';
export function envelopeValue(env,time,voice={}) {
  const releaseAt=voice.releaseAt??null;
  const releaseLevel=releaseAt===null?0:voiceEnvelopeAt(env,releaseAt,{held:true});
  return voiceEnvelopeAt(env,time,{held:voice.held,releaseAt,releaseLevel});
}
export function modulatedParams(params,time,voice={}) {
  let pitch=0,position=0,cutoff=0;
  for(const env of params.envelopes||[]){
    const value=envelopeValue(env,time,voice)*env.amount;
    if(env.target==='pitch')pitch+=value;
    if(env.target==='wavePosition')position+=value;
    if(env.target==='cutoff')cutoff+=value;
  }
  return {pitch:clamp(params.pitch*2**(pitch/12),20,20000),
    wavePosition:clamp(params.wavePosition+position),
    cutoff:clamp(params.cutoff*2**cutoff,params.cutoffLow,20000)};
}
// Audio-clock automation also works in OfflineAudioContext (WAV export).
export function scheduleModulation(engine,v,now) {
  const envs=v.params.envelopes||[];
  if(!envs.length&&!v.hadModulation)return;
  v.hadModulation=true;
  const p=v.params,start=Math.max(now,v.start),elapsed=start-v.start;
  const end=v.releaseAt!==null?v.releaseAt+Math.max(p.release,...envs.map(e=>e.release)):
    v.held?Math.max(p.attack+p.decay,...envs.map(e=>e.attack+e.decay)):duration(p);
  const seconds=Math.max(.03,end-elapsed), count=Math.min(4096,Math.max(32,Math.ceil(seconds*250)));
  const samples=Array.from({length:count},(_,i)=>modulatedParams(p,elapsed+i/(count-1)*seconds,v));
  const automate=(param,values)=>{
    if(param.cancelAndHoldAtTime)param.cancelAndHoldAtTime(start);
    else param.cancelScheduledValues(start);
    param.setValueCurveAtTime(Float32Array.from(values),start,seconds);
  };
  const waveMod=envs.some(e=>e.target==='wavePosition');
  if(waveMod&&!v.waveBank){
    v.waveBank=true;
    for(const tone of [...v.tones]){
      tone.frame=0;
      for(let frame=1;frame<32;frame++){
        const osc=v.own(engine.context.createOscillator()),gain=v.own(engine.context.createGain()),pan=v.own(engine.context.createStereoPanner());
        osc.detune.value=tone.sign*p.detune/2;pan.pan.value=tone.sign*p.width*.85;
        gain.gain.value=0;osc.connect(gain).connect(pan).connect(v.input);osc.start(start);
        v.sources.push(osc);v.pitchedSources.push(osc);v.tones.push({osc,gain,pan,sign:tone.sign,frame});
      }
    }
  }
  for(const tone of v.tones){
    automate(tone.osc.frequency,samples.map(s=>s.pitch));
    if(v.waveBank){
      tone.osc.setPeriodicWave(engine.wave(p.harmonics,waveMod?tone.frame/31:p.wavePosition,p.waveTable));
      automate(tone.gain.gain,samples.map(s=>(1-p.noise)*.5*(waveMod?Math.max(0,1-Math.abs(s.wavePosition*31-tone.frame)):tone.frame===0?1:0)));
    }
  }
  automate(v.filters.high.frequency,samples.map(s=>s.cutoff));
}
