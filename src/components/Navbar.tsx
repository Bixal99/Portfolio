"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navbarSocial = socialLinks.filter(
  (link) => link.label === "GitHub" || link.label === "LinkedIn",
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [compact, setCompact] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const sections = navItems.map((item) => ({
      id: item.href.slice(1),
      element: document.querySelector(item.href),
    }));
    let frame = 0;
    let previousId = "home";
    let previouslyCompact = false;
    let previouslyLight = false;
    const lightSurfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-light-surface]"));
    const updateActiveSection = () => {
      const sampleY = window.innerWidth >= 1200 ? 44 : 38;
      const nextLight = lightSurfaces.some((surface) => {
        const bounds = surface.getBoundingClientRect();
        return bounds.top <= sampleY && bounds.bottom > sampleY;
      });
      if (nextLight !== previouslyLight) {
        previouslyLight = nextLight;
        setLightBackground(nextLight);
      }
      const nextCompact = window.scrollY > 48;
      if (nextCompact !== previouslyCompact) {
        previouslyCompact = nextCompact;
        setCompact(nextCompact);
      }
      const activationLine = Math.min(window.innerHeight * .35, 240);
      let currentId = navItems[0]?.href.slice(1) ?? "home";
      for (const section of sections) {
        if (section.element && section.element.getBoundingClientRect().top <= activationLine) currentId = section.id;
      }
      if (currentId !== previousId) {
        previousId = currentId;
        setActiveId(currentId);
      }
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; updateActiveSection(); });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const highlightedIndex = Math.max(0, navItems.findIndex((item) => item.href.slice(1) === activeId));

  return (
    <header className={cn(
      "pointer-events-none fixed inset-x-0 top-0 z-50 isolate pt-[env(safe-area-inset-top)] [--nav-canvas:#080b12]",
      compact && "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-24 before:bg-[linear-gradient(180deg,var(--nav-canvas)_0%,var(--nav-canvas)_20%,transparent_100%)] before:content-['']",
      lightBackground && "[--nav-canvas:#dbe2f0] [--background:#dbe2f0] [--foreground:#14213d] [--surface:#e6ecf6] [--surface-soft:#cfdcf4] [--edge:#b4c1d5] [--muted:#40526c] [--accent:#1f50c6] [--on-accent:#ffffff]",
    )} data-compact={compact} data-nav-theme={lightBackground ? "light" : "dark"}>
      <div data-nav-frame className={cn(
        "relative mx-auto grid h-[68px] w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:h-[76px] sm:px-6 min-[1200px]:h-[88px] min-[1200px]:grid-cols-[minmax(0,1fr)_560px_minmax(0,1fr)] min-[1200px]:gap-6 min-[1280px]:grid-cols-[minmax(0,1fr)_630px_minmax(0,1fr)]",
      )}>
        <a href="#home" className="pointer-events-auto min-w-0 justify-self-start whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--foreground)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:text-sm sm:tracking-[0.18em]">
          {profile.name}
        </a>

        <nav
          className="theme-nav-shell pointer-events-auto relative hidden h-[58px] w-full items-stretch rounded-full border border-[var(--edge)] bg-[var(--surface)] px-1.5 py-1 transition-[background-color,border-color] duration-300 min-[1200px]:grid motion-reduce:transition-none"
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
          aria-label="Main navigation"
        >
          <span
            aria-hidden="true"
            className="theme-nav-indicator pointer-events-none absolute top-1 left-1.5 z-0 h-[calc(100%_-_8px)] rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `calc((100% - 12px) / ${navItems.length})`, transform: `translateX(${highlightedIndex * 100}%)` }}
          />
          {navItems.map((item) => {
            const active = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "location" : undefined}
                data-highlighted={active}
                className="relative z-10 flex min-h-12 min-w-0 items-center justify-center rounded-full px-3 text-[13px] font-semibold whitespace-nowrap text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--foreground)] data-[highlighted=true]:text-[var(--on-accent)] min-[1280px]:text-sm motion-reduce:transition-none"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="pointer-events-auto flex items-center justify-self-end gap-0.5">
          <div className="flex items-center gap-0.5 sm:gap-3">
            {navbarSocial.map((link) => (
              <a
                key={link.label}
                aria-label={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                title={link.label}
                className="inline-flex min-h-11 min-w-11 shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transition-none sm:min-w-14"
              >
                {link.label === "GitHub" ? (
                  <GitHubIcon className="size-5 sm:size-6" />
                ) : (
                  <LinkedInIcon className="size-5 sm:size-6" />
                )}
                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.14em] sm:inline">
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
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="relative grid size-11 shrink-0 place-items-center rounded-lg text-[var(--foreground)] transition-colors hover:bg-[var(--surface-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] min-[1200px]:hidden"
          >
            <span className="relative size-5">
              <Menu
                className={`absolute inset-0 size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"
                  }`}
                aria-hidden="true"
              />
              <X
                className={`absolute inset-0 size-5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${open ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"
                  }`}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-navigation" className="pointer-events-auto mx-auto mt-2 max-h-[calc(100svh_-_110px_-_env(safe-area-inset-top))] w-full max-w-7xl overflow-y-auto rounded-2xl border border-[var(--edge)] bg-[var(--surface)] p-3 shadow-[0_12px_32px_rgba(0,0,0,0.2)] min-[1200px]:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = activeId === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-[background-color,box-shadow,color,transform] duration-150 active:scale-[0.96] ${active
                      ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.55)]"
                      : "text-[var(--muted)] shadow-[var(--shadow-border)] hover:bg-[var(--surface)] hover:text-[var(--foreground)] hover:shadow-[var(--shadow-border-hover)]"
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
