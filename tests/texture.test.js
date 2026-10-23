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
  assert.ok(loud.particles.length>soft.particles.length*4);
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
  assert.ok(g.glow.every(pt=>pt.alpha<.045));
});
test('fully noisy input also feeds the reverb glow',()=>{
  const g=geometry({...p,noise:1,reverbMix:.4});
  assert.ok(g.particles.length>0);assert.ok(g.glow.length>0);
});
test('halo rendering uses diffuse white gradients behind the object',()=>{
  let fills=0;const colors=[];
  const fake={ctx:{save(){},restore(){},createRadialGradient(){return {addColorStop(_,color){colors.push(color);}};},fillRect(){fills++;}},project:pt=>({x:pt.x,y:pt.y})};
  const g=geometry({...p,reverbMix:.3});
  SculptureRenderer.prototype.drawHalo.call(fake,g,{offset:{},scale:1},1);
  assert.equal(fills,g.glow.length);assert.ok(colors.every(color=>color.startsWith('rgba(255,255,255,')));
});
