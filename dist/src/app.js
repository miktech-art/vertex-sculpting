import { installLiveRange } from "./ui/live-range.js";
import { FilterRange, constrainCutoff } from "./ui/filter-range.js";
import {
  PARAMETERS,
  PRESETS,
  DEFAULT_ROUTES,
  makeDocument,
  validateDocument,
  normalize,
  denormalize,
  formatValue,
  duration,
  noteName,
} from "./model.js";
import { Store } from "./state.js";
import { NativeAudioEngine, encodeWav } from "./audio/engine.js";
import { SculptureRenderer } from "./visual/sculpture.js";
import { MappingEditor } from "./ui/mapping.js";
import { ContourView } from "./ui/contour.js";
import { HandController } from "./tracking/controller.js";

const $ = (selector) => document.querySelector(selector);
const store = new Store(),
  audio = new NativeAudioEngine(),
  renderer = new SculptureRenderer($("#sculpture")),
  miniRenderer = new SculptureRenderer($("#mini-sculpture")),
  contour = new ContourView($("#envelope-canvas"), {
    onEdit: (changes) =>
      store.edit((doc) => Object.assign(doc.params, changes), "parameter"),
    onCommit: () => {
      store.commit();
    },
    onScaleChange: (seconds) => {
      $("#timeline-end").textContent = `${seconds.toFixed(2)} s`;
    },
  });
const mapping = new MappingEditor(store);
let mode = "sculpt",
  group = "source",
  activeEvent = null,
  looping = false,
  loopTimer = null,
  compare = false,
  compareWasPlaying = false,
  playingPromise = false,
  playbackTicket = 0,
  toastTimer = null,
  frameTime = 0,
  hands = null,
  gestureVoice = null,
  gestureTicket = 0;
