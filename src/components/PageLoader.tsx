"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const bootSteps = ["Booting interface", "Mapping skills", "Loading projects", "Preparing scroll" ];

export function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const bar = barRef.current;
    const orbit = orbitRef.current;

    if (!loader || !bar || !orbit) {
      return;
    }

    const progress = { value: 0 };
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setHidden(true),
    });

    timeline
      .set(loader, { yPercent: 0 })
      .fromTo("[data-loader-grid]", { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.015 })
      .fromTo("[data-loader-title]", { y: 40, autoAlpha: 0, filter: "blur(12px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.75, stagger: 0.08 }, "-=0.2")
      .fromTo("[data-loader-step]", { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.45, stagger: 0.1 }, "-=0.35")
      .to(progress, {
        value: 100,
        duration: 1.25,
        ease: "power2.inOut",
        onUpdate: () => setPercent(Math.round(progress.value)),
      }, "-=0.2")
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.25, ease: "power2.inOut" }, "<")
      .to(orbit, { rotate: 360, duration: 1.25, ease: "power2.inOut" }, "<")
      .to("[data-loader-step], [data-loader-title]", { y: -22, autoAlpha: 0, duration: 0.42, stagger: 0.035 }, "+=0.12")
      .to(loader, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1");

    return () => {
      timeline.kill();
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[100] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-60" aria-hidden="true">
        {Array.from({ length: 48 }).map((_, index) => (
          <span key={index} data-loader-grid className="border-b border-r border-white/[0.045]" />
        ))}
      </div>

      <div className="relative flex min-h-dvh items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <div className="mb-8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-white/42">
            <span data-loader-title>Portfolio System</span>
            <span data-loader-title className="text-[var(--accent)]">{percent}%</span>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_180px] md:items-center">
            <div>
              <div className="overflow-hidden">
                <h2 data-loader-title className="text-5xl font-semibold leading-none tracking-[-0.055em] sm:text-7xl">
                  Mohammad
                  <span className="block text-white/42">Bilal Nadeem</span>
                </h2>
              </div>

              <div className="mt-8 grid gap-3">
                {bootSteps.map((step, index) => (
                  <div key={step} data-loader-step className="flex items-center gap-3 border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-white/62">
                    <span className="grid size-7 place-items-center border border-[var(--accent)]/40 text-[10px] font-bold text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div data-loader-title className="relative mx-auto grid size-40 place-items-center">
              <div ref={orbitRef} className="absolute inset-0 rounded-full border border-dashed border-[var(--accent)]/55" />
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <span className="text-3xl font-semibold text-[var(--accent)]">MBN</span>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/10">
            <div ref={barRef} className="h-full origin-left bg-[var(--accent)] shadow-[0_0_26px_rgba(var(--accent-rgb),0.65)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

