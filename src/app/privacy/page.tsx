import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Privacy Policy | ${profile.name}`,
  description:
    "How Mohammad Bilal's portfolio website handles information, contact messages, and third-party services.",
};

const sections = [
  {
    title: "Overview",
    body: [
      "This portfolio site is a personal presentation of my work, skills, and contact details. It is designed to share projects and make it easy to reach me.",
      "I aim to collect as little information as possible. This policy explains what may be processed when you visit or contact me through this website.",
    ],
  },
  {
    title: "Information you provide",
    body: [
      "If you use the contact form, you may send your name, email address, subject, and message. That content is used only to understand and respond to your inquiry.",
      "If you email or call me directly using the details on this site, normal communication records may exist in those channels (email inbox, phone history) under your provider's terms.",
    ],
  },
  {
    title: "Technical data",
    body: [
      "Like most websites, hosting and delivery providers may automatically process basic technical data such as IP address, browser type, device information, and pages requested. This supports security, performance, and reliable delivery of the site.",
      "I do not run advertising trackers on this portfolio, and I do not sell personal information.",
    ],
  },
  {
    title: "Cookies and local storage",
    body: [
      "This site may use essential storage needed for the experience to function (for example, remembering UI preferences in your browser). It is not used to build marketing profiles.",
      "You can clear cookies and site data anytime through your browser settings.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "The site may load fonts, icons, analytics-free hosting infrastructure, or embedded project demos hosted elsewhere. Those services process requests under their own privacy policies.",
      "External project links (GitHub, live demos, LinkedIn) open third-party platforms. Their privacy practices apply once you leave this site.",
    ],
  },
  {
    title: "Resume downloads",
    body: [
      "Downloading my CV is optional. The file is provided for evaluation and hiring conversations. Please do not redistribute it without permission.",
    ],
  },
  {
    title: "Retention",
    body: [
      "Contact messages are kept only as long as needed to reply and follow up. Technical logs retained by hosting providers follow their own retention schedules.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can choose not to use the contact form and reach me by email instead. You can also ask me to delete a message you previously sent, and I will do so when reasonably possible.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about this policy: ${profile.email}`,
    ],
  },
];

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">
          Last updated July 18, 2026. This page covers the personal portfolio of{" "}
          {profile.name}.
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
            className="text-[var(--accent)] transition hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-white/40 transition hover:text-[var(--accent)]"
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
