import test from 'node:test';
import assert from 'node:assert/strict';
import { BASE,DEFAULT_ROUTES,resolveMappings,duration } from '../apps/sculpt/src/model.js';
import { buildGeometry,SculptureRenderer } from '../apps/sculpt/src/visual/sculpture.js';
const p={...BASE,harmonics:1,noise:0,wavePosition:2/3};
const geometry=params=>buildGeometry(params,resolveMappings(params,DEFAULT_ROUTES));
test('adding noise leaves harmonic ridge geometry smooth and unchanged',()=>{
  const dry=geometry(p),noisy=geometry({...p,noise:.6});
  assert.deepEqual(dry.lines.map(l=>l.points),noisy.lines.map(l=>l.points));
  assert.ok(noisy.lines[0].spectralLevel<dry.lines[0].spectralLevel);
  assert.ok(noisy.particles.length>dry.particles.length);
});
test('100% noise retains a dense visible field after all pitched ridges fade',()=>{
  const pure=geometry({...p,noise:1});
  assert.ok(pure.lines.every(l=>l.spectralLevel===0));
  assert.ok(pure.particles.length>3000);
  assert.ok(pure.particles.reduce((sum,pt)=>sum+pt.alpha,0)>100);
  assert.ok(pure.particles.every(pt=>pt.kind==='noise'&&Number.isFinite(pt.alpha)));
});
test('pure-noise appearance is independent of oscillator pitch and responds to filters',()=>{
  const a=geometry({...p,noise:1,pitch:55}),b=geometry({...p,noise:1,pitch:1760});
  assert.deepEqual(a.particles,b.particles);
  const low=geometry({...p,noise:1,cutoff:800}),high=geometry({...p,noise:1,cutoffLow:6500,cutoff:16000});
  const mean=g=>g.particles.reduce((sum,pt)=>sum+pt.frequency,0)/g.particles.length;
  assert.ok(mean(high)>mean(low)*3);
  assert.ok(low.particles.some(pt=>pt.alpha>.01));
});
test('noise density increases with its blend, while an empty noise source has no dots',()=>{
  assert.equal(geometry(p).particles.length,0);
  const soft=geometry({...p,noise:.1}),loud=geometry({...p,noise:.9});
  assert.ok(loud.particles.length>soft.particles.length*2);
  assert.deepEqual(loud,geometry({...p,noise:.9}));
});
test('reverb generates a separate diffuse tail without adding dots or bending dry ridges',()=>{
  const dry=geometry(p),wet=geometry({...p,reverbMix:.3,reverbDecay:2});
  assert.equal(wet.particles.length,0);assert.ok(wet.glow.length>0);
  assert.deepEqual(wet.lines,dry.lines);
  assert.ok(wet.glow.some(pt=>pt.time>wet.total));
  assert.equal(wet.echoLayout.duration,duration(p)+2);
  const longer=geometry({...p,reverbMix:.3,reverbDecay:4});
  assert.ok(longer.glow.at(-1).time>wet.glow.at(-1).time);
  assert.ok(longer.echoLayout.length>wet.echoLayout.length);
});
test('reverb glow stays faint under a sustained dry sound and is more exposed just after it ends',()=>{
  const patch={...p,attack:.005,decay:.02,sustain:1,hold:1,release:.005,reverbMix:.5,reverbDecay:1};
  const g=geometry(patch),body=g.glow.filter(pt=>pt.time>.6&&pt.time<.9),tail=g.glow.filter(pt=>pt.time>g.total&&pt.time<g.total+.1);
  assert.ok(body.length&&tail.length);
  assert.ok(Math.max(...tail.map(pt=>pt.alpha))>Math.max(...body.map(pt=>pt.alpha)));
  assert.ok(g.glow.every(pt=>pt.alpha<.15));
});
test('fully noisy input also feeds the reverb glow',()=>{
  const g=geometry({...p,noise:1,reverbMix:.4});
  assert.ok(g.particles.length>0);assert.ok(g.glow.length>0);
});
test('halo rendering uses diffuse white gradients behind the object',()=>{
  let fills=0;const colors=[];
  const fake={ctx:{save(){},restore(){},translate(){},rotate(){},scale(){},createRadialGradient(){return {addColorStop(_,color){colors.push(color);}};},fillRect(){fills++;}},project:pt=>({x:pt.x,y:pt.y})};
  const g=geometry({...p,reverbMix:.3});
  SculptureRenderer.prototype.drawHalo.call(fake,g,{offset:{},scale:1},1);
  assert.equal(fills,g.glow.length);assert.ok(colors.every(color=>color.startsWith('rgba(255,255,255,')));
});