const inputs = new Map();
let filterRange = null;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 3600);
}
function makeControls() {
  const container = $("#parameter-controls");
  container.replaceChildren();
  inputs.clear();
  filterRange = null;
  for (const p of PARAMETERS.filter((p) => p.group === group)) {
    if (p.id === "cutoffLow") continue;
    if (p.id === "cutoff") {
      filterRange = new FilterRange({
        onEdit: (id, value) =>
          store.edit((doc) => {
            doc.params[id] = value;
          }, "parameter"),
        onCommit: () => store.commit(),
        onReset: (id) =>
          store.transaction((doc) => {
            doc.params[id] = constrainCutoff(
              doc.params,
              id,
              store.initial.params[id],
            );
          }, "parameter"),
      });
      filterRange.update(store.document.params);
      container.append(filterRange.element);
      continue;
    }
    const wrapper = document.createElement("div");
    wrapper.className = "parameter-control";
    const row = document.createElement("div");
    row.className = "control-label";
    const label = document.createElement("label");
    label.htmlFor = `param-${p.id}`;
    label.textContent = p.label;
    const output = document.createElement("output");
    output.htmlFor = `param-${p.id}`;
    const input = document.createElement("input");
    input.type = "range";
    input.id = `param-${p.id}`;
    input.min = 0;
    input.max = 1000;
    input.step = 1;
    installLiveRange(input);
    input.setAttribute("aria-label", p.label);
    input.title = p.description;
    const ends = document.createElement("div");
    ends.className = "range-ends";
    const low = document.createElement("span"),
      high = document.createElement("span");
    low.textContent = formatValue(p.id, p.min);
    high.textContent = formatValue(p.id, p.max);
    ends.append(low, high);
    row.append(label, output);
    wrapper.append(row, input, ends);
    container.append(wrapper);
    inputs.set(p.id, { input, output, wrapper });
    input.addEventListener("input", () => {
      const value = denormalize(p.id, Number(input.value) / 1000);
      store.edit((doc) => {
        doc.params[p.id] = value;
      }, "parameter");
      wrapper.classList.add("active");
      $("#parameter-note").textContent = p.description;
    });
    input.addEventListener("change", () => {
      store.commit();
      wrapper.classList.remove("active");
    });
    input.addEventListener("focus", () => {
      $("#parameter-note").textContent = p.description;
    });
    input.addEventListener("pointerenter", () => {
      $("#parameter-note").textContent = p.description;
    });
    input.addEventListener("dblclick", () => {
      store.transaction((doc) => {
        doc.params[p.id] = store.initial.params[p.id];
      }, "parameter");
    });
  }
}
function syncControls() {
  filterRange?.update(store.document.params);
  for (const [id, { input, output }] of inputs) {
    const value = store.document.params[id],
      n = normalize(id, value);
    input.value = n * 1000;
    input.style.setProperty("--fill", `${n * 100}%`);
    input.setAttribute("aria-valuetext", formatValue(id, value));
    output.textContent = formatValue(id, value);
  }
}
const thumbnailPaths = {
  saw: "M4 16 Q30 1 60 7 T116 16 M4 16 Q30 31 60 25 T116 16 M4 16 Q60 5 116 16 M4 16 Q60 27 116 16 M4 16H116",
};
function renderPresets() {
  const cards = $("#preset-cards");
  cards.replaceChildren();
  PRESETS.forEach((preset, i) => {
    const button = document.createElement("button");
    button.className = "preset-card";
    button.dataset.preset = preset.id;
    button.title = `Load ${preset.name}`;
    button.setAttribute("aria-label", `Load ${preset.name}`);
    button.innerHTML = `<svg viewBox="0 0 120 32" aria-hidden="true"><path d="${thumbnailPaths[preset.id]}"/></svg><span>${preset.name}</span>`;
    button.addEventListener("click", () => loadPreset(preset));
    cards.append(button);
  });
}
function loadPreset(preset) {
  stop();
  mapping.selected = null;
  store.load(makeDocument(preset));
  renderer.resetView();
  miniRenderer.resetView();
  toast(`${preset.name} loaded`);
}
function renderHeader() {
  const doc = store.document;
  $("#preset-title").firstChild.textContent = doc.name;
  const factory = PRESETS.find((p) => p.name === doc.name);
  $("#modified-indicator").hidden =
    JSON.stringify(doc.params) === JSON.stringify(store.initial.params) &&
    JSON.stringify(doc.routes) === JSON.stringify(store.initial.routes);
  for (const card of document.querySelectorAll(".preset-card")) {
    const active = card.dataset.preset === factory?.id;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", active);
  }
  renderReadouts(compare ? store.initial.params : doc.params);
  $("#route-count").textContent = doc.routes.length;
  $("#saved-count").textContent = store.saved.length;
  $("#undo-button").disabled = !store.undoStack.length;
  $("#redo-button").disabled = !store.redoStack.length;
}
function renderReadouts(p) {
  $("#note-label").textContent = noteName(p.pitch);
  $("#pitch-label").textContent = formatValue("pitch", p.pitch);
  const d = duration(p);
  $("#duration-label").textContent = `${d.toFixed(2)} s`;
}
function sync(doc, kind) {
  if (!compare) audio.update(doc.params);
  renderer.setSampleRate(audio.context?.sampleRate ?? 48000);
  miniRenderer.setSampleRate(audio.context?.sampleRate ?? 48000);
  renderer.setDocument(doc, kind === "load");
  miniRenderer.setDocument(doc, kind === "load");
  syncControls();
  renderHeader();
  contour.setParams(compare ? store.initial.params : doc.params);
  mapping.update();
  if (kind === "load" || kind === "routes") mapping.renderDetails();
  if (looping && activeEvent) scheduleNext();
}
store.subscribe(sync);
makeControls();
renderPresets();
sync(store.document, "load");

