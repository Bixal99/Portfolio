import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Binary,
  BookOpen,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Network,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href: string;
  mark: string;
};

export type JourneyItem = {
  year: string;
  title: string;
  organization: string;
  description: string;
  icon: ComponentType<LucideProps>;
};

export type TechGroup = {
  title: string;
  items: string[];
  icon: ComponentType<LucideProps>;
};

export type EducationItem = {
  period: string;
  title: string;
  institution: string;
  details: string;
};

export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  links: {
    demo: string;
    source: string;
  };
  featured?: boolean;
};

export const profile = {
  name: "Mohammad Bilal Nadeem",
  role: "Computer Science Student | Backend & AI Developer",
  location: "Doha, Qatar",
  intro: "Code with purpose. Build with impact. Learn without limits.",
  summary:
    "BS Computer Science candidate at FAST NUCES with hands-on experience across Node.js, Express, MongoDB, LangChain, vector databases, DeepFace, FastAPI, Next.js, and applied generative AI systems.",
  email: "bilalnadeema302003@gmail.com",
  phone: "+974 51243268",
};

export const resume = {
  label: "Download CV",
  href: "/resume.pdf",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/", mark: "GH" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-bilal-64489827b/",
    mark: "IN",
  },
  { label: "X", href: "https://x.com/", mark: "X" },
  { label: "Instagram", href: "https://www.instagram.com/", mark: "IG" },
];

export const journeyItems: JourneyItem[] = [
  {
    year: "Oct 2022 - Present",
    title: "Cyber Security Society Member",
    organization: "FAST Society of Cyber Security",
    description:
      "Led and contributed to technical society work in cyber security while collaborating on campus learning initiatives and technical activities.",
    icon: ShieldCheck,
  },
  {
    year: "Jul 2024 - Present",
    title: "AI Research Intern",
    organization: "Independent Projects & Open Source, FAST NUCES",
    description:
      "Built AI apps with LangChain, Gemini APIs, Groq-hosted Llama3, vector databases, RAG pipelines, prompt optimization, and analytics dashboards.",
    icon: BrainCircuit,
  },
  {
    year: "Oct 2024 - Dec 2024",
    title: "Backend Developer Intern",
    organization: "Smart Home Energy Management System, FAST NUCES",
    description:
      "Developed Node.js and Express APIs for IoT device control, MongoDB activity logging, energy analytics, cost efficiency, and JWT-secured access.",
    icon: Network,
  },
  {
    year: "Expected Jun 2026",
    title: "BS Computer Science Candidate",
    organization: "FAST NUCES, Chiniot-Faisalabad Campus",
    description:
      "Strengthening computer science foundations while shipping backend, AI, OCR, RAG, management-system, and game-logic projects.",
    icon: GraduationCap,
  },
];

export const techGroups: TechGroup[] = [
  {
    title: "Languages",
    icon: Code2,
    items: ["JavaScript", "Python", "C", "C++", "TypeScript", "C#", "SQL"],
  },
  {
    title: "Backend & Data",
    icon: Database,
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    title: "AI Systems",
    icon: BrainCircuit,
    items: [
      "LangChain",
      "RAG",
      "Gemini",
      "Groq",
      "Ollama",
      "Hugging Face",
      "Pinecone",
    ],
  },
  {
    title: "ML & Vision",
    icon: Binary,
    items: [
      "TensorFlow",
      "PyTorch",
      "DeepFace",
      "Tesseract OCR",
      "PaddleOCR",
      "Neural Networks",
    ],
  },
  {
    title: "Frontend",
    icon: TerminalSquare,
    items: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Streamlit"],
  },
  {
    title: "Platforms",
    icon: Boxes,
    items: [
      "Clerk Auth",
      "Prisma",
      "tRPC",
      "Jupyter Notebook",
      "Microsoft Office",
    ],
  },
];

export type TechSkill = {
  name: string;
  category: string;
  icon: string;
};

