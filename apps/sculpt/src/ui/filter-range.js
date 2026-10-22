import { normalize, denormalize, formatValue, clamp } from "../model.js";

export function constrainCutoff(params, id, value) {
  return id === "cutoffLow"
    ? clamp(value, 20, params.cutoff)
    : clamp(value, params.cutoffLow ?? 20, 18000);
}
export class FilterRange {
  constructor({ onEdit, onCommit, onReset }) {
    this.onEdit = onEdit;
    this.onCommit = onCommit;
    this.onReset = onReset;
    this.element = document.createElement("div");
    this.element.className = "parameter-control filter-control";
    const row = document.createElement("div");
    row.className = "control-label";
    const label = document.createElement("span");
    label.className = "filter-label";
    label.textContent = "Filter band";
    this.output = document.createElement("output");
    this.output.setAttribute("aria-live", "off");
    row.append(label, this.output);
    this.track = document.createElement("div");
    this.track.className = "filter-range";
    this.track.setAttribute("role", "group");
    this.track.setAttribute("aria-label", "Filter frequency band");
    this.inputs = new Map();
    for (const [id, name] of [
      ["cutoffLow", "Low cutoff"],
      ["cutoff", "High cutoff"],
    ]) {
      const input = document.createElement("input");
      input.type = "range";
      input.min = 0;
      input.max = 1000;
      input.step = 1;
      input.id = `param-${id}`;
      input.setAttribute("aria-label", name);
      input.title = `${name}: drag to set the edge of the frequency band`;
      input.addEventListener("input", () =>
        this.edit(id, Number(input.value) / 1000),
      );
      input.addEventListener("change", () => this.commit());
      input.addEventListener("dblclick", (e) => {
        e.preventDefault();
        this.onReset(id);
      });
      this.inputs.set(id, input);
      this.track.append(input);
    }
    // One shared hit area chooses the closest handle; pointer capture also works
    // outside the narrow track, on touch, and when handles nearly overlap.
    this.track.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const n = this.position(e);
      const low = normalize("cutoffLow", this.params.cutoffLow),
        high = normalize("cutoff", this.params.cutoff);
      const dl = Math.abs(n - low),
        dh = Math.abs(n - high);
      this.drag =
        dl === dh
          ? n >= (low + high) / 2
            ? "cutoff"
            : "cutoffLow"
          : dl < dh
            ? "cutoffLow"
            : "cutoff";
      this.inputs.get(this.drag).focus();
      this.track.setPointerCapture(e.pointerId);
      this.edit(this.drag, n);
    });
    this.track.addEventListener("pointermove", (e) => {
      if (this.drag) this.edit(this.drag, this.position(e));
    });
    const end = () => {
      if (this.drag) {
        this.drag = null;
        this.commit();
      }
    };
    this.track.addEventListener("pointerup", end);
    this.track.addEventListener("pointercancel", end);
    const ends = document.createElement("div");
    ends.className = "range-ends";
    ends.innerHTML = "<span>20 Hz</span><span>18.0 kHz</span>";
    this.element.append(row, this.track, ends);
  }
  position(e) {
    const r = this.track.getBoundingClientRect();
    return clamp((e.clientX - r.left) / r.width);
  }
  edit(id, n) {
    this.onEdit(id, constrainCutoff(this.params, id, denormalize(id, n)));
    this.element.classList.add("active");
  }
  commit() {
    this.element.classList.remove("active");
    this.onCommit();
  }
  update(params) {
    this.params = params;
    const low = normalize("cutoffLow", params.cutoffLow),
      high = normalize("cutoff", params.cutoff);
    for (const [id, input] of this.inputs) {
      input.value = Math.round(normalize(id, params[id]) * 1000);
      input.setAttribute("aria-valuetext", formatValue(id, params[id]));
      input.setAttribute(
        id === "cutoffLow" ? "aria-valuemax" : "aria-valuemin",
        Math.round((id === "cutoffLow" ? high : low) * 1000),
      );
    }
    this.track.style.setProperty("--low", `${low * 100}%`);
    this.track.style.setProperty("--high", `${high * 100}%`);
    this.output.textContent = `${formatValue("cutoffLow", params.cutoffLow)} – ${formatValue("cutoff", params.cutoff)}`;
  }
}
