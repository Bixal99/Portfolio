"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Lanyard = dynamic(() => import("@/components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full min-h-[280px] w-full items-center justify-center sm:min-h-[420px]"
      aria-hidden="true"
    >
      <div className="size-40 rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-2xl" />
    </div>
  ),
});

export function AboutLanyard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inSection, setInSection] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let visible = false;
    const updateActive = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        updateActive();
        if (entry?.isIntersecting) {
          setInSection(true);
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", updateActive);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateActive);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-about-lanyard
      className="relative mx-auto w-full max-w-xl cursor-grab md:mx-0 md:ml-auto md:max-w-none"
      aria-label="Interactive ID card"
      aria-hidden={!inSection}
    >
      <div className="relative cursor-grab overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.45),0_0_28px_rgba(var(--accent-rgb),0.22),0_0_64px_rgba(var(--accent-rgb),0.12),0_28px_80px_rgba(16,23,47,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-[rgba(var(--accent-rgb),0.35)] transition-[box-shadow] duration-300 hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.65),0_0_36px_rgba(var(--accent-rgb),0.32),0_0_80px_rgba(var(--accent-rgb),0.18),0_32px_90px_rgba(16,23,47,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] active:cursor-grabbing">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl shadow-[inset_0_0_40px_rgba(var(--accent-rgb),0.08),inset_0_0_0_1px_rgba(var(--accent-rgb),0.18)]"
          aria-hidden="true"
        />
        <div className="relative h-[clamp(280px,55svh,420px)] w-full xl:h-[min(72vh,620px)]">
          {inSection ? (
            <Lanyard
              active={active}
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
