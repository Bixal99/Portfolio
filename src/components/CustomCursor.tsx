"use client";

import gsap from "gsap";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { shouldEnableCustomCursor } from "./customCursor/shouldEnableCustomCursor";

const TRAIL_COUNT = 10;
/** Base spring at 60fps; scaled by deltaRatio so motion stays smooth at 120Hz */
const SPRING = 0.35;
const HOVER_SELECTOR =
  'a, button, [role="button"], [role="link"], .cursor-pointer, .cursor-hover, summary, label, [data-skill-icon], [data-skill-drop-icon]';

type TrailPoint = {
  el: HTMLDivElement;
  x: number;
  y: number;
  baseSize: number;
  setX: (v: number) => void;
  setY: (v: number) => void;
};

function subscribeCustomCursorCapability(onStoreChange: () => void) {
  const finePointer = window.matchMedia("(pointer: fine)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  finePointer.addEventListener("change", onStoreChange);
  reduceMotion.addEventListener("change", onStoreChange);

  return () => {
    finePointer.removeEventListener("change", onStoreChange);
    reduceMotion.removeEventListener("change", onStoreChange);
  };
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeCustomCursorCapability,
    shouldEnableCustomCursor,
    () => false,
  );
  const coreRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const core = coreRef.current;
    const trailContainer = trailRef.current;
    const root = rootRef.current;
    if (!core || !trailContainer || !root) return;

    const prevFps = gsap.ticker.fps();
    gsap.ticker.fps(120);
    gsap.ticker.lagSmoothing(0);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isHovering = false;
    let visible = false;

    gsap.set(core, { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY });
    gsap.set(root, { autoAlpha: 0 });

    const setCoreX = gsap.quickSetter(core, "x", "px");
    const setCoreY = gsap.quickSetter(core, "y", "px");

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
        force3D: true,
      });
      trailContainer.appendChild(el);
      trail.push({
        el,
        x: mouseX,
        y: mouseY,
        baseSize: size,
        setX: gsap.quickSetter(el, "x", "px"),
        setY: gsap.quickSetter(el, "y", "px"),
      });
    }

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(root, { autoAlpha: 1, duration: 0.15, overwrite: true });
    };

    const hide = () => {
      visible = false;
      gsap.to(root, { autoAlpha: 0, duration: 0.12, overwrite: true });
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
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const leaveHover = () => {
      if (!isHovering) return;
      isHovering = false;
      gsap.to(core, { scale: 1, duration: 0.25, overwrite: "auto" });
      gsap.to(trail[0].el, {
        width: trail[0].baseSize,
        height: trail[0].baseSize,
        backgroundColor: "#ffffff",
        borderWidth: 0,
        duration: 0.3,
        ease: "power3.out",
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
      gsap.to(core, {
        scale: isHovering ? 0 : 0.5,
        duration: 0.08,
        overwrite: "auto",
      });
      if (isHovering) {
        gsap.to(trail[0].el, {
          scale: 0.85,
          duration: 0.08,
          overwrite: "auto",
        });
      }
    };

    const onUp = () => {
      gsap.to(core, {
        scale: isHovering ? 0 : 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      if (isHovering) {
        gsap.to(trail[0].el, {
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
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
        force3D: true,
      });
      gsap.to(ripple, {
        width: 120,
        height: 120,
        opacity: 0,
        borderWidth: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    };

    const tick = () => {
      if (document.hidden) return;

      const factor = 1 - Math.pow(1 - SPRING, gsap.ticker.deltaRatio(60));

      setCoreX(mouseX);
      setCoreY(mouseY);

      let leaderX = mouseX;
      let leaderY = mouseY;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const pt = trail[i];
        pt.x += (leaderX - pt.x) * factor;
        pt.y += (leaderY - pt.y) * factor;
        pt.setX(pt.x);
        pt.setY(pt.y);
        leaderX = pt.x;
        leaderY = pt.y;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
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
      gsap.ticker.fps(prevFps);
      gsap.ticker.lagSmoothing(500, 33);
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
      <div
        ref={trailRef}
        className="pointer-events-none absolute inset-0 overflow-visible"
      />
    </div>
  );
}
