// Entry point. Importing loop.js pulls in the whole chain, which then runs core → render → … → loop (see eslint.config.js).
// load order: this import must stay first (npm run lint checks it)
import './loop.js';
