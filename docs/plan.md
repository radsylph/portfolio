# Portfolio — Build Plan

A multi-language (EN/ES), data-driven developer portfolio for **Andres Alvarez**, generated from a JSON Resume file (`docs/cv.json`) with one file per locale. Visual theme: minimalist layout with **glassmorphic** surfaces and **subtle Frutiger Aero** accents, on a flat neutral background.

Source of truth for terminology: [`CONTEXT.md`](../CONTEXT.md).

---

## 1. Locked design decisions

| # | Decision | Choice |
|---|---|---|
| 1 | Page type | Single page (one `index.astro` serving both locales) |
| 2 | Sections | Hero, Experience, Skills, Education, Languages, Contact |
| 3 | Experience layout | Reverse-chronological **timeline** (not case-study cards) |
| 4 | Locales & URLs | `en` (default) + `es`; both prefixed → `/en/`, `/es/`; `/` → `/en/` |
| 5 | i18n data | Per-locale JSON: `src/data/cv.en.json` + `cv.es.json`, plus a UI-strings dictionary |
| 6 | Styling | Tailwind CSS |
| 7 | Visual theme | Glassmorphism + subtle Frutiger Aero accents **as the main theme**, aqua/teal accent, flat neutral background |
| 8 | Navbar | Horizontal top nav, pins to top on scroll |
| 9 | Theme mode | Light-first with dark-mode toggle (system-detected default) |
| 10 | Typeface | Rounded humanist: **Sora** (headings) + **Inter** (body) |
| 11 | Projects | Omit for now (structure ready to add later) |
| 12 | Status badge | "Available for work" indicator in hero |
| 13 | Social links | GitHub + email only (no phone on the public page) |
| 14 | Language toggle | EN/ES in the navbar |
| 15 | CV download | Omitted (deferred; can revisit) |
| 16 | Hero image | None — initials **monogram** |
| 17 | Deployment | Vercel (static) |

---

## 2. Information architecture

Single page, section order and nav mapping:

```
Hero          (id="home" / top)     → name, role, summary, monogram, "Available for work", CTA, socials
Experience    (id="experience")      → work[] timeline (reverse-chronological)
Skills        (id="skills")          → 5 Skill groups as glass cards with Skill tags
Education     (id="education")       → education[] (single entry)
Languages     (id="languages")       → languages[] (Spanish, English)
Contact       (id="contact")         → email + GitHub
Footer                                → socials, locale, theme, copyright
```

Navbar items: `Experience · Skills · Education · Languages · Contact` + `EN/ES` toggle + theme toggle. (No "Home" link needed — logo/monogram returns to top.)

---

## 3. Content model & data

### 3.1 Data source

Copy the current `docs/cv.json` into `src/data/cv.en.json` and normalize it. `cv.es.json` is a stub until the Spanish copy is provided (see §8).

**Normalization required:** in `docs/cv.json`, `skills[].keywords` values are each a single comma-separated string (e.g. `"React, Angular, TypeScript, …"`). Split each into an array of individual `Skill tag`s at the data layer (so templates render clean chips). Also drop the redundant `basics.url` (GitHub is already in `basics.profiles`).

### 3.2 CV → UI field mapping

| UI element | CV field(s) |
|---|---|
| Hero — name | `basics.name` |
| Hero — role | `basics.label` |
| Hero — summary | `basics.summary` |
| Hero — location | `basics.location.address` |
| Hero — email CTA | `basics.email` |
| Hero/Contact — socials | `basics.profiles[]` (GitHub) |
| Experience entry | `work[]` → position, name, location, `startDate`/`endDate`, `summary`, `highlights[]` |
| Skill group | `skills[].name` |
| Skill tag | `skills[].keywords[]` (post-normalization) |
| Education entry | `education[]` → institution, area, studyType, startDate/endDate, score |
| Language entry | `languages[]` → language, fluency, summary (EFSET link) |

### 3.3 UI strings

