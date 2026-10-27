"use client";

import { useEffect, type RefObject } from "react";

export const CERTIFICATE_INTERVAL = 20_000;

export function useCertificateRotation(containerRef: RefObject<HTMLDivElement | null>, selected: number, advance: () => void) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let actionFocused = Boolean(document.activeElement?.closest("[data-certificate-action]"));
    const stop = () => { clearTimeout(timer); timer = undefined; };
    const schedule = () => {
      stop();
      if (reduced.matches || !visible || actionFocused || document.hidden) return;
      timer = setTimeout(advance, CERTIFICATE_INTERVAL);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: 0 });
    const focusIn = (event: FocusEvent) => { actionFocused = Boolean((event.target as Element).closest("[data-certificate-action]")); schedule(); };
    const focusOut = (event: FocusEvent) => { actionFocused = Boolean((event.relatedTarget as Element | null)?.closest("[data-certificate-action]")); schedule(); };
    observer.observe(container);
    container.addEventListener("focusin", focusIn);
    container.addEventListener("focusout", focusOut);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      stop(); observer.disconnect();
      container.removeEventListener("focusin", focusIn);
      container.removeEventListener("focusout", focusOut);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [containerRef, selected, advance]);
}
