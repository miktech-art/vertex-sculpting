import test from 'node:test';
import assert from 'node:assert/strict';
import { FRAME_COUNT, harmonicAmplitude, wavetableCoefficients, waveform } from '../apps/sculpt/src/oscillator/wavetable.js';
import { BASE, PRESETS, makeDocument, validateDocument, DEFAULT_ROUTES, resolveMappings } from '../apps/sculpt/src/model.js';
import { buildGeometry } from '../apps/sculpt/src/visual/sculpture.js';
test('legacy presets gain oscillator defaults without changing their original spectrum', () => {
  const old=makeDocument(); delete old.params.waveTable; delete old.params.wavePosition;
  const doc=validateDocument(old), {imag}=wavetableCoefficients(doc.params);
  assert.equal(doc.params.waveTable,0); assert.equal(doc.params.wavePosition,0);
  for (let h=1;h<97;h++) assert.ok(Math.abs(imag[h]-harmonicAmplitude(h,doc.params.harmonics))<1e-7);
});
test('wavetable frames interpolate continuously and all tables produce finite bounded previews', () => {
  for (let table=0;table<3;table++) {
    const at=n=>wavetableCoefficients({...BASE,harmonics:1,waveTable:table,wavePosition:n}).imag;
    const a=at(8/(FRAME_COUNT-1)), b=at(9/(FRAME_COUNT-1)), half=at(8.5/(FRAME_COUNT-1));
    for(let h=0;h<97;h++) assert.ok(Math.abs(half[h]-(a[h]+b[h])/2)<1e-6);
    assert.notDeepEqual(at(0),at(1));
    for (const n of [0,.32,.73,1]) assert.ok(waveform({...BASE,harmonics:1,waveTable:table,wavePosition:n}).every(x=>Number.isFinite(x)&&Math.abs(x)<=1));
  }
});
test('table and position survive preset round trips and drive the sculpture spectrum', () => {
  const doc=makeDocument(PRESETS.find(p => p.id === 'synth')); doc.params.waveTable=2; doc.params.wavePosition=.77;
  assert.deepEqual(validateDocument(JSON.parse(JSON.stringify(doc))).params,doc.params);
  const at=position=>{const p={...doc.params,wavePosition:position};return buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));};
  assert.notDeepEqual(at(0).lines.map(x=>x.alpha),at(1).lines.map(x=>x.alpha));
  for(const value of [-1,3,NaN,.5]) assert.throws(()=>validateDocument({...doc,params:{...doc.params,waveTable:value}}));
});

test('the end of Basic shapes is a pure sine regardless of harmonic brightness', () => {
  const {imag}=wavetableCoefficients({...BASE,harmonics:1,waveTable:0,wavePosition:1});
  assert.equal(imag[1],1); assert.ok(imag.slice(2).every(x=>x===0));
});
