# Design system — Orchard

Source of truth: Figma file **Design Portfolio** (`KUm3lGWuGZPXJQaI71Y26N`), page **design system** (text styles) and the **combined work page** frame (`55:1747`) for colors and components. Token names below match the Figma variable names; CSS custom properties use the same name with `/` → `-`.

## Direction

**Why:** I design to keep humans at the center of technology. The theme is **human flourishing**: fruit that blooms, ripens and gets harvested. The site should feel made by a person, not generated, while still reading as a modern, well-crafted product.

**Two layers, kept distinct:**
- **Human layer (content, world, story):** watercolor paintings on watercolor paper. Visible brush texture, uneven edges and pigment blooms are good, because they're the proof of a hand. No glossy gradients, 3D renders, stock illustration or anything that reads as generic AI art.
- **Modern layer (interface):** liquid-glass nav and precise microinteractions with spring physics, crisp focus states and fast responses. The interface is clean so the painted world can be imperfect.

The page reads top to bottom as an orchard: **sky** (hero, nav) → **earth** (project section) → **basket** (footer). One story runs through it: fruit grows on the tree, you pick it, it goes in your basket, and the footer thanks you for "checking out my basket."

- No drop shadows and no hard outlines on illustrations.
- Each zone has its own palette; don't mix sky colors into the earth section or the reverse. The one exception is the fruit: apple orange (`text/sky-accent`) highlights key words in the hero tagline, like the apples on the tree.
- Personality comes from a few interactive moments (apple tree, typed tagline, small microinteractions), not from adding more decoration.
- Litmus test for any new element: *does this feel touched by a person, or does it feel like a template?* Painted things should feel touched; interface chrome should feel effortless.

## Color

### Tokens (Figma variables)

| Figma variable | Hex | Use | Contrast |
|---|---|---|---|
| `background/base` | `#F4F3EF` | Page and footer background (warm paper white) | — |
| `background/projects` | `#E49851` | Project section background (earth orange) | — |
| `fill/surface` | `#FFFFFF` | Card thumbnail surface | — |
| `fill/action-sky` | `#0C7DA5` | Active nav chip, primary action fill (sky zone) | white text on it: 4.67 ✅ |
| `fill/action-earth` | `#783A00` | Active nav chip (earth zone) | white text on it: 8.7 ✅ |
| `fill/navigation-glass` | `#FFFFFF33` | Nav pill background (white 20%, frosted) | — |
| `text/primary` | `#000000` | Footer headings, primary text on base | 18.9 on base ✅ |
| `text/secondary` | `#4C4B4B` | Footer links, secondary text on base | 7.8 on base ✅ |
| `text/inverse` | `#FFFFFF` | Text on `fill/action-sky` | 4.67 ✅ |
| `text/sky` | `#0B749A` | Hero copy | 4.0 on sky ⚠️ **24px+ only** |
| `text/sky-navigation` | `#095F7D` | Nav links; any sky-zone text under 24px | 5.4 on sky ✅ |
| `text/sky-accent` | `#A8460F` | Highlighted words in the hero tagline (apple orange, darkened for contrast). Code-only for now (`--sky-accent`); not yet a Figma variable | 5.3 on `#E0F7FF` · 4.5 on `#ADEAFF` ✅ |
| `text/earth` | `#783A00` | Card titles, footer headline, copyright line | 7.9 on base ✅ · 3.7 on projects ⚠️ **24px+ only** |
| `text/on-orange` | `#482200` | Card descriptions and tags on `background/projects` | 5.9 on projects ✅ |
| `border/subtle` | `#854D18` | Footer top border, tag outlines | 2.9 on projects ⚠️ decorative only |
| `border/earth` | `#783A00` | Bottom footer bar divider | — |

### Colors used outside the variable set

| Name | Hex | Use |
|---|---|---|
| Sky gradient | `#E0F7FF` → `#ADEAFF` | Hero background, radial from the upper left |

### Rules
- On the orange project section, body text is always `text/on-orange`. `text/earth` is only for card titles at 24px or larger.
- `text/sky` passes only for large text. Anything under 24px in the sky zone uses `text/sky-navigation`.
- `border/subtle` doesn't meet 3:1 on orange, so it can't be the only thing that shows a control's boundary. Tags work because their text carries the meaning.

## Typography

