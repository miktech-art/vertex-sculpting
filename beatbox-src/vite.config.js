import { defineConfig } from 'vite';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// modes: production (npm run build) · debug (build:debug, keeps the test hooks) · single (build:single: one self-contained
// dist-single/index.html with the JS and the stems inlined, which opens straight from file://)
export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  return {
    base: './',
    publicDir: single ? false : 'public',
    build: {
      chunkSizeWarningLimit: 1000,   // one ~640 kB chunk, mostly three.js, is expected
      ...(single && { outDir: 'dist-single', assetsInlineLimit: Infinity, modulePreload: false }),
    },
    plugins: [stems(single), single && inlineScript()],
  };
});

// `import INLINE_STEMS from 'virtual:stems'`: {} normally (core.js fetches public/stems/*.wav), base64 WAVs for build:single
function stems(inline) {
  const id = 'virtual:stems', dir = fileURLToPath(new URL('public/stems', import.meta.url));
  return {
    name: 'stems',
    resolveId: s => (s === id ? '\0' + id : null),
    load(s) {
      if (s !== '\0' + id) return null;
      if (!inline) return 'export default {};';
      if (!existsSync(dir)) this.error('public/stems/*.wav is missing (it is not in git) — see README → "Stems"');
      const out = {};
      for (const f of readdirSync(dir).filter(f => f.endsWith('.wav'))) out[f.slice(0, -4)] = readFileSync(`${dir}/${f}`).toString('base64');
      return `export default ${JSON.stringify(out)};`;
    },
  };
}

// replace the <script src> of each JS chunk with the code itself; anything else left in the bundle is an error
function inlineScript() {
  return {
    name: 'inline-script',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html'];
      for (const [name, chunk] of Object.entries(bundle)) {
        if (name === 'index.html') continue;
        if (chunk.type !== 'chunk') this.error(`build:single only inlines JS, but the bundle also has ${name}`);
        const tag = new RegExp(`<script\\b[^>]*\\bsrc="[^"]*${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*></script>`);
        if (!tag.test(html.source)) this.error(`no <script> tag for ${name} in index.html`);
        html.source = html.source.replace(tag, () => `<script type="module">${chunk.code.replace(/<\/script/gi, '<\\/script')}</script>`);
        delete bundle[name];
      }
    },
  };
}
