import test from "node:test";
import assert from "node:assert/strict";
import {
  buildEchoLayout,
  presentProgress,
  timeTickStep,
} from "../apps/sculpt/src/visual/echoes.js";
import { BASE, PRESETS, DEFAULT_ROUTES, resolveMappings } from "../apps/sculpt/src/model.js";
import {
  buildGeometry,
  SculptureRenderer,
} from "../apps/sculpt/src/visual/sculpture.js";

test("echo starts follow exact delay intervals on the same longitudinal time scale", () => {
  const layout = buildEchoLayout(2, 500, {
    mix: 0.4,
    delay: 0.35,
    feedback: 0.5,
  });
  for (const copy of layout.copies) {
    assert.equal(copy.time, copy.index * 0.35);
    assert.equal(copy.offset.x, copy.time * 250);
    assert.equal(copy.scale, 1);
    assert.equal(copy.offset.z, 0);
    assert.equal(
      copy.gain,
      copy.index === 0 ? 1 : 0.4 * Math.cbrt(0.5) ** (copy.index - 1),
    );
    assert.equal(copy.offset.y, copy.index * 32);
  }
  assert.equal(layout.duration, 2 + layout.copies.at(-1).time);
  assert.equal(layout.length, 500 + layout.copies.at(-1).offset.x);
});
test("zero delay mix removes all copies; zero feedback leaves exactly the first repeat", () => {
  assert.equal(
    buildEchoLayout(1, 400, { mix: 0, delay: 0.4, feedback: 0.6 }).copies
      .length,
    1,
  );
  const layout = buildEchoLayout(1, 400, { mix: 0.3, delay: 0.4, feedback: 0 });
  assert.equal(layout.copies.length, 2);
  assert.equal(layout.duration, 1.4);
});
test("changing delay extends the time axis without changing source size or time scale", () => {
  const a = buildEchoLayout(1.2, 420, { mix: 0.4, delay: 0.2, feedback: 0.5 }),
    b = buildEchoLayout(1.2, 420, { mix: 0.4, delay: 0.7, feedback: 0.5 });
  assert.equal(a.unitsPerSecond, b.unitsPerSecond);
  assert.deepEqual(a.copies[0], b.copies[0]);
  assert.ok(b.length > a.length);
  assert.ok(b.duration > a.duration);
});
test("the same global present plane intersects original and overlapping echoes", () => {
  const total = 2,
    length = 500,
    layout = buildEchoLayout(total, length, {
      mix: 0.4,
      delay: 0.3,
      feedback: 0.5,
    });
  const elapsed = 1.1;
  const positions = layout.copies
    .filter((c) => c.time < elapsed)
    .map((copy) => {
      const u = presentProgress(elapsed, copy.time, total, layout.duration);
      assert.ok(u !== null);
      return -length / 2 + u * length + copy.offset.x;
    });
  for (const x of positions) assert.ok(Math.abs(x - positions[0]) < 1e-9);
  assert.equal(
    presentProgress(0.1, 0.3, total, layout.duration),
    null,
    "an echo cannot light before it starts",
  );
});
test("present highlighting continues through echo tails after the original note ends", () => {
  assert.equal(presentProgress(1.2, 0, 1, 2), null);
  assert.ok(Math.abs(presentProgress(1.2, 0.5, 1, 2) - 0.7) < 1e-10);
  assert.equal(presentProgress(2.1, 0.5, 1, 2), null);
  assert.ok(
    presentProgress(2.7, 0.5, 1, 2, true) !== null,
    "held-note preview cycles on the shared axis",
  );
});
test("renderer draws each translated copy once and preserves scale through delay edits", () => {
  const params = {
    ...PRESETS.find(p => p.id === 'synth').params,
    delayMix: 0.4,
    delayTime: 0.3,
    feedback: 0.5,
  };
  const g = buildGeometry(params, resolveMappings(params, DEFAULT_ROUTES));
  const drawn = [];
  const fake = {
    lastFrame: 0,
    updateMapping() {},
    ctx: { clearRect() {} },
    size: { width: 1200, height: 800 },
    geometry: g,
    events: [],
    drawObject: (geometry, copy) => drawn.push(copy),
    drawTimeAxis() {},
  };
  SculptureRenderer.prototype.draw.call(fake, 1);
  assert.equal(drawn.length, g.echoLayout.copies.length);
  assert.ok(drawn.every((c) => c.scale === 1));
  assert.deepEqual(
    drawn.map((c) => c.index),
    g.echoLayout.copies.map((c) => c.index).reverse(),
  );
});
test("time tick spacing stays positive and readable across short and long sounds", () => {
  for (const duration of [0.1, 0.5, 1, 5, 12, 50]) {
    const step = timeTickStep(duration);
    assert.ok(step > 0);
    assert.ok(duration / step <= 8.01);
  }
});

