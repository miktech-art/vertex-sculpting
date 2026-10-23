export const unisonCount=params=>Math.max(1,Math.min(8,Math.round(params.unison??2)));
// Detune is the full outer-voice separation; width uses the existing stereo range.
export function unisonVoices(params){
  const count=unisonCount(params);
  return Array.from({length:count},(_,index)=>{
    const position=count===1?0:index*2/(count-1)-1,cents=position*params.detune/2;
    return {index,position,cents,pan:position*params.width*.85,gain:1/count,frequency:params.pitch*2**(cents/1200)};
  });
}
