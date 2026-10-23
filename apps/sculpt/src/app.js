import {instanceRow} from "./ui/instance-selector.js";
import {routeSelect} from "./ui/route-select.js";
import {LfoPanel} from "./ui/lfo.js";
import {getLfos,egTargetLimit,egDestinations,envelopeInstances,availableDestinations,removeEnvelope,removeLfo,selectionAfterRemoval} from "./lfo.js";
import { soundPreview } from "./ui/sound-preview.js";
import { installHoldLoopShortcut } from "./ui/hold-loop.js";
import { Knob } from "./ui/knob.js";
import { WavetableView } from "./ui/wavetable.js";
import { TableSelect } from "./ui/table-select.js";
import { constrainCutoff } from "./ui/filter-range.js";
import {
  BASE,
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

let selectedEnvelope = 0;
const envelopeKnobs = new Map();
const $ = (selector) => document.querySelector(selector);
const store = new Store(),
  audio = new NativeAudioEngine(),
  renderer = new SculptureRenderer($("#sculpture")),
  miniRenderer = new SculptureRenderer($("#mini-sculpture")),
  contour = new ContourView($("#envelope-canvas"), {
    onEdit: (changes) => editSelectedEnvelope(changes),
    onCommit: () => {
      store.commit();
    },
    onScaleChange: (seconds) => {
      $("#timeline-end").textContent = `${seconds.toFixed(2)} s`;
    },
  });
const lfoPanel=new LfoPanel({
  onEdit:(index,changes)=>store.edit(doc=>{
    doc.params.lfos=structuredClone(getLfos(doc.params));Object.assign(doc.params.lfos[index],changes);
  },'lfo-parameter'),
  onAdd:lfo=>{store.edit(doc=>{doc.params.lfos=[...structuredClone(getLfos(doc.params)),lfo];},'lfos');store.commit();},
  onRemove:index=>{store.edit(doc=>removeLfo(doc.params,index),'lfos');store.commit();},
  onCommit:()=>store.commit(),
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
  frameTime = 0;
const inputs = new Map();
const wavetable = new WavetableView($("#wavetable-canvas"), value => {
  store.edit(doc => { doc.params.wavePosition = value; }, "parameter");
}, () => store.commit());
const tableSelect = new TableSelect($("#wavetable-select"), value => {
  store.transaction(doc => { doc.params.waveTable = value; }, "parameter");
});
const positionKnob = parameterKnob(PARAMETERS.find(p => p.id === "wavePosition"));
$("#wavetable-position").append(positionKnob.element);
function toast(message, action) {
  $("#toast").textContent = message;
  if (action) {
    const button = document.createElement("button");
    button.textContent = "Undo";
    button.className = "toast-undo";
    button.addEventListener("click", action, { once: true });
    $("#toast").append(button);
  }
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), action ? 9000 : 3600);
}
const envelopeStages=['attack','decay','sustain','hold','release'];
function selectedParams(params=store.document.params){
  return selectedEnvelope>0?{...params,...params.envelopes?.[selectedEnvelope-1],envelopeEnabled:params.envelopes?.[selectedEnvelope-1]?.enabled!==false}:params;
}
function editSelectedEnvelope(changes){
  store.edit(doc=>{
    if(selectedEnvelope>0&&doc.params.envelopes?.[selectedEnvelope-1])Object.assign(doc.params.envelopes[selectedEnvelope-1],changes);
    else {const {target,amount,enabled,...stages}=changes;Object.assign(doc.params,stages);if(enabled!==undefined)doc.params.envelopeEnabled=enabled;if(target!==undefined)doc.params.envelopeTarget=target;if(amount!==undefined)doc.params.envelopeAmount=amount;}
  },Object.hasOwn(changes,'enabled')?'envelopes':'parameter');
}
function renderEnvelopeSelectors(){
  const params=store.document.params,envs=params.envelopes||[];
  if(selectedEnvelope>envs.length)selectedEnvelope=0;
  const instances=envelopeInstances(params),destinations=egDestinations(params),free=availableDestinations(destinations,instances,-1).filter(([target])=>target!=='none');
  const container=$('#envelope-selectors');container.replaceChildren();
  for(let i=0;i<=envs.length;i++){
    const b=document.createElement('button');b.className='envelope-selector';
    b.classList.toggle('enabled',instances[i].enabled!==false);b.classList.toggle('selected',i===selectedEnvelope);b.setAttribute('aria-pressed',i===selectedEnvelope);
    b.setAttribute('aria-label',i===0?'Envelope 1':`Envelope ${i+1}`);
    b.title=i===0?`Envelope 1: ${params.envelopeTarget||'amplitude'}`:`Envelope ${i+1}: ${envs[i-1].target}`;
    b.addEventListener('click',()=>{selectedEnvelope=i;renderEnvelopeSelectors();syncControls();renderReadouts(store.document.params);contour.setParams(selectedParams());});
    container.append(instanceRow(b,`Delete EG ${i+1}`,envs.length?()=>{
      selectedEnvelope=selectionAfterRemoval(selectedEnvelope,i,envs.length+1);
      store.edit(doc=>removeEnvelope(doc.params,i),'envelopes');store.commit();
    }:null));
  }
  const add=document.createElement('button');add.className='envelope-add';add.textContent='+';add.title='Add envelope';add.setAttribute('aria-label','Add envelope');add.disabled=envs.length>=8||!free.length;
  add.addEventListener('click',()=>{
    const target=free[0]?.[0];if(!target)return;
    selectedEnvelope=envs.length+1;
    store.edit(doc=>{doc.params.envelopes=[...(doc.params.envelopes||[]),{target,amount:target.startsWith('lfoRate:')?2:target.startsWith('lfoDepth:')?.25:({amplitude:1,pitch:12,wavePosition:.5,cutoff:2}[target]??0),attack:.01,decay:.2,sustain:0,hold:.3,release:.15}];},'envelopes');
    store.commit();
  });container.append(add);
  const route=$('#envelope-routing');route.replaceChildren();
  const depthSlot=$('#envelope-depth-slot');depthSlot.replaceChildren();
  const env=envs[selectedEnvelope-1]||{target:params.envelopeTarget||'amplitude',amount:params.envelopeAmount??0};
  const power=$('#envelope-power'),enabled=instances[selectedEnvelope].enabled!==false;
  power.setAttribute('aria-label',`Turn ${enabled?'off':'on'} EG ${selectedEnvelope+1}`);power.setAttribute('aria-pressed',enabled);
  power.onclick=()=>{editSelectedEnvelope({enabled:!enabled});store.commit();};
  routeSelect(route,{label:'Envelope destination',options:availableDestinations(destinations,instances,selectedEnvelope),value:env.target,onChange:target=>{
    editSelectedEnvelope({target,amount:target.startsWith('lfoRate:')?2:target.startsWith('lfoDepth:')?.25:({amplitude:1,pitch:12,wavePosition:.5,cutoff:2,none:0}[target]??0)});store.commit();renderEnvelopeSelectors();
  }});
  const limit=egTargetLimit(env.target);
  const depth=new Knob({id:'envelope-depth',label:'Depth',min:-limit,max:limit,value:env.amount,
    format:v=>env.target==='amplitude'&&!selectedEnvelope?'—':(env.target==='amplitude'||env.target==='wavePosition'||env.target.startsWith('lfoDepth:'))?`${(v*100).toFixed(0)}%`:`${v.toFixed(1)} ${env.target==='pitch'?'st':'oct'}`,
    onInput:value=>editSelectedEnvelope({amount:value}),onCommit:()=>store.commit()});
  if(!selectedEnvelope&&env.target==='amplitude'){depth.element.classList.add('inactive-depth');depth.editor.disabled=true;depth.dial.setAttribute('aria-disabled','true');depth.dial.tabIndex=-1;}
  depthSlot.append(depth.element);
}
function makeEnvelopeControls(){
  for(const p of PARAMETERS.filter(p=>p.group==='contour')){
    const knob=parameterKnob(p);$('#adsr-controls').append(knob.element);envelopeKnobs.set(p.id,knob);
  }
  const slot=document.createElement('div');slot.id='envelope-depth-slot';$('#adsr-controls').append(slot);
}
function updateDirtyCards(){
  for(const card of document.querySelectorAll('[data-sound-key]')){
    const key=card.dataset.soundKey,draft=key===store.activeSoundKey?{document:store.document,initial:store.initial}:store.drafts.get(key);
    const dirty=!!draft&&(JSON.stringify(draft.document.params)!==JSON.stringify(draft.initial.params)||JSON.stringify(draft.document.routes)!==JSON.stringify(draft.initial.routes));
    card.classList.toggle('unsaved',dirty);
  }
}
function parameterKnob(p) {
  return new Knob({ id: `param-${p.id}`, label: p.label, min: p.min, max: p.max,
    unit: p.unit, value: selectedParams()[p.id], format: value => formatValue(p.id, value),
    normalize: value => normalize(p.id, value), denormalize: n => denormalize(p.id, n),
    constrain: value => {
      value = Math.max(p.min, Math.min(p.max, value));
      return ["cutoff", "cutoffLow"].includes(p.id) ? constrainCutoff(store.document.params, p.id, value) : value;
    },
    reset: () => selectedParams(store.initial.params)[p.id],
    onInput: value => { p.group==='contour'&&envelopeStages.includes(p.id)?editSelectedEnvelope({[p.id]:value}):store.edit(doc => { doc.params[p.id] = value; }, 'parameter'); $("#parameter-note").textContent = p.description; },
    onCommit: () => store.commit(),
  });
}
function makeControls() {
  const container = $("#parameter-controls"); container.replaceChildren(); inputs.clear();
  for (const p of PARAMETERS.filter(p => p.group === group)) {
    const knob = parameterKnob(p); container.append(knob.element); inputs.set(p.id, knob);
  }
}
function syncControls() {
  for (const [id, knob] of inputs) knob.setValue(store.document.params[id]);
  for(const [id,knob] of envelopeKnobs)knob.setValue(selectedParams()[id]);
  positionKnob.setValue(store.document.params.wavePosition);
  tableSelect.setValue(store.document.params.waveTable);
  wavetable.update(store.document.params);
}
function renderPresets() {
  const cards = $("#preset-cards");
  cards.replaceChildren();
  PRESETS.forEach((preset, i) => {
    const button = document.createElement("button");
    button.className = "preset-card";
    button.dataset.preset = preset.id;
    button.dataset.soundKey=`factory:${preset.id}`;
    button.title = `Load ${preset.name}`;
    button.setAttribute("aria-label", `Load ${preset.name}`);
    const name=document.createElement('span');name.textContent=preset.name;
    button.append(soundPreview(makeDocument(preset)),name);
    button.addEventListener("click", () => switchSound(() => loadPreset(preset)));
    cards.append(button);
  });
}
function loadPreset(preset) {
  stop();
  mapping.selected = null;
  store.load(makeDocument(preset), null, `factory:${preset.id}`);
  toast(`${preset.name} loaded`);
}
function renderHeader() {
  const doc = store.document;
  $("#preset-title").firstChild.textContent = doc.name;
  $("#modified-indicator").hidden =
    JSON.stringify(doc.params) === JSON.stringify(store.initial.params) &&
    JSON.stringify(doc.routes) === JSON.stringify(store.initial.routes);
  for (const card of document.querySelectorAll(".preset-card")) {
    const active = store.activeSoundKey === `factory:${card.dataset.preset}`;
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
  const d = duration(selectedParams(p));
  $("#duration-label").textContent = `${d.toFixed(2)} s`;
}
function sync(doc, kind) {
  if (!compare) audio.update(doc.params);
  renderer.setSampleRate(audio.context?.sampleRate ?? 48000);
  miniRenderer.setSampleRate(audio.context?.sampleRate ?? 48000);
  renderer.setDocument(doc, kind === "load");
  miniRenderer.setDocument(doc, kind === "load");
  if(["load","envelopes","lfos","undo","redo"].includes(kind))renderEnvelopeSelectors();
  lfoPanel.setParams(compare?store.initial.params:doc.params);
  syncControls();
  renderHeader();
  if (["save", "load", "library"].includes(kind)) renderSavedCards();
  if (kind === "library" && $("#library-dialog").open) renderLibrary();
  contour.setParams(selectedParams(compare ? store.initial.params : doc.params));
  updateDirtyCards();
  mapping.update();
  if (kind === "load" || kind === "routes") mapping.renderDetails();
  if (looping && activeEvent) scheduleNext();
}
store.subscribe(sync);
makeControls();
makeEnvelopeControls();
renderEnvelopeSelectors();
renderPresets();
sync(store.document, "load");

async function play() {
  if (playingPromise) return;
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
function stop() {
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
function showWorkspace(nextMode) {
  mode = nextMode;
  for (const button of document.querySelectorAll("[data-mode]")) {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active);
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
}
function workspaceFromHash() {
  showWorkspace(location.hash === "#connections" ? "mapping" : "sculpt");
}
document.querySelectorAll("[data-mode]").forEach((button) =>
  button.addEventListener("click", () => {
    showWorkspace(button.dataset.mode);
    history.replaceState(null, "", mode === "mapping" ? "#connections" : "#sculpt");
  }),
);
window.addEventListener("hashchange", workspaceFromHash);
workspaceFromHash();
// Keep pending edits when leaving or reloading the page.
window.addEventListener("pagehide", () => {
  stop();
  store.persist();
});
$("#reset-view").addEventListener("click", () => renderer.resetView());
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
  contour.setParams(selectedParams(store.initial.params));
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
  contour.setParams(selectedParams());
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
function switchSound(action) {
  if (!store.persist()) { toast("Could not keep your edits in this browser. Export JSON before switching."); return; }
  action();
  if (!store.persist()) toast("Could not keep this workspace in browser storage. Export JSON to keep your work.");
}
function openSaveDialog() {
  stop();
  $("#save-name").setCustomValidity("");
  $("#save-name").value = store.document.name;
  $("#save-copy-option").hidden = !store.activeSavedId;
  $("#save-copy").checked = false;
  $("#save-error").hidden = true;
  $("#save-dialog").showModal();
  $("#save-name").select();
}
$("#save-button").addEventListener("click", () => {
  if(!store.activeSavedId){openSaveDialog();return;}
  try {store.save(store.document.name);toast('Saved');}
  catch(error){toast(error.message);}
});
$("#new-sound-button").addEventListener("click", () => switchSound(() => {
  stop();
  mapping.selected = null;
  store.load(makeDocument({ name: "Untitled", params: BASE }), null, "new");
  toast("New sound workspace — edits are remembered automatically");
}));
$("#save-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#save-name").value.trim();
  if (!name) {
    $("#save-name").setCustomValidity("Enter a sound name.");
    $("#save-name").reportValidity();
    return;
  }
  try {
    store.save(name, { asNew: $("#save-copy").checked });
  } catch (error) {
    $("#save-error").textContent = error.message;
    $("#save-error").hidden = false;
    return;
  }
  $("#save-dialog").close();
  toast(`“${name}” saved in this browser`);
});
$("#save-name").addEventListener("input", () => $("#save-name").setCustomValidity(""));
function loadSavedSound(doc) {
  switchSound(() => {
    stop();
    mapping.selected = null;
    store.load(doc, doc.libraryId);
    toast(`${doc.name} loaded`);
  });
}
function renderSavedCards() {
  const cards = $("#saved-cards");
  cards.replaceChildren();
  for (const doc of store.saved) {
    const button = document.createElement("button");
    button.className = "preset-card saved-card";
    button.dataset.soundKey=`saved:${doc.libraryId}`;
    button.classList.toggle("active", store.activeSavedId === doc.libraryId);
    button.setAttribute("aria-pressed", store.activeSavedId === doc.libraryId);
    button.setAttribute("aria-label", `Load ${doc.name}`);
    button.title = `Load ${doc.name}`;
    const name = document.createElement("span");
    name.textContent = doc.name;
    button.append(soundPreview(doc), name);
    button.addEventListener("click", () => loadSavedSound(doc));
    const item = document.createElement("div");
    item.className = "saved-card-item";
    const manage = document.createElement("button");
    manage.className = "sound-menu-button";
    manage.textContent = "⋯";
    manage.title = `Rename or delete ${doc.name}`;
    manage.setAttribute("aria-label", `Manage ${doc.name}`);
    manage.setAttribute("aria-haspopup", "dialog");
    manage.addEventListener("click", () => openSoundOptions(doc.libraryId));
    item.append(button, manage);
    cards.append(item);
  }
}
let managedSoundId = null;
function openSoundOptions(id) {
  const doc = store.saved.find((item) => item.libraryId === id);
  if (!doc) return;
  stop();
  managedSoundId = id;
  $("#sound-options-name").value = doc.name;
  $("#sound-options-name").setCustomValidity("");
  $("#sound-options-error").hidden = true;
  $("#sound-options-dialog").showModal();
  $("#sound-options-name").select();
}
$("#sound-options-name").addEventListener("input", () => $("#sound-options-name").setCustomValidity(""));
$("#sound-options-form").addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    store.renameSaved(managedSoundId, $("#sound-options-name").value);
    $("#sound-options-dialog").close();
    toast("Sound renamed");
  } catch (error) {
    $("#sound-options-error").textContent = error.message;
    $("#sound-options-error").hidden = false;
  }
});
function restoreSound(id) {
  try {
    const doc = store.restoreSaved(id);
    toast(`“${doc.name}” restored`);
  } catch (error) { toast(error.message); }
}
function deleteSound(id) {
  try {
    const doc = store.deleteSaved(id);
    toast(`“${doc.name}” moved to Recently deleted`, () => restoreSound(id));
    return true;
  } catch (error) { toast(error.message); return false; }
}
$("#delete-sound-button").addEventListener("click", () => {
  if (deleteSound(managedSoundId)) $("#sound-options-dialog").close();
});
function renderLibrary() {
  const list = $("#library-list");
  list.replaceChildren();
  if (!store.saved.length) {
    const p = document.createElement("p");
    p.className = "library-empty";
    p.textContent = "No saved sounds. Use Save sound to add one.";
    list.append(p);
  }
  store.saved.forEach((doc) => {
    const row = document.createElement("div");
    row.className = "saved-row";
    const load = document.createElement("button");
    load.textContent = doc.name;
    const meta = document.createElement("small");
    meta.textContent = `${formatValue("pitch", doc.params.pitch)} · ${duration(doc.params).toFixed(2)} s · ${doc.routes.length} connections`;
    load.append(meta);
    load.addEventListener("click", () => {
      $("#library-dialog").close();
      loadSavedSound(doc);
    });
    const exportButton = document.createElement("button");
    exportButton.textContent = "JSON ↓";
    exportButton.setAttribute("aria-label", `Export ${doc.name}`);
    exportButton.addEventListener("click", () => downloadJSON(doc));
    const rename = document.createElement("button");
    rename.textContent = "Rename";
    rename.setAttribute("aria-label", `Rename ${doc.name}`);
    rename.addEventListener("click", () => openSoundOptions(doc.libraryId));
    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.className = "delete-sound";
    remove.setAttribute("aria-label", `Delete ${doc.name}`);
    remove.addEventListener("click", () => deleteSound(doc.libraryId));
    const actions = document.createElement("div");
    actions.className = "saved-row-actions";
    actions.append(rename, remove, exportButton);
    row.append(load, actions);
    list.append(row);
  });
  if (store.deleted.length) {
    const details = document.createElement("details");
    details.className = "deleted-sounds";
    const summary = document.createElement("summary");
    summary.textContent = `Recently deleted (${store.deleted.length})`;
    details.append(summary);
    for (const doc of store.deleted) {
      const row = document.createElement("div");
      row.className = "deleted-row";
      const name = document.createElement("span");
      name.textContent = doc.name;
      const restore = document.createElement("button");
      restore.textContent = "Restore";
      restore.setAttribute("aria-label", `Restore ${doc.name}`);
      restore.addEventListener("click", () => restoreSound(doc.libraryId));
      row.append(name, restore);
      details.append(row);
    }
    list.append(details);
  }
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
    `${filename(doc.name)}.soundsculpt.json`,
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
    switchSound(() => {
      try {
        store.importSaved(doc);
        stop();
        mapping.selected = null;
        toast(`${doc.name} imported and saved`);
      } catch (error) {
        toast(error.message);
      }
    });
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

installHoldLoopShortcut(document, () => {
  setLoop(true);
  play();
}, stop, () => tableSelect.isOpen || lfoPanel.shapes.isOpen || !!document.querySelector('.route-select [role="listbox"]:not([hidden])') || !!document.querySelector("dialog[open]"));

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
  if (e.key.toLowerCase() === "l" && !mod) {
    e.preventDefault();
    setLoop(!looping);
    if (looping) play();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
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
