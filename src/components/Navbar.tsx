"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";

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

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <button
            type="button"
            suppressHydrationWarning
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="relative grid size-11 place-items-center border border-white/15 text-white transition-transform duration-150 ease-out active:scale-[0.96] lg:hidden"
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
                  className={`border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-[background-color,border-color,color] duration-150 active:scale-[0.96] ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                      : "border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
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