Nav labels, section headings, the badge, CTA, and footer text live in a locale dictionary (`src/i18n/ui.ts`), keyed by locale — separate from the CV content JSON. `t(key)` helper selects by `Astro.currentLocale`.

---

## 4. i18n architecture

- **Routing:** Astro built-in i18n — `defaultLocale: 'en'`, `locales: ['en', 'es']`, `routing.prefixDefaultLocale: true`. `src/pages/[lang]/index.astro` generates `/en/` and `/es/`; `src/pages/index.astro` redirects `/` to `/en/`.
- **Data selection:** resolve `Astro.currentLocale` → load `cv.{locale}.json` + `ui.ts` strings.
- **Toggle:** `<a>` links to the alternate locale (`/es/` ↔ `/en/`), not client-side state — preserves real URLs.
- **`<html lang>`** set per locale; Astro handles `Accept-Language`-aware redirection.
- **Dates:** always `Intl.DateTimeFormat(Astro.currentLocale, { month: 'long', year: 'numeric' })` for work/education ranges — never hardcoded.
- **`translate="no"`** on brand names, code tokens, and `Skill tag`s to prevent auto-translation mangling.

---

## 5. Visual design system

### 5.1 Palette (draft — final tokens in the theme phase)

| Token | Light | Dark |
|---|---|---|
| Background | near-white neutral (e.g. `#f6f7f9`) | near-black with cool tint (e.g. `#0d1117`–`#0f172a`) |
| Text primary | `#0b1220`-ish | `#e6edf3`-ish |
| Text muted | `#55606e`-ish | `#8b949e`-ish |
| Accent (aqua/teal) | `#14b8a6`–`#22d3ee` range | same, slightly brighter |
| Glass tint | `rgba(255,255,255,0.55)` | `rgba(17,24,39,0.55)` |
| Glass border | `rgba(255,255,255,0.4)` | `rgba(255,255,255,0.08)` |

### 5.2 Glass recipe

Since the background is **flat**, the "glass" reads via translucent tint, a soft border, and a specular highlight — not heavy backdrop blur. Single reusable `.glass` utility:

```css
.glass {
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  backdrop-filter: blur(14px) saturate(150%);
  border: 1px solid var(--glass-border);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.35); /* top highlight */
}
```

### 5.3 Frutiger Aero accents (subtle)

- Faint aqua **radial-gradient glow** tucked into a corner of each glass card.
- Glossy **top-edge highlight** on cards and the navbar.
- Soft specular highlights on the monogram and primary button.
- Kept restrained: no bubbles, no heavy skeuomorphism, no animated background (flat per Q1).

### 5.4 Type

- **Sora** — headings (`h1`–`h3`), self-hosted, `font-display: swap`.
- **Inter** — body/UI, self-hosted, `font-display: swap`.
- `text-wrap: balance` on headings; `font-variant-numeric: tabular-nums` where date ranges align.

### 5.5 Motion

- Subtle hover lifts and the theme/scroll transitions only; animate `transform`/`opacity` (never `transition: all`).
- Everything motion-related honors `prefers-reduced-motion`.

---

## 6. Component breakdown

| Component | Role | Interactive? |
|---|---|---|
| `Layout.astro` | HTML shell, `<html lang>`, meta, `color-scheme`, fonts | — |
| `Navbar.astro` | Sticky top nav, anchors, toggles | yes (scroll-pin) |
| `LanguageToggle.astro` | EN/ES links | links |
| `ThemeToggle.astro` | Light/dark, persisted, system default | yes (tiny script) |
| `Monogram.astro` | Initials mark | — |
| `Hero.astro` | Name, role, summary, badge, CTA, socials | — |
| `Section.astro` | Shared heading + glass wrapper | — |
| `ExperienceTimeline.astro` | work timeline | — |
| `Skills.astro` | Skill groups + tags | — |
| `Education.astro` | education entry | — |
| `Languages.astro` | language entries | — |
| `Contact.astro` | email + GitHub | — |
| `Footer.astro` | socials, copyright | — |

No React/Vue needed — this is static; only a couple of `<script>` islands for theme persistence and the mobile menu.

