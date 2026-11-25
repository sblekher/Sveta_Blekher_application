# Sveta Blekher — Interactive Bento CV for ElevenLabs (Marketplace Operations)

An editorial, single-screen interactive CV tailored specifically to **ElevenLabs — Marketplace Operations (Productions)**. Preserves the calm warm-grey bento aesthetic, 1440×960 uncropped stage, and unified single-clock motion of the reference layout while replacing every lifestyle card with proof of Sveta’s localization operations leadership, AI workflow architecture, and a live localizable multilingual voice pitch.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> All four product and visual preferences from our Q&A are locked into the design below. Review the card structure and multilingual voice-note workflow, then click **Proceed** to build.

- **Confirmed — All-Professional Bento Grid**: All six live cards highlight professional qualifications for ElevenLabs Productions (Experience Timeline, Proven Impact Metrics, Languages & Cultural Fluency, Koh Samui Remote Hub / UTC+7 Map, AI & Localization Stack, and How I Scale Marketplace Ops).
- **Confirmed — Editorial Monogram + Photo Upload**: Starts with a crisp `SB` monogram on the signature `#EE6A1F` backdrop; clicking the avatar lets Sveta upload her real headshot (saved locally in browser storage with a one-click reset).
- **Confirmed — Multilingual Localizable Voice-Note Pitch**: Features an inline `EN · HE · RU · ES` switcher directly inside the header voice-note pill, synced with an expandable localized transcript (including genuine right-to-left `dir="rtl"` rendering for Hebrew) and per-language audio upload slots so Sveta can swap in her own ElevenLabs-dubbed tracks later.
- **Confirmed — Live Bento CV + Full CV Drawer & Print View**: Keeps the 1440×960 desktop stage uncluttered while providing a slide-over Full CV Drawer (complete roles, bullets, education, tools, LinkedIn/email) and a clean print/PDF stylesheet.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Sveta Blekher’s 10+ years of global localization operations and AI workflow engineering as a living, interactive bento dossier built specifically for the ElevenLabs **Productions** team. Rather than claiming localization and AI-audio fluency in plain text, the header voice note *demonstrates* it directly through a localizable multi-language audio pitch with RTL support and drop-in audio localization slots.
- **Target Audience**: ElevenLabs recruiters, hiring managers, and Productions Marketplace Operations leads reviewing candidates on desktop or mobile.
- **Key Value**: Delivers immediate scannable proof of exact role fit (36+ languages at Wix Studio, −25% time-to-market, −20%+ support tickets, 100% on-time vendor delivery across 30+ markets, and hands-on Claude Skills / MCP workflows) on one uncropped frame, backed by a full printable CV one click away.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **First Impression (0–6.5s on Desktop 1440×960)**:
   - The entire stage scales cleanly via `scale(min(100vw / 1440, 100vh / 960))` with even margins—zero cropping on any desktop window, and a natural vertical scroll layout below `820px`.
   - Blocks rise `14px` and fade in over `0.7s` (80ms stagger), followed by quiet ambient motion: the Experience timeline drifts smoothly upward, the Proven Impact deck advances through quantified outcomes, and the 4-step *How I Scale Marketplace Ops* segmented control transitions calmly from Step 01 onward.
2. **Multilingual Voice Pitch (ElevenLabs Localization Demo)**:
   - Recruiter clicks **Play** (or selects `EN`, `HE`, `RU`, or `ES`) inside the header voice-note pill.
   - Switching languages restarts playback with that locale’s audio track, updates the active waveform playhead and `mm:ss` timer, and updates the live transcript drawer. Selecting `HE` automatically switches the transcript container to `dir="rtl"` with proper Hebrew typography—visually proving RTL/i18n craftsmanship.
   - Inside the expandable transcript panel, Sveta can also click **Replace Audio** for any language (`EN`, `HE`, `RU`, `ES`) to attach her own ElevenLabs-recorded `.mp3` or `.wav` file (persisted locally in IndexedDB) or update the single central locale registry in code when deploying permanently.