| Figma style | Font | Size / line height | Use |
|---|---|---|---|
| — (hero only) | **Butterfly Kids** | 120 / auto | "Human Flourishing" script. Hero only, never body copy. |
| `heading/h1` | **Chewy** | 64 / 72 | Page titles |
| `heading/h2` | **Chewy** | 48 / 56 | Section headlines |
| `heading/h3` | **Chewy** | 32 / 40 | Subsections, and the curved footer headline "let's plant seeds together…". The hero eyebrow and tagline reuse the 32px size in MADE Okine Sans. |
| `heading/card` | **Chewy** | 24 / 32 | Project card titles (the work page currently sets these at 32px) |
| `body/large` | **MADE Okine Sans** | 20 / 30 | Nav links, footer column headings, lead text |
| `body/default` | **MADE Okine Sans** | 16 / 24 | Body copy, footer links, copyright |
| `body/small` | **MADE Okine Sans** | 14 / 22 | Captions, metadata |
| `tag/default` | **Space Mono** | 12 / 18 | Tags (the card component currently uses 16px) |

All weights are Regular (400). Letter-spacing is 0 throughout. Text is lowercase in the nav and hero script (rendered capitalized), and sentence case elsewhere.

**Font sourcing**
- Chewy, Butterfly Kids, Space Mono: Google Fonts.
- **MADE Okine Sans is a personal-use license.** Until a commercial license is bought, the site uses **Outfit** as the fallback (`--font-sky` in `src/index.css`). Once licensed, add the `@font-face` and it takes over automatically.

## Spacing, layout, radius

- **Frame:** designed at 1440px wide. Content column is 1096px (172px side margins).
- **Spacing:** `space/80` = 80px for section padding top and bottom. Elsewhere: 40px grid gaps and footer padding, 16px inside cards, 8px between tags, 15px between footer links.
- **Project grid:** 2 columns of 528px with a 40px gap, so 40px between rows too.
- **Radius:** cards 22px · nav pill 40px · nav chip 32px · tags 16px.
- **Elevation:** none for content. Separate things with color zones, hairline borders (`border/subtle`, `border/earth`) and the ground-strip illustration between sky and earth. No drop shadows. The one exception is the glass nav, which gets a soft tinted contact shadow so it reads as a layer floating above the page.

## Components

### Nav
- **Liquid glass** pill centered at the top, sticky on scroll. Padding 8 / 16, radius 40.
  - Glass: 66% white tint, backdrop blur + 180% saturation, a specular rim (bright at the top, fading round the sides), and a soft sheen across the upper half.
  - In Chromium browsers the rim also **refracts** what's behind it (SVG displacement filter, `src/components/LiquidGlassFilter.jsx`). Safari and Firefox get the frosted version without refraction.
  - The tint is a contrast requirement, not a style choice: at 66%, `text/sky-navigation` stays ≥4.5:1 over sky, orange and mid-brown. Don't make the glass clearer without re-checking.
  - Figma's `fill/navigation-glass` (white 20%) is too clear to pass contrast over the orange section; update the variable to match.
- **Changes color with the zone underneath** (Figma `49:1138`). Sections declare their zone with `data-nav-theme`, and the nav reads whichever one is under its centre as you scroll. Colors cross-fade over 0.4s.

  | Theme | Used over | Links | Active droplet | Glass tint | Link contrast |
  |---|---|---|---|---|---|
  | `sky` (default) | hero, pages without a zone | `text/sky-navigation` #095F7D | `fill/action-sky` #0C7DA5 | 66% white | ≥4.6:1 over sky, orange, mid-brown |
  | `earth` | project section, footer | `text/on-orange` #482200 | `fill/action-earth` #783A00 | 30% white | ≥5.4:1 over orange, mid-brown |

  When adding a new section, give it `data-nav-theme` and check link contrast against the glass at that tint.
- Links: `work` · `about` · `basket`, `body/large`, colored per theme above. The active link sits on a `fill/action-sky` "droplet" with `text/inverse`, padding 4 / 16, radius 32. The droplet **springs** between links when the page changes. Pressed links shrink to 94%.
- `basket` bumps when an apple lands in it. There is no count badge; the count is only announced to screen readers.

### Hero (sky zone)
- Sky gradient, watercolor apple tree on the right, painted ground strip along the bottom edge.
- Copy block, centered text: eyebrow "Arianna's designing for" (32px, `text/sky`) → "Human / Flourishing" in Butterfly Kids, staggered left then right → typed tagline (32px, `text/sky`) with an arrow link to the project it describes.
- **Interaction:** apples wiggle on hover. Click or tap one to drop it; it flies into the nav `basket`, and a new apple grows back after about 3 seconds. The tagline types one line per project and pauses on hover or focus.

