# Certificates, Journey, and project rail handoff

October 27, 2026. Scoped refinement under `.impeccable/surfaces/certificates-journey-refinement.md`, preserving the incumbent dark palette, Poppins, factual information, and genuine documents. This documentation pass writes only this file.

## Recorded changes

- Project rail: retains its first-row-top origin and now extends to the divider above the closing project text. The measured endpoint is the outro offset minus the timeline offset; observing the section refreshes this geometry during responsive reflow. Project nodes remain on the rail.
- Journey: dates are static and transparent, with the left sticky/glowing hover treatment and date transforms removed. Content cards retain their resting styling, milestone text, imagery, nodes, and rail; hover outline and backdrop blur are removed.
- Certificates: four genuine document thumbnail tabs replace the disconnected text selectors, with explicit selected checks. Details remain issuer/title/type/date/topics, grouped compactly and aligned with the document top. A thin white mat and soft offset shadow frame contain-fit previews; View certificate and Download PDF actions remain tied to the full original PDFs. Below 1000px, facts precede paper in both DOM and visual reading order. Keyboard tab navigation, failure recovery, visible focus, and reduced-motion alternatives remain.

## Evidence and verification

Read the current surface brief and inspected relevant source in `ProjectGrid.tsx`, Journey/timeline components, and `Certifications.tsx` with its CSS module. The document plate uses contain-fit imagery, preserving complete wider certificates with white margins. No credential metadata, claims, original PDF, generated artwork, or preview asset was changed; authentic preview provenance sidecars remain.

The implementer reports production build, TypeScript, and targeted ESLint passing. Existing certificate selection/keyboard/failure/HTTP tests and all eight document/preview asset checks pass; the preview selector now targets the main panel image. Journey containment passes. Desktop/mobile fixtures invoke the actual rail measurement callback and verify its endpoint at the divider with the final node preceding it. This documenter did not rerun those checks. A fresh source-only finish reviewer was running at handoff; consult its final report for the definitive verdict.

One detector run produced 35 advisories concerning stale root design records. A fresh browser inventory returned no apps or browsers. No current rendered screenshots, computed-style measurements, visual approval, or interaction playback is claimed. Source geometry fixtures verify the calculation, not its rendered appearance.

## Documentation boundary

`PRODUCT.md`, `DESIGN.md`, the global design sidecar, and older briefs retain pre-existing palette, count, and presentation history. Current source and this scoped surface brief govern the correction. Those global records and older briefs remain preserved; their drift was recorded without repair, and these local choices do not establish a replacement visual system.
