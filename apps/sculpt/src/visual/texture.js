import { reverbImpulse } from "../audio/reverb.js";
import { BASE, envelopeAt } from '../model.js';
import { wavetableCoefficients } from '../oscillator/wavetable.js';
import { ridgeDecibels, ridgeStrength } from '../spectral/ridges.js';

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
// Fixed reference: the original unit sine at the default output level.
// RMS levels are measured in the model before master gain/compression, not at the ear.
export const NOISE_REFERENCE_RMS = BASE.volume * .52 / Math.sqrt(2);
export const MAX_NOISE_GRAINS = 64000;
export function buildNoiseTexture(params, {length,total,contour,response,sampleRate = 48000,grain = 0}) {
  const empty = {particles:[],batches:[],amplitude:0,rms:0,levelDb:-Infinity};
  if (params.noise <= 0) return empty;
  const distribution = noiseDistribution(response,sampleRate);
  const sourceRms = params.noise * .65 / Math.sqrt(3) * distribution.transmission;
  const rms = sourceRms * params.volume * .52;
  const peakStrength = ridgeStrength(rms / NOISE_REFERENCE_RMS);
  const particles=[], batches=new Map();
  if (!distribution.power || peakStrength<=0) return {...empty,amplitude:sourceRms*Math.sqrt(2),rms,levelDb:ridgeDecibels(rms)};
  const bins=distribution.bins;
  for(let i=0;i<MAX_NOISE_GRAINS;i++) {
    const u=random(i,57), e=envelopeAt(contour,u*total);
    // Convert relative RMS dB back to power for spatial coverage. Exposure is
    // fixed, so a 6 dB level increase gives about four times as many grains.
    const density=Math.min(1,8*(rms*e / NOISE_REFERENCE_RMS)**2);
    if(random(i,99)>=density) continue;
    const target=random(i,89)*distribution.power;
    let low=0,high=bins.length-1;
    while(low<high){const mid=(low+high)>>1;if(bins[mid].cumulative<target)low=mid+1;else high=mid;}
    const bin=bins[low],frequency=bin.low+(bin.high-bin.low)*random(i,90);
    const position=Math.max(0,Math.min(1,Math.log(frequency/20)/Math.log(sampleRate/40)));
    const angle=random(i,63)*Math.PI*2;
    // Bandwidth stays broad through a sharp attack; amplitude changes the number
    // of grains, rather than rounding the transient into a diffuse particle ball.
    const radius=(20+72*position)*Math.sqrt(random(i,39));
    const shade=Math.round(Math.floor(random(i,71)*8)*255/7);
    const alpha=(.3+Math.floor(random(i,70)*4)*.2)*(.45+.55*peakStrength ** .35);
    const pt={x:(u-.5)*length,y:Math.cos(angle)*radius,z:Math.sin(angle)*radius*.8,
      u,frequency,kind:'noise',shade,alpha,size:(.7+random(i,76)*.9)*(.85+.3*grain),
      levelDb:ridgeDecibels(rms*e)};
    particles.push(pt);
    const key=`${shade}:${alpha}`;
    if(!batches.has(key))batches.set(key,{shade,alpha,particles:[]});
    batches.get(key).particles.push(pt);
  }
  return {particles,batches:[...batches.values()],amplitude:sourceRms*Math.sqrt(2),rms,levelDb:ridgeDecibels(rms)};
}

