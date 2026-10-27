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
            <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[var(--shadow-border)]">
              {item.image ? (
                <div className="relative w-full bg-[var(--background)]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    width={1200}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="h-auto w-full outline outline-1 -outline-offset-1 outline-[var(--edge)]"
                  />
                </div>
              ) : null}

              <div className="relative p-5 sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--muted)]">
                      {item.organization}
                    </p>
                    <h3 className="mt-2 text-balance text-2xl font-extrabold leading-tight text-[var(--foreground)] sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--background)] text-[var(--accent)] shadow-[var(--shadow-border)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="text-pretty text-sm font-medium leading-7 text-[var(--muted)] sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ),
        };
      }),
    [],
  );

  return (
    <AnimatedSection
      id="journey"
      className="!overflow-clip !pb-16 !pt-16 sm:!pb-20 sm:!pt-20 lg:!pb-24 lg:!pt-24"
    >
      <header className="mb-6 max-w-5xl md:mb-8">
        <SectionHeading {...sectionMeta.journey} />
        <p className="mt-5 max-w-2xl text-pretty text-base font-medium leading-7 text-[var(--muted)] sm:text-lg">
          {sectionMeta.journey.title}
        </p>
      </header>

      <Timeline data={data} />
    </AnimatedSection>
  );
}