---

## 7. Proposed file structure

```text
src/
├── data/
│   ├── cv.en.json          # normalized copy of docs/cv.json
│   └── cv.es.json          # stub → Spanish copy (pending)
├── i18n/
│   ├── ui.ts               # UI-strings dictionary (en/es)
│   └── utils.ts            # t(), formatDate()
├── styles/
│   └── global.css          # Tailwind import, @theme tokens, .glass
├── components/
│   ├── Navbar.astro
│   ├── LanguageToggle.astro
│   ├── ThemeToggle.astro
│   ├── Monogram.astro
│   ├── Hero.astro
│   ├── Section.astro
│   ├── ExperienceTimeline.astro
│   ├── Skills.astro
│   ├── Education.astro
│   ├── Languages.astro
│   ├── Contact.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro
└── pages/
    ├── index.astro         # redirects `/` to `/en/`
    └── [lang]/
        └── index.astro       # generates `/en/` and `/es/`
```

`astro.config.mjs` gains the `i18n` block and the `@tailwindcss/vite` plugin.

---

## 8. Web Interface Guidelines — compliance checklist

Apply these during implementation and run the `web-design-guidelines` review on the components before shipping.

- **Accessibility**
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`); one `<h1>` (hero name); hierarchical `h2`/`h3` after; skip link to `#main`.
- `scroll-margin-top` (`scroll-mt-24`) on all sections so the pinned navbar doesn't cover anchors.
- Icon-only controls (`ThemeToggle`, mobile menu) get `aria-label`; decorative icons `aria-hidden="true"`.
- Links for navigation, `<button>` for toggles — never `<div onClick>`.

- **Focus & interaction**
- Visible `:focus-visible` outline on all links/buttons via a global rule; no bare `outline-none`.
- Hover + active states with increased prominence.

**Motion & touch**
- `prefers-reduced-motion` honored for hover lifts and transitions.
- `touch-action: manipulation`; intentional `-webkit-tap-highlight-color`.

**i18n & typography**
- `Intl.DateTimeFormat` for all dates; `translate="no"` on brand/code/tags.
- Curly quotes, `…` (not `...`), `text-wrap: balance` on headings, Title Case headings (English copy conventions; Spanish localized separately).

**Theming**
- `color-scheme: light dark` + per-theme `color-scheme`; `<meta name="theme-color">` matched to background.

**Performance**
- Preload critical fonts + `font-display: swap`; minimal JS (theme/menu only); static output on Vercel.

**N/A (noted, not applicable):** no forms, no images (beyond favicon), no large lists, no video.

---

## 9. Milestones

1. **Scaffold & i18n** — `astro add tailwind`; create `src/data/` (normalized `cv.en.json`, `cv.es.json` stub), `src/i18n/`, `astro.config.mjs` i18n. Verify `/en/` + `/es/` build and `/` redirects.
2. **Data layer & layout** — TS types for the CV shape, `t()`/`formatDate()` helpers, `Layout.astro` (meta, fonts, `lang`, `color-scheme`).
3. **Content sections** — Hero, Experience, Skills, Education, Languages, Contact, Footer wired to real data.
4. **Visual theme** — `global.css` tokens (palette, glass recipe, fonts, dark mode), Frutiger Aero accents.
5. **Nav & interaction** — sticky navbar, anchors, EN/ES toggle, theme toggle (persisted), mobile menu.
6. **Compliance & SEO** — Web Interface Guidelines pass, `web-design-guidelines` review, meta/OG, favicon.
7. **Review & deploy** — `astro build`, preview, deploy to Vercel.

---

## 10. Open items / follow-ups

- **Spanish content:** provide `cv.es.json` (and any Spanish UI-string preferences) — §3/§7 assume it.
- **Additional socials:** LinkedIn / X can be added by extending `basics.profiles` later.
- **Projects section:** add once project data exists (components are structured to slot it in).
- **CV download (PDF):** deliberately omitted per decision #15; trivially re-addable.
- **Exact accent/neutral hex values:** finalized during milestone 4.
