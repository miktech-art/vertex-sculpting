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
