"use client";

import { useMemo } from "react";
import type { ElementType } from "react";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastapi,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Orbit } from "lucide-react";
import { sectionMeta, techSkills } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import {
  SolarSystem,
  type OrbitConfig,
  type SolarSystemItem,
} from "./ui/solar-system";

/** Core languages + main web frameworks only. */
const LANGUAGE_ICONS = new Set([
  "typescript",
  "javascript",
  "python",
  "cplusplus",
  "c",
  "html",
  "css",
]);

const FRAMEWORK_ICONS = new Set([
  "react",
  "next",
  "tailwind",
  "node",
  "git",
]);

/** Outer ring - keeps mid orbit from crowding */
const OUTER_ICONS = new Set([
  "fastapi",
  "mongodb",
  "docker",
  "postgresql",
  "vercel",
]);

const iconMap: Record<string, ElementType> = {
  typescript: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  python: SiPython,
  cplusplus: SiCplusplus,
  c: SiC,
  node: SiNodedotjs,
  git: SiGit,
  fastapi: SiFastapi,
  mongodb: SiMongodb,
  docker: SiDocker,
  postgresql: SiPostgresql,
  vercel: SiVercel,
};

const iconColors: Record<string, string> = {
  typescript: "#3178C6",
  react: "#61DAFB",
  next: "#FFFFFF",
  tailwind: "#38BDF8",
  javascript: "#F7DF1E",
  html: "#E34F26",
  css: "#663399",
  python: "#3776AB",
  cplusplus: "#00599C",
  c: "#A8B9CC",
  node: "#339933",
  git: "#F05032",
  fastapi: "#009688",
  mongodb: "#47A248",
  docker: "#2496ED",
  postgresql: "#4169E1",
  vercel: "#FFFFFF",
};

function toSolarItem(skill: (typeof techSkills)[number]): SolarSystemItem {
  const Icon = iconMap[skill.icon] ?? Orbit;
  const color = iconColors[skill.icon] ?? "#5DD3B6";

  return {
    id: skill.icon,
    label: skill.name,
    type: skill.category,
    color,
    svg: <Icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
  };
}

function buildOrbits(): OrbitConfig[] {
  const languages = techSkills
    .filter((skill) => LANGUAGE_ICONS.has(skill.icon))
    .map(toSolarItem);

  const frameworks = techSkills
    .filter((skill) => FRAMEWORK_ICONS.has(skill.icon))
    .map(toSolarItem);

  const outer = techSkills
    .filter((skill) => OUTER_ICONS.has(skill.icon))
    .map(toSolarItem);

  return [
    {
      id: "inner",
      name: "Languages",
      radiusClass: "var(--radius-inner)",
      radiusPx: 280,
      speed: 28,
      items: languages,
    },
    {
      id: "mid",
      name: "Frameworks",
      radiusClass: "var(--radius-mid)",
      radiusPx: 430,
      speed: 40,
      items: frameworks,
    },
    {
      id: "outer",
      name: "Platform",
      radiusClass: "var(--radius-outer)",
      radiusPx: 520,
      speed: 52,
      items: outer,
    },
  ];
}

export function TechStack() {
  const orbits = useMemo(() => buildOrbits(), []);

  return (
    <AnimatedSection id="stack" className="!pb-10 sm:!pb-12 lg:!pb-14">
      <SectionHeading {...sectionMeta.stack} />

      <div className="relative mt-1 overflow-visible pt-6 pb-2 sm:mt-2 sm:pt-8 sm:pb-4">
        <div className="relative z-10 flex justify-center px-2">
          <SolarSystem
            orbits={orbits}
            speedMultiplier={1}
            centerLogo={
              <Orbit className="h-10 w-10 text-[var(--accent)] md:h-12 md:w-12" />
            }
            centerLogoAlt="Skills core"
            className="mx-auto -translate-y-2 scale-[1.18] sm:-translate-y-4 sm:scale-[1.22] md:-translate-y-6 md:scale-[1.28] md:h-[480px]"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
