"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { navItems, profile, socialLinks } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import { CreativeCodeWindow } from "./CreativeCodeWindow";
import FlipWordsHero from "./flip-words-demo";

type SocialIconProps = {
  className?: string;
};

function GitHubIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.25c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.85 9.49.5.09.68-.22.68-.48v-1.7c-2.79.61-3.38-1.2-3.38-1.2-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.23-.25-4.57-1.11-4.57-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 7.2c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.35 4.7-4.58 4.95.36.31.68.92.68 1.86v2.6c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.25c0-5.52-4.48-10-10-10Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.34 3.55a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3.48 9.5h3.71v10.95H3.48V9.5Zm5.88 0h3.55V11h.05c.5-.94 1.7-1.93 3.5-1.93 3.75 0 4.44 2.47 4.44 5.68v5.7h-3.7v-5.05c0-1.21-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.67v5.14H9.36V9.5Z" />
    </svg>
  );
}

function XIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 10.56 21.16 3h-1.58l-5.78 6.56L9.18 3H3.86l6.99 9.93L3.86 21h1.58l6.1-6.93L16.42 21h5.32l-7.24-10.44Zm-2.16 2.45-.71-.99-5.63-7.9h2.42l4.54 6.38.7.99 5.91 8.29h-2.42l-4.81-6.77Z" />
    </svg>
  );
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.35" y="3.35" width="17.3" height="17.3" rx="5.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.08" cy="6.92" r="1.15" fill="currentColor" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") return <GitHubIcon className="size-5" />;
  if (label === "LinkedIn") return <LinkedInIcon className="size-5" />;
  if (label === "X") return <XIcon className="size-5" />;
  return <InstagramIcon className="size-5" />;
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

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

    const socialItems = Array.from(footer.querySelectorAll<HTMLElement>("[data-social-link]"));
    const cleanups = socialItems.map((item) => {
      const glow = item.querySelector<HTMLElement>("[data-social-glow]");
      const glyph = item.querySelector<HTMLElement>("[data-social-glyph]");

      const enter = () => {
        if (glow) {
          gsap.to(glow, { autoAlpha: 1, scale: 1, duration: 0.34, ease: "power3.out" });
        }

        if (glyph) {
          gsap.to(glyph, {
            rotate: -8,
            scale: 1.12,
            color: "#000000",
            duration: 0.36,
            ease: "back.out(2.2)",
          });
        }
      };

      const leave = () => {
        if (glow) {
          gsap.to(glow, { autoAlpha: 0, scale: 0.62, duration: 0.28, ease: "power2.out" });
        }

        if (glyph) {
          gsap.to(glyph, {
            rotate: 0,
            scale: 1,
            color: "rgba(255,255,255,0.68)",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);

      return () => {
        item.removeEventListener("mouseenter", enter);
        item.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-black py-16 shadow-[inset_0_1px_0_rgba(var(--accent-rgb),0.18),0_-36px_120px_rgba(0,0,0,0.78)] sm:py-20"
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
            className="relative overflow-hidden border border-white/10 bg-white/[0.025] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.065)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent sm:p-8 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.065),transparent_34%,rgba(255,255,255,0.035)_68%,transparent)] opacity-80"
            />
            <div data-footer-micro className="relative mb-6 flex items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-[var(--accent)]">
              <span
                className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]"
                aria-hidden="true"
              />
              Contact
            </div>
            <h2 data-footer-micro className="relative text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Let us turn an idea into a working system.
            </h2>
            <p data-footer-micro className="relative mt-5 max-w-xl text-base leading-8 text-white/58">
              Send a project note, internship opportunity, or collaboration
              idea. I usually respond with the next practical step.
            </p>

            <div className="relative mt-8 grid gap-4 text-sm text-white/62">
              <motion.a
                data-footer-micro
                href={`mailto:${profile.email}`}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="inline-flex min-w-0 items-center gap-3 transition hover:text-[var(--accent)]"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{profile.email}</span>
              </motion.a>
              <motion.a
                data-footer-micro
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="inline-flex items-center gap-3 transition hover:text-[var(--accent)]"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {profile.phone}
              </motion.a>
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

            <div data-footer-micro className="relative mt-8 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  data-social-link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.07 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 520, damping: 25 }}
                  className="group relative grid size-12 place-items-center overflow-hidden border border-white/12 bg-black/50 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.34)]"
                  aria-label={link.label}
                >
                  <span
                    data-social-glow
                    aria-hidden="true"
                    className="absolute inset-1 scale-50 bg-[var(--accent)] opacity-0 blur-md"
                  />
                  <span
                    data-social-glyph
                    className="relative z-10 text-white/70 transition-colors group-hover:text-black"
                  >
                    <SocialIcon label={link.label} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>

        <div
          data-stagger
          data-footer-reveal
          className="relative mt-10 grid gap-6 border-t border-white/10 pt-8 shadow-[inset_0_1px_0_rgba(var(--accent-rgb),0.12)] lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <nav
            data-stagger-item
            className="flex flex-wrap gap-x-5 gap-y-3"
            aria-label="Footer navigation"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 430, damping: 30 }}
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/42 transition hover:text-[var(--accent)]"
              >
                {item.label}
                <ArrowUpRight
                  className="size-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </nav>
          <motion.p
            data-stagger-item
            whileHover={{ color: "rgba(93,211,182,0.9)", letterSpacing: "0.24em" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.2em] text-white/34"
          >
            2026 Mohammad Bilal Nadeem
          </motion.p>
        </div>
      </div>
    </footer>
  );
}