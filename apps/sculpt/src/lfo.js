export const LFO_SHAPES=['Sine','Triangle','Saw up','Saw down','Square','Sample & hold'];
export const MOD_LIMITS={pitch:48,wavePosition:1,cutoff:8,amplitude:1,none:48};
export const defaultLfo=()=>({shape:0,target:'pitch',rate:1,amount:0,phase:0,delay:0,fade:0,offset:0});
export const getLfos=p=>p.lfos||[defaultLfo()];
export function lfoWave(shape,phase){
  const u=((phase%1)+1)%1;
  if(shape===1)return 1-4*Math.abs(u-.5);
  if(shape===2)return 2*u-1;
  if(shape===3)return 1-2*u;
  if(shape===4)return u<.5?1:-1;
  if(shape===5){const n=Math.sin(Math.floor(phase)*127.1+311.7)*43758.5453;return 2*(n-Math.floor(n))-1;}
  return Math.sin(u*2*Math.PI);
}
export const egTargetLimit=target=>target.startsWith('lfoRate:')?6:target.startsWith('lfoDepth:')?1:MOD_LIMITS[target];
export function validateLfos(value){
  if(!Array.isArray(value)||value.length<1||value.length>8)throw new Error('Invalid LFO list.');
  return value.map(lfo=>{
    if(!lfo||!Object.hasOwn(MOD_LIMITS,lfo.target))throw new Error('Invalid LFO destination.');
    const result={target:lfo.target};
    if(lfo.enabled!==undefined){if(typeof lfo.enabled!=='boolean')throw new Error('Invalid LFO power state.');result.enabled=lfo.enabled;}
    for(const [key,min,max] of [['shape',0,5],['rate',.05,30],['amount',-MOD_LIMITS[lfo.target],MOD_LIMITS[lfo.target]],['phase',0,1],['delay',0,2],['fade',0,3],['offset',-1,1]]){
      const n=lfo[key];if(!Number.isFinite(n)||n<min||n>max||(key==='shape'&&!Number.isInteger(n)))throw new Error(`Invalid LFO ${key}.`);
      result[key]=n;
    }
    return result;
  });
}

export const modulationEnvelopes=params=>exclusiveInstances([
  {...params,target:params.envelopeTarget||'amplitude',amount:params.envelopeAmount??0,enabled:params.envelopeEnabled!==false},...(params.envelopes||[])
]).filter((env,index)=>env.enabled!==false&&env.target!=='none'&&!(index===0&&env.target==='amplitude'));
export const validEgTarget=target=>typeof target==='string'&&(Object.hasOwn(MOD_LIMITS,target)||/^lfo(?:Rate|Depth):[0-7]$/.test(target));

export const egDestinations=params=>[['amplitude','Amplitude'],['pitch','Pitch'],['wavePosition','Wavetable position'],['cutoff','Filter cutoff'],...getLfos(params).flatMap((_,i)=>[[`lfoRate:${i}`,`LFO ${i+1} rate`],[`lfoDepth:${i}`,`LFO ${i+1} depth`]])];
export const lfoDestinations=[['pitch','Pitch'],['wavePosition','Wavetable position'],['cutoff','Filter cutoff'],['amplitude','Amplitude']];
export const envelopeInstances=params=>[{target:params.envelopeTarget||'amplitude',enabled:params.envelopeEnabled!==false},...(params.envelopes||[])];
export function availableDestinations(options,instances,index){
  const used=new Set(instances.filter((_,i)=>i!==index).map(i=>i.target).filter(t=>t!=='none'));
  return [['none','Unassigned'],...options.filter(([target])=>!used.has(target))];
}
// Keep legacy instance settings and indices while freeing duplicate destinations.
export function exclusiveInstances(instances){
  const used=new Set();
  return instances.map(instance=>{
    if(instance.target==='none'||used.has(instance.target))return {...instance,target:'none'};
    used.add(instance.target);return instance;
  });
}
export function normalizeAssignments(params){
  if(params.envelopes)params.envelopes=exclusiveInstances(envelopeInstances(params)).slice(1);
  if(params.lfos)params.lfos=exclusiveInstances(params.lfos);
  return params;
}
export const activeLfos=params=>exclusiveInstances(getLfos(params)).map(l=>l.enabled===false?{...l,target:'none'}:l);

export function selectionAfterRemoval(selected,removed,count){
  return selected>removed?selected-1:Math.min(selected,count-2);
}
export function removeEnvelope(params,index){
  const envs=params.envelopes||[];
  if(!envs.length||!Number.isInteger(index)||index<0||index>envs.length)return false;
  if(index===0){
    const next=envs[0];
    for(const stage of ['attack','decay','sustain','hold','release'])params[stage]=next[stage];
    params.envelopeTarget=next.target;params.envelopeAmount=next.amount;
    if(next.enabled===undefined)delete params.envelopeEnabled;else params.envelopeEnabled=next.enabled;
    params.envelopes=envs.slice(1);
  }else params.envelopes=envs.filter((_,i)=>i!==index-1);
  return true;
}
export function removeLfo(params,index){
  const lfos=getLfos(params);
  if(lfos.length<=1||!Number.isInteger(index)||index<0||index>=lfos.length)return false;
  params.lfos=lfos.filter((_,i)=>i!==index);
  const remap=target=>{
    const match=/^(lfo(?:Rate|Depth)):([0-7])$/.exec(target||'');
    if(!match)return target;
    const linked=Number(match[2]);
    return linked===index?'none':`${match[1]}:${linked>index?linked-1:linked}`;
  };
  if(params.envelopeTarget!==undefined)params.envelopeTarget=remap(params.envelopeTarget);
  if(params.envelopes)params.envelopes=params.envelopes.map(env=>({...env,target:remap(env.target)}));
  return true;
}
