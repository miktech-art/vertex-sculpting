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
    const audition = document.createElement("div");
    audition.className = "route-control";
    const auditionLabel = document.createElement("label");
    auditionLabel.htmlFor = "route-source-value";
    auditionLabel.textContent = `Source / ${source.label}`;
    const auditionOutput = document.createElement("output");
    auditionOutput.htmlFor = "route-source-value";
    const auditionValue = this.store.document.params[source.id];
    auditionOutput.textContent = formatValue(source.id, auditionValue);
    const auditionRow = document.createElement("div");
    auditionRow.className = "control-label";
    auditionRow.append(auditionLabel, auditionOutput);
    const auditionInput = document.createElement("input");
    auditionInput.type = "range";
    auditionInput.id = "route-source-value";
    auditionInput.min = 0;
    auditionInput.max = 1000;
    auditionInput.step = 1;
    auditionInput.value = normalize(source.id, auditionValue) * 1000;
    auditionInput.style.setProperty(
      "--fill",
      `${normalize(source.id, auditionValue) * 100}%`,
    );
    auditionInput.setAttribute(
      "aria-valuetext",
      formatValue(source.id, auditionValue),
    );
    auditionInput.addEventListener("input", () => {
      const value = denormalize(source.id, Number(auditionInput.value) / 1000);
      auditionOutput.textContent = formatValue(source.id, value);
      auditionInput.setAttribute(
        "aria-valuetext",
        formatValue(source.id, value),
      );
      auditionInput.style.setProperty(
        "--fill",
        `${Number(auditionInput.value) / 10}%`,
      );
      this.store.edit((doc) => {
        doc.params[source.id] = value;
      }, "parameter");
    });
    auditionInput.addEventListener("change", () => this.store.commit());
    audition.append(auditionRow, auditionInput);
    this.details.append(audition);
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
      const wrapper = document.createElement("div");
      wrapper.className = "route-control";
      const row = document.createElement("div");
      row.className = "control-label";
      const label = document.createElement("label");
      label.htmlFor = `route-${spec.key}`;
      label.textContent = spec.label;
      const output = document.createElement("output");
      output.htmlFor = `route-${spec.key}`;
      output.textContent = spec.format(route[spec.key]);
      const input = document.createElement("input");
      input.type = "range";
      input.id = `route-${spec.key}`;
      input.min = spec.min;
      input.max = spec.max;
      input.step = spec.step;
      input.value = route[spec.key];
      input.style.setProperty(
        "--fill",
        `${((route[spec.key] - spec.min) / (spec.max - spec.min)) * 100}%`,
      );
      row.append(label, output);
      wrapper.append(row, input);
      this.details.append(wrapper);
      input.addEventListener("input", () => {
        const value = Number(input.value);
        output.textContent = spec.format(value);
        input.style.setProperty(
          "--fill",
          `${((value - spec.min) / (spec.max - spec.min)) * 100}%`,
        );
        this.store.edit((doc) => {
          const r = doc.routes.find((r) => r.id === this.selected);
          if (r) r[spec.key] = value;
        }, "route-adjust");
      });
      input.addEventListener("change", () => this.store.commit());
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
