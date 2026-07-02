import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  const nameWords = profile.name.split(" ");

  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-0 items-center py-28 sm:py-32 lg:py-36"
    >
      <div className="grid w-full -translate-y items-center gap-12 sm:-translate-y-2 lg:-translate-y-4 lg:grid-cols-[minmax(18rem,0.36fr)_minmax(0,0.64fr)] xl:gap-14">
        <div data-hero-copy className="relative z-20 max-w-[34rem] lg:max-w-[31rem] xl:max-w-[34rem]">
          <p
            data-hero-animate
            className="mb-4 text-sm font-semibold uppercase tracking-[0.42em] text-[var(--accent)]"
          >
            Hi, I am
          </p>

          <h1
            data-hero-animate
            data-hero-name
            className="max-w-[8.4ch] text-[clamp(3.55rem,5.65vw,5.9rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-white"
          >
            {nameWords.map((word) => (
              <span key={word} data-hero-name-word className="block origin-left">
                {word}
              </span>
            ))}
          </h1>

          <div data-hero-animate>
            <TypewriterLine />
          </div>

          <a
            data-hero-animate
            href="#about"
            className="mt-12 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:text-[var(--accent)]"
          >
            Scroll to explore
            <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
          </a>
        </div>

        <div className="hidden min-h-[64dvh] lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}