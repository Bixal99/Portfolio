"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const HeadingIcon = sectionMeta.journey.icon;

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {

      gsap.fromTo(
        "[data-journey-line-fill]",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-journey-rail]",
            start: "top 68%",
            end: "bottom 48%",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(
        "[data-journey-line-glow]",
        { yPercent: -12, autoAlpha: 0.2 },
        {
          yPercent: 95,
          autoAlpha: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-journey-rail]",
            start: "top 68%",
            end: "bottom 48%",
            scrub: 1.2,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-journey-card]").forEach((card) => {
        const item = card.closest<HTMLElement>("[data-journey-item]");
        const marker = item?.querySelector<HTMLElement>("[data-journey-marker]");
        const glow = item?.querySelector<HTMLElement>("[data-journey-panel-glow]");
        const fromLeft = item?.dataset.align === "left";

        gsap.fromTo(
          card,
          {
            autoAlpha: 0.18,
            x: fromLeft ? -54 : 54,
            y: 28,
            scale: 0.96,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: item ?? card,
              start: "top 82%",
              end: "center 54%",
              scrub: 0.9,
            },
          },
        );

        if (marker) {
          gsap.fromTo(
            marker,
            {
              scale: 0.72,
              rotate: -12,
              borderColor: "rgba(255,255,255,0.24)",
              boxShadow: "0 0 0 rgba(93,211,182,0)",
            },
            {
              scale: 1,
              rotate: 0,
              borderColor: "rgba(var(--accent-rgb),0.9)",
              boxShadow:
                "0 0 28px rgba(var(--accent-rgb),0.55), 0 0 0 10px rgba(var(--accent-rgb),0.08)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: item ?? marker,
                start: "top 66%",
                end: "bottom 46%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }

        if (glow) {
          gsap.fromTo(
            glow,
            { autoAlpha: 0.08, scaleY: 0.64 },
            {
              autoAlpha: 0.5,
              scaleY: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item ?? glow,
                start: "top 78%",
                end: "center 50%",
                scrub: 0.8,
              },
            },
          );
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <AnimatedSection id="journey" className="!py-16 sm:!py-20 lg:!py-24">
      <div ref={sectionRef} className="relative overflow-hidden py-4">
        <div
          aria-hidden="true"
          className="absolute -inset-x-8 -inset-y-12 -z-10 bg-[linear-gradient(rgba(255,255,255,0.048)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.048)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_72%,transparent)]"
        />
        <div
          data-journey-panel-glow
          aria-hidden="true"
          className="absolute left-[16%] top-20 -z-10 h-36 w-44 border border-[var(--accent)]/10 bg-[var(--accent)]/[0.055] opacity-70 blur-2xl [mask-image:radial-gradient(circle,black_0%,transparent_72%)] md:left-[35%] md:h-48 md:w-64"
        />
        <div
          data-journey-panel-glow
          aria-hidden="true"
          className="absolute bottom-2 right-[2%] -z-10 h-28 w-40 border border-[var(--accent)]/10 bg-[var(--accent)]/[0.055] opacity-60 blur-2xl [mask-image:radial-gradient(circle,black_0%,transparent_72%)] md:right-[22%] md:h-36 md:w-56"
        />

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
            <span className="inline-flex flex-wrap items-baseline gap-x-3" aria-hidden="true">
              {sectionMeta.journey.kicker.split(" ").map((word, wordIndex) => (
                <span key={word} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, charIndex) => (
                    <span
                      key={`${word}-${char}-${charIndex}`}
                      data-pixel-item
                      className={wordIndex === 0 ? "text-[var(--accent)]" : "text-white"}
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

        <div data-journey-rail className="relative mx-auto max-w-6xl pb-4 pt-2">
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 h-full w-[3px] overflow-hidden bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.08)] md:left-1/2 md:-translate-x-1/2"
          >
            <div
              data-journey-line-fill
              className="h-full w-full origin-top scale-y-100 bg-[var(--accent)] shadow-[0_0_30px_rgba(var(--accent-rgb),0.8)]"
            />
            <div
              data-journey-line-glow
              className="absolute left-1/2 top-0 h-28 w-8 -translate-x-1/2 bg-[var(--accent)]/70 blur-lg"
            />
          </div>

          <div className="space-y-10 md:space-y-8">
            {journeyItems.map((item, index) => {
              const Icon = item.icon;
              const alignLeft = index % 2 === 0;

              return (
                <article
                  data-journey-item
                  data-align={alignLeft ? "left" : "right"}
                  key={`${item.year}-${item.title}`}
                  className="relative grid min-h-[190px] gap-5 pl-16 md:grid-cols-[minmax(0,1fr)_84px_minmax(0,1fr)] md:items-center md:pl-0"
                >
                  <div
                    data-journey-card
                    className={`group relative overflow-hidden border border-white/14 bg-[#070707]/78 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/65 hover:bg-white/[0.055] sm:p-6 ${
                      alignLeft
                        ? "md:col-start-1 md:mr-3"
                        : "md:col-start-3 md:ml-3"
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(var(--accent-rgb),0.22),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.08),transparent_38%)] opacity-80 transition duration-300 group-hover:opacity-100"
                    />
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
                        <span className="grid size-10 shrink-0 place-items-center border border-white/18 bg-black/60 text-white shadow-[0_0_20px_rgba(var(--accent-rgb),0.12)]">
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
                    data-journey-marker
                    aria-hidden="true"
                    className="absolute left-[7px] top-9 z-10 grid size-8 rotate-45 place-items-center border border-white/45 bg-black shadow-[0_0_18px_rgba(255,255,255,0.12)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                  >
                    <span className="size-3 bg-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.9)]" />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