3. **Cross-Card Discovery & Deep Dive**:
   - Clicking any language in the **Languages & Localization** card switches the header voice note to that language and starts playback.
   - Clicking any role in the drifting **Experience** timeline (or clicking **Full CV & Print** in the header) opens the **Full CV Drawer** with complete bullet points, education, skills, tools, one-click email copy, LinkedIn link, and **Print / Save PDF**.
4. **Personalizing the Avatar**:
   - Clicking the `145×145` monogram avatar opens a file picker to upload a real portrait photo (cropped cleanly with `object-cover` and saved in `localStorage`), with a subtle hover control to revert to the `SB` monogram.

### Visual Identity & Theme

- **Aesthetic Direction**: Calm, warm editorial monograph inspired by the reference bento stage—tactile off-white cards, hairline borders, crisp tabular data, and disciplined single-accent restraint.
- **Color Palette & Mood (60-30-10 Distribution)**:
  - Dominant Canvas (`--canvas`): `#EEECE8` warm light stone
  - Structural Card Surfaces (`--surface`): `#F5F3EF` off-white with `rgba(0, 0, 0, 0.07)` hairlines and soft hover elevation
  - Recessed Surface / Controls (`--surface-muted`): `#E9E6E1`
  - Primary & Secondary Ink (`--ink`, `--ink-secondary`, `--ink-muted`): `#1E1C1A`, `#77736E`, `#A7A39D`
  - Focal Accent (`--accent`): `#EE6A1F` (avatar backdrop, voice-note play button, active waveform & metric emphasis)
  - Dark Segmented Pill (`--segment-dark`): `#2A2624` and Availability Signal (`--status-open`): `#3BC45E`
- **Typography & Hierarchy**:
  - **Primary Display & Body**: `IBM Plex Sans` paired with `IBM Plex Sans Hebrew` so Latin, Cyrillic (`RU`), and Hebrew (`HE` RTL) share identical editorial geometry and optical weight without mismatched system fallbacks.
  - **Metrics & Timers**: `IBM Plex Mono` with strict `font-variant-numeric: tabular-nums` for `mm:ss` timers, years, budgets, and percentages.
  - **Scale**: Headline `39.5px / 46px` (weight `520`, tracking `-0.021em`), Bio `20.5px / 31px`, Card Headings `15.5px–29px`, quiet unboxed metadata labels (`12.5px`) with clean typographic separators instead of noisy capsule clutter.
- **Bento Stage Composition (1440×960 Desktop Stage)**:
  - **Intro Band (`y: 82–340`)**: `145×145` Avatar (`x: 136`) · Headline & Bio (`x: 321`) · Action row (`y: 287`, `h: 53`) aligning the Multilingual Voice-Note Pitch, Availability status, and Full CV & Print trigger flush with the grid’s `1364px` right margin.
  - **Row 1 (`y: 390, h: 258`, `17px` gaps, `76px` outer margins)**:
    1. **Experience (`370px`)**: Seamless looping vertical timeline (`1.5px` line, `8.5px` dots) covering Web Coconuts, Wix Studio, Moroccanoil, Taglit Birthright, Israel Experts, and Spertus Institute.
    2. **Proven Impact (`513px`)**: Interactive metric spotlight with progress bar and prev/play-pause/next controls cycling through `36+` languages, `−25%` time-to-market, `−20%+` support tickets / `+15%` engagement, `100%` on-time across 30+ markets, and `$1.5M` annual program scale.
    3. **Languages & Localization (`371px`)**: Editorial overview of Hebrew (Native · RTL), Russian (Native · Cyrillic), English (Full Working), and Spanish (Basic) with fluency bars and direct click-to-play sync with the voice pitch.
  - **Row 2 (`y: 665, h: 242`, `17px` gaps)**:
    4. **Remote Hub (`370px`)**: Minimalist editorial SVG map of Koh Samui, Thailand (`11px` inset, `9px` radius) with live `UTC+7` local time and EMEA/APAC overlap indicator.
    5. **AI & Ops Stack (`330px`)**: Structured domain view of Sveta’s tooling (`AI & Builds`: Claude Code, Skills, MCP, React/GitHub/Vercel · `Localization`: Smartling, RTL/i18n, QA · `Operations`: Jira, Monday, KPI Reporting) with interactive pillar focus.
    6. **How I Scale Marketplace Ops (`554px`)**: `29px` title, `15px` concise operational playbook, and `40px` segmented control (`Step 01–04`) with `#2A2624` sliding pill tailored to ElevenLabs Productions (Linguist Supply, Upstream Workflow, AI-Assisted QC, KPIs & Cross-Functional Loop).

