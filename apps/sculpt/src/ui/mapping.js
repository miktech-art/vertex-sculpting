import { Knob } from './knob.js';
import { constrainCutoff } from './filter-range.js';
import { createVisualExample } from "./visual-examples.js";
import {
  PARAMETERS,
  TARGETS,
  formatValue,
  normalize,
  denormalize,
} from "../model.js";

const NS = "http://www.w3.org/2000/svg";
export class MappingEditor {
  constructor(store, { onChange = () => {} } = {}) {
    this.store = store;
    this.onChange = onChange;
    this.selected = null;
    this.pending = null;
    this.dragging = false;
    this.board = document.querySelector("#mapping-board");
    this.svg = document.querySelector("#mapping-wires");
    this.sources = document.querySelector("#sound-nodes");
    this.targets = document.querySelector("#visual-nodes");
    this.details = document.querySelector("#connection-details");
    let lastGroup = "";
    for (const p of PARAMETERS) {
      const button = document.createElement("button");
      button.className = `node${lastGroup !== p.group ? " node-group-start" : ""}`;
      lastGroup = p.group;
      button.dataset.source = p.id;
      button.title = p.description;
      button.setAttribute(
        "aria-label",
        `${p.label}: connect to a visual property`,
      );
      const label = document.createElement("span");
      label.textContent = p.label;
      const dot = document.createElement("span");
      dot.className = "node-dot";
      button.append(label, dot);
      this.sources.append(button);
      button.addEventListener("pointerdown", (e) => this.startDrag(e, p.id));
      button.addEventListener("click", () => {
        this.pending = p.id;
        this.draw();
      });
    }
    for (const t of TARGETS) {
      const button = document.createElement("button");
      button.className = "node";
      button.dataset.target = t.id;
      button.title = t.description;
      button.setAttribute("aria-label", `${t.label}: visual`);
      const label = document.createElement("span");
      label.textContent = t.label;
      const dot = document.createElement("span");
      dot.className = "node-dot";
      label.className = "target-label";
      button.append(label, dot, createVisualExample(t));
      this.targets.append(button);
      button.addEventListener("click", () => {
        if (this.pending) this.connect(this.pending, t.id);
      });
    }
    document.addEventListener("pointermove", (e) => this.moveDrag(e));
    document.addEventListener("pointerup", (e) => this.endDrag(e));
    document.addEventListener("pointercancel", () => this.cancel());
    this.resizeObserver = new ResizeObserver(() => this.draw());
    this.resizeObserver.observe(this.board);
    this.renderDetails();
  }
  startDrag(event, source) {
    if (event.button !== 0) return;
    this.dragStart = { x: event.clientX, y: event.clientY, source };
    this.pending = source;
  }
  moveDrag(event) {
    if (!this.dragStart) return;
    if (
      Math.hypot(
        event.clientX - this.dragStart.x,
        event.clientY - this.dragStart.y,
      ) > 4
    )
      this.dragging = true;
    if (this.dragging) {
      const r = this.board.getBoundingClientRect();
      this.pointer = { x: event.clientX - r.left, y: event.clientY - r.top };
      this.draw();
    }
  }
  endDrag(event) {
    if (!this.dragStart) return;
    const wasDragging = this.dragging,
      source = this.dragStart.source;
    this.dragStart = null;
    this.dragging = false;
    this.pointer = null;
    if (wasDragging) {
      const node = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-target]");
      if (node) {
        event.preventDefault();
        this.connect(source, node.dataset.target);
      } else this.draw();
    }
  }
  cancel() {
    this.pending = null;
    this.dragStart = null;
    this.dragging = false;
    this.pointer = null;
    this.draw();
  }
  connect(source, target) {
    const existing = this.store.document.routes.find(
      (r) => r.source === source && r.target === target,
    );
    if (existing) {
      this.selected = existing.id;
    } else {
      const route = {
        id: crypto.randomUUID(),
        source,
        target,
        amount: 1,
        invert: false,
        curve: 1,
        smoothing: 0.08,
      };
      this.store.transaction((doc) => doc.routes.push(route), "routes");
      this.selected = route.id;
    }
    this.pending = null;
    this.renderDetails();
    this.draw();
    this.onChange();
  }
  point(element, side) {
    const r = element.getBoundingClientRect(),
      b = this.board.getBoundingClientRect();
    return {
      x: side === "source" ? r.right - b.left - 12 : r.left - b.left + 12,
      y: r.top - b.top + r.height / 2,
    };
  }
  path(a, b) {
    const d = Math.max(35, (b.x - a.x) * 0.47);
    return `M${a.x},${a.y} C${a.x + d},${a.y} ${b.x - d},${b.y} ${b.x},${b.y}`;
  }
  update() {
    if (this.sourceKnob) this.sourceKnob.setValue(this.store.document.params[this.sourceKnobId]);
    if (
      this.selected &&
      !this.store.document.routes.some((r) => r.id === this.selected)
    )
      this.selected = null;
    this.draw();
  }
  draw() {
    if (!this.board.getBoundingClientRect().width) return;
    this.svg.replaceChildren();
    const doc = this.store.document;
    for (const button of this.sources.children) {
      button.classList.toggle(
        "connected",
        doc.routes.some((r) => r.source === button.dataset.source),
      );
      button.classList.toggle(
        "selected",
        button.dataset.source === this.pending ||
          doc.routes.some(
            (r) => r.id === this.selected && r.source === button.dataset.source,
          ),
      );
    }
    for (const button of this.targets.children) {
      button.classList.toggle(
        "connected",
        doc.routes.some((r) => r.target === button.dataset.target),
      );
      button.classList.toggle(
        "selected",
        doc.routes.some(
          (r) => r.id === this.selected && r.target === button.dataset.target,
        ),
      );
    }
    for (const r of [...doc.routes].sort(
      (a, b) => (a.id === this.selected) - (b.id === this.selected),
    )) {
      const source = this.sources.querySelector(`[data-source="${r.source}"]`),
        target = this.targets.querySelector(`[data-target="${r.target}"]`);
      if (!source || !target) continue;
      const d = this.path(
          this.point(source, "source"),
          this.point(target, "target"),
        ),
        line = document.createElementNS(NS, "path"),
        hit = document.createElementNS(NS, "path");
      line.setAttribute("d", d);
      line.setAttribute(
        "class",
        `route-line${this.selected === r.id ? " active" : this.selected ? " dimmed" : ""}`,
      );
      hit.setAttribute("d", d);
      hit.setAttribute("class", "route-hit");
      hit.dataset.route = r.id;
      hit.setAttribute("tabindex", "0");
      hit.setAttribute("role", "button");
      hit.setAttribute(
        "aria-label",
        `Edit ${PARAMETERS.find((p) => p.id === r.source).label} to ${TARGETS.find((t) => t.id === r.target).label}`,
      );
      const select = () => {
        this.selected = r.id;
        this.pending = null;
        this.renderDetails();
        this.draw();
      };
      hit.addEventListener("click", select);
      hit.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select();
        }
      });
      this.svg.append(line, hit);
    }
    if (this.pending && this.pointer) {
      const source = this.sources.querySelector(
        `[data-source="${this.pending}"]`,
      );
      const line = document.createElementNS(NS, "path");
      line.setAttribute(
        "d",
        this.path(this.point(source, "source"), this.pointer),
      );
      line.setAttribute("class", "route-line draft");
      this.svg.append(line);
    }
  }
  renderDetails() {
    this.sourceKnob = null;
    this.details.replaceChildren();
    const route = this.store.document.routes.find(
      (r) => r.id === this.selected,
    );
    if (!route) {
      this.details.innerHTML =
        '<div class="empty-connection"><h2 class="connection-title">Connection settings</h2></div>';
      return;
    }
    const source = PARAMETERS.find((p) => p.id === route.source),
      target = TARGETS.find((t) => t.id === route.target);
    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = "SELECTED CONNECTION";
    const title = document.createElement("h2");
    title.className = "connection-title";
    title.append(
      document.createTextNode(source.label),
      Object.assign(document.createElement("span"), { textContent: "→" }),
      document.createElement("br"),
      document.createTextNode(target.label),
    );
    const description = document.createElement("p");
    description.className = "connection-description";
    description.textContent = target.description;
    this.details.append(eyebrow, title, description);
    this.sourceKnobId = source.id;
    this.sourceKnob = new Knob({
      id: "route-source-value", label: `Source / ${source.label}`, min: source.min, max: source.max,
      value: this.store.document.params[source.id], unit: source.unit,
      format: value => formatValue(source.id, value), normalize: value => normalize(source.id, value),
      denormalize: n => denormalize(source.id, n), reset: () => this.store.initial.params[source.id],
      constrain: value => {
        value = Math.max(source.min, Math.min(source.max, value));
        if (source.id === "waveTable") return Math.round(value);
        return ["cutoff", "cutoffLow"].includes(source.id) ? constrainCutoff(this.store.document.params, source.id, value) : value;
      },
      onInput: value => this.store.edit(doc => { doc.params[source.id] = value; }, "parameter"),
      onCommit: () => this.store.commit(),
    });
    this.details.append(this.sourceKnob.element);
    for (const spec of [
      {
        key: "amount",
        label: "Strength",
        min: -2,
        max: 2,
        step: 0.01,
        format: (v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}`,
      },
      {
        key: "curve",
        label: "Response curve",
        min: 0.2,
        max: 4,
        step: 0.01,
        format: (v) => `${v.toFixed(2)}×`,
      },
      {
        key: "smoothing",
        label: "Smoothing",
        min: 0,
        max: 2,
        step: 0.01,
        format: (v) => `${Math.round(v * 1000)} ms`,
      },
    ]) {
      const knob = new Knob({ id: `route-${spec.key}`, label: spec.label, min: spec.min, max: spec.max,
        value: route[spec.key], format: spec.format, unit: spec.key === "smoothing" ? "s" : "",
        reset: () => ({ amount: 1, curve: 1, smoothing: 0.08 })[spec.key],
        onInput: value => this.store.edit(doc => {
          const current = doc.routes.find(r => r.id === this.selected); if (current) current[spec.key] = value;
        }, "route-adjust"), onCommit: () => this.store.commit(),
      });
      this.details.append(knob.element);
    }
    const invert = document.createElement("div");
    invert.className = "route-invert";
    const label = document.createElement("span");
    label.textContent = "Invert input";
    const toggle = document.createElement("button");
    toggle.className = "switch";
    toggle.setAttribute("aria-label", "Invert input");
    toggle.setAttribute("aria-pressed", route.invert);
    toggle.addEventListener("click", () => {
      this.store.transaction((doc) => {
        const r = doc.routes.find((r) => r.id === this.selected);
        r.invert = !r.invert;
      }, "route-adjust");
      toggle.setAttribute(
        "aria-pressed",
        this.store.document.routes.find((r) => r.id === this.selected).invert,
      );
    });
    invert.append(label, toggle);
    this.details.append(invert);
    const remove = document.createElement("button");
    remove.className = "remove-route";
    remove.textContent = "Disconnect this relationship ×";
    remove.addEventListener("click", () => {
      this.store.transaction((doc) => {
        doc.routes = doc.routes.filter((r) => r.id !== this.selected);
      }, "routes");
      this.selected = null;
      this.renderDetails();
      this.draw();
    });
    this.details.append(remove);
  }
}
