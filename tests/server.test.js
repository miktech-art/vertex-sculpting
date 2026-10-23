import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createStaticServer } from '../scripts/server.mjs';

test('local server serves Sculpt and rejects private or escaping paths', async t => {
  const temp = await mkdtemp(join(tmpdir(), 'sculpt-server-'));
  const sculpt = join(temp, 'sculpt');
  await mkdir(join(sculpt, 'vendor'), { recursive: true });
  await writeFile(join(sculpt, 'index.html'), 'sculpt');
  await writeFile(join(sculpt, 'vendor', 'module.js'), 'export {};');
  await writeFile(join(sculpt, '.env'), 'private');
  await writeFile(join(temp, 'secret.txt'), 'outside');
  await mkdir(join(sculpt, 'assets'), { recursive: true });
  await writeFile(join(sculpt, 'assets', 'index.html'), 'asset index');
  await writeFile(join(sculpt,'entry.html'),'<script type="module" src="./entry.js"></script>');
  await writeFile(join(sculpt,'entry.js'),"import {x} from './vendor/module.js'; import './side.js';");
  const server = createStaticServer({ root: sculpt, assetVersion:'test-build' });
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(temp, { recursive: true, force: true });
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const url = `http://127.0.0.1:${server.address().port}`;

  await t.test('serves the root and preserves directory-relative assets', async () => {
    assert.equal(await (await fetch(url)).text(), 'sculpt');
    const redirect = await fetch(`${url}/assets?test=1`, { redirect: 'manual' });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), '/assets/?test=1');
    assert.equal(await (await fetch(`${url}/assets/`)).text(), 'asset index');
    const module = await fetch(`${url}/vendor/module.js`);
    assert.equal(module.headers.get('content-type'), 'text/javascript; charset=utf-8');
  });
  await t.test('development versions entry assets and their complete import graph without clearing sound storage',async()=>{
    const html=await fetch(`${url}/entry.html`),entry=await fetch(`${url}/entry.js?v=test-build`);
    assert.ok((await html.text()).includes('./entry.js?v=test-build'));
    const source=await entry.text();assert.ok(source.includes('./vendor/module.js?v=test-build'));assert.ok(source.includes('./side.js?v=test-build'));
    assert.equal(html.headers.get('clear-site-data'),null);assert.equal(entry.headers.get('cache-control'),'no-store');
  });
  await t.test('HEAD has headers without a response body', async () => {
    const response = await fetch(url, { method: 'HEAD' });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-length'), '6');
    assert.equal(await response.text(), '');
  });
  await t.test('returns useful error statuses and does not expose dotfiles or sibling files', async () => {
    for (const path of ['/.env', '/%2e%2e%2fsecret.txt', '/missing', '/assets/.git/config']) {
      assert.equal((await fetch(url + path)).status, 404, path);
    }
    assert.equal((await fetch(`${url}/%invalid`)).status, 400);
    assert.equal((await fetch(url, { method: 'POST' })).status, 405);
  });
});
