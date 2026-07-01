"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiClerk,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHuggingface,
  SiJavascript,
  SiJupyter,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiTensorflow,
  SiTrpc,
  SiTypescript,
} from "react-icons/si";
import { Database, Layers3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionMeta, techGroups, techSkills } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<string, IconType> = {
  typescript: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  javascript: SiJavascript,
  node: SiNodedotjs,
  express: SiExpress,
  python: SiPython,
  fastapi: SiFastapi,
  flask: SiFlask,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  langchain: SiLangchain,
  gemini: SiGooglegemini,
  ollama: SiOllama,
  huggingface: SiHuggingface,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  streamlit: SiStreamlit,
  jupyter: SiJupyter,
  git: SiGit,
  github: SiGithub,
  prisma: SiPrisma,
  clerk: SiClerk,
  trpc: SiTrpc,
  cplusplus: SiCplusplus,
  sql: SiSqlite,
};

const iconColors: Record<string, { dark: string; light?: string }> = {
  typescript: { dark: "#3178C6" },
  react: { dark: "#61DAFB" },
  next: { dark: "#FFFFFF", light: "#050505" },
  tailwind: { dark: "#38BDF8" },
  javascript: { dark: "#F7DF1E" },
  node: { dark: "#5FA04E" },
  express: { dark: "#FFFFFF", light: "#050505" },
  python: { dark: "#3776AB" },
  fastapi: { dark: "#009688" },
  flask: { dark: "#FFFFFF", light: "#050505" },
  mongodb: { dark: "#47A248" },
  postgresql: { dark: "#4169E1" },
  mysql: { dark: "#4479A1" },
  langchain: { dark: "#5DD3B6" },
  gemini: { dark: "#8E75FF" },
  ollama: { dark: "#FFFFFF", light: "#050505" },
  huggingface: { dark: "#FFD21E" },
  tensorflow: { dark: "#FF6F00" },
  pytorch: { dark: "#EE4C2C" },
  streamlit: { dark: "#FF4B4B" },
  jupyter: { dark: "#F37626" },
  git: { dark: "#F05032" },
  github: { dark: "#FFFFFF", light: "#050505" },
  prisma: { dark: "#B7C3D0" },
  clerk: { dark: "#6C47FF" },
  trpc: { dark: "#398CCB" },
  cplusplus: { dark: "#00599C" },
  sql: { dark: "#2F2FE4" },
};

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-skill-card]",
        { y: 70, autoAlpha: 0, rotateX: -12, transformPerspective: 900 },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: { each: 0.055, from: "start" },
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        "[data-skill-chip]",
        { x: -24, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.018,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 66%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to("[data-skill-marquee]", {
        xPercent: -50,
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <AnimatedSection id="stack" className="relative overflow-hidden">
      <SectionHeading {...sectionMeta.stack} />

      <div ref={sectionRef} className="relative overflow-hidden border border-white/10 bg-white/[0.018] p-5 sm:p-7 lg:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" aria-hidden="true" />

        <div className="mb-8 overflow-hidden border-y border-white/10 py-4">
          <div data-skill-marquee className="flex w-max gap-4 whitespace-nowrap">
            {[...techSkills, ...techSkills].map((skill, index) => (
              <span key={`${skill.name}-${index}`} className="text-5xl font-semibold uppercase tracking-[-0.04em] text-white/10 sm:text-7xl">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <article key={group.title} data-skill-card className="group min-h-[280px] border border-white/12 bg-black/35 p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-white/[0.055]">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/36">Core group</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="grid size-12 shrink-0 place-items-center border border-white/12 bg-white/[0.035] text-[var(--accent)] transition group-hover:bg-[var(--accent)] group-hover:text-black">
                    <GroupIcon className="size-6" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const skill = techSkills.find((entry) => entry.name.toLowerCase() === item.toLowerCase() || item.toLowerCase().includes(entry.name.toLowerCase()));
                    const Icon = skill ? iconMap[skill.icon] : undefined;
                    const color = skill ? iconColors[skill.icon] ?? { dark: "var(--accent)" } : { dark: "var(--accent)" };
                    const iconStyle = { "--icon-color": color.dark, "--icon-light-color": color.light ?? color.dark } as CSSProperties;

                    return (
                      <span key={item} data-skill-chip className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-white/66 transition hover:border-[var(--accent)] hover:text-white">
                        {Icon ? (
                          <Icon className="skill-brand-icon size-4" style={iconStyle} aria-hidden="true" />
                        ) : (
                          <Database className="size-4 text-[var(--accent)]" aria-hidden="true" />
                        )}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div data-skill-card className="mt-5 grid gap-4 border border-white/10 bg-white/[0.025] p-5 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="grid size-14 place-items-center border border-[var(--accent)]/35 bg-[var(--accent)]/10 text-[var(--accent)]">
            <Layers3 className="size-7" aria-hidden="true" />
          </div>
          <p className="max-w-4xl text-sm leading-7 text-white/58">
            A compact view of the tools I reach for when building APIs, AI workflows, and interfaces.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
