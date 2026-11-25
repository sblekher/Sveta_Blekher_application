# Interactive CV technical setup report

Verified 2026-11-25, Asia/Bangkok. Local setup is ready. Publishing and full AI Studio two-way synchronization are not complete.

## Project and source discovery

- Permanent folder: `/Users/admin/Desktop/Projects/elevenlabs-interactive-cv`.
- Compatibility link: `/Users/admin/Documents/Work: Business/CVs/elevenlabs-interactive-cv` points to that same folder. There is one active Git checkout.
- Original app: https://aistudio.google.com/apps/1ebbb1e2-2928-44fc-97cc-6e2f666b8e2e
- Original published site: https://sveta-blekher-localization-marketplace-operations.ai.studio/
- Canonical repository: https://github.com/sblekher/Sveta_Blekher_application
- GitHub base inspected: `9201223` (`main`). Local candidate branch: `codex/environment-setup`.
- Older repository retained as the `legacy` remote: https://github.com/sblekher/elevenlabs-interactive-cv
- A stale non-Git export also exists at `/private/tmp/elevenlabs-cv-github-preview`, served on port 3001. It was inspected and left untouched. Do not use it as the permanent project.

The current AI Studio ZIP was downloaded through the original app's export menu. It includes newer changes than GitHub main. All 20 website source and public files in that export are byte-identical in the local checkout. Hashes are recorded in `ai-studio-source.json`. Infrastructure additions are separate. No website design, content, translations, images, recordings, or functionality were rewritten.

## Previous synchronization failures

The earlier local repository had its own independently initialized Git history, while the older GitHub repository had separate commits. These histories were compared without forcing a merge. Four pre-existing dirty files were preserved in commit `e4a80bc` on `checkpoint/pre-environment-setup-20261125`, plus a full backup. The old local main was renamed to `checkpoint/legacy-main-20261125`; local main now tracks the canonical repository.

`origin` now points to the canonical repository. `legacy` preserves access to the older one. The GitHub connector could not read the legacy repository, but direct Git access succeeded. GitHub CLI authentication as `sblekher` was verified with network access; no credentials were changed.

## Dependency installation

Node 24 and npm 11 are recorded in version files and package metadata. Vite 8.3.8 requires esbuild 0.27 or 0.28, but the original manifest requested 0.25. The dependency was aligned to 0.28, matching the observed Vercel failure. A lockfile now fixes the dependency graph.

A clean `npm ci` installed 180 packages successfully. A second setup reused that installation. The restricted sandbox initially blocked registry DNS, so the clean install was rerun with approved network access. No force-install or legacy-peer-deps workaround was used.

## Local preview and file refresh

- Development preview: http://127.0.0.1:3000/
- Production-build preview: http://127.0.0.1:4173/

Both opened and rendered in Chrome. The former path contains a colon. It broke npm executable lookup and Vite's development file checks. Vite explicitly rejects source paths containing a colon, even when the directory appears in its allow list. Moving the same checkout to a path without a colon fixed the 403 without weakening file-access protections. The old path remains a link for the existing CVs Codex project.

The saved preview action recognized and reused the healthy server. A timestamp-only change to `src/main.tsx` triggered Vite's page-reload event, confirming file watching without changing source contents.

## Images and static assets

The portrait rendered successfully in both local previews. All eight public files, including the four MP3 recordings, were copied byte-for-byte into the production build. Five static asset references were checked for missing files. No broken application images were observed.

## Audio players

Configured EN, HE, RU and ES recordings all played successfully in the production preview. Durations observed: EN 51.069 seconds, HE 52.846 seconds, RU 59.011 seconds, ES 50.991 seconds. Keyboard seeking advanced playback. Switching languages stopped the active recording and reset its position. Pause and resume preserved position, verified again in the development preview. No autoplay was observed on initial load.

This verifies technical playback and configured language selection. It is not an independent linguistic review of each recording or transcript.

## Multilingual content

All four locale selectors and their localization explanations worked. The current original UI presents explanations in English. Hebrew transcript metadata has RTL direction, but the current panel does not render the transcript. An on-screen Hebrew RTL transcript test is therefore not applicable to this version; no RTL UI changes were made.

## Animations and interactive content

