# Pointer, sound, and skills core documentation

Date: October 26, 2026. Scope: local implementation record. Documentation complete; visual/audio finish gate remains open.

## Recorded artifact

Updated `../surfaces/src-components-customcursor-tsx.md` from the shipped source in CustomCursor.tsx and its stylesheet, InteractionFeedback.tsx and its stylesheet, interfaceAudio.ts, TechStack.tsx and its stylesheet, the cursor capability helper, and ui/solar-system.tsx. The brief records exact local dimensions, pointer/hover/press states, gesture unlock, audio grammar and throttle limits, mute persistence, touch/keyboard/native/reduced-motion paths, cleanup, the personal MB centre, and preservation of continuous outer-orbit movement.

## Inheritance and budget

The local implementation inherits the current dark palette, blue accent, and Poppins through existing variables in src/app/globals.css. No new shared token family or global prohibition was extracted from the task. Local geometry includes a 24px arrow, 30px corner accent, 44px mute target, and 78px/58px upright personal centre. Audio uses existing Web Audio support; motion uses the existing GSAP dependency and browser animation APIs. No new dependency, raster, downloaded sound, autoplay, global frame cap, or pointer-frame React state was added.

Named local rules: immediate pointer with settling accent; intention-driven sound; bounded feedback; upright personal centre. These describe this surface only. The circular sound toggle, click pulse, and inherited orbit rings remain valid existing forms despite the rejected circular cursor.

## Evidence boundary

- Source review: `pointer-sound-source-review.md` records ship with no material source defect found, explicitly limited to source correctness.
- Implementation validation reported by the parent: production build and target lint passed. `../runtime/verify-sound-grammar.cjs`, `../runtime/verify-arrow-cursor.cjs`, and `../runtime/verify-personal-core.cjs` passed their source/mock/HTTP checks. This documentation pass inspected source and the review records; it did not rerun or reinterpret those checks as visual evidence.
- One detector pass reported advisory discrepancies with historical global design records. Those values were not copied into new rules, and the detector was not rerun.
- Visual review: `pointer-sound-visual-review.md` remains recapture because current desktop/mobile captures are missing. Browser discovery exposed no enabled apps or browsers. No current render, device session, or listening test was available.

## Pending actual verification

Capture the current desktop document and Skills centre, including arrow idle/hover/press states; capture mobile reflow, Skills balance, and control placement. Verify fine-pointer and native editing transitions, stationary-pointer orbit silence, keyboard focus/press deduplication, touch press-only feedback, reduced-motion behavior, and idle cleanup in a real browser. Listen to entry/departure/press cues at normal volume; confirm gesture unlock, the first press after asynchronous resume, blur/visibility behavior, persistent mute, and absence of delayed playback after mute. Current source evidence cannot establish perceived lag, audio pleasantness/loudness, rendered contrast, overlap, or mobile balance.

## Drift not canonized

PRODUCT.md, DESIGN.md, and `.impeccable/design.json` carry historical light/static-skills guidance. The current explicit user direction preserves the dark Poppins portfolio and moving outer skill orbits. The task is a local refinement, so global records are preserved and their drift is reported without refresh. This pass writes only this review record and the local surface brief; the palette stylesheet, global design files, projects, and certificate gallery are untouched. No raster asset was produced, so there is no new raster provenance obligation.
