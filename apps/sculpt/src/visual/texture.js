import { envelopeAt } from '../model.js';
import { wavetablePartial } from '../oscillator/wavetable.js';
import { ridgeStrength } from '../spectral/ridges.js';

// Repeatable visual samples; the audio itself uses a continuous white-noise buffer.
const random = (i, salt = 0) => {
  let n = Math.imul(i + 171, 374761393) ^ Math.imul(salt + 439, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};
export function noiseDistribution(response, sampleRate = 48000) {
  const top = sampleRate / 2, bins = [];
  let power = 0;
  for (let i = 0; i < 128; i++) {
    const low = 20 * (top / 20) ** (i / 128), high = 20 * (top / 20) ** ((i + 1) / 128);
    power += (high - low) * response(Math.sqrt(low * high)) ** 2;
    bins.push({low, high, cumulative:power});
  }
  return {bins, power, transmission: Math.sqrt(power / (top - 20))};
}
export function buildNoiseTexture(params, {length,total,contour,response,sampleRate = 48000,grain = 0}) {
  if (params.noise <= 0) return {particles:[],amplitude:0};
  const distribution = noiseDistribution(response,sampleRate);
  // White-noise samples have RMS 1/sqrt(3); compare with a unit sine's RMS.
  const amplitude = params.noise * .65 * Math.sqrt(2 / 3) * distribution.transmission;
  const strength = ridgeStrength(amplitude), particles = [];
  const count = Math.round(4200 * params.noise ** .8 * (.8 + .2 * grain));
  if (!distribution.power || strength <= 0) return {particles,amplitude};
  for (let i = 0; i < count; i++) {
    const u = random(i,57), e = envelopeAt(contour,u * total);
    if (e <= .00001) continue;
    const target = random(i,89) * distribution.power;
    const bin = distribution.bins.find(b=>b.cumulative >= target) || distribution.bins.at(-1);
    const frequency = bin.low + (bin.high-bin.low) * random(i,90);
    const position = Math.max(0,Math.min(1,Math.log(frequency / 20) / Math.log(sampleRate / 40)));
    const angle = random(i,63) * Math.PI * 2;
    const radius = (20 + 72 * position) * (.25 + .75 * random(i,39)) * e ** .6;
    particles.push({
      x:(u-.5)*length, y:Math.cos(angle)*radius, z:Math.sin(angle)*radius*.8,
      u, frequency, kind:'noise', alpha:(.22 + random(i,70)*.48)*strength*e ** .5,
      size:.5 + random(i,76)*.8,
    });
  }
  return {particles,amplitude};
}
export function buildReverbGlow(params,{length,total,contour,response,noiseAmplitude=0,spread=0,extent=0}) {
  if (params.reverbMix <= 0) return [];
  let tonalPower = 0;
  for(let h=1;h<=96;h++) tonalPower += (wavetablePartial(h,params)*response(params.pitch*h)*(1-params.noise)) ** 2;
  const sourceAmplitude = Math.sqrt(tonalPower + noiseAmplitude ** 2);
  const tail = params.reverbDecay, glow = [], duration = total + tail;
  const weights = Array.from({length:48},(_,j)=>(1-j/47) ** 5.6);
  const norm = weights.reduce((a,b)=>a+b,0);
  for(let i=0;i<48;i++) {
    const time = i / 47 * duration;
    let power=0;
    for(let j=0;j<48;j++) {
      const at = time-j/47*tail;
      const e = at>=0 && at<=total ? envelopeAt(contour,at) : 0;
      power += e*e*weights[j];
    }
    const dry = time<=total ? envelopeAt(contour,time) : 0;
    const wet = Math.sqrt(power/norm)*params.reverbMix*sourceAmplitude;
    // A display masking cue: keep the wet field subdued under the dry sound.
    const alpha = .045 * ridgeStrength(wet) * (1-.65*dry);
    if(alpha < .0001) continue;
    glow.push({x:(time/total-.5)*length,y:0,z:22,time,alpha,
      radius:(20 + 24*spread + 18*Math.sqrt(time/duration))*(1+.3*extent*time/duration)});
  }
  return glow;
}
