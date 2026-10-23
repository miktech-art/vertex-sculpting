const clamp = n => Math.max(0, Math.min(1, n));
export function dragKnob(n, deltaY, fine = false) { return clamp(n - deltaY * 1.4 / (fine ? 1800 : 180)); }
// One continuous stroke: bottom-left arc, then inward from its moving tip.
export function knobPath(value) {
  const n = clamp(value), angle = (-135 + n * 270) * Math.PI / 180;
  const point = r => `${20 + r * Math.sin(angle)} ${20 - r * Math.cos(angle)}`;
  return `M${20 - 15 / Math.sqrt(2)} ${20 + 15 / Math.sqrt(2)}${n > 0 ? ` A15 15 0 ${n > 2 / 3 ? 1 : 0} 1 ${point(15)}` : ''} L${point(4)}`;
}
export function parseKnobValue(text, unit = '') {
  const match = String(text).trim().match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(khz|hz|ms|s|%|ct|db|×)?$/i);
  if (!match) return NaN;
  let value = Number(match[1]); const suffix = (match[2] || '').toLowerCase();
  if (suffix === 'khz') value *= 1000;
  if (suffix === 'ms') value /= 1000;
  if (suffix === '%' || (unit === '%' && !suffix)) value /= 100;
  return value;
}
export class Knob {
  constructor({ id, label, min = 0, max = 1, value = min, unit = '', format = v => v.toFixed(2),
    normalize = v => (v - min) / (max - min), denormalize = n => min + n * (max - min),
    constrain = v => Math.max(min, Math.min(max, v)), onInput, onCommit = () => {}, reset = () => value }) {
    Object.assign(this, { min, max, unit, format, normalize, denormalize, constrain, onInput, onCommit, reset });
    this.element = document.createElement('div'); this.element.className = 'knob-control';
    const title = document.createElement('label'); title.textContent = label; title.htmlFor = id; title.className = 'knob-label';
    this.dial = document.createElement('div'); this.dial.id = id; this.dial.className = 'knob-dial'; this.dial.tabIndex = 0;
    this.dial.setAttribute('role', 'slider'); this.dial.setAttribute('aria-label', label);
    this.dial.setAttribute('aria-valuemin', min); this.dial.setAttribute('aria-valuemax', max);
    this.dial.setAttribute('aria-orientation', 'vertical');
    this.dial.title = 'Drag up or down · Shift: fine · Double-click: reset';
    // The path is rendered in setValue.
    this.editor = document.createElement('input'); this.editor.type = 'text'; this.editor.inputMode = 'decimal';
    this.editor.className = 'knob-value'; this.editor.setAttribute('aria-label', `${label} value`);
    this.editor.title = 'Click to type a value · Enter: apply · Escape: cancel';
    this.element.append(title, this.dial, this.editor);
    this.dial.addEventListener('pointerdown', e => {
      if (e.button !== 0) return; e.preventDefault(); this.drag = { y: e.clientY, changed: false, id: e.pointerId };
      this.dial.focus({ preventScroll: true }); this.dial.setPointerCapture(e.pointerId);
      document.documentElement.classList.add('knob-dragging');
    });
    this.dial.addEventListener('pointermove', e => {
      if (!this.drag || e.pointerId !== this.drag.id) return;
      const n = dragKnob(this.normalize(this.value), e.clientY - this.drag.y, e.shiftKey);
      this.drag.y = e.clientY;
      const before = this.value; this.edit(this.denormalize(n)); this.drag.changed ||= this.value !== before;
    });
    const end = () => { if (!this.drag) return; const changed = this.drag.changed; this.drag = null; document.documentElement.classList.remove('knob-dragging'); if (changed) this.onCommit(); };
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) this.dial.addEventListener(type, end);
    this.dial.addEventListener('blur', end);
    document.defaultView?.addEventListener('blur', end);
    this.dial.addEventListener('dblclick', e => { e.preventDefault(); this.edit(this.reset()); this.onCommit(); });
    this.dial.addEventListener('keydown', e => {
      const delta = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (delta === undefined && !['Home', 'End'].includes(e.key)) return;
      e.preventDefault(); e.stopPropagation();
      this.edit(this.denormalize(e.key === 'Home' ? 0 : e.key === 'End' ? 1 : clamp(this.normalize(this.value) + delta * (e.shiftKey ? 0.001 : 0.01)))); this.onCommit();
    });
    this.editor.addEventListener('focus', () => { this.editing = true; this.entryUnit = this.format(this.value).match(/(kHz|Hz|ms|s|%|ct|dB|×)$/i)?.[1] || ''; this.editor.select(); });
    this.editor.addEventListener('blur', () => {
      const raw = this.editor.value.trim();
      const value = parseKnobValue(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw) ? raw + this.entryUnit : raw, this.unit); this.editing = false;
      if (Number.isFinite(value) && value !== this.value) { this.edit(value); this.onCommit(); }
      this.setValue(this.value);
    });
    this.editor.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); this.editor.blur(); }
      if (e.key === 'Escape') { this.editing = false; this.setValue(this.value); this.editor.blur(); }
    });
    this.setValue(value);
  }
  edit(value) { this.setValue(this.constrain(value)); this.onInput?.(this.value); }
  setValue(value) {
    this.value = value;
    this.dial.innerHTML = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="${knobPath(this.normalize(value))}"/></svg>`;
    this.dial.setAttribute('aria-valuenow', value); this.dial.setAttribute('aria-valuetext', this.format(value));
    if (!this.editing) this.editor.value = this.format(value);
  }
}
