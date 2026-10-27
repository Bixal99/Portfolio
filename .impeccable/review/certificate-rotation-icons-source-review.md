# Disposition

**Ship at source level.** No material timer, cleanup, keyboard, semantics, or responsive-CSS blocker found. This is source approval only; no rendered visual approval or numeric score is claimed.

# Findings

- **Advisory — visibility threshold.** The observer specifies a 20% threshold but schedules from `isIntersecting`, which can initially be true below 20% visibility. It still stops completely offscreen. Compare `intersectionRatio` with `.2` if the intended rule is specifically 20% visible.
- **Advisory — keyboard travel.** Each technology remains a named focusable image. This retains keyboard tooltips but adds tab stops across the archive; it is an existing interaction tradeoff.

# Evidence

- Read the surface brief, craft floor, component/hook/CSS, technology-mark implementation, global palette, timer harness, and detector report. Existing light-theme documentation is stale relative to the current dark source tokens and was not treated as authority for this scoped pass.
- Rotation uses a fresh 20-second timeout after selection and resuming eligibility. Hover, focus, page hiding, offscreen state, explicit pause, and reduced motion suppress scheduling. Cleanup cancels the timeout, disconnects the observer, and removes every installed listener. Automatic selection never calls focus, scrolling, or audio APIs; the panel disables live announcements.
- Roving tabs preserve Left/Right/Home/End navigation, selected state, labels, panel relationships, and visible focus. Manual gallery focus latches pause; the labelled Pause/Resume control remains available. Genuine certificate data, previews, original PDF links, and failure recovery remain intact.
- Open selectors use typography and an underline instead of boxed cards. Bare brand marks have no surround, background, or pseudo-element geometry. Tooltips, touch-visible names, reduced-motion overrides, and brand colors remain. Actions are consistent 48px targets and stack below 360px; the exhibit becomes one column below 1000px.
- Independently reran `verify-certificate-rotation.cjs`: PASS. Parent-reported production build, TypeScript, targeted lint, selection/PDF/keyboard/failure harness, and eight asset HTTP checks pass. The 19 detector findings are advisories, not visual proof.

# Limitations

No connected browser surface was available. Actual wrapping, computed contrast, focus appearance, tooltip clipping, image balance, and desktop/mobile composition remain unverified in a current render. The timer harness tests isolated effect behavior rather than a real browser lifecycle.

# Handoff

No UI changes made. The two advisories do not warrant another build cycle. When rendering becomes available, inspect desktop and mobile together, including the selected tab beyond the mobile strip viewport and the Pause/Resume interaction.
