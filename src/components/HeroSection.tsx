"use client";

import { ArrowRight } from "lucide-react";
import { profile, resume } from "@/data/portfolio";
import { InteractiveGridBackground } from "./InteractiveGridBackground";
import { ResumeDownloadButton } from "./ResumeDownloadButton";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[78dvh] w-full scroll-mt-0 items-start justify-center overflow-hidden bg-black pt-28 pb-20 sm:min-h-[82dvh] sm:pt-36 sm:pb-24"
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
          className="max-w-full text-[clamp(1.15rem,4.2vw,2.2rem)] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] sm:whitespace-nowrap sm:tracking-[0.32em]"
        >
          Hi, I am
        </p>

        <h1
          data-hero-animate
          data-hero-name
          className="mt-5 max-w-full text-[clamp(1.85rem,11vw,7.15rem)] font-bold uppercase leading-none tracking-[0.02em] text-white sm:whitespace-nowrap sm:tracking-[0.05em]"
        >
          <span data-hero-name-word className="inline-block max-w-full break-words sm:whitespace-nowrap">
            {profile.name}
          </span>
        </h1>

        <div
          data-hero-animate
          className="mt-7 flex max-w-full translate-x-0 flex-col items-center justify-center gap-2 text-[clamp(1rem,3.8vw,1.8rem)] sm:translate-x-11 sm:flex-row sm:gap-3"
        >
          <span className="shrink-0 font-semibold uppercase tracking-[0.14em] text-white/70 sm:tracking-[0.22em]">
            Inspired to be
          </span>
          <TypewriterLine />
        </div>

        <div
          data-hero-animate
          className="mt-20 flex w-full max-w-full flex-col items-center gap-4 sm:mt-32 sm:flex-row sm:justify-center sm:gap-5"
        >
          <a
            href="#projects"
            className="group relative inline-flex h-[52px] w-full max-w-[260px] min-w-0 items-center gap-3.5 overflow-hidden rounded-full border-2 border-[var(--accent)] bg-[rgba(255,255,255,0.025)] py-[5px] pr-[22px] pl-[5px] text-white shadow-[0_18px_58px_rgba(var(--accent-rgb),0.16)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white hover:bg-[rgba(var(--accent-rgb),0.12)] hover:shadow-[0_22px_70px_rgba(var(--accent-rgb),0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.96] sm:w-[260px] sm:min-w-[260px]"
          >
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-white/25 opacity-0 transition-[left,opacity] duration-500 group-hover:left-[120%] group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-black transition-[transform,box-shadow] duration-300 group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(var(--accent-rgb),0.55)]">
              <ArrowRight
                className="size-5 translate-x-px transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </span>
            <span className="relative z-10 flex-1 text-center text-sm font-extrabold uppercase tracking-[0.18em]">
              View projects
            </span>
          </a>
          <ResumeDownloadButton
            href={resume.href}
            label={resume.label}
            placement="inline"
          />
        </div>
      </div>
    </section>
  );
}
