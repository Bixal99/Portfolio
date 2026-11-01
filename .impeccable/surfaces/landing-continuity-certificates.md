# Landing continuity and certificates

User correction: remove the wall-like cutoff across the landing page and the visible certificate selector strip; advance to the next certificate after five seconds.

The fixed navbar has a transparent full-width frame, with compact backgrounds only on the brand/action groups. Empty header space passes pointer events through. Shared sections and Journey rail containers no longer clip decorative overflow. The meteor trail uses alpha-aware drop shadows, avoiding a rectangular glow at its transparent tail. The root page still clips horizontal overflow.

Certificate tabs, refs, navigation code, and styling are removed. The gallery advances every 5000ms while visible, retains visibility/hidden-page cleanup and reduced-motion behavior, and preserves original PDF open/download actions. Focused-slide keyboard arrows plus Home/End allow all certificates to remain reachable without a visible selector. Carousel/slide semantics replace the removed tab semantics.

Verification: an in-memory hook check confirmed 5000ms scheduling, advancement, and cleanup. HTTP/source checks confirmed selector absence, retained carousel/PDF actions, and no opaque full-width header background. Build/lint outcomes are in the task response. Visual comparison remains unverified because of the previously established browser access blocker.
