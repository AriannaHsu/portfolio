# Portfolio Website Brief

## 1. Purpose & Audience
- **Primary audience:** Recruiters and hiring managers for internships in UX Design, UX Research, Product Design, or Product Management.
- **Site's job:** Convert a quick skim into a strong impression, and give recruiters an easy path to confirm fit and reach out.
- **Role focus:** Kept intentionally broad — one site flexes across all four role types rather than tailoring separately to each.

## 2. Primary Call to Action
1. **Resume download** — the main conversion action; should be effortless to find and grab within seconds of landing.
2. **Contact via email / LinkedIn** — secondary path for recruiters who want to reach out directly. No contact form, no scheduling link — keep it simple.

## 3. Visitor Journey
- **Skim first:** Most recruiters will spend only a few seconds. The homepage needs to land the impression fast — no reading required to feel "this person is good."
- **Dig deeper (optional):** If the skim earns interest, recruiters can go to case studies for proof of skill and process.
- **Confirm and act:** Resume download and contact info should be reachable from anywhere without hunting.

## 4. Homepage ("Work") — Hero Section
- **Headline:** Strong, personal statement of who you are (similar spirit to current site's "Hi, I'm Arianna — a product designer leveraging experience in data science and business to craft tech solutions for social good").
- **Visual/interactive hook:** A signature interactive element that signals intentional design craft on first impression — this is the "wow, they know what they're doing" moment. Should feel custom-built, not templated.
- **Below the fold:** Gallery of 3–4 case study previews, browsable at a glance (thumbnail + short outcome-oriented one-liner per project, similar to the existing site's card format).

## 5. Case Studies (3–4 total)
- **Structure:** Each case study lives on its own page.
- **Content approach:** Each case study shows the *full range* of skills — design, research, and strategy — rather than each one narrowly spotlighting a single role. This supports the "flexible across 4 roles" positioning: any recruiter (design, research, or PM) should be able to see themselves reflected in every project.
- **What to include per case study** (to nail down with you next as we draft):
  - Problem/context
  - Your role and process (research → design → validation → outcome)
  - Key decisions and trade-offs
  - Outcome/impact (metrics where possible)

## 6. About Page
- Professional experience
- Skills
- Personal interests (adds the "warm personality" layer)

## 7. "Play" Page
- A space for interactive/experimental projects that don't warrant a full written case study — good outlet for React/animation experiments and smaller explorations.

## 8. Music / Audio

**Concept:** Webtoon-style ambient music — a distinct track per case study, plus one track for the rest of the site (Home, About, Play), toggleable via a speaker/mute icon. Purely atmospheric and optional — the site's meaning and usability should never depend on the audio being on.

**Default state:** Always loads muted. Never attempt to autoplay with sound, and never unmute automatically based on scroll, time-on-page, or any other implicit trigger — audio only starts after an explicit, deliberate click on the speaker icon. This avoids the core risk here: recruiters browsing in offices, on shared screens, or without headphones being caught off guard.

**Speaker icon / toggle:**
- Fixed position (e.g. bottom corner), visible on every page.
- Subtle idle animation (soft pulse or waveform) in its muted/off state — signals "audio is available here" without ever making sound itself.
- Single click toggles mute/unmute; state should be immediately obvious (clear on/off visual, not just a color change).

**Persistence:** Once a visitor unmutes or re-mutes, that choice should persist as they navigate between pages/case studies during the session — don't reset to muted on every page load. (For the production React site this can live in a top-level context or localStorage; not applicable to in-artifact prototypes.)

**Track transitions:**
- Crossfade (roughly 1–2 seconds) between tracks when moving from one case study to another, rather than a hard cut — avoids a jarring stop/start if the visitor left audio on.
- Leaving a case study back to Home/About: fade to the site's ambient track, or fade to silence — silence is the safer default if a smooth "return" transition isn't built out.

**Track assignment:**
- One ambient track for Home / About / Play.
- One distinct track per case study, active only while that case study's page is open.

**Positioning:** Treat this as a delightful, optional layer (in the spirit of the airladesigns.com / emmiwu.com interaction references) — not core storytelling. If a given case study's track doesn't add much, it's fine to skip music for it rather than force one in.

## 9. "Stats for Nerds" Footer Easter Egg

**Concept:** A YouTube-"stats for nerds"-inspired panel tucked in the footer, giving technically-minded visitors (recruiters, engineers) a peek under the hood. Purely an easter egg — optional, low-stakes, and a nice signal of technical craft for a technical audience.

**Approach:** Real stats only, free tools only — no paid backend or analytics service required.

**Traffic**
- Total site visits — via a free counter service (e.g. a public counter API like CountAPI, or a free-tier database such as Upstash Redis / Vercel KV behind a small serverless function)
- Optional: visits today / this session's visit number

**Performance** *(demonstrates you understand fast-loading builds)*
- Page load time (ms) — via the browser's built-in Performance API, no backend needed
- Total page weight (KB/MB)
- Number of requests

**Your session** *(all client-side, no backend needed)*
- Browser + OS
- Viewport size
- Connection type (via the Network Information API, where supported)

**Site**
- Framework (React)
- Last deployed / build date
- Hosting provider

**Positioning:** Tucked away in the footer, not front-and-center — a reward for visitors who scroll all the way down and are curious enough to click, in the same spirit as the emmiwu.com footer easter egg referenced earlier in this brief.

## 10. Site Structure / IA
- **Home / Work** — hero (tagline + interactive visual) + case study gallery
- **About** — experience, skills, personal interests
- **[Case Study 1–4]** — individual pages
- **Play** — interactive mini-projects / experiments
- Resume (download) and Email/LinkedIn accessible globally (nav + footer), not a standalone page

## 11. Tone & Visual Direction

### Chosen direction: "Minimal ink, warm base"
After exploring three directions (Studio Paper, Soft Focus, Minimal Ink) and comparing against the reference sites, we landed on a hybrid: **Minimal Ink's editorial scale and restraint, on Studio Paper's warmer off-white base.** Personality comes from interaction and type, not from a busier color palette — this matches the pattern seen across all three references (calm base layout, personality injected via motion/interaction, not color).

- **Overall feel:** Minimal, editorial, professional — warm and human rather than cold or corporate. Big, confident headline type; everything else quiet.
- **Texture:** Very subtle background grain (barely-there, not a visible fabric/paper weave) — texture supports the warmth without competing with the clean editorial layout.
- **Base background:** warm off-white `#F4F1EC` (not stark white) — gives the page a paper-like warmth.
- **Card/section background:** slightly lighter warm neutral `#F9F6F0`, separated by hairline dividers (`#E3DFD5`) rather than borders/shadows — keeps the grid feeling calm and editorial.
- **Body/secondary text:** warm gray `#8A857D`.
- **Primary text:** near-black warm charcoal `#2C2A28`.
- **Accent color (purple):** soft lavender `#C9B8E8`, used sparingly — e.g. as an underline on the resume link, small accents — never as a large color block. Deeper lavender-plum `#5A4E85` for accent link text/hover states.
- **Headline scale:** large, confident (around 42px on desktop for the homepage hero) — this scale is what gives the "editorial" feeling; don't shrink it to fit more content above the fold.
- **CTA style:** understated — a text link with a colored underline ("Download resume →"), not a heavy filled button. Matches the "keep it simple" CTA philosophy from the brief.

### Typography
- **Headers:** Perfectly Nineties (primary) or Georgia (fallback/alternate)
- **Body copy:** Suisse
- **System text (nav, footer, hover states):** Nimbus

### Interaction style (from references — still the personality layer)
- **airladesigns.com** — playful, narrative micro-interactions (e.g., animation that mimics a text chat exchange). Signals: don't just animate for flash, animate to tell a story.
- **emmiwu.com/about** — delightful, unexpected interactive details, especially in unexpected places like the footer (e.g., a "water the flowers" interaction). Signals: reward scrolling to the end; small easter eggs build warmth.
- **rachelchen.tech** — a chatbot/guide that helps visitors navigate toward specific projects or experiences conversationally. Signals: consider a guided/conversational way to help recruiters find what's relevant to them, rather than pure static navigation.
- **Synthesis for this site:** A quiet, warm-neutral + lavender-accent foundation (per above), with one or two well-chosen interactive moments — likely the hero interaction and possibly a footer or navigation delight — carrying all the personality, without disrupting the fast, professional skim experience recruiters need.

## 12. Technical Approach & Constraints
- **Goal:** Build/rebuild in **React**, partly as a learning project to get hands-on with React and modern AI-assisted ("vibe coding") tools.
- **Animation tooling:** Open to **Lottie** and/or **Figma**-driven animation workflows — to be evaluated during build based on what best supports the interactive hero/footer moments above.
- **Existing asset to reference:** Current site — [ariannahsu.com](https://ariannahsu.com/) — built in Framer. Reuse its content structure (Work / About / Resume nav, case study format, "get in touch" footer with email + LinkedIn) as a starting content baseline, but rebuild the experience layer in React.
- **Timeline:** Not yet defined — revisit once scope of interactions is scoped out.

## 13. Open Questions / Parking Lot
*(Things flagged as "figure out later" — revisit before final build)*
- Exact content/case studies to feature (which 3–4 projects)
- Specific interaction design for hero + footer moments
- Whether a lightweight conversational/guide element (inspired by rachelchen.tech) is worth building given the "keep it simple" CTA preference
- Timeline and hosting/deployment plan

---
*This brief is a living document — update it as decisions get made during the build.*
