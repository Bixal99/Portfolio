"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { shouldEnableCustomCursor } from "./customCursor/shouldEnableCustomCursor";
import styles from "./CustomCursor.module.css";

const INTERACTIVE = 'a[href], button, [role="button"], [role="link"], summary, label, .cursor-pointer, .cursor-hover';
const NATIVE = '[data-about-lanyard], [data-demo-screen], [inert], input, textarea, select, [contenteditable="true"], iframe, video, :disabled, [aria-disabled="true"]';

function subscribeCapability(update: () => void) {
  const queries = [window.matchMedia("(pointer: fine)"), window.matchMedia("(prefers-reduced-motion: reduce)")];
  queries.forEach((query) => query.addEventListener("change", update));
  return () => queries.forEach((query) => query.removeEventListener("change", update));
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeCapability, shouldEnableCustomCursor, () => false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pointer = pointerRef.current;
    if (!enabled || !root || !pointer) return;

    let visible = false;
    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      visible = false;
      root.dataset.visible = "false";
      root.dataset.down = "false";
      root.dataset.caption = "false";
      document.documentElement.classList.remove("has-custom-cursor");
    };

    const updateTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element) || target.closest(NATIVE)) {
        hide();
        return false;
      }
      root.dataset.hover = String(Boolean(target.closest(INTERACTIVE)) && !target.closest("[data-no-cursor-change]"));
      const caption = target.closest<HTMLElement>("[data-cursor-label]")?.dataset.cursorLabel ?? "";
      if (captionRef.current && captionRef.current.textContent !== caption) captionRef.current.textContent = caption;
      root.dataset.caption = String(Boolean(caption));
      return true;
    };

    const paint = () => {
      frame = 0;
      pointer.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      root.dataset.flipX = String(clientX > window.innerWidth - 155);
      root.dataset.flipY = String(clientY > window.innerHeight - 65);
      if (!visible) {
        visible = true;
        root.dataset.visible = "true";
        document.documentElement.classList.add("has-custom-cursor");
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !updateTarget(event.target)) return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const over = (event: PointerEvent) => { updateTarget(event.target); };
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { hide(); return; }
      if (event.button === 0) root.dataset.down = "true";
    };
    const up = () => { root.dataset.down = "false"; };
    const visibility = () => { if (document.hidden) hide(); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") hide(); };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", keyboard);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", keyboard);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={rootRef} className={styles.cursor} data-visible="false" aria-hidden="true">
      <div ref={pointerRef} className={styles.pointerPosition}>
        <svg className={styles.pointer} width="25" height="29" viewBox="0 0 25 29" fill="none">
          <path className={styles.body} d="M1 1L7.5 27L13 17L24 12.5L1 1Z" strokeWidth="1.1" strokeLinejoin="round" />
          <path className={styles.fold} d="M1 1L13 17L7.5 27L1 1Z" />
          <path className={styles.crease} d="M1 1L13 17L24 12.5" strokeWidth=".75" strokeLinejoin="round" />
        </svg>
        <span ref={captionRef} className={styles.caption} />
      </div>
    </div>
  );
}
