import globals from 'globals';

// The modules share top-level state and run code as they load, so they must evaluate in this order.
// Each one's first statement imports its predecessor, and main.js imports the last; ES module evaluation then
// walks the chain down to core and runs core → … → loop on the way back. An import sorter would break it silently.
export const ORDER = ['core', 'render', 'shape', 'cloud', 'audio', 'view', 'edit', 'ui', 'scene', 'loop'];

const loadOrder = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    const name = context.filename.replace(/\\/g, '/').match(/([^/]+)\.js$/)[1];
    const i = ORDER.indexOf(name);
    const want = name === 'main' ? ORDER.at(-1) : i > 0 ? ORDER[i - 1] : null;
    return {
      Program(node) {
        if (i < 0 && name !== 'main') return context.report({ node, message: `src/${name}.js is not in the load-order chain (ORDER in eslint.config.js)` });
        if (!want) return;
        const first = node.body[0];
        if (first?.type !== 'ImportDeclaration' || first.source.value !== `./${want}.js`)
          context.report({ node: first ?? node, message: `first statement must be \`import './${want}.js';\` (load order)` });
      },
    };
  },
};

// src/lib/ holds pure modules outside the chain (no DOM, no app state), so Node can import them (npm run test):
// they get no browser globals, and may import only each other or packages, never the chain
const pure = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value.startsWith('../')) context.report({ node, message: 'src/lib/ modules may not import the load-order chain' });
      },
    };
  },
};

export default [
  { ignores: ['dist/', 'dist-single/', 'node_modules/'] },
  {
    files: ['src/**/*.js'],
    ignores: ['src/lib/**'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.browser },
    plugins: { local: { rules: { 'load-order': loadOrder } } },
    rules: { 'no-undef': 'error', 'no-import-assign': 'error', 'local/load-order': 'error' },
  },
  {
    files: ['src/lib/**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: {} },
    plugins: { local: { rules: { pure } } },
    rules: { 'no-undef': 'error', 'local/pure': 'error' },
  },
  {
    files: ['scripts/**/*.mjs', 'test/**/*.mjs', '*.config.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
    rules: { 'no-undef': 'error' },
  },
];
