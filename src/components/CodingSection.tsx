import { TerminalSquare } from "lucide-react";

const codingTitle = "WHAT I BUILD";
const buildBullets = [
  "AI-powered workflows that turn messy inputs into useful, practical decisions.",
  "Full-stack products with clean interfaces, dependable APIs, and real deployment flow.",
  "Computer-vision and automation tools shaped around real academic, startup, and personal project needs.",
  "Open-source contributions that help the community and improve the ecosystem.",
];

export function CodingSection() {
  return (
    <section
      id="coding"
      className="relative grid scroll-mt-24 items-center py-14 sm:py-16 lg:py-20"
    >
      <div className="grid gap-12 lg:items-center">
        <div data-coding-panel className="relative z-20 max-w-3xl">
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
              <TerminalSquare
                data-pixel-item
                className="size-12 shrink-0 text-[var(--accent)] sm:size-14 lg:size-16"
              />
            </span>
            <span
              className="inline-flex whitespace-nowrap"
              aria-label="What I build"
            >
              {codingTitle.split("").map((char, index) => {
                const isAccent = index >= codingTitle.indexOf("BUILD");

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

          <ul
            data-build-list
            className="mt-8 max-w-xl list-none space-y-4 pl-0 text-pretty text-lg leading-8 text-white/62 sm:text-xl sm:leading-9"
          >
            {buildBullets.map((item) => (
              <li key={item} data-build-bullet className="flex items-start gap-3">
                <span className="mt-[0.72em] size-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.65)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}