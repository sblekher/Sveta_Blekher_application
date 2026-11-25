# Sveta Blekher: interactive CV

Permanent checkout for the original Google AI Studio CV app. Website source, design, content and recordings are preserved from its current export.

- [Original AI Studio project](https://aistudio.google.com/apps/1ebbb1e2-2928-44fc-97cc-6e2f666b8e2e)
- [Published AI Studio website](https://sveta-blekher-localization-marketplace-operations.ai.studio/)
- [Canonical GitHub repository](https://github.com/sblekher/Sveta_Blekher_application)
- [Existing Vercel project](https://vercel.com/sblekher-8848s-projects/elevenlabs-interactive-cv)

Read [AGENTS.md](AGENTS.md), [the workflow](docs/WORKFLOW.md), and [the setup report](docs/SETUP_REPORT.md).

## Local development

Requires Node 24 and npm 11. No API key is required by this static CV.

```sh
npm run setup
npm run dev:local
```

Development: <http://127.0.0.1:3000/>. Production-build preview: <http://127.0.0.1:4173/>.
Setup reuses dependencies until the manifest, lockfile, runtime or platform changes.
The permanent checkout is `/Users/admin/Desktop/Projects/elevenlabs-interactive-cv`.
Its former location under the CVs folder is a compatibility link. Vite rejected the colon in the former path.
Keep `npm run dev` for AI Studio, where port 3000 must be reachable by its preview service.

## Verification and synchronization

```sh
npm run verify
npm run sync:safe
npm run publish:prepare
```

Safe sync stops if there are local edits or divergent history. It never auto-stashes or force-updates files.
Publishing preparation identifies and verifies the candidate commit; it does not push or deploy.
Every push, merge and deployment requires the owner's approval.

## External setup status

The original AI Studio app currently offers only Create new repository, so two-way sync is not yet verified.
The existing Vercel project is linked to the older `sblekher/elevenlabs-interactive-cv` repository.
Its production deployment has failed; an older preview deployment exists.
See the setup report before changing either service. Do not create duplicates.
