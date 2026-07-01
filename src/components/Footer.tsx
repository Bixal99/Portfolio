import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import FlipWordsHero from "./flip-words-demo";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-black py-16 sm:py-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div data-animate className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-[var(--accent)]">
              <span className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]" aria-hidden="true" />
              Contact
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Let us turn an idea into a working system.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/58">
              Send a project note, internship opportunity, or collaboration idea. I usually respond with the next practical step.
            </p>

            <div className="mt-8 grid gap-4 text-sm text-white/62">
              <a href={`mailto:${profile.email}`} className="inline-flex min-w-0 items-center gap-3 transition hover:text-[var(--accent)]">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-3 transition hover:text-[var(--accent)]">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {profile.phone}
              </a>
              <span className="inline-flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                {profile.location}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="grid size-11 place-items-center border border-white/12 text-xs font-bold text-white/60 transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black" aria-label={link.label}>
                  {link.mark}
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>

        <FlipWordsHero />

        <div data-stagger className="mt-10 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <nav data-stagger-item className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/42 transition hover:text-[var(--accent)]">
                {item.label}
                <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <p data-stagger-item className="text-xs uppercase tracking-[0.2em] text-white/34">
            2026 Mohammad Bilal Nadeem
          </p>
        </div>
      </div>
    </footer>
  );
}