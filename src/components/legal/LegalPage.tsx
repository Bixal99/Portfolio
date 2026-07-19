"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShieldCheck, ScrollText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { LegalScrollProgress } from "@/components/LegalScrollProgress";
import { profile } from "@/data/portfolio";
import type { LegalDocument } from "@/data/legal";
import {
  CURTAIN_HOLD_MS,
  navigateWithLegalCurtain,
  peekHorizontalCurtain,
  revealCurtain,
} from "@/lib/legal-transition";
import { cn } from "@/lib/utils";

type LegalPageProps = {
  doc: LegalDocument;
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const SIDEBAR_W = "18rem";
const SIDEBAR_GAP = "2.5rem";

export function LegalPage({ doc }: LegalPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "");
  const Icon = doc.slug === "privacy" ? ShieldCheck : ScrollText;

  useEffect(() => {
    if (!peekHorizontalCurtain()) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      revealCurtain();
      return;
    }

    const t = window.setTimeout(() => revealCurtain(), CURTAIN_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const navigateWithCurtain = useCallback(
    (href: string) => {
      navigateWithLegalCurtain(router.push.bind(router), href, pathname);
    },
    [pathname, router],
  );

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
        rootMargin: "-25% 0px -50% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [doc.sections]);

  const reveal = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <main className="relative isolate min-h-dvh overflow-x-hidden bg-black text-white">
      <LegalScrollProgress />

      {/* Fixed sidebar — always visible on desktop */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-black lg:flex"
        style={{ width: SIDEBAR_W }}
        aria-label="Page sections"
      >
        <div className="flex h-full flex-col px-7 pb-8 pt-10">
          <LegalBackButton
            onNavigate={() => navigateWithCurtain("/")}
            className="mb-8"
          />

          <nav className="flex flex-1 flex-col gap-1" aria-label="Sections">
            {doc.sections.map((section, index) => {
              const active = activeId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveId(section.id)}
                  className={cn(
                    "group relative grid grid-cols-[minmax(0,1fr)_2rem] items-baseline gap-x-3 py-3 text-left transition-colors duration-200",
                    active
                      ? "text-[var(--accent)]"
                      : "text-white/40 hover:text-white/75",
                  )}
                >
                  <span className="min-w-0 text-[clamp(0.95rem,1.35vw,1.15rem)] font-semibold uppercase leading-[1.2] tracking-[-0.03em]">
                    {section.title}
                  </span>
                  <span
                    className={cn(
                      "text-right font-mono text-[11px] tabular-nums tracking-[0.12em]",
                      active ? "text-[var(--accent)]" : "text-[var(--accent)]/55",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <LegalNavLink
                href="/privacy"
                label="Privacy"
                active={doc.slug === "privacy"}
                onNavigate={navigateWithCurtain}
              />
              <LegalNavLink
                href="/terms"
                label="Terms"
                active={doc.slug === "terms"}
                onNavigate={navigateWithCurtain}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile section strip */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3 px-5 py-3">
          <LegalBackButton
            onNavigate={() => navigateWithCurtain("/")}
            compact
          />
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
            {doc.sections.map((section) => {
              const active = activeId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "inline-flex shrink-0 items-center rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150",
                    active
                      ? "bg-white/[0.06] text-[var(--accent)]"
                      : "text-white/45 hover:text-white/80",
                  )}
                >
                  {section.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content — offset for fixed sidebar + gap */}
      <div
        className="relative min-h-dvh"
        style={
          {
            ["--legal-sidebar"]: SIDEBAR_W,
            ["--legal-gap"]: SIDEBAR_GAP,
          } as CSSProperties
        }
      >
        <div className="lg:pl-[calc(var(--legal-sidebar)+var(--legal-gap))]">
          <header className="relative overflow-hidden border-b border-white/8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--accent-rgb),0.12),transparent_55%)]"
            />
            <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10">
              <motion.div
                {...reveal}
                transition={{ duration: 0.45, delay: 0.06, ease: easeOut }}
                className="flex items-center gap-3 sm:gap-4"
              >
                <Icon
                  className="size-8 shrink-0 text-[var(--accent)] sm:size-9"
                  aria-hidden="true"
                />
                <h1 className="text-balance text-[clamp(2.2rem,5.5vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
                  {doc.title}
                </h1>
              </motion.div>

              <motion.p
                {...reveal}
                transition={{ duration: 0.4, delay: 0.12, ease: easeOut }}
                className="mt-5 max-w-xl text-pretty text-[1.05rem] leading-8 text-white/58"
              >
                {doc.summary}
              </motion.p>

              <motion.p
                {...reveal}
                transition={{ duration: 0.35, delay: 0.18, ease: easeOut }}
                className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35"
              >
                <span className="tabular-nums text-[var(--accent)]/85">
                  Updated {doc.updated}
                </span>
                <span className="mx-2 text-white/20" aria-hidden="true">
                  ·
                </span>
                {doc.kicker}
              </motion.p>
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pt-14">
            <div className="space-y-0">
              {doc.sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.03, 0.15),
                    ease: easeOut,
                  }}
                  className="scroll-mt-28 border-t border-white/10 py-10 first:border-t-0 first:pt-0 sm:py-12"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs tabular-nums tracking-[0.18em] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-balance text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.03em] text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="mt-5 space-y-4 sm:pl-[calc(0.75rem+1.75rem)]">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-pretty text-[0.98rem] leading-8 text-white/58 sm:text-[1.02rem] sm:leading-[1.85]"
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
                </motion.section>
              ))}
            </div>

            <nav
              className="mt-14 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8"
              aria-label="Legal"
            >
              <LegalNavLink
                href="/privacy"
                label="Privacy Policy"
                active={doc.slug === "privacy"}
                onNavigate={navigateWithCurtain}
              />
              <LegalNavLink
                href="/terms"
                label="Terms of Use"
                active={doc.slug === "terms"}
                onNavigate={navigateWithCurtain}
              />
              <button
                type="button"
                onClick={() => navigateWithCurtain("/#contact")}
                className="group inline-flex min-h-10 items-center gap-2 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/40 transition-colors duration-150 hover:text-[var(--accent)] active:scale-[0.96]"
              >
                Contact
                <ArrowUpRight
                  className="size-3.5 translate-y-0 opacity-50 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}

function LegalBackButton({
  onNavigate,
  compact = false,
  className,
}: {
  onNavigate: () => void;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onNavigate();
      }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/12 bg-white/[0.03] text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[color,border-color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:border-[rgba(var(--accent-rgb),0.45)] hover:bg-[rgba(var(--accent-rgb),0.08)] hover:text-[var(--accent)] hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.2),0_0_28px_rgba(var(--accent-rgb),0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[0.96]",
        compact ? "min-h-9 px-3 py-1.5" : "min-h-10 px-4 py-2",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_20%,rgba(var(--accent-rgb),0.18)_48%,transparent_72%)] opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-full group-hover:opacity-100"
      />
      <span className="relative grid size-5 place-items-center overflow-hidden">
        <ArrowLeft
          className="size-3.5 transition-[transform,opacity,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-x-0.5 group-hover:opacity-100"
          aria-hidden="true"
        />
      </span>
      <span className="relative">{compact ? "Home" : "Back home"}</span>
    </Link>
  );
}

function LegalNavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: (href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (active) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        onNavigate(href);
      }}
      className={cn(
        "inline-flex min-h-10 items-center text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-150",
        active
          ? "text-[var(--accent)]"
          : "text-white/40 hover:text-white/80",
      )}
    >
      {label}
    </Link>
  );
}
