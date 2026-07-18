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
    let lastShown = -1;
    let running = true;

    const readTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const paint = () => {
      const height = track.offsetHeight;
      // Light exponential smoothing so motion feels continuous between frames
      current += (target - current) * 0.22;
      if (Math.abs(target - current) < 0.0004) current = target;

      fill.style.transform = `scaleY(${current})`;
      tip.style.transform = `translate3d(0, ${current * height}px, 0) translateY(-50%)`;

      const percent = Math.round(current * 100);
      if (percent !== lastShown) {
        lastShown = percent;
        label.textContent = String(percent);
      }

      if (running && Math.abs(target - current) > 0.0004) {
        frame = requestAnimationFrame(paint);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      readTarget();
      if (frame === 0) frame = requestAnimationFrame(paint);
    };

    readTarget();
    current = target;
    paint();

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  return (
    <div
      className="fixed left-5 top-1/2 z-40 hidden h-56 -translate-y-1/2 lg:block"
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
