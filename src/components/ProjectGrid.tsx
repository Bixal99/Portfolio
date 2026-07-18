"use client";

import { useMemo, useState } from "react";
import { projects, sectionMeta, type Project } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import LineSidebar from "./LineSidebar";
import MagicBento, { type MagicBentoCard } from "./MagicBento";

const idleCards: MagicBentoCard[] = [
  {
    label: "Select",
    title: "Pick a project",
    description: "Click any title on the left to load its details here.",
  },
  {
    label: "Stack",
    title: "Tech used",
    description: "Icons appear here once a project is selected.",
    variant: "stack",
    technologies: ["Next.js", "TypeScript", "Python", "React"],
  },
  {
    label: "Demo",
    title: "Live preview",
    description: "The project demo screen fills this panel when you select one.",
    variant: "demo",
  },
  {
    label: "Overview",
    title: "Project story",
    description: "Category, summary, and scope load beside the demo screen.",
  },
  {
    label: "Browse",
    title: "Seven builds",
    description: "AI, vision, full-stack, games, and automation work.",
  },
  {
    label: "Source",
    title: "Code & repo",
    description: "Jump to the repository from the source tile.",
  },
];

function projectToBentoCards(project: Project): MagicBentoCard[] {
  const highlights = project.highlights ?? [];

  // Index 2 = tall right DEMO screen in MagicBento’s grid.
  return [
    {
      label: "Category",
      title: project.category,
      description: project.featured
        ? "Featured project in the portfolio."
        : "Selected from the project list.",
    },
    {
      label: "Stack",
      title: "Built with",
      description: project.technologies.join(" · "),
      variant: "stack",
      technologies: project.technologies,
      href: project.links.source,
    },
    {
      label: "Demo",
      title: project.title,
      description: project.description,
      variant: "demo",
      demoUrl: project.links.demo,
      href: project.links.demo,
    },
    {
      label: "Overview",
      title: project.title,
      description: project.description,
    },
    {
      label: "Scope",
      title: "What it does",
      description:
        highlights.length > 0
          ? highlights.join(" · ")
          : "End-to-end product work across design, build, and delivery.",
    },
    {
      label: "Source",
      title: "Repository",
      description: "Open the GitHub repository for this project.",
      href: project.links.source,
    },
  ];
}

export function ProjectGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active =
    activeIndex != null ? (projects[activeIndex] ?? null) : null;

  const cards = useMemo(
    () => (active ? projectToBentoCards(active) : idleCards),
    [active],
  );

  return (
    <AnimatedSection id="projects" className="!pt-12 sm:!pt-14 lg:!pt-16">
      <SectionHeading {...sectionMeta.projects} />

      <div className="mt-2">
        <span className="inline-flex items-center border border-[var(--accent)]/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Status: Ready
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
        <div data-stagger className="w-full shrink-0 lg:w-[14.5rem] lg:max-w-[30%]">
          <LineSidebar
            items={projects.map((project) => project.title)}
            accentColor="#5dd3b6"
            textColor="#c4c4c4"
            markerColor="#6c6c6c"
            showIndex
            showMarker
            proximityRadius={100}
            maxShift={30}
            falloff="smooth"
            markerLength={60}
            markerGap={0}
            tickScale={0.5}
            scaleTick
            itemGap={18}
            fontSize={1.05}
            smoothing={100}
            defaultActive={null}
            activeIndex={activeIndex}
            persistActiveOnClick
            onItemClick={(index) => setActiveIndex(index)}
            className="max-w-full"
          />
        </div>

        <div className="min-w-0 flex-1 lg:sticky lg:top-28">
          <MagicBento
            cards={cards}
            textAutoHide
            enableStars={false}
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="93, 211, 182"
            disableAnimations={false}
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
