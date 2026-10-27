disposition: source-documented; visual-recapture-pending

# Certifications exhibition documentation

This records the authorized local extension, grounded in current source. It does not replace the portfolio's global design records and does not assert a visual ship verdict. The user chose direct implementation of the exhibition within the current dark/Poppins portfolio; the source review found no material source defect and remains at `recapture` because current desktop/mobile screenshots are unavailable.

## Overview

The genuine credential is the exhibit: four understated text selectors exchange one set of facts and one straight, complete certificate preview. A compact heading introduces the section. Open facts and document columns replace nested repeated cards, decorative tipping, and actions over the certificate. Current cursor, click sounds, and continuously moving skills orbit are preserved outside this local edit boundary.

## Colors

The local component inherits current globals: canvas `--background: #080b12`; text `--foreground: #edf1fa`; document surround `--surface: #111725`; secondary text `--muted: #a8b4cb`; separators `--edge: #2b3549`; selection/action `--accent: #8ca5ff`; hover `--accent-hover: #b2c3ff`; primary-action text `--on-accent: #080f24`. Actual certificate artwork keeps its own source colors. These values describe source usage; rendered contrast was not measured in this pass.

## Typography

Poppins comes from the installed next/font variable and is explicitly inherited by the section. The local heading uses weight 600, `clamp(2rem, 4.2vw, 3.5rem)`, line height 1.15, tracking -.035em, and an accent period. The course title uses weight 500, `clamp(1.7rem, 3vw, 2.55rem)`, line height 1.22, tracking -.035em, and a 16ch maximum width. Issuer text is 19px/600; selectors use 13px issuer and 12px course text; metadata and topic headings use 11px; topics and actions use 12px. The mobile title becomes `clamp(1.65rem, 5.2vw, 2.2rem)` with a 24ch maximum. This compact local hierarchy is not promoted to a global heading rule.

## Layout

At 800px and above, four equal selector columns precede a facts/document grid of .8fr/1.2fr, with a fluid 32–72px gap and a 480px minimum exhibit height. The section has local 64px/96px block padding. The preview plate has an 842:595 aspect ratio and contain-fit imagery, which preserves the full certificate region even when its ratio differs. View and Download are siblings below the frame.

Below 800px, selectors form a horizontally scrollable row with 190px tabs and proximity snapping. The single-column exhibit places document/actions first and facts second, separated by 28px. Local section padding tightens to 48px/64px. These source rules still require current desktop/mobile captures to establish rendered fit.

The neighboring Journey rail measures its layout box with `offsetHeight` under ResizeObserver. It does not include absolutely positioned animated descendants in its measurement; travel ends at `max(0, height - 40)`. Overflow clipping at the timeline box and Journey section contains the rail/tip paint. This addresses the measurement feedback that could extend the rail into the following heading; actual visible containment is pending capture.

## Elevation & Depth

The exhibition adds no shadow vocabulary. Thin separator/selection lines and the inherited surface distinguish the document frame. Hover strengthens the frame edge. The certificate remains straight and actions remain outside its artwork.

## Shapes

The frame has a 12px radius and 12–24px fluid padding. The filled View action has an 8px radius. A 2px blue selection line grows across the selected tab; the underlying edge is 1px. Focus uses a 2px accent outline with 5px offset and a local 3px focus radius. These are observed local values, not an authorized update of the global radius scale.

## Components

The four credential records remain in `src/data/certificates.ts`:

| Organization / issuer | Title | Date | Classification |
| --- | --- | --- | --- |
| Tata / Forage | GenAI Powered Data Analytics | October 16, 2026 | Job simulation |
| EAB / Forage | GenAI for Proposal Generation | October 15, 2026 | Job simulation |
| Deloitte / WorldClass Education Hub | Effective Leadership | September 10, 2026 | Professional development |
| Deloitte / WorldClass Education Hub | Critical Thinking | September 8, 2026 | Professional development |

