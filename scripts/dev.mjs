import { fileURLToPath } from 'node:url';
import { createStaticServer, listen } from './server.mjs';

// Serve the source directly; refresh the browser after editing.
const server = createStaticServer({ root: fileURLToPath(new URL('../apps/sculpt/', import.meta.url)) });
process.once('SIGINT', () => server.close());
process.once('SIGTERM', () => server.close());
listen(server);
