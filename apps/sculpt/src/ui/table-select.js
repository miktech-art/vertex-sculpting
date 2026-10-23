import { WAVETABLES } from '../oscillator/wavetable.js';

// A monochrome menu, independent of the operating system's select styling.
export class TableSelect {
  constructor(root, onChange, {labels=WAVETABLES,label='Wavetable',id='wavetable-options'}={}) {
    this.root = root; this.value = 0;
    this.labels=labels;this.label=label;
    this.button = document.createElement('button'); this.button.type = 'button';
    this.button.className = 'wavetable-trigger';
    this.button.setAttribute('aria-haspopup', 'listbox');
    this.button.setAttribute('aria-controls', id);
    this.menu = document.createElement('div'); this.menu.id = id;
    this.menu.className = 'wavetable-options'; this.menu.setAttribute('role', 'listbox');
    this.menu.setAttribute('aria-label', `${label} options`);
    this.options = labels.map((label, index) => {
      const option = document.createElement('button'); option.type = 'button';
      option.textContent = label; option.setAttribute('role', 'option');
      option.addEventListener('click', () => { this.close(true); onChange(index); });
      option.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); this.close(true); }
        const step = { ArrowDown: 1, ArrowUp: -1, Home: -index, End: this.labels.length - 1 - index }[event.key];
        if (step !== undefined) {
          event.preventDefault(); event.stopPropagation();
          this.options[(index + step + this.labels.length) % this.labels.length].focus();
        }
      });
      this.menu.append(option); return option;
    });
    this.button.addEventListener('click', () => this.isOpen ? this.close() : this.open());
    this.button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); event.stopPropagation(); this.open();
      }
    });
    root.append(this.button, this.menu);
    document.addEventListener('pointerdown', event => { if (!root.contains(event.target)) this.close(); });
    root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) this.close(); });
    this.close(); this.setValue(0);
  }
  open() { this.isOpen = true; this.menu.hidden = false; this.button.setAttribute('aria-expanded', 'true'); this.options[this.value].focus(); }
  close(focus = false) { this.isOpen = false; this.menu.hidden = true; this.button.setAttribute('aria-expanded', 'false'); if (focus) this.button.focus(); }
  setValue(value) {
    this.value = Math.max(0, Math.min(this.labels.length - 1, Math.round(value)));
    this.button.textContent = this.labels[this.value];
    this.button.setAttribute('aria-label', `${this.label}: ${this.labels[this.value]}`);
    this.options.forEach((option, index) => option.setAttribute('aria-selected', String(index === this.value)));
  }
}
