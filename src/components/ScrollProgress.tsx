"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      const clamped = Math.min(1, Math.max(0, value));
      setProgress(Math.round(clamped * 100));
      bar.style.transform = `scaleY(${clamped})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 lg:flex">
      <div className="relative h-56 w-px bg-white/12">
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.75)]"
          style={{ transform: "scaleY(0)" }}
        />
        <span className="absolute -left-[3px] top-0 size-[7px] rounded-full bg-white" />
        <span className="absolute -bottom-0.5 -left-[3px] size-[7px] rounded-full bg-white/30" />
      </div>
      <div className="-rotate-90 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/42">
        {progress}% Scrolled
      </div>
    </div>
  );
}
