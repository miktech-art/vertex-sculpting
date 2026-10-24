import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE,DEFAULT_ROUTES,resolveMappings} from '../apps/sculpt/src/model.js';
import {unisonVoices} from '../apps/sculpt/src/oscillator/unison.js';
import {unisonBandAmplitude} from '../apps/sculpt/src/spectral/unison.js';
import {buildGeometry} from '../apps/sculpt/src/visual/sculpture.js';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('two centered voices beat at their exact frequency difference, with faster upper partials',()=>{
  const p={...BASE,unison:2,detune:40,width:0,harmonics:1,wavePosition:2/3,pitch:220};
  const voices=unisonVoices(p),difference=voices[1].frequency-voices[0].frequency;
  const level=(h,t)=>unisonBandAmplitude({partials:[h]},p,p.pitch*t,()=>1);
  close(level(1,0),1);close(level(1,.5/difference),0);close(level(1,1/difference),1);
  close(level(2,.25/difference),0);
});
test('stereo placement changes the interference heard at each ear',()=>{
  const p={...BASE,unison:2,detune:40,width:0,pitch:220};
  const [a,b]=unisonVoices(p),cycles=p.pitch*.5/(b.frequency-a.frequency);
  close(unisonBandAmplitude({partials:[1]},p,cycles,()=>1),0);
  assert.ok(unisonBandAmplitude({partials:[1]},{...p,width:1},cycles,()=>1)>.5);
});
test('one voice is completely invariant to detune and time; unresolved rapid beats are averaged',()=>{
  for(const detune of [0,40])for(const cycles of [0,100,1000])close(unisonBandAmplitude({partials:[1]},{...BASE,unison:1,detune},cycles,()=>1),1);
  const p={...BASE,unison:2,detune:40,width:0};
  close(unisonBandAmplitude({partials:[1]},p,0,()=>1,100),Math.SQRT1_2);
});
test('detune changes ridge strength over time without a long-axis twist, including older presets',()=>{
  const p={...BASE,unison:2,detune:40,width:0,harmonics:1};
  const routes=[...DEFAULT_ROUTES,{id:'old-detune',source:'detune',target:'twist',amount:1,curve:1,invert:false}];
  const g=buildGeometry(p,resolveMappings(p,routes),48000,routes);
  assert.ok(g.modulated);
  assert.ok(g.lines.every(line=>line.points.every(pt=>pt.z===0)));
  assert.ok(g.lines[0].points.some(pt=>pt.spectralLevel<.2));
  assert.ok(g.lines.some(line=>line.points.some(pt=>pt.frequencySpread>0)));
});
