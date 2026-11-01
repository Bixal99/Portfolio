"use client";

import Image from "next/image";
import { useMemo } from "react";
import { journeyItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { Timeline } from "./ui/timeline";
import { SectionHeading } from "./SectionHeading";

export function JourneyTimeline() {
  const data = useMemo(
    () => journeyItems.map((item) => {
      const Icon = item.icon;
      return {
        title: item.year,
        content: (
          <article className="relative overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[var(--shadow-border)]" data-depth="3">
            {item.image ? (
              <div className="relative w-full bg-[var(--background)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  width={1200}
                  height={900}
                  sizes="(max-width: 768px) calc(100vw - 96px), (max-width: 1279px) 65vw, 680px"
                  className="h-auto w-full outline outline-1 -outline-offset-1 outline-[var(--edge)]"
                />
              </div>
            ) : null}

            <div className="relative p-5 sm:p-7 lg:p-8" data-depth="4">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] sm:size-14">
                  <Icon className="size-6 sm:size-7" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-6 text-[var(--accent)] sm:text-base">{item.organization}</p>
                  <h3 className="mt-1.5 text-balance text-[clamp(1.65rem,2.6vw,2.25rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-[var(--foreground)]">{item.title}</h3>
                </div>
              </div>
              <p className="mt-5 max-w-[58ch] text-pretty text-[15px] font-normal leading-[1.8] text-[var(--muted)] sm:mt-6 sm:text-[17px]">{item.description}</p>
            </div>
          </article>
        ),
      };
    }),
    [],
  );

  return (
    <AnimatedSection id="journey" className="!pb-16 !pt-16 sm:!pb-20 sm:!pt-20 lg:!pb-24 lg:!pt-24">
      <header className="mb-12 max-w-5xl sm:mb-16">
        <SectionHeading {...sectionMeta.journey} className="!mb-0" />
      </header>
      <Timeline data={data} />
    </AnimatedSection>
  );
}
