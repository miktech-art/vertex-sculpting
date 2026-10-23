import test from 'node:test';
import assert from 'node:assert/strict';
import {SculptureRenderer} from '../apps/sculpt/src/visual/sculpture.js';
globalThis.window={devicePixelRatio:1};
globalThis.ResizeObserver=class {observe(){}};
function view(){
  const handlers=new Map();
  const canvas={getContext:()=>({setTransform(){}}),getBoundingClientRect:()=>({width:800,height:400}),
    addEventListener:(name,fn)=>handlers.set(name,fn),setPointerCapture(){},classList:{add(){},remove(){}}};
  const renderer=new SculptureRenderer(canvas);
  const send=(name,e={})=>handlers.get(name)({clientX:0,clientY:0,pointerType:'mouse',pointerId:1,button:0,shiftKey:false,...e});
  return {renderer,send};
}
test('left drag only rotates the sculpture, including with Shift held',()=>{
  for(const shiftKey of [false,true]){
    const {renderer:r,send}=view();r.pan={x:30,y:-20};
    send('pointerdown',{shiftKey});send('pointermove',{clientX:50,clientY:25,shiftKey});
    assert.ok(Math.abs(r.yaw-.35)<1e-12);assert.equal(r.pitch,.15);
    assert.deepEqual(r.pan,{x:30,y:-20});send('pointerup');assert.equal(r.drag,null);
  }
});
test('middle drag retains rotation and Shift-middle retains free panning',()=>{
  const {renderer:r,send}=view();
  send('pointerdown',{button:1});send('pointermove',{clientX:50,clientY:25});
  assert.ok(Math.abs(r.yaw-.35)<1e-12);send('pointerup');
  send('pointerdown',{button:1,shiftKey:true});send('pointermove',{clientX:70,clientY:40});
  assert.deepEqual(r.pan,{x:70,y:40});assert.ok(Math.abs(r.yaw-.35)<1e-12);
});
test('trackpad wheel zoom, reset and non-mouse pointer controls keep their behavior',()=>{
  const {renderer:r,send}=view();r.pan={x:10,y:20};
  let prevented=false;send('wheel',{deltaY:-100,preventDefault(){prevented=true;}});
  assert.ok(prevented);assert.ok(Math.abs(r.zoom-Math.exp(.1))<1e-12);
  assert.ok(Math.abs(r.pan.x-10*Math.exp(.1))<1e-12);
  send('pointerdown',{pointerType:'touch',shiftKey:true});send('pointermove',{clientX:5});
  assert.ok(Math.abs(r.pan.x-(10*Math.exp(.1)+5))<1e-12);
  send('pointercancel');assert.equal(r.drag,null);send('dblclick');
  assert.equal(r.zoom,1);assert.deepEqual(r.pan,{x:0,y:0});assert.equal(r.yaw,0);assert.equal(r.pitch,0);
});
