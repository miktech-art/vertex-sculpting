import { cpSync, rmSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
rmSync(output, { recursive: true, force: true });
cpSync(new URL('apps/sculpt/', root), output, { recursive: true });
console.log('Sound/Sculpt built at dist/');
