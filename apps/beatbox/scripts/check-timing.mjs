// Timing regression test: plays the default scene in Chrome and checks every scheduled note against the groove.
//   npm run check:timing          -> builds a debug build, serves it on localhost, checks it
//   npm run check:timing -- <url> -> checks that page instead (it needs window._ev / window._dbg)
// Runs in a small window so frames stay fast: frames > 0.6 s are dropped on purpose and would skew the clock.
import { chromium } from 'playwright-core';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BPM = 132, BARS = 4;                      // bars that must be complete and correct
const EXPECT = {                                 // sound -> 16ths in every bar, and the pitch where it matters
  stem_kick:   { steps: [0, 4, 8, 12] },
  stem_clap:   { steps: [4, 12] },
  stem_cymbal: { steps: [2, 6, 10, 14] },
  stem_synth:  { steps: [2, 6, 10, 14], hz: 174.61 },   // F3
  stem_bass:   { steps: [0, 4, 8, 12], hz: 58.27 },     // Bb1
};

let url = process.argv[2], server;
if (!url) {
  const { build, preview } = await import('vite');
  const outDir = join(root, 'node_modules', '.check-timing');
  await build({ root, mode: 'debug', logLevel: 'warn', build: { outDir, emptyOutDir: true } });
  server = await preview({ root, mode: 'debug', logLevel: 'warn', build: { outDir }, preview: { port: 4179, strictPort: false } });
  url = server.resolvedUrls.local[0];
}

const browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 400, height: 260 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if ((m.type() === 'error' && !/Failed to load resource/.test(m.text())) || /stem decode failed/.test(m.text())) errors.push(m.text()); });
page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) errors.push(`${r.status()} ${r.url()}`); });   // there is no favicon
let ev, bpm, stems;
try {
  await page.goto(url);
  await page.$eval('#beginBtn', b => b.click());   // off-screen at this size; the autoplay flag stands in for the gesture
  await page.waitForTimeout((BARS + 1.6) * 4 * 60 / BPM * 1000);
  ({ ev, bpm, stems } = await page.evaluate(() => ({ ev: globalThis._ev, bpm: globalThis._dbg?.settings.bpm, stems: Object.keys(globalThis._dbg?.audio.stems ?? {}) })));
} finally {
  await browser.close();
  await server?.close();
}

const fails = [...errors.map(e => 'page error: ' + e)];
if (!ev) fails.push('no window._ev — is this a debug build?');
if (bpm !== BPM) fails.push(`bpm is ${bpm}, expected ${BPM}`);
if (stems?.length !== 5) fails.push(`${stems?.length ?? 0} of 5 stems decoded (${stems})`);
const report = [];
if (ev?.length) {
  const six = 60 / BPM / 4, t0 = Math.min(...ev.map(e => e[1]));
  const bars = Array.from({ length: BARS }, () => Object.fromEntries(Object.keys(EXPECT).map(k => [k, []])));
  let worst = 0, lastBar = 0;
  for (const [type, t, f] of ev) {
    const pos = (t - t0) / six, step = Math.round(pos);
    worst = Math.max(worst, Math.abs(pos - step) * six);
    const bar = Math.floor(step / 16); lastBar = Math.max(lastBar, bar);
    if (!EXPECT[type]) { fails.push(`unexpected sound ${type}`); continue; }
    if (EXPECT[type].hz && Math.abs(f - EXPECT[type].hz) > 0.01) fails.push(`${type} at ${f.toFixed(2)} Hz, expected ${EXPECT[type].hz}`);
    if (bar < BARS) bars[bar][type].push(step % 16);
  }
  if (worst > 0.002) fails.push(`notes off the 1/16 grid by up to ${(worst * 1000).toFixed(1)} ms (a slow frame skipped the clock?)`);
  if (lastBar < BARS) fails.push(`only ${lastBar} complete bars recorded, need ${BARS}`);
  bars.slice(0, Math.min(BARS, lastBar)).forEach((b, i) => {
    for (const [k, { steps }] of Object.entries(EXPECT)) {
      const got = b[k].sort((x, y) => x - y).join(',');
      if (got !== steps.join(',')) fails.push(`bar ${i + 1} ${k}: {${got}}, expected {${steps}}`);
    }
  });
  report.push(`${ev.length} notes, ${Math.min(BARS, lastBar)} bars checked, max grid error ${(worst * 1000).toFixed(2)} ms`);
}
if (fails.length) { console.error('timing check FAILED\n  ' + [...new Set(fails)].join('\n  ')); process.exit(1); }
console.log('timing check ok: ' + report.join('; '));
