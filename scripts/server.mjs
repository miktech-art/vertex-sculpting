import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.wasm': 'application/wasm', '.wav': 'audio/wav',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

export function createStaticServer({ root = resolve(projectRoot, 'dist') } = {}) {
  return createServer(async (req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname.includes('\0') || pathname.includes('\\') || pathname.split('/').some(p => p.startsWith('.'))) {
        res.writeHead(404).end();
        return;
      }
      const base = resolve(root);
      let file = resolve(base, `.${pathname}`);
      if (file !== base && !file.startsWith(base + sep)) {
        res.writeHead(404).end();
        return;
      }
      const info = await stat(file);
      if (info.isDirectory()) {
        if (!pathname.endsWith('/')) {
          res.writeHead(308, { Location: `${pathname}/${new URL(req.url, 'http://localhost').search}` }).end();
          return;
        }
        file = resolve(file, 'index.html');
      }
      const body = await readFile(file);
      res.writeHead(200, {
        'Content-Type': types[extname(file)] || 'application/octet-stream',
        'Content-Length': body.length,
        'Cache-Control': 'no-store',
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      res.writeHead(error instanceof URIError ? 400 : ['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code) ? 404 : 500).end();
    }
  });
}

export function listen(server) {
  const port = Number(process.env.PORT || 5177);
  server.on('error', error => { console.error(error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Sound/Sculpt: http://localhost:${port}`));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  listen(createStaticServer());
}
