"use client";

import { useMemo, useState } from "react";
import { projects, sectionMeta, type Project } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import LineSidebar from "./LineSidebar";
import MagicBento, { type MagicBentoCard } from "./MagicBento";

const idleCards: MagicBentoCard[] = [
  {
    label: "Overview",
    title: "Project story",
    description: "Category, summary, and details load beside the demo screen.",
  },
  {
    label: "Demo",
    title: "Live preview",
    description: "The project demo screen fills this panel when you select one.",
    variant: "demo",
  },
  {
    label: "Stack",
    title: "What is a stack?",
    description:
      "The set of languages, frameworks, and tools used to build a project — frontend, backend, and everything in between.",
  },
  {
    label: "Source",
    title: "Code & repo",
    description: "Jump to the repository from the source tile.",
  },
];

function projectToBentoCards(project: Project): MagicBentoCard[] {
  // Same grid as idle: Overview → Demo → Stack → Source
  return [
    {
      label: project.category,
      title: project.title,
      description: project.description,
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
      label: "Stack",
      title: "Built with",
      description: project.technologies.join(" · "),
      variant: "stack",
      technologies: project.technologies,
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
    <AnimatedSection
      id="projects"
      className="!overflow-x-visible !pt-8 sm:!pt-10 lg:!pt-12"
    >
      <SectionHeading {...sectionMeta.projects} />

      <div
        data-animate
        className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12"
      >
        <div className="w-full shrink-0 lg:sticky lg:top-28 lg:w-[22rem]">
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
            onItemClick={(index) =>
              setActiveIndex((current) => (current === index ? null : index))
            }
            className="max-w-full"
          />
        </div>

        <div className="min-w-0 w-full flex-1">
          <MagicBento
            cards={cards}
            layout="idle"
            textAutoHide={false}
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
