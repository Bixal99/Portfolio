# Hero + Projects Redesign (Centered Thesis)

**Date:** 2026-07-17  
**Status:** Approved (design dialogue)  
**Reference:** [friend portfolio](https://portfolio-updated-zeta-sable.vercel.app/) — inspiration only, not a clone  
**Preserves:** Poppins, black base, accent `#5DD3B6`, interactive grid, typewriter, left scroll rail, existing nav/footer

## Goal

Replace the hero SignalBoard graph with a centered typography-first composition, and replace the projects card grid with a master–detail workspace. Keep Bilal’s identity, stack, fonts, and colors.

## Locked decisions

| Area | Decision |
|------|----------|
| Hero layout | Centered thesis (no right column, no SignalBoard) |
| Hero hierarchy | Muted thesis → Hi I am → Name → typewriter → intro → CTAs → stats strip |
| Projects layout | Master–detail workspace (list + detail stage) |
| Inspiration | Friend’s live/interactive energy and typography drama — not their terminal or simulation engine |
| Theme | Unchanged Signal tokens and Poppins |
| Out of scope | Nav/footer redesign, Skills/Journey/Education changes, real ML sims, cloning friend CLI |

## Hero

### Composition

Single centered column inside the existing `min-h-dvh` hero. Remove two-column grid and all `SignalBoard` usage (desktop column + mobile ambient).

### Content order

1. **Thesis** — large muted headline (`text-white/28`–`/35`), e.g. “Building intelligent software systems” (data-driven string)
2. **Kicker** — “Hi, I am” (teal, uppercase tracking)
3. **Name** — `profile.name` as primary H1 brand signal
4. **Typewriter** — existing `TypewriterLine`, centered
5. **Intro** — `profile.intro`, muted, max-width constrained
6. **CTAs** — Download CV + Contact, centered, existing button styles
7. **Stats strip** — hairline rule + 3 compact metrics (label + value) from portfolio data

### Atmosphere

- Keep `InteractiveGridBackground`
- Optional soft teal radial bloom behind center (CSS only)
- No node/link graph graphic

### Motion

- Keep light hero entrance animations
- Soft fade-up on thesis
- Honor `prefers-reduced-motion`

### Data

Add to [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile.thesis` (string)
- `heroStats: { value: string; label: string }[]` (exactly 3)

## Projects

### Composition

Replace equal card grid with a workspace:

- Keep `SectionHeading` + short supporting line
- Status chip under heading: `STATUS: READY` (teal outline)
- **Desktop (`lg+`):** two columns — selectable list (left) + detail stage (right)
- **Mobile:** stacked list; selecting a project shows detail below

### List item

- `PROJECT_0N` monospace-style index
- Category chip
- Title (teal when active)
- One-line description
- Tech chips: first 3 + `+N` if more

### Detail stage

- CSS mock preview (reuse existing `PREVIEW_STYLES` variants)
- Full title + description
- Demo / Source links (existing)
- Optional `highlights: string[]` (2–3 bullets); if absent, omit bullets block

### Interaction

- Client state for `activeIndex` (default 0 / first featured)
- CSS hover + active border using `--accent`
- No GSAP pin/scrub; no fake inference simulation

### Data (from GitHub `Bixal99`)

Replace current project entries. Include **all non-struck personal repos** from the user’s selection (exclude Portfolio, Bixal99 profile, and non-owned forks):

| # | Project | Repo | Demo | Category |
|---|---------|------|------|----------|
| 01 | AI Book Assistant (BookBy) | [AIBookAssistant](https://github.com/Bixal99/AIBookAssistant) | [Vercel](https://ai-book-assistant-blush.vercel.app) | Generative AI |
| 02 | Churn Prediction System | [Churn-Prediction](https://github.com/Bixal99/Churn-Prediction) | repo | Machine Learning |
| 03 | Eye Blink Morse Detector | [EyeBlinkMorseDetector](https://github.com/Bixal99/EyeBlinkMorseDetector) | repo | Computer Vision |
| 04 | Ghoomora | [Ghoomora](https://github.com/Bixal99/Ghoomora) | [Vercel](https://ghoomora.vercel.app) | Full-Stack |
| 05 | RetroVerse | [RetroVerse](https://github.com/Bixal99/RetroVerse) | repo | Games |
| 06 | Scrapper | [Scrapper](https://github.com/Bixal99/Scrapper) | repo | Automation |
| 07 | HMS | [HMS](https://github.com/Bixal99/HMS) | repo | Full-Stack |

Extend `Project` with optional `highlights?: string[]` (2–3 bullets from each README). Wire `links.demo` to live URLs when present, else same as source.

## Files to change

| File | Change |
|------|--------|
| [`src/components/HeroSection.tsx`](src/components/HeroSection.tsx) | Centered thesis layout; remove SignalBoard |
| [`src/components/ProjectGrid.tsx`](src/components/ProjectGrid.tsx) | Master–detail workspace |
| [`src/data/portfolio.ts`](src/data/portfolio.ts) | `thesis`, `heroStats`, project `highlights` |
| [`src/components/SignalBoard.tsx`](src/components/SignalBoard.tsx) | Remove if unused after hero change |
| [`src/app/globals.css`](src/app/globals.css) | Only if small utilities needed for thesis/stats |

## Out of scope

- Changing Poppins / accent / dark theme
- Rewriting About, Skills, Journey, Education, Footer
- Friend’s interactive terminal
- Real project screenshots or live ML demos
- Full GSAP uninstall

## Success criteria

- First viewport reads as one centered composition; name remains a primary brand signal
- No SignalBoard graph in the hero
- Projects feel interactive (select → detail) without cloning the friend site
- Stack, fonts, and colors unchanged
- Desktop and mobile both usable
