"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/portfolio";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const navbarSocial = socialLinks.filter(
  (link) => link.label === "GitHub" || link.label === "LinkedIn",
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      setCompact(window.scrollY > 48);

      const viewportLine = window.innerHeight * 0.45;
      let closestId = navItems[0]?.href.slice(1) ?? "home";
      let closestDistance = Number.POSITIVE_INFINITY;

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height * 0.42;
        const distance = Math.abs(sectionCenter - viewportLine);
        const crossesViewport = rect.top <= viewportLine && rect.bottom >= viewportLine;

        if (crossesViewport) {
          closestId = item.href.slice(1);
          closestDistance = -1;
          return;
        }

        if (closestDistance >= 0 && distance < closestDistance) {
          closestDistance = distance;
          closestId = item.href.slice(1);
        }
      });

      setActiveId(closestId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const activeIndex = useMemo(() => {
    const index = navItems.findIndex((item) => item.href.slice(1) === activeId);
    return index >= 0 ? index : 0;
  }, [activeId]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${compact ? "border-b border-white/10 bg-black/70 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="max-w-[220px] text-sm font-bold uppercase tracking-[0.32em] text-white lg:max-w-none lg:-translate-x-4">
          {profile.name}
        </a>

        <nav
          className="theme-nav-shell absolute left-[54%] hidden w-[760px] -translate-x-1/2 items-center overflow-hidden rounded-full bg-white/[0.025] p-1 shadow-[var(--shadow-border)] backdrop-blur-xl lg:grid"
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
          aria-label="Main navigation"
        >
          <span
            aria-hidden="true"
            className="theme-nav-indicator absolute left-1 top-1 h-[calc(100%-0.5rem)] rounded-full bg-[var(--accent)] shadow-[0_0_28px_rgba(var(--accent-rgb),0.2)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `calc((100% - 0.5rem) / ${navItems.length})`, transform: `translateX(${activeIndex * 100}%)` }}
          />
          {navItems.map((item) => {
            const active = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative z-10 rounded-full px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active ? "text-black" : "text-white/48 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4 lg:ml-0 lg:gap-5 lg:translate-x-2">
          <div className="flex items-center gap-4">
            {navbarSocial.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onMouseLeave={(e) => e.currentTarget.blur()}
                className="group inline-flex flex-col items-center gap-1 text-white/70 transition-[color,filter] duration-200 ease-out hover:text-[var(--accent)] hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),0.7)] focus:text-white/70 focus:drop-shadow-none focus-visible:text-[var(--accent)] focus-visible:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),0.7)]"
              >
                {link.label === "GitHub" ? (
                  <GitHubIcon className="size-6" />
                ) : (
                  <LinkedInIcon className="size-6" />
                )}
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45 transition-colors duration-200 group-hover:text-[var(--accent)]">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          <button
            type="button"
            suppressHydrationWarning
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="relative grid size-11 place-items-center text-white shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:scale-[0.96] lg:hidden"
          >
            <span className="relative size-5">
              <Menu
                className={`absolute inset-0 size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"
                }`}
                aria-hidden="true"
              />
              <X
                className={`absolute inset-0 size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  open ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"
                }`}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-black/95 px-5 py-5 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = activeId === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-[background-color,box-shadow,color,transform] duration-150 active:scale-[0.96] ${
                    active
                      ? "bg-[var(--accent)] text-black shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.55)]"
                      : "text-white/70 shadow-[var(--shadow-border)] hover:bg-white/10 hover:text-white hover:shadow-[var(--shadow-border-hover)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