Titles, issuers, dates, types, and topic arrays are presented from those records without added claims. Each record ID maps to its PDF and WebP in `public/certificates`. The parent implementation reports that original supplied PDFs were copied byte-for-byte; this documentation pass does not independently reassert a hash comparison. All four adjacent `.webp.json` records were checked: they identify the original PDF, non-generative PyMuPDF rendering/Pillow encoding, and creation time. Deloitte previews omit blank printer margins around the certificate region; original PDFs remain complete. The parent reports the embed-prompt scan found four rasters with zero missing provenance files.

The tablist has a roving tab stop. Left/Right wrap, Home/End jump, selection follows focus, and the chosen tab is scrolled into view. One focusable panel is labeled by the selected tab. Native buttons retain click/Enter/Space activation. Focus-visible outlines cover selectors, panel, preview, and actions. Runtime assistive-technology behavior has not been tested here.

The preview and View link open the same original PDF in a new tab, with that behavior included in their accessible names; Download uses the download attribute. Actions have a 44px minimum height and distinct hover/pressed feedback. If an image fails, a readable “Preview unavailable” state keeps the PDF-opening link available.

The GSAP reveal is restricted to `prefers-reduced-motion: no-preference`: readable .8 opacity and 18px translation resolve over .55s, stagger .06s, expo.out, at the panel's top 88% ScrollTrigger point. Media cleanup runs when selection changes or the component unmounts. Content is visible by default. Reduced motion skips that reveal and removes the local CSS transitions; selection and PDF actions remain available.

## Do's and Don'ts

- Do preserve original PDF content, genuine preview imagery, factual labels, and actions outside the artwork.
- Do preserve tab/panel relationships, keyboard navigation, visible focus, image fallback, and reduced-motion behavior when editing this surface.
- Do validate the complete document, mobile selector fit, and Journey boundary using current captures before visual approval.
- Don't promote this surface's heading, radius values, or composition to a global system replacement without authorization.

Evidence checked: both Certifications source files, `src/data/certificates.ts`, `JourneyTimeline.tsx`, `ui/timeline.tsx`, `AnimatedSection.tsx`, `layout.tsx`, current `globals.css` tokens, all four PDF/WebP/sidecar file sets, the surface brief, existing PRODUCT/DESIGN/sidecar drift, and the source review. The parent reports production build and targeted lint passed and one detector produced advisory font/radius differences against stale DESIGN.md. Those are source/build evidence, not a visual verdict; no checks were rerun by this documentation pass.

The parent additionally reports both source verification scripts passed. `.impeccable/runtime/verify-certificate-exhibition.cjs` exercises all four selections, panel/preview/PDF correspondence, roving tab state, keyboard wrap/Home/End, fallback recovery, HTTP page structure, and all eight certificate assets. `.impeccable/runtime/verify-timeline-containment.cjs` invokes the actual measurement effect with a throwing scrollHeight getter, confirms stable offsetHeight measurements and real layout resize response, observer cleanup, and both clip boundaries. This pass read both scripts; these checks do not supply a rendered browser or assistive-technology verdict.

The source review's earlier missing-provenance note is superseded by the four now-present sidecars; its visual `recapture` disposition remains valid. CUA reported no apps or browsers. Existing October 8 images predate this implementation and were not used as evidence. Required follow-up: capture current desktop/mobile views, all four selections, visible focus, complete readable previews, and the Journey/Certifications junction, then obtain the visual finish review. No current screenshots were fabricated or inferred.

Not canonized or repaired: superseded light-palette/static-skills narratives and older heading rules in PRODUCT.md, DESIGN.md, and `.impeccable/design.json`; advisory detector differences against those historical records. This is an ordinary local extension, and global system replacement is outside authorization. All three files were preserved.

Preservation check: SHA-256 hashes for PRODUCT.md, DESIGN.md, and `.impeccable/design.json` matched before and after this documentation pass.
