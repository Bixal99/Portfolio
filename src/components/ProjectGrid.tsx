"use client";

import { useState } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { projects, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

const PREVIEW_STYLES = [
  {
    screen:
      "bg-[radial-gradient(circle_at_20%_20%,rgba(93,211,182,0.35),transparent_42%),linear-gradient(145deg,#0a1210,#050505_55%,#0d1a18)]",
  },
  {
    screen:
      "bg-[radial-gradient(circle_at_80%_30%,rgba(93,211,182,0.28),transparent_40%),linear-gradient(160deg,#0b1020,#050508_50%,#101828)]",
  },
  {
    screen:
      "bg-[radial-gradient(circle_at_50%_80%,rgba(93,211,182,0.3),transparent_45%),linear-gradient(125deg,#120a0a,#050505_48%,#1a1210)]",
  },
];

function projectCode(index: number) {
  return `PROJECT_${String(index + 1).padStart(2, "0")}`;
}

export function ProjectGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex] ?? projects[0];
  const preview = PREVIEW_STYLES[activeIndex % PREVIEW_STYLES.length];

  return (
    <AnimatedSection id="projects">
      <SectionHeading {...sectionMeta.projects} />

      <div className="mt-2">
        <span className="inline-flex items-center border border-[var(--accent)]/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Status: Ready
        </span>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
        <div
          data-stagger
          className="flex max-h-[min(70vh,40rem)] flex-col gap-3 overflow-y-auto pr-1"
          role="listbox"
          aria-label="Projects"
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            const visibleTech = project.technologies.slice(0, 3);
            const extra = project.technologies.length - visibleTech.length;

            return (
              <button
                key={project.title}
                type="button"
                role="option"
                aria-selected={isActive}
                data-stagger-item
                onClick={() => setActiveIndex(index)}
                className={`w-full border px-4 py-4 text-left transition duration-200 ${
                  isActive
                    ? "border-[var(--accent)]/55 bg-[var(--accent)]/[0.06]"
                    : "border-white/12 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                    {projectCode(index)}
                  </span>
                  <span className="border border-white/14 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    {project.category}
                  </span>
                </div>

                <h3
                  className={`mt-3 text-lg font-semibold sm:text-xl ${
                    isActive ? "text-[var(--accent)]" : "text-white"
                  }`}
                >
                  {project.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {visibleTech.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs text-white/45"
                    >
                      {technology}
                    </span>
                  ))}
                  {extra > 0 ? (
                    <span className="text-xs text-white/35">+{extra}</span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <article
          key={active.title}
          className="flex flex-col border border-white/12 bg-white/[0.025]"
        >
          <div className="border-b border-white/10 bg-black/50 px-3 pt-3">
            <div className="mb-2.5 flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="ml-2 truncate text-[10px] uppercase tracking-[0.16em] text-white/35">
                {active.title.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>
            <div
              className={`relative flex h-40 flex-col justify-end overflow-hidden p-4 sm:h-44 ${preview.screen}`}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative z-10 space-y-2">
                <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
                <p className="pt-2 text-sm font-semibold text-white/90">
                  {active.title}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="border border-white/14 bg-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                {active.category}
              </span>
              {active.featured ? (
                <span className="border border-white/25 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-black">
                  Featured
                </span>
              ) : null}
            </div>

            <h3 className="text-2xl font-semibold text-white">{active.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/55">
              {active.description}
            </p>

            {active.highlights?.length ? (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                  Technical Scope
                </p>
                <ul className="mt-3 space-y-2">
                  {active.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-6 text-white/60"
                    >
                      <span className="mt-2 size-1 shrink-0 bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {active.technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-white/12 bg-black/25 px-2.5 py-1.5 text-xs text-white/60"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={active.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-black hover:text-white"
              >
                Demo
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={active.links.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white transition hover:border-white/55 hover:bg-white hover:text-black"
              >
                <GitBranch className="size-4" aria-hidden="true" />
                Source
              </a>
            </div>
          </div>
        </article>
      </div>
    </AnimatedSection>
  );
}