### Project card (earth zone)
- Vertical stack, 16px gap: white thumbnail (`fill/surface`, radius 22, about 4:3) → title (`heading/card`, `text/earth`) → one-line description (`text/on-orange`, 24px in Figma) → tag row.
- Tags: Space Mono, `text/on-orange`, padding 4 / 8, radius 16, hairline `border/subtle` outline.

### Footer (basket zone)
- `background/base`, top border `border/subtle`, 40px vertical padding.
- "thanks for checking out my basket!" (`body/large`, `text/primary`) above "let's plant seeds together for a better tomorrow" (`heading/h3` size, still an `<h2>` element since it heads the footer; `text/earth`, **set on a curve**, per the Figma annotation).
- The watercolor basket of apples is centered, with **Navigation** (Work · About · Basket) on its left and **Connect** (LinkedIn · Email · Resume) on its right. Headings are `body/large` `text/primary`; links are `body/default` `text/secondary`.
- Bottom bar: `border/earth` divider, 40px padding, "© 2026 Arianna Hsu" left and "Created by Him to Create" right, `body/default` `text/earth`.
- Resume and Email live here and in the nav area. There is no standalone resume page.

## Texture & imagery

- **Watercolor paper:** one tileable paper image (`src/assets/paper.webp`) overlays the whole site with `mix-blend-mode: multiply` (Figma: paper tiles at 20% over each section). It's paper texture only: no deckled or torn edges on cards or sections.
- **Illustrations:** watercolor, warm and slightly desaturated (sage leaves, terracotta bark, red and orange apples). Export from Figma as PNG at 2x, then convert with `npm run webp -- "<file>"`.
- **Thumbnails:** sit on a white `fill/surface` card so the work reads clearly against the orange.

## Motion

- Motion is playful but brief: springy pops (`cubic-bezier(.34, 1.56, .64, 1)`), gentle wiggles, gravity-like drops. Nothing loops constantly except the typing caret.
- Interactive motion lives in the hero (apple tree, tagline) and the nav (basket bump). The rest of the page stays still.
- Every motion has a reduced-motion version (see Accessibility).

## Accessibility (non-negotiable)

Everything ships to **WCAG 2.2 Level AA**. Personality never comes at the cost of access: every interactive moment must work for keyboard, screen reader, and reduced-motion users.

### Color & contrast
- Body text and UI labels: **4.5:1** minimum against their actual background (including texture and gradients).
- Large text (24px+ regular, or 18.66px+ bold): **3:1** minimum.
- Non-text UI (focus rings, input borders, icons that carry meaning): **3:1** minimum.
- Never use color alone to convey meaning (pair with text, icon, or shape).
- Record the ratio next to any new color token (see the Contrast column above). If a color only passes for large text, say so and don't use it below 24px.

### Screen readers & semantics
- Use real elements: `<button>` for actions, `<a>`/`<Link>` for navigation, one `<h1>` per page, headings in order.
- Every interactive element has an accessible name (visible text, or `aria-label` when it's icon-only).
- Decorative images get `alt=""`; meaningful images get alt text that says what matters, not "image of".
- Animated or decorative text is `aria-hidden`, with a static equivalent available to screen readers.
- State changes that sighted users see as motion (e.g. an apple landing in the basket) are announced through a polite `aria-live` region.

### Keyboard
- Everything clickable is reachable and operable with Tab / Enter / Space, in a logical order.
- Visible focus indicator on every focusable element (`:focus-visible`, 3px ring, 3:1 contrast). Never `outline: none` without a replacement.
- Don't strand focus: if an element disappears after activation, move focus somewhere sensible.

### Motion
- Respect `prefers-reduced-motion: reduce`: replace movement (wiggles, flights, typing) with simple fades or instant state changes.
- Anything that moves or auto-updates for more than 5 seconds needs a way to pause it (WCAG 2.2.2). Hover/focus should also pause it.
- No flashing more than 3 times per second.

### Touch & layout
- Touch targets at least **44×44px**.
- Layout works at 320px wide and at 200% browser zoom with no horizontal scrolling or clipped content.
- Reserve space for content that changes size (e.g. typed text) so the page doesn't shift.

### Checking
- Run an automated pass (axe DevTools or Lighthouse accessibility) on every page before shipping.
- Do a keyboard-only pass and a quick screen-reader pass (NVDA on Windows, VoiceOver on Mac) on anything interactive.

## Open items

- Card title and tag sizes on the work page (32px, 16px) don't match the `heading/card` (24px) and `tag/default` (12px) styles. Pick one and update the other.
- The sky gradient isn't a Figma variable yet.
- License MADE Okine Sans, or pick a permanent replacement.