function sourceProfiles(lines,particles) {
  const count=lines[0]?.points.length || 121;
  const profiles=Array.from({length:count},()=>({y:0,z:0,positiveY:0,positiveZ:0,negativeY:0,negativeZ:0,positivePower:0,negativePower:0}));
  for(const line of lines) {
    if((line.spectralLevel??0)<.002)continue;
    const power=Number.isFinite(line.levelDb)?10**(line.levelDb/10):0;
    line.points.forEach((pt,i)=>{
      const profile=profiles[i];if(!profile)return;
      profile.y=Math.max(profile.y,Math.abs(pt.y));profile.z=Math.max(profile.z,Math.abs(pt.z));
      for(const sign of line.side?[line.side]:[-1,1]){
        const prefix=sign>0?'positive':'negative';
        profile[`${prefix}Y`]+=pt.y*power;profile[`${prefix}Z`]+=pt.z*power;profile[`${prefix}Power`]+=power;
      }
    });
  }
  for(const pt of particles) {
    const i=Math.max(0,Math.min(count-1,Math.round(pt.u*(count-1))));
    for(let j=Math.max(0,i-1);j<=Math.min(count-1,i+1);j++){
      profiles[j].y=Math.max(profiles[j].y,Math.abs(pt.y));profiles[j].z=Math.max(profiles[j].z,Math.abs(pt.z));
    }
  }
  for(const profile of profiles)for(const prefix of ['positive','negative']){
    const power=profile[`${prefix}Power`];if(power>0){profile[`${prefix}Y`]/=power;profile[`${prefix}Z`]/=power;}
  }
  return profiles;
}
// Estimate PeriodicWave peak normalization with a dense cycle. Cache it since
// filter/envelope/reverb edits do not change the oscillator's normalization.
const wavePeaks = new Map();
function oscillatorPeak(params, coefficients) {
  const key=JSON.stringify([params.harmonics,params.wavePosition,params.waveTable]);
  if(wavePeaks.has(key)) return wavePeaks.get(key);
  let peak=0;
  for(let i=0;i<2048;i++){
    let value=0;
    for(let h=1;h<coefficients.length;h++) value+=coefficients[h]*Math.sin(2*Math.PI*i/2048*h);
    peak=Math.max(peak,Math.abs(value));
  }
  peak=Math.max(1e-12,peak);wavePeaks.set(key,peak);
  if(wavePeaks.size>8)wavePeaks.delete(wavePeaks.keys().next().value);
  return peak;
}
export function buildReverbGlow(params,{length,total,contour,response,noiseAmplitude=0,sampleRate=48000,spread=0,extent=0,lines=[],particles=[]}) {
  if (params.reverbMix <= 0) return [];
  const {imag:coefficients} = wavetableCoefficients(params);
  let tonalPower = 0;
  for(let h=1;h<coefficients.length;h++) tonalPower += (coefficients[h]*response(params.pitch*h)*(1-params.noise)) ** 2;
  if(tonalPower>0) tonalPower /= oscillatorPeak(params,coefficients)**2;
  // Mean-square source level, before the master compressor. The oscillator
  // normalization is estimated above; nonlinear drive/detune are not modeled.
  const sourcePower = (tonalPower + noiseAmplitude ** 2) / 2 * (params.volume*.52)**2;
  const impulse = reverbImpulse(params.reverbDecay,sampleRate);
  const tail = impulse.duration, glow = [], duration = total + tail;
  const profiles=sourceProfiles(lines,particles);
  const profileAt=time=>profiles[Math.max(0,Math.min(profiles.length-1,Math.round(time/total*(profiles.length-1))))];
  // Include envelope corners so short transients are not lost between display samples.
  const times = [...new Set([...Array.from({length:96},(_,i)=>i/95*duration),
    contour.attack,contour.attack+contour.decay,total-contour.release,total])].sort((a,b)=>a-b);
  for(const time of times) {
    let power=0, widthY=0,widthZ=0,posY=0,posZ=0,negY=0,negZ=0;
    for(const bin of impulse.bins) {
      if(bin.time>time) break;
      const at = time-bin.time;
      const e = at<=total ? envelopeAt(contour,at) : 0;
      const contribution=e*e*bin.power;power+=contribution;
      if(contribution>0){
        const profile=profileAt(at);
        widthY+=profile.y**2*contribution;widthZ+=profile.z**2*contribution;
        posY+=profile.positiveY*contribution;posZ+=profile.positiveZ*contribution;
        negY+=profile.negativeY*contribution;negZ+=profile.negativeZ*contribution;
      }
    }
    const wetPower = power*params.reverbMix**2*sourcePower;
    // Display amplitude (sqrt power), like the audio level. Linear-power alpha
    // was quantized to zero in 8-bit Canvas gradients at audible wet levels.
    const relativePower = wetPower / NOISE_REFERENCE_RMS**2;
    const alpha = .09 * Math.sqrt(relativePower);
    if(alpha < .000001) continue;
    const levelDb = wetPower>0 ? 10*Math.log10(wetPower) : -Infinity;
    const current=time<=total?profileAt(time):{y:0,z:0};
    const y=Math.max(current.y,power?Math.sqrt(widthY/power):0);
    const z=Math.max(current.z,power?Math.sqrt(widthZ/power):0);
    const padding=16+12*spread+8*extent*time/duration;
    // A blur is part of the time support too: its leading edge must be causal.
    const radiusX=Math.min(length/total*time,Math.max(3,length/total*duration/95*1.8));
    // An enclosing soft shell always reaches beyond the visible harmonics.
    glow.push({x:(time/total-.5)*length,y:0,z:0,time,levelDb,kind:'shell',alpha:alpha*.9,
      radiusX,radiusY:y*1.5+padding,radiusZ:z*1.5+padding});
    if(power>0 && tonalPower>0){
      for(const side of [-1,1]){
        glow.push({x:(time/total-.5)*length,y:(side>0?posY:negY)/power,z:(side>0?posZ:negZ)/power,
          time,levelDb,kind:'spectral',alpha:alpha*.35,radiusX,radiusY:padding*.8,radiusZ:padding*.8});
      }
    }
  }
  return glow;
}
