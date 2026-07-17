# Custom Cursor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sitewide desktop custom cursor (core + spring trail, hover ring, click ripple) with white `mix-blend-difference` styling, disabled on touch and reduced motion.

**Architecture:** One client component `CustomCursor` mounts from `layout.tsx`. It toggles `html.has-custom-cursor` for CSS `cursor: none`, tracks mouse position, and drives ~10 trail dots via a GSAP ticker spring. Hover morph and click ripple use GSAP tweens. No new dependencies — project already has `gsap`.

**Tech Stack:** Next.js (App Router), React client component, GSAP ticker/tweens, Tailwind utility classes, `globals.css`.

## Global Constraints

- Sitewide on fine-pointer desktop only; native cursor on touch / coarse pointer / `prefers-reduced-motion: reduce`.
- Look: white elements + `mix-blend-mode: difference`.
- Interactions: hover hollow ring (~46px) + click ripple.
- Out of scope: magnetic lock, audio, gallery image-scatter trail.
- Do not break Character 3D mouse-look or text selection (`pointer-events: none` on cursor DOM).
- Opt-out hover morph with `[data-no-cursor-change]`.

## File Structure

| File | Responsibility |
| --- | --- |
| `src/components/customCursor/shouldEnableCustomCursor.ts` | Pure capability check (fine pointer + motion OK). |
| `src/components/CustomCursor.tsx` | DOM, listeners, GSAP ticker, hover/click behavior. |
| `src/app/layout.tsx` | Mount `<CustomCursor />` once. |
| `src/app/globals.css` | `html.has-custom-cursor` → force `cursor: none`. |

---

### Task 1: Capability helper + hide system cursor CSS

**Files:**
- Create: `src/components/customCursor/shouldEnableCustomCursor.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: N/A
- Produces: `shouldEnableCustomCursor(): boolean`

- [ ] **Step 1: Create the capability helper**

Create `src/components/customCursor/shouldEnableCustomCursor.ts`:

```typescript
export function shouldEnableCustomCursor(): boolean {
  if (typeof window === "undefined") return false;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return finePointer && !reduceMotion;
}
```

- [ ] **Step 2: Add CSS to force `cursor: none` while active**

Append to `src/app/globals.css` (after the existing `cursor: not-allowed` block is fine):

```css
html.has-custom-cursor,
html.has-custom-cursor * {
  cursor: none !important;
}
```

- [ ] **Step 3: Sanity-check helper in Node is unnecessary — verify file exists**

Run:

```bash
npx tsc --noEmit --pretty false 2>&1 | Select-Object -First 40
```

Expected: no errors related to `shouldEnableCustomCursor.ts` (project may already have unrelated errors; ignore those).

- [ ] **Step 4: Commit**

```bash
git add src/components/customCursor/shouldEnableCustomCursor.ts src/app/globals.css
git commit -m "feat: add custom cursor capability check and cursor-none CSS"
```

---

### Task 2: Build `CustomCursor` component

**Files:**
- Create: `src/components/CustomCursor.tsx`

**Interfaces:**
- Consumes: `shouldEnableCustomCursor()` from `src/components/customCursor/shouldEnableCustomCursor.ts`
- Produces: `export function CustomCursor(): JSX.Element | null`

- [ ] **Step 1: Create `CustomCursor.tsx` with full behavior**

Create `src/components/CustomCursor.tsx`:

```tsx
"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { shouldEnableCustomCursor } from "./customCursor/shouldEnableCustomCursor";

const TRAIL_COUNT = 10;
const SPRING = 0.4;
const HOVER_SELECTOR =
  'a, button, [role="button"], [role="link"], .cursor-pointer, .cursor-hover, summary, label, [data-skill-icon], [data-skill-drop-icon]';

