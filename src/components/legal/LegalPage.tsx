"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, ScrollText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/portfolio";
import type { LegalDocument } from "@/data/legal";
import { LegalAmbientBackdrop } from "./LegalAmbientMedia";
import { cn } from "@/lib/utils";

type LegalPageProps = {
  doc: LegalDocument;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function LegalPage({ doc }: LegalPageProps) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "");
  const Icon = doc.slug === "privacy" ? ShieldCheck : ScrollText;

  useEffect(() => {
    const nodes = doc.sections
      .map((section) => window.document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

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
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [doc.sections]);

  const reveal = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  return (
    <main className="relative isolate min-h-dvh overflow-x-hidden bg-black text-white">
      <section className="relative flex min-h-[62vh] flex-col justify-end overflow-hidden">
        <LegalAmbientBackdrop title={doc.title} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">
          <motion.div
            {...reveal}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <Link
              href="/"
              className="group inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/55 transition-[color,transform] duration-150 hover:text-[var(--accent)] active:scale-[0.96]"
            >
              <ArrowLeft
                className="size-3.5 transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              Back home
            </Link>
          </motion.div>

          <motion.p
            {...reveal}
            transition={{ duration: 0.45, delay: 0.08, ease: easeOut }}
            className="mt-14 text-[clamp(1.1rem,2.4vw,1.55rem)] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
          >
            {profile.name}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
            className="mt-5 flex items-end gap-4 sm:gap-5"
          >
            <span className="mb-2 hidden h-1 w-14 rounded-full bg-[var(--accent)] shadow-[0_0_22px_rgba(var(--accent-rgb),0.7)] sm:block" />
            <Icon
              className="mb-1.5 size-10 shrink-0 text-[var(--accent)] sm:size-12"
              aria-hidden="true"
            />
            <h1 className="text-balance text-[clamp(2.6rem,8vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
              {doc.title}
            </h1>
          </motion.div>

          <motion.p
            {...reveal}
            transition={{ duration: 0.45, delay: 0.26, ease: easeOut }}
            className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/62 sm:text-lg"
          >
            {doc.summary}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.4, delay: 0.34, ease: easeOut }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42"
          >
            <span className="tabular-nums text-[var(--accent)]/90">
              Updated {doc.updated}
            </span>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <span>{doc.kicker}</span>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 pb-24 pt-6 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:px-12 lg:pt-10">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
            On this page
          </p>
          <nav
            aria-label={`${doc.title} sections`}
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
          >
            {doc.sections.map((section) => {
              const active = activeId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "inline-flex min-h-10 shrink-0 items-center rounded-xl px-3 py-2 text-left text-xs font-semibold tracking-[0.04em] transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.96]",
                    active
                      ? "bg-white/[0.06] text-[var(--accent)] shadow-[var(--shadow-border)]"
                      : "text-white/45 hover:bg-white/[0.03] hover:text-white/80",
                  )}
                >
                  {section.title}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-5">
          {doc.sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 18, filter: "blur(4px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.04, 0.2),
                ease: easeOut,
              }}
              className="scroll-mt-28 rounded-[1.75rem] bg-white/[0.03] p-5 shadow-[var(--shadow-border)] backdrop-blur-xl sm:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 font-mono text-[11px] tabular-nums tracking-[0.16em] text-[var(--accent)]/75">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-balance text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-pretty text-[0.95rem] leading-7 text-white/62 sm:text-base sm:leading-8"
                      >
                        {paragraph.includes(profile.email) ? (
                          <>
                            {paragraph.split(profile.email)[0]}
                            <a
                              href={`mailto:${profile.email}`}
                              className="text-[var(--accent)] transition-colors duration-150 hover:text-white"
                            >
                              {profile.email}
                            </a>
                            {paragraph.split(profile.email)[1]}
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          <nav
            className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-black/40 p-4 shadow-[var(--shadow-border)] sm:gap-4 sm:p-5"
            aria-label="Legal"
          >
            <LegalNavLink
              href="/privacy"
              label="Privacy Policy"
              active={doc.slug === "privacy"}
            />
            <LegalNavLink
              href="/terms"
              label="Terms of Use"
              active={doc.slug === "terms"}
            />
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 transition-[color,background-color,transform] duration-150 hover:bg-white/[0.04] hover:text-[var(--accent)] active:scale-[0.96]"
            >
              Contact
              <ArrowUpRight
                className="size-3.5 scale-[0.25] opacity-0 blur-[4px] transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0"
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>
      </div>
    </main>
  );
}

function LegalNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-[color,background-color,box-shadow,transform] duration-150 active:scale-[0.96]",
        active
          ? "bg-[var(--accent)]/12 text-[var(--accent)] shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.35)]"
          : "text-white/45 hover:bg-white/[0.04] hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}
