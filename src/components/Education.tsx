"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationItems, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

const academicVisuals = [
  {
    chip: "Foundation",
    code: "01",
    accent: "School Years",
    stamp: "Science Base",
    metrics: ["Science", "Mathematics", "Study discipline"],
    progress: "62%",
  },
  {
    chip: "Pre-University",
    code: "02",
    accent: "College Years",
    stamp: "FSC Track",
    metrics: ["Analytical subjects", "Exam focus", "CS direction"],
    progress: "78%",
  },
  {
    chip: "Computer Science",
    code: "03",
    accent: "FAST NUCES",
    stamp: "CS Timeline",
    metrics: ["AI", "Software Engineering", "Databases"],
    progress: "96%",
  },
];

function firstYear(period: string) {
  return period.split("-")[0]?.trim() ?? period;
}

export function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const line = section.querySelector<HTMLElement>("[data-edu-line-fill]");
      const light = section.querySelector<HTMLElement>("[data-edu-line-light]");
      const items = Array.from(section.querySelectorAll<HTMLElement>("[data-edu-item]"));
      const blocks = Array.from(section.querySelectorAll<HTMLElement>("[data-edu-bg-block]"));

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              end: "bottom 58%",
              scrub: 1.15,
            },
          },
        );
      }

      if (light) {
        gsap.fromTo(
          light,
          { yPercent: -20, autoAlpha: 0.18 },
          {
            yPercent: 125,
            autoAlpha: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              end: "bottom 58%",
              scrub: 1.15,
            },
          },
        );
      }

      blocks.forEach((block, index) => {
        gsap.fromTo(
          block,
          { y: index % 2 === 0 ? 42 : -36, autoAlpha: 0.16 },
          {
            y: index % 2 === 0 ? -30 : 24,
            autoAlpha: 0.38,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          },
        );
      });

      items.forEach((item, index) => {
        const copy = item.querySelector<HTMLElement>("[data-edu-copy]");
        const preview = item.querySelector<HTMLElement>("[data-edu-preview]");
        const marker = item.querySelector<HTMLElement>("[data-edu-marker]");
        const year = item.querySelector<HTMLElement>("[data-edu-year]");
        const rows = Array.from(item.querySelectorAll<HTMLElement>("[data-edu-row]"));
        const progress = item.querySelector<HTMLElement>("[data-edu-progress]");

        if (copy) {
          gsap.fromTo(
            copy,
            { autoAlpha: 0, y: 42, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (preview) {
          gsap.fromTo(
            preview,
            {
              autoAlpha: 0,
              y: 72,
              rotateX: -10,
              rotateY: index % 2 === 0 ? -7 : 7,
              filter: "blur(12px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 74%",
                end: "center 48%",
                scrub: 0.75,
              },
            },
          );
        }

        if (marker) {
          gsap.fromTo(
            marker,
            {
              scale: 0.7,
              borderColor: "rgba(255,255,255,0.25)",
              boxShadow: "0 0 0 rgba(93,211,182,0)",
            },
            {
              scale: 1,
              borderColor: "rgba(var(--accent-rgb),0.95)",
              boxShadow:
                "0 0 34px rgba(var(--accent-rgb),0.7), 0 0 0 12px rgba(var(--accent-rgb),0.08)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 62%",
                end: "bottom 48%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }

        if (year) {
          gsap.fromTo(
            year,
            { xPercent: -7, autoAlpha: 0.18 },
            {
              xPercent: 0,
              autoAlpha: 0.34,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }

        if (rows.length) {
          gsap.fromTo(
            rows,
            { autoAlpha: 0, x: 22 },
            {
              autoAlpha: 1,
              x: 0,
              stagger: 0.08,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 66%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (progress) {
          gsap.fromTo(
            progress,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 64%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <AnimatedSection id="education" className="!py-16 sm:!py-20 lg:!py-24">
      <SectionHeading {...sectionMeta.education} />

      <div ref={sectionRef} className="relative overflow-hidden py-4 sm:py-6">
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -inset-y-14 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:54px_54px] opacity-42 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_74%,transparent)]"
        />
        <div
          data-edu-bg-block
          aria-hidden="true"
          className="absolute left-[12%] top-20 -z-10 h-40 w-56 bg-[var(--accent)]/[0.06] blur-2xl [mask-image:radial-gradient(circle,black_0%,transparent_70%)] md:h-56 md:w-80"
        />
        <div
          data-edu-bg-block
          aria-hidden="true"
          className="absolute bottom-36 right-[7%] -z-10 h-36 w-52 bg-[var(--accent)]/[0.055] blur-2xl [mask-image:radial-gradient(circle,black_0%,transparent_72%)] md:right-[18%] md:h-52 md:w-72"
        />

        <div className="relative pl-10 sm:pl-16">
          <div
            aria-hidden="true"
            className="absolute left-4 top-6 h-[calc(100%-3rem)] w-px bg-white/12 shadow-[0_0_18px_rgba(255,255,255,0.08)] sm:left-7"
          >
            <div
              data-edu-line-fill
              className="h-full w-full origin-top scale-y-100 bg-[var(--accent)] shadow-[0_0_28px_rgba(var(--accent-rgb),0.8)]"
            />
            <div
              data-edu-line-light
              className="absolute left-1/2 top-0 h-28 w-8 -translate-x-1/2 bg-[var(--accent)]/70 blur-lg"
            />
          </div>

          <div className="grid gap-14 lg:gap-16">
            {educationItems.map((item, index) => {
              const visual = academicVisuals[index % academicVisuals.length];

              return (
                <article
                  key={`${item.period}-${item.title}`}
                  data-edu-item
                  className="relative grid min-h-[420px] items-center gap-7 lg:grid-cols-[0.43fr_0.57fr] lg:gap-12"
                >
                  <span
                    data-edu-marker
                    aria-hidden="true"
                    className="absolute -left-[2.36rem] top-20 z-10 grid size-8 place-items-center rounded-full border border-white/28 bg-black shadow-[0_0_18px_rgba(255,255,255,0.12)] sm:-left-[3.35rem]"
                  >
                    <span className="size-3 rounded-full bg-black ring-1 ring-white/20" />
                  </span>

                  <div data-edu-copy className="relative lg:sticky lg:top-28">
                    <p
                      data-edu-year
                      className="text-[clamp(5.7rem,12vw,11rem)] font-extrabold leading-[0.78] tracking-[-0.08em] text-white/20"
                    >
                      {firstYear(item.period)}
                    </p>
                    <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent)] sm:text-sm">
                      {item.period}
                    </p>
                    <h3 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-white/38">
                      {item.institution}
                    </p>
                    <p className="mt-7 max-w-xl text-base font-medium leading-8 text-white/62 sm:text-lg">
                      {item.details}
                    </p>
                  </div>

                  <div
                    data-edu-preview
                    className="relative overflow-hidden border border-white/10 bg-[#070707]/76 shadow-[0_28px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl [transform-style:preserve-3d]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_62%,rgba(var(--accent-rgb),0.24),transparent_30%),linear-gradient(120deg,rgba(255,255,255,0.075),transparent_38%)]" />
                    <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
                          {visual.accent}
                        </p>
                        <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                          {visual.chip}
                        </p>
                      </div>
                      <span className="border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-2 text-xs font-bold text-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.16)]">
                        {visual.code}
                      </span>
                    </div>

                    <div className="relative z-10 grid gap-5 p-5 sm:p-7 md:grid-cols-[0.46fr_0.54fr]">
                      <div className="relative min-h-60 overflow-hidden border border-white/10 bg-black/36 p-5">
                        <p className="absolute -bottom-4 left-4 text-[5rem] font-extrabold leading-none tracking-[-0.08em] text-white/[0.09] sm:text-[6.4rem]">
                          {firstYear(item.period)}
                        </p>
                        <div className="relative z-10 h-full border-l border-[var(--accent)]/40 pl-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/35">
                            Timeline
                          </p>
                          <p className="mt-8 max-w-[10rem] text-2xl font-extrabold leading-tight text-white">
                            {visual.stamp}
                          </p>
                          <div className="mt-8 h-1.5 overflow-hidden bg-white/10">
                            <div
                              data-edu-progress
                              className="h-full bg-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.75)]"
                              style={{ width: visual.progress }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid content-center gap-3">
                        {visual.metrics.map((metric, metricIndex) => (
                          <div
                            key={metric}
                            data-edu-row
                            className="border-b border-white/10 py-4 last:border-b-0"
                          >
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/28">
                              Focus {metricIndex + 1}
                            </p>
                            <p className="mt-2 text-lg font-bold text-white/82 sm:text-xl">
                              {metric}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
