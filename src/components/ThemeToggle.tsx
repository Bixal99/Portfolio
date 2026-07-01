"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    document.documentElement.setAttribute("data-theme", initial);
    window.requestAnimationFrame(() => {
      setTheme(initial);
      ScrollTrigger.refresh();
    });
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("portfolio-theme", next);
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="fixed bottom-24 right-5 z-50 grid size-12 place-items-center rounded-full border border-white/20 bg-black/70 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}


