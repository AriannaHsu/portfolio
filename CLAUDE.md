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

**`docs/design.md` is the source of truth** ("Orchard" system, mirrored from the Figma file `KUm3lGWuGZPXJQaI71Y26N`). Read it before building UI. In short:

- **Zones:** sky (hero + nav, `#E0F7FF`→`#ADEAFF`) → earth (projects, `#E49851`) → basket (footer, `#F4F3EF`). Watercolor illustrations on a site-wide paper texture; no drop shadows.
- **Type:** Chewy (headings) · Butterfly Kids (hero script only) · MADE Okine Sans (body; Outfit fallback until licensed) · Space Mono (tags).
- **Accessibility:** WCAG 2.2 AA is required. Several palette colors only pass contrast at 24px+; check the Contrast column in `design.md` before using a color.

Status: the hero, nav and paper texture follow the new system. The project cards, footer and other pages still use the old lavender/off-white styling from the starter (`--bg-base`, `--accent`, etc. in `src/index.css`), and those should be migrated.

## Site structure (intended — partially scaffolded)

- **Home/Work** — hero (tagline + interactive visual hook) + case study card grid
- **About** — experience, skills, personal interests
- **Case Studies** — individual pages per project via `/work/:slug`
- **Basket** (`/gallery`, was "Play") — interactive/experimental mini-projects
- Resume download and Email/LinkedIn links should be globally accessible (nav + footer), not a standalone page

See `docs/portfolio-website-brief.md` for the full content and interaction brief.
