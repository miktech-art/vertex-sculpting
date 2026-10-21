import test from "node:test";
import assert from "node:assert/strict";
import {
  createFilterResponse,
  filterCoefficients,
  responseMagnitude,
  HARMONIC_BANDS,
} from "../dist/src/spectral/filter.js";
import {
  BASE,
  PRESETS,
  DEFAULT_ROUTES,
  resolveMappings,
  makeDocument,
  validateDocument,
} from "../dist/src/model.js";
import { buildGeometry } from "../dist/src/visual/sculpture.js";
import { constrainCutoff } from "../dist/src/ui/filter-range.js";

const geometry = (params) =>
  buildGeometry(params, resolveMappings(params, DEFAULT_ROUTES));
test("the two filter edges pass the middle and attenuate both ends of the spectrum", () => {
  const response = createFilterResponse({
    ...BASE,
    cutoffLow: 500,
    cutoff: 4000,
  });
  assert.ok(response(1500) > 0.9);
  assert.ok(response(55) < 0.02);
  assert.ok(response(16000) < 0.03);
});
test("biquad response agrees with the Web Audio cutoff-gain identity at multiple sample rates", () => {
  for (const rate of [44100, 48000, 96000])
    for (const type of ["lowpass", "highpass"])
      for (const frequency of [55, 1000, 12000]) {
        const q = 12,
          coefficients = filterCoefficients(type, frequency, q, rate);
        assert.ok(
          Math.abs(
            responseMagnitude(coefficients, frequency, rate) - 10 ** (q / 20),
          ) < 1e-6,
        );
      }
});
test("raising resonance boosts only a neighborhood of the cutoff", () => {
  const low = createFilterResponse({
      ...BASE,
      cutoffLow: 20,
      cutoff: 4000,
      resonance: 0.1,
    }),
    high = createFilterResponse({
      ...BASE,
      cutoffLow: 20,
      cutoff: 4000,
      resonance: 16,
    });
  assert.ok(high(4000) > low(4000) * 5);
  assert.ok(Math.abs(high(220) - low(220)) < 0.02);
  assert.ok(high(15000) < 0.04);
  assert.ok(high(15000) / low(15000) < 1.05);
});
test("fixed spectral bands cover each of the 96 synthesized partials exactly once", () => {
  assert.deepEqual(
    HARMONIC_BANDS.flatMap((b) => b.partials).sort((a, b) => a - b),
    Array.from({ length: 96 }, (_, i) => i + 1),
  );
  assert.deepEqual(HARMONIC_BANDS[0].partials, [1]);
});
test("filtering and resonance change band amplitude without rotating or moving any harmonic points", () => {
  const params = { ...PRESETS[0].params, pitch: 220 };
  const open = geometry({
    ...params,
    cutoffLow: 20,
    cutoff: 18000,
    resonance: 0.1,
  });
  for (const p of [
    { cutoffLow: 1200, cutoff: 5000, resonance: 0.1 },
    { cutoffLow: 20, cutoff: 1000, resonance: 16 },
  ]) {
    const filtered = geometry({ ...params, ...p });
    assert.equal(filtered.lines.length, open.lines.length);
    for (let i = 0; i < open.lines.length; i++)
      assert.deepEqual(filtered.lines[i].points, open.lines[i].points);
    assert.notDeepEqual(
      filtered.lines.map((l) => l.filterGain),
      open.lines.map((l) => l.filterGain),
    );
  }
});
test("low cutoff removes the central fundamental; high cutoff fades outer bands; zero level dims everything", () => {
  const params = { ...PRESETS[0].params, pitch: 220, resonance: 0.1 };
  const highpass = geometry({ ...params, cutoffLow: 2000, cutoff: 18000 });
  assert.ok(highpass.lines[0].filterGain < 0.02);
  assert.ok(
    highpass.lines.find((l) => l.frequency === 220 * 19).filterGain > 0.8,
  );
  const lowpass = geometry({ ...params, cutoffLow: 20, cutoff: 1000 });
  assert.ok(lowpass.lines[0].filterGain > 0.9);
  assert.ok(
    lowpass.lines.find((l) => l.frequency === 220 * 96).filterGain < 0.001,
  );
  assert.equal(geometry({ ...params, volume: 0 }).brightness, 0);
});
test("dual cutoff edits stop at the other handle and malformed reversed bands are rejected", () => {
  const p = { cutoffLow: 200, cutoff: 2000 };
  assert.equal(constrainCutoff(p, "cutoffLow", 5000), 2000);
  assert.equal(constrainCutoff(p, "cutoff", 100), 200);
  const doc = makeDocument();
  doc.params.cutoffLow = 5000;
  doc.params.cutoff = 1000;
  assert.throws(() => validateDocument(doc), /Low cutoff/);
});
test("old presets gain a neutral low edge and replace only the old default filter routes", () => {
  const doc = makeDocument();
  delete doc.params.cutoffLow;
  doc.routes = doc.routes.filter((r) => r.source !== "cutoffLow");
  doc.routes.find((r) => r.source === "cutoff").target = "detail";
  doc.routes.find((r) => r.source === "resonance").target = "edge";
  doc.routes[0].amount = 0.6;
  const migrated = validateDocument(doc);
  assert.equal(migrated.params.cutoffLow, 20);
  assert.equal(
    migrated.routes.find((r) => r.source === "cutoff").target,
    "spectralHigh",
  );
  assert.equal(
    migrated.routes.find((r) => r.source === "resonance").target,
    "spectralPeak",
  );
  assert.equal(migrated.routes[0].amount, 0.6);
  assert.equal(
    migrated.routes.filter((r) => r.source === "cutoffLow").length,
    1,
  );
  assert.equal(
    validateDocument(migrated).routes.length,
    migrated.routes.length,
  );
});
