import test from 'node:test';
import assert from 'node:assert/strict';
import { installHoldLoopShortcut } from '../apps/sculpt/src/ui/hold-loop.js';
function setup() {
  const listeners = new Map(), windowListeners = new Map();
  const target = { addEventListener: (name,fn)=>listeners.set(name,fn), defaultView: {addEventListener:(name,fn)=>windowListeners.set(name,fn)} };
  let starts=0, stops=0, dialog=false;
  installHoldLoopShortcut(target, ()=>starts++, ()=>stops++, ()=>dialog);
  return { target, listeners, windowListeners, counts:()=>[starts,stops], dialog:()=>dialog=true };
}
const event = extra => ({code:'Space',target:{matches:()=>false},preventDefault(){},stopPropagation(){},...extra});
test('Space loops for the held press and stops on release, ignoring auto-repeat',()=>{
  const h=setup();
  h.listeners.get('keydown')(event());
  h.listeners.get('keydown')(event({repeat:true}));
  assert.deepEqual(h.counts(),[1,0]);
  h.dialog(); // Release still works after focus moves into a dialog or input.
  h.listeners.get('keyup')(event({ctrlKey:true,target:{matches:()=>true}}));
  h.listeners.get('keyup')(event());
  assert.deepEqual(h.counts(),[1,1]);
});
test('Space preserves editing, dialogs and modified shortcuts',()=>{
  const h=setup();
  const native = extra=>event({preventDefault(){throw Error('native behavior must remain');},...extra});
  for (const extra of [{target:{matches:()=>true}},{target:{isContentEditable:true}},{ctrlKey:true},{altKey:true},{metaKey:true},{repeat:true},{code:'KeyL'}])
    h.listeners.get('keydown')(native(extra));
  h.dialog();h.listeners.get('keydown')(native());
  assert.deepEqual(h.counts(),[0,0]);
});
test('losing focus or hiding the page releases Space without a stuck loop',()=>{
  const h=setup();
  h.listeners.get('keydown')(event());h.windowListeners.get('blur')();
  assert.deepEqual(h.counts(),[1,1]);
  h.listeners.get('keydown')(event());h.target.hidden=true;h.listeners.get('visibilitychange')();
  h.listeners.get('keyup')(event());assert.deepEqual(h.counts(),[2,2]);
});
