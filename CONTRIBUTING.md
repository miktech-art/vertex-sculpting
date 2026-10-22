# Working together

Use a separate clone on each person's computer. Keep `main` as the shared working version and make one branch per change.

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/describe-your-change
```

Run `npm run setup` after cloning or when `apps/beatbox/package-lock.json` changes. Use `npm run dev` to edit and preview both apps at the same origin.

Before opening a pull request:

```sh
npm test
npm run build
git add <the-files-you-changed>
git commit -m "Describe the resulting behavior"
git push -u origin feature/describe-your-change
```

Open a pull request into `main` on GitHub. Explain what changed and how it was checked; include screenshots for visual changes. Ask the other collaborator to review it, merge once checks pass, then pull `main` before starting another branch. If Git reports conflicts, resolve them on your feature branch and rerun the checks.

## Editing boundaries

- Sculpt and Connections: `apps/sculpt/`.
- Beatbox: `apps/beatbox/`.
- Shared synthesis and saved-instrument reading: `apps/sculpt/src/audio/`, `model.js`, `delay.js`, `spectral/`, and `sculpt-instruments.js`. Check both apps when changing these.
- Add or replace stems in `apps/beatbox/public/stems/`. Keep their exact lowercase names.
- Commit the Beatbox lockfile alongside dependency changes. Run dependency commands from `apps/beatbox/`; there is no root dependency installation.
- Keep generated output, dependencies, recordings, personal sound backups, and credentials out of commits. `dist/` and `node_modules/` are ignored.

Preserve browser storage keys and preset schemas during routine refactors. Any format change needs a compatible migration and tests; verify a previously saved sound and Beatbox scene still load. The shared tab links and instrument integration depend on serving both pages from the same origin.

For manual checks, open Sculpt, Connections, and Beatbox, test the changed controls, and switch pages. For audio or persistence changes, also save a sound, assign it to a Beatbox box, play it, and reload the scene. Camera changes need a browser test with camera permission.

CI checks tests and the production build; it does not publish the site. Deploy only a tested, merged `main` through the existing Sites workflow.
