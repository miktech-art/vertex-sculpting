import test from "node:test";
import assert from "node:assert/strict";
import {
  PARAMETERS,
  BASE,
  PRESETS,
  SCHEMA,
  makeDocument,
  validateDocument,
  normalize,
  denormalize,
  resolveMappings,
  DEFAULT_ROUTES,
  envelopeAt,
  duration,
  tailDuration,
} from "../apps/sculpt/src/model.js";
import { buildGeometry } from "../apps/sculpt/src/visual/sculpture.js";
import { Store } from "../apps/sculpt/src/state.js";
const storage = new Map();
Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
  configurable: true,
});

test("four factory sounds always ship in the requested order", () => {
  assert.deepEqual(PRESETS.map(p => p.name), ["kick", "bass", "hi-hat", "synth"]);
});

test("all factory sounds round-trip through the public preset format", () => {
  for (const preset of PRESETS) {
    const doc = makeDocument(preset);
    const parsed = validateDocument(JSON.parse(JSON.stringify(doc)));
    assert.deepEqual(parsed.params, doc.params);
    assert.equal(parsed.routes.length, DEFAULT_ROUTES.length);
    assert.equal(parsed.schema, SCHEMA);
  }
});
test("malformed imports cannot produce invalid audio or mapping states", () => {
  for (const mutate of [
    (d) => (d.params.pitch = 0),
    (d) => (d.params.cutoff = Infinity),
    (d) => (d.params.sustain = 2),
    (d) => delete d.params.release,
    (d) => (d.routes[0].source = "__proto__"),
    (d) => (d.routes[0].target = "missing"),
    (d) => (d.routes[0].curve = 0),
    (d) => (d.routes[0].smoothing = -1),
    (d) => (d.routes[0].invert = "false"),
    (d) => (d.routes = Array(101).fill(d.routes[0])),
  ]) {
    const d = makeDocument();
    mutate(d);
    assert.throws(() => validateDocument(d));
  }
});
test("parameter normalization preserves physical units across every range", () => {
  for (const p of PARAMETERS)
    for (const n of [0, 0.13, 0.5, 0.91, 1])
      assert.ok(
        Math.abs(normalize(p.id, denormalize(p.id, n)) - n) < (p.integer ? .5/(p.max-p.min)+1e-9 : 1e-9),
        p.id,
      );
});
test("sine is one white line and lower pitch makes it thicker", () => {
  const low = { ...BASE, pitch: 55 },
    high = { ...BASE, pitch: 1760 },
    a = buildGeometry(low, resolveMappings(low, DEFAULT_ROUTES)),
    b = buildGeometry(high, resolveMappings(high, DEFAULT_ROUTES));
  assert.equal(a.lines.length, 1);
  assert.equal(a.particles.length, 0);
  assert.ok(a.thickness > b.thickness * 3);
  assert.equal(a.brightness, 1);
  assert.equal(a.lines[0].alpha, 1);
  assert.deepEqual(
    a.lines.map((l) => l.points),
    b.lines.map((l) => l.points),
  );
});
test("envelope endpoints agree with a complete finite sound event", () => {
  const p = {
    ...BASE,
    attack: 0.1,
    decay: 0.2,
    sustain: 0.4,
    hold: 0.3,
    release: 0.5,
  };
  assert.equal(envelopeAt(p, 0), 0);
  assert.equal(envelopeAt(p, 0.1), 1);
  assert.ok(Math.abs(envelopeAt(p, 0.3) - 0.4) < 1e-9);
  assert.ok(Math.abs(envelopeAt(p, 0.6) - 0.4) < 1e-9);
  assert.ok(Math.abs(envelopeAt(p, 0.85) - 0.2) < 1e-9);
  assert.equal(envelopeAt(p, duration(p)), 0);
  assert.equal(envelopeAt(p, -1), 0);
  assert.equal(tailDuration(p), duration(p));
  assert.ok(tailDuration({ ...p, delayMix: 0.4, feedback: 0.6 }) > duration(p));
});
test("summing, inverting, curving and disconnecting routes have distinct results", () => {
  const p = { ...BASE, pitch: 220 };
  const route = {
    id: "r",
    source: "pitch",
    target: "thickness",
    amount: 1,
    curve: 1,
    invert: false,
    smoothing: 0,
  };
  assert.equal(resolveMappings(p, []).thickness, 0);
  const value = resolveMappings(p, [route]).thickness;
  assert.ok(Math.abs(value - 0.4) < 1e-10);
  assert.ok(
    Math.abs(resolveMappings(p, [{ ...route, invert: true }]).thickness - 0.6) <
      1e-10,
  );
  assert.ok(
    Math.abs(resolveMappings(p, [{ ...route, curve: 2 }]).thickness - 0.16) <
      1e-10,
  );
  assert.equal(resolveMappings(p, [{ ...route, amount: -1 }]).thickness, 0);
  assert.equal(resolveMappings(p, [route, route, route]).thickness, 1);
});
test("geometry stays deterministic and finite for every preset and range boundary", () => {
  const samples = [
    ...PRESETS.map((p) => p.params),
    Object.fromEntries(PARAMETERS.map((p) => [p.id, p.min])),
    Object.fromEntries(PARAMETERS.map((p) => [p.id, p.max])),
  ];
  for (const p of samples) {
    const values = resolveMappings(p, DEFAULT_ROUTES),
      a = buildGeometry(p, values),
      b = buildGeometry(p, values);
    assert.deepEqual(a, b);
    for (const line of a.lines)
      for (const pt of line.points)
        assert.ok([pt.x, pt.y, pt.z, pt.e].every(Number.isFinite));
    assert.ok(Number.isFinite(tailDuration(p)));
  }
});
test("session undo, redo and load retain independent documents", () => {
  const store = new Store();
  const initial = store.document.params.pitch;
  store.edit((d) => (d.params.pitch = 440));
  store.commit();
  assert.equal(store.document.params.pitch, 440);
  store.undo();
  assert.equal(store.document.params.pitch, initial);
  store.redo();
  assert.equal(store.document.params.pitch, 440);
  store.load(makeDocument({ ...PRESETS[0], name: "loaded sine" }));
  assert.equal(store.initial.name, "loaded sine");
  store.edit((d) => (d.params.pitch = 880));
  store.commit();
  assert.equal(store.initial.params.pitch, PRESETS[0].params.pitch);
  store.undo();
  store.undo();
  assert.equal(store.document.name, "kick");
  assert.equal(store.initial.name, "kick");
  store.redo();
  assert.equal(store.document.name, "loaded sine");
  assert.equal(store.initial.name, "loaded sine");
  clearTimeout(store.persistTimer);
});

