---
version: 1
slug: "src-components-certifications-tsx"
primary_target: "src/components/Certifications.tsx"
related_targets: ["src/components/Certifications.module.css","src/components/JourneyTimeline.tsx","src/components/ui/timeline.tsx"]
---

# Certificates

Mode: Experience. Local redesign inside the current portfolio; not a replacement site identity.

Scope: src/components/Certifications.tsx and its CSS; contain the adjacent Journey rail in src/components/ui/timeline.tsx and JourneyTimeline.tsx.
Audience: recruiters and clients inspecting four supplied credentials. Content is the original Tata/Forage and EAB/Forage job simulations plus the two Deloitte WorldClass courses. Preserve source PDFs, dates, titles, Poppins, the current dark blue palette, cursor, click sounds, and the running skills orbit. Earlier light-palette/static-skills notes are superseded by the user's later instructions, outside this local documentation scope.
Decision: the user chose "Build it directly (faster)" on October 26, 2026. This is a code-led local extension, not a new global workflow default.

## Direction contract

THESIS: Let the genuine credential be the exhibit. Replace the rejected nested two-column cards and oversized header with one open, selectable document exhibition.

OWN-WORLD: Inherit the current ink-dark canvas, blue accent, and Poppins. Use open space, four understated text selectors, one straight document plate, and clear actions outside the paper. No eyebrows, numeric badges, overlaid buttons, decorative tilt, or new claims.

STORY: Recognize the issuer and course, select a credential, inspect its complete preview beside its facts, then open or download its original PDF.

FIRST VIEWPORT: A compact Certifications heading precedes four horizontal selectors. Below, a generous right-hand document occupies roughly 60% of the width; issuer, title, date, and topics occupy the left. View/download actions sit below the preview. Mobile stacks the preview and facts below a horizontally scrollable selector.

FORM: User-confirmed exhibition layout, local extension, no concept seed required. Signature interaction: selecting a credential exchanges its complete document and factual detail together with one short GSAP reveal, disabled under reduced motion. Keep content visible by default. Journey's rail measures only its layout box and ends within its own clipped paint boundary.

FINISH: Source documentation is complete in .impeccable/review/certificates-exhibition-documentation.md. All four shipping WebP previews have adjacent provenance records. The source review's disposition remains `recapture`: current desktop/mobile visual evidence is pending, so this is not visual ship approval. This ordinary local extension preserves PRODUCT.md, DESIGN.md, and .impeccable/design.json; their historical light/static direction is recorded as existing drift, not replaced here.

## Implemented source record

The exhibition uses four text tabs and one shared facts/document panel. Desktop assigns .8fr to facts and 1.2fr to the document, with a 32–72px fluid gap. The complete preview is contain-fit inside an 842:595 plate with a quiet 12px frame radius; differing document proportions leave space rather than crop certificate content. View and Download remain outside the paper. The local heading is Poppins 600 at clamp(2rem, 4.2vw, 3.5rem), with a blue period; the selected course is Poppins 500 at clamp(1.7rem, 3vw, 2.55rem). These are local surface choices, not new global typography rules.

Current inherited tokens come from src/app/globals.css: canvas #080b12, foreground #edf1fa, surface #111725, muted #a8b4cb, edge #2b3549, accent #8ca5ff, accent hover #b2c3ff, and on-accent #080f24. Tabs use a thin edge and a 2px selected blue line; the frame uses an edge, not a new shadow vocabulary. The primary action has an 8px radius and all actions have a 44px minimum height. Existing cursor, click feedback, and continuously moving skills orbit remain outside the edit boundary.

The factual source is src/data/certificates.ts: Tata/Forage GenAI Powered Data Analytics (October 16, 2026); EAB/Forage GenAI for Proposal Generation (October 15, 2026); Deloitte WorldClass Effective Leadership (September 10, 2026); Deloitte WorldClass Critical Thinking (September 8, 2026). Titles, issuers, dates, classifications, and topic lists remain source data. The Forage entries remain labeled job simulations; Deloitte entries remain professional development. No additional qualification or completion claim is introduced.

Each ID resolves to public/certificates/<id>.webp and its original <id>.pdf. The parent implementation reports byte-for-byte preservation of supplied PDFs. Adjacent <id>.webp.json records identify the supplied PDF, non-generative PyMuPDF/Pillow conversion, and creation time. Deloitte previews omit blank printer margins around the certificate region; the complete original PDFs remain available. The reported embed-prompt scan found four rasters and zero missing provenance records. The current documentation pass checked that all four PDF/preview/sidecar sets exist and read all four sidecars.

The tablist uses a roving tab stop and one labeled, focusable tabpanel. Left/Right wrap selection, Home/End jump to the first/last tab, and focus follows selection while bringing the tab into view. Tabs, panel, preview link, and actions expose focus-visible outlines. The preview and View action open the same PDF in a new tab with that behavior included in their accessible names; Download supplies the download attribute. A failed preview becomes a readable fallback inside the same working PDF link.

Below 800px, tabs become a horizontally scrollable, proximity-snapping row with 190px items. The exhibit stacks with document/actions above the facts, and heading, spacing, and detail sizes tighten. For motion preference `no-preference`, the selected panel reveals from .8 opacity and 18px translation over .55s with .06s stagger, using GSAP expo.out and ScrollTrigger at top 88%; media cleanup runs on selection/unmount. Under reduced motion, this GSAP reveal is skipped and local state transitions are removed. Content remains visible by default.

Journey rail height now uses the observed element's offsetHeight through ResizeObserver, excluding animated absolute descendants; rail travel is max(0, height - 40). The timeline layout box and Journey section both clip overflow to contain the meteor's paint. Runtime boundary appearance remains a visual-evidence follow-up.

## Evidence and follow-up

Source checked: Certifications.tsx, Certifications.module.css, src/data/certificates.ts, JourneyTimeline.tsx, ui/timeline.tsx, AnimatedSection.tsx, layout.tsx, globals.css, the four provenance sidecars, the existing global system records, and certificates-exhibition-source-review.md. The parent reports a passing production build and targeted lint, plus one detector run whose font/radius differences were advisory against stale DESIGN.md. This documentation pass did not rerun those checks or claim browser validation.

Additional parent-reported checks passed: .impeccable/runtime/verify-certificate-exhibition.cjs exercises all four selections, panel/preview/PDF correspondence, roving tab state, Left/Right wrap, Home/End, image failure recovery, HTTP page structure, and all eight served PDF/preview assets. .impeccable/runtime/verify-timeline-containment.cjs invokes the actual measurement effect with a throwing scrollHeight getter, confirming repeated measurements use offsetHeight, react to layout resize, dispose the observer, and retain both clipping boundaries. Both scripts were read for this documentation pass. These are source/unit/HTTP checks, not browser renders.

The source review found no material source defect and requests recapture. Its statement that provenance files were absent describes an earlier packet; all four sidecars now exist. No current browser surface was available (CUA reported apps: [], browsers: []), and historical October 8 captures do not establish this implementation's appearance. Pending: current desktop/mobile captures showing all four selections, readable complete previews, visible keyboard focus, responsive fit, and the Journey/Certifications junction. The finish reviewer must assess those captures before changing the visual disposition.

Existing drift not canonized or repaired: PRODUCT.md, DESIGN.md, and .impeccable/design.json still contain the superseded light palette/static-skills narrative and older heading guidance. This local record follows the later explicit dark/Poppins/orbit choices without granting a global system rewrite or turning its compact heading and radii into house rules.
