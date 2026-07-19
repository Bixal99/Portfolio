"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { BriefcaseBusiness, Camera, Code2, X } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/portfolio";

const socialIcons: Record<string, ComponentType<LucideProps>> = {
  GitHub: Code2,
  LinkedIn: BriefcaseBusiness,
  X,
  Instagram: Camera,
  Facebook: BriefcaseBusiness,
};

export function SideNav() {
  const [activeId, setActiveId] = useState(navItems[0]?.href.slice(1) ?? "home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-dvh w-24 flex-col items-center justify-between border-r border-white/10 bg-black/40 px-4 py-7 backdrop-blur-xl lg:flex">
      <a
        href="#home"
        aria-label={`${profile.name} home`}
        className="grid size-12 place-items-center bg-white text-sm font-black text-black shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_0_28px_rgba(255,255,255,0.12)] transition-[background-color,color,transform,box-shadow] duration-150 hover:bg-black hover:text-white hover:shadow-[var(--shadow-border-hover)] active:scale-[0.96]"
      >
        {profile.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </a>

      <nav aria-label="Section navigation" className="flex flex-col gap-3">
        {navItems.map((item) => {
          const id = item.href.slice(1);
          const active = id === activeId;

          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className={`grid size-10 place-items-center text-[10px] font-semibold uppercase tracking-widest transition-[background-color,box-shadow,color,transform] duration-300 active:scale-[0.96] ${
                active
                  ? "bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.55)]"
                  : "bg-white/[0.025] text-white/45 shadow-[var(--shadow-border)] hover:text-white hover:shadow-[var(--shadow-border-hover)]"
              }`}
            >
              <span aria-hidden="true">{item.label.slice(0, 2)}</span>
            </a>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3" aria-label="Social links">
        {socialLinks.map((link) => {
          const Icon = socialIcons[link.label] ?? Code2;

          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
              className="grid size-10 place-items-center bg-white/[0.025] text-white/55 shadow-[var(--shadow-border)] transition-[background-color,box-shadow,color,transform] duration-150 hover:bg-white hover:text-black hover:shadow-[var(--shadow-border-hover)] active:scale-[0.96]"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </aside>
  );
}

