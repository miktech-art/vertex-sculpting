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
} from "../dist/src/model.js";
import { buildGeometry } from "../dist/src/visual/sculpture.js";
import { Store } from "../dist/src/state.js";
const storage = new Map();
Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
  configurable: true,
});

test("the only bundled sound is saw", () => {
  assert.equal(PRESETS.length, 1);
  assert.equal(PRESETS[0].name, "saw");
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
test("malformed imports cannot produce invalid visual or mapping states", () => {
  for (const mutate of [
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
        Math.abs(normalize(p.id, denormalize(p.id, n)) - n) < 1e-9,
        p.id,
      );
});
test("sine is one white line and lower pitch makes it thicker", () => {
  const a = buildGeometry(
      BASE,
      resolveMappings(BASE, DEFAULT_ROUTES, 55),
      48000,
      55,
    ),
    b = buildGeometry(
      BASE,
      resolveMappings(BASE, DEFAULT_ROUTES, 1760),
      48000,
      1760,
    );
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
  const p = { ...BASE };
  const route = {
    id: "r",
    source: "notePitch",
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
  const initial = store.document.params.detune;
  store.edit((d) => (d.params.detune = 14));
  store.commit();
  assert.equal(store.document.params.detune, 14);
  store.undo();
  assert.equal(store.document.params.detune, initial);
  store.redo();
  assert.equal(store.document.params.detune, 14);
  store.load(makeDocument({ ...PRESETS[0], name: "loaded sine" }));
  assert.equal(store.initial.name, "loaded sine");
  store.edit((d) => (d.params.detune = 28));
  store.commit();
  assert.equal(store.initial.params.detune, PRESETS[0].params.detune);
  store.undo();
  store.undo();
  assert.equal(store.document.name, "saw");
  assert.equal(store.initial.name, "saw");
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
  assert.equal(first.document.name, "saw");
  assert.equal(first.document.params.harmonics, PRESETS[0].params.harmonics);
  assert.equal(first.saved.length, 0);
  assert.deepEqual(first.document.routes, DEFAULT_ROUTES);
  assert.equal(
    first.document.routes.find((r) => r.source === "notePitch").invert,
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

test("the saw update replaces the active sine and preserves saved sounds and connection edits", () => {
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
  assert.equal(store.document.name, "saw");
  assert.equal(store.document.params.harmonics, PRESETS[0].params.harmonics);
  assert.equal(store.saved.length, 1);
  assert.equal(store.saved[0].name, "sine");
  assert.equal(store.document.routes[0].amount, 0.6);
  storage.clear();
});

test("note pitch is transient input and legacy presets migrate without losing other controls or routes", () => {
  assert.equal(PARAMETERS.length, 21);
  assert.equal(
    PARAMETERS.some((p) => p.id === "pitch" || p.id === "notePitch"),
    false,
  );
  const doc = makeDocument();
  assert.equal("pitch" in doc.params, false);
  doc.schema = "sound-form/preset-v1";
  doc.params.pitch = 190;
  doc.params.attack = 0.4;
  doc.routes.find((r) => r.source === "notePitch").source = "pitch";
  doc.routes[0].amount = 0.75;
  const migrated = validateDocument(doc);
  assert.equal(migrated.schema, SCHEMA);
  assert.equal("pitch" in migrated.params, false);
  assert.equal(migrated.params.attack, 0.4);
  assert.equal(migrated.routes[0].source, "notePitch");
  assert.equal(migrated.routes[0].amount, 0.75);
  assert.equal(migrated.routes.length, doc.routes.length);
});

test("stored revision-three session and library both migrate pitch out of saved parameters", () => {
  storage.clear();
  const legacy = makeDocument();
  legacy.schema = "sound-form/preset-v1";
  legacy.params.pitch = 190;
  legacy.params.release = 0.9;
  legacy.routes[0].source = "pitch";
  storage.set(
    "sound-form:session:v1",
    JSON.stringify({
      revision: 3,
      document: legacy,
      initial: legacy,
      saved: [legacy],
    }),
  );
  const store = new Store();
  assert.equal(store.document.params.release, 0.9);
  for (const doc of [store.document, store.initial, ...store.saved]) {
    assert.equal(doc.schema, SCHEMA);
    assert.equal("pitch" in doc.params, false);
    assert.equal(doc.routes[0].source, "notePitch");
  }
  assert.equal(JSON.parse(storage.get("sound-form:session:v1")).revision, 4);
  storage.clear();
});
