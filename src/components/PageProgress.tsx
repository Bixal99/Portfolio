"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageProgress.module.css";

export function PageProgress() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const marker = markerRef.current;
    const label = labelRef.current;
    if (!root || !fill || !marker || !label) return;
    let frame = 0;
    let needsMeasure = true;
    let distance = 0;
    let trackHeight = 0;
    let previous = -1;

    const paint = () => {
      frame = 0;
      if (needsMeasure) {
        distance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        root.hidden = distance <= 1;
        trackHeight = root.clientHeight;
        needsMeasure = false;
      }
      const progress = distance > 1 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      fill.style.transform = `scaleY(${progress})`;
      marker.style.transform = `translate3d(0, ${progress * trackHeight}px, 0)`;
      const percentage = Math.round(progress * 100);
      if (percentage !== previous) {
        previous = percentage;
        label.textContent = String(percentage);
        root.setAttribute("aria-valuenow", String(percentage));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const measure = () => { needsMeasure = true; schedule(); };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [pathname]);

  return (
    <div ref={rootRef} className={styles.progress} role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
      <div className={styles.track} aria-hidden="true" />
      <div ref={fillRef} className={styles.fill} aria-hidden="true" />
      <div ref={markerRef} className={styles.marker} aria-hidden="true"><span ref={labelRef} className={styles.label}>0</span></div>
    </div>
  );
}
