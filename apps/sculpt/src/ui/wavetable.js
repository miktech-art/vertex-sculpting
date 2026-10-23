import { FRAME_COUNT, WAVETABLES, waveform } from '../oscillator/wavetable.js';
export class WavetableView {
  constructor(canvas, onInput, onCommit) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d');
    this.observer = new ResizeObserver(() => this.draw()); this.observer.observe(canvas);
    let dragging = false;
    canvas.addEventListener('pointerdown', e => {
      if (e.button !== 0) return; dragging = true; canvas.setPointerCapture(e.pointerId); this.pick(e, onInput);
    });
    canvas.addEventListener('pointermove', e => { if (dragging) this.pick(e, onInput); });
    const end = () => { if (dragging) { dragging = false; onCommit(); } };
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
  }
  pick(e, input) {
    const r = this.canvas.getBoundingClientRect();
    input(Math.max(0, Math.min(1, (1 - (e.clientY - r.top) / r.height - 0.15) / 0.7)));
  }
  update(params) { this.params = params; this.draw(); }
  draw() {
    if (!this.params) return;
    const c = this.ctx, r = this.canvas.getBoundingClientRect(); if (!r.width || !r.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = r.width * dpr; this.canvas.height = r.height * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const key = `${this.params.waveTable}:${this.params.harmonics}`;
    if (key !== this.key) {
      this.key = key;
      this.frames = Array.from({length: FRAME_COUNT}, (_, i) => waveform({...this.params, wavePosition: i / (FRAME_COUNT - 1)}));
    }
    const trace = (samples, t, active) => {
      const left = 7 + t * 17, width = r.width - 32, y = r.height * (0.83 - t * 0.66);
      c.beginPath(); samples.forEach((s, i) => { const x = left + i / (samples.length - 1) * width, yy = y - s * r.height * 0.12;
        if (i) c.lineTo(x, yy); else c.moveTo(x, yy); });
      c.strokeStyle = active ? '#ffffff' : `rgba(255,255,255,${0.10 + t * 0.12})`; c.lineWidth = active ? 1.3 : 0.65; c.stroke();
    };
    for (let i = FRAME_COUNT - 1; i >= 0; i--) trace(this.frames[i], i / (FRAME_COUNT - 1), false);
    const position = this.params.wavePosition ?? 0;
    trace(waveform(this.params), position, true);
    this.canvas.setAttribute('aria-label', `${WAVETABLES[Math.round(this.params.waveTable ?? 0)]} wavetable, position ${Math.round(position * 100)} percent`);
  }
}