async function play() {
  if (playingPromise) return;
  hands?.disarm();
  playingPromise = true;
  const ticket = playbackTicket;
  try {
    if (!looping) audio.stop();
    const params = compare ? store.initial.params : store.document.params;
    const event = await audio.trigger(params);
    renderer.setSampleRate(audio.context.sampleRate);
    miniRenderer.setSampleRate(audio.context.sampleRate);
    if (document.hidden || ticket !== playbackTicket) {
      audio.disposeVoice(event);
      return;
    }
    activeEvent = event;
    renderer.trigger(event);
    miniRenderer.trigger(event);
    $("#audio-status").textContent = "AUDIO RUNNING";
    if (looping) scheduleNext();
  } catch (e) {
    toast(e.message || "Audio could not start. Try pressing Play again.");
    $("#audio-status").textContent = "AUDIO UNAVAILABLE";
  } finally {
    playingPromise = false;
  }
}
function scheduleNext() {
  clearTimeout(loopTimer);
  if (!looping || !activeEvent || activeEvent.held) return;
  const deadline = activeEvent.start + duration(activeEvent.params) + 0.18;
  loopTimer = setTimeout(
    () => play(),
    Math.max(30, (deadline - audio.now()) * 1000),
  );
}
function stop({ keepBinding = false } = {}) {
  gestureTicket++;
  gestureVoice = null;
  if (!keepBinding) hands?.disarm();
  playbackTicket++;
  clearTimeout(loopTimer);
  loopTimer = null;
  audio.stop();
  activeEvent = null;
  renderer.stop();
  miniRenderer.stop();
  setLoop(false);
  $("#audio-status").textContent = "READY";
}
function setLoop(value) {
  looping = value;
  $("#loop-button").classList.toggle("active", value);
  $("#loop-button").setAttribute("aria-pressed", value);
  if (!value) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }
}
$("#play-button").addEventListener("click", play);
$("#stop-button").addEventListener("click", stop);
$("#loop-button").addEventListener("click", () => {
  setLoop(!looping);
  if (looping) play();
});
$("#mute-button").addEventListener("click", () => {
  audio.setMuted(!audio.muted);
  $("#mute-button").setAttribute("aria-pressed", audio.muted);
  $("#mute-button").setAttribute(
    "aria-label",
    audio.muted ? "Unmute audio" : "Mute audio",
  );
});
document.querySelectorAll("[data-group]").forEach((button) =>
  button.addEventListener("click", () => {
    group = button.dataset.group;
    for (const b of document.querySelectorAll("[data-group]")) {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-selected", b === button);
    }
    makeControls();
    syncControls();
    $("#parameter-note").textContent = {
      source: "Parameters update the playing sound live.",
      contour: "Drag the ADSR handles to change the envelope.",
      space: "Delay and reverb settings.",
    }[group];
  }),
);
document.querySelectorAll("[data-mode]").forEach((button) =>
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    for (const b of document.querySelectorAll("[data-mode]")) {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", b === button);
    }
    $("#sculpt-workspace").hidden = mode !== "sculpt";
    $("#mapping-workspace").hidden = mode !== "mapping";
    $("#sound-inspector").hidden = mode !== "sculpt";
    $("#route-inspector").hidden = mode !== "mapping";
    if (mode === "mapping") {
      mapping.update();
      mapping.renderDetails();
      miniRenderer.resize();
    } else renderer.resize();
  }),
);
$("#fit-time").addEventListener("click", () => {
  renderer.fitTimeline();
  $("#view-label").textContent = "FRONT VIEW";
});
$("#front-view").addEventListener("click", () => {
  renderer.frontView();
  $("#view-label").textContent = "FRONT VIEW";
});
$("#reset-view").addEventListener("click", () => {
  renderer.resetView();
  $("#view-label").textContent = "FRONT VIEW";
});
$("#sculpture").addEventListener("pointermove", (e) => {
  if (e.buttons) $("#view-label").textContent = "PERSPECTIVE";
});
$("#sculpture").addEventListener("dblclick", () => {
  $("#view-label").textContent = "FRONT VIEW";
});
$("#undo-button").addEventListener("click", () => store.undo());
$("#redo-button").addEventListener("click", () => store.redo());
$("#reset-sound").addEventListener("click", () => {
  stop();
  store.transaction(() => {
    store.document = structuredClone(store.initial);
  }, "load");
  toast("Sound restored to its loaded state");
});
$("#reset-mappings").addEventListener("click", () => {
  mapping.selected = null;
  store.transaction((doc) => {
    doc.routes = structuredClone(DEFAULT_ROUTES);
  }, "routes");
  toast("Default connections restored");
});
function beginCompare() {
  if (compare) return;
  hands?.disarm();
  compareWasPlaying =
    !!activeEvent && audio.now() - activeEvent.start < activeEvent.total;
  compare = true;
  clearTimeout(loopTimer);
  playbackTicket++;
  audio.stop();
  renderer.stop();
  miniRenderer.stop();
  $("#compare-button").classList.add("comparing");
  $("#compare-button").textContent = "Original sound ↔";
  renderer.setCompare(store.initial);
  miniRenderer.setCompare(store.initial);
  renderReadouts(store.initial.params);
  contour.setParams(store.initial.params);
  play();
}
function endCompare() {
  if (!compare) return;
  compare = false;
  playbackTicket++;
  audio.stop();
  activeEvent = null;
  renderer.stop();
  miniRenderer.stop();
  $("#compare-button").classList.remove("comparing");
  $("#compare-button").textContent = "Hold to compare ↔";
  renderer.setCompare(null);
  miniRenderer.setCompare(null);
  renderReadouts(store.document.params);
  contour.setParams(store.document.params);
  if (looping || compareWasPlaying) play();
}
$("#compare-button").addEventListener("pointerdown", (e) => {
  e.currentTarget.setPointerCapture(e.pointerId);
  beginCompare();
});
$("#compare-button").addEventListener("pointerup", endCompare);
$("#compare-button").addEventListener("pointercancel", endCompare);
$("#compare-button").addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    beginCompare();
  }
});
$("#compare-button").addEventListener("keyup", endCompare);
$("#compare-button").addEventListener("blur", endCompare);

