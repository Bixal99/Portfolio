# Custom Cursor Spec

## Overview

Add a sitewide desktop custom cursor inspired by [bajkamalsingh.me](https://bajkamalsingh.me/) (Visuals / gallery context): a small core dot, a spring-linked trail of circles, a hollow ring on interactive hover, and a click ripple. Use white elements with `mix-blend-mode: difference` so the cursor inverts against light and dark surfaces.

## Decisions

| Choice | Decision |
| --- | --- |
| Scope | Sitewide on fine-pointer desktop |
| Look | White + `mix-blend-mode: difference` |
| Interaction | Hover ring + click ripple |
| Implementation | GSAP ticker + DOM trail (Approach 1) |
| Mobile / touch | Native system cursor only |
| Reduced motion | Native system cursor only |

## Architecture

One client component, `CustomCursor`, mounted once from `src/app/layout.tsx`.

Responsibilities:

- Detect whether the custom cursor should run (fine pointer, no `prefers-reduced-motion`)
- Hide the system cursor while active
- Track mouse position and drive core + trail via GSAP ticker
- Handle hover morph and click ripple
- Clean up listeners and ticker on unmount

Out of scope (present on the reference site, not copied):

- Magnetic stick-to-element lock
- Hover / click audio
- Visuals gallery image-scatter trail

## Components & Files

### `src/components/CustomCursor.tsx`

Client component that:

1. On mount, checks `(pointer: fine)` and `prefers-reduced-motion: reduce`. If unsupported, render nothing.
2. Adds a class on `html` (e.g. `has-custom-cursor`) so CSS can force `cursor: none`.
3. Renders:
   - Core: small fixed white circle (`mix-blend-difference`, `pointer-events-none`, high z-index)
   - Trail container: ~10 absolute white circles with tapering size (~16px → ~2px) and slight opacity falloff
4. `mousemove` updates leader coordinates; GSAP ticker spring-follows each trail point to the previous (stiffness ~0.4).
5. Hover via `mouseover` / `mouseout` on targets matching `a, button, [role="button"], .cursor-pointer, .cursor-hover` (and similar interactive selectors), unless the target is inside `[data-no-cursor-change]`:
   - Core scales to 0
   - Lead trail expands to ~46px hollow ring (transparent fill, ~2px border)
6. `mousedown` / `mouseup`: brief core compress; on mouseup spawn a short expanding border ripple that fades and removes itself.
7. `mouseleave` on `document` / `window`: hide cursor elements so they do not stick at the viewport edge.
8. On unmount: remove ticker, listeners, and the `html` class.

### `src/app/layout.tsx`

Mount `<CustomCursor />` once inside `<body>` so it covers all pages.

### `src/app/globals.css`

When `html.has-custom-cursor` is present, set `cursor: none !important` on `html`, `body`, and descendants so existing `cursor: pointer` / `not-allowed` rules cannot reveal the system cursor. The custom cursor remains the only pointer visual while active.

## Data Flow

```
mousemove → store (x, y)
gsap.ticker → set core to (x, y); spring each trail[i] toward trail[i-1] / leader
mouseover interactive → hover morph (core hide, lead ring)
mouseout interactive → restore idle sizes
mousedown / mouseup → press scale + ripple
```

No shared app state or portfolio data required.

## Edge Cases

- Touch / coarse pointer: do not enable; leave native cursor.
- `prefers-reduced-motion: reduce`: do not enable.
- Element opt-out: `[data-no-cursor-change]` skips hover morph.
- Tab / window blur or mouse leave: hide custom cursor visuals.
- Character 3D mouse-look and other existing mousemove handlers remain unchanged; custom cursor only reads position for rendering.
- Do not break text selection or form inputs; cursor is visual-only (`pointer-events: none`).

## Testing

- Desktop Chrome/Firefox/Edge: trail follows smoothly; hover ring on links/buttons; click ripple.
- Resize / leave viewport: cursor does not stick on edge.
- Touch device or DevTools device mode: native cursor only.
- Reduced-motion OS setting: native cursor only.
- Confirm existing `cursor: pointer` CSS does not reveal the system cursor while active.
- Confirm 3D character section still tracks the mouse for head look.
