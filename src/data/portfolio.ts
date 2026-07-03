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
};

export const profile = {
  name: "Mohammad Bilal",
  role: "Software Engineer | AI Engineer",
  location: "Doha, Qatar",
  intro: "Building scalable, user-focused solutions for real-world problems.",
  summary:
    "Computer Science student with hands-on experience in AI, computer vision, and full-stack development through academic and personal projects. Skilled in Python, JavaScript, React, Node.js, and machine learning.",
  email: "bilalnadeema302003@gmail.com",
  phone: "+923470405422",
};

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
    year: "Jun 2025 - Present",
    title: "AI Engineer",
    organization: "Zennore, Pakistan",
    description:
      "Building AI solutions in a startup environment while adapting to market trends, evolving technologies, and product development from concept to execution.",
    icon: BriefcaseBusiness,
  },
  {
    year: "2025",
    title: "AI Customer Churn Prediction System",
    organization: "Personal Project",
    description:
      "Developed an end-to-end telecom churn prediction application using XGBoost, Streamlit, and Gemini AI for analytics and customer retention insights.",
    icon: BrainCircuit,
  },
  {
    year: "2025",
    title: "Eye Blink Morse Code Detector",
    organization: "Personal Project",
    description:
      "Created a hands-free Morse code typing system powered by webcam input, OpenCV, MediaPipe Face Mesh, and NumPy.",
    icon: Binary,
  },
  {
    year: "Aug 2022 - Jun 2026",
    title: "BS Computer Science",
    organization: "FAST NUCES, Chiniot-Faisalabad Campus",
    description:
      "Focused on AI, software engineering, web development, databases, and machine learning while completing multiple academic and AI-based projects.",
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
    period: "Aug 2022 - Jun 2026",
    title: "Bachelor of Science in Computer Science",
    institution: "FAST NUCES, Chiniot-Faisalabad Campus",
    details:
      "BSCS graduate with a focus on AI, software engineering, web development, databases, and machine learning. GPA: 2.85/4.0.",
  },
  {
    period: "Academic Projects",
    title: "Software Engineering & AI Project Work",
    institution: "FAST NUCES",
    details:
      "Completed multiple academic and AI-based software projects across management systems, database applications, machine learning, and computer vision.",
  },
  {
    period: "Languages",
    title: "Communication",
    institution: "English and Urdu",
    details:
      "Fluent in English and Urdu, with experience collaborating in team-based startup, academic, and project environments.",
  },
];

export const projects: Project[] = [
  {
    title: "Software Systems & AI Project Suite",
    category: "Software Systems",
    description:
      "Unified collection of management systems, AI-powered games, and database applications built using modern software engineering principles.",
    technologies: [
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
      "OOP",
      "C++",
      "CRUD",
      "AI Algorithms",
      "C",
    ],
    links: {
      demo: "https://github.com/Bixal99",
      source: "https://github.com/Bixal99",
    },
    featured: true,
  },
  {
    title: "AI Customer Churn Prediction System",
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
    links: {
      demo: "https://github.com/Bixal99/Churn-Prediction",
      source: "https://github.com/Bixal99/Churn-Prediction",
    },
    featured: true,
  },
  {
    title: "Eye Blink Morse Code Detector",
    category: "Computer Vision",
    description:
      "Hands-free Morse code typing system powered by a webcam, OpenCV, MediaPipe Face Mesh, and NumPy.",
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    links: {
      demo: "https://github.com/Bixal99/EyeBlinkMorseDetector",
      source: "https://github.com/Bixal99/EyeBlinkMorseDetector",
    },
  },
];

export const sectionMeta = {
  journey: {
    kicker: "Experience",
    title: "The path behind the AI systems I build.",
    icon: BookOpen,
  },
  stack: {
    kicker: "Skills",
    title: "Technical, framework, AI, and collaboration skills.",
    icon: TerminalSquare,
  },
  education: {
    kicker: "Education",
    title: "Computer science, applied projects, and communication.",
    icon: GraduationCap,
  },
  projects: {
    kicker: "Selected Work",
    title: "Key projects from the updated resume.",
    icon: BriefcaseBusiness,
  },
};
