"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties, ElementType } from "react";
import { animate, stagger } from "animejs";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiJupyter,
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOllama,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSelenium,
  SiSqlite,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  Bot,
  BrainCircuit,
  Boxes,
  Code2,
  Eye,
  FileCode2,
  FileJson,
  FileText,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionMeta, techSkills } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

type IconColor = {
  dark: string;
  light?: string;
};

const iconMap: Record<string, ElementType> = {
  typescript: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  node: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  fastapi: SiFastapi,
  flask: SiFlask,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  supabase: SiSupabase,
  langchain: SiLangchain,
  langgraph: SiLanggraph,
  gemini: SiGooglegemini,
  groq: Sparkles,
  openai: Bot,
  ollama: SiOllama,
  huggingface: SiHuggingface,
  vision: Eye,
  opencv: SiOpencv,
  xgboost: SiScikitlearn,
  pandas: SiPandas,
  numpy: SiNumpy,
  streamlit: SiStreamlit,
  jupyter: SiJupyter,
  selenium: SiSelenium,
  beautifulsoup: FileCode2,
  pymupdf: FileText,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  postman: SiPostman,
  vscode: Code2,
  figma: SiFigma,
  vercel: SiVercel,
  linux: SiLinux,
  cplusplus: SiCplusplus,
  c: SiC,
  sql: SiSqlite,
  ai: BrainCircuit,
  ml: Network,
  rag: Workflow,
  json: FileJson,
};

const iconColors: Record<string, IconColor> = {
  typescript: { dark: "#3178C6" },
  react: { dark: "#61DAFB" },
  next: { dark: "#FFFFFF", light: "#050505" },
  tailwind: { dark: "#38BDF8" },
  javascript: { dark: "#F7DF1E" },
  html: { dark: "#E34F26" },
  css: { dark: "#663399" },
  node: { dark: "#5FA04E" },
  express: { dark: "#FFFFFF", light: "#050505" },
  python: { dark: "#3776AB" },
  fastapi: { dark: "#009688" },
  flask: { dark: "#FFFFFF", light: "#050505" },
  mongodb: { dark: "#47A248" },
  postgresql: { dark: "#4169E1" },
  mysql: { dark: "#4479A1" },
  supabase: { dark: "#3ECF8E" },
  langchain: { dark: "#5DD3B6" },
  langgraph: { dark: "#24C8DB" },
  gemini: { dark: "#8E75FF" },
  groq: { dark: "#F55036" },
  openai: { dark: "#FFFFFF", light: "#050505" },
  ollama: { dark: "#FFFFFF", light: "#050505" },
  huggingface: { dark: "#FFD21E" },
  vision: { dark: "#5DD3B6" },
  opencv: { dark: "#5C3EE8" },
  xgboost: { dark: "#F7931E" },
  pandas: { dark: "#150458", light: "#150458" },
  numpy: { dark: "#4DABCF" },
  streamlit: { dark: "#FF4B4B" },
  jupyter: { dark: "#F37626" },
  selenium: { dark: "#43B02A" },
  beautifulsoup: { dark: "#5DD3B6" },
  pymupdf: { dark: "#FF6F00" },
  git: { dark: "#F05032" },
  github: { dark: "#FFFFFF", light: "#050505" },
  docker: { dark: "#2496ED" },
  postman: { dark: "#FF6C37" },
  vscode: { dark: "#007ACC" },
  figma: { dark: "#F24E1E" },
  vercel: { dark: "#FFFFFF", light: "#050505" },
  linux: { dark: "#FCC624", light: "#050505" },
  cplusplus: { dark: "#00599C" },
  c: { dark: "#A8B9CC", light: "#394955" },
  sql: { dark: "#2F2FE4" },
  ai: { dark: "var(--accent)" },
  ml: { dark: "var(--accent)" },
  rag: { dark: "var(--accent)" },
  json: { dark: "#F7DF1E" },
};

const rowShellClasses = [
  "size-16 sm:size-20 lg:size-24",
  "size-14 sm:size-16 lg:size-20",
  "size-[4.75rem] sm:size-24 lg:size-28",
];

