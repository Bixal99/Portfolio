# Plus grid and single click sound handoff

October 27, 2026. Scoped implementation of `.impeccable/surfaces/plus-grid-single-click.md`. This documentation pass writes only this report.

Hero illumination now forms a five-cell plus: a full-strength center with softer arms. A bounded 25-cell pool supports short entry and slower fading trails, with animation-frame input batching and no idle loop. Touch/reduced-motion handling and cleanup remain explicit.

Interaction audio now registers capture-phase clicks only. Hover/focus sound handlers and timers are removed; persistent mute and visual click pulses remain. One sine voice descends from 520Hz to 240Hz over 0.092 seconds, with master gain 0.12 and a 65ms guard. Audio context creation stays lazy. A generation counter cancels pending first-resume cues on hiding/close; suspension also handles a pending resume. Matching storage events close audio on cross-tab mute, and hidden clicks are ignored. No new audio or image asset was introduced.

Read the current surface brief, hero grid source, interaction event registrations, and audio implementation, including the final lifecycle fixes. The implementer reports expanded grid/audio mocks passing for plus geometry/pool/cleanup, click-only registration, one voice, gesture unlock, async cancellation, hidden clicks, and mute lifecycle. Production build, TypeScript, and targeted lint pass. The detector produced two advisories only. Independent source review was evaluating the final lifecycle fixes at handoff.

No rendered smoothness, physical speaker playback, or perceived sound quality approval is claimed. Source/mocks verify behavior and parameters, not perception. Earlier sound reports remain superseded historical evidence; global design records, older reports, and unrelated UI remain untouched.
