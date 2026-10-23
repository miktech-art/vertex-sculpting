import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE,makeDocument,validateDocument} from '../apps/sculpt/src/model.js';
import {envelopeValue,modulatedParams} from '../apps/sculpt/src/audio/modulation.js';
const env={attack:.01,decay:.2,sustain:.3,hold:.4,release:.2,target:'pitch',amount:12};
test('extra envelopes survive public preset round trips and legacy presets stay unchanged',()=>{
  const doc=makeDocument();doc.params.envelopes=[env,{...env,target:'wavePosition',amount:-.5}];
  assert.deepEqual(validateDocument(JSON.parse(JSON.stringify(doc))).params.envelopes,doc.params.envelopes);
  assert.equal(validateDocument(makeDocument()).params.envelopes,undefined);
  for(const invalid of [{...env,amount:Infinity},{...env,target:'unknown'},{...env,attack:-1}]){
    assert.throws(()=>validateDocument({...doc,params:{...doc.params,envelopes:[invalid]}}));
  }
});
test('envelopes add in semitones, position and octaves and respect parameter limits',()=>{
  let p={...BASE,envelopes:[env]};
  assert.equal(modulatedParams(p,env.attack).pitch,BASE.pitch*2);
  p.envelopes=[{...env,target:'wavePosition',amount:1}];assert.equal(modulatedParams(p,env.attack).wavePosition,1);
  p.envelopes=[{...env,target:'cutoff',amount:-2}];assert.equal(modulatedParams(p,env.attack).cutoff,BASE.cutoff/4);
  p.envelopes=[env,env];assert.equal(modulatedParams(p,env.attack).pitch,BASE.pitch*4);
});
test('held envelopes sustain and release from their own current level at note-off',()=>{
  assert.equal(envelopeValue(env,5,{held:true}),env.sustain);
  assert.ok(Math.abs(envelopeValue(env,5.1,{held:false,releaseAt:5})-.15)<1e-10);
  assert.equal(envelopeValue(env,5.21,{held:false,releaseAt:5}),0);
});

import {defaultLfo,lfoWave,getLfos} from '../apps/sculpt/src/lfo.js';
test('LFO defaults preserve legacy audio and common waveforms stay bounded and repeatable',()=>{
  assert.equal(defaultLfo().shape,0);assert.equal(getLfos(BASE)[0].amount,0);
  for(let shape=0;shape<6;shape++)for(let t=-2;t<5;t+=.013){
    const v=lfoWave(shape,t);assert.ok(Number.isFinite(v)&&v>=-1&&v<=1);assert.equal(lfoWave(shape,t),v);
  }
  assert.ok(Math.abs(lfoWave(0,.25)-1)<1e-10);
  assert.ok(Math.abs(lfoWave(1,.5)-1)<1e-10);
});
test('LFO pitch, amplitude, delay and fade follow their audio-clock values',()=>{
  const lfo={...defaultLfo(),amount:12};let p={...BASE,lfos:[lfo]};
  assert.ok(Math.abs(modulatedParams(p,.25).pitch-BASE.pitch*2)<1e-10);
  assert.ok(Math.abs(modulatedParams(p,.75).pitch-BASE.pitch/2)<1e-10);
  p.lfos=[{...lfo,delay:1,fade:1}];assert.equal(modulatedParams(p,.25).pitch,BASE.pitch);
  assert.ok(Math.abs(modulatedParams(p,1.25).pitch-BASE.pitch*2**.25)<1e-10);
  p.lfos=[{...lfo,target:'amplitude',amount:.5}];assert.equal(modulatedParams(p,.25).amplitude,BASE.volume*1.5);
});
test('EGs modulate a chosen LFO rate and depth while other instances remain independent',()=>{
  const sustained={...env,attack:.005,decay:.01,sustain:1,hold:1};
  const p={...BASE,lfos:[{...defaultLfo(),amount:12}],envelopes:[{...sustained,target:'lfoRate:0',amount:1}]};
  assert.notEqual(modulatedParams(p,.3).pitch,modulatedParams({...p,envelopes:[]},.3).pitch);
  const depth={...p,lfos:[defaultLfo()],envelopes:[{...sustained,target:'lfoDepth:0',amount:.25}]};
  assert.ok(Math.abs(modulatedParams(depth,.25).pitch-BASE.pitch*2)<1e-8);
});
test('LFO instances and EG-to-LFO routes survive preset round trips and reject invalid inputs',()=>{
  const doc=makeDocument();doc.params.lfos=[defaultLfo(),{...defaultLfo(),shape:5,amount:4}];
  doc.params.envelopes=[{...env,target:'lfoDepth:1',amount:.5}];
  assert.deepEqual(validateDocument(doc).params.lfos,doc.params.lfos);
  assert.deepEqual(validateDocument(doc).params.envelopes,doc.params.envelopes);
  for(const patch of [{shape:9},{rate:NaN},{amount:100},{target:'bad'}])assert.throws(()=>validateDocument({...doc,params:{...doc.params,lfos:[{...defaultLfo(),...patch}]}}));
});

test('releasing a held EG preserves the LFO phase accumulated before note-off',()=>{
  const p={...BASE,lfos:[{...defaultLfo(),amount:12}],envelopes:[{...env,target:'lfoRate:0',amount:1}]};
  const before=modulatedParams(p,1,{held:true});
  const after=modulatedParams(p,1,{held:false,releaseAt:1});
  assert.ok(Math.abs(before.pitch-after.pitch)<1e-8);
});
