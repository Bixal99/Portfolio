# Plus grid and single click audio — October 27, 2026

Mode: Experience. Latest user request replaces the lone highlighted hero tile with a satisfying plus-shaped glow and removes all hover sounds, retaining one soothing sound for button/link activation.

Grid: one fully lit cell plus its four cardinal neighbors at .35 opacity. A bounded pool of 25 spans preserves short .42s fades behind movement; new cells arrive over .16s without sliding off the grid. One animation frame batches pointer updates, no React pointer-frame state, no idle loop. Existing soft ambient glow and dark/periwinkle palette stay. Touch does not simulate hover. Reduced motion uses immediate state changes; hidden/unmount clears queued work and tweens.

Audio: one short sine click (520 to240Hz, .092s voice, .12 master gain) shared across actual trusted button/link activations, including keyboard-generated clicks. Hover, pointer movement, entry/exit and focus have no audio handlers or timers. AudioContext is created/resumed only by activation, rapid duplicate events are bounded, pending first-click resume is canceled by mute/cleanup. Existing persistent mute and its quiet opt-out control are preserved. No delay is added to navigation.

Validation: actual module/effect mock tests verify plus geometry and bounded cleanup, and the one-cue audio engine/click-only registration, first-click unlock, repeat guard, cancellation and mute. These are source/runtime checks, not perceived audio or rendered smoothness approval. Existing old multi-cue verification reports describe superseded behavior; global docs are preserved.
