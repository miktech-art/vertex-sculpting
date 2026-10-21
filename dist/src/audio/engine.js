import { duration, tailDuration, clamp } from '../model.js';

// Adapter contract: trigger(params) -> {start, duration, total, params}; stop(); now().
// A future external instrument adapter can implement the same contract.
export class NativeAudioEngine {
  constructor(){this.context=null;this.voices=new Set();this.impulses=new Map();this.muted=false;}
  async init(){if(!this.context){const C=window.AudioContext||window.webkitAudioContext;if(!C)throw new Error('This browser does not support Web Audio.');this.context=new C();this.master=this.context.createGain();this.master.gain.value=.72;const limiter=this.context.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=8;limiter.ratio.value=12;limiter.attack.value=.003;limiter.release.value=.15;this.master.connect(limiter).connect(this.context.destination);}await this.context.resume();}
  now(){return this.context?.currentTime??0;}
  setMuted(value){this.muted=value;if(this.master)this.master.gain.setTargetAtTime(value?0:.72,this.now(),.02);}
  impulse(seconds){const c=this.context,key=seconds.toFixed(2);if(this.impulses.has(key))return this.impulses.get(key);const n=Math.ceil(c.sampleRate*seconds),b=c.createBuffer(2,n,c.sampleRate);let seed=43;for(let ch=0;ch<2;ch++){const data=b.getChannelData(ch);for(let i=0;i<n;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i]=(seed/4294967296*2-1)*(1-i/n)**2.8*.7;}}this.impulses.set(key,b);if(this.impulses.size>10)this.impulses.delete(this.impulses.keys().next().value);return b;}
  async trigger(params){await this.init();const p={...params},c=this.context,start=c.currentTime+.015,nodes=[],sources=[];const own=n=>{nodes.push(n);return n;};
    const input=own(c.createGain()),drive=own(c.createWaveShaper()),filter=own(c.createBiquadFilter()),env=own(c.createGain()),amp=own(c.createGain()),output=own(c.createGain());
    const curve=new Float32Array(2048),k=1+p.drive*18;for(let i=0;i<curve.length;i++){const x=i/(curve.length-1)*2-1;curve[i]=p.drive<.001?x:Math.tanh(x*k)/Math.tanh(k);}drive.curve=curve;drive.oversample='2x';
    filter.type='lowpass';filter.frequency.value=p.cutoff;filter.Q.value=p.resonance;
    input.connect(drive).connect(filter).connect(env).connect(amp).connect(output);output.gain.value=.52;
    const real=new Float32Array(14),imag=new Float32Array(14);imag[1]=1;for(let h=2;h<14;h++)imag[h]=p.harmonics/(h**(1.1+(1-p.harmonics)*1.5));
    const wave=c.createPeriodicWave(real,imag);for(let v=0;v<2;v++){const osc=own(c.createOscillator()),gain=own(c.createGain()),pan=own(c.createStereoPanner());osc.setPeriodicWave(wave);osc.frequency.value=p.pitch;osc.detune.value=(v?1:-1)*p.detune/2;gain.gain.value=(1-p.noise)*.5;pan.pan.value=(v?1:-1)*p.width*.85;osc.connect(gain).connect(pan).connect(input);osc.start(start);sources.push(osc);}
    if(p.noise>0){const noise=own(c.createBufferSource()),gain=own(c.createGain()),buf=c.createBuffer(2,c.sampleRate*2,c.sampleRate);for(let ch=0;ch<2;ch++){const a=buf.getChannelData(ch);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;}noise.buffer=buf;noise.loop=true;gain.gain.value=p.noise*.65;noise.connect(gain).connect(input);noise.start(start);sources.push(noise);}
    const gate=p.attack+p.decay+p.hold,end=duration(p);env.gain.setValueAtTime(0,start);env.gain.linearRampToValueAtTime(p.volume,start+p.attack);env.gain.linearRampToValueAtTime(p.volume*p.sustain,start+p.attack+p.decay);env.gain.setValueAtTime(p.volume*p.sustain,start+gate);env.gain.linearRampToValueAtTime(0,start+end);
    amp.gain.value=1-p.motion/2;if(p.motion>0){const lfo=own(c.createOscillator()),depth=own(c.createGain());lfo.frequency.value=p.rate;depth.gain.value=p.motion/2;lfo.connect(depth).connect(amp.gain);lfo.start(start);sources.push(lfo);}
    output.connect(this.master);
    if(p.delayMix>0){const delay=own(c.createDelay(1)),feedback=own(c.createGain()),wet=own(c.createGain());delay.delayTime.value=p.delayTime;feedback.gain.value=p.feedback;wet.gain.value=p.delayMix;output.connect(delay);delay.connect(feedback).connect(delay);delay.connect(wet).connect(this.master);}
    if(p.reverbMix>0){const convolver=own(c.createConvolver()),wet=own(c.createGain());convolver.buffer=this.impulse(p.reverbDecay);wet.gain.value=p.reverbMix;output.connect(convolver).connect(wet).connect(this.master);}
    for(const source of sources)source.stop(start+end+.03);
    const voice={start,duration:end,total:tailDuration(p),params:p,nodes,sources};this.voices.add(voice);voice.timer=setTimeout(()=>this.disposeVoice(voice),(voice.total+.3)*1000);return voice;
  }
  disposeVoice(v){clearTimeout(v.timer);for(const s of v.sources){try{s.stop();}catch{}}for(const n of v.nodes){try{n.disconnect();}catch{}}this.voices.delete(v);}
  stop(){for(const v of this.voices){const now=this.now();for(const n of v.nodes){if(n instanceof GainNode)n.gain.setTargetAtTime(0,now,.008);}clearTimeout(v.timer);v.timer=setTimeout(()=>this.disposeVoice(v),60);}}
  async render(params){
    // Use the same synthesis graph through a temporary adapter and an offline context.
    const length=Math.ceil((tailDuration(params)+.25)*44100);const context=new OfflineAudioContext(2,length,44100);const engine=new NativeAudioEngine();engine.context=context;engine.master=context.createGain();engine.master.gain.value=.55;const limiter=context.createDynamicsCompressor();limiter.threshold.value=-12;limiter.ratio.value=12;engine.master.connect(limiter).connect(context.destination);engine.init=async()=>{};await engine.trigger(params);const buffer=await context.startRendering();for(const v of [...engine.voices])engine.disposeVoice(v);return buffer;
  }
}
export function encodeWav(buffer){const frames=buffer.length,channels=buffer.numberOfChannels,bytes=new ArrayBuffer(44+frames*channels*2),v=new DataView(bytes);let o=0;const str=s=>{for(const ch of s)v.setUint8(o++,ch.charCodeAt(0));},u16=x=>{v.setUint16(o,x,true);o+=2;},u32=x=>{v.setUint32(o,x,true);o+=4;};str('RIFF');u32(36+frames*channels*2);str('WAVEfmt ');u32(16);u16(1);u16(channels);u32(buffer.sampleRate);u32(buffer.sampleRate*channels*2);u16(channels*2);u16(16);str('data');u32(frames*channels*2);const data=Array.from({length:channels},(_,i)=>buffer.getChannelData(i));for(let i=0;i<frames;i++)for(let ch=0;ch<channels;ch++){const n=clamp(data[ch][i],-1,1);v.setInt16(o,n<0?n*32768:n*32767,true);o+=2;}return new Blob([bytes],{type:'audio/wav'});}
