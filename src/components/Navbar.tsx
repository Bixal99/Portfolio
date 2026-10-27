"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/portfolio";
import styles from "./Navbar.module.css";

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
    const updateActiveSection = () => {
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
    <header className={`${styles.header} fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${compact ? "border-b border-[var(--edge)] bg-[var(--background)] backdrop-blur-xl" : "bg-transparent"}`}>
      <div className={styles.row}>
        <a href="#home" className={styles.brand}>
          {profile.name}
        </a>

        <nav
          className={`theme-nav-shell ${styles.shell}`}
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
          aria-label="Main navigation"
        >
          <span
            aria-hidden="true"
            className={`theme-nav-indicator ${styles.indicator}`}
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
                className={styles.link}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <div className={styles.socials}>
            {navbarSocial.map((link) => (
              <a
                key={link.label}
                aria-label={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onMouseLeave={(e) => e.currentTarget.blur()}
                className={`group ${styles.socialLink}`}
              >
                {link.label === "GitHub" ? (
                  <GitHubIcon className="size-5 sm:size-6" />
                ) : (
                  <LinkedInIcon className="size-5 sm:size-6" />
                )}
                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--accent)] sm:inline">
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
            className={`relative grid size-11 place-items-center text-[var(--foreground)] shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:scale-[0.96] ${styles.menuToggle}`}
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
        <div id="mobile-navigation" className={styles.mobilePanel}>
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
