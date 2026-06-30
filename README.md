<div align="center">

# Mohammad Bilal Nadeem Portfolio

A motion-first personal portfolio for a backend, AI, and RAG-focused computer science developer.
Built with Next.js 16, React 19, Tailwind CSS 4, and GSAP.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=111111" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-Scroll_Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=111111" />
</p>

<p>
  <img alt="Backend" src="https://img.shields.io/badge/Backend_APIs-Node.js_Express-5DD3B6?style=flat-square" />
  <img alt="AI" src="https://img.shields.io/badge/AI_Systems-LangChain_RAG-2F2FE4?style=flat-square" />
  <img alt="Database" src="https://img.shields.io/badge/Data-MongoDB_PostgreSQL-47A248?style=flat-square" />
  <img alt="Theme" src="https://img.shields.io/badge/Theme-Dark_and_Light-111111?style=flat-square" />
  <img alt="Status" src="https://img.shields.io/badge/Status-Portfolio_Ready-5DD3B6?style=flat-square" />
</p>

</div>

---

## Overview

This repository contains the personal portfolio website for **Mohammad Bilal Nadeem**, a BS Computer Science candidate at FAST NUCES focused on backend engineering, AI applications, RAG pipelines, OCR, vector databases, and full-stack tools.

The site is designed as an interactive portfolio rather than a static resume page. It uses scroll-based GSAP animation, a code-editor inspired hero section, a sliding navbar indicator, a theme-aware interface, animated skill cards, journey and education timelines, project cards, and a contact form with CV download access.

## Experience Highlights

- **Animated code hero**: clickable editor tabs with generated code stories for backend, AI, and debugging themes.
- **Sliding navbar**: active pill follows the current section while scrolling.
- **Dark and light themes**: teal accent in dark mode and blue accent in light mode.
- **Journey timeline**: central animated path for experience, research, internship, and academic milestones.
- **Skill section**: simple GSAP-powered cards, animated chips, technology icons, and continuous marquee motion.
- **Education section**: scroll-driven visual timeline with sticky content and animated progress line.
- **Projects grid**: AI, backend, management-system, OCR, and algorithm-heavy project cards.
- **Contact footer**: redesigned footer with social links, contact form, and CV button below the form.
- **Responsive layout**: desktop navigation with mobile menu fallback.

## Tech Stickers

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111" />
  <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-111111?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="LangChain" src="https://img.shields.io/badge/LangChain-RAG-5DD3B6?style=for-the-badge" />
  <img alt="Hugging Face" src="https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=111111" />
  <img alt="TensorFlow" src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" />
  <img alt="PyTorch" src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" />
  <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
</p>

## Project Structure

```txt
Portfolio/
├─ public/
│  ├─ Me.jpeg              # Profile image used in the hero visual
│  ├─ resume.pdf           # CV downloaded from the contact form
│  └─ *.svg                # Static visual assets
├─ src/
│  ├─ app/
│  │  ├─ globals.css       # Theme tokens, Tailwind CSS, light/dark overrides
│  │  ├─ layout.tsx        # App shell and metadata
│  │  └─ page.tsx          # Main portfolio composition
│  ├─ components/
│  │  ├─ Navbar.tsx        # Sliding active navbar
│  │  ├─ HeroSection.tsx   # Intro copy and profile visual layout
│  │  ├─ CreativeCodeWindow.tsx
│  │  ├─ JourneyTimeline.tsx
│  │  ├─ TechStack.tsx
│  │  ├─ Education.tsx
│  │  ├─ ProjectGrid.tsx
│  │  ├─ ContactForm.tsx
│  │  └─ Footer.tsx
│  └─ data/
│     └─ portfolio.ts      # Profile, nav, skills, education, projects, socials
├─ package.json
├─ next.config.ts
└─ README.md
```

## Main Sections

| Section | Purpose |
| --- | --- |
| Home | Large name lockup, typewriter role line, intro, profile photo, and editor-style animation. |
| Journey | Experience timeline for society work, AI research, backend internship, and degree progress. |
| Skills | Simple animated stack cards with icons and GSAP stagger effects. |
| Education | Scroll-driven academic and community timeline with visual panels. |
| Projects | Project cards covering RAG, AI search, backend APIs, computer vision, and algorithms. |
| Footer | Contact information, social links, message form, and CV download. |

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local app:

```txt
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Serves the production build. |
| `npm run lint` | Runs ESLint for code quality checks. |

## Customization Guide

Most portfolio content lives in one file:

```txt
src/data/portfolio.ts
```

Update this file to change:

- Name, role, intro, summary, email, phone, and location.
- Navbar labels and section anchors.
- Journey timeline entries.
- Skill groups and individual technology icons.
- Education entries.
- Project cards, technologies, demo links, and source links.
- Social profiles.
- CV path.

Theme colors are controlled in:

```txt
src/app/globals.css
```

Current accent behavior:

| Theme | Accent |
| --- | --- |
| Dark | Teal `#5DD3B6` |
| Light | Blue `#2F2FE4` |

The CV file is served from:

```txt
public/resume.pdf
```

The profile image is served from:

```txt
public/Me.jpeg
```

## Animation Notes

The portfolio uses GSAP and ScrollTrigger for:

- Hero reveal animations.
- Code editor entrance and tab interaction.
- Scroll progress and section reveal effects.
- Journey timeline line fill and card motion.
- Skill card stagger animation and marquee movement.
- Education timeline fill, sticky panels, and preview movement.
- Theme switching refreshes ScrollTrigger so animations stay aligned after toggling dark or light mode.

## Design Notes

- The interface is intentionally dark-first with a clean light-mode fallback.
- The navbar is positioned as a centered pill with room for the name mark on the left.
- The active navbar item uses a sliding pill instead of isolated buttons.
- The portfolio avoids repeated CV buttons; the CV action lives below the contact form.
- The tech stack is kept simple and scannable, supported by motion instead of a heavy graph.

## Quality Checks

Before pushing or deploying, run:

```bash
npm run lint
npm run build
```

The current project has been verified with both commands after the latest UI and theme updates.

## Deployment

This is a standard Next.js application and can be deployed on platforms that support Next.js, including Vercel.

Recommended deployment flow:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Keep the default Next.js build settings.
4. Confirm `public/resume.pdf` and `public/Me.jpeg` are included.
5. Deploy.

## Author

**Mohammad Bilal Nadeem**

- Location: Doha, Qatar
- Email: `bilalnadeema302003@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/mohammad-bilal-64489827b/`

---

<div align="center">

Built as a portfolio for backend systems, AI applications, RAG pipelines, and practical full-stack work.

<img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-Mohammad_Bilal_Nadeem-5DD3B6?style=for-the-badge" />

</div>
