import { BrainCircuit } from "lucide-react";

const aboutTitle = "ABOUT ME";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative grid scroll-mt-24 items-center pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20"
    >
      <div className="grid gap-12 lg:items-center">
        <div data-about-panel className="relative z-20 max-w-3xl">
          <h2
            data-pixel-title
            className="flex items-center gap-6 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
          >
            <span
              className="flex shrink-0 items-center gap-5"
              aria-hidden="true"
            >
              <span
                data-pixel-item
                className="h-1 w-16 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]"
              />
              <BrainCircuit
                data-pixel-item
                className="size-12 shrink-0 text-[var(--accent)] sm:size-14 lg:size-16"
              />
            </span>
            <span
              className="inline-flex whitespace-nowrap"
              aria-label="About me"
            >
              {aboutTitle.split("").map((char, index) => {
                const isAccent = index >= aboutTitle.indexOf("ME");

                return (
                  <span
                    key={`${char}-${index}`}
                    data-pixel-item
                    className={`inline-block will-change-transform ${
                      isAccent ? "text-[var(--accent)]" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {char === " " ? "\u00a0" : char}
                  </span>
                );
              })}
            </span>
          </h2>

          <ul className="mt-7 max-w-xl list-none space-y-4 pl-0 text-lg leading-8 text-white/62 sm:text-xl sm:leading-9">
            <li data-about-bullet className="flex items-start gap-3">
              <span className="mt-[0.72em] size-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.65)]" aria-hidden="true" />
              <span>
                Graduated Computer Science student with hands-on experience in AI,
                computer vision, and full-stack development.
              </span>
            </li>
            <li data-about-bullet className="flex items-start gap-3">
              <span className="mt-[0.72em] size-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.65)]" aria-hidden="true" />
              <span>
                Built academic and personal projects across AI, computer vision,
                and full-stack software.
              </span>
            </li>
            <li data-about-bullet className="flex items-start gap-3">
              <span className="mt-[0.72em] size-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.65)]" aria-hidden="true" />
              <span>Currently working as an AI Engineer in a startup environment.</span>
            </li>
            <li data-about-bullet className="flex items-start gap-3">
              <span className="mt-[0.72em] size-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.65)]" aria-hidden="true" />
              <span>
                Building AI solutions while adapting to market trends, evolving
                technologies, and product development from concept to execution.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}