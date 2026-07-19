"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { navItems, profile, socialLinks } from "@/data/portfolio";
import { navigateWithLegalCurtain } from "@/lib/legal-transition";
import { ContactForm } from "./ContactForm";
import { CreativeCodeWindow } from "./CreativeCodeWindow";
import FlipWordsHero from "./flip-words-demo";

type SocialIconProps = {
  className?: string;
};

function GitHubIcon({ className }: SocialIconProps) {
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

function LinkedInIcon({ className }: SocialIconProps) {
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

function InstagramIcon({ className }: SocialIconProps) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: SocialIconProps) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function SocialIcon({ label, className = "size-7" }: { label: string; className?: string }) {
  if (label === "GitHub") return <GitHubIcon className={className} />;
  if (label === "LinkedIn") return <LinkedInIcon className={className} />;
  if (label === "Facebook") return <FacebookIcon className={className} />;
  return <InstagramIcon className={className} />;
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const footer = footerRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!footer || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-reveal]",
        { autoAlpha: 0, y: 70, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: footer,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        "[data-footer-micro]",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: {
            trigger: footer,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to("[data-footer-parallax='grid']", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to("[data-footer-parallax='lines']", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }, footer);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-black pt-28 pb-24 shadow-[inset_0_1px_0_rgba(var(--accent-rgb),0.18),0_-36px_120px_rgba(0,0,0,0.78)] sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80"
      />
      <div
        data-footer-parallax="grid"
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px)] [background-size:76px_76px]"
      />
      <div
        data-footer-parallax="lines"
        aria-hidden="true"
        className="absolute inset-0 opacity-70 [background:linear-gradient(115deg,transparent_0%,transparent_24%,rgba(var(--accent-rgb),0.07)_24.2%,transparent_24.8%,transparent_56%,rgba(255,255,255,0.055)_56.2%,transparent_56.8%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div data-footer-reveal className="mx-auto w-full">
          <FlipWordsHero />
          <div className="mt-10 w-full">
            <CreativeCodeWindow cardOnly />
          </div>
        </div>

        <div
          data-animate
          className="mt-14 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]"
        >
          <div
            data-footer-reveal
            className="relative flex h-full flex-col overflow-hidden bg-white/[0.025] p-6 shadow-[var(--shadow-border),0_30px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.065)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent sm:p-8 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.065),transparent_34%,rgba(255,255,255,0.035)_68%,transparent)] opacity-80"
            />
            <div className="relative flex h-full flex-col">
            <div data-footer-micro className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-[var(--accent)]">
              <span
                className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]"
                aria-hidden="true"
              />
              Contact
            </div>
            <h2 data-footer-micro className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Let us turn an idea into a working system.
            </h2>
            <p data-footer-micro className="mt-5 max-w-xl text-pretty text-base leading-8 text-white/58">
              Send a project note, internship opportunity, or collaboration
              idea. I usually respond with the next practical step.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-white/62">
              <motion.a
                data-footer-micro
                href={`mailto:${profile.email}`}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="inline-flex min-w-0 items-center gap-3 transition-colors duration-150 hover:text-[var(--accent)]"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{profile.email}</span>
              </motion.a>
              {profile.phones.map((phone, index) => (
                <motion.a
                  key={phone}
                  data-footer-micro
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="inline-flex items-center gap-3 transition-colors duration-150 hover:text-[var(--accent)]"
                >
                  <span className="relative inline-flex shrink-0">
                    <Phone className="size-4" aria-hidden="true" />
                    <span
                      className="absolute -right-1.5 -top-1.5 flex size-3 items-center justify-center rounded-full bg-[var(--accent)] text-[0.55rem] font-bold leading-none text-black"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                  </span>
                  <span>{phone}</span>
                </motion.a>
              ))}
              <motion.span
                data-footer-micro
                whileHover={{ x: 6, color: "rgba(255,255,255,0.86)" }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="inline-flex items-center gap-3"
              >
                <MapPin
                  className="size-4 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                />
                {profile.location}
              </motion.span>
            </div>

            <div data-footer-micro className="mt-auto flex flex-wrap items-center gap-5 pt-8">
              {socialLinks.map((link) => (
                <div key={link.label} className="group relative">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    onMouseLeave={(e) => e.currentTarget.blur()}
                    className="inline-flex text-white/70 transition-[color,filter] duration-200 ease-out hover:text-[var(--accent)] hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),0.7)] focus:text-white/70 focus:drop-shadow-none focus-visible:text-[var(--accent)] focus-visible:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),0.7)]"
                  >
                    <SocialIcon label={link.label} />
                  </a>
                  <span
                    className="pointer-events-none absolute -top-12 left-1/2 z-20 origin-bottom -translate-x-1/2 scale-0 whitespace-nowrap rounded-lg border border-white/15 bg-black px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.55),0_0_0_1px_rgba(var(--accent-rgb),0.2)] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-100"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/15 bg-black"
                    />
                  </span>
                </div>
              ))}
            </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div
          data-stagger
          data-footer-reveal
          className="relative mt-10 border-t border-white/10 pt-6 shadow-[inset_0_1px_0_rgba(var(--accent-rgb),0.12)]"
        >
          <nav
            data-stagger-item
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
            aria-label="Footer navigation"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 430, damping: 30 }}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/42 transition-colors duration-150 hover:text-[var(--accent)]"
              >
                {item.label}
                <ArrowUpRight
                  className="size-3 scale-[0.25] opacity-0 blur-[4px] transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-x-8 sm:pr-28">
            <nav
              className="flex flex-wrap items-center"
              aria-label="Legal"
            >
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Contact", href: `mailto:${profile.email}` },
              ].map((item, index) => (
                <span key={item.href} className="inline-flex items-center">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="mx-3 h-3 w-px shrink-0 bg-white/15 sm:mx-3.5"
                    />
                  ) : null}
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("mailto:")) return;
                      e.preventDefault();
                      navigateWithLegalCurtain(router.push.bind(router), item.href);
                    }}
                    className="inline-flex h-8 items-center whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors duration-150 hover:text-[var(--accent)] active:scale-[0.96]"
                  >
                    {item.label}
                  </a>
                </span>
              ))}
            </nav>

            <motion.p
              data-stagger-item
              whileHover={{ color: "rgba(93,211,182,0.9)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-white/34"
            >
              2026 Mohammad Bilal
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}