test("viewing scale remains fixed on a delay edit until Fit time is requested", () => {
  const doc = {
    params: {
      ...PRESETS.find(p => p.id === 'synth').params,
      delayMix: 0.4,
      delayTime: 0.3,
      feedback: 0.5,
    },
    routes: structuredClone(DEFAULT_ROUTES),
  };
  const renderer = Object.assign(Object.create(SculptureRenderer.prototype), {
    document: doc,
    routeValues: new Map(),
    targets: {},
    size: { width: 1200, height: 800 },
    needsBuild: true,
    zoom: 1,
    pan: {x:0,y:0},
    yaw: 0,
    pitch: 0,
  });
  renderer.updateMapping(0.016);
  const zoom = renderer.zoom,
    pan = { ...renderer.pan },
    length = renderer.geometry.echoLayout.length;
  doc.params.delayTime = 0.8;
  renderer.setDocument(doc);
  renderer.updateMapping(0.1);
  assert.ok(renderer.geometry.echoLayout.length > length);
  assert.equal(renderer.zoom, zoom);
  assert.deepEqual(renderer.pan, pan);
  renderer.fitTimeline();
  assert.ok(renderer.zoom <= zoom);
  assert.notDeepEqual(renderer.pan, pan);
});

test("transverse spacing grows with the sound body and Fit time frames the full stack", () => {
  const params = {
    ...PRESETS.find(p => p.id === 'synth').params,
    delayMix: 0.5,
    feedback: 0.6,
    delayTime: 0.2,
  };
  const g = buildGeometry(params, resolveMappings(params, DEFAULT_ROUTES));
  assert.ok(g.echoLayout.copies[1].offset.y >= 50);
  const renderer = Object.assign(Object.create(SculptureRenderer.prototype), {
    geometry: g,
    size: { width: 1200, height: 700 },
  });
  renderer.fitTimeline();
  const low = renderer.project({ x: 0, y: g.bounds.minY, z: 0 });
  const high = renderer.project(
    { x: 0, y: g.bounds.maxY, z: 0 },
    g.echoLayout.copies.at(-1).offset,
  );
  assert.ok(high.y - low.y <= 700 * 0.72 + 0.01);
  assert.ok(low.y > 30 && high.y < 670);
});

test("the seconds axis is drawn even when delay is zero", () => {
  const params = { ...PRESETS.find(p => p.id === 'synth').params, delayMix: 0 };
  const geometry = buildGeometry(params, resolveMappings(params, DEFAULT_ROUTES));
  const labels = [];
  const renderer = Object.assign(Object.create(SculptureRenderer.prototype), {
    geometry, size: { width: 1200, height: 700 },
    ctx: { beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fillText(text) { labels.push(text); } },
  });
  renderer.fitTimeline();
  renderer.drawTimeAxis(geometry);
  assert.ok(labels.includes("0 s"));
  assert.ok(labels.length > 1);
});

test('the timeline stays at the fully wide saw reference through harmonic, width and waveform edits',()=>{
  const renderer=Object.assign(Object.create(SculptureRenderer.prototype),{
    size:{width:1400,height:1000},yaw:0,pitch:0,axialRotation:0,zoom:.65,pan:{x:0,y:0},
    ctx:{beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(){}},
  });
  let y;
  for(const patch of [{harmonics:0,width:0,wavePosition:0},{harmonics:1,width:0,wavePosition:2/3},{harmonics:1,width:1,wavePosition:2/3},{harmonics:.1,width:.5,wavePosition:1}]){
    const p={...BASE,...patch},g=buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));
    renderer.document={params:p,routes:DEFAULT_ROUTES};
    renderer.drawTimeAxis(g);y??=renderer.axisY;assert.equal(renderer.axisY,y);
  }
  renderer.pan.y=-20;const p={...BASE},g=buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));renderer.drawTimeAxis(g);
  assert.ok(renderer.axisY<y);
});

test('the timeline leaves only eight pixels beneath this sound at full harmonic width',()=>{
  const p={...BASE,unison:1,detune:0,harmonics:1,width:1,waveTable:0,wavePosition:2/3,sustain:.7};
  const g=buildGeometry(p,resolveMappings(p,DEFAULT_ROUTES));
  const renderer=Object.assign(Object.create(SculptureRenderer.prototype),{
    document:{params:p,routes:DEFAULT_ROUTES},size:{width:1400,height:1000},
    yaw:0,pitch:0,axialRotation:0,zoom:.65,pan:{x:0,y:0},
    ctx:{beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(){}},
  });
  renderer.drawTimeAxis(g);
  const bottom=Math.max(...g.lines.flatMap(l=>l.points.map(p=>renderer.project(p).y)));
  assert.ok(Math.abs(renderer.axisY-bottom-8)<1e-9);
});
