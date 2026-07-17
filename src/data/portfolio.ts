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
  highlights?: string[];
};

export type HeroStat = {
  value: string;
  label: string;
};

export const profile = {
  name: "Mohammad Bilal",
  role: "Software Engineer | AI Engineer",
  location: "Doha, Qatar",
  thesis: "Building Scalable Solutions for Real-World Problems",
  intro: "Hi, I am Mohammad Bilal, an AI Engineer specializing in",
  summary:
    "Computer Science student with hands-on experience in AI, computer vision, and full-stack development through academic and personal projects. Skilled in Python, JavaScript, React, Node.js, and machine learning.",
  email: "bilalnadeema302003@gmail.com",
  phone: "+923470405422",
};

export const heroStats: HeroStat[] = [
  { value: "7+", label: "Solutions Delivered" },
  { value: "100%", label: "Success Rate" },
  { value: "AI", label: "Focus" },
];

export const resume = {
  label: "Download CV",
  href: "/Mohammad_Bilal_resume.pdf",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Bixal99", mark: "GH" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-bilal-64489827b/",
    mark: "IN",
  },
];

export const journeyItems: JourneyItem[] = [
  {
    year: "Aug 2022",
    title: "Joined FAST NUCES University",
    organization: "Computer Science",
    description:
      "Started the computer science path that shaped my foundation in software engineering, AI, data, and problem solving.",
    icon: GraduationCap,
  },
  {
    year: "Jun 2025",
    title: "Startup Journey",
    organization: "AI Builder",
    description:
      "Stepped into a fast-moving startup environment, building AI solutions while learning product thinking, speed, and real-world execution.",
    icon: BriefcaseBusiness,
  },
  {
    year: "Jun 2026",
    title: "Graduated",
    organization: "BS Computer Science",
    description:
      "Completed the degree journey with a sharper focus on AI engineering, full-stack systems, and practical software craft.",
    icon: GraduationCap,
  },
];

export const techGroups: TechGroup[] = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "SQL",
      "C",
      "C++",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frameworks",
    icon: Database,
    items: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "Tailwind CSS",
      "Streamlit",
    ],
  },
  {
    title: "AI & ML",
    icon: BrainCircuit,
    items: [
      "AI",
      "ML",
      "Computer Vision",
      "Prompt Engineering",
      "RAG",
      "XGBoost",
      "OpenCV",
    ],
  },
  {
    title: "AI Frameworks",
    icon: Binary,
    items: [
      "LangChain",
      "LangGraph",
      "Ollama",
      "Groq API",
      "Google Generative AI",
      "OpenAI",
      "Hugging Face",
    ],
  },
  {
    title: "Data & Platforms",
    icon: TerminalSquare,
    items: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Pandas",
      "NumPy",
      "PyMuPDF",
      "JSON",
    ],
  },
  {
    title: "Tools & Soft Skills",
    icon: Boxes,
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "VS Code",
      "Problem Solving",
      "Team Collaboration",
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
  { name: "React.js", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "next" },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwind" },
  { name: "JavaScript", category: "Languages", icon: "javascript" },
  { name: "HTML5", category: "Frontend", icon: "html" },
  { name: "CSS3", category: "Frontend", icon: "css" },
  { name: "Node.js", category: "Backend", icon: "node" },
  { name: "Express.js", category: "Backend", icon: "express" },
  { name: "Python", category: "Languages", icon: "python" },
  { name: "FastAPI", category: "Backend", icon: "fastapi" },
  { name: "Flask", category: "Backend", icon: "flask" },
  { name: "MongoDB", category: "Database", icon: "mongodb" },
  { name: "PostgreSQL", category: "Database", icon: "postgresql" },
  { name: "Supabase", category: "Database", icon: "supabase" },
  { name: "LangChain", category: "AI", icon: "langchain" },
  { name: "LangGraph", category: "AI", icon: "langgraph" },
  { name: "Google Generative AI", category: "AI", icon: "gemini" },
  { name: "Groq API", category: "AI", icon: "groq" },
  { name: "OpenAI", category: "AI", icon: "openai" },
  { name: "Ollama", category: "AI", icon: "ollama" },
  { name: "Hugging Face", category: "AI", icon: "huggingface" },
  { name: "Computer Vision", category: "ML", icon: "vision" },
  { name: "OpenCV", category: "ML", icon: "opencv" },
  { name: "XGBoost", category: "ML", icon: "xgboost" },
  { name: "Pandas", category: "Data", icon: "pandas" },
  { name: "NumPy", category: "Data", icon: "numpy" },
  { name: "Streamlit", category: "AI UI", icon: "streamlit" },
  { name: "Selenium", category: "Automation", icon: "selenium" },
  { name: "Beautiful Soup", category: "Automation", icon: "beautifulsoup" },
  { name: "PyMuPDF", category: "Documents", icon: "pymupdf" },
  { name: "Git", category: "Tools", icon: "git" },
  { name: "GitHub", category: "Tools", icon: "github" },
  { name: "Docker", category: "Tools", icon: "docker" },
  { name: "Postman", category: "Tools", icon: "postman" },
  { name: "VS Code", category: "Tools", icon: "vscode" },
  { name: "Figma", category: "Design", icon: "figma" },
  { name: "Vercel", category: "Platform", icon: "vercel" },
  { name: "Linux", category: "Platform", icon: "linux" },
  { name: "C++", category: "Languages", icon: "cplusplus" },
  { name: "C", category: "Languages", icon: "c" },
  { name: "SQL", category: "Database", icon: "sql" },
];

