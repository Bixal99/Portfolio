"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ComponentType, SVGProps } from "react";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSelenium,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Orbit } from "lucide-react";
import { sectionMeta, techSkills } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { TechnologyMark } from "./TechnologyMark";
import styles from "./TechStack.module.css";
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
  "express",
]);

/** Outer ring - platforms & libraries (kept lean to avoid overlap) */
const OUTER_ICONS = new Set([
  "fastapi",
  "mongodb",
  "docker",
  "postgresql",
  "vercel",
  "flask",
  "streamlit",
  "supabase",
  "selenium",
]);

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
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
  express: SiExpress,
  flask: SiFlask,
  streamlit: SiStreamlit,
  supabase: SiSupabase,
  selenium: SiSelenium,
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
  express: "#FFFFFF",
  flask: "#FFFFFF",
  streamlit: "#FF4B4B",
  supabase: "#3FCF8E",
  selenium: "#43B02A",
};

function toSolarItem(skill: (typeof techSkills)[number]): SolarSystemItem {
  const Icon = iconMap[skill.icon] ?? Orbit;
  const color = iconColors[skill.icon] ?? "#8ca5ff";

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
      radiusPx: 260,
      speed: 32,
      items: languages,
    },
    {
      id: "mid",
      name: "Frameworks",
      radiusClass: "var(--radius-mid)",
      radiusPx: 400,
      speed: 44,
      items: frameworks,
    },
    {
      id: "outer",
      name: "Platform",
      radiusClass: "var(--radius-outer)",
      radiusPx: 510,
      speed: 58,
      items: outer,
    },
  ];
}

export function TechStack() {
  const orbits = useMemo(() => buildOrbits(), []);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    let visible = false;
    const syncVisibility = () => setInView(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      syncVisibility();
    }, { threshold: .05 });
    observer.observe(scene);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(scene, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: scene, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    return () => media.revert();
  }, []);

  return (
    <AnimatedSection
      id="stack"
      className="!pb-8 !pt-8 sm:!pb-10 sm:!pt-10 lg:!pb-12 lg:!pt-12"
    >
      <div className={styles.header}>
        <SectionHeading {...sectionMeta.stack} className="!mb-2 sm:!mb-3" />
      </div>

      <div className={styles.scene}>
        <div className="relative z-0 flex justify-center" ref={sceneRef}>
          <SolarSystem
            orbits={orbits}
            isPaused={!inView}
            speedMultiplier={1}
            centerLogo={<span className={styles.monogram}>M<span>B</span></span>}
            centerLogoAlt="Mohammad Bilal"
            className="mx-auto"
          />
        </div>
      </div>
      <ul className={styles.mobileSkills} aria-label="Skills and technologies">
        {techSkills.map((skill) => <li key={skill.name}><TechnologyMark name={skill.name} icon={skill.icon} className={styles.mobileMark} /><span>{skill.name}</span></li>)}
      </ul>
    </AnimatedSection>
  );
}
