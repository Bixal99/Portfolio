"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "motion/react";

const LOAD_DURATION_SECONDS = 5;

const bootSignals = ["Interface", "Motion", "Systems", "Ready"];

type PageLoaderProps = {
  ready?: boolean;
};

export function PageLoader({ ready = true }: PageLoaderProps) {
  const [complete, setComplete] = useState(false);
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const hidden = complete && ready;

  useEffect(() => {
    const loader = loaderRef.current;
    const progressBar = progressRef.current;
    const ring = ringRef.current;
    const sweep = sweepRef.current;

    if (!loader || !progressBar || !ring || !sweep) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const progress = { value: 0 };
    const ringLength = ring.getTotalLength();

    gsap.set(ring, {
      strokeDasharray: ringLength,
      strokeDashoffset: ringLength,
      transformOrigin: "50% 50%",
    });
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setComplete(true),
    });

    if (prefersReducedMotion) {
      timeline
        .fromTo(loader, { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.1 })
        .to(progress, {
          value: 100,
          duration: LOAD_DURATION_SECONDS,
          ease: "none",
          onUpdate: () => setPercent(Math.round(progress.value)),
        })
        .to(
          progressBar,
          { scaleX: 1, duration: LOAD_DURATION_SECONDS, ease: "none" },
          "<",
        )
        .to(
          ring,
          {
            strokeDashoffset: 0,
            duration: LOAD_DURATION_SECONDS,
            ease: "none",
          },
          "<",
        )
        .to(loader, { autoAlpha: 0, duration: 0.45, ease: "power2.out" });

      return () => {
        timeline.kill();
      };
    }

    timeline
      .set(loader, { autoAlpha: 1, yPercent: 0 })
      .fromTo(
        "[data-loader-panel]",
        { autoAlpha: 0, y: 34, scale: 0.96, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.08,
        },
      )
      .fromTo(
        "[data-loader-word]",
        { yPercent: 105, rotate: 2, autoAlpha: 0 },
        {
          yPercent: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.82,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.38",
      )
      .fromTo(
        "[data-loader-signal]",
        { autoAlpha: 0, y: 16, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.08 },
        "-=0.42",
      )
      .to(
        progress,
        {
          value: 100,
          duration: LOAD_DURATION_SECONDS,
          ease: "power2.inOut",
          onUpdate: () => setPercent(Math.round(progress.value)),
        },
        "-=0.18",
      )
      .to(
        progressBar,
        { scaleX: 1, duration: LOAD_DURATION_SECONDS, ease: "power2.inOut" },
        "<",
      )
      .to(
        ring,
        {
          strokeDashoffset: 0,
          duration: LOAD_DURATION_SECONDS,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        "[data-loader-core]",
        { rotate: 360, duration: LOAD_DURATION_SECONDS, ease: "none" },
        "<",
      )
      .to(
        sweep,
        {
          xPercent: 175,
          duration: LOAD_DURATION_SECONDS,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(
        "[data-loader-pulse]",
        {
          scale: 1.16,
          autoAlpha: 0.28,
          duration: 1.25,
          repeat: 3,
          yoyo: true,
          ease: "sine.inOut",
        },
        "<",
      )
      .to(
        "[data-loader-signal]",
        {
          borderColor: "rgba(var(--accent-rgb),0.5)",
          color: "rgba(255,255,255,0.86)",
          duration: 0.36,
          stagger: 0.055,
        },
        ">-0.42",
      )
      .to(
        "[data-loader-panel], [data-loader-word]",
        {
          y: -28,
          autoAlpha: 0,
          filter: "blur(10px)",
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.in",
        },
        "+=0.2",
      )
      .to(
        loader,
        { yPercent: -100, duration: 0.92, ease: "expo.inOut" },
        "-=0.12",
      );

    return () => {
      timeline.kill();
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <motion.div
      ref={loaderRef}
      className="fixed inset-0 z-[100] overflow-hidden bg-black text-white"
      initial={false}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(var(--accent-rgb),0.2),transparent_30%),linear-gradient(120deg,transparent,rgba(var(--accent-rgb),0.08)_38%,rgba(255,255,255,0.055)_52%,transparent_68%)]"
      />
      <div
        ref={sweepRef}
        aria-hidden="true"
        className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
      />

      <div className="relative flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
          <div data-loader-panel className="min-w-0">
            <div className="mb-8 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/44">
              <span>Portfolio System</span>
              <span
                className="h-px flex-1 bg-gradient-to-r from-white/12 via-[var(--accent)]/35 to-transparent"
                aria-hidden="true"
              />
              <span className="text-white/30">Loading</span>
            </div>

            <div className="overflow-hidden">
              <p
                data-loader-word
                className="text-sm font-semibold uppercase tracking-[0.34em] text-[var(--accent)]"
              >
                Initializing
              </p>
            </div>
            <div className="mt-4 overflow-hidden">
              <h2
                data-loader-word
                className="max-w-3xl text-5xl font-semibold leading-[0.92] text-white sm:text-7xl lg:text-8xl"
              >
                Mohammad
                <span className="block text-white/38">Bilal</span>
              </h2>
            </div>

            <div className="mt-9 h-px w-full overflow-hidden bg-white/10">
              <div
                ref={progressRef}
                className="h-full bg-[var(--accent)] shadow-[0_0_30px_rgba(var(--accent-rgb),0.75)]"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {bootSignals.map((signal, index) => (
                <div
                  key={signal}
                  data-loader-signal
                  className="border border-white/10 bg-white/[0.035] px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <span className="mb-2 block text-[10px] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div
            data-loader-panel
            className="relative mx-auto grid size-64 place-items-center sm:size-72"
          >
            <div
              data-loader-pulse
              aria-hidden="true"
              className="absolute inset-7 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.035] shadow-[0_0_70px_rgba(var(--accent-rgb),0.18)]"
            />
            <div
              data-loader-core
              className="absolute inset-0 rounded-full border border-white/10"
            >
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.9)]" />
              <span className="absolute bottom-6 left-7 size-1.5 rounded-full bg-white/70" />
              <span className="absolute right-8 top-9 size-1 rounded-full bg-white/50" />
            </div>

            <svg
              className="absolute inset-0 size-full -rotate-90"
              viewBox="0 0 240 240"
              aria-hidden="true"
            >
              <circle
                cx="120"
                cy="120"
                r="90"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1"
              />
              <circle
                ref={ringRef}
                cx="120"
                cy="120"
                r="90"
                fill="none"
                stroke="var(--accent)"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>

            <div className="relative grid size-40 place-items-center rounded-full border border-white/12 bg-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:size-44">
              <div className="text-center">
                <span className="block text-[clamp(2.75rem,6vw,4.6rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--accent)] drop-shadow-[0_0_24px_rgba(var(--accent-rgb),0.35)]">
                  {percent}%
                </span>
                <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.28em] text-white/42">
                  MBN Loading
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
