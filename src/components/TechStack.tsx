"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties, ElementType } from "react";
import { animate, stagger } from "animejs";
import { motion, useReducedMotion } from "motion/react";
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
  Lightbulb,
  MessageCircle,
  Network,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionMeta, techGroups, techSkills } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

type IconColor = {
  dark: string;
  light?: string;
};

type SkillVisual = {
  name: string;
  category: string;
  icon: string;
  description: string;
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
  prompt: MessageCircle,
  rag: Workflow,
  json: FileJson,
  problem: Lightbulb,
  collaboration: UsersRound,
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
  prompt: { dark: "#FFB86B" },
  rag: { dark: "var(--accent)" },
  json: { dark: "#F7DF1E" },
  problem: { dark: "#FFD166" },
  collaboration: { dark: "#8E75FF" },
};

const skillDescriptions: Record<string, string> = {
  TypeScript: "Typed JavaScript for safer app code.",
  "React.js": "Builds reusable interactive UI components.",
  "Next.js": "React framework for fast full-stack pages.",
  "Tailwind CSS": "Utility CSS for quick responsive styling.",
  JavaScript: "Powers browser and server interactions.",
  HTML5: "Structures content for the web.",
  CSS3: "Styles layouts, visuals, and motion.",
  "Node.js": "Runs JavaScript on the backend.",
  "Express.js": "Minimal Node framework for APIs.",
  Python: "General-purpose language for AI and backend.",
  FastAPI: "Fast Python framework for typed APIs.",
  Flask: "Lightweight Python web apps and services.",
  MongoDB: "Document database for flexible data.",
  PostgreSQL: "Reliable relational database for structured data.",
  MySQL: "Relational database for app data.",
  Supabase: "Backend platform with Postgres and auth.",
  LangChain: "Connects LLMs with tools and data.",
  LangGraph: "Builds stateful AI agent workflows.",
  "Google Generative AI": "Gemini models for text and reasoning.",
  "Groq API": "Fast inference APIs for LLM apps.",
  OpenAI: "Models for generation, agents, and embeddings.",
  Ollama: "Runs local LLMs for private experiments.",
  "Hugging Face": "Model hub for AI workflows.",
  AI: "Creates intelligent app behavior.",
  ML: "Learns patterns from data.",
  "Computer Vision": "Helps apps understand images and video.",
  "Prompt Engineering": "Shapes model outputs with precise instructions.",
  RAG: "Combines retrieval with generated answers.",
  OpenCV: "Image processing and vision toolkit.",
  XGBoost: "Strong boosted-tree machine learning model.",
  Pandas: "DataFrames for cleaning and analysis.",
  NumPy: "Fast arrays and numerical computing.",
  Streamlit: "Quick Python dashboards and AI apps.",
  Selenium: "Automates browser testing and scraping.",
  "Beautiful Soup": "Parses HTML for web extraction.",
  PyMuPDF: "Reads and processes PDF documents.",
  JSON: "Lightweight data exchange format.",
  Git: "Version control for code history.",
  GitHub: "Hosts repos, issues, and collaboration.",
  Docker: "Packages apps into portable containers.",
  Postman: "Tests and documents API requests.",
  "VS Code": "Code editor for daily development.",
  Figma: "Designs and prototypes interfaces.",
  Vercel: "Deploys frontend apps and APIs.",
  Linux: "Operating system for servers and dev.",
  "Problem Solving": "Breaks complex tasks into clear steps.",
  "Team Collaboration": "Builds better software with others.",
  "C++": "High-performance systems programming.",
  C: "Low-level programming close to hardware.",
  SQL: "Queries relational databases.",
};

