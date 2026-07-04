import { profile } from "@/data/portfolio";
import { TypewriterLine } from "./TypewriterLine";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh scroll-mt-0 items-start justify-center pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-28 lg:pb-32"
    >
      <div
        data-hero-copy
        className="relative z-20 mx-auto flex w-full max-w-[min(92vw,72rem)] flex-col items-center text-center"
      >
        <h1
          data-hero-animate
          data-hero-name
          className="whitespace-nowrap text-[clamp(2rem,4.55vw,4.95rem)] font-semibold leading-none text-white lg:-translate-x-22"
        >
          <span className="relative inline-block translate-x-2 mr-3 align-middle text-[0.34em] font-semibold uppercase tracking-[0.34em] text-[var(--accent)] sm:mr-4">
            Hi, I am
          </span>
          <span
            data-hero-name-word
            className="relative inline-block translate-x-6 align-middle text-[1.41em] sm:translate-x-8 lg:translate-x-[4rem]"
          >
            {profile.name}
          </span>
        </h1>

        <div
          data-hero-animate
          className="mt-4 translate-x-4 sm:translate-x-6 lg:translate-x-[4rem]"
        >
          <TypewriterLine />
        </div>
      </div>
    </section>
  );
}
