# CURRENT MENA SITE STATUS — Read-only Audit

> Snapshot audit of the repository as it exists now. **No source code, styling, assets, or git
> state was modified to produce this report.** Every "implemented" claim is backed by a file path.
> Statuses use: **Confirmed fact**, **Placeholder**, **Assumption**, **Missing**, **Needs clarification**.

---

## 1. Executive summary

- The site is a **single-page React 19 + Vite 6 + TypeScript application** styled with **Tailwind CSS v4**. There is **no router** — "pages" are in-page sections reached by anchor scroll.
- **Build passes** and **type-check passes** (the only defined quality scripts). No test suite exists.
- The recent branch work (`4c76361`) **rebranded the palette to the beige/gold identity, switched typography to Raleway, and stabilized light mode** (fixed two CSS selector-collision bugs). That work is committed and pushed.
- **Most of the "new" requirements do not exist yet**: no Space Game Challenge, Achievements, Research Papers, Events, or Activities pages/sections (0 code references each). Team-Head **photos** and dynamic detail routes do not exist.
- Two **functional gaps** stand out: the **Contact form has no backend** (fake success, data discarded) and the **Chatbot's env-var name mismatches** the config (`VITE_GEMINI_API_KEY` in code vs `GEMINI_API_KEY` in `.env.example`/README).
- Recommended immediate next step: **obtain the requirements `.docx` (not in repo) and the real content** (team heads + photos, research papers, space-game, achievements, events), and **decide whether to introduce a router** for the new multi-page/detail sections — the current SPA has no routing or SEO-per-page foundation.

---

## 2. Git and technical state (Confirmed facts)

| Item | Value |
|---|---|
| Absolute path | `C:\Users\khali\Desktop\MNA\MENA` (`/c/Users/khali/Desktop/MNA/MENA`) |
| Current branch | `khalil/color_change` |
| Upstream | `origin/khalil/color_change` |
| Ahead / behind | `0 / 0` (in sync with remote) |
| Working tree | **Clean** (no modified/untracked files) |
| Remote | `https://github.com/YazeedEdrees11/MENA.git` |

**Last 5 commits** (only 5 exist):
```
4c76361 fix(ui): stabilize light mode and visual hierarchy
bd8f4f5 Rebrand to new MENA color palette and Raleway typography
f469c97 feat: integrate Gemini-powered floating chatbot window in React website
1c493fb Fix logo import casing for Linux/Vercel build compatibility
3237fb7 Initial commit of MENA Space Organization website
```

