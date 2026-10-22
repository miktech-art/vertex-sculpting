// load order: this import must stay first — modules run in the chain core → render → … → loop (npm run lint checks it)
import './cloud.js';
import { NativeAudioEngine } from '../../sculpt/src/audio/engine.js';
import { settings, STEM_BYTES, LA, noteFor, clamp, V3, SOUNDS, sampleRoot, $ } from './core.js';
import { canvas } from './render.js';
import { chainLevels } from './shape.js';
import { playing, togglePlay } from './edit.js';
import { bars } from './loop.js';

/* =========================================================
   AUDIO
   ========================================================= */
export const visualEvents = [];
const LISTENER = { pos: V3(0, 4.78, 9.98), up: V3(0, 1, 0) };
LISTENER.fwd = V3(0, 0.5, 0.3).sub(LISTENER.pos).normalize();
export const audio = {
  ctx: null,
  sculptBuffers: new Map(),
  sculptJobs: new Map(),
  ensure() {
    if (!this.ctx) this.init();
    this.ctx.resume().catch(e => console.warn('audio resume failed', e));
  },
  prepareSculpt(type) {
    if (!SOUNDS[type]?.sculpt) return Promise.resolve(null);
    if (this.sculptBuffers.has(type)) return Promise.resolve(this.sculptBuffers.get(type));
    if (!this.sculptJobs.has(type)) {
      const job = new NativeAudioEngine().render(SOUNDS[type].sculpt.params).then(buffer => {
        this.sculptBuffers.set(type, buffer);
        return buffer;
      }).catch(error => { this.sculptJobs.delete(type); throw error; });
      this.sculptJobs.set(type, job);
    }
    return this.sculptJobs.get(type);
  },
  init() {
    if (this.ctx) return;
    const ctx = this.ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' });
    this.out = ctx.createGain(); this.out.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
    this.dry = ctx.createGain(); this.wet = ctx.createGain(); this.wet.gain.value = 0.45;
    const conv = ctx.createConvolver(); conv.buffer = this.impulse(3.0);
    this.dry.connect(comp); this.wet.connect(conv); conv.connect(comp); comp.connect(this.out);
    // tempo-synced echo bus (dotted eighth)
    this.delayIn = ctx.createGain();
    this.delay = ctx.createDelay(3); this.delay.delayTime.value = 0.75 * 60 / settings.bpm;
    const fb = ctx.createGain(); fb.gain.value = 0.45;
    const dlf = ctx.createBiquadFilter(); dlf.type = 'lowpass'; dlf.frequency.value = 3200;
    const dlw = ctx.createGain(); dlw.gain.value = 0.3;
    this.delayIn.connect(this.delay); this.delay.connect(dlf); dlf.connect(fb); fb.connect(this.delay);
    dlf.connect(comp); dlf.connect(dlw); dlw.connect(this.wet);
    this.out.connect(ctx.destination);
    // stems bypass the bus compressor; a transparent peak limiter holds them near the song's own -2 dBFS ceiling
    this.clean = ctx.createGain();
    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = -2; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.001; lim.release.value = 0.1;
    const limPost = ctx.createGain(); limPost.gain.value = 1 / 1.1402 / 0.9;   // undo Web Audio's automatic makeup gain and the 0.9 master trim
    this.clean.connect(lim); lim.connect(limPost); limPost.connect(this.out);
    this.stems = {}; this.stemLen = {};
    for (const [k, bytes] of Object.entries(STEM_BYTES))
      bytes.then(b => ctx.decodeAudioData(b)).then(buf => { this.stems[k] = buf; this.stemLen[k] = audibleLength(buf); })
        .catch(e => console.warn('stem decode failed', k, e));
    this.streamDest = ctx.createMediaStreamDestination(); this.out.connect(this.streamDest);
  },
  impulse(sec) {
    const ctx = this.ctx, len = Math.floor(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
    return b;
  },
  chainFor(s) {
    if (s.chain) return s.chain.fx.in;
    const c = this.ctx, p = c.createPanner(), hp = c.createBiquadFilter();
    p.panningModel = 'equalpower'; p.distanceModel = 'inverse'; p.refDistance = 10; p.rolloffFactor = 0.7;
    hp.type = 'highpass'; hp.Q.value = Math.SQRT1_2; hp.connect(p);
    const meter = c.createAnalyser(); meter.fftSize = 256; hp.connect(meter);   // what this form sends out, for the star's drift
    const dry = c.createGain(), rev = c.createGain(), dly = c.createGain();
    p.connect(dry); dry.connect(this.clean);
    p.connect(rev); rev.connect(this.wet); p.connect(dly); dly.connect(this.delayIn);
    const fx = this.fxChain(); fx.out.connect(hp);
    s.chain = { hp, p, dry, rev, dly, fx, meter, buf: new Float32Array(meter.fftSize) };
    this.fxSync(s, true);
    const L = chainLevels(s);
    dry.gain.value = L.dry; rev.gain.value = L.rev; dly.gain.value = L.dly; hp.frequency.value = L.hp;
    const ce = s.feat.centre;
    if (p.positionX) { p.positionX.value = ce.x; p.positionY.value = ce.y; p.positionZ.value = ce.z; } else p.setPosition(ce.x, ce.y, ce.z);
    return fx.in;
  },
  // ---- insert effects: compressor -> distortion -> bitcrusher -> chorus -> flanger -> phaser ----
  fxChain() {
    const c = this.ctx, G = v => { const g = c.createGain(); g.gain.value = v; return g; };
    const mod = (proc, procOut = proc) => { const m = { in: G(1), dry: G(1), wet: G(0), out: G(1) }; m.in.connect(m.dry); m.dry.connect(m.out); m.in.connect(proc); procOut.connect(m.wet); m.wet.connect(m.out); return m; };
    const comp = c.createDynamicsCompressor(); comp.threshold.value = 0; comp.ratio.value = 1; comp.knee.value = 6; comp.attack.value = 0.003; comp.release.value = 0.12;
    const dist = c.createWaveShaper(); dist.oversample = '2x';
    const crush = c.createWaveShaper();
    const ch1 = c.createDelay(0.1), ch2 = c.createDelay(0.1), chSum = G(0.5); ch1.delayTime.value = 0.018; ch2.delayTime.value = 0.026; ch1.connect(chSum); ch2.connect(chSum);
    const chIn = G(1); chIn.connect(ch1); chIn.connect(ch2);
    const fl = c.createDelay(0.05), flFb = G(0); fl.delayTime.value = 0.003; fl.connect(flFb); flFb.connect(fl);
    const aps = [0, 1, 2, 3].map(() => { const b = c.createBiquadFilter(); b.type = 'allpass'; b.frequency.value = 800; b.Q.value = 0.7; return b; });
    aps.reduce((a, b) => (a.connect(b), b));
    const m = { comp, distM: mod(dist), crushM: mod(crush), chM: mod(chIn, chSum), flM: mod(fl), phM: mod(aps[0], aps[3]), ch1, ch2, fl, flFb, aps, dist, crush, keyD: -1, keyC: -1 };
    m.in = G(1); m.in.connect(comp); comp.connect(m.distM.in); m.distM.out.connect(m.crushM.in); m.crushM.out.connect(m.chM.in);
    m.chM.out.connect(m.flM.in); m.flM.out.connect(m.phM.in); m.out = m.phM.out;
    return m;
  },
  crushCurve(a) {
    const k = Math.round(a * 20) / 20; this._crush ??= {};
    if (this._crush[k]) return this._crush[k];
    const bits = 16 - k * 14, steps = Math.pow(2, bits) / 2, n = 4096, arr = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; arr[i] = Math.round(x * steps) / steps; }
    return (this._crush[k] = arr);
  },
  // per frame: amounts, and the sweeps scheduled from the bar clock so sound and displacement move together
  fxSync(s, init) {
    const F = s.chain?.fx; if (!F) return;
    const c = this.ctx, now = c.currentTime, tA = now + LA, a = s.fx, set = (pr, v) => init ? (pr.value = v) : pr.setTargetAtTime(v, now, 0.05);
    set(F.comp.threshold, -36 * a.comp); set(F.comp.ratio, 1 + 11 * a.comp);
    const kd = Math.round(a.dist * 10); if (kd !== F.keyD) { F.keyD = kd; F.dist.curve = this.curve(Math.max(0.1, a.dist)); }
    set(F.distM.dry.gain, 1 - a.dist); set(F.distM.wet.gain, a.dist * (1 - 0.35 * a.dist));
    const kc = Math.round(a.crush * 20); if (kc !== F.keyC) { F.keyC = kc; F.crush.curve = this.crushCurve(a.crush); }
    set(F.crushM.dry.gain, 1 - a.crush); set(F.crushM.wet.gain, a.crush);
    set(F.chM.dry.gain, 1 - 0.3 * a.chorus); set(F.chM.wet.gain, 0.75 * a.chorus);
    set(F.flM.dry.gain, 1 - 0.3 * a.flanger); set(F.flM.wet.gain, 0.8 * a.flanger); set(F.flFb.gain, 0.6 * a.flanger);
    set(F.phM.dry.gain, 1 - 0.25 * a.phaser); set(F.phM.wet.gain, 0.85 * a.phaser);
    const ph = k => 2 * Math.PI * ((bars / s.fxRate[k]) % 1 + 1) % (2 * Math.PI);
    const ramp = (pr, v) => { if (init || !F.ramped) pr.setValueAtTime(v, now); else pr.linearRampToValueAtTime(v, tA); };
    if (a.chorus > 0 || init) { const p = ph('chorus'); ramp(F.ch1.delayTime, 0.018 + 0.004 * Math.sin(p)); ramp(F.ch2.delayTime, 0.026 + 0.005 * Math.sin(p + 2.1)); }
    if (a.flanger > 0 || init) ramp(F.fl.delayTime, 0.0035 + 0.0028 * Math.sin(ph('flanger')));
    if (a.phaser > 0 || init) { const f = 300 * Math.pow(10, 0.5 + 0.5 * Math.sin(ph('phaser'))); F.aps.forEach((b, i) => ramp(b.frequency, f * (1 + i * 0.6))); }
    F.ramped = true;
  },
  // how loud this form is right now, 0 (silent) … 1 (about -6 dBFS), with a short release
  level(s) {
    const C = s.chain; if (!C) return 0;
    C.meter.getFloatTimeDomainData(C.buf);
    let sq = 0; for (let i = 0; i < C.buf.length; i++) sq += C.buf[i] * C.buf[i];
    const db = 10 * Math.log10(sq / C.buf.length + 1e-12), now = clamp((db + 48) / 42, 0, 1);
    return (s.lvl = Math.max(now, (s.lvl ?? 0) * 0.88));
  },
  curve(d) {
    const k = Math.round(d * 10) / 10; this._curves ??= {};
    if (this._curves[k]) return this._curves[k];
    const n = 1024, a = 1 + k * 30, arr = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; arr[i] = Math.tanh(a * x) / Math.tanh(a); }
    return (this._curves[k] = arr);
  },
  listener() {
    if (!this.ctx) return;
    // a fixed listener in front of the scene (where the default 3D view looks from), so the mix belongs to the layout and
    // never changes when you orbit or switch views; sources sit at anchor × PANW, so the layout pans gently around the centre
    const L = this.ctx.listener, p = LISTENER.pos, f = LISTENER.fwd, u = LISTENER.up;
    if (L.positionX) {
      L.positionX.value = p.x; L.positionY.value = p.y; L.positionZ.value = p.z;
      L.forwardX.value = f.x; L.forwardY.value = f.y; L.forwardZ.value = f.z; L.upX.value = u.x; L.upY.value = u.y; L.upZ.value = u.z;
    } else { L.setPosition(p.x, p.y, p.z); L.setOrientation(f.x, f.y, f.z, u.x, u.y, u.z); }
  },
  // returns how long the note is audible (s), for the flare
  note(s, t, corner) {
    const midi = noteFor(s, corner), vel = 0.6;
    return this.play(s.sound, 440 * Math.pow(2, (midi - 69) / 12), vel, Math.max(t, this.ctx.currentTime), this.chainFor(s));
  },
  preview(s) { if (!this.ctx) return; const midi = noteFor(s, 0), vel = 0.6; this.play(s.sound, 440 * Math.pow(2, (midi - 69) / 12), vel, this.ctx.currentTime + 0.01, this.dry); },
  play(type, f, vel, t, out) {
    if (import.meta.env.DEV || import.meta.env.MODE === 'debug') (window._ev ||= []).push([type, t, f, vel, this.ctx.currentTime]);   // test hook
    const SD = SOUNDS[type];
    if (!SD) return 0;
    const buf = SD.sculpt ? this.sculptBuffers.get(type) : this.stems?.[SD.stem];
    if (!buf) {
      if (SD.sculpt) this.prepareSculpt(type).catch(e => console.warn('sculpt sound render failed', e));
      return 0;
    }
    const c = this.ctx, src = c.createBufferSource(), sg_ = c.createGain();
    src.buffer = buf;
    src.playbackRate.value = f / (440 * Math.pow(2, (sampleRoot(type) - 69) / 12));   // tape-style: every stem follows height
    sg_.gain.value = Math.pow(10, SD.db / 20) * vel / 0.6;
    src.connect(sg_); sg_.connect(out); src.start(t);
    src.onended = () => { try { sg_.disconnect(); } catch (e) { } };
    return (SD.sculpt ? buf.duration : this.stemLen[SD.stem]) / src.playbackRate.value;
  },
};
// time until the stem falls below -40 dB of its peak for good
function audibleLength(buf) {
  const d = buf.getChannelData(0); let pk = 0, last = 0;
  for (let i = 0; i < d.length; i++) pk = Math.max(pk, Math.abs(d[i]));
  for (let i = 0; i < d.length; i++) if (Math.abs(d[i]) > pk * 0.01) last = i;
  return last / buf.sampleRate;
}

