# Skills orbit restoration

Restored `TechStack.tsx` and `ui/solar-system.tsx` from commit `ba5adfa`, retaining
the original tilted three-ring layout and the languages, frameworks, and platform
orbit assignments. The triangle experiment is replaced.

Orbit glow, dust, central icon, surfaces, tooltips, and controls now follow the
current dark/blue theme. Labels and tooltips use the loaded Poppins font. Brand
icons retain their own colors.

GSAP reveals the scene on scroll. The original synchronized orbit and billboard
animations keep logos upright. Animation pauses while offscreen, in hidden tabs,
on an icon hover/focus, or through the Pause control. Reduced-motion preferences
show static, separately positioned icons. Per-icon backdrop blur is removed.

The original three rings contain 22 technologies. A native All technologies
disclosure preserves access to all 42 skill names and logos, including those
outside the original orbit selection.
