"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function LegalScrollProgress() {
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

    let trackHeight = track.offsetHeight;
    let anim: ReturnType<typeof animate> | null = null;
    const proxy = { v: 0 };

    const apply = (value: number) => {
      fill.style.transform = `scaleY(${value})`;
      tip.style.transform = `translate3d(0, ${value * trackHeight}px, 0) translateY(-50%)`;
      label.textContent = String(Math.round(value * 100));
    };

    const readTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    proxy.v = readTarget();
    apply(proxy.v);

    const kick = () => {
      const target = readTarget();
      anim?.pause();
      anim = animate(proxy, {
        v: target,
        duration: 280,
        ease: "out(3)",
        onUpdate: () => apply(proxy.v),
      });
    };

    const onResize = () => {
      trackHeight = track.offsetHeight;
      kick();
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      anim?.pause();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="fixed right-5 top-1/2 z-40 hidden h-56 -translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <div ref={trackRef} className="relative h-full w-px rounded-full bg-white/18">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-px origin-top rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.55)] will-change-transform"
          style={{ transform: "scaleY(0)" }}
        />
        <div
          ref={tipRef}
          className="absolute right-0 top-0 flex flex-row-reverse items-center will-change-transform"
          style={{ transform: "translate3d(0, 0, 0) translateY(-50%)" }}
        >
          <span className="h-px w-3 translate-x-[5px] bg-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.65)]" />
          <span
            ref={labelRef}
            className="mr-2 font-[family-name:var(--font-poppins)] text-sm font-semibold tabular-nums tracking-tight text-[var(--accent)]"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
