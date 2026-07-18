import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Terms of Use | ${profile.name}`,
  description:
    "Terms for using Mohammad Bilal's portfolio website, projects, and shared materials.",
};

const sections = [
  {
    title: "Acceptance",
    body: [
      "By using this website, you agree to these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    title: "Purpose of the site",
    body: [
      "This website is a personal portfolio for presenting projects, skills, and contact information. It is provided as-is for informational and professional networking purposes.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "Unless otherwise noted, the design, writing, branding, and original project materials on this site belong to me. You may view and share links to public pages, but you may not copy, republish, or reuse substantial content without permission.",
      "Project demos and repositories may include open-source licenses. Follow those licenses when using that code.",
    ],
  },
  {
    title: "Resume and materials",
    body: [
      "Any resume or portfolio materials you download are for evaluation related to roles, collaborations, or interviews. Do not redistribute them publicly without consent.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "Do not misuse the contact form (spam, harassment, or malicious content). Do not attempt to disrupt the site, probe it without authorization, or abuse third-party services linked from here.",
    ],
  },
  {
    title: "External links",
    body: [
      "Links to GitHub, demos, social profiles, and other sites are provided for convenience. I am not responsible for third-party content, availability, or policies.",
    ],
  },
  {
    title: "Disclaimer",
    body: [
      "The site is provided without warranties of any kind. Project descriptions reflect my work to the best of my knowledge and may evolve over time.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about these terms: ${profile.email}`,
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-x-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-rgb),0.14),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/45 transition hover:text-[var(--accent)]"
        >
          <ArrowLeft
            className="size-3.5 transition group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back home
        </Link>

        <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">
          Last updated July 18, 2026. These terms apply to the personal portfolio
          of {profile.name}.
        </p>

        <div className="mt-12 space-y-10 border-t border-white/10 pt-10">
          {sections.map((section, index) => (
            <section key={section.title} className="scroll-mt-24">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="mt-4 space-y-3 pl-[2.6rem]">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[0.95rem] leading-7 text-white/60"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav
          className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-8 text-xs font-semibold uppercase tracking-[0.2em]"
          aria-label="Legal"
        >
          <Link
            href="/privacy"
            className="text-white/40 transition hover:text-[var(--accent)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-[var(--accent)] transition hover:text-white"
          >
            Terms of Use
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="text-white/40 transition hover:text-[var(--accent)]"
          >
            Contact
          </a>
        </nav>
      </div>
    </main>
  );
}
