import { cpSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
rmSync(output, { recursive: true, force: true });
cpSync(new URL('apps/sculpt/', root), output, { recursive: true });
const result = spawnSync(process.execPath, [fileURLToPath(new URL('scripts/build-beatbox.mjs', root))], {
  cwd: fileURLToPath(root), stdio: 'inherit',
});
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
