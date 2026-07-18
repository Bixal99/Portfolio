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
  image?: string;
  imageAlt?: string;
};

export type TechGroup = {
  title: string;
  items: string[];
  icon: ComponentType<LucideProps>;
};

export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  links: {
    demo: string;
    source: string;
  };
  featured?: boolean;
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
    year: "2018 - 2019",
    title: "Matric",
    organization: "School Years",
    description:
      "Built the early academic foundation through science, mathematics, discipline, and the first habits of structured problem solving.",
    icon: BookOpen,
    image: "/journey/pak-shamaa-school.png",
    imageAlt: "Pak Shamaa School",
  },
  {
    year: "2020 - 2021",
    title: "FSC",
    organization: "College Years",
    description:
      "Strengthened the pre-university path with analytical subjects, exam pressure, and the focus needed for computer science.",
    icon: BookOpen,
    image: "/journey/pak-shamaa-college.png",
    imageAlt: "Pak Shamaa School college campus",
  },
  {
    year: "Aug 2022",
    title: "Joined FAST NUCES University",
    organization: "Computer Science",
    description:
      "Started the computer science path that shaped my foundation in software engineering, AI, data, and problem solving.",
    icon: GraduationCap,
    image: "/journey/fast-nuces.png",
    imageAlt: "FAST NUCES University campus",
  },
  {
    year: "Jun 2025",
    title: "Startup Journey",
    organization: "AI Builder",
    description:
      "Stepped into a fast-moving startup environment, building AI solutions while learning product thinking, speed, and real-world execution.",
    icon: BriefcaseBusiness,
    image: "/journey/startup-tech-destination.jpg",
    imageAlt: "Tech Destination Pakistan startup event",
  },
  {
    year: "Jun 2026",
    title: "Graduation",
    organization: "BS Computer Science",
    description:
      "Completed the degree journey with a sharper focus on AI engineering, full-stack systems, and practical software craft.",
    icon: GraduationCap,
    image: "/journey/fast-nuces.png",
    imageAlt: "FAST NUCES University campus",
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

export const projects: Project[] = [
  {
    title: "AI Book Assistant",
    category: "Generative AI",
    description:
      "BookBy - an AI-assisted reading companion that helps explore, summarize, and navigate books with conversational guidance.",
    technologies: ["Next.js", "TypeScript", "AI", "Vercel"],
    highlights: [
      "Conversational book exploration and summaries",
      "Deployed on Vercel as a live demo",
    ],
    links: {
      demo: "https://ai-book-assistant-blush.vercel.app",
      source: "https://github.com/Bixal99/AIBookAssistant",
    },
    featured: true,
  },
  {
    title: "Churn Prediction System",
    category: "Machine Learning",
    description:
      "End-to-end telecom churn prediction application using XGBoost, Streamlit, and Gemini AI for churn prediction, interactive analytics, and AI-driven retention insights.",
    technologies: [
      "Python",
      "Streamlit",
      "XGBoost",
      "Plotly",
      "Pandas",
      "NumPy",
      "Google Gemini AI",
      "ML",
    ],
    highlights: [
      "XGBoost model for churn risk scoring",
      "Interactive analytics dashboard in Streamlit",
      "Gemini-powered retention insights",
    ],
    links: {
      demo: "https://github.com/Bixal99/Churn-Prediction",
      source: "https://github.com/Bixal99/Churn-Prediction",
    },
    featured: true,
  },
  {
    title: "Eye Blink Morse Detector",
    category: "Computer Vision",
    description:
      "Hands-free Morse code typing system powered by a webcam, OpenCV, MediaPipe Face Mesh, and NumPy.",
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    highlights: [
      "Face Mesh blink detection from webcam input",
      "Maps blink patterns to Morse characters",
    ],
    links: {
      demo: "https://github.com/Bixal99/EyeBlinkMorseDetector",
      source: "https://github.com/Bixal99/EyeBlinkMorseDetector",
    },
  },
  {
    title: "Ghoomora",
    category: "Full-Stack",
    description:
      "Full-stack web application with a live deployment - built for real-world browsing and interaction flows.",
    technologies: ["Next.js", "TypeScript", "Full-Stack", "Vercel"],
    highlights: [
      "End-to-end product experience on the web",
      "Live demo hosted on Vercel",
    ],
    links: {
      demo: "https://ghoomora.vercel.app",
      source: "https://github.com/Bixal99/Ghoomora",
    },
    featured: true,
  },
  {
    title: "RetroVerse",
    category: "Games",
    description:
      "Retro-inspired game experience built as a personal systems and interaction project.",
    technologies: ["JavaScript", "HTML", "CSS", "Game Design"],
    highlights: [
      "Classic retro game feel and interaction loops",
      "Browser-playable game systems",
    ],
    links: {
      demo: "https://github.com/Bixal99/RetroVerse",
      source: "https://github.com/Bixal99/RetroVerse",
    },
  },
  {
    title: "Scrapper",
    category: "Automation",
    description:
      "Automation tooling for scraping and collecting structured data from the web.",
    technologies: ["Python", "Automation", "Scraping"],
    highlights: [
      "Scripted data collection pipelines",
      "Structured output for downstream use",
    ],
    links: {
      demo: "https://github.com/Bixal99/Scrapper",
      source: "https://github.com/Bixal99/Scrapper",
    },
  },
  {
    title: "HMS",
    category: "Full-Stack",
    description:
      "Hospital management system covering core admin, records, and workflow features for clinic-style operations.",
    technologies: ["Full-Stack", "Database", "CRUD", "Web"],
    highlights: [
      "Admin and records workflows",
      "CRUD-backed management flows",
    ],
    links: {
      demo: "https://github.com/Bixal99/HMS",
      source: "https://github.com/Bixal99/HMS",
    },
  },
];

export const sectionMeta = {
  journey: {
    kicker: "MY JOURNEY",
    title: "From school foundations to university, startups, and graduation.",
    icon: BookOpen,
  },
  stack: {
    kicker: "MY SKILLS",
    title: "Technical, framework, AI, and collaboration skills.",
    icon: TerminalSquare,
  },
  projects: {
    kicker: "MY PROJECTS",
    title: "Seven builds from GitHub - click one to inspect on the right.",
    icon: BriefcaseBusiness,
  },
};
