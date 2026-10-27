---
version: 1
slug: "src-components-customcursor-tsx"
primary_target: "src/components/CustomCursor.tsx"
related_targets: ["src/components/CustomCursor.module.css","src/components/InteractionFeedback.tsx","src/lib/interfaceAudio.ts","src/components/TechStack.tsx","src/components/ui/solar-system.tsx"]
---

# Pointer, sound, and skills core

Mode: Experience. Local refinement of the current dark/Poppins portfolio; preserve credentials, projects, navigation, PDF actions, and continuously moving skill orbits.

## Direction contract

THESIS: A precise instrument that responds to intention. Replace the rejected circular cursor and generic glowing orbit badge with a compact arrow/corner cursor and personal MB centre.

OWN-WORLD: Inherit ink-dark surfaces, pale foreground, blue accent, and Poppins. The centre uses the owner's initials, a restrained square mount, and four thin corner details. Remove the old core's glowing ellipses and generic orbit icon. Outer technology rings remain unchanged.

STORY: The visitor moves precisely, hears distinct quiet entry/exit/press cues on controls, and can mute all sounds. Sounds reinforce interaction without continuous chatter or delayed navigation.

FIRST VIEWPORT: The 24px arrow tracks the true pointer immediately. Small blue corner marks follow softly, settle without an idle loop, and acknowledge hover/press. Within Skills, a compact upright MB monogram anchors the moving technology rings without the old circular badge or core halo.

FORM: Narrow user-requested local redesign, no new world or seed. Signature interaction is the three-part audio grammar: rising entry, falling departure, and a more definite press. Entry requires brief dwell; pointer movement drives hover sounds so moving orbits cannot trigger chatter under a stationary pointer. One user gesture unlocks browser audio. Keyboard focus uses the same grammar, touch uses press only. Keep mute persistence, disabled/inert exclusions, reduced-motion/native-pointer fallbacks, bounded audio/effect work, and cleanup.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Budget: no new dependencies or raster assets, no autoplay, no global GSAP frame cap, no React state updates on pointer frames. Current browser surfaces were unavailable in preceding work; source/runtime checks cannot be described as visual/audio approval.

## Implemented local rules

Source record, October 26, 2026. This brief records the local extension only; it does not revise the global visual system.

- **Immediate pointer, settling accent.** A 24px by 30px SVG arrow tracks client coordinates through GSAP setters. Its 30px corner accent follows a separate time-adjusted settling loop (45ms smoothing constant), ending when the remaining combined distance is at most .05px. Hover changes the arrow to the inherited accent and opens the corner marks; primary press briefly compresses both. There is no React state update on a pointer frame.
- **Native interaction remains available.** The custom cursor renders only for a fine pointer without reduced motion and handles mouse movement only. Form editing, media, iframes, lanyard/demo regions, and disabled targets restore the native pointer. Tab, window blur, document hiding, cancellation, and pointer exit hide the custom pointer and cancel its frame loop. Capability changes and unmount remove listeners and the root cursor class.
- **Three short cues.** Entry rises, departure falls, and press has a deeper two-voice attack. Mouse movement selects the closest eligible control and entry waits 85ms; moving orbit controls cannot produce repeated hover sounds under an idle pointer. Keyboard focus shares the active-control state; the 180ms recent-pointer guard avoids duplicate focus cues. Touch clears hover silently and receives press feedback. Disabled controls, inert regions, and `data-feedback="off"` subtrees are excluded.
- **Audio follows consent to interact.** A trusted pointer/key gesture unlocks the Web Audio context. Hover never creates or resumes one. Sound starts enabled after hydration unless the stored preference is off. The fixed 44px mute control exposes `aria-pressed`, preserves the preference in local storage with a memory fallback, and opts itself out of cue/pulse feedback. Closing the context cancels pending first-press playback. Hidden documents suspend audio; supported later gestures resume it.
- **Bounded feedback.** Master gain is .18; voices last 35â€“75ms before their short stop allowance, disconnect on completion, and obey 55ms press/75ms hover throttles plus 140ms post-press hover suppression. Click pulses last 420ms and are capped at six. Reduced motion removes click pulses and relevant transitions. Timers, listeners, pulses, frames, and audio contexts are cleaned up.
- **Personal upright centre.** The MB monogram uses the inherited Poppins face (26px/600; 20px below 768px), with B in the inherited accent. The noninteractive mount measures 78px with 16px corners, or 58px with 12px corners below 768px; four thin accent corner marks sit 6px outside it. Inverse rotation keeps the centre upright within the tilted plane. Generic core imagery, spinning centre ellipses, and the pulsing core halo are removed. All 22 outer badges, their orbit rings, dust, and continuous hover motion remain; visibility pauses motion and reduced motion uses static distributed positions.

## Inherited tokens and scope

The extension reads the current CSS variables rather than introducing a new palette: background `#080b12`, foreground `#edf1fa`, surface `#111725`, soft surface `#192133`, muted `#a8b4cb`, edge `#2b3549`, accent `#8ca5ff`, accent RGB `140, 165, 255`, and accent hover `#b2c3ff`. Poppins remains the typography authority. Arrow shadow, existing orbit depth, the circular 44px sound control, and circular click pulses are component details; the user's rejected circular cursor is not a prohibition on every circle in this existing orbital world.

No dependencies, audio downloads, raster assets, global frame caps, palette changes, project/gallery changes, or global design-file changes were introduced by this refinement. PRODUCT.md, DESIGN.md, and `.impeccable/design.json` retain historical light/static-skills records. Their drift is recorded, not repaired or promoted over the user's current dark/Poppins/moving-orbit instruction.

## Evidence and remaining finish gate

The source audit at `../review/pointer-sound-source-review.md` has `disposition: ship` for source correctness only. The parent implementation pass reports a passing production build, target lint, and the source/mock/HTTP checks in `../runtime/verify-sound-grammar.cjs`, `../runtime/verify-arrow-cursor.cjs`, and `../runtime/verify-personal-core.cjs`. One detector pass returned advisory mismatches against the stale global records; it was not rerun to obtain a different verdict.

The visual review at `../review/pointer-sound-visual-review.md` remains `disposition: recapture`. Browser discovery returned no enabled apps or browsers. Current desktop and mobile captures, perceived pointer precision, core balance/reflow, real touch and keyboard interactions, browser audio unlock/resume, mute persistence, and actual listening quality remain unverified. Source checks and mocked audio are not rendered or heard evidence. This local documentation closes the source record, not the visual/audio finish gate. No new raster provenance record is required because this change produced no raster asset.

## Latest cursor correction — October 26, 2026

The user rejected the arrow/corner combination with a screenshot. The cursor now has one small 18x23px pointer only: corner accents and their trailing frame loop are removed. The SVG viewBox starts at the arrow tip, keeping the hotspot at the actual pointer coordinate. Hover changes its colour and press scales it subtly; native/reduced-motion fallbacks and all three interface sounds remain. This supersedes the earlier corner-accent rule in this brief. Targeted ESLint passed; no rendered preview is claimed.

## Latest cursor redesign — October 26, 2026

The user also rejected the plain arrow. It is now replaced by a precisely centred 8px soft dot that transitions into a thin 28px ring with a quiet centre over interactive controls. Press briefly compresses the visual; all positioning is immediate, with no trailing marks or frame loop. This supersedes the arrow geometry documented above. Native/coarse-pointer/reduced-motion fallbacks and the three sound cues remain. Targeted ESLint passed; rendered appearance remains unverified.
