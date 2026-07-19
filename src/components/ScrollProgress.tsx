"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    const tip = tipRef.current;
    const label = labelRef.current;
    if (!track || !fill || !tip || !label) return;

    let frame = 0;
    let current = 0;
    let target = 0;
    let trackHeight = track.offsetHeight;
    let lastShown = -1;
    let running = true;
    let lastTs = 0;

    // ~12Hz exponential settle — frame-rate independent
    const SMOOTHING = 18;

    const readTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const paint = (ts: number) => {
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 1 / 60;
      lastTs = ts;

      const k = 1 - Math.exp(-SMOOTHING * dt);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0003) current = target;

      fill.style.transform = `scaleY(${current})`;
      tip.style.transform = `translate3d(0, ${current * trackHeight}px, 0) translateY(-50%)`;

      const percent = Math.round(current * 100);
      if (percent !== lastShown) {
        lastShown = percent;
        label.textContent = String(percent);
      }

      if (running && Math.abs(target - current) > 0.0003) {
        frame = requestAnimationFrame(paint);
      } else {
        frame = 0;
        lastTs = 0;
      }
    };

    const kick = () => {
      readTarget();
      if (frame === 0) frame = requestAnimationFrame(paint);
    };

    const onResize = () => {
      trackHeight = track.offsetHeight;
      kick();
    };

    readTarget();
    current = target;
    fill.style.transform = `scaleY(${current})`;
    tip.style.transform = `translate3d(0, ${current * trackHeight}px, 0) translateY(-50%)`;
    lastShown = Math.round(current * 100);
    label.textContent = String(lastShown);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="fixed left-5 top-1/2 z-50 hidden h-56 -translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="relative h-full w-px rounded-full bg-white/18"
      >
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-px origin-top rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.55)] will-change-transform"
          style={{ transform: "scaleY(0)" }}
        />

        <div
          ref={tipRef}
          className="absolute left-0 top-0 flex items-center will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) translateY(-50%)" }}
        >
          <span className="h-px w-3 -translate-x-[5px] bg-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.65)]" />
          <span
            ref={labelRef}
            className="ml-2 font-[family-name:var(--font-poppins)] text-sm font-semibold tabular-nums tracking-tight text-[var(--accent)]"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
