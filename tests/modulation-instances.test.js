import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE,makeDocument,validateDocument,envelopeAt,duration,resolveMappings,DEFAULT_ROUTES} from '../apps/sculpt/src/model.js';
import {defaultLfo,availableDestinations,egDestinations,lfoDestinations,envelopeInstances} from '../apps/sculpt/src/lfo.js';
import {modulatedParams} from '../apps/sculpt/src/audio/modulation.js';
import {voiceEnvelopeAt,futureEnvelope} from '../apps/sculpt/src/audio/live-envelope.js';
import {buildGeometry} from '../apps/sculpt/src/visual/sculpture.js';
const env={target:'pitch',amount:12,attack:.01,decay:.2,sustain:1,hold:.4,release:.2};
test('destination menus reserve disabled assignments, retain their own destination and allow independent kinds',()=>{
  const p={...BASE,envelopes:[{...env,enabled:false}],lfos:[{...defaultLfo(),target:'pitch'}]};
  const options=availableDestinations(egDestinations(p),envelopeInstances(p),0).map(([target])=>target);
  assert.ok(options.includes('amplitude'));assert.ok(options.includes('none'));assert.ok(!options.includes('pitch'));
  assert.ok(availableDestinations(egDestinations(p),envelopeInstances(p),1).some(([target])=>target==='pitch'));
  assert.ok(availableDestinations(lfoDestinations,p.lfos,0).some(([target])=>target==='pitch'));
  assert.deepEqual(availableDestinations(lfoDestinations,lfoDestinations.map(([target])=>({target})),-1),[['none','Unassigned']]);
});
test('old duplicate assignments become unassigned without losing their settings',()=>{
  const doc=makeDocument();doc.params.envelopes=[env,{...env,amount:-7}];doc.params.lfos=[defaultLfo(),{...defaultLfo(),amount:12}];
  const restored=validateDocument(doc).params;
  assert.equal(restored.envelopes[0].target,'pitch');assert.deepEqual(restored.envelopes[1],{...env,target:'none',amount:-7});
  assert.equal(restored.lfos[1].target,'none');assert.equal(restored.lfos[1].amount,12);
  assert.equal(modulatedParams(doc.params,.01).pitch,doc.params.pitch*2);
});
test('power states and unassigned instances survive preset round trips and reject malformed states',()=>{
  const doc=makeDocument();Object.assign(doc.params,{envelopeEnabled:false,envelopes:[{...env,enabled:false}],lfos:[{...defaultLfo(),target:'none',enabled:false}]});
  const restored=validateDocument(JSON.parse(JSON.stringify(doc))).params;
  assert.equal(restored.envelopeEnabled,false);assert.deepEqual(restored.envelopes,doc.params.envelopes);assert.deepEqual(restored.lfos,doc.params.lfos);
  for(const patch of [{envelopeEnabled:0},{envelopes:[{...env,enabled:'false'}]},{lfos:[{...defaultLfo(),enabled:null}]}])assert.throws(()=>validateDocument({...doc,params:{...doc.params,...patch}}));
});
test('off and unassigned EGs and LFOs cannot alter audio parameters or sculpture geometry',()=>{
  const p={...BASE,envelopeTarget:'pitch',envelopeAmount:12,envelopeEnabled:false,envelopes:[{...env,target:'cutoff',amount:-4,enabled:false}],lfos:[{...defaultLfo(),amount:12,enabled:false}]};
  assert.deepEqual(modulatedParams(p,.25),modulatedParams(BASE,.25));
  const g=buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));assert.equal(g.modulated,false);
  const lfoOff={...BASE,lfos:[{...defaultLfo(),target:'wavePosition',amount:1,enabled:false}]};
  assert.deepEqual(buildGeometry(lfoOff,resolveMappings(lfoOff,DEFAULT_ROUTES)),buildGeometry(BASE,resolveMappings(BASE,DEFAULT_ROUTES)));
  assert.deepEqual(modulatedParams({...BASE,envelopes:[{...env,target:'none'}],lfos:[{...defaultLfo(),target:'none',amount:12}]},.25),modulatedParams(BASE,.25));
});
test('switching off an EG linked to an LFO removes its rate and depth effects',()=>{
  const p={...BASE,lfos:[{...defaultLfo(),amount:12}],envelopes:[{...env,target:'lfoRate:0',amount:2,enabled:false},{...env,target:'lfoDepth:0',amount:1,enabled:false}]};
  assert.deepEqual(modulatedParams(p,.25),modulatedParams({...p,envelopes:[]},.25));
});
test('the primary EG bypass is flat while held and ends with a finite click-free gate',()=>{
  const p={...BASE,envelopeEnabled:false};
  assert.equal(envelopeAt(p,0),1);assert.equal(envelopeAt(p,-.01),0);assert.equal(envelopeAt(p,duration(p)),0);
  assert.equal(voiceEnvelopeAt(p,10,{held:true}),1);
  assert.ok(Math.abs(voiceEnvelopeAt(p,10.005,{releaseAt:10})-.5)<1e-10);
  assert.equal(voiceEnvelopeAt(p,10.02,{releaseAt:10}),0);
  assert.deepEqual(futureEnvelope(p,10,{held:true}),[]);
  assert.deepEqual(futureEnvelope(p,10,{releaseAt:10}),[{time:10.01,value:0}]);
});