### Interactive Feedback & Motion

- **Unified Motion Clock**: All continuous and stepped ambient animations read a single Web Animation master clock inside one `requestAnimationFrame` loop, pausing cleanly when `prefers-reduced-motion: reduce` is enabled.
- **Micro-Interactions**: Cards lift `3px` with a softly deepened shadow on hover (`≤ 200ms` settle); waveform bars near the playhead bounce smoothly (`scaleY` up to `+55%`); manual clicks on the 4-step playbook hold selection for `8s` before resuming auto-advance.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Template Audio + Localizable Audio Registry**:
  - *Chosen Approach*: Bundle a clean, pleasant synthesized template audio track (generated client-side as a real WAV blob so the native HTML `<audio>` element drives playback, progress, and duration reliably with zero external CDN failures) mapped behind a single `LOCALE_PITCH_CONFIG` object (`en`, `he`, `ru`, `es`), plus per-language file upload stored in browser IndexedDB.
  - *Why*: Works immediately on first load for all four languages, demonstrates real localization architecture (isolated locale keys, RTL switching, independent audio streams per locale), and lets Sveta drop in her own ElevenLabs-generated MP3s either directly in the UI for instant preview or by replacing the 4 static file URLs in one config object before publishing.
  - *Alternatives Considered*: Relying solely on browser `speechSynthesis` (inconsistent voices across browsers, no reliable `currentTime` playhead scrubbing, and poor Hebrew/Russian voice availability).
- **Decision 2 — Editorial SVG Map for Koh Samui vs. External Map Tile / Image**:
  - *Chosen Approach*: Craft a bespoke minimal vector map of Koh Samui & the Gulf of Thailand matching the exact `#EEECE8`/`#F5F3EF` stone palette, paired with live `UTC+7` clock readout.
  - *Why*: Never breaks offline or in sandboxes, stays razor-sharp at any desktop scale factor, and respects the user’s preference not to generate extra AI imagery.
- **Decision 3 — Drawer + Print Stylesheet for Full CV**:
  - *Chosen Approach*: Keep the primary 1440×960 stage completely faithful to the uncropped editorial bento layout, placing the complete bulleted CV inside a focused slide-over drawer with a dedicated `@media print` view.
  - *Why*: Preserves the visual restraint and instant impact of the bento stage while giving ElevenLabs recruiters every detail they need to evaluate and share the full resume.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                          CV Application Shell                             │
│  • Unified Web-Animation Clock (rAF loop + prefers-reduced-motion guard)  │
│  • Responsive Stage Scaler (1440×960 desktop transform / ≤820px stack)    │
│  • Active Locale State (en | he | ru | es) + Audio Engine (<audio> + IDB) │
│  • Avatar State (Monogram SB / localStorage Photo) + Drawer State         │
└───────────────┬───────────────────────────────────────────┬───────────────┘
                │                                           │
                ▼                                           ▼
