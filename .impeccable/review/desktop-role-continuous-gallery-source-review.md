# Source-only finish review — October 28, 2026

Disposition: **no blocking source defect found within the requested refinement**. This is source approval only. Browser surfaces are unavailable; no current rendered desktop/mobile approval, visual score, or computed layout result is claimed.

## Scope and evidence

Fresh review of `HeroSection.module.css`, `TypewriterLine.module.css`, `ProjectGrid.module.css`, `ProjectCards.module.css`, `Certifications.tsx`, `Certifications.module.css`, and `useCertificateRotation.ts`, with the owning JSX, project/certificate data, global typography, relevant surface records, and Impeccable polish guidance. The existing dirty tree was preserved. No UI code was edited.

The latest request overrides the older certificate surface's Pause/Resume and permanent focus-pause instructions: use a default 20-second automatic slideshow, remove the Auto/Pause control, and continue after manual selection. The historical global light-theme documentation is not current visual authority for this dark implementation.

## Findings

No blocking findings. The desktop role switches to a baseline-aligned row at 1024px. The label cannot wrap or shrink; the typewriter text is nowrap only in that desktop query. Below 1024px the role remains stacked and its text can wrap within the available width. The hidden longest-phrase sizing remains present.

Font-metric source assessment used the existing built Poppins SemiBold 600 Latin WOFF2, the same weight used by the role and titles. The actual widest configured phrase is `"AN OPEN-SOURCE CONTRIBUTOR"`. At 1024px, the role has approximately 942px of available width; the label, 18px gap, and 34ch phrase allocation total approximately 681px. The phrase including cursor is approximately 440px inside a 495px allocation. At 1280px, the corresponding allocation is 549px with approximately 488px of text and cursor, and the complete role uses approximately 777px of the 1184px content width. These calculations support source-level fit; they do not replace browser shaping, fallback-font, or zoom checks.

Featured titles, descriptions, eyebrow, and stack labels increase together. The final responsive overrides retain stacked projects through 1099px and keep normal text wrapping. The longest forced title span, `Prediction System`, measures approximately 403px against a 446px column at 1100px, and 469px against a 536px column at 1280px. At 320px its approximately 256px measure is close to the 256px text allocation; normal whitespace wrapping remains available, so this is not a clipping blocker. Check that narrow title balance in the eventual mobile capture.

The demo action is a 48px rectangular control with 13px text, clear play/pause/resume labels, and a 46px/12px phone adaptation. The action row wraps; the media caption and disclosure remain separate from the poster. Focus-visible styling, native video controls, close action, and reduced-motion overrides remain present. The shared stylesheet also enlarges archive demo actions, consistent with keeping the same control pattern.

The certificate interval is explicitly 20000ms. Manual selection changes `selected`, displays the matching facts/preview/PDF destinations, and restarts the rotation effect without a permanent pause latch. Hover and selector focus do not suppress rotation. Automatic advances do not call focus, scroll, or sound APIs. The timeout is suppressed while offscreen, hidden, reduced-motion, or while a PDF action is focused; PDF focus protects its destination during keyboard activation and rotation resumes when it leaves. Cleanup cancels the timer, disconnects the observer, and removes the listeners. No Auto/Pause control remains in the JSX. Roving keyboard tabs, selected state, panel labelling, image-failure recovery, complete contain-fit documents, and original PDF actions are retained.

Independent check: `node .impeccable/runtime/verify-certificate-rotation.cjs` passed. This executes the actual hook effect against mocked visibility, focus, media, and timer APIs; it is not a browser lifecycle test.

## Nonblocking limitation

Clicking the already-selected certificate does not necessarily restart its timer: React can bail out from `setSelected` with the same index, and selector clicks are not separately observed. The certificate remains visible and automatic rotation continues, satisfying the stated request. If a future requirement promises a fresh full 20 seconds after every click, add an explicit interaction revision or reset callback.

## Remaining visual evidence

When browser surfaces return, inspect one batched desktop/mobile set: 1024px desktop with the complete longest role phrase; 1100px project columns; 320px/375px title wrapping and demo rows; certificate selection followed by an automatic advance; keyboard PDF activation and visible focus; reduced motion. Current source checks do not establish visual balance, actual font loading, focus appearance, or document legibility.
