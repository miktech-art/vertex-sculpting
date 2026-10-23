// Shared, deterministic impulse for audio and the visual energy estimate.
const cache = new Map();
export function reverbImpulse(seconds, sampleRate) {
  const duration = Number(seconds.toFixed(1)), key = `${duration}:${sampleRate}`;
  if (cache.has(key)) return cache.get(key);
  const length = Math.ceil(sampleRate * duration), channels = [];
  const binSize = Math.max(1, Math.round(sampleRate * .001));
  const bins = Array.from({length:Math.ceil(length/binSize)},()=>({time:0,power:0}));
  let seed = 43, energy = 0;
  for (let ch = 0; ch < 2; ch++) {
    const data = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      seed = (Math.imul(seed,1664525)+1013904223) >>> 0;
      data[i] = (seed/4294967296*2-1)*(1-i/length)**2.8*.7;
      const power = data[i]**2, bin = bins[Math.floor(i/binSize)];
      energy += power; bin.power += power/2; bin.time += i/sampleRate*power/2;
    }
    channels.push(data);
  }
  // Web Audio ConvolverNode.normalize algorithm (stereo IR, not true stereo).
  // https://www.w3.org/TR/webaudio/#dom-convolvernode-normalize
  const rms = Math.max(.000125,Math.sqrt(energy/(2*length)));
  const scale = .00125 * 44100 / sampleRate / rms;
  for (const bin of bins) {
    bin.time = bin.power ? bin.time/bin.power : 0;
    bin.power *= scale**2;
  }
  const result = {channels,bins,duration,scale};
  cache.set(key,result);
  if(cache.size>4) cache.delete(cache.keys().next().value);
  return result;
}
