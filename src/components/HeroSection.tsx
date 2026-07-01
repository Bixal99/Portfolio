import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ProfileVisual } from "./ProfileVisual";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-0 items-center py-28 sm:py-32 lg:py-36"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.72fr)] xl:gap-14">
        <div className="relative z-10 max-w-3xl">
          <div
            data-hero-animate
            className="mb-8 flex max-w-2xl items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-white/50"
          >
            <span className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_22px_rgba(var(--accent-rgb),0.6)]" aria-hidden="true" />
            Backend systems, AI workflows, RAG products
          </div>

          <p
            data-hero-animate
            className="mb-4 text-sm font-semibold uppercase tracking-[0.42em] text-[var(--accent)]"
          >
            Hi, I am
          </p>

          <h1
            data-hero-animate
            className="max-w-[680px] text-balance text-[clamp(3.6rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white"
          >
            {profile.name}
          </h1>

          <div data-hero-animate>
            <TypewriterLine />
          </div>

          <a
            data-hero-animate
            href="#journey"
            className="mt-12 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:text-[var(--accent)]"
          >
            Scroll to explore
            <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
          </a>
        </div>

        <ProfileVisual />
      </div>
    </section>
  );
}