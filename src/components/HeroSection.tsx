"use client";

import { heroStats, profile, resume } from "@/data/portfolio";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-0 items-center justify-center overflow-hidden py-28 sm:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,28rem)] w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.14),transparent_68%)]"
        aria-hidden="true"
      />

      <div
        data-hero-copy
        className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <p
          data-hero-animate
          className="max-w-3xl text-[clamp(1.65rem,5.2vw,3.35rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-white/30"
        >
          {profile.thesis}
        </p>

        <p
          data-hero-animate
          className="mt-10 text-sm font-semibold uppercase tracking-[0.34em] text-[var(--accent)] sm:text-base"
        >
          Hi, I am
        </p>

        <h1
          data-hero-animate
          data-hero-name
          className="mt-3 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
        >
          <span data-hero-name-word className="inline-block">
            {profile.name}
          </span>
        </h1>

        <div data-hero-animate className="mt-5 w-full max-w-xl">
          <TypewriterLine align="center" />
        </div>

        <p
          data-hero-animate
          className="mt-6 max-w-lg text-base leading-7 text-white/58 sm:text-lg sm:leading-8"
        >
          {profile.intro}
        </p>

        <div
          data-hero-animate
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={resume.href}
            download
            className="inline-flex items-center border border-white bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
          >
            {resume.label}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Contact
          </a>
        </div>

        <div
          data-hero-animate
          className="mt-12 flex w-full max-w-md items-start justify-center gap-8 border-t border-white/10 pt-8 sm:gap-12"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="min-w-0 text-center">
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
