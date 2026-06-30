"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

const visuals = [
  {
    label: "FAST NUCES",
    stat: "BSCS",
    rows: ["Software Engineering", "Backend Systems", "AI Applications"],
  },
  {
    label: "Cyber Security",
    stat: "Society",
    rows: ["Technical events", "Security culture", "Peer learning"],
  },
  {
    label: "Media Team",
    stat: "FPS",
    rows: ["Event coverage", "Workshops", "Visual communication"],
  },
];

function periodLabel(period: string) {
  if (period.toLowerCase().includes("expected")) return "2026";
  if (period.includes("2022")) return "2022";
  return period.split(" ")[0] ?? period;
}

export function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-edu-line-fill]",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 62%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-edu-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0.28, y: 80, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 76%",
              end: "center 46%",
              scrub: 0.8,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-edu-preview]").forEach((preview) => {
        gsap.fromTo(
          preview,
          { y: 70, rotateX: -8, filter: "blur(8px)", transformPerspective: 900 },
          {
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: preview,
              start: "top 82%",
              end: "top 42%",
              scrub: 0.7,
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <AnimatedSection id="education">
      <SectionHeading {...sectionMeta.education} />

      <div ref={sectionRef} className="relative pl-10 sm:pl-16">
        <div className="theme-motion-track absolute left-3 top-2 h-full w-px bg-white/12 sm:left-5" aria-hidden="true">
          <div data-edu-line-fill className="theme-motion-line h-full w-px bg-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.65)]" />
        </div>

        <div className="grid gap-24 lg:gap-32">
          {educationItems.map((item, index) => {
            const visual = visuals[index % visuals.length];

            return (
              <article key={`${item.period}-${item.title}`} data-edu-item className="relative grid min-h-[520px] items-center gap-8 lg:grid-cols-[0.42fr_0.58fr]">
                <span className="theme-motion-marker absolute -left-[2.55rem] top-1/2 size-5 -translate-y-1/2 rounded-full border border-white/20 bg-[#1a1a1a] shadow-[0_0_0_6px_rgba(255,255,255,0.03)] sm:-left-[3.25rem]" aria-hidden="true" />

                <div className="lg:sticky lg:top-28">
                  <p className="text-[clamp(4rem,9vw,8rem)] font-semibold leading-[0.82] tracking-[-0.06em] text-white/34">
                    {periodLabel(item.period)}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                    {item.period}
                  </p>
                  <h3 className="mt-5 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                    {item.institution}
                  </p>
                  <p className="mt-5 max-w-xl leading-7 text-white/58">
                    {item.details}
                  </p>
                </div>

                <div data-edu-preview className="overflow-hidden border border-white/12 bg-white/[0.025] shadow-[0_30px_110px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{visual.label}</p>
                      <p className="mt-1 text-xl font-semibold text-white">{visual.stat}</p>
                    </div>
                    <span className="border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-2 text-xs font-semibold text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid min-h-[260px] place-items-center border border-white/10 bg-black/45">
                      <div className="text-center">
                        <p className="text-6xl font-semibold tracking-[-0.08em] text-white/18 sm:text-8xl">
                          {periodLabel(item.period)}
                        </p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/36">Timeline</p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {visual.rows.map((row, rowIndex) => (
                        <div key={row} className="border border-white/10 bg-black/35 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">Focus {rowIndex + 1}</p>
                          <p className="mt-2 text-lg font-semibold text-white/76">{row}</p>
                        </div>
                      ))}
                      <div className="mt-auto h-2 overflow-hidden bg-white/8">
                        <div className="h-full bg-[var(--accent)]" style={{ width: `${70 + index * 10}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