**Tooling**
| Item | Value | Evidence |
|---|---|---|
| Framework | React **19.0.1** (SPA), Vite **6.2.3** | `package.json` |
| Router | **None** (no react-router / TanStack; anchor scroll only) | no router dep; `App.tsx` |
| Language | TypeScript **~5.8.2**, `noEmit`, `jsx: react-jsx` | `tsconfig.json` |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`), CSS-first `@theme` | `vite.config.ts`, `src/index.css` |
| Component library | **None** — custom components + `lucide-react` icons + `motion` (Framer Motion) animations | `package.json` |
| Theme | `body.light-mode` class + `localStorage['theme-mode']`, default **dark** | `src/App.tsx:24-40` |
| Deployment | Vercel — `buildCommand: npm run build`, `outputDirectory: dist`, SPA rewrite `/(.*) → /index.html` | `vercel.json` |
| Package manager | **npm** (`package-lock.json` present) | repo root |
| Node version pin | **None** (no `engines`, no `.nvmrc`) | `package.json` |
| Env vars referenced | `VITE_GEMINI_API_KEY` (code) — but `.env.example`/README define `GEMINI_API_KEY` (**mismatch**) | `src/components/Chatbot.tsx:16`; `.env.example` |

**package.json scripts:** `dev`, `build`, `preview`, `clean`, `lint` (= `tsc --noEmit`). **No `test` script.**

**Script runs (not fixed, per rules):**
| Command | Result | Notes |
|---|---|---|
| `npm run build` (`vite build`) | **PASS** (exit 0, ~6s) | ⚠️ Warnings: JS chunk **528 KB** (no code-splitting); `Mena-logo.png` **2.09 MB** emitted into `dist/assets`. Not deployment-blocking. |
| `npm run lint` (`tsc --noEmit`) | **PASS** (exit 0) | This is the type-check; no ESLint configured. |
| Type-check | **PASS** (same as lint) | — |
| Tests | **N/A** | No test script/framework defined. |

No failing commands to report.

---

## 3. Current route map (architecture: **Single-page**)

There is exactly **one physical route** (`/`). `src/main.tsx` renders `<App/>`; `src/App.tsx` renders every section in one document. Navigation is `element.scrollIntoView()` to anchor `id`s (`Header.tsx:53-59`). The Vercel SPA rewrite means **any URL** (including unknown paths) serves the same `index.html` → **no 404/error page, no dynamic routes, no per-section URLs**.

**In-page sections ("routes"):** all hardcoded/data-driven mix, all responsive via Tailwind, both themes share layout.

| Anchor | Source file | Purpose | Main components | Content source | In nav? |
|---|---|---|---|---|---|
| (top) | `Hero.tsx` | Hero headline + CTA over photo | Hero, Starfield, Mars3D | `data.ts IMAGES.hero`; inline copy | logo/home |
| `#about` | `About.tsx` | Org intro + impact stats | About, ScrollReveal | `IMPACT_STATS`, `MISSION_KNOWLEDGE` | ✅ About |
| `#telemetry-dashboard` | `DashboardInteractive.tsx` | Simulated live telemetry widget | DashboardInteractive | in-component `MissionControlState` sim | ❌ (between About & Mission) |
| `#mission` | `AnalogMission.tsx` | Analog Mars missions timeline | AnalogMission, ScrollReveal | `MISSION_PHASES` (3), `MISSION_KNOWLEDGE` | ✅ Analog Mars |
| `#gallery` | `MissionGallery.tsx` | Photo grid + lightbox | MissionGallery | `GALLERY_DATA` (8, in-file) | ✅ Gallery |
| `#programs` | `Programs.tsx` | Program/education cards | Programs, ScrollReveal | `ACTION_PROGRAMS` (4) | ✅ Programs (dropdown) |
| `#teams` | `Teams.tsx` | Departments & team heads | Teams, ScrollReveal | `DEPARTMENTS` (10) | ✅ Team (dropdown) |
| `#advisors` | `Advisory.tsx` | Scientific Advisory Board | Advisory | `ADVISORS` (4) | ✅ (Team dropdown → Advisors) |
| `#partners` | `Partners.tsx` | Partners marquee | Partners | `PARTNERS` (8, in-file) | ❌ not in nav |
| `#support` | `Donation.tsx` | Support tiers / donation | Donation | `SUPPORT_TIERS` (3) | ✅ Support Tiers |
| `#contact` | `Contact.tsx` | Contact form + info | Contact | inline; **no backend** | ✅ Contact |
| footer | `App.tsx` (lines ~160-300) | Footer links + social | MenaLogo | inline anchors | — |
| Chatbot | `Chatbot.tsx` | Floating Gemini assistant | Chatbot | `public/mena_kb.txt` + Gemini API | floating, all pages |

**Routes that DO NOT exist** (Missing): Home-as-URL, About-as-URL, Events, Activities, Achievements, Research Papers, Space Game Challenge, team-member detail pages, event-detail pages, 404/error page.

### 4. Navigation structure (exact, as implemented — `Header.tsx:43-51`)
Primary order: **About → Analog Mars → Gallery → Programs → Team → Support Tiers → Contact**, plus a **language toggle (عربي/EN)** and **theme toggle (Dark/Light)**.
- **Programs** dropdown: Analog Mission 2025, The Maker Collective, NASA SPACE APP CHALLENGE, SYSTEM Program (`Header.tsx:173-177`) — all scroll to existing sections; no dedicated pages.
- **Team** dropdown: Board Members, Advisors, Management & Operations, Marketing & Social Media, Design & Engineering, Space Food, R&D, Medical & Safety, Tech & Innovation (`Header.tsx:242-250`).
- Mobile: hamburger menu (`Header.tsx:368-374`, `lg:hidden`, opaque `bg-neutral-950`).
- **No Achievements / Research / Events / Activities / Space Game nav items.**