┌───────────────────────────────────────────┐   ┌───────────────────────────┐
│             1440×960 Bento Stage          │   │     Companion Surfaces    │
│ ┌───────────────────────────────────────┐ │   │ ┌───────────────────────┐ │
│ │ Intro Header                          │ │   │ │ Localized Pitch &     │ │
│ │  [Avatar]  Headline & Bio             │ │   │ │ Audio Manager Popover │ │
│ │            [Multilingual Voice Pill]  │ │   │ │  • Synced Transcript  │ │
│ │            [Open Status] [Full CV]    │ │   │ │  • RTL Hebrew Support │ │
│ └───────────────────────────────────────┘ │   │ │  • Upload MP3/Locale  │ │
│ ┌────────────┬─────────────┬────────────┐ │   │ └───────────────────────┘ │
│ │ Experience │ Proven      │ Languages  │ │   │ ┌───────────────────────┐ │
│ │ Timeline   │ Impact Deck │ & Fluency  │ │   │ │ Full CV Slide-Over    │ │
│ │ (Looping)  │ (KPIs)      │ (Sync EN/  │ │   │ │ Drawer + Print View   │ │
│ │            │             │  HE/RU/ES) │ │   │ │  • Complete 5 Roles   │ │
│ ├────────────┼─────────────┼────────────┤ │   │ │  • Education & Tools  │ │
│ │ Koh Samui  │ AI & Ops    │ How I Scale│ │   │ │  • Copy Email / Print │ │
│ │ Remote Map │ Stack       │ Ops (01-04)│ │   │ └───────────────────────┘ │
│ └────────────┴─────────────┴────────────┘ │   └───────────────────────────┘
└───────────────────────────────────────────┘
```

### Data Model & State

- **Candidate Profile Dataset**: Structured read-only data store holding Sveta’s headline, summary, all 5 professional roles with full bullet lists, 3 academic credentials, 5 quantified impact highlights, 3 stack pillars, 4 ElevenLabs-tailored operational steps, and contact metadata (`sblekher@gmail.com`, LinkedIn URL).
- **Localized Voice Pitch Registry (`en`, `he`, `ru`, `es`)**: Each locale entry defines `code`, `nativeName`, `dir` (`ltr` or `rtl`), `durationSec`, `defaultAudioSrc` (easily swappable with static `/audio/pitch-en.mp3` etc.), `transcript` (concise 30-second pitch tailored to ElevenLabs Productions in that language), and `waveformSeed`.
- **Browser Persistence**:
  - `localStorage` stores an optional uploaded avatar Data URL so Sveta’s headshot persists across refreshes.
  - Lightweight `IndexedDB` key-value store caches optional per-language uploaded audio blobs (`en`, `he`, `ru`, `es`) without hitting `localStorage` size caps.

### Interactive Component & State Mapping

- **Avatar Tile**: Click triggers hidden file input (validated for image MIME types) → resizes/reads image → updates state & `localStorage`; hover action clears back to `SB` monogram.
- **Voice-Note Pill & Language Switcher**: Clicking Play/Pause toggles the active `<audio>` track; clicking `EN / HE / RU / ES` updates `activeLocale`, loads either the user’s uploaded IndexedDB audio for that locale or the clean template WAV track, resets playhead to `0:00`, and plays automatically; clicking any bar on the waveform seeks directly to that timestamp; clicking the transcript icon toggles the **Localized Pitch & Audio Manager** popover.
- **Languages Card**: Clicking any language row invokes the exact same `selectAndPlayLocale(code)` handler so the card acts as a tactile multilingual showcase connected to the voice pitch.
- **Proven Impact Deck**: Prev/Next buttons step through the 5 impact metrics and pause auto-advance briefly; Play/Pause toggles automatic cycling on the unified clock.
- **Experience Timeline**: Hover pauses the continuous upward drift for easy reading; clicking any role opens the Full CV Drawer scrolled to that specific position.
- **How I Scale Marketplace Ops (01–04)**: Clicking any step slides the dark `#2A2624` pill, animates outgoing/incoming copy vertically, and holds that step for `8s` before resuming clock-driven rotation.
- **Full CV Drawer & Print View**: Opens via header button or timeline click, supports Escape-to-close, one-click Copy Email with subtle confirmation feedback, external LinkedIn link, and `window.print()` targeting a dedicated clean print layout.
