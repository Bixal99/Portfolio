# Cursor and hover motion handoff

October 27, 2026. Scoped implementation of `.impeccable/surfaces/cursor-hover-motion.md` within the existing ink/periwinkle palette and Poppins typography. This documentation pass writes only this file.

## Current behavior

- Cursor: a two-tone folded SVG dart replaces the rejected basic white arrow. Its sharp tip remains the exact mouse hotspot through hover rotation and press scaling. Immediate GSAP setters position it without a trailing follower or ring. Short project-action captions flip near viewport edges. Edit fields, media, inert/disabled elements, coarse pointers, and reduced motion use native behavior; blur, document hiding, keyboard navigation, and cleanup hide the custom pointer.
- Posters: the entire unplayed 16:10 surface is an accessible demo button for eight videos or a platform link for the ninth project. Restrained mouse-position tilt and soft lighting use element-local listeners and one pending animation frame, without pointer-frame React state. Leaving, hiding, blur, capability/reduced-motion changes, playback, and unmount reset the effect. Existing video controls, close action, offscreen pause, and error recovery remain.
- Actions: poster controls coordinate color, lift, and arrow feedback. Live-project pills reveal a fill with a traveling arrow; source links gain an underline. Keyboard focus has explicit treatment. Navigation social icons lift and change color. Reduced motion keeps static artwork, native pointer, and color/focus feedback.

Project facts, URLs, nine illustrated posters, sound behavior, scroll-driven navigation selection, and hero grid behavior remain outside this correction's changes. No new dependency, image asset, canvas, perpetual effect, or global visual system was introduced.

## Evidence and limits

Read current `CustomCursor.tsx` and its CSS module, `ProjectPreview.tsx`, `ProjectCards.module.css`, `ProjectLinks.tsx`, navigation social classes, the current surface brief, and `.impeccable/review/cursor-hover-motion-http-checks.json`. Source confirms a constant 16px poster-arrow width with transform/opacity animation, resolving the detector's layout-width warning. Per the bounded handoff, detection was not rerun.

The implementer reports targeted ESLint, TypeScript, and production build passing. Saved HTTP evidence records status 200, nine cards/poster images, eight poster demo buttons, one platform poster link, nine live links, and nine source/site links. This documenter did not rerun those checks. A fresh independent source finish review was running at handoff; consult its final report for the review verdict.

The latest browser inventory again returned no available surfaces. No rendered screenshots, computed layout/contrast, caption edge behavior, pointer alignment, actual hover motion, or interactive media verification is claimed. HTTP and source checks establish markup and implementation intent, not rendered approval.

The detector's ten remaining advisories concern pre-existing root-document drift. `PRODUCT.md`, `DESIGN.md`, the global design sidecar, and older briefs retain historical palette/count/direction statements. Preserve those files and the old review history; this local motion task does not authorize global documentation repair or a replacement visual world.
