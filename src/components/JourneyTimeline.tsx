"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
            trigger: section,
            start: "top 62%",
            end: "bottom 58%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-journey-item]").forEach((item) => {
        const card = item.querySelector("[data-journey-card]");
        const marker = item.querySelector("[data-journey-marker]");
        const fromLeft = item.dataset.align === "left";

        gsap.fromTo(
          card,
          { autoAlpha: 0.3, x: fromLeft ? -70 : 70, y: 38, scale: 0.96 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              end: "center 48%",
              scrub: 0.7,
            },
          },
        );

        gsap.fromTo(
          marker,
          { scale: 0.72, borderColor: "rgba(255,255,255,0.28)" },
          {
            scale: 1,
            borderColor: "rgba(var(--accent-rgb),0.85)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 62%",
              end: "bottom 45%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <AnimatedSection id="journey">
      <SectionHeading {...sectionMeta.journey} />

      <div ref={sectionRef} className="relative">
        <div
          aria-hidden="true"
          className="theme-motion-track absolute left-4 top-0 h-full w-px bg-white/12 md:left-1/2"
        >
          <div data-journey-line-fill className="theme-motion-line h-full w-px bg-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.65)]" />
        </div>

        <div className="space-y-16 md:space-y-24">
          {journeyItems.map((item, index) => {
            const Icon = item.icon;
            const alignLeft = index % 2 === 0;

            return (
              <article
                data-journey-item
                data-align={alignLeft ? "left" : "right"}
                key={`${item.year}-${item.title}`}
                className={`relative grid gap-6 pl-12 md:min-h-[360px] md:grid-cols-2 md:items-center md:pl-0 ${
                  alignLeft ? "" : "md:[&>div]:col-start-2"
                }`}
              >
                <div
                  data-journey-card
                  className={`border border-white/12 bg-white/[0.025] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/45 hover:bg-white/[0.06] ${
                    alignLeft ? "md:mr-16" : "md:ml-16"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">
                      {item.year}
                    </span>
                    <Icon className="size-5 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    {item.organization}
                  </p>
                  <p className="mt-4 leading-7 text-white/58">{item.description}</p>
                </div>

                <span
                  data-journey-marker
                  aria-hidden="true"
                  className="theme-motion-marker absolute left-1 top-7 grid size-7 place-items-center border border-white/65 bg-black md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                >
                  <span className="theme-motion-dot size-2 bg-white shadow-[0_0_28px_rgba(255,255,255,0.7)]" />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

