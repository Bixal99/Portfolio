# Signal System Portfolio Redesign

**Date:** 2026-07-17  
**Status:** Approved

## Goal

Remove all 3D models, force dark mode only, and redesign Hero, Skills, Journey progress, Education, and Projects under one shared visual language (“Signal System”: grid + teal nodes/lines), while keeping Poppins, section headings, footer, typewriter, and the global left scroll rail.

## Locked decisions

| Area | Decision |
|------|----------|
| Hero | Abstract CSS/SVG signal board + keep typewriter |
| Skills | Signal constellation + detail panel |
| Journey | Clean vertical spine; no glow-grid theater |
| Education | Horizontal Matric → FSC → University path |
| Projects | CSS browser-frame mock previews (no screenshots) |
| Motion | Surgical: strip heavy scrub/pin; keep light motion; keep left `% Scrolled` (soften if needed) |
| Theme | Dark only — delete light tokens + toggle |
| 3D | Remove entirely |
| Logs | Ignore `*.log` in git |

## Visual system

- **Background:** Existing interactive grid, black base
- **Accent:** `#5DD3B6` (`--accent`)
- **Typography:** Poppins only; existing section kickers/headings stay
- **Signature:** Teal nodes + thin connecting lines (signal motif) reused in Hero board and Skills constellation

## Section specs

### Hero

- Left/center: “Hi, I am”, name, typewriter role line, short intro, CV + Contact CTAs
- Visual: CSS/SVG signal board (nodes, links, soft CSS pulse) — no WebGL
- Remove character-tuned translate offsets

### Skills

- Replace circle icon grid with constellation of skill nodes clustered by category
- Hover/focus updates a detail panel (name + category)
- Mobile: accessible list + same panel
- No anime.js / GSAP pin-scrub theater

### Journey

- Keep three beat cards and copy
- Thin teal spine + active node; light fill on scroll
- Remove lit grid glow / heavy scrub theater
- Keep global left `% Scrolled` rail; soften GSAP tween if overdone

### Education

- Horizontal path: Matric → FSC → University
- Active stage expands a detail panel below
- Soft CSS / light in-view active state; no pin/scrub

### Projects

- Browser chrome + unique CSS mock screen per project (variant by index/category)
- Category, title, description, tech chips, Demo/Source links
- Hover via CSS only

### Global cleanup

- Unmount Character / PortfolioExperience / 3D assets wiring; remove `three`
- About + Coding: drop empty model columns; keep copy
- Remove ThemeToggle and all `html[data-theme="light"]` CSS
- Footer, fonts, heading style unchanged
- Add `*.log` to `.gitignore`

## Out of scope

- Changing Poppins / type scale
- Rewriting About/Coding copy
- Footer redesign
- Real project screenshots
- Full GSAP uninstall