export const educationItems: EducationItem[] = [
  {
    period: "2018 - 2019",
    title: "Matric",
    institution: "School Years",
    details:
      "Built the early academic foundation through science, mathematics, discipline, and the first habits of structured problem solving.",
  },
  {
    period: "2020 - 2021",
    title: "FSC",
    institution: "College Years",
    details:
      "Strengthened the pre-university path with analytical subjects, exam pressure, and the focus needed for computer science.",
  },
  {
    period: "2022 - 2026",
    title: "University Life",
    institution: "FAST NUCES",
    details:
      "Moved into computer science, software engineering, AI, databases, web development, and practical project work.",
  },
];

export const projects: Project[] = [
  {
    title: "AI Book Assistant",
    category: "Generative AI",
    description:
      "Transform books into interactive AI conversations — upload PDFs and explore them through voice with a Next.js companion app.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Vapi",
      "Tailwind CSS",
    ],
    links: {
      demo: "https://ai-book-assistant-blush.vercel.app",
      source: "https://github.com/Bixal99/AIBookAssistant",
    },
    featured: true,
    highlights: [
      "Upload PDFs to Vercel Blob and open voice chat immediately while segments index in the background.",
      "Live Vapi sessions for questions, summaries, and searchable book segments.",
      "Dashboard with KPIs, reading history, and library management.",
    ],
  },
  {
    title: "Churn Prediction System",
    category: "Machine Learning",
    description:
      "End-to-end telecom churn prediction with a trained XGBoost model, Streamlit dashboard, and optional Gemini retention insights.",
    technologies: [
      "Python",
      "Streamlit",
      "XGBoost",
      "Plotly",
      "Pandas",
      "NumPy",
      "Google Gemini AI",
    ],
    links: {
      demo: "https://github.com/Bixal99/Churn-Prediction",
      source: "https://github.com/Bixal99/Churn-Prediction",
    },
    featured: true,
    highlights: [
      "Trained XGBoost pipeline with preprocessing artifacts for reliable inference.",
      "Interactive Streamlit UI with probability risk gauge and health score.",
      "Optional Gemini AI suggestions for retention strategies.",
    ],
  },
  {
    title: "Eye Blink Morse Detector",
    category: "Computer Vision",
    description:
      "Hands-free communication system that converts intentional eye blinks into Morse code text using OpenCV and MediaPipe.",
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    links: {
      demo: "https://github.com/Bixal99/EyeBlinkMorseDetector",
      source: "https://github.com/Bixal99/EyeBlinkMorseDetector",
    },
    highlights: [
      "EAR-based blink detection for intentional short and long blinks.",
      "Realtime webcam pipeline with OpenCV and MediaPipe Face Mesh.",
      "Maps blink sequences into Morse code text for accessibility.",
    ],
  },
  {
    title: "Ghoomora",
    category: "Full-Stack",
    description:
      "Northern Pakistan travel platform — regions, packages, trip builder, maps, weather, safety, and bookings on a modern Next.js stack.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "MapLibre",
      "Groq",
    ],
    links: {
      demo: "https://ghoomora.vercel.app",
      source: "https://github.com/Bixal99/Ghoomora",
    },
    featured: true,
    highlights: [
      "Trip planning for real northern roads with maps and weather context.",
      "Auth.js sessions, Prisma/PostgreSQL, and role-based travel ops.",
      "AI assistance via Groq plus MapLibre mapping for routes and regions.",
    ],
  },
  {
    title: "RetroVerse",
    category: "Games",
    description:
      "Modern retro gaming arcade with ten classic cabinets, stats, achievements, and LocalStorage persistence on a free stack.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "GSAP",
    ],
    links: {
      demo: "https://github.com/Bixal99/RetroVerse",
      source: "https://github.com/Bixal99/RetroVerse",
    },
    highlights: [
      "Ten playable games including Snake, Pong, Pac-Man, 2048, and more.",
      "Shared GameShell with pause, settings, HUD, and Chart.js progress.",
      "Client-only deploy with Zustand + LocalStorage — no backend required.",
    ],
  },
  {
    title: "Scrapper",
    category: "Automation",
    description:
      "Site scraper utility focused on extracting structured data from web pages for downstream analysis and automation.",
    technologies: ["Python", "Beautiful Soup", "Selenium", "Requests"],
    links: {
      demo: "https://github.com/Bixal99/Scrapper",
      source: "https://github.com/Bixal99/Scrapper",
    },
    highlights: [
      "Targets web pages for structured content extraction.",
      "Built for automation pipelines and data collection workflows.",
      "Lightweight repo focused on scraping fundamentals.",
    ],
  },
  {
    title: "MediCore HMS",
    category: "Full-Stack",
    description:
      "Hospital management system for real clinical workflows — patient portal, appointments, pharmacy, lab, wards, billing, and role-based ops.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
    ],
    links: {
      demo: "https://github.com/Bixal99/HMS",
      source: "https://github.com/Bixal99/HMS",
    },
    featured: true,
    highlights: [
      "Monorepo with Next.js web, Express API, and shared auth packages.",
      "Realtime queues and ward boards over Socket.IO.",
      "Role portals for admin, doctor, nurse, pharmacy, lab, billing, and patients.",
    ],
  },
];

export const sectionMeta = {
  journey: {
    kicker: "MY JOURNEY",
    title: "Three beats that shaped the builder I am becoming.",
    icon: BookOpen,
  },
  stack: {
    kicker: "MY SKILLS",
    title: "Technical, framework, AI, and collaboration skills.",
    icon: TerminalSquare,
  },
  education: {
    kicker: "MY EDUCATION",
    title: "From school foundations to computer science and AI systems.",
    icon: GraduationCap,
  },
  projects: {
    kicker: "MY PROJECTS",
    title: "Selected systems from GitHub — toggle one to inspect the build.",
    icon: BriefcaseBusiness,
  },
};
