"use client";

import Image from "next/image";
import { useMemo } from "react";
import { journeyItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { Timeline } from "./ui/timeline";

export function JourneyTimeline() {
  const HeadingIcon = sectionMeta.journey.icon;

  const data = useMemo(
    () =>
      journeyItems.map((item) => {
        const Icon = item.icon;
        return {
          title: item.year,
          content: (
            <div className="group relative border border-white/12 bg-[#070707]/85 backdrop-blur-xl transition duration-300 hover:border-[var(--accent)]/45">
              {item.image ? (
                <div className="relative w-full bg-black/40">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    width={1200}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="h-auto w-full"
                  />
                </div>
              ) : null}

              <div className="relative p-5 sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/38">
                      {item.organization}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center border border-white/18 bg-black/60 text-[var(--accent)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="text-sm font-medium leading-7 text-white/62 sm:text-base">
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
    <AnimatedSection id="journey" className="!py-12 sm:!py-14 lg:!py-16">
      <header className="mb-6 max-w-5xl md:mb-8">
        <h2
          data-pixel-title
          className="flex items-center gap-4 text-balance text-5xl font-extrabold leading-[0.92] text-white sm:text-6xl lg:text-7xl"
          aria-label={sectionMeta.journey.kicker}
          title={sectionMeta.journey.title}
        >
          <span className="flex shrink-0 items-center gap-4" aria-hidden="true">
            <span
              data-pixel-item
              className="h-1 w-16 rounded-full bg-[var(--accent)] shadow-[0_0_22px_rgba(var(--accent-rgb),0.72)]"
            />
            <HeadingIcon
              data-pixel-item
              className="size-12 text-[var(--accent)] drop-shadow-[0_0_16px_rgba(var(--accent-rgb),0.62)] sm:size-14 lg:size-16"
            />
          </span>
          <span
            className="inline-flex flex-wrap items-baseline gap-x-3"
            aria-hidden="true"
          >
            {sectionMeta.journey.kicker.split(" ").map((word, wordIndex) => (
              <span key={word} className="inline-flex whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <span
                    key={`${word}-${char}-${charIndex}`}
                    data-pixel-item
                    className={
                      wordIndex === 0 ? "text-[var(--accent)]" : "text-white"
                    }
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/56 sm:text-lg">
          {sectionMeta.journey.title}
        </p>
      </header>

      <Timeline data={data} />
    </AnimatedSection>
  );
}
