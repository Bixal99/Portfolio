"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ElementType } from "react";
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
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiMongodb,
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
  Code2,
  Eye,
  FileCode2,
  FileText,
  Network,
  Sparkles,
} from "lucide-react";
import { sectionMeta, techSkills, type TechSkill } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";

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
};

const iconColors: Record<string, string> = {
  typescript: "#3178C6",
  react: "#61DAFB",
  next: "#FFFFFF",
  tailwind: "#38BDF8",
  javascript: "#F7DF1E",
  html: "#E34F26",
  css: "#663399",
  node: "#5FA04E",
  express: "#FFFFFF",
  python: "#3776AB",
  fastapi: "#009688",
  flask: "#FFFFFF",
  mongodb: "#47A248",
  postgresql: "#4169E1",
  supabase: "#3ECF8E",
  langchain: "#5DD3B6",
  langgraph: "#24C8DB",
  gemini: "#8E75FF",
  groq: "#F55036",
  openai: "#FFFFFF",
  ollama: "#FFFFFF",
  huggingface: "#FFD21E",
  vision: "#5DD3B6",
  opencv: "#5C3EE8",
  xgboost: "#F7931E",
  pandas: "#150458",
  numpy: "#4DABCF",
  streamlit: "#FF4B4B",
  selenium: "#43B02A",
  beautifulsoup: "#5DD3B6",
  pymupdf: "#FF6F00",
  git: "#F05032",
  github: "#FFFFFF",
  docker: "#2496ED",
  postman: "#FF6C37",
  vscode: "#007ACC",
  figma: "#F24E1E",
  vercel: "#FFFFFF",
  linux: "#FCC624",
  cplusplus: "#00599C",
  c: "#A8B9CC",
  sql: "#5DD3B6",
};

/** Featured subset for the constellation (readable density). */
const FEATURED_ICONS = new Set([
  "typescript",
  "react",
  "next",
  "tailwind",
  "python",
  "node",
  "fastapi",
  "mongodb",
  "postgresql",
  "langchain",
  "langgraph",
  "gemini",
  "openai",
  "opencv",
  "git",
  "docker",
  "supabase",
  "streamlit",
]);

type NodeLayout = TechSkill & { x: number; y: number };

const CATEGORY_ANCHORS: Record<string, { x: number; y: number }> = {
  Frontend: { x: 22, y: 28 },
  Languages: { x: 48, y: 18 },
  Backend: { x: 74, y: 30 },
  Database: { x: 78, y: 58 },
  AI: { x: 50, y: 48 },
  ML: { x: 28, y: 62 },
  Data: { x: 42, y: 72 },
  "AI UI": { x: 62, y: 72 },
  Automation: { x: 18, y: 78 },
  Documents: { x: 88, y: 78 },
  Tools: { x: 50, y: 86 },
  Design: { x: 12, y: 48 },
  Platform: { x: 88, y: 42 },
};

function buildLayout(skills: TechSkill[]): NodeLayout[] {
  const byCategory = new Map<string, TechSkill[]>();
  for (const skill of skills) {
    const list = byCategory.get(skill.category) ?? [];
    list.push(skill);
    byCategory.set(skill.category, list);
  }

  const nodes: NodeLayout[] = [];
  for (const [category, items] of byCategory) {
    const anchor = CATEGORY_ANCHORS[category] ?? { x: 50, y: 50 };
    items.forEach((skill, index) => {
      const angle = (index / Math.max(items.length, 1)) * Math.PI * 2;
      const radius = 6 + (index % 3) * 3.5;
      nodes.push({
        ...skill,
        x: Math.min(92, Math.max(8, anchor.x + Math.cos(angle) * radius)),
        y: Math.min(90, Math.max(10, anchor.y + Math.sin(angle) * radius)),
      });
    });
  }
  return nodes;
}

function related(a: TechSkill, b: TechSkill) {
  return a.category === b.category && a.name !== b.name;
}

export function TechStack() {
  const featured = useMemo(
    () => techSkills.filter((s) => FEATURED_ICONS.has(s.icon)),
    [],
  );
  const nodes = useMemo(() => buildLayout(featured), [featured]);
  const [active, setActive] = useState<TechSkill>(featured[0] ?? techSkills[0]);

  const links = useMemo(() => {
    const edges: [number, number][] = [];
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (j <= i) return;
        if (related(node, other)) edges.push([i, j]);
      });
    });
    return edges;
  }, [nodes]);

  useEffect(() => {
    if (!active && featured[0]) setActive(featured[0]);
  }, [active, featured]);

  const ActiveIcon = iconMap[active?.icon ?? ""] ?? BrainCircuit;
  const activeColor = iconColors[active?.icon ?? ""] ?? "var(--accent)";

  return (
    <AnimatedSection id="stack">
      <SectionHeading {...sectionMeta.stack} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-start">
        {/* Desktop constellation */}
        <div className="relative hidden min-h-[420px] overflow-hidden border border-white/12 bg-black/35 lg:block">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {links.map(([a, b]) => {
              const from = nodes[a];
              const to = nodes[b];
              const lit =
                active &&
                (from.name === active.name || to.name === active.name);
              return (
                <line
                  key={`${from.name}-${to.name}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={
                    lit
                      ? "rgba(93,211,182,0.75)"
                      : "rgba(93,211,182,0.22)"
                  }
                  strokeWidth={lit ? 0.45 : 0.25}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const Icon = iconMap[node.icon] ?? BrainCircuit;
            const color = iconColors[node.icon] ?? "#5DD3B6";
            const isActive = active?.name === node.name;
            return (
              <button
                key={node.name}
                type="button"
                data-skill-icon
                onMouseEnter={() => setActive(node)}
                onFocus={() => setActive(node)}
                onClick={() => setActive(node)}
                aria-label={`${node.name}, ${node.category}`}
                className={`absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition duration-200 ${
                  isActive
                    ? "border-[var(--accent)] bg-black shadow-[0_0_24px_rgba(var(--accent-rgb),0.45)] scale-110"
                    : "border-white/15 bg-black/80 hover:border-white/40"
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <Icon
                  className="size-5 skill-brand-icon"
                  style={{ "--icon-color": color } as CSSProperties}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        {/* Mobile list */}
        <div className="grid max-h-[320px] gap-2 overflow-y-auto border border-white/12 bg-black/35 p-3 lg:hidden">
          {featured.map((skill) => {
            const Icon = iconMap[skill.icon] ?? BrainCircuit;
            const color = iconColors[skill.icon] ?? "#5DD3B6";
            const isActive = active?.name === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => setActive(skill)}
                className={`flex items-center gap-3 border px-3 py-2.5 text-left transition ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-white/10 bg-transparent hover:border-white/30"
                }`}
              >
                <Icon
                  className="size-5 shrink-0 skill-brand-icon"
                  style={{ "--icon-color": color } as CSSProperties}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-white">
                  {skill.name}
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-white/40">
                  {skill.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <aside className="border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm">
          <div className="mb-5 grid size-14 place-items-center border border-white/15 bg-black">
            <ActiveIcon
              className="size-7 skill-brand-icon"
              style={{ "--icon-color": activeColor } as CSSProperties}
              aria-hidden="true"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            {active?.category}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {active?.name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/55">
            Part of the {active?.category?.toLowerCase()} stack powering AI
            systems, full-stack products, and practical engineering work.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/35">
            Hover or select a node to explore
          </p>
        </aside>
      </div>
    </AnimatedSection>
  );
}
