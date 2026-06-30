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
        className="grid size-12 place-items-center border border-white/25 bg-white text-sm font-black text-black shadow-[0_0_28px_rgba(255,255,255,0.12)] transition hover:bg-black hover:text-white"
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
              className={`grid size-10 place-items-center border text-[10px] font-semibold uppercase tracking-widest transition duration-300 ${
                active
                  ? "border-white bg-white text-black"
                  : "border-white/12 bg-white/[0.025] text-white/45 hover:border-white/55 hover:text-white"
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
              className="grid size-10 place-items-center border border-white/12 bg-white/[0.025] text-white/55 transition hover:border-white/55 hover:bg-white hover:text-black"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </aside>
  );
}

