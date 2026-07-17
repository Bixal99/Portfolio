"use client";

import { profile } from "@/data/portfolio";
import { InteractiveGridBackground } from "./InteractiveGridBackground";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh w-full scroll-mt-0 items-start justify-center overflow-hidden bg-black pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <InteractiveGridBackground />

      <div
        className="pointer-events-none absolute left-1/2 top-[42%] z-10 h-[min(80vw,34rem)] w-[min(100vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.16),transparent_68%)]"
        aria-hidden="true"
      />

      <div
        data-hero-copy
        className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:px-8"
      >
        <p
          data-hero-animate
          className="text-[clamp(1.45rem,3.4vw,2.15rem)] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]"
        >
          Hi, I am
        </p>

        <h1
          data-hero-animate
          data-hero-name
          className="mt-5 whitespace-nowrap text-[clamp(2.2rem,9vw,6.5rem)] font-bold uppercase leading-none tracking-[0.06em] text-white"
        >
          <span data-hero-name-word className="inline-block">
            {profile.name}
          </span>
        </h1>

        <div
          data-hero-animate
          className="mt-7 flex translate-x-4 items-center justify-center gap-3 text-[clamp(1.2rem,2.3vw,1.55rem)] sm:translate-x-8"
        >
          <span className="shrink-0 font-semibold uppercase tracking-[0.22em] text-white/70">
            Building with
          </span>
          <TypewriterLine />
        </div>
      </div>
    </section>
  );
}
