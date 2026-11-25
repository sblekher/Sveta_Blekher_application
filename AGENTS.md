# Interactive CV workflow

## Identity and scope

- Permanent checkout: `/Users/admin/Desktop/Projects/elevenlabs-interactive-cv`.
- Canonical GitHub repository: `https://github.com/sblekher/Sveta_Blekher_application` (`origin`).
- Original AI Studio project: `https://aistudio.google.com/apps/1ebbb1e2-2928-44fc-97cc-6e2f666b8e2e`.
- Published original: `https://sveta-blekher-localization-marketplace-operations.ai.studio/`.
- Existing Vercel project: `https://vercel.com/sblekher-8848s-projects/elevenlabs-interactive-cv`.
- `legacy` points to the older `sblekher/elevenlabs-interactive-cv` repository. Never push there by default.
- Read `docs/SETUP_REPORT.md` for verified state and unresolved external setup. Verify live state before changing services.

## Every session

1. Confirm `pwd`, `git rev-parse --show-toplevel`, `git status --short --branch`, and `git remote -v`.
2. Preserve local work. Never reset, clean, overwrite edits, auto-stash, force-push, or merge unrelated histories.
3. Use this folder. Do not clone another working copy or recreate repositories, AI Studio apps, or Vercel projects.
4. Use Node 24 and npm 11. `npm run setup` installs only when the lockfile, manifest, runtime, or platform changed.
5. `npm run sync:safe` requires a clean checkout and the expected origin, fetches GitHub and fast-forwards only. On divergence, stop and inspect. Do not force reconciliation.
6. Work on a `codex/` branch based on current `origin/main`. Local `main` tracks the canonical repository. The historical main is preserved as `checkpoint/legacy-main-20261125`.

## Commands and preview

- `npm run setup`: reuse dependencies or install exact locked versions.
- `npm run dev:local`: development at `http://127.0.0.1:3000/`; reuses only a verified server from this checkout.
- `npm run lint`: TypeScript check.
- `npm test`: workflow safety tests.
- `npm run verify`: type check, safety tests, production build, and public-asset integrity.
- `npm run preview`: serve `dist` at `http://127.0.0.1:4173/` after verification.
- `npm run publish:prepare`: local release readiness only. This does not publish.
- The former workspace path contains a colon; the permanent folder was moved because Vite refuses colons in source paths. Package scripts call tools through `node ./node_modules/...` because npm's injected PATH cannot represent this directory safely. Preserve those explicit paths.
- If sandbox networking or localhost binding is denied, request a narrowly scoped escalation. Do not treat DNS failures or GitHub connector 404s as proof that a repository does not exist.
- Keep `node_modules`, `.local-runtime`, `dist`, `.vercel`, credentials, local environment files, backups, and generated verification PDFs out of Git.

## Source and design preservation

- Preserve the original AI Studio project, website design, content, audio behavior, animations, localization, and CV/print functionality unless specifically asked to change them.
- This is a React + Vite static app. There are currently no runtime Gemini or ElevenLabs API calls, so no API key is needed for playback or preview. Recordings are static files.
- Preserve Vite's `DISABLE_HMR` handling and asset-copy plugin for AI Studio compatibility.
- Keep `package-lock.json` and Node version files current whenever dependencies change. Never use `--force` or `--legacy-peer-deps` to hide conflicts.
- Do not edit professional claims, employment dates, translations, images, or recordings during infrastructure work.

## Switching between AI Studio and Codex

- Use GitHub as the shared source after verifying the original app is connected to this exact repository.
- AI Studio currently shows only **Create new repository**, without a connected repository or pull/push controls (verified 2026-11-25). Do not claim two-way sync works or create a duplicate to work around it.
- If connection is restored: before changing tools, finish and review work in one tool, push only with approval, then pull in the other tool before editing. Do not edit the same branch concurrently.
- Never pull GitHub over unsaved AI Studio changes. Compare versions and preserve a source export first.
- Never paste credentials into source, logs, prompts, or public issue reports.

## Publishing and verification

- Ask for explicit approval immediately before any push, GitHub merge, deployment, publication, or deployment-setting change. A push can automatically trigger Vercel.
- No action here is permission to publish. Do not create an unattended publish task.
- Use the existing Vercel project. It is currently linked to the legacy repository; switching it to the canonical repository requires approval.
- Before approval, run `npm run verify`, inspect the exact diff and commit, and test the production build in a real browser.
- Test portrait loading; EN/HE/RU/ES playback, pause/resume, seeking and stop-on-switch; achievement and workflow tabs; detail modals; responsive widths; and the CV print/save flow.
- Current Download CV opens a drawer, then Print / Save PDF. Do not claim a one-click download or ATS text download exists.
- The current localization panel displays English explanations for all four locales. Hebrew transcript metadata exists, but the UI does not render an RTL transcript. Do not claim an on-screen RTL test passed.
- Report actual URLs, checked commit, test results and remaining blockers. Never claim deployment success from a submitted request alone.

## Communication

Use English or Russian, simple language and concise updates. No em dashes in user-facing writing.
Explain the plan before substantial execution. Ask only for authentication, necessary approval, or an unavoidable decision.
