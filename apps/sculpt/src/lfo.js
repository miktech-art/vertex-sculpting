export const LFO_SHAPES=['Sine','Triangle','Saw up','Saw down','Square','Sample & hold'];
export const MOD_LIMITS={pitch:48,wavePosition:1,cutoff:8,amplitude:1};
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
    for(const [key,min,max] of [['shape',0,5],['rate',.05,30],['amount',-MOD_LIMITS[lfo.target],MOD_LIMITS[lfo.target]],['phase',0,1],['delay',0,2],['fade',0,3],['offset',-1,1]]){
      const n=lfo[key];if(!Number.isFinite(n)||n<min||n>max||(key==='shape'&&!Number.isInteger(n)))throw new Error(`Invalid LFO ${key}.`);
      result[key]=n;
    }
    return result;
  });
}

export const modulationEnvelopes=params=>params.envelopeTarget&&params.envelopeTarget!=='amplitude'
  ?[{...params,target:params.envelopeTarget,amount:params.envelopeAmount??0},...(params.envelopes||[])]:params.envelopes||[];
export const validEgTarget=target=>typeof target==='string'&&(Object.hasOwn(MOD_LIMITS,target)||/^lfo(?:Rate|Depth):[0-7]$/.test(target));
