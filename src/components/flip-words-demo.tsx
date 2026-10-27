"use client";

import { useRef } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { useReducedMotionPreference, useVisibleActivity } from "./useVisibleActivity";

export default function FlipWordsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const active = useVisibleActivity(sectionRef);
  const reduced = useReducedMotionPreference();
  const words = [
    "Dream",
    "Focus",
    "Logic",
    "Heart",
    "Skill",
    "Power",
    "Value",
    "Trust",
    "Speed",
    "Grace",
    "Grits",
    "Unity",
    "Faith",
    "Drive",
    "Spark",
    "Goals",
    "Ideas",
    "Minds",
    "Teams",
    "Hopes",
  ];

  return (
    <section ref={sectionRef} className="grid w-full place-items-center bg-[var(--background)] px-4 py-8 text-center sm:px-6 sm:py-12 lg:py-14">
      <h2 className="mx-auto flex max-w-full flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center text-[clamp(1.25rem,6.5vw,5.4rem)] font-bold leading-tight tracking-tight text-[var(--foreground)] sm:flex-nowrap sm:gap-x-0 sm:whitespace-nowrap sm:text-[clamp(1.5rem,4.8vw,5.4rem)]">
        <span className="text-balance sm:whitespace-nowrap">
          Building the future with&nbsp;
        </span>
        <span className="inline-flex min-w-[5.5ch] justify-center sm:min-w-[6ch] sm:justify-start">
          <FlipWords
            words={words}
            active={active && !reduced}
            className="theme-flip-word inline-block px-1"
          />
        </span>
      </h2>
    </section>
  );
}
