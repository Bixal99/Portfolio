# Project card alignment source review

Verdict: SHIP (source review).

No material sizing, cascade, or row-span issue found in the three requested files. Desktop cards span seven shared grid rows: the preview contributes media, controls, and note rows; details contributes four content rows. The empty archive note preserves the shared title position when its adjacent card has a note. Equal-width columns retain equal poster proportions, and pair heights accommodate the larger content without truncation.

At 760px and below, card/details flex layout and block previews restore natural single-column sizing; empty notes are hidden. Final-pair padding selectors correctly remove trailing desktop spacing for both even and odd card counts.

Reviewed only ProjectArchive.module.css, ProjectPreview.tsx, and ProjectCards.module.css. No UI edits made. This is source evidence only; no rendered screenshot approval is claimed. Parent reports targeted ESLint passed; production build result remains with parent.
