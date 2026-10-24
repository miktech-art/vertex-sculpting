// Physical QWERTY keys: C4 through E5, including the black keys.
export const KEYBOARD_NOTES=Object.fromEntries(['KeyA','KeyW','KeyS','KeyE','KeyD','KeyF','KeyT','KeyG','KeyY','KeyH','KeyU','KeyJ','KeyK','KeyO','KeyL','KeyP','Semicolon'].map((code,index)=>[code,index]));
export function installComputerKeyboard(target,{noteOn,noteOff,isBlocked=()=>false,onError=()=>{}}){
  const pressed=new Map();let baseNote=60;
  const consume=event=>{event.preventDefault();event.stopPropagation();};
  const release=entry=>{entry.released=true;if(entry.voice&&!entry.offCalled){entry.offCalled=true;noteOff(entry.voice);}};
  const releaseAll=()=>{for(const entry of pressed.values())release(entry);pressed.clear();};
  target.addEventListener('keydown',event=>{
    // Already-owned keys stay owned if focus or modifiers change mid-press.
    if(pressed.has(event.code)){consume(event);return;}
    if(event.metaKey||event.ctrlKey||event.altKey||event.target?.isContentEditable||event.target?.matches('input,textarea,select')||isBlocked())return;
    if(event.code==='KeyZ'||event.code==='KeyX'){
      consume(event);if(!event.repeat)baseNote=Math.max(24,Math.min(108,baseNote+(event.code==='KeyZ'?-12:12)));return;
    }
    const offset=KEYBOARD_NOTES[event.code];if(offset===undefined||event.repeat)return;
    consume(event);const entry={released:false,voice:null,offCalled:false};pressed.set(event.code,entry);
    const ready=voice=>{entry.voice=voice;if(entry.released)release(entry);};
    const failed=error=>{if(pressed.get(event.code)===entry)pressed.delete(event.code);onError(error);};
    try{const result=noteOn(baseNote+offset);if(result?.then)result.then(ready,failed);else ready(result);}catch(error){failed(error);}
  },true);
  target.addEventListener('keyup',event=>{
    const entry=pressed.get(event.code);if(!entry)return;
    consume(event);pressed.delete(event.code);release(entry);
  },true);
  target.defaultView?.addEventListener('blur',releaseAll);
  target.addEventListener('visibilitychange',()=>{if(target.hidden)releaseAll();});
  return {releaseAll};
}
