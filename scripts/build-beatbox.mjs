import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const result = spawnSync(process.execPath, [
  resolve(root, 'apps/beatbox/node_modules/vite/bin/vite.js'), 'build',
], { cwd: resolve(root, 'apps/beatbox'), stdio: 'inherit' });
if (result.error) console.error(result.error.message);
if (result.status !== 0) process.exit(result.status || 1);
const output = resolve(root, 'dist/beatbox');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(resolve(root, 'apps/beatbox/dist'), output, { recursive: true });
console.log('Beatbox built at dist/beatbox/');
