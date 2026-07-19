"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Lanyard = dynamic(() => import("@/components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full min-h-[420px] w-full items-center justify-center"
      aria-hidden="true"
    >
      <div className="size-40 rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-2xl" />
    </div>
  ),
});

export function AboutLanyard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inSection, setInSection] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const section = el.closest("#about") ?? el;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInSection(true);
        }
      },
      { rootMargin: "10% 0px", threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      data-about-lanyard
      className="relative mx-auto w-full max-w-xl cursor-grab md:mx-0 md:ml-auto md:max-w-none"
      aria-label="Interactive ID card"
      aria-hidden={!inSection}
    >
      <div className="relative cursor-grab overflow-hidden rounded-2xl bg-[#0c0c0e] shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.45),0_0_28px_rgba(var(--accent-rgb),0.22),0_0_64px_rgba(var(--accent-rgb),0.12),0_28px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-[rgba(var(--accent-rgb),0.35)] transition-[box-shadow] duration-300 hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.65),0_0_36px_rgba(var(--accent-rgb),0.32),0_0_80px_rgba(var(--accent-rgb),0.18),0_32px_90px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] active:cursor-grabbing">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl shadow-[inset_0_0_40px_rgba(var(--accent-rgb),0.08),inset_0_0_0_1px_rgba(var(--accent-rgb),0.18)]"
          aria-hidden="true"
        />
        <div className="relative h-[min(70vh,560px)] w-full md:h-[min(72vh,620px)]">
          {inSection ? (
            <Lanyard
              position={[0, 0, 13]}
              gravity={[0, -40, 0]}
              fov={18}
              frontImage="/Me.jpeg"
              backImage="/Me.jpeg"
              imageFit="cover"
              lanyardWidth={1}
              cardScale={2.7}
              hangY={4.7}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              aria-hidden="true"
            >
              <div className="size-40 rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
