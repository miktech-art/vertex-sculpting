import test from 'node:test';
import assert from 'node:assert/strict';
import {reverbImpulse} from '../apps/sculpt/src/audio/reverb.js';
import {PARAMETERS} from '../apps/sculpt/src/model.js';
test('reverb allows the full 100 percent return',()=>{
  assert.equal(PARAMETERS.find(p=>p.id==='reverbMix').max,1);
});
test('visual impulse power matches normalized audio impulse energy at both common sample rates',()=>{
  for(const rate of [44100,48000]){
    const ir=reverbImpulse(1.8,rate);
    let actual=0;
    for(const channel of ir.channels)for(const sample of channel)actual+=sample**2*ir.scale**2/2;
    const modeled=ir.bins.reduce((sum,b)=>sum+b.power,0);
    assert.ok(Math.abs(actual-modeled)<1e-10);
    const calibration=ir.channels[0].length*(.00125*44100/rate)**2;
    assert.ok(Math.abs(modeled-calibration)<1e-10);
    assert.ok(ir.bins.every(b=>b.time>=0&&b.time<=ir.duration&&b.power>=0));
  }
});
test('the shared impulse preserves the original deterministic stereo audio samples',()=>{
  const rate=100,ir=reverbImpulse(.2,rate);let seed=43;
  for(const channel of ir.channels)for(let i=0;i<channel.length;i++){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const expected=Math.fround((seed/4294967296*2-1)*(1-i/channel.length)**2.8*.7);
    assert.equal(channel[i],expected);
  }
});