export const techSkills: TechSkill[] = [
  { name: "TypeScript", category: "Frontend", icon: "typescript" },
  { name: "React", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "next" },
  { name: "Tailwind", category: "Frontend", icon: "tailwind" },
  { name: "JavaScript", category: "Languages", icon: "javascript" },
  { name: "Node.js", category: "Backend", icon: "node" },
  { name: "Express", category: "Backend", icon: "express" },
  { name: "Python", category: "Languages", icon: "python" },
  { name: "FastAPI", category: "Backend", icon: "fastapi" },
  { name: "Flask", category: "Backend", icon: "flask" },
  { name: "MongoDB", category: "Database", icon: "mongodb" },
  { name: "PostgreSQL", category: "Database", icon: "postgresql" },
  { name: "MySQL", category: "Database", icon: "mysql" },
  { name: "LangChain", category: "AI", icon: "langchain" },
  { name: "Gemini", category: "AI", icon: "gemini" },
  { name: "Ollama", category: "AI", icon: "ollama" },
  { name: "Hugging Face", category: "AI", icon: "huggingface" },
  { name: "TensorFlow", category: "ML", icon: "tensorflow" },
  { name: "PyTorch", category: "ML", icon: "pytorch" },
  { name: "Streamlit", category: "AI UI", icon: "streamlit" },
  { name: "Jupyter", category: "Tools", icon: "jupyter" },
  { name: "Git", category: "Tools", icon: "git" },
  { name: "GitHub", category: "Tools", icon: "github" },
  { name: "Prisma", category: "Backend", icon: "prisma" },
  { name: "Clerk", category: "Auth", icon: "clerk" },
  { name: "tRPC", category: "Backend", icon: "trpc" },
  { name: "C++", category: "Languages", icon: "cplusplus" },
  { name: "SQL", category: "Database", icon: "sql" },
];
export const educationItems: EducationItem[] = [
  {
    period: "Expected June 2026",
    title: "Bachelor of Science in Computer Science",
    institution: "FAST NUCES, Chiniot-Faisalabad Campus",
    details:
      "Focused on software engineering, backend systems, AI applications, data structures, databases, and applied machine learning projects.",
  },
  {
    period: "2022 - Present",
    title: "Cyber Security & Technical Community Work",
    institution: "FAST Society of Cyber Security",
    details:
      "Participated in and led technical society work within the cyber security domain, supporting peer learning and campus technical culture.",
  },
  {
    period: "2022 - Present",
    title: "Photography & Media Collaboration",
    institution: "FPS NUCES",
    details:
      "Collaborated with the media team for event, workshop, and conference coverage, strengthening visual communication and creative discipline.",
  },
];

export const projects: Project[] = [
  {
    title: "Conversational RAG Search Engine",
    category: "AI Search",
    description:
      "A multi-source, agent-based search engine for querying web, Wikipedia, ArXiv, and custom documents with conversational memory and semantic retrieval.",
    technologies: [
      "LangChain",
      "Gemini",
      "Llama3",
      "Groq",
      "Pinecone",
      "Streamlit",
    ],
    links: {
      demo: "https://example.com/rag-search",
      source: "https://github.com/",
    },
    featured: true,
  },
  {
    title: "Facial Recognition Web App",
    category: "Computer Vision",
    description:
      "A Flask and DeepFace application with Gemini API integration for image upload, face comparison, matching confidence, ZIP uploads, previews, and secure downloads.",
    technologies: ["Flask", "DeepFace", "Gemini API", "Werkzeug", "Python"],
    links: {
      demo: "https://example.com/face-recognition",
      source: "https://github.com/",
    },
    featured: true,
  },
  {
    title: "AI-Powered Text Summarizer",
    category: "Full Stack AI",
    description:
      "A responsive summarization app with a FastAPI backend, Hugging Face transformers, and a Next.js TypeScript frontend for real-time long-form summaries.",
    technologies: ["FastAPI", "Hugging Face", "Next.js", "TypeScript", "LLMs"],
    links: {
      demo: "https://example.com/text-summarizer",
      source: "https://github.com/",
    },
  },
  {
    title: "Smart Home Energy Backend",
    category: "Backend / IoT",
    description:
      "Backend APIs for controlling IoT devices, logging device activity, tracking energy analytics, and protecting access with JWT-based security.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
    links: {
      demo: "https://example.com/smart-home-energy",
      source: "https://github.com/",
    },
  },
  {
    title: "Management Systems Suite",
    category: "Systems",
    description:
      "Academic, hospital, library, and airline management systems with user roles, scheduling, inventory tracking, validation, and database-backed CRUD flows.",
    technologies: ["C++", "C# Forms", "TypeScript", "Next.js", "Oracle SQL"],
    links: {
      demo: "https://example.com/management-suite",
      source: "https://github.com/",
    },
  },
  {
    title: "AI & Logic Game Collection",
    category: "Algorithms",
    description:
      "A collection of Tic Tac Toe, Bingo, Checkers AI, and Sudoku Solver projects using OOP, minimax, backtracking, CSP, and heuristic search.",
    technologies: ["Python", "C++", "Minimax", "Backtracking", "CSP"],
    links: {
      demo: "https://example.com/logic-games",
      source: "https://github.com/",
    },
  },
];

export const sectionMeta = {
  journey: {
    kicker: "My Journey",
    title: "Backend, AI, research, and campus leadership in one path.",
    icon: BookOpen,
  },
  stack: {
    kicker: "Tech Stack",
    title:
      "A practical stack for APIs, AI systems, RAG, OCR, and modern web apps.",
    icon: TerminalSquare,
  },
  education: {
    kicker: "Education",
    title:
      "Computer science foundations with hands-on technical community work.",
    icon: GraduationCap,
  },
  projects: {
    kicker: "Projects",
    title:
      "AI products, backend systems, and algorithm-heavy builds from the CV.",
    icon: BriefcaseBusiness,
  },
};
