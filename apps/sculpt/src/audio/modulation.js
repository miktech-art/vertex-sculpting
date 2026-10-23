import {getLfos,lfoWave,MOD_LIMITS,modulationEnvelopes} from "../lfo.js";
import {duration,clamp} from '../model.js';
import {voiceEnvelopeAt} from './live-envelope.js';
export function envelopeValue(env,time,voice={}) {
  const releaseAt=voice.releaseAt??null;
  if(releaseAt!==null&&time<releaseAt)return voiceEnvelopeAt(env,time,{held:true});
  const releaseLevel=releaseAt===null?0:voiceEnvelopeAt(env,releaseAt,{held:true});
  return voiceEnvelopeAt(env,time,{held:voice.held,releaseAt,releaseLevel});
}
export function modulatedParams(params,time,voice={}) {
  const sums={pitch:0,wavePosition:0,cutoff:0,amplitude:0};
  const envelopes=modulationEnvelopes(params);
  const egValues=envelopes.map(env=>({target:env.target,value:envelopeValue(env,time,voice)*env.amount}));
  let envelopeGain=1;
  for(const env of envelopes)if(env.target==='amplitude')envelopeGain*=clamp(1+env.amount*(envelopeValue(env,time,voice)-1),0,2);
  for(const env of egValues)if(env.target!=='amplitude'&&Object.hasOwn(sums,env.target))sums[env.target]+=env.value;
  const lfos=getLfos(params);
  for(let index=0;index<lfos.length;index++){
    const lfo=lfos[index],t=time-lfo.delay;
    if(t<0)continue;
    // Integrate the EG-controlled rate from note onset, so phase stays anchored
    // when rate changes rather than jumping backwards or restarting each cycle.
    const rateEnvs=envelopes.filter(e=>e.target===`lfoRate:${index}`);
    let phase=lfo.phase;
    if(rateEnvs.length){
      const previous=voice.lfoPhaseCache?.get(index);
      const from=previous&&previous.time<=t?previous.time:0;
      phase=previous&&previous.time<=t?previous.phase:lfo.phase;
      const steps=Math.max(1,Math.ceil((t-from)*120)),dt=(t-from)/steps;
      for(let j=0;j<steps;j++){
        const at=lfo.delay+from+(j+.5)*dt;
        const octaves=rateEnvs.reduce((n,e)=>n+envelopeValue(e,at,voice)*e.amount,0);
        phase+=clamp(lfo.rate*2**octaves,.01,100)*dt;
      }
      voice.lfoPhaseCache?.set(index,{time:t,phase});
    }else phase+=t*lfo.rate;
    const depth=egValues.filter(e=>e.target===`lfoDepth:${index}`).reduce((n,e)=>n+e.value,0);
    const amount=clamp(lfo.amount+depth*MOD_LIMITS[lfo.target],-MOD_LIMITS[lfo.target],MOD_LIMITS[lfo.target]);
    const fade=lfo.fade?clamp(t/lfo.fade):1;
    sums[lfo.target]+=clamp(lfoWave(lfo.shape,phase)+lfo.offset,-1,1)*amount*fade;
  }
  return {pitch:clamp(params.pitch*2**(sums.pitch/12),20,20000),
    wavePosition:clamp(params.wavePosition+sums.wavePosition),
    cutoff:clamp(params.cutoff*2**sums.cutoff,params.cutoffLow,20000),
    amplitude:params.volume*envelopeGain*clamp(1+sums.amplitude,0,2)};
}
// Audio-clock automation also works in OfflineAudioContext (WAV export).
export function scheduleModulation(engine,v,now) {
  const envs=modulationEnvelopes(v.params);
  const lfos=getLfos(v.params),activeLfo=lfos.some(l=>l.amount!==0)||envs.some(e=>e.target.startsWith("lfo"));
  if(!envs.length&&!activeLfo&&!v.hadModulation)return;
  v.hadModulation=true;
  const p=v.params,start=Math.max(now,v.start),elapsed=start-v.start;
  const end=v.releaseAt!==null?v.releaseAt+Math.max(p.release,...envs.map(e=>e.release)):
    v.held?Math.max(p.attack+p.decay,...envs.map(e=>e.attack+e.decay)):duration(p);
  const seconds=v.held&&activeLfo?1:Math.max(.03,end-elapsed);
  const count=Math.min(16384,Math.max(32,Math.ceil(seconds*1000)));
  const state={...v,lfoPhaseCache:new Map()};
  const samples=Array.from({length:count},(_,i)=>modulatedParams(p,elapsed+i/(count-1)*seconds,state));
  const automate=(param,values)=>{
    if(param.cancelAndHoldAtTime)param.cancelAndHoldAtTime(start);
    else param.cancelScheduledValues(start);
    param.setValueCurveAtTime(Float32Array.from(values),start,seconds);
  };
  const waveMod=envs.some(e=>e.target==='wavePosition')||lfos.some(l=>l.target==='wavePosition');
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
  if(lfos.some(l=>l.target==='amplitude')||envs.some(e=>e.target==='amplitude')||v.hadLfoAmplitude){
    v.hadLfoAmplitude=true;automate(v.level.gain,samples.map(s=>s.amplitude));
  }
  if(v.modulationTask){clearTimeout(v.modulationTask);v.tasks.delete(v.modulationTask);v.modulationTask=null;}
  if(v.held&&activeLfo)v.modulationTask=engine.defer(v,()=>{v.modulationTask=null;if(!v.stopping)scheduleModulation(engine,v,engine.now());},500);
}