const groupSkillAliases: Record<string, Pick<SkillVisual, "category" | "icon">> = {
  ai: { category: "AI", icon: "ai" },
  ml: { category: "ML", icon: "ml" },
  promptengineering: { category: "AI", icon: "prompt" },
  rag: { category: "AI", icon: "rag" },
  json: { category: "Data", icon: "json" },
  problemsolving: { category: "Soft Skill", icon: "problem" },
  teamcollaboration: { category: "Soft Skill", icon: "collaboration" },
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
const rowTravelFactors = [0.44, 0.54, 0.48];
const rowEndOffsets = [0.1, 0.18, 0.12];

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

function normalizeSkillName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getSkillDescription(name: string, category: string) {
  return skillDescriptions[name] ?? `Useful ${category.toLowerCase()} skill for building software.`;
}

function getSkillVisual(item: string): SkillVisual {
  const directMatch = techSkills.find((skill) => skill.name.toLowerCase() === item.toLowerCase());
  const normalized = normalizeSkillName(item);
  const normalizedMatch = techSkills.find((skill) => normalizeSkillName(skill.name) === normalized);
  const matchedSkill = directMatch ?? normalizedMatch;

  if (matchedSkill) {
    return {
      name: item,
      category: matchedSkill.category,
      icon: matchedSkill.icon,
      description: getSkillDescription(matchedSkill.name, matchedSkill.category),
    };
  }

  const alias = groupSkillAliases[normalized] ?? { category: "Skill", icon: "ai" };

  return {
    name: item,
    category: alias.category,
    icon: alias.icon,
    description: getSkillDescription(item, alias.category),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getRowTravel(row: HTMLElement, stage: HTMLElement, rowIndex: number) {
  const stageWidth = stage.clientWidth || window.innerWidth;
  const rowWidth = row.scrollWidth || stageWidth * 2;
  const availableTravel = Math.max(rowWidth - stageWidth, stageWidth * 1.3);
  const from = -Math.min(availableTravel * rowTravelFactors[rowIndex], rowWidth * 0.62);
  const to = stageWidth * rowEndOffsets[rowIndex];

  return { from, to };
}

export function TechStack() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipPanelRef = useRef<HTMLDivElement>(null);
  const tooltipNameRef = useRef<HTMLParagraphElement>(null);
  const tooltipCategoryRef = useRef<HTMLSpanElement>(null);
  const tooltipDescriptionRef = useRef<HTMLParagraphElement>(null);
  const skillRows = useMemo(() => [chunkSkillsByRow(0), chunkSkillsByRow(1), chunkSkillsByRow(2)], []);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const surface = surfaceRef.current;
    const section = sectionRef.current;
    const tooltip = tooltipRef.current;
    const tooltipPanel = tooltipPanelRef.current;
    const tooltipName = tooltipNameRef.current;
    const tooltipCategory = tooltipCategoryRef.current;
    const tooltipDescription = tooltipDescriptionRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!surface || !section || !tooltip || !tooltipPanel || !tooltipName || !tooltipCategory || !tooltipDescription) return;

    const allIconElements = Array.from(surface.querySelectorAll<HTMLElement>("[data-skill-icon]"));
    const laneIconElements = Array.from(section.querySelectorAll<HTMLElement>("[data-skill-icon]"));
    const rowElements = Array.from(section.querySelectorAll<HTMLElement>("[data-skill-row]"));
    const dropZones = Array.from(surface.querySelectorAll<HTMLElement>("[data-skill-drop-zone]"));
    const gridLayer = document.querySelector<HTMLElement>(".interactive-grid-bg");
    const moveTooltipX = gsap.quickTo(tooltip, "x", { duration: 0.2, ease: "power3.out" });
    const moveTooltipY = gsap.quickTo(tooltip, "y", { duration: 0.2, ease: "power3.out" });
    let activeDirection = 0;
    let didSettle = false;
    let tooltipRun = 0;

    gsap.set(tooltip, { autoAlpha: 0, x: -9999, y: -9999 });
    gsap.set(tooltipPanel, { opacity: 0, scale: 0.88, y: 10, rotate: -2, transformOrigin: "50% 100%" });

    const fadeGrid = (visible: boolean) => {
      if (!gridLayer || prefersReducedMotion) return;

      gsap.to(gridLayer, {
        autoAlpha: visible ? 1 : 0,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const positionTooltip = (icon: HTMLElement, pointerX?: number, pointerY?: number) => {
      const iconRect = icon.getBoundingClientRect();
      const panelWidth = tooltipPanel.offsetWidth || 260;
      const panelHeight = tooltipPanel.offsetHeight || 130;
      const sourceX = pointerX ?? iconRect.left + iconRect.width / 2;
      const sourceY = pointerY ?? iconRect.top;
      const x = clamp(sourceX - panelWidth / 2, 12, window.innerWidth - panelWidth - 12);
      const aboveY = sourceY - panelHeight - 18;
      const belowY = iconRect.bottom + 18;
      const y = clamp(aboveY > 12 ? aboveY : belowY, 12, window.innerHeight - panelHeight - 12);

      moveTooltipX(x);
      moveTooltipY(y);
    };

    const showTooltip = (icon: HTMLElement, event?: PointerEvent | FocusEvent) => {
      const run = ++tooltipRun;
      const name = icon.dataset.skillName ?? "Skill";
      const category = icon.dataset.skillCategory ?? "Skill";
      const description = icon.dataset.skillDescription ?? "Useful tool for building software.";
      const pointerEvent = "clientX" in (event ?? {}) ? (event as PointerEvent) : undefined;

      tooltipName.textContent = name;
      tooltipCategory.textContent = category;
      tooltipDescription.textContent = description;
      positionTooltip(icon, pointerEvent?.clientX, pointerEvent?.clientY);
      gsap.set(tooltip, { autoAlpha: 1 });

      if (prefersReducedMotion) {
        gsap.set(tooltipPanel, { opacity: 1, scale: 1, y: 0, rotate: 0 });
        return;
      }

      animate(tooltipPanel, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0.86, to: 1 },
        y: { from: 14, to: 0 },
        rotate: { from: "-3deg", to: "0deg" },
        duration: 330,
        ease: "out(4)",
        onComplete: () => {
          if (run !== tooltipRun) return;
          gsap.set(tooltipPanel, { opacity: 1, scale: 1, y: 0, rotate: 0 });
        },
      });
    };

    const hideTooltip = () => {
      const run = ++tooltipRun;

      if (prefersReducedMotion) {
        gsap.set(tooltip, { autoAlpha: 0 });
        gsap.set(tooltipPanel, { opacity: 0, scale: 0.88, y: 10, rotate: -2 });
        return;
      }

      animate(tooltipPanel, {
        opacity: 0,
        scale: 0.88,
        y: 10,
        rotate: "2deg",
        duration: 190,
        ease: "out(2)",
        onComplete: () => {
          if (run !== tooltipRun) return;
          gsap.set(tooltip, { autoAlpha: 0 });
        },
      });
    };

    const entrance = prefersReducedMotion
      ? null
      : animate(laneIconElements, {
          opacity: { from: 0 },
          scale: { from: 0.7 },
          y: { from: 34 },
          rotate: { from: "-14deg" },
          duration: 980,
          delay: stagger(18, { from: "center", jitter: 5, seed: true }),
          ease: "out(4)",
          autoplay: false,
        });

    const runDirectionAccent = (direction: number) => {
      if (prefersReducedMotion || !direction || direction === activeDirection) return;

      activeDirection = direction;
      const accentTargets = laneIconElements.filter((_, index) => index % 5 === Math.abs(direction));

      animate(accentTargets, {
        scale: 1.1,
        y: direction > 0 ? -8 : 8,
        rotate: direction > 0 ? "8deg" : "-8deg",
        duration: 260,
        delay: stagger(10, { from: direction > 0 ? "first" : "last" }),
        ease: "out(3)",
        onComplete: () => {
          animate(accentTargets, {
            scale: 1,
            y: 0,
            rotate: "0deg",
            duration: 380,
            ease: "out(4)",
          });
        },
      });
    };

    const runSettle = () => {
      if (prefersReducedMotion || didSettle) return;

      didSettle = true;
      animate(laneIconElements.filter((_, index) => index % 3 === 0), {
        scale: 1,
        y: 0,
        rotate: "0deg",
        duration: 620,
        delay: stagger(16, { from: "center", jitter: 4, seed: 3 }),
        ease: "out(5)",
      });
    };

    const hoverCleanups = allIconElements.map((icon, index) => {
      const enter = (event: PointerEvent) => {
        showTooltip(icon, event);

        if (prefersReducedMotion) return;
        animate(icon, {
          scale: 1.14,
          y: -10,
          rotate: index % 2 === 0 ? "5deg" : "-5deg",
          duration: 390,
          ease: "out(5)",
        });
      };
      const move = (event: PointerEvent) => positionTooltip(icon, event.clientX, event.clientY);
      const leave = () => {
        hideTooltip();

        if (prefersReducedMotion) return;
        animate(icon, {
          scale: 1,
          y: 0,
          rotate: "0deg",
          duration: 390,
          ease: "out(4)",
        });
      };
      const press = () => {
        if (prefersReducedMotion) return;
        animate(icon, {
          scale: 0.92,
          rotate: "0deg",
          duration: 120,
          ease: "out(2)",
          onComplete: () => {
            animate(icon, {
              scale: 1.14,
              y: -10,
              rotate: index % 2 === 0 ? "5deg" : "-5deg",
              duration: 300,
              ease: "out(5)",
            });
          },
        });
      };
      const focus = (event: FocusEvent) => showTooltip(icon, event);

      icon.addEventListener("pointerenter", enter);
      icon.addEventListener("pointermove", move);
      icon.addEventListener("pointerleave", leave);
      icon.addEventListener("pointerdown", press);
      icon.addEventListener("focus", focus);
      icon.addEventListener("blur", leave);

      return () => {
        icon.removeEventListener("pointerenter", enter);
        icon.removeEventListener("pointermove", move);
        icon.removeEventListener("pointerleave", leave);
        icon.removeEventListener("pointerdown", press);
        icon.removeEventListener("focus", focus);
        icon.removeEventListener("blur", leave);
      };
    });

    let context: ReturnType<typeof gsap.context> | undefined;

    if (!prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        ScrollTrigger.create({
          trigger: surface,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => fadeGrid(false),
          onEnterBack: () => fadeGrid(false),
          onLeave: () => fadeGrid(true),
          onLeaveBack: () => fadeGrid(true),
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top 78%",
          once: true,
          onEnter: () => entrance?.play(),
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: () => `+=${Math.max(window.innerHeight * 1.35, 760)}`,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => runDirectionAccent(self.direction),
            onEnter: () => {
              didSettle = false;
              runDirectionAccent(1);
            },
            onEnterBack: () => {
              didSettle = false;
              runDirectionAccent(-1);
            },
            onLeave: runSettle,
          },
        });

        rowElements.forEach((row, index) => {
          timeline.fromTo(
            row,
            {
              x: () => getRowTravel(row, section, index).from,
            },
            {
              x: () => getRowTravel(row, section, index).to,
            },
            0,
          );
        });

        dropZones.forEach((zone, zoneIndex) => {
          const dropIcons = Array.from(zone.querySelectorAll<HTMLElement>("[data-skill-drop-icon]"));

          gsap.fromTo(
            dropIcons,
            {
              autoAlpha: 0,
              y: -96,
              rotate: zoneIndex % 2 === 0 ? -12 : 12,
              scale: 0.76,
            },
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.045,
              ease: "back.out(1.8)",
              scrollTrigger: {
                trigger: zone,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
              onComplete: () => {
                animate(dropIcons, {
                  scale: { from: 0.96, to: 1 },
                  y: { from: 6, to: 0 },
                  duration: 420,
                  delay: stagger(14, { from: "center", jitter: 2, seed: zoneIndex + 1 }),
                  ease: "out(5)",
                });
              },
            },
          );
        });
      }, surface);
    }

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      entrance?.revert();
      context?.revert();
      if (gridLayer) {
        gsap.set(gridLayer, { autoAlpha: 1 });
      }
    };
  }, []);

  return (
    <AnimatedSection id="stack" className="relative overflow-hidden">
      <SectionHeading {...sectionMeta.stack} />

      <div ref={surfaceRef} data-stack-surface className="relative">
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
                    const description = getSkillDescription(skill.name, skill.category);

                    return (
                      <span
                        key={`${skill.name}-${rowIndex}-${index}`}
                        data-skill-icon
                        data-skill-name={skill.name}
                        data-skill-category={skill.category}
                        data-skill-description={description}
                        className={`group/icon relative grid shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)] hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 ${rowShellClasses[rowIndex]}`}
                        aria-label={`${skill.name}: ${description}`}
                        role="img"
                        tabIndex={0}
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

        <div className="mt-10 space-y-5 sm:mt-14 sm:space-y-6">
          {techGroups.map((group, groupIndex) => {
            const GroupIcon = group.icon;

            return (
              <motion.article
                key={group.title}
                data-skill-drop-zone
                className="relative overflow-hidden border border-white/10 bg-black/55 px-4 py-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-6 sm:py-6"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: groupIndex * 0.04 }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" aria-hidden="true" />
                <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(13rem,0.34fr)_1fr] lg:items-center">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center border border-[var(--accent)]/25 bg-[var(--accent)]/10 text-[var(--accent)]">
                      <GroupIcon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">Drop zone</p>
                      <h3 className="mt-2 text-2xl font-semibold leading-none text-white sm:text-3xl">{group.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {group.items.map((item) => {
                      const skill = getSkillVisual(item);
                      const Icon = iconMap[skill.icon] ?? Boxes;

                      return (
                        <motion.span
                          key={`${group.title}-${item}`}
                          data-skill-icon
                          data-skill-drop-icon
                          data-skill-name={skill.name}
                          data-skill-category={skill.category}
                          data-skill-description={skill.description}
                          className="group/drop inline-flex min-h-14 items-center gap-3 border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white/70 shadow-[0_14px_38px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:border-[var(--accent)] hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 sm:min-h-16 sm:px-4"
                          aria-label={`${skill.name}: ${skill.description}`}
                          role="img"
                          tabIndex={0}
                          layout
                          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                          transition={{ type: "spring", stiffness: 420, damping: 26 }}
                        >
                          <Icon className="skill-brand-icon size-6 shrink-0 sm:size-7" style={getIconStyle(skill.icon)} aria-hidden="true" />
                          <span className="max-w-[9rem] truncate font-medium leading-5">{skill.name}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div ref={tooltipRef} className="pointer-events-none fixed left-0 top-0 z-50 w-[min(17rem,calc(100vw-1.5rem))]" aria-hidden="true">
        <div ref={tooltipPanelRef} className="relative overflow-hidden rounded-lg border border-white/12 bg-black/88 px-4 py-3 text-left shadow-[0_22px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80" aria-hidden="true" />
          <div className="mb-2 flex items-center justify-between gap-3">
            <p ref={tooltipNameRef} className="text-sm font-semibold leading-5 text-white" />
            <span ref={tooltipCategoryRef} className="shrink-0 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]" />
          </div>
          <p ref={tooltipDescriptionRef} className="text-xs leading-5 text-white/62" />
        </div>
      </div>
    </AnimatedSection>
  );
}