Entrance states settled into the rendered page. All five achievement tabs, all four Locksmith workflow stages, and all seven Sales workflow stages selected correctly. Both project detail views opened; Escape closed the Locksmith view. Existing user-triggered transitions were observed. Reduced-motion behavior was inspected in the existing hook and CSS, but not dynamically emulated in the browser.

## Responsive layouts

Checked widths 1440, 768, 390 and 320 pixels. Document scroll width matched the viewport, with no horizontal overflow in the inspected sections. Portrait and content loaded at mobile widths. This is viewport testing in desktop Chrome, not separate iOS/Android device certification.

## CV access and PDF

Download CV opens the existing full-CV drawer. Print / Save PDF opened Chrome's print preview and generated a one-page text-based CV. The PDF was saved as `CV-verification-2026-11-25.pdf` inside the backup folder. This is a two-step browser PDF flow, not a one-click static PDF download. No ATS text-download control exists in the current version.

## Build, tests and console

`npm run verify` passed: TypeScript check, three workflow safety tests, production build, and asset integrity. The safety tests cover refusal of uncommitted work, refusal of the legacy origin, and missing-recording detection. Safe sync was also run on the actual dirty checkout and stopped without changing it. No application console errors were captured during the local browser checks.

A future-compatibility Vite warning about `__dirname` remains in the original config. It does not prevent the current build; the original asset-copy and AI Studio HMR behavior were preserved. A targeted credential-pattern scan found no matching secrets in app source/config. There are no runtime Gemini or ElevenLabs API calls, so no API key is required for this static site.

## Vercel and automatic deployment

Existing project: https://vercel.com/sblekher-8848s-projects/elevenlabs-interactive-cv

Existing working but outdated preview: https://elevenlabs-interactive-11cq2kg9j-sblekher-8848s-projects.vercel.app/

Production domain shown in Vercel: `elevenlabs-interactive-cv.vercel.app`, marked No Deployment. It is not a verified live production URL. Vercel is currently connected to the legacy repository, with production tracking main. A failed production build showed the esbuild conflict; the older preview still displays a monogram and pending audio.

Prepared locally: `vercel.json` with Vite, npm ci, verify-before-build output, and dist; Node 24 metadata; a GitHub verification workflow. They have not been pushed or exercised by GitHub/Vercel. With approval, reuse this existing Vercel project, connect it to the canonical repository, keep production on main, and deploy the reviewed candidate. No deployment, remote push, repository creation, or Vercel setting change was performed.

## Reusable Codex actions and permanent instructions

AGENTS.md exists in the repository and the CVs parent workspace. Environment definitions are saved in both `.codex/environments/environment.toml` locations. Actions cover safe sync, local preview, verification and publishing preparation. Their underlying commands were tested directly. The publishing action never pushes or deploys.

The available computer-use surface blocks control of Codex itself, so toolbar recognition was not verified. For future sessions with the correct filesystem scope, open the permanent Desktop/Projects folder as the Codex project. The existing CVs project still reaches it through the compatibility link.

## Continued AI Studio development

The React/Vite source remains compatible with AI Studio's existing run command, port, HMR environment switch and asset handling. The original app and published site were preserved.

Full two-way synchronization is blocked: the original app's Settings > GitHub shows the signed-in `sblekher` account and only Create new repository. It exposes no existing-repository binding or pull/push action. Creating a duplicate or reimporting over the original was avoided. This requires restoring the original app's repository binding through Google AI Studio's account/UI/support path before seamless switching can be claimed.

Google documents two-way sync here: https://aistudio.google.com/docs/aistudio-build-mode#develop-externally
Vercel documents automatic deployments here: https://vercel.com/docs/git
Codex documents project-local setup/actions here: https://learn.chatgpt.com/docs/environments/local-environment

## Preservation and remaining approval

Backup: `/Users/admin/Documents/Work: Business/CVs/CV-setup-backups/20261125-215250/` contains original working files and hashes, a binary diff, Git history bundle, the AI Studio source snapshot, and the verification PDF. Original dirty files were checked against both backup and recovery commit.

Pending owner approval: push the reviewed candidate to the canonical GitHub main, reconnect the existing Vercel project to that repository, and deploy. The original AI Studio binding remains a separate blocker. Do not describe the end-to-end cross-tool workflow as complete until both deployment and binding are verified.
