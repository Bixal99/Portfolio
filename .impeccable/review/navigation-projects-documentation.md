# Navigation and projects documentation handoff

Date: October 27, 2026. Scope: source-led refinement of navigation, pointer, project presentation, and `/projects` within the incumbent dark portfolio. This records the scoped implementation and does not replace the global design system.

## Evidence checked

Read `PRODUCT.md`, `DESIGN.md`, the Impeccable document reference, `.impeccable/surfaces/navigation-projects-refinement.md`, and the scoped navigation, cursor, project grid/archive/preview, shared card styles, and Projects page source. Read `src/app/globals.css` and `src/app/layout.tsx` only to identify the incumbent palette and typography. Consulted `.impeccable/review/navigation-projects-source-review.md` for the independent source review and its verification boundaries.

The source extension uses existing `--background`, `--foreground`, `--surface`, `--muted`, `--edge`, `--accent`, `--accent-rgb`, and `--on-accent` roles. The incumbent source has an ink background (#080b12), pale text (#edf1fa), and periwinkle accent (#8ca5ff). Poppins remains the body and scoped display typeface, loaded through `next/font`. Local cover/video control colors serve media legibility; no new global palette or font system was introduced by this scoped extension.

## Scoped behavior and presentation

- Navigation: compact desktop pill, equal-width labels, and a moving indicator derived from the section passing the scroll activation line. Hover changes label color without moving selection. Mobile menu retains section links and closes after selection. Social links have accessible names independent of hidden small-screen labels.
- Pointer: sharp authored triangular arrow with a small hover rotation and press response. Fine mouse input enables it; native input/video surfaces, keyboard navigation, coarse pointers, and reduced motion retain native cursor behavior. Event cleanup restores the native cursor.
- Home projects: existing featured timeline remains. Generated covers lead each project while factual descriptions, technology marks, source access, and demos remain. The large closing headline travels from a rightward blurred/skewed state into sharp type on scroll. Its circular archive action sits on the right on desktop, with fill and arrow feedback and an explicit focus outline; mobile stacks the composition.
- Projects archive: a simple Projects heading precedes the complete ten-project collection, ordered with featured work first. Two open image-led columns become one below 760px. No filters, search, category controls, collection counts above the grid, or introductory marketing block remain. Individual project category labels remain factual card metadata.
- Shared project media/actions: gently rounded covers, restrained pill actions, modest cover magnification, arrow travel, and source underline feedback. Conceptual image alternatives distinguish generated artwork from actual application output. Demo launch is explicit; videos expose native controls, pause/resume, close, offscreen/document-hidden pause, and failed-video recovery to the live project. Reduced-motion rules remove the principal transforms/transitions and retain static readable content.

## Asset provenance

`public/covers/prompts.json` is the authoritative full prompt manifest: ten separate name-and-purpose-specific records identify the built-in `image_gen` method, conceptual status, and original generated image paths. Each shipped `public/covers/*.webp` has a neighboring `.webp.json` file with exact full prompt/time metadata. All ten sidecar prompt strings were independently checked for exact equality with their manifest records after the implementer's provenance correction.

Presence check independently confirms **10 covers, 10 prompt records, and 0 missing sidecars**, consistent with the implementer's asset scanner result (10 assets, 0 missing). The source reviewer visually inspected `.impeccable/review/project-covers-contact-sheet.png` and reported ten coherent, distinct dimensional illustrations connected to project concepts. Conceptual covers do not establish evidence of a working app; existing real demo footage remains separate.

## Existing documentation drift and boundary

`PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, and the older projects/skills surface describe historical light gray/navy/blue styling and a nine-project arrangement. Current source and the latest surface brief establish the dark palette and ten-project collection for this task. The latest user direction also authorizes generated conceptual covers, superseding the older authentic-posters-only constraint for these cover images.

This pre-existing drift was recorded rather than repaired. No global `DESIGN.md` refresh, design sidecar regeneration, product rewrite, global palette change, or typography replacement belongs to this handoff. Source extension details above are task-local and must not become unasked global prohibitions or a replacement visual world. Unrelated existing workspace changes are outside this review. This documentation pass writes only this file.

## Verification and limitations

The implementer reported production build, TypeScript, and targeted ESLint passing before the final two source corrections (closing-action flex layout/focus and mobile social accessible names). The source reviewer independently accepted both corrections. The final production build then passed compilation, TypeScript, and generation of all five static pages including `/projects`. Targeted lint was not reported rerun after those two corrections. This documenter did not rerun build, TypeScript, or lint.

The implementer's final HTTP check reported `/projects` returning HTTP 200, ten cards/conceptual covers, no filter controls, and successful responses for all ten covers, each at 1200 × 750 pixels. These are source/HTTP checks, not interactive rendering evidence. Browser connection attempts found no available in-app or Chrome browser. There are no rendered desktop/mobile screenshots for this refinement, no computed-style confirmation, and no verified scroll playback or media interaction pass. Older screenshots in the review directory do not verify the current refinement.

When a browser is available, prioritize the closing title/action at 320/540/900/1024px, its clipped animated edges and external focus outline, nav tracking versus hover, keyboard focus around media swaps, video close/error states, and reduced-motion behavior. No rendered visual score or visual approval is claimed here.
