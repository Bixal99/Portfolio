# Cursor and hover motion — October 27, 2026

Mode: Experience. Local motion refinement within the existing ink, periwinkle and Poppins portfolio. User rejects the plain white cursor and basic hover treatment. Preserve project content, posters, URLs, scroll-only navigation selection, hero grid behavior, and precise pointer hotspot.

Motion thesis: the poster behaves like a printed object under a moving light. Mouse position sets restrained perspective and the highlight; play actions read as part of that poster. The cursor becomes a deliberately drawn two-tone folded dart, with short contextual action captions on project controls. It tracks the real mouse immediately; earlier arrow/corner and dot/ring treatments are rejected evidence, not patterns to restore.

Continuity: pointer hotspot remains at the sharp tip; poster media keeps 16:10 dimensions and stable layout; the whole unplayed poster becomes the demo/open action. Existing native video and error recovery remain.

Feedback: project buttons gain an ink-fill reveal, a traveling arrow, and a clean press state. Social icon hover uses a small lift instead of neon glow. Keyboard focus receives clear border/color and remains visible. Reduced motion keeps static artwork, native pointer, and color/focus feedback.

Budget: no new dependency, images, canvas, idle loop, perpetual shimmer or pointer-frame React state. Poster listeners attach only to the hovered media element and update via one animation frame. Pointer location uses immediate GSAP setters; caption content changes only with target changes. Cleanup cancels pending frames/listeners and restores native behavior.

Validation scope: build, targeted lint, HTTP/source checks and independent scoped review. Browser availability must be reported honestly; prior environment had no connected surfaces. Global design records have pre-existing light-palette drift and are not repaired by this motion task.
