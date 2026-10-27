# Poster and interaction correction handoff

October 27, 2026. Scoped correction under `.impeccable/surfaces/poster-interactions-correction.md`; incumbent dark palette variables and Poppins remain the authority. This pass writes only this handoff.

## Recorded changes

- Nine projects remain after School Management System was removed from both `portfolio.ts` and `projectMedia.ts`; their positional catalog mapping is retained. Existing descriptions, technology marks, demo/source links, and explicit real-video playback remain.
- Desktop navigation now has a 56–58px shell, 12px Poppins labels increasing to 14px at 1280px, and larger row spacing. Selection remains driven by scroll position; hover does not move the indicator.
- Hero hover lights one square snapped to the 42px grid, with nearby soft glow. Delegated pointer handling is animation-frame batched, hides on pointer exit/document visibility changes, and excludes touch hover.
- The project rail begins at the first row's top. Node stops remain centered on rows, so the tip approaches the first node from above.
- Nine colorful editorial illustrated posters replace the rejected futuristic dimensional covers. Previews read `/covers/posters/<slug>.webp` and own a 16:10 media aspect ratio at every viewport. Gentle hover zoom/rotation has a reduced-motion override. This sizing preserves poster composition at rest; rendered title clipping during motion remains unverified.

## Assets and evidence

Read the current surface brief, navigation CSS, hero grid source, timeline measurement, preview/card media styling, and media catalog. Visually inspected `.impeccable/review/project-posters-contact-sheet.png`: nine distinct topical human/object illustrations, saturated flat palettes, and large readable titles form a coherent editorial set.

`public/covers/posters/prompts.json` records exact name-specific prompts, built-in `image_gen` provenance, and original generated-image paths; `public/covers/prompts.json` references the new set as well. Independently verified **9 WebP posters, 9 prompt records, and 9 exact matching `.webp.json` prompt strings**. The implementer's asset scanner reports zero missing sidecars. Old shipped conceptual cover assets/sidecars were removed; generator originals remain preserved.

These posters are authored illustrations, not screenshots or evidence of functioning app workflows. Existing real demo footage remains separate.

## Verification boundary

The implementer reports targeted ESLint, TypeScript, and final production build passing, including all five static pages. HTTP evidence in `.impeccable/review/poster-interactions-http-checks.json` records `/projects` returning 200 with nine cards/posters and School Management absent; all nine poster paths return 200 at 1200 × 750. The actual Next image optimizer endpoint returns 200 (`image/jpeg`, 45,785 bytes). Home HTML includes four posters and hero-cell markup. The new source/assets reviewer reported no material blockers while completing its report; consult that final report for the definitive verdict. This documenter did not rerun build, lint, TypeScript, or HTTP checks.

A fresh browser connection inventory returned no available surfaces. No current rendered screenshots, computed-style checks, scroll timing, pointer playback, or video interaction approval is claimed. Contact-sheet inspection verifies the artwork itself. The detector's 33 advisories concern stale root documentation and do not establish a rendered defect in this correction.

## Existing documentation drift

`PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, and earlier surface/review records contain pre-existing palette, project-count, and media-direction history. Latest direction and current source govern this correction. Preserve these global documents and older briefs; the task does not authorize repairing their drift or promoting these local choices into a replacement global design system.
