"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(bar, { scaleY: 0, transformOrigin: "top" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setProgress(Math.round(self.progress * 100));
        gsap.to(bar, {
          scaleY: self.progress,
          duration: 0.18,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 lg:flex">
      <div className="relative h-56 w-px bg-white/12">
        <div ref={barRef} className="absolute left-0 top-0 h-full w-px bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.75)]" />
        <span className="absolute -left-[3px] top-0 size-[7px] rounded-full bg-white" />
        <span className="absolute -bottom-0.5 -left-[3px] size-[7px] rounded-full bg-white/30" />
      </div>
      <div className="-rotate-90 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/42">
        {progress}% Scrolled
      </div>
    </div>
  );
}

