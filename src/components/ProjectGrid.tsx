"use client";

import { ArrowUpRight, GitBranch } from "lucide-react";
import gsap from "gsap";
import { projects, sectionMeta } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

export function ProjectGrid() {
  function animateFill(card: HTMLElement, show: boolean) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const fill = card.querySelector("[data-project-fill]");
    const title = card.querySelector("[data-project-title]");

    if (!fill) {
      return;
    }

    gsap.to(fill, {
      scaleY: show ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
      transformOrigin: "bottom",
    });

    if (title) {
      gsap.to(title, {
        x: show ? 8 : 0,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }

  return (
    <AnimatedSection id="projects">
      <SectionHeading {...sectionMeta.projects} />

      <div data-stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            data-stagger-item
            key={project.title}
            onMouseEnter={(event) => animateFill(event.currentTarget, true)}
            onMouseLeave={(event) => animateFill(event.currentTarget, false)}
            className={`group relative isolate flex min-h-[340px] flex-col overflow-hidden border border-white/12 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/55 ${
              project.featured ? "md:min-h-[400px]" : ""
            }`}
          >
            <span
              data-project-fill
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-10 h-full origin-bottom scale-y-0 bg-gradient-to-t from-white/[0.15] via-white/[0.06] to-transparent"
            />

            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="border border-white/14 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                {project.category}
              </span>
              {project.featured ? (
                <span className="border border-white/25 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black">
                  Featured
                </span>
              ) : null}
            </div>

            <h3 data-project-title className="text-2xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-4 flex-1 leading-7 text-white/55 transition group-hover:text-white/75">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-white/12 bg-black/25 px-2.5 py-1.5 text-xs text-white/60"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-black hover:text-white"
              >
                Demo
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={project.links.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white transition hover:border-white/55 hover:bg-white hover:text-black"
              >
                <GitBranch className="size-4" aria-hidden="true" />
                Source
              </a>
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}

