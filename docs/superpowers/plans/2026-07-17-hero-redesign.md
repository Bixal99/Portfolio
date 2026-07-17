# Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Hero section to focus on a problem-solving layout with clear calls to action, drawing inspiration from the reference site while keeping the interactive grid background.

**Architecture:** We will update `HeroSection.tsx` to replace the current text layout with a bold headline (gradient on "Scalable Solutions"), a typewriter subtitle, and dual CTA buttons side-by-side. We will also update `src/data/portfolio.ts` to ensure `heroStats` and `profile` have the necessary text.

**Tech Stack:** Next.js, Tailwind CSS, TypeScript, React.

## Global Constraints
- Retain the existing `InteractiveGridBackground` component.
- Keep the current center-aligned navigation links in `Navbar.tsx`.
- Use `--accent` for gradients and primary buttons.

---

### Task 1: Update Portfolio Data

**Files:**
- Modify: `src/data/portfolio.ts:65-85`

**Interfaces:**
- Consumes: N/A
- Produces: Updated `profile` and `heroStats` objects.

- [ ] **Step 1: Update the profile and heroStats data**

Update `profile.thesis` and `heroStats` to match the new design.

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "chore: update profile and hero stats for new design"
```

---

### Task 2: Redesign Hero Section Layout

**Files:**
- Modify: `src/components/HeroSection.tsx:1-92`

**Interfaces:**
- Consumes: Updated `profile` and `heroStats` from `src/data/portfolio.ts`.
- Produces: A redesigned Hero section.

- [ ] **Step 1: Rewrite HeroSection.tsx**

Replace the contents of `src/components/HeroSection.tsx` with the new layout.

```tsx
"use client";

import { heroStats, profile, resume } from "@/data/portfolio";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-0 items-center justify-center overflow-hidden py-28 sm:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,28rem)] w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.14),transparent_68%)]"
        aria-hidden="true"
      />

      <div
        data-hero-copy
        className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <h1
          data-hero-animate
          className="max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white"
        >
          Building <span className="bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">Scalable Solutions</span> for Real-World Problems
        </h1>

        <div
          data-hero-animate
          className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 text-lg sm:text-xl font-medium text-white/80"
        >
          <span>{profile.intro}</span>
          <div className="w-full sm:w-auto min-w-[200px]">
            <TypewriterLine align="center" />
          </div>
        </div>

        <div
          data-hero-animate
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white"
          >
            View Projects
          </a>
          <a
            href={resume.href}
            download
            className="inline-flex items-center rounded-full border border-[var(--accent)] bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
          >
            {resume.label}
          </a>
        </div>

        <div
          data-hero-animate
          className="mt-16 flex w-full max-w-2xl items-start justify-center gap-8 border-t border-white/10 pt-8 sm:gap-16"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="min-w-0 text-center">
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: redesign hero section with new layout and CTAs"
```
