# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint (JS/JSX)
```

No test suite exists yet.

## Architecture

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 + React Router v7. Plain JSX (no TypeScript).

**Routing** (`src/App.jsx`):
- `/` → `src/pages/Home.jsx` — project grid
- `/about` → `src/pages/About.jsx`
- `/work/:slug` → `src/pages/CaseStudy.jsx` — reads slug from URL, looks up project data

**Project data** (`src/data/projects.js`): Single source of truth for all case studies. Each entry has `slug`, `title`, `tagline`, `tags`, `year`, `coverImage`, `overview`, and `sections[]`. `getProject(slug)` is the lookup helper used by `CaseStudy`.

**Styling:** Tailwind utility classes are the primary styling mechanism. `src/index.css` imports Tailwind and defines CSS custom properties (`--text`, `--bg`, `--accent`, etc.) and base typography. `src/App.css` has component-level styles for the Vite starter scaffold — these should be replaced as the portfolio UI is built out.

## Design system

The intended visual direction is documented in `docs/design.md` and `docs/portfolio-website-brief.md`. **The design tokens in `design.md` are not yet applied** — `src/index.css` still contains the Vite starter template's color/font variables, not the portfolio's. When building UI, use the values from `design.md`:

| Token | Value |
|---|---|
| Page background | `#F4F1EC` (warm off-white) |
| Card/surface | `#F9F6F0` |
| Dividers | `#E3DFD5` hairlines — no borders/shadows |
| Primary text | `#2C2A28` (warm charcoal) |
| Secondary text | `#8A857D` |
| Accent | `#C9B8E8` (soft lavender — underlines/small accents only, never a large block) |
| Accent hover/text | `#5A4E85` |

**Typography:** Perfectly Nineties (headers, fallback Georgia) / Suisse (body) / Nimbus (nav, footer, hover). These fonts are not yet loaded — add them via `@font-face` or a font hosting service.

**CTA style:** Text link with colored underline ("Download resume →"), not filled buttons.

**Personality layer:** Minimal, editorial base — warmth comes from one or two well-placed interactive moments (hero section, footer), not from color or busyness.

## Site structure (intended — partially scaffolded)

- **Home/Work** — hero (tagline + interactive visual hook) + case study card grid
- **About** — experience, skills, personal interests
- **Case Studies** — individual pages per project via `/work/:slug`
- **Play** — interactive/experimental mini-projects (not yet created)
- Resume download and Email/LinkedIn links should be globally accessible (nav + footer), not a standalone page

See `docs/portfolio-website-brief.md` for the full content and interaction brief.
