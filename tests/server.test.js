import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createStaticServer } from '../scripts/server.mjs';

test('local server serves both applications and rejects private or escaping paths', async t => {
  const temp = await mkdtemp(join(tmpdir(), 'vertex-server-'));
  const sculpt = join(temp, 'sculpt');
  const beatbox = join(temp, 'beatbox');
  await mkdir(join(sculpt, 'vendor'), { recursive: true });
  await mkdir(join(beatbox, 'stems'), { recursive: true });
  await writeFile(join(sculpt, 'index.html'), 'sculpt');
  await writeFile(join(sculpt, 'vendor', 'model.wasm'), 'wasm');
  await writeFile(join(sculpt, '.env'), 'private');
  await writeFile(join(temp, 'secret.txt'), 'outside');
  await writeFile(join(beatbox, 'index.html'), 'beatbox');
  await writeFile(join(beatbox, 'stems', 'kick.wav'), 'sample');
  const server = createStaticServer({ root: sculpt, beatboxRoot: beatbox });
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

  await t.test('routes root and Beatbox, preserving directory-relative assets', async () => {
    assert.equal(await (await fetch(url)).text(), 'sculpt');
    const redirect = await fetch(`${url}/beatbox?test=1`, { redirect: 'manual' });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), '/beatbox/?test=1');
    assert.equal(await (await fetch(`${url}/beatbox/`)).text(), 'beatbox');
    const sample = await fetch(`${url}/beatbox/stems/kick.wav`);
    assert.equal(sample.headers.get('content-type'), 'audio/wav');
    assert.equal(await sample.text(), 'sample');
    const wasm = await fetch(`${url}/vendor/model.wasm`);
    assert.equal(wasm.headers.get('content-type'), 'application/wasm');
  });
  await t.test('HEAD has headers without a response body', async () => {
    const response = await fetch(url, { method: 'HEAD' });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-length'), '6');
    assert.equal(await response.text(), '');
  });
  await t.test('returns useful error statuses and does not expose dotfiles or sibling files', async () => {
    for (const path of ['/.env', '/%2e%2e%2fsecret.txt', '/missing', '/beatbox/.git/config']) {
      assert.equal((await fetch(url + path)).status, 404, path);
    }
    assert.equal((await fetch(`${url}/%invalid`)).status, 400);
    assert.equal((await fetch(url, { method: 'POST' })).status, 405);
  });
});
