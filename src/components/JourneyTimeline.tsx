"use client";

import { useEffect, useRef, useState } from "react";
import { journeyItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const HeadingIcon = sectionMeta.journey.icon;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>("[data-journey-item]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible[0]) {
          const index = Number(
            (visible[0].target as HTMLElement).dataset.journeyIndex ?? 0,
          );
          setActiveIndex(index);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const fillPercent =
    journeyItems.length <= 1
      ? 100
      : (activeIndex / (journeyItems.length - 1)) * 100;

  return (
    <AnimatedSection id="journey" className="!py-16 sm:!py-20 lg:!py-24">
      <div ref={sectionRef} className="relative py-4">
        <header className="mb-10 max-w-5xl md:mb-12">
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

        <div className="relative mx-auto max-w-6xl pb-4 pt-2">
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 h-full w-px overflow-hidden bg-white/12 md:left-1/2 md:-translate-x-1/2"
          >
            <div
              className="w-full origin-top bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)] transition-[height] duration-500 ease-out"
              style={{ height: `${fillPercent}%` }}
            />
          </div>

          <div className="space-y-10 md:space-y-12">
            {journeyItems.map((item, index) => {
              const Icon = item.icon;
              const alignLeft = index % 2 === 0;
              const isActive = index === activeIndex;

              return (
                <article
                  data-journey-item
                  data-journey-index={index}
                  key={`${item.year}-${item.title}`}
                  className="relative grid min-h-[180px] gap-5 pl-16 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:items-center md:pl-0"
                >
                  <div
                    className={`group relative overflow-hidden border bg-[#070707]/78 p-5 backdrop-blur-xl transition duration-300 sm:p-6 ${
                      isActive
                        ? "border-[var(--accent)]/55 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                        : "border-white/14 hover:border-white/30"
                    } ${
                      alignLeft
                        ? "md:col-start-1 md:mr-3"
                        : "md:col-start-3 md:ml-3"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                            {item.year}
                          </span>
                          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.26em] text-white/38">
                            {item.organization}
                          </p>
                        </div>
                        <span className="grid size-10 shrink-0 place-items-center border border-white/18 bg-black/60 text-white">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="max-w-[18rem] text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/62 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`absolute left-[11px] top-9 z-10 size-3 rounded-full border-2 transition duration-300 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ${
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.85)] scale-125"
                        : "border-white/40 bg-black"
                    }`}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
