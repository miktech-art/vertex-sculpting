import {
  duration,
  envelopeAt,
  clamp,
  PARAM_BY_ID,
  formatValue,
} from "../model.js";

export const envelopeExtent = (p) => Math.max(1.2, duration(p) * 1.3);

// Editing one stage preserves the durations of all other stages.
export function editEnvelopeHandle(
  params,
  handle,
  seconds,
  level = params.sustain,
) {
  const limit = (id, value) =>
    clamp(value, PARAM_BY_ID[id].min, PARAM_BY_ID[id].max);
  if (handle === "attack") return { attack: limit("attack", seconds) };
  if (handle === "decay")
    return {
      decay: limit("decay", seconds - params.attack),
      sustain: clamp(level),
    };
  if (handle === "hold")
    return {
      hold: limit("hold", seconds - params.attack - params.decay),
      sustain: clamp(level),
    };
  if (handle === "release")
    return {
      release: limit(
        "release",
        seconds - params.attack - params.decay - params.hold,
      ),
    };
  return {};
}

const HANDLES = [
  ["attack", "A", "Attack"],
  ["decay", "D", "Decay and sustain"],
  ["hold", "S", "Hold and sustain"],
  ["release", "R", "Release"],
];

export class ContourView {
  constructor(
    canvas,
    { onEdit = () => {}, onCommit = () => {}, onScaleChange = () => {} } = {},
  ) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.onEdit = onEdit;
    this.onCommit = onCommit;
    this.onScaleChange = onScaleChange;
    this.handles = new Map();
    this.parent = canvas.parentElement;
    for (const [id, letter, label] of HANDLES) {
      const button = document.createElement("button");
      button.className = "envelope-handle";
      button.dataset.envelopeHandle = id;
      button.setAttribute("role", "slider");
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-valuemin", PARAM_BY_ID[id].min);
      button.setAttribute("aria-valuemax", PARAM_BY_ID[id].max);
      button.title =
        letter +
        ": " +
        label +
        ". Drag horizontally for time" +
        (id === "decay" || id === "hold"
          ? "; vertically for sustain level"
          : "") +
        ".";
      button.addEventListener("pointerdown", (event) => this.start(id, event));
      button.addEventListener("keydown", (event) => this.key(id, event));
      button.addEventListener("focus", () => {
        this.focused = id;
        this.draw();
      });
      button.addEventListener("blur", () => {
        this.focused = null;
        this.draw();
      });
      this.handles.set(id, button);
      this.parent.append(button);
    }
    canvas.addEventListener("pointerdown", (event) => {
      const rect = canvas.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top;
      const hit = this.points?.find(
        (point) => Math.hypot(point.x - x, point.y - y) < 16,
      );
      if (hit) this.start(hit.id, event);
    });
    this.parent.addEventListener("pointermove", (event) => this.move(event));
    this.parent.addEventListener("pointerup", () => this.end());
    this.parent.addEventListener("pointercancel", () => this.end());
    this.observer = new ResizeObserver(() => this.draw());
    this.observer.observe(canvas);
  }
  setParams(params) {
    this.params = params;
    this.draw();
  }
  start(id, event) {
    if (event.button !== 0 || !this.params) return;
    event.preventDefault();
    this.drag = {
      id,
      params: { ...this.params },
      extent: envelopeExtent(this.params),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    this.handles.get(id).focus({ preventScroll: true });
    this.draw();
  }
  move(event) {
    if (!this.drag) return;
    const rect = this.canvas.getBoundingClientRect(),
      x = event.clientX - rect.left,
      y = event.clientY - rect.top;
    const seconds =
      ((x - 10) / Math.max(1, rect.width - 20)) * this.drag.extent;
    const level = (rect.height - 12 - y) / Math.max(1, rect.height - 32);
    this.onEdit(
      editEnvelopeHandle(this.drag.params, this.drag.id, seconds, level),
    );
    this.draw();
  }
  end() {
    if (!this.drag) return;
    this.drag = null;
    this.onCommit();
    this.draw();
  }
  key(id, event) {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
        event.key,
      ) ||
      !this.params
    )
      return;
    event.preventDefault();
    const p = this.params,
      step = event.shiftKey ? 0.1 : 0.01;
    let seconds = {
        attack: p.attack,
        decay: p.attack + p.decay,
        hold: p.attack + p.decay + p.hold,
        release: duration(p),
      }[id],
      level = p.sustain;
    if (event.key === "ArrowLeft") seconds -= step;
    if (event.key === "ArrowRight") seconds += step;
    if (event.key === "ArrowUp") level += event.shiftKey ? 0.05 : 0.01;
    if (event.key === "ArrowDown") level -= event.shiftKey ? 0.05 : 0.01;
    this.onEdit(editEnvelopeHandle(p, id, seconds, level));
    this.onCommit();
    this.draw();
  }
  draw(progress = null) {
    const p = this.params;
    if (!p) return;
    const canvas = this.canvas,
      rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (
      canvas.width !== Math.round(rect.width * dpr) ||
      canvas.height !== Math.round(rect.height * dpr)
    ) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    const c = this.context,
      w = rect.width,
      h = rect.height,
      extent = this.drag?.extent ?? envelopeExtent(p),
      x = (t) => 10 + (t / extent) * (w - 20),
      y = (level) => h - 12 - level * (h - 32);
    this.onScaleChange(extent);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);
    c.strokeStyle = "#323532";
    c.lineWidth = 0.7;
    c.beginPath();
    c.moveTo(10, y(0));
    c.lineTo(w - 10, y(0));
    c.stroke();
    this.points = [
      { id: "attack", letter: "A", time: p.attack, level: 1 },
      { id: "decay", letter: "D", time: p.attack + p.decay, level: p.sustain },
      {
        id: "hold",
        letter: "S",
        time: p.attack + p.decay + p.hold,
        level: p.sustain,
      },
      { id: "release", letter: "R", time: duration(p), level: 0 },
    ].map((point) => ({ ...point, x: x(point.time), y: y(point.level) }));
    c.setLineDash([2, 5]);
    for (const point of this.points) {
      c.beginPath();
      c.moveTo(point.x, point.y);
      c.lineTo(point.x, y(0));
      c.stroke();
    }
    c.setLineDash([]);
    c.beginPath();
    c.moveTo(x(0), y(0));
    for (const point of this.points) c.lineTo(point.x, point.y);
    c.strokeStyle = "#dddeda";
    c.lineWidth = 1.1;
    c.stroke();
    const parent = this.parent.getBoundingClientRect();
    c.font = "11px SFMono-Regular,Consolas,monospace";
    c.textAlign = "center";
    for (const point of this.points) {
      const active = this.drag?.id === point.id || this.focused === point.id;
      c.beginPath();
      c.arc(point.x, point.y, active ? 4.5 : 3.5, 0, Math.PI * 2);
      c.fillStyle = active ? "#d9baa0" : "#ffffff";
      c.fill();
      c.fillStyle = active ? "#d9baa0" : "#989e96";
      c.fillText(point.letter, point.x, point.y - 10);
      const button = this.handles.get(point.id);
      button.style.left = rect.left - parent.left + point.x + "px";
      button.style.top = rect.top - parent.top + point.y + "px";
      button.setAttribute("aria-valuenow", p[point.id]);
      button.setAttribute(
        "aria-valuetext",
        formatValue(point.id, p[point.id]) +
          (point.id === "decay" || point.id === "hold"
            ? ", sustain " + Math.round(p.sustain * 100) + "%"
            : ""),
      );
    }
    if (progress !== null && progress >= 0 && progress <= 1) {
      const seconds = progress * duration(p),
        xx = x(seconds);
      c.strokeStyle = "#d9baa0";
      c.beginPath();
      c.moveTo(xx, 8);
      c.lineTo(xx, y(0));
      c.stroke();
      c.beginPath();
      c.arc(xx, y(envelopeAt(p, seconds)), 2.5, 0, Math.PI * 2);
      c.fillStyle = "#d9baa0";
      c.fill();
    }
  }
}