---

## 5. Component map (17 components in `src/components` + `App.tsx`)

| Component | File | Purpose | Reusable? | Content | Theme-specific | Known issues / recommendation |
|---|---|---|---|---|---|---|
| App | `App.tsx` | Root, section composition, theme + lang state, footer | — | inline footer | drives `body.light-mode`; ambient gradient color | reuse |
| Header | `Header.tsx` | Fixed navbar, dropdowns, mobile menu, theme+lang toggles | yes | nav labels inline (EN/AR) | header bg color per theme (`:98-100`) | reuse/extend (add new nav items) |
| Hero | `Hero.tsx` | Hero section | partial | inline copy, `IMAGES.hero` | hero scrim filled solid off-white in light (placeholder, by decision) | extend when hero redesigned |
| Starfield | `Starfield.tsx` | Canvas star background | yes | — | reads theme via `body.light-mode` in canvas | reuse |
| Mars3D | `Mars3D.tsx` | Canvas 3D-ish Mars globe | yes | — | teal/beige accents themed; red ramp fixed | reuse |
| About | `About.tsx` | About + stats | yes | `IMPACT_STATS` | color-only | reuse |
| DashboardInteractive | `DashboardInteractive.tsx` | Simulated telemetry UI | yes | in-component sim | color-only | reuse (decorative) |
| AnalogMission | `AnalogMission.tsx` | Missions timeline/tabs | yes | `MISSION_PHASES` | color-only | reuse/extend |
| MissionGallery | `MissionGallery.tsx` | Gallery grid + lightbox | **yes (strong)** | `GALLERY_DATA` in-file | color-only | reuse for event galleries; **extract data to `data.ts`** |
| Programs | `Programs.tsx` | Program cards | yes | `ACTION_PROGRAMS` | color-only | reuse/extend |
| Teams | `Teams.tsx` | Departments + lead profile | yes | `DEPARTMENTS` | color-only; `.dept-card` markers | extend (add photos, member pages) |
| Advisory | `Advisory.tsx` | Advisory cards | yes | `ADVISORS` | color-only | reuse |
| Partners | `Partners.tsx` | Partner marquee | yes | `PARTNERS` in-file | color-only | extend (real logos; split sponsors) |
| Donation | `Donation.tsx` | Support tiers | yes | `SUPPORT_TIERS` | color-only | reuse |
| Contact | `Contact.tsx` | Contact form + info | partial | inline | color-only | **needs backend**; reuse UI |
| Chatbot | `Chatbot.tsx` | Floating Gemini assistant | yes | `mena_kb.txt` + Gemini | dark widget, themed | **fix env var**; reuse |
| ScrollReveal | `ScrollReveal.tsx` | Scroll-in animation wrapper | **yes (utility)** | — | none | reuse everywhere |
| MenaLogo | `MenaLogo.tsx` | Logo `<img>` | yes | `Mena-logo.png` | `color` prop is a **no-op** (it's a PNG) | reuse; optimize 2 MB asset |

**No dedicated components exist for:** SEO/metadata, layout wrapper (each section is standalone), modal system (lightbox is inline in MissionGallery), timeline (inline in AnalogMission), image wrapper (raw `<img>`), page container (repeated `w-[90%] mx-auto` per section).

---

## 6. Content and data map

Content is **hardcoded in TypeScript** (no CMS, no JSON, no MDX). Bilingual EN/AR is inline via an `isArabic` prop threaded from `App`.

| Content type | File | Entries | Used by | Data-driven? | Scalability | Placeholders / missing |
|---|---|---|---|---|---|---|
| Hero + section images | `data.ts:4-9 IMAGES` | 4 | Hero, About | yes | ok | real photos in `public/images` |
| Impact stats | `data.ts:11-16 IMPACT_STATS` | 4 (`1st`, `250+`, `2`, `15+`) | About | yes | ok | numbers may be stale — **needs clarification** |
| Mission knowledge | `data.ts:18-29 MISSION_KNOWLEDGE` | 2 (habitat, rover) | About/AnalogMission | yes | ok | — |
| Mission phases | `data.ts:31-77 MISSION_PHASES` | **3** (ARAV-I … ) | AnalogMission | yes | ok | verify current missions |
| Programs | `data.ts:79-116 ACTION_PROGRAMS` | 4 | Programs | yes | ok | — |
| **Departments / Team Heads** | `data.ts:118-219 DEPARTMENTS` | **10** — each has `leadName`+`leadRole` | Teams | yes | ok | **NO photo field** (type `TeamDepartment` has none); names may not be current — **needs clarification** |
| **Advisors** | `data.ts:221-258 ADVISORS` | **4** | Advisory | yes | ok | **avatars are Unsplash stock** (`adv-1..4`, `images.unsplash.com/...`) = **Placeholder** |
| Support tiers | `data.ts:260-301 SUPPORT_TIERS` | 3 | Donation | yes | ok | — |
| **Gallery** | `MissionGallery.tsx:20-… GALLERY_DATA` | **8** | Gallery | in-file (not in `data.ts`) | ok | items 6-8 are **Unsplash stock** = Placeholder |
| **Partners** | `Partners.tsx:24-98 PARTNERS` | **8** | Partners | in-file | ok | **Lucide icon placeholders, no real logos**; sponsors not separated |
| Contact info | `Contact.tsx:89,116,129-130` | 1 | Contact | inline | — | email `INFO@MENASPACE.ORG`; WhatsApp `wa.me/962770000000` (**placeholder number**); social `linkedin.com`/`instagram.com` (**generic**) |
| Footer social | `App.tsx:266` | — | Footer | inline | — | `linkedin.com/company/mena-space-analog` |
| Chatbot KB | `public/mena_kb.txt` | 1 file | Chatbot | file fetch | ok | verify content currency |

**Requirement-specific content searches (0 hits = absent):**
`Space Game` **0**, `Game Challenge` **0**, `THIS YEAR` **0**, `LAST YEAR` **0**, `Achievement` **0**, `Research Paper` **0**, `abstract` **0**, `conference` **0**, `publication` **0**, `Winner` **0**. (`event`/`Events` hits are JS `CustomEvent`/`dispatchEvent`, not an events page; `Activities` = the "Programs & Activities" dropdown label only.)

---

## 7. Theme implementation & 8. Light vs dark comparison

- **Provider:** none (no context). `App.tsx:32-40` toggles `document.body.classList` `light-mode` and persists `localStorage['theme-mode']`; default **dark**.
- **Attributes/classes:** single `body.light-mode` class. **No** `[data-theme]`, `html.light`, `.light` wrapper.
- **CSS variables:** dark brand tokens in `@theme` (`--color-brand-teal #cbad8e`, `--color-brand-red #a68475`, `--color-sand #d1c7bc`, `--color-space-dark #3a2c26`, …). Light tokens scoped to `.light-mode` (`--lm-bg #f9fafb → --lm-panel #f3ede4 → --lm-card #d1c7bc → --lm-card-active #cbad8e`, text ramp `#3a2c26/#6b564a/#6f5b4e`). Evidence: `src/index.css`.
- **Shared vs theme layout:** **light mode overrides only color/border/shadow/background** — it sets **zero** layout properties (`padding/margin/height/min-height/align/justify/place/position/top/transform/width/gap`). Verified: no such property inside any `.light-mode` selector. **⇒ Light and dark share identical dimensions; theme switching causes no layout shift.**

**Spacing problems in Programs / Core Team / Advisory — root cause (Confirmed):**
- These are **not** light-mode-specific spacing. Layout is shared. The **visible** breakage in light mode was caused by **two Tailwind selector collisions** that were recently **fixed** in `4c76361`:
  1. `.light-mode .grid { background-color: … }` collided with Tailwind's `display:grid` utility → painted a solid tan block behind **every** grid (18/18). **Removed.**
  2. `.light-mode .from-transparent / .to-transparent` collided with gradient-stop utilities → painted transparent overlays solid off-white (19/20), covering the hero photo, card images, and section fades. **Removed.**
- Residual shared spacing (identical in both themes, not a bug): section padding `py-12 sm:py-16` (uniform, 9 sections), container `w-[90%] mx-auto` (uniform, 12 uses), heading→content `mb-20` (uniform, 6 sections), 4-col card gaps normalized to `gap-6`. Navbar offset `scroll-padding-top: 120px` clears the ~100px fixed nav.
- **Answers:** Is it light-mode-specific? **No.** Shared spacing more visible in light? **Yes.** Do any light selectors change dimensions? **No.** Files/selectors involved (already addressed): `src/index.css` `.light-mode` block. No open spacing root-cause remains after `4c76361` beyond the uniform (intentional) `mb-20`/`py` rhythm.

---

## 9. Responsive / visual inspection

**Method & limitation (honest):** Inspected live via browser automation at the running dev server. **Desktop (~1440–1536px) light + dark confirmed.** Attempts to force **390/768/1024px** viewports via window resize did **not** shrink the page (`innerWidth` stayed 1536) — so **sub-desktop rendering was NOT visually confirmed**; those widths are assessed from code only.

| Check | Desktop light | Desktop dark | Tablet/Mobile (390/768/1024) |
|---|---|---|---|
| Horizontal overflow | None (`scrollWidth 1530 ≤ viewport`) | None | **Not confirmed live** |
| Navbar overlap | None (opaque nav, 120px offset) | None | Coded (mobile menu exists) — not confirmed |
| Missing/broken images | Gallery/card images render (post-fix) | render | not confirmed |
| Placeholder content | Advisor/gallery stock photos, partner icons, hero placeholder | same | same |
| Theme switching | No layout shift | — | — |
| Hero (light) | **Plain off-white placeholder by decision** (photo hidden) | full photo | — |

Responsive foundation exists in code: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, `sm:`/`md:`/`lg:` breakpoints throughout, and a dedicated mobile hamburger menu (`Header.tsx`). **Recommend a real device-width pass before shipping.**

---

## 10. Requirements comparison

> ⚠️ **The requirements document `MENA Website Update Notes (1)(1).docx` is NOT present** in the repo (or its parent folder). Classification below is against the **item list provided in the request** and the repository; exact spec details from the doc could not be verified.

| Requirement | Status | Evidence |
|---|---|---|
| Official beige branding | **Implemented** (spec unverifiable w/o doc) | `@theme` + `.light-mode` tokens in `index.css` (beige `#d1c7bc`, gold `#cbad8e`, brown `#3a2c26`) |
| Official colors | **Implemented** | rebrand commit `bd8f4f5` |
| Typography consistency | **Implemented** | Raleway (headers+body), JetBrains Mono (labels) — `index.css` `@theme` fonts |
| Spacing consistency | **Implemented** | uniform `py-12 sm:py-16`, `w-[90%]`, `mb-20`; collisions fixed in `4c76361` |
| Team Heads photos | **Missing** | `TeamDepartment` type has no photo field; `Teams.tsx` shows an icon, not a portrait |
| Updated Team Heads | **Needs clarification** | 10 lead names in `data.ts:118-219`; currency/accuracy unverifiable |
| Existing content migration | **Needs clarification** | requires the doc to know source content |
| THIS YEAR → LAST YEAR | **Missing / N/A** | 0 hits; site uses absolute dates (e.g. "NOVEMBER 2024") |
| MENA Space Game Challenge page | **Missing** | 0 hits |
| Space Game hero | **Missing** | 0 hits |
| About section | **Implemented** | `About.tsx` (`#about`) |
| Event highlights | **Missing** | no events content |
| Event journey | **Missing** | — |
| Winners | **Missing** | 0 hits |
| Gallery | **Partially implemented (Placeholder)** | `GALLERY_DATA` 8 items; 3 are stock |
| Partners and sponsors | **Partially implemented** | `PARTNERS` 8 (icon placeholders); sponsors not separated |
| Event impact | **Missing** | — |
| Achievements nav item | **Missing** | not in `Header.tsx` navLinks |
| Achievements page | **Missing** | 0 hits |
| Research Papers section | **Missing** | 0 hits |
| Research cards | **Missing** | — |
| Dynamic research-paper routes | **Missing / Blocked by decision** | no router exists |
| Authors | **Missing** | — |
| Conference data | **Missing** | 0 hits |
| Abstracts | **Missing** | 0 hits |
| Categories | **Missing** | — |
| Publication status | **Missing** | — |
| Related team members (research) | **Missing** | — |
| External links (research) | **Missing** | — |
| Activities section | **Missing** | only a dropdown label |
| Existing chatbot | **Partially implemented (Blocked)** | `Chatbot.tsx` (Gemini 2.5 Flash + `mena_kb.txt`); blocked by env-var mismatch |
| Requested agent functionality | **Needs clarification** | scope defined only in the doc |

**Tally:** Implemented **5** · Partial **3** · Missing **21** · Needs clarification **3**.

---

## 11. Current problems (prioritized)

**1. Existing regressions:** none open — the light-mode collision bugs were fixed in `4c76361` (verified live).

**2. Layout problems:** none functional. Uniform `mb-20` (80px) heading gap is large-but-consistent (design choice, both themes).

**3. Theme problems:** none open (color-only system; verified no layout divergence).

**4. Responsive problems:** **Unverified at 390/768/1024** (High to confirm before ship) — automation couldn't force sub-desktop widths.

**5. Content problems (High/Medium):**
- Advisor avatars = **Unsplash stock** (`data.ts:221-258`). Placeholder.
- Gallery items 6-8 = **stock** (`MissionGallery.tsx`). Placeholder.
- Partner "logos" = **Lucide icons**, no real logos (`Partners.tsx`). Placeholder.
- Team Head **photos absent**; lead names possibly stale.
- Contact info = placeholder WhatsApp/social.

**6. Technical debt (Medium/Low):**
- **Contact form has no backend** — `Contact.tsx:18-27` only `preventDefault` + timed fake success; submissions are discarded. *(Functional, High.)*
- **Chatbot env-var mismatch** — code reads `VITE_GEMINI_API_KEY` but `.env.example`/README say `GEMINI_API_KEY`; chatbot won't authenticate unless the `VITE_`-prefixed var is set. *(Functional, High.)*
- **2.09 MB `Mena-logo.png`** bundled into JS assets; **528 KB** JS chunk, no code-splitting.
- **Duplicate assets** — identical PNGs in `src/assets/images` and `public/images`.
- **Unused nested backend** — `mena-chatbot-main/mena-chatbot-main/` (Python `app.py`/`chatbot.py` + a Next.js `pages/api/chat.js`) is committed but **not wired** to the React app (which calls Gemini directly).
- **No 404/error route, no per-page SEO, no tests.**

**7. Missing requirements:** see §10 (21 missing, mostly whole new sections/pages).

**Critical/High issue count:** **0 Critical, 2 High** confirmed defects (Contact backend; Chatbot env var) + responsive-unverified. (Missing features tracked separately in §10.)

---

## 12. Reusable foundation

| Foundation | Verdict | Evidence |
|---|---|---|
| Layout system (`section py-12 sm:py-16` + `w-[90%] mx-auto`) | **Reuse as-is** | uniform across 9 sections |
| Card system (cream panel, `rounded-2xl`, border) | **Reuse / extend** | Programs/Teams/Advisory/Donation cards |
| Page-header pattern (eyebrow + `h2` + divider + `mb-20`) | **Reuse / extend** | repeated in every section |
| Gallery + lightbox | **Reuse / extend** (strong) | `MissionGallery.tsx` (grid, categories, lightbox) — good base for event galleries |
| Data structures (typed arrays + `types.ts`) | **Reuse / extend** | `data.ts` + `types.ts`; add `Event`, `ResearchPaper`, `Achievement`, `TeamMember(photo)` types |
| Dynamic routing | **Must be added** | none exists — required for research/event/team-member detail pages |
| SEO / metadata utilities | **Must be added** | only static `index.html` `<title>`; no per-view meta |
| Form infrastructure | **Refactor (add backend)** | `Contact.tsx` UI reusable; needs a submit target |
| Theme implementation | **Reuse as-is** | color-only token system, now stabilized |
| Animation utility (`ScrollReveal`) + canvas FX (`Starfield`, `Mars3D`) | **Reuse as-is** | self-contained |

---

## 13. Missing information (must answer before implementation)

**Team:** Current & correct Team-Head names/roles? Team-Head **photos** (assets)? Full member lists per department, or heads only? *(Blocks: Team, member pages. Placeholder acceptable? No for names/photos. Priority: High.)*
**Research papers:** Real papers — titles, authors, abstracts, conference, categories, publication status, related team members, external links? *(Blocks: Research section + dynamic routes. Placeholder? Partial. Priority: High.)*
**Space Game:** Content for the MENA Space Game Challenge page — hero, about, highlights, journey, winners, gallery, sponsors, impact? *(Blocks: Space Game page. Priority: High.)*
**Achievements:** List/definition of achievements + whether a nav item + dedicated page. *(Blocks: Achievements. Priority: High.)*
**Events:** Are events part of Space Game or a separate section? Event-detail routes needed? *(Blocks: Events. Priority: Medium-High.)*
**Partners & sponsors:** Real logo assets; is "sponsors" distinct from "partners"? *(Blocks: Partners. Placeholder? Yes short-term. Priority: Medium.)*
**Organization content:** Are `IMPACT_STATS`, mission phases, contact email/WhatsApp/social current? *(Blocks: About/Contact accuracy. Priority: Medium.)*
**Navigation & structure:** Final nav order incl. new items (Achievements, Research, Space Game, Activities)? *(Blocks: Header. Priority: High.)*
**Chatbot / agent:** Desired "agent functionality" beyond current KB Q&A? Which env var is authoritative? *(Blocks: Chatbot. Priority: Medium.)*
**Technical decisions:** **Introduce a router** (React Router) to support multi-page + detail routes and SEO? Keep SPA or go hybrid? Add a Contact-form backend (email/service)? *(Blocks: all new pages. Priority: Critical to decide first.)*

---

## 14. Confirmed facts
- Single-page React 19 / Vite 6 / TS / Tailwind v4; no router; build + type-check pass.
- Theme is color-only (`body.light-mode`); no layout differs by theme (verified in `index.css`).
- 17 components + `App`; content hardcoded in `data.ts` / component-local arrays; bilingual inline.
- Space Game, Achievements, Research Papers, Events, Activities, team-member/detail pages, 404 = **absent** (0 refs).
- Contact form has no backend; Chatbot env var mismatches config; requirements `.docx` not in repo.

## 15. Assumptions and uncertainties
- **Assumption:** the beige palette/typography in the repo matches the doc's "official identity" (unverified — doc absent).
- **Uncertainty:** whether team-head names/impact-stats/contact details are current (plausible but unverifiable).
- **Uncertainty:** live responsive rendering at 390/768/1024 (automation couldn't force those widths).
- **Assumption:** the nested `mena-chatbot-main` backend is legacy/unused (the React app calls Gemini directly).

## 16. Recommended immediate next step
Before any build work: **(a)** obtain the `.docx` + real content/assets (team heads + photos, research papers, space-game, achievements, events, partner logos), and **(b)** make the one architectural decision everything else depends on — **whether to add a router** (multi-page/detail routes + per-page SEO) or stay single-page. In parallel, the two cheap functional fixes (Contact-form backend target and the Chatbot `VITE_GEMINI_API_KEY` env alignment) can be scheduled. **No code was changed for this audit.**