type TrailPoint = {
  el: HTMLDivElement;
  x: number;
  y: number;
  baseSize: number;
  baseOpacity: number;
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const coreRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldEnableCustomCursor()) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const core = coreRef.current;
    const trailContainer = trailRef.current;
    const root = rootRef.current;
    if (!core || !trailContainer || !root) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isHovering = false;
    let visible = false;

    gsap.set(core, { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY });
    gsap.set(root, { autoAlpha: 0 });

    const trail: TrailPoint[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement("div");
      const size = Math.max(2, 16 - i * 1.1);
      const opacity = 1 - i * 0.05;
      el.className =
        "absolute top-0 left-0 rounded-full bg-white pointer-events-none will-change-transform box-border border-0 border-white";
      gsap.set(el, {
        width: size,
        height: size,
        opacity,
        xPercent: -50,
        yPercent: -50,
        x: mouseX,
        y: mouseY,
      });
      trailContainer.appendChild(el);
      trail.push({ el, x: mouseX, y: mouseY, baseSize: size, baseOpacity: opacity });
    }

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { autoAlpha: 1, duration: 0.2, overwrite: true });
    };

    const hide = () => {
      visible = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.15, overwrite: true });
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      show();
    };

    const onLeave = () => hide();

    const enterHover = () => {
      if (isHovering) return;
      isHovering = true;
      gsap.to(core, { scale: 0, duration: 0.2, overwrite: "auto" });
      gsap.to(trail[0].el, {
        width: 46,
        height: 46,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderRadius: "50%",
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    };

    const leaveHover = () => {
      if (!isHovering) return;
      isHovering = false;
      gsap.to(core, { scale: 1, duration: 0.3, overwrite: "auto" });
      gsap.to(trail[0].el, {
        width: trail[0].baseSize,
        height: trail[0].baseSize,
        backgroundColor: "#ffffff",
        borderWidth: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-no-cursor-change]")) return;
      if (target.closest(HOVER_SELECTOR)) enterHover();
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget;
      if (related instanceof Element) {
        if (related.closest("[data-no-cursor-change]")) {
          leaveHover();
          return;
        }
        if (related.closest(HOVER_SELECTOR)) return;
      }
      leaveHover();
    };

    const onDown = () => {
      gsap.to(core, { scale: isHovering ? 0 : 0.5, duration: 0.1, overwrite: "auto" });
      if (isHovering) {
        gsap.to(trail[0].el, { scale: 0.85, duration: 0.1, overwrite: "auto" });
      }
    };

    const onUp = () => {
      gsap.to(core, {
        scale: isHovering ? 0 : 1,
        duration: 0.4,
        ease: "back.out(3)",
        overwrite: "auto",
      });
      if (isHovering) {
        gsap.to(trail[0].el, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      }

      const ripple = document.createElement("div");
      ripple.className =
        "fixed rounded-full border border-white mix-blend-difference pointer-events-none z-[9999]";
      document.body.appendChild(ripple);
      gsap.set(ripple, {
        x: mouseX,
        y: mouseY,
        xPercent: -50,
        yPercent: -50,
        width: 20,
        height: 20,
        borderWidth: 3,
      });
      gsap.to(ripple, {
        width: 120,
        height: 120,
        opacity: 0,
        borderWidth: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    };

    const tick = () => {
      if (document.hidden) return;
      gsap.set(core, { x: mouseX, y: mouseY });

      let leaderX = mouseX;
      let leaderY = mouseY;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const pt = trail[i];
        pt.x += (leaderX - pt.x) * SPRING;
        pt.y += (leaderY - pt.y) * SPRING;
        gsap.set(pt.el, { x: pt.x, y: pt.y });
        leaderX = pt.x;
        leaderY = pt.y;
      }
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      gsap.ticker.remove(tick);
      trail.forEach((pt) => pt.el.remove());
      gsap.killTweensOf([core, root, ...trail.map((t) => t.el)]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10001] mix-blend-difference"
    >
      <div
        ref={coreRef}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-white will-change-transform"
      />
      <div ref={trailRef} className="pointer-events-none absolute inset-0 overflow-visible" />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck the new component**

Run:

```bash
npx tsc --noEmit --pretty false 2>&1 | Select-String -Pattern "CustomCursor|shouldEnableCustomCursor"
```

Expected: no matches (no errors in these files).

- [ ] **Step 3: Commit**

```bash
git add src/components/CustomCursor.tsx
git commit -m "feat: add GSAP spring-trail CustomCursor component"
```

---

### Task 3: Mount cursor in root layout + verify

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `CustomCursor` from `@/components/CustomCursor`
- Produces: Sitewide cursor on all pages

- [ ] **Step 1: Mount `<CustomCursor />` in the root layout**

Update `src/app/layout.tsx` to:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mohammad Bilal | Software Engineer & AI Engineer",
  description:
    "Mohammad Bilal portfolio: AI engineering, computer vision, machine learning, full-stack development, and software systems projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run the app and manually verify**

Run (if not already running):

```bash
npm run dev
```

Open `http://localhost:3000` on desktop and check:

1. System cursor hidden; white core + trail follow the mouse with lag.
2. Hover a nav link / button → core disappears, lead becomes ~46px hollow ring.
3. Click → brief press + expanding ripple.
4. Move mouse off the window → custom cursor hides.
5. DevTools device mode (touch) or emulate coarse pointer → native cursor, no custom DOM (or component inactive).
6. Character / 3D section still looks toward the mouse if present.
7. Text selection and form inputs still work.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: mount CustomCursor sitewide in root layout"
```

---

## Spec Coverage Checklist

| Spec requirement | Task |
| --- | --- |
| Sitewide desktop custom cursor | Task 2 + 3 |
| White + mix-blend-difference | Task 2 |
| Core + ~10 spring trail | Task 2 |
| Hover ring on interactive elements | Task 2 |
| Click ripple | Task 2 |
| Hide on mouse leave | Task 2 |
| Fine pointer + reduced-motion gate | Task 1 + 2 |
| `html.has-custom-cursor` + `cursor: none` | Task 1 + 2 |
| Mount in layout | Task 3 |
| `data-no-cursor-change` opt-out | Task 2 |
| No magnetic / audio / image trail | (intentionally omitted) |
| Character mouse-look untouched | Task 2 (read-only listeners) |