$("#help-button").addEventListener("click", () =>
  $("#help-dialog").showModal(),
);
document
  .querySelectorAll("[data-close-dialog]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      document.getElementById(button.dataset.closeDialog).close(),
    ),
  );
for (const dialog of document.querySelectorAll("dialog"))
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });
$("#save-button").addEventListener("click", () => {
  $("#save-name").value = store.document.name;
  $("#save-dialog").showModal();
  $("#save-name").select();
});
$("#save-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#save-name").value.trim();
  if (!name) return;
  store.save(name);
  $("#save-dialog").close();
  toast(`“${name}” saved in this browser`);
});
function renderLibrary() {
  const list = $("#library-list");
  list.replaceChildren();
  if (!store.saved.length) {
    const p = document.createElement("p");
    p.className = "library-empty";
    p.textContent = "No saved sounds. Use Save sound to add one.";
    list.append(p);
    return;
  }
  store.saved.forEach((doc, i) => {
    const row = document.createElement("div");
    row.className = "saved-row";
    const load = document.createElement("button");
    load.textContent = doc.name;
    const meta = document.createElement("small");
    meta.textContent = `${formatValue("pitch", doc.params.pitch)} · ${duration(doc.params).toFixed(2)} s · ${doc.routes.length} connections`;
    load.append(meta);
    load.addEventListener("click", () => {
      stop();
      store.load(doc);
      $("#library-dialog").close();
      toast(`${doc.name} loaded`);
    });
    const exportButton = document.createElement("button");
    exportButton.textContent = "JSON ↓";
    exportButton.setAttribute("aria-label", `Export ${doc.name}`);
    exportButton.addEventListener("click", () => downloadJSON(doc));
    row.append(load, exportButton);
    list.append(row);
  });
}
$("#library-button").addEventListener("click", () => {
  renderLibrary();
  $("#library-dialog").showModal();
});
function download(blob, name) {
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
const filename = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "sound";
function downloadJSON(doc = store.document) {
  download(
    new Blob([JSON.stringify(doc, null, 2)], { type: "application/json" }),
    `${filename(doc.name)}.soundform.json`,
  );
  toast("Sound and connections exported");
}
$("#export-button").addEventListener("click", () => downloadJSON());
$("#import-button").addEventListener("click", () => $("#import-file").click());
$("#import-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 500000)
      throw new Error("Preset files must be smaller than 500 KB.");
    const doc = validateDocument(JSON.parse(await file.text()));
    stop();
    store.load(doc);
    toast(`${doc.name} imported`);
  } catch (error) {
    toast(
      error instanceof SyntaxError
        ? "This file does not contain valid JSON."
        : error.message,
    );
  } finally {
    e.target.value = "";
  }
});
$("#wav-button").addEventListener("click", async () => {
  const button = $("#wav-button");
  button.disabled = true;
  button.textContent = "Rendering…";
  const doc = structuredClone(store.document);
  try {
    const buffer = await audio.render(doc.params);
    download(encodeWav(buffer), `${filename(doc.name)}.wav`);
    toast("Stereo WAV rendered with effects");
  } catch (e) {
    toast(`Could not render audio: ${e.message}`);
  } finally {
    button.disabled = false;
    button.textContent = "WAV ↓";
  }
});