/* =========================================================
   RECORDING (video+audio via MediaRecorder, WAV via ScriptProcessor)
   ========================================================= */
export const rec = { on: false, mr: null, chunks: [], wavL: [], wavR: [], node: null, sink: null, t0: 0, video: null, wav: null, mime: '' };
export async function startRec() {
  if (!audio.ctx) return;
  if (!playing) togglePlay(true);
  rec.chunks = []; rec.wavL = []; rec.wavR = []; rec.video = null; rec.wav = null;
  const vs = canvas.captureStream(60);
  const ms = new MediaStream([...vs.getVideoTracks(), ...audio.streamDest.stream.getAudioTracks()]);
  const types = ['video/mp4;codecs=avc1.640028,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  rec.mime = types.find(t => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || '';
  try {
    rec.mr = new MediaRecorder(ms, rec.mime ? { mimeType: rec.mime, videoBitsPerSecond: 14e6 } : undefined);
    rec.mr.ondataavailable = e => e.data.size && rec.chunks.push(e.data);
    rec.mr.onstop = () => { rec.video = new Blob(rec.chunks, { type: rec.mr.mimeType || rec.mime || 'video/webm' }); showExports(); };
    rec.mr.start(250);
  } catch (e) { console.warn('video recording unavailable', e); rec.mr = null; }
  try {
    // ScriptProcessor tap: works from file:// too (AudioWorklet modules don't)
    rec.node = audio.ctx.createScriptProcessor(4096, 2, 2);
    rec.node.onaudioprocess = e => {
      if (!rec.on) return;
      const ib = e.inputBuffer;
      rec.wavL.push(ib.getChannelData(0).slice(0)); rec.wavR.push((ib.numberOfChannels > 1 ? ib.getChannelData(1) : ib.getChannelData(0)).slice(0));
    };
    rec.sink = audio.ctx.createGain(); rec.sink.gain.value = 0;
    audio.out.connect(rec.node); rec.node.connect(rec.sink); rec.sink.connect(audio.ctx.destination);
  } catch (e) { console.warn('wav recording unavailable', e); rec.node = null; }
  rec.on = true; rec.t0 = performance.now();
  $('recBtn').classList.add('on'); $('recBtn').textContent = '■ STOP REC'; $('exports').style.display = 'none';
}
export function stopRec() {
  rec.on = false;
  if (rec.mr && rec.mr.state !== 'inactive') rec.mr.stop();
  if (rec.node) {
    try { audio.out.disconnect(rec.node); rec.node.disconnect(); rec.sink.disconnect(); } catch (e) { }
    rec.wav = encodeWav(rec.wavL, rec.wavR, audio.ctx.sampleRate); rec.node = null;
  }
  $('recBtn').classList.remove('on'); $('recBtn').textContent = '● REC';
  showExports();
}
function showExports() {
  $('exports').style.display = (rec.video || rec.wav) ? 'flex' : 'none';
  $('expVid').style.display = rec.video ? '' : 'none'; $('expWav').style.display = rec.wav ? '' : 'none';
  $('expVid').textContent = 'EXPORT ' + ((rec.video?.type || '').includes('mp4') ? 'MP4' : 'WEBM');
}
function encodeWav(Ls, Rs, sr) {
  const len = Ls.reduce((a, b) => a + b.length, 0); if (!len) return null;
  const buf = new ArrayBuffer(44 + len * 4), dv = new DataView(buf);
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  ws(0, 'RIFF'); dv.setUint32(4, 36 + len * 4, true); ws(8, 'WAVE'); ws(12, 'fmt ');
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 2, true); dv.setUint32(24, sr, true);
  dv.setUint32(28, sr * 4, true); dv.setUint16(32, 4, true); dv.setUint16(34, 16, true); ws(36, 'data'); dv.setUint32(40, len * 4, true);
  let o = 44;
  for (let c = 0; c < Ls.length; c++) {
    const l = Ls[c], r = Rs[c];
    for (let i = 0; i < l.length; i++) {
      dv.setInt16(o, clamp(l[i], -1, 1) * 32767, true); dv.setInt16(o + 2, clamp(r[i], -1, 1) * 32767, true); o += 4;
    }
  }
  return new Blob([buf], { type: 'audio/wav' });
}
export function download(blob, ext) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  const d = new Date(), p = n => String(n).padStart(2, '0');
  a.download = `vertex-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}.${ext}`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

