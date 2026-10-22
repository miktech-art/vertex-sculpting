import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer, listen } from './server.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = createStaticServer({
  root: resolve(root, 'apps/sculpt'),
  beatboxRoot: resolve(root, 'dist/beatbox'),
});
const watcher = spawn(process.execPath, [
  resolve(root, 'apps/beatbox/node_modules/vite/bin/vite.js'),
  'build', '--watch', '--mode', 'debug',
  '--outDir', resolve(root, 'dist/beatbox'), '--emptyOutDir',
], { cwd: resolve(root, 'apps/beatbox'), stdio: 'inherit' });

function stop() {
  watcher.kill();
  server.close();
}
watcher.on('error', error => { console.error(error.message); process.exitCode = 1; stop(); });
watcher.on('exit', code => { if (code) process.exitCode = code; server.close(); });
server.on('error', () => watcher.kill());
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
listen(server);