test("the update clears legacy sounds and routes once, then preserves new edits", () => {
  storage.clear();
  const legacy = makeDocument();
  legacy.name = "Velvet";
  legacy.params.harmonics = 0.8;
  legacy.routes = [];
  storage.set(
    "sound-form:session:v1",
    JSON.stringify({ document: legacy, saved: [legacy] }),
  );
  const first = new Store();
  assert.equal(first.document.name, "kick");
  assert.equal(first.document.params.harmonics, PRESETS[0].params.harmonics);
  assert.equal(first.saved.length, 0);
  assert.deepEqual(first.document.routes, DEFAULT_ROUTES);
  assert.equal(
    first.document.routes.find((r) => r.source === "pitch").invert,
    true,
  );
  first.document.params.attack = 0.25;
  first.document.routes[0].amount = 0.5;
  first.persist();
  const second = new Store();
  assert.equal(second.document.params.attack, 0.25);
  assert.equal(second.document.routes[0].amount, 0.5);
  storage.clear();
});

test("the factory update replaces the active sine and preserves saved sounds and connection edits", () => {
  storage.clear();
  const previous = makeDocument();
  previous.name = "sine";
  previous.params = { ...BASE };
  previous.routes[0].amount = 0.6;
  storage.set(
    "sound-form:session:v1",
    JSON.stringify({
      revision: 2,
      document: previous,
      initial: previous,
      saved: [previous],
    }),
  );
  const store = new Store();
  assert.equal(store.document.name, "kick");
  assert.equal(store.document.params.harmonics, PRESETS[0].params.harmonics);
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].name, "sine");
  assert.equal(store.document.routes[0].amount, 0.6);
  storage.clear();
});
