import { Download } from "lucide-react";
import { resume } from "@/data/portfolio";

export function ResumeButton() {
  return (
    <a
      href={resume.href}
      download
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 bg-[var(--accent)] py-3 pl-3.5 pr-4 text-sm font-bold text-black shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.7),0_20px_70px_rgba(var(--accent-rgb),0.22)] transition-[transform,background-color,color,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_20px_70px_rgba(var(--accent-rgb),0.22)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black active:scale-[0.96]"
    >
      <Download className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">{resume.label}</span>
      <span className="sm:hidden">CV</span>
    </a>
  );
}


