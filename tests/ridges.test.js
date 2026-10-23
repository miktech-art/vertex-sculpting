import test from 'node:test';
import assert from 'node:assert/strict';
import { ridgeDecibels, ridgeStrength } from '../apps/sculpt/src/spectral/ridges.js';
import { bandAmplitude, HARMONIC_BANDS, createFilterResponse } from '../apps/sculpt/src/spectral/filter.js';
import { wavetablePartial } from '../apps/sculpt/src/oscillator/wavetable.js';
import { BASE, DEFAULT_ROUTES, resolveMappings } from '../apps/sculpt/src/model.js';
import { buildGeometry, SculptureRenderer } from '../apps/sculpt/src/visual/sculpture.js';
const params = {...BASE,harmonics:1,noise:0,cutoffLow:20,cutoff:18000,pitch:220};
const geometry = p=>buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));
test('relative decibel levels have a bounded, continuous visual fade and a -60 dB display floor',()=>{
  assert.equal(ridgeDecibels(.1),-20);assert.equal(ridgeStrength(0),0);
  assert.equal(ridgeStrength(.001),0);assert.equal(ridgeStrength(1),1);assert.equal(ridgeStrength(3),1);
  let previous=0;
  for(let db=-80;db<=6;db+=.1){const level=ridgeStrength(10**(db/20));assert.ok(level>=previous-1e-12 && level<=1);previous=level;}
});
test('the first third morphs the source spectrum while keeping weak partials visually subordinate',()=>{
  const a=geometry({...params,wavePosition:.01}), b=geometry({...params,wavePosition:1/3});
  const at=g=>g.lines.find(l=>l.frequency===params.pitch*3);
  assert.ok(Math.abs(at(a).levelDb - -50.4966676)<.1);
  assert.ok(at(a).spectralLevel<.02);
  assert.ok(at(b).spectralLevel>at(a).spectralLevel*20);
  assert.ok(a.lines.find(l=>l.frequency===params.pitch*2).spectralLevel===0);
});
test('visual mapping cannot introduce nonexistent oscillator partials',()=>{
  const p={...params,harmonics:0,waveTable:2,wavePosition:.7};
  const m={...resolveMappings(p,DEFAULT_ROUTES),edge:1,body:1};
  assert.ok(buildGeometry(p,m).lines.slice(1).every(l=>l.spectralLevel===0));
});
test('ridge strength agrees with the shared coefficients and filter response, and rejects Nyquist partials',()=>{
  const p={...params,wavePosition:2/3,cutoff:1500,resonance:4}, response=createFilterResponse(p);
  const g=geometry(p);
  for(const h of [2,3,5,10]) {
    const line=g.lines.find(l=>l.frequency===p.pitch*h);
    assert.ok(Math.abs(line.spectralLevel-ridgeStrength(Math.abs(wavetablePartial(h,p))*response(p.pitch*h)))<1e-10);
  }
  const ultrasonic=geometry({...p,pitch:880}).lines.filter(l=>l.frequency>=24000);
  assert.ok(ultrasonic.length>0);assert.ok(ultrasonic.every(l=>l.spectralLevel===0));
});
test('grouped ridge power is the sum of partial powers, without dilution by band width',()=>{
  const band=HARMONIC_BANDS.find(b=>b.partials.length>1), p={...params,wavePosition:2/3};
  const expected=Math.sqrt(band.partials.reduce((sum,h)=>sum+wavetablePartial(h,p)**2,0));
  assert.equal(bandAmplitude(band,p,()=>1).source,expected);
});
test('pure noise has no pitched ridges',()=>{
  assert.ok(geometry({...params,noise:1,wavePosition:2/3}).lines.every(l=>l.spectralLevel===0));
});
test('playhead cannot light absent partials and uses the same calibrated strength as static ridges',()=>{
  const draw=level=>{
    const strokes=[], c={beginPath(){},moveTo(){},lineTo(){},stroke(){strokes.push(this.strokeStyle);}};
    const fake={ctx:c,events:[{start:0}],project:p=>p};
    const line={kind:'filament',alpha:level,spectralLevel:level,width:1,points:[{x:0,y:0,u:.5},{x:1,y:0,u:.505}]};
    SculptureRenderer.prototype.drawObject.call(fake,{lines:[line],particles:[],brightness:1,total:1,echoLayout:{duration:1}},{gain:1,offset:{},scale:1,time:0},.5);
    return strokes;
  };
  assert.equal(draw(0).length,0);
  const dim=draw(.1),bright=draw(.8);
  assert.equal(dim.length,2);assert.equal(bright.length,2);
  const alpha=s=>Number(s.match(/,([^,]+)\)$/)[1]);
  assert.ok(alpha(dim[1])<.08);assert.ok(alpha(bright[1])>.5);
});
