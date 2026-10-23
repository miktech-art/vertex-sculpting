import test from 'node:test';
import assert from 'node:assert/strict';
import { Knob, dragKnob, parseKnobValue } from '../apps/sculpt/src/ui/knob.js';
class Element {
  constructor() { this.listeners = new Map(); this.style = {setProperty(){}}; this.attributes = {}; }
  append() {}
  setAttribute(k,v) { this.attributes[k] = v; }
  addEventListener(k,v) { this.listeners.set(k,v); }
  focus() {} select() {} setPointerCapture() {}
  blur() { this.fire('blur'); }
  fire(type, changes={}) { this.listeners.get(type)?.({button:0,pointerId:1,clientY:100,preventDefault(){},stopPropagation(){},...changes}); }
}
test('knob vertical dragging is relative, Shift is ten times finer, and limits clamp', () => {
  assert.equal(dragKnob(0.2,-90),0.7);
  assert.equal(dragKnob(0.2,-90,true),0.25);
  assert.equal(dragKnob(0.9,-90),1);
  assert.equal(dragKnob(0.1,90),0);
});
test('numeric values accept audio units and reject incomplete or malformed input', () => {
  for (const [text,unit,expected] of [['50','%',.5],['50%','%',.5],['2.4 kHz','Hz',2400],['250 ms','s',.25],['0.5 s','s',.5],['-1.2×','',-1.2]])
    assert.equal(parseKnobValue(text,unit),expected);
  for (const text of ['', 'nope', '12oops', '1.2.3']) assert.ok(Number.isNaN(parseKnobValue(text)));
});
test('knob capture commits one undo step per drag and keeps typed values cancellable', () => {
  const original = globalThis.document; globalThis.document = { createElement: () => new Element() };
  try {
    let commits=0; const edits=[];
    const knob = new Knob({ id:'test',label:'Level',value:.5,unit:'%',format:v=>`${Math.round(v*100)}%`,onInput:v=>edits.push(v),onCommit:()=>commits++ });
    knob.dial.fire('pointerdown'); assert.equal(edits.length,0);
    knob.dial.fire('pointermove',{clientY:64}); assert.equal(knob.value,.7); assert.equal(commits,0);
    knob.dial.fire('pointerup'); knob.dial.fire('lostpointercapture'); assert.equal(commits,1);
    knob.dial.fire('dblclick'); assert.equal(knob.value,.5); assert.equal(commits,2);
    knob.editor.fire('focus'); knob.editor.value='80'; knob.editor.fire('keydown',{key:'Escape'});
    assert.equal(knob.value,.5); assert.equal(commits,2);
    knob.editor.fire('focus'); knob.editor.value='80'; knob.editor.fire('keydown',{key:'Enter'});
    assert.equal(knob.value,.8); assert.equal(commits,3);
    knob.dial.fire('keydown',{key:'ArrowUp',shiftKey:true}); assert.equal(knob.value,.801);
  } finally { globalThis.document = original; }
});