const rowIconClasses = [
  "size-8 sm:size-10 lg:size-12",
  "size-7 sm:size-8 lg:size-10",
  "size-9 sm:size-12 lg:size-14",
];

const rowOffsets = ["pl-[4vw]", "pl-[18vw]", "pl-[10vw]"];

function chunkSkillsByRow(rowIndex: number) {
  return techSkills.filter((_, index) => index % 3 === rowIndex);
}

function getIconStyle(icon: string) {
  const color = iconColors[icon] ?? { dark: "var(--accent)" };

  return {
    "--icon-color": color.dark,
    "--icon-light-color": color.light ?? color.dark,
  } as CSSProperties;
}

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillRows = useMemo(() => [chunkSkillsByRow(0), chunkSkillsByRow(1), chunkSkillsByRow(2)], []);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const iconElements = Array.from(section.querySelectorAll<HTMLElement>("[data-skill-icon]"));
    const rowElements = Array.from(section.querySelectorAll<HTMLElement>("[data-skill-row]"));

    const entrance = animate(iconElements, {
      opacity: { from: 0 },
      scale: { from: 0.72 },
      y: { from: 28 },
      rotate: { from: "-10deg" },
      duration: 850,
      delay: stagger(24, { from: "center" }),
      ease: "out(4)",
      autoplay: false,
    });

    const hoverCleanups = iconElements.map((icon) => {
      const enter = () => {
        animate(icon, {
          scale: 1.16,
          y: -10,
          rotate: "5deg",
          duration: 420,
          ease: "out(4)",
        });
      };
      const leave = () => {
        animate(icon, {
          scale: 1,
          y: 0,
          rotate: "0deg",
          duration: 360,
          ease: "out(3)",
        });
      };

      icon.addEventListener("mouseenter", enter);
      icon.addEventListener("mouseleave", leave);

      return () => {
        icon.removeEventListener("mouseenter", enter);
        icon.removeEventListener("mouseleave", leave);
      };
    });

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => entrance.play(),
      });

      rowElements.forEach((row, index) => {
        gsap.fromTo(
          row,
          { xPercent: index === 1 ? -8 : 0 },
          {
            xPercent: [-38, -46, -34][index],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          },
        );
      });
    }, section);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      entrance.revert();
      context.revert();
    };
  }, []);

  return (
    <AnimatedSection id="stack" className="relative overflow-hidden">
      <SectionHeading {...sectionMeta.stack} />

      <div ref={sectionRef} className="relative -mx-5 overflow-hidden py-8 sm:-mx-8 sm:py-10 lg:-mx-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] via-[var(--background)] to-transparent sm:w-28" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] via-[var(--background)] to-transparent sm:w-28" aria-hidden="true" />

        <div className="flex flex-col gap-5 sm:gap-7">
          {skillRows.map((row, rowIndex) => (
            <div key={`skill-row-${rowIndex}`} className="overflow-visible py-1">
              <div
                data-skill-row
                className={`flex w-max items-center gap-4 whitespace-nowrap will-change-transform sm:gap-6 ${rowOffsets[rowIndex]}`}
              >
                {[...row, ...row, ...row].map((skill, index) => {
                  const Icon = iconMap[skill.icon] ?? Boxes;

                  return (
                    <span
                      key={`${skill.name}-${rowIndex}-${index}`}
                      data-skill-icon
                      className={`group/icon relative grid shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)] hover:bg-white/[0.07] ${rowShellClasses[rowIndex]}`}
                      aria-label={skill.name}
                      role="img"
                      style={{ marginTop: `${((index + rowIndex) % 5) * 4}px` }}
                    >
                      <Icon
                        className={`skill-brand-icon drop-shadow-[0_0_22px_rgba(var(--accent-rgb),0.2)] transition duration-300 group-hover/icon:drop-shadow-[0_0_28px_rgba(var(--accent-rgb),0.42)] ${rowIconClasses[rowIndex]}`}
                        style={getIconStyle(skill.icon)}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{skill.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}