document.addEventListener("keydown", (e) => {
  const editable = e.target.matches(
      "input,textarea,select,[contenteditable=true]",
    ),
    dialog = document.querySelector("dialog[open]");
  if (e.key === "Escape") {
    if (!dialog) {
      stop();
      mapping.cancel();
    }
    return;
  }
  if (dialog || editable) return;
  const mod = e.metaKey || e.ctrlKey;
  if (mod && e.key.toLowerCase() === "z") {
    e.preventDefault();
    e.shiftKey ? store.redo() : store.undo();
    return;
  }
  if (
    e.code === "Space" &&
    e.target.tagName !== "BUTTON" &&
    e.target.getAttribute("role") !== "button"
  ) {
    e.preventDefault();
    if (!e.repeat) play();
  }
  if (e.key.toLowerCase() === "l" && !mod) {
    e.preventDefault();
    setLoop(!looping);
    if (looping) play();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
});

async function startGestureNote() {
  stop({ keepBinding: true });
  const ticket = ++gestureTicket;
  try {
    const event = await audio.trigger(store.document.params, { held: true });
    renderer.setSampleRate(audio.context.sampleRate);
    miniRenderer.setSampleRate(audio.context.sampleRate);
    if (ticket !== gestureTicket || !hands.gate || document.hidden) {
      audio.disposeVoice(event);
      return;
    }
    gestureVoice = event;
    activeEvent = event;
    renderer.trigger(event);
    miniRenderer.trigger(event);
  } catch (error) {
    hands.disarm();
    toast(error.message || "Gesture audio could not start.");
  }
}
function releaseGestureNote() {
  gestureTicket++;
  if (gestureVoice) {
    audio.release(gestureVoice);
    gestureVoice = null;
  }
}
hands = new HandController({
  onEnable: () => audio.init(),
  getPitch: () => store.document.params.pitch,
  getRelease: () => store.document.params.release,
  onEditing: (active) => (active ? store.begin() : store.commit()),
  onRelease: (release) => {
    store.document.params.release = release;
    store.emit("gesture");
  },
  onGate: (active) => {
    if (active) startGestureNote();
    else releaseGestureNote();
  },
  onPitch: (pitch) => {
    store.document.params.pitch = pitch;
    store.emit("gesture");
  },
});

function animate(ms) {
  const now = audio.context ? audio.now() : ms / 1000;
  const playing =
    activeEvent &&
    now >= activeEvent.start &&
    now - activeEvent.start < activeEvent.total;
  renderer.draw(now);
  if (mode === "mapping") miniRenderer.draw(now);
  if (ms - frameTime > 30) {
    frameTime = ms;
    const elapsed = playing ? Math.max(0, now - activeEvent.start) : 0;
    $("#play-button").classList.toggle("playing", !!playing);
    $(".state-dot").classList.toggle("playing", !!playing);
    $("#stage-state").textContent = playing
      ? activeEvent.held
        ? "GESTURE"
        : "PLAYING"
      : compare
        ? "ORIGINAL FORM"
        : "PAUSED";
    if (playing) {
      const minutes = Math.floor(elapsed / 60)
          .toString()
          .padStart(2, "0"),
        seconds = (elapsed % 60).toFixed(2).padStart(5, "0");
      $("#transport-time").textContent = `${minutes}:${seconds}`;
      contour.draw(
        activeEvent.held
          ? (elapsed % duration(activeEvent.params)) /
              duration(activeEvent.params)
          : elapsed / activeEvent.duration,
      );
    } else {
      $("#transport-time").textContent = "00:00.00";
      contour.draw();
      if (!looping)
        $("#audio-status").textContent = audio.muted ? "AUDIO MUTED" : "READY";
    }
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
