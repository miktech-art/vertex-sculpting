import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE,DEFAULT_ROUTES,resolveMappings} from '../apps/sculpt/src/model.js';
import {defaultLfo} from '../apps/sculpt/src/lfo.js';
import {modulatedParams} from '../apps/sculpt/src/audio/modulation.js';
import {buildGeometry,SculptureRenderer} from '../apps/sculpt/src/visual/sculpture.js';
const patch={...BASE,pitch:220,harmonics:1,wavePosition:0,cutoffLow:20,cutoff:18000,attack:.005,decay:.005,sustain:1,hold:.98,release:.01};
const geometry=p=>buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));
const at=(g,time)=>Math.round(time/g.total*(g.lines[0].points.length-1));
test('pitch LFO uses the audio pitch at every visual time slice and changes mapped thickness',()=>{
  const p={...patch,lfos:[{...defaultLfo(),amount:12}]},g=geometry(p);
  assert.equal(g.modulated,true);
  for(const sample of g.samples)assert.equal(sample.params.pitch,modulatedParams(p,sample.t).pitch);
  const high=g.lines[0].points[at(g,.25)],low=g.lines[0].points[at(g,.75)];
  assert.ok(high.frequency>low.frequency*3);assert.ok(high.thickness<low.thickness);
});
test('wavetable LFO reveals harmonics only in the parts of the sound where audio contains them',()=>{
  const p={...patch,lfos:[{...defaultLfo(),target:'wavePosition',amount:1}]},g=geometry(p);
  const harmonic=g.lines.find(l=>l.frequency===p.pitch*3);
  assert.ok(harmonic.points[at(g,.25)].spectralLevel>.01);
  assert.equal(harmonic.points[at(g,.75)].spectralLevel,0);
});
test('cutoff LFO filters ridge strength along the time axis',()=>{
  const p={...patch,wavePosition:2/3,cutoff:1200,lfos:[{...defaultLfo(),target:'cutoff',amount:4}]},g=geometry(p);
  const harmonic=g.lines.find(l=>l.frequency===p.pitch*8);
  assert.ok(harmonic.points[at(g,.25)].spectralLevel>harmonic.points[at(g,.75)].spectralLevel*10);
});
test('amplitude LFO silences lines and noise where the audio amplitude is zero',()=>{
  const p={...patch,lfos:[{...defaultLfo(),target:'amplitude',amount:1}]},g=geometry(p);
  assert.ok(g.lines[0].points[at(g,.75)].spectralLevel<.002);
  assert.ok(g.lines[0].points[at(g,.25)].e>1);
  const noisy=geometry({...p,noise:1});
  const peak=noisy.particles.filter(pt=>pt.u>.2&&pt.u<.3).length;
  const trough=noisy.particles.filter(pt=>pt.u>.7&&pt.u<.8).length;
  assert.ok(peak>trough*10);
});
test('EG-to-LFO routing, custom visual connections and held phase windows are retained',()=>{
  const p={...patch,lfos:[defaultLfo()],envelopes:[{attack:.005,decay:.005,sustain:1,hold:1,release:.1,target:'lfoDepth:0',amount:.25}]};
  const routes=DEFAULT_ROUTES.filter(r=>r.source!=='pitch');
  const g=buildGeometry(p,resolveMappings(p,routes),48000,routes);
  assert.ok(g.samples.some(s=>s.params.pitch>patch.pitch*1.5));
  assert.ok(g.lines[0].points.every(pt=>pt.thickness===g.lines[0].points[0].thickness));
  const held=buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES),48000,DEFAULT_ROUTES,{held:true,timeOffset:1.17});
  assert.equal(held.samples[0].params.pitch,modulatedParams(p,1.17,{held:true}).pitch);
});

test('modulated playback cannot highlight a locally absent harmonic',()=>{
  let strokes=0;
  const fake={ctx:{beginPath(){},moveTo(){},lineTo(){},stroke(){strokes++;}},events:[{start:0}],project:p=>p};
  const line={kind:'filament',width:1,points:[{x:0,y:0,u:.49,spectralLevel:0},{x:1,y:0,u:.5,spectralLevel:0},{x:2,y:0,u:.51,spectralLevel:0}]};
  SculptureRenderer.prototype.drawModulatedLine.call(fake,{brightness:1,total:1,echoLayout:{duration:1}},line,{gain:1,time:0,offset:{},scale:1},.5);
  assert.equal(strokes,0);
});
