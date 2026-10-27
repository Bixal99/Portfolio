# Grey and blue palette refresh

User directive, October 8, 2026: grey backgrounds instead of black, blue instead of teal throughout the codebase, colors only, inspired by the supplied light-surface reference. This supersedes the earlier black/mint palette commitment.

## Contract

Retain existing layouts, headings, Poppins typography, content, video demonstrations, and motion timings. Replace interface colors consistently, including navigation, loader, cursor, focus, hover, form fields, footer, shared heading accents, background effects, and legacy component defaults. Authentic media and technology artwork retain their original colors. Monochrome marks use navy on light surfaces; XGBoost's genuine white-lettered wordmark has a navy backing.

| Role | Color |
| --- | --- |
| Canvas | #eceef2 |
| Surface | #ffffff |
| Soft surface | #e3e7ee |
| Ink | #10172f |
| Muted ink | #44516b |
| Edge | #c7ceda |
| Accent | #254cdb |
| Accent hover | #183aa8 |
| Soft accent | #dfe7ff |
| On accent | #ffffff |

## Verification

Production build passes. Targeted ESLint passes with two existing img-element warnings in the unused StaggeredMenu. Full-repository existing lint errors in Lanyard, PageLoader, and timeline remain outside this color request.

Calculated WCAG contrast: navy/canvas 15.25:1; muted/canvas 6.86:1; blue/canvas 5.77:1; muted/white 7.97:1; white/blue 6.70:1; white/hover-blue 9.50:1.

Chrome captures at 1440 x 900 and 390 x 844 are in .impeccable/review/palette-*.png. Both viewports have no document horizontal overflow. Captures cover Hero, About, Projects, Skills, academic Journey, Contact/footer, mobile menu, selected/focused Skills, and playing video. Video advances with paused=false and native controls=true after explicit play. Fields use navy input text; submit uses white on cobalt. Animation timings and interactions are retained. Cursor blend is normal so cobalt stays blue on the light canvas.

Detector ran once on src: 106 findings, 8 primary, all primary concerning retained resume height animation/stripe or unused Landing.css Geist fonts. Advisories cover incumbent size/radius values and authentic brand, syntax, lighting, and shadow colors. No typography/layout refactor is authorized by this color-only directive.

Independent color review: initial full palette review found one material gap, reduced-motion ContactForm focus. Added a static white focused surface with a 1px cobalt edge and cobalt label in the existing reduced-motion CSS block. Recaptured the focused field and rebuilt successfully. Reviewer disposition: ship, at the one-focus-fix verdict scope; the fix is resolved with no visible regressions. Evidence: .impeccable/review/palette-verdict.md.

Normal-motion computed focus still resolves to white surface and cobalt label. Primary submit hover resolves to white text on #183aa8. Intermediate 900 x 900 viewport also has no document horizontal overflow.
