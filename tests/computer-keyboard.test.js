import test from 'node:test';
import assert from 'node:assert/strict';
import {KEYBOARD_NOTES,installComputerKeyboard} from '../apps/sculpt/src/ui/computer-keyboard.js';
function setup(noteOn){
  const listeners=new Map(),windows=new Map(),notes=[],released=[];
  const target={addEventListener:(name,fn)=>listeners.set(name,fn),defaultView:{addEventListener:(name,fn)=>windows.set(name,fn)}};
  let blocked=false;
  const keyboard=installComputerKeyboard(target,{noteOn:noteOn||((midi)=>{const voice={midi};notes.push(voice);return voice;}),noteOff:v=>released.push(v),isBlocked:()=>blocked});
  const send=(type,code,extra={})=>{const event={code,target:{matches:()=>false},preventDefault(){this.prevented=true;},stopPropagation(){},...extra};listeners.get(type)(event);return event;};
  return {target,send,notes,released,windows,keyboard,block:()=>blocked=true,listeners};
}
test('the requested keys play chromatic notes from C4 and release each voice independently',()=>{
  const h=setup();
  for(const code of Object.keys(KEYBOARD_NOTES))h.send('keydown',code);
  assert.deepEqual(h.notes.map(v=>v.midi),Array.from({length:17},(_,i)=>60+i));
  h.send('keydown','KeyA',{repeat:true});assert.equal(h.notes.length,17);
  h.send('keyup','KeyA');assert.deepEqual(h.released,[h.notes[0]]);
  h.send('keyup','KeyL');assert.equal(h.released[1].midi,74);
  h.keyboard.releaseAll();assert.equal(h.released.length,17);
});
test('Z/X move subsequent notes by octaves, never retune held notes, and ignore repeat',()=>{
  const h=setup();h.send('keydown','KeyA');h.send('keydown','KeyX');h.send('keydown','KeyX',{repeat:true});h.send('keydown','KeyS');
  assert.deepEqual(h.notes.map(v=>v.midi),[60,74]);h.send('keyup','KeyA');assert.equal(h.released[0].midi,60);
  h.send('keydown','KeyZ');h.send('keydown','KeyW');assert.equal(h.notes.at(-1).midi,61);
  h.keyboard.releaseAll();
});
test('keyboard leaves Space, typing, dialogs, and command shortcuts alone',()=>{
  const h=setup();
  for(const extra of [{ctrlKey:true},{metaKey:true},{altKey:true},{target:{matches:()=>true}},{target:{isContentEditable:true}},{repeat:true}])assert.equal(h.send('keydown','KeyA',extra).prevented,undefined);
  assert.equal(h.send('keydown','Space').prevented,undefined);assert.equal(h.notes.length,0);
  h.block();h.send('keydown','KeyA');h.send('keydown','KeyX');assert.equal(h.notes.length,0);
});
test('keys still release after focus changes, on blur, and when the page hides',()=>{
  const h=setup();h.send('keydown','KeyA');h.send('keyup','KeyA',{ctrlKey:true,target:{matches:()=>true}});assert.equal(h.released.length,1);
  h.send('keydown','KeyS');h.windows.get('blur')();assert.equal(h.released.length,2);
  h.send('keydown','KeyD');h.target.hidden=true;h.listeners.get('visibilitychange')();assert.equal(h.released.length,3);
  h.send('keyup','KeyD');assert.equal(h.released.length,3);
});
test('a release before asynchronous audio initialization cannot leave a stuck voice or release a later note',async()=>{
  const resolvers=[];const h=setup(()=>new Promise(resolve=>resolvers.push(resolve)));
  h.send('keydown','KeyA');h.send('keyup','KeyA');h.send('keydown','KeyA');
  const first={id:1},second={id:2};resolvers[0](first);resolvers[1](second);await Promise.resolve();
  assert.deepEqual(h.released,[first]);h.keyboard.releaseAll();assert.deepEqual(h.released,[first,second]);
});