test('noise density follows output level in decibels and stays sharp through the hi-hat attack',()=>{
  const quiet=geometry({...p,noise:1,volume:.08}),loud=geometry({...p,noise:1,volume:.5});
  assert.ok(loud.noiseLevelDb>quiet.noiseLevelDb+15);
  assert.ok(loud.particles.length>quiet.particles.length*2);
  const hat=geometry({...p,noise:1,attack:.005,decay:.045,sustain:0,hold:.1,release:.025,cutoffLow:6500,cutoff:16000});
  const early=hat.particles.filter(pt=>pt.u*hat.total<.025);
  assert.ok(early.length>hat.particles.length*.7);
  assert.ok(hat.particles.every(pt=>pt.u*hat.total<.051));
  const attack=early.filter(pt=>pt.u*hat.total>.005 && pt.u*hat.total<.015);
  assert.ok(Math.max(...attack.map(pt=>Math.abs(pt.y)))>60);
});
test('the reverb shell encloses the harmonic footprint and distinguishes source spectra',()=>{
  const saw=geometry({...p,reverbMix:.4}),sine=geometry({...p,wavePosition:0,reverbMix:.4});
  const sawShell=saw.glow.filter(pt=>pt.kind==='shell'),sineShell=sine.glow.filter(pt=>pt.kind==='shell');
  assert.ok(Math.max(...sawShell.map(pt=>pt.radiusY))>Math.max(...sineShell.map(pt=>pt.radiusY))*2);
  for(const halo of sawShell.filter(pt=>pt.time<=saw.total)){
    const i=Math.round(halo.time/saw.total*(saw.lines[0].points.length-1));
    const extent=Math.max(...saw.lines.filter(l=>l.spectralLevel>=.002).map(l=>Math.abs(l.points[i].y)));
    assert.ok(halo.radiusY>extent+15);
  }
  assert.ok(sawShell.at(-1).x+sawShell.at(-1).radiusX>saw.length/2);
});
test('a warmed noise layer is reused across frames and invalidated when the view moves',()=>{
  const g=geometry({...p,noise:1});let grains=0,images=0;
  const layer={getContext:()=>({fillRect(){grains++;}})};
  const fake=Object.assign(Object.create(SculptureRenderer.prototype),{size:{width:500,height:250},yaw:0,pitch:0,zoom:1,pan:{x:0,y:0},
    createNoiseCanvas:()=>layer,ctx:{save(){},restore(){},drawImage(){images++;}},project:pt=>pt});
  fake.drawNoise(g);const first=grains;assert.ok(first>0);
  fake.drawNoise(g);assert.equal(grains,first);assert.equal(images,2);
  g.brightness=.5;fake.drawNoise(g);assert.equal(grains,first);
  fake.yaw=.2;fake.drawNoise(g);assert.ok(grains>first);
});

test('an unclipped 6 dB noise increase produces approximately four times the grain density',()=>{
  const a=geometry({...p,noise:.5,volume:.04}),b=geometry({...p,noise:.5,volume:.08});
  const ratio=b.particles.length/a.particles.length;
  assert.ok(ratio>3.5&&ratio<4.5);
  assert.ok(Math.abs(b.noiseLevelDb-a.noiseLevelDb-6.0206)<.001);
});
