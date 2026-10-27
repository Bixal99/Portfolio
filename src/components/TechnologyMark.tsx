import type { ComponentType, CSSProperties, SVGProps } from "react";
import { Braces, Database, Eye } from "lucide-react";
import Image from "next/image";
import {
  SiC, SiCplusplus, SiCss, SiDocker, SiExpress, SiFastapi, SiFigma,
  SiFlask, SiGit, SiGithub, SiGooglegemini, SiHtml5, SiHuggingface,
  SiJavascript, SiLangchain, SiLanggraph, SiLinux, SiMediapipe, SiMongodb,
  SiNextdotjs, SiNodedotjs, SiNumpy, SiOllama, SiOpencv, SiPandas,
  SiPlotly, SiPostgresql, SiPostman, SiPython, SiReact, SiScrapy, SiSelenium,
  SiStreamlit, SiSupabase, SiTailwindcss, SiTypescript, SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type Mark = { Icon?: ComponentType<SVGProps<SVGSVGElement>>; asset?: string; color: string };
const marks: Record<string, Mark> = {
  typescript: { Icon: SiTypescript, color: "#3178c6" },
  react: { Icon: SiReact, color: "#61dafb" }, next: { Icon: SiNextdotjs, color: "var(--foreground)" },
  tailwind: { Icon: SiTailwindcss, color: "#38bdf8" }, javascript: { Icon: SiJavascript, color: "#f7df1e" },
  html: { Icon: SiHtml5, color: "#e34f26" }, css: { Icon: SiCss, color: "#a77ce1" },
  python: { Icon: SiPython, color: "#ffd343" }, cplusplus: { Icon: SiCplusplus, color: "#659ad2" },
  c: { Icon: SiC, color: "#a8b9cc" }, node: { Icon: SiNodedotjs, color: "#5fa04e" },
  express: { Icon: SiExpress, color: "var(--foreground)" }, fastapi: { Icon: SiFastapi, color: "#009688" },
  flask: { Icon: SiFlask, color: "var(--foreground)" }, mongodb: { Icon: SiMongodb, color: "#47a248" },
  postgresql: { Icon: SiPostgresql, color: "#76a8cc" }, supabase: { Icon: SiSupabase, color: "#3fcf8e" },
  langchain: { Icon: SiLangchain, color: "#83c6ba" }, langgraph: { Icon: SiLanggraph, color: "#83c6ba" },
  gemini: { Icon: SiGooglegemini, color: "#8aa9ff" }, groq: { asset: "/icons/groq.svg", color: "#f55036" },
  openai: { asset: "/icons/openai.svg", color: "var(--foreground)" }, ollama: { Icon: SiOllama, color: "var(--foreground)" },
  huggingface: { Icon: SiHuggingface, color: "#ffd21e" }, vision: { Icon: Eye, color: "var(--accent)" },
  opencv: { Icon: SiOpencv, color: "#7abf51" }, xgboost: { asset: "/icons/xgboost.png", color: "#e49555" },
  pandas: { Icon: SiPandas, color: "#bdb3f1" }, numpy: { Icon: SiNumpy, color: "#4dabcf" },
  streamlit: { Icon: SiStreamlit, color: "#ff4b4b" }, selenium: { Icon: SiSelenium, color: "#43b02a" },
  beautifulsoup: { Icon: SiPython, color: "#ffd343" }, pymupdf: { asset: "/icons/pymupdf.svg", color: "#f5853c" },
  git: { Icon: SiGit, color: "#f05032" }, github: { Icon: SiGithub, color: "var(--foreground)" },
  docker: { Icon: SiDocker, color: "#2496ed" }, postman: { Icon: SiPostman, color: "#ff6c37" },
  vscode: { Icon: VscVscode, color: "#23a9f2" }, figma: { Icon: SiFigma, color: "#f68c75" },
  vercel: { Icon: SiVercel, color: "var(--foreground)" }, linux: { Icon: SiLinux, color: "#fcc624" },
  sql: { Icon: Database, color: "#7bb8da" }, scrapy: { Icon: SiScrapy, color: "#70ba53" },
  mediapipe: { Icon: SiMediapipe, color: "#00a8a8" }, plotly: { Icon: SiPlotly, color: "#9b9dfb" },
};

const aliases: Record<string, string> = {
  "react.js": "react", "next.js": "next", "node.js": "node", "express.js": "express",
  "tailwind css": "tailwind", "html5": "html", "css3": "css", "c++": "cplusplus",
  "google gemini": "gemini", "google generative ai": "gemini", "groq api": "groq",
  "hugging face": "huggingface", "computer vision": "vision", "vs code": "vscode",
  "beautiful soup": "beautifulsoup",
};

export function getTechnologyColor(name: string) {
  const key = aliases[name.toLowerCase()] ?? name.toLowerCase();
  return marks[key]?.color ?? "var(--accent)";
}

export function TechnologyMark({ name, icon, className = "" }: { name: string; icon?: string; className?: string }) {
  const key = icon ?? aliases[name.toLowerCase()] ?? name.toLowerCase();
  const mark = marks[key];
  const Icon = mark?.Icon ?? Braces;
  return (
    <span className={className} data-mark={key} data-wordmark={key === "xgboost" || key === "pymupdf" ? "true" : undefined} style={{ "--brand-color": mark?.color ?? "var(--accent)" } as CSSProperties} aria-hidden="true">
      {mark?.asset ? (
        key === "xgboost" || key === "pymupdf" ? (
          <Image src={mark.asset} alt="" width={128} height={96} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : <span style={{ display: "block", width: "100%", height: "100%", backgroundColor: "currentColor", mask: `url(${mark.asset}) center / contain no-repeat` }} />
      ) : <Icon style={{ width: "100%", height: "100%" }} />}
    </span>
  );
}
