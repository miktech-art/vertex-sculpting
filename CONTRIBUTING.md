# Working on Sound/Sculpt

Use Node.js 24+. No dependency installation is required. Work from `mikael/sculpt` for the standalone app; keep the separate combined application's branch intact.

Run `npm run dev`, open http://localhost:5177, and refresh after editing. Source is in `apps/sculpt/`; do not edit generated `dist/` files. Keep changes to audio, geometry, state, and UI within their existing module boundaries.

Before committing, run:

```sh
npm test
npm run build
```

Check affected controls in the browser. For persistence changes, import a sound, confirm it has its own card, reload it, and verify existing sounds remain usable. Camera changes also need a live permission and tracking check.

Preserve browser storage keys and preset schemas. Format changes require compatible migrations and tests. Keep personal recordings, preset backups, credentials, dependencies, and generated builds out of commits.

Commit changes with a clear description. Publishing updates the hosted app; a GitHub push synchronizes source with collaborators. These are separate operations: push only when the user asks. Open pull requests for review before merging between branches.