import {removeEnvelope,removeLfo,selectionAfterRemoval} from '../apps/sculpt/src/lfo.js';
test('removing the first EG promotes the next instance with its contour, destination and power intact',()=>{
  const p={...BASE,envelopeEnabled:false,envelopes:[{...env,enabled:true},{...env,target:'cutoff',amount:2}]};
  assert.equal(removeEnvelope(p,0),true);
  assert.equal(p.envelopeTarget,'pitch');assert.equal(p.envelopeAmount,12);assert.equal(p.envelopeEnabled,true);
  for(const stage of ['attack','decay','sustain','hold','release'])assert.equal(p[stage],env[stage]);
  assert.deepEqual(p.envelopes,[{...env,target:'cutoff',amount:2}]);
  assert.doesNotThrow(()=>validateDocument({...makeDocument(),params:p}));
  assert.equal(removeEnvelope(p,0),true);assert.equal(p.envelopeEnabled,undefined);
  const snapshot=structuredClone(p);assert.equal(removeEnvelope(p,0),false);assert.deepEqual(p,snapshot);
});
test('deleting a later EG leaves the primary EG and other contours untouched',()=>{
  const p={...BASE,envelopes:[env,{...env,target:'wavePosition',amount:.5},{...env,target:'cutoff',amount:2}]};
  assert.equal(removeEnvelope(p,2),true);
  assert.deepEqual(p,{...BASE,envelopes:[env,{...env,target:'cutoff',amount:2}]});
  for(const index of [-1,4,1.5])assert.equal(removeEnvelope(p,index),false);
});
test('LFO removal clears deleted links, shifts surviving links, and frees destinations',()=>{
  const p={...BASE,envelopeTarget:'lfoDepth:2',envelopeAmount:.5,
    envelopes:[{...env,target:'lfoRate:0',amount:2},{...env,target:'lfoDepth:1',amount:.5}],
    lfos:[{...defaultLfo(),amount:12},{...defaultLfo(),target:'cutoff',amount:2,enabled:false},{...defaultLfo(),target:'amplitude',amount:.5}]};
  const survivor=structuredClone(p.lfos[2]);
  assert.equal(removeLfo(p,1),true);
  assert.deepEqual(p.lfos[1],survivor);assert.equal(p.envelopeTarget,'lfoDepth:1');
  assert.equal(p.envelopes[0].target,'lfoRate:0');assert.equal(p.envelopes[1].target,'none');assert.equal(p.envelopes[1].amount,.5);
  assert.ok(availableDestinations(lfoDestinations,p.lfos,0).some(([target])=>target==='cutoff'));
  assert.doesNotThrow(()=>validateDocument({...makeDocument(),params:p}));
  assert.equal(removeLfo(p,0),true);assert.equal(p.envelopeTarget,'lfoDepth:0');assert.equal(p.envelopes[0].target,'none');
  const snapshot=structuredClone(p);assert.equal(removeLfo(p,0),false);assert.deepEqual(p,snapshot);
});
test('selection stays on the same surviving instance or moves to the nearest one when deleted',()=>{
  assert.equal(selectionAfterRemoval(2,0,4),1);
  assert.equal(selectionAfterRemoval(0,2,4),0);
  assert.equal(selectionAfterRemoval(1,1,4),1);
  assert.equal(selectionAfterRemoval(3,3,4),2);
  assert.equal(selectionAfterRemoval(0,0,2),0);
});
