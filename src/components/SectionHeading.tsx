import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  icon: ComponentType<LucideProps>;
  className?: string;
  compact?: boolean;
};

export function SectionHeading({ kicker, title, icon: Icon, className = "", compact = false }: SectionHeadingProps) {
  const heading = kicker.toUpperCase();
  const accentStart = heading.lastIndexOf(" ") + 1;

  return (
    <div className={`relative z-10 mb-8 max-w-5xl sm:mb-12 ${className}`}>
      <h2
        data-pixel-title
        className={`flex min-w-0 max-w-full items-center text-balance font-semibold leading-[0.95] text-[var(--foreground)] ${compact ? "gap-2 text-[clamp(1.2rem,4.4vw,3.25rem)] tracking-[-0.035em] sm:gap-4" : "gap-3 text-[clamp(1.55rem,7.5vw,4.5rem)] tracking-[-0.05em] sm:gap-5 sm:text-6xl lg:gap-6 lg:text-7xl"}`}
        aria-label={heading}
        title={title}
      >
        <span className={`flex shrink-0 items-center ${compact ? "gap-2 sm:gap-4" : "gap-2.5 sm:gap-5"}`} aria-hidden="true">
          <span
            data-pixel-item
            className={`h-1 shrink-0 rounded-full bg-[var(--accent)] ${compact ? "w-5 sm:w-10" : "w-8 shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)] sm:w-16"}`}
          />
          <Icon
            data-pixel-item
            className={`shrink-0 text-[var(--accent)] ${compact ? "size-6 sm:size-10" : "size-8 sm:size-14 lg:size-16"}`}
          />
        </span>
        <span className="inline-flex min-w-0 max-w-full sm:whitespace-nowrap" aria-hidden="true">
          {heading.split("").map((char, index) => {
            const isAccent = index >= accentStart;

            return (
              <span
                key={`${char}-${index}`}
                data-pixel-item
                className={`inline-block will-change-transform ${
                  isAccent ? "text-[var(--accent)]" : ""
                }`}
              >
                {char === " " ? "\u00a0" : char}
              </span>
            );
          })}
        </span>
      </h2>
    </div>
  );
}
