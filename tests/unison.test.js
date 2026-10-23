import test from 'node:test';
import assert from 'node:assert/strict';
import {BASE,makeDocument,validateDocument,denormalize,formatValue} from '../apps/sculpt/src/model.js';
import {unisonVoices} from '../apps/sculpt/src/oscillator/unison.js';
import {unisonTraces} from '../apps/sculpt/src/ui/unison.js';
test('1–8 voices are symmetrical, gain-normalized, and use the actual cents and pan settings',()=>{
  for(let unison=1;unison<=8;unison++){
    const voices=unisonVoices({...BASE,unison,detune:40,width:1});
    assert.equal(voices.length,unison);
    assert.ok(Math.abs(voices.reduce((n,v)=>n+v.gain,0)-1)<1e-12);
    assert.ok(Math.abs(voices.reduce((n,v)=>n+v.cents,0))<1e-12);
    if(unison===1){assert.equal(voices[0].cents,0);assert.equal(voices[0].pan,0);}
    else {assert.equal(voices[0].cents,-20);assert.equal(voices.at(-1).cents,20);assert.equal(voices[0].pan,-.85);}
    for(const voice of voices)assert.equal(voice.frequency,BASE.pitch*2**(voice.cents/1200));
  }
});
test('unison survives presets, legacy sounds preserve their paired voices, and invalid counts are rejected',()=>{
  const doc=makeDocument();doc.params.unison=8;
  assert.equal(validateDocument(JSON.parse(JSON.stringify(doc))).params.unison,8);
  delete doc.params.unison;assert.equal(validateDocument(doc).params.unison,2);
  for(const invalid of [0,9,2.5,NaN,'8']){doc.params.unison=invalid;assert.throws(()=>validateDocument(doc));}
  for(let n=0;n<=1;n+=.01)assert.ok(Number.isInteger(denormalize('unison',n)));
  assert.equal(formatValue('unison',8),'8');
});
test('the diagram has exactly one trace per voice, uses the audio tuning, and responds to pan',()=>{
  for(let unison=1;unison<=8;unison++){
    const p={...BASE,unison,detune:30,width:1},traces=unisonTraces(p);
    assert.equal(traces.length,unison);assert.deepEqual(traces.map(t=>t.voice),unisonVoices(p));
    assert.ok(traces.every(t=>!t.path.includes('NaN')&&!t.path.includes('Infinity')));
  }
  const p={...BASE,unison:8};
  assert.notEqual(unisonTraces(p)[0].path,unisonTraces({...p,detune:40})[0].path);
  assert.notEqual(unisonTraces(p)[0].path,unisonTraces({...p,width:1})[0].path);
});
