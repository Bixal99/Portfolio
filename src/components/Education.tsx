"use client";

import { useState } from "react";
import { educationItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, educationItems.length - 1),
  );
  const active = educationItems[activeIndex];

  return (
    <AnimatedSection id="education">
      <SectionHeading {...sectionMeta.education} />

      <div className="mx-auto max-w-4xl">
        <div className="relative px-2 pt-4 sm:px-8">
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-[2.15rem] h-px bg-white/15 sm:left-16 sm:right-16"
          >
            <div
              className="h-full bg-[var(--accent)] transition-[width] duration-500 ease-out"
              style={{
                width:
                  educationItems.length <= 1
                    ? "100%"
                    : `${(activeIndex / (educationItems.length - 1)) * 100}%`,
              }}
            />
          </div>

          <ol className="relative grid grid-cols-3 gap-2 sm:gap-6">
            {educationItems.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index <= activeIndex;

              return (
                <li key={item.title} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`relative z-10 grid size-8 place-items-center rounded-full border-2 transition duration-300 sm:size-10 ${
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_22px_rgba(var(--accent-rgb),0.65)]"
                        : isPast
                          ? "border-[var(--accent)] bg-black"
                          : "border-white/25 bg-black hover:border-white/50"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full sm:size-2.5 ${
                        isActive ? "bg-black" : isPast ? "bg-[var(--accent)]" : "bg-white/30"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="mt-4 space-y-1"
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.18em] sm:text-sm ${
                        isActive ? "text-white" : "text-white/45"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)] sm:text-xs">
                      {item.period}
                    </p>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          key={active.title}
          className="mt-10 border border-white/12 bg-white/[0.03] p-6 transition duration-300 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            {active.period}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {active.title}
          </h3>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-white/40">
            {active.institution}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
            {active.details}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
