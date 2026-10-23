import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE,DEFAULT_ROUTES} from '../apps/sculpt/src/model.js';
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
    assert.ok(Math.abs(r.yaw-.35)<1e-12);assert.equal(r.pitch,0);assert.equal(r.axialRotation,.15);
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
  send('pointercancel');assert.equal(r.drag,null);r.resetView();
  assert.equal(r.zoom,1);assert.deepEqual(r.pan,{x:0,y:0});assert.equal(r.yaw,0);assert.equal(r.pitch,0);
});

test('parameter, sound, comparison and resize updates preserve the camera until explicit reset',()=>{
  const {renderer:r}=view();
  const doc={params:{...BASE},routes:structuredClone(DEFAULT_ROUTES)};
  r.setDocument(doc,true);r.updateMapping(.016);
  r.zoom=.62;r.pan={x:37,y:-18};r.yaw=.43;r.pitch=-.24;r.axialRotation=.31;
  const camera=()=>({zoom:r.zoom,pan:{...r.pan},yaw:r.yaw,pitch:r.pitch,axialRotation:r.axialRotation});
  const before=camera();
  for(const patch of [{reverbMix:.5,reverbDecay:4},{delayMix:.5,feedback:.6},{hold:3},{pitch:55}]){
    doc.params={...doc.params,...patch};r.setDocument(doc);r.updateMapping(.1);
    assert.deepEqual(camera(),before);
  }
  r.setDocument({...doc,params:{...BASE}},true);r.updateMapping(.1);
  assert.deepEqual(camera(),before);
  r.setCompare(doc);r.updateMapping(.1);assert.deepEqual(camera(),before);
  r.resize();assert.deepEqual(camera(),before);
  r.resetView();assert.notDeepEqual(camera(),before);assert.equal(r.yaw,0);assert.equal(r.pitch,0);
});

test('vertical left drag spins around the base-frequency line without tilting it, even after yaw',()=>{
  const {renderer:r,send}=view();r.yaw=.6;
  const baseline=[-150,0,150].map(x=>({x,y:0,z:0}));
  const before=baseline.map(pt=>r.project(pt));
  const ridge=r.project({x:0,y:70,z:0});
  send('pointerdown');send('pointermove',{clientY:Math.PI/.006/2});
  assert.equal(r.pitch,0);assert.equal(r.yaw,.6);
  assert.deepEqual(baseline.map(pt=>r.project(pt)),before);
  assert.notDeepEqual(r.project({x:0,y:70,z:0}),ridge);
  send('pointerup');send('pointerdown');send('pointermove',{clientY:2000});
  assert.ok(r.axialRotation>Math.PI*2,'axial spinning is not clamped like tilt');
});
test('horizontal left drag turns around the sculpture center and vertical axis',()=>{
  const {renderer:r,send}=view();const middle=r.project({x:0,y:0,z:0});
  send('pointerdown');send('pointermove',{clientX:140});
  assert.deepEqual(r.project({x:0,y:0,z:0}),middle);
  assert.equal(r.pitch,0);assert.equal(r.axialRotation,0);
  assert.ok(Math.abs(r.yaw-.98)<1e-12);
});
