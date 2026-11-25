# Development and publishing workflow

## One permanent checkout

Use `/Users/admin/Desktop/Projects/elevenlabs-interactive-cv`.
The CVs Codex project has actions in `/Users/admin/Documents/Work: Business/CVs/.codex/environments/environment.toml`. The former project location is a compatibility symlink to this checkout.
The repository also contains its own environment definition for sessions opened directly in this folder.
The files are saved locally. Recognition by the desktop app has not been verified because computer control of Codex itself is blocked.

Actions: Safe sync, Local preview, Test and build, and Prepare publishing.
Setup installs exact dependencies only when necessary. It never synchronizes or publishes automatically.

## Start work

Read AGENTS.md. Inspect branch, status and remotes before changing anything.
Safe sync requires a clean working tree, fetches `origin` and attempts a fast-forward from `origin/main`.
If local and remote work diverged, it stops. Ask Codex to compare and reconcile the work while preserving both versions.
Local `main` now tracks the canonical repository. The older standalone main is preserved as `checkpoint/legacy-main-20261125`.

Local preview uses port 3000. It reuses a listener only when its process working directory matches this checkout.
It never kills an unknown process or silently switches ports. Test and build runs the complete check suite.
Production preview on port 4173 serves the generated `dist` directory.

## Switch between AI Studio and Codex

The original app is preserved. Google documents GitHub push/pull support in Settings > GitHub:
[Google AI Studio documentation](https://aistudio.google.com/docs/aistudio-build-mode#develop-externally).
This account's original project currently shows only Create new repository, without a repository binding, Pull or Push control.
Do not claim that the original project automatically receives GitHub changes.

Once the original app can be bound to `sblekher/Sveta_Blekher_application`:

1. Work in one environment at a time.
2. Before leaving AI Studio, review the changes and obtain approval to push them to the shared repository.
3. Before editing in Codex, run Safe sync. Setup refreshes dependencies only if their lockfile changed.
4. Before leaving Codex, verify and review the exact commit. Obtain approval for its GitHub push or merge.
5. In the original AI Studio project, pull GitHub changes before editing. Export unsaved app changes before pulling if there is any conflict.

This requires an intentional sync checkpoint when changing tools, but no manual copying of individual files or reinstalling unchanged dependencies.
Until the binding is restored, AI Studio edits and local edits can diverge. A source export is recovery, not an automatic sync solution.
Do not recreate the original app or revoke GitHub access as a speculative fix.

## Approval-controlled automatic deployment

Reuse the existing Vercel project. With approval, switch its Git repository to the canonical application repository.
Keep production on `main`, set Node 24, and keep the root directory at the repository root.
The prepared `vercel.json` selects Vite, installs with `npm ci`, runs `npm run verify` and serves `dist`.
`.github/workflows/verify.yml` is prepared locally and is not active on GitHub until pushed with approval.

Vercel automatically deploys pushed branches and production-branch updates:
[Vercel Git deployment documentation](https://vercel.com/docs/git).
Approval is therefore required before a push, even to a preview branch. Review the candidate in Prepare publishing first.
The local action intentionally contains no push or deployment command.

After approval, Codex should push only the reviewed commit to the canonical repository, verify GitHub checks,
inspect the resulting Vercel deployment, and repeat the live asset/audio/CV checks.
Report success only after Vercel is Ready and its actual URL renders correctly.

## Credentials and maintenance

This application plays static MP3 files and does not call ElevenLabs or Gemini at runtime. No API key is needed.
Preserve `.env.example` for AI Studio compatibility, but never copy secrets into the frontend.
The GitHub CLI and HTTPS Git access are authenticated as `sblekher`, verified with network access on 2026-11-25.
The earlier invalid-token message came from the restricted terminal, so verify actual connectivity before requesting credential refresh.
Use the signed-in browser if the connector cannot see the legacy repository. Do not expand access speculatively.

Keep Node 24, npm 11, and the committed lockfile together. Do not globally upgrade tools for a single session.
For dependency changes, update the lockfile deliberately, verify a clean installation, and repeat browser checks.
Vite currently emits a future-compatibility warning about `__dirname` but builds successfully. Preserve its asset behavior.

## Recovery

The four original dirty files are preserved in local commit `e4a80bc` on `checkpoint/pre-environment-setup-20261125`.
`/Users/admin/Documents/Work: Business/CVs/CV-setup-backups/20261125-215250/` contains working files, SHA-256 manifest, binary diff, Git history bundle,
the current AI Studio source ZIP, and the browser-generated verification PDF.
Keep backups local. Recover individual files deliberately; never reset the active project to recover one file.
