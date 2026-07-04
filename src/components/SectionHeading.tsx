import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  icon: ComponentType<LucideProps>;
};

export function SectionHeading({ kicker, title, icon: Icon }: SectionHeadingProps) {
  const heading = kicker.toUpperCase();

  return (
    <div className="mb-12 max-w-5xl">
      <h2
        data-pixel-title
        className="flex items-center gap-6 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
        aria-label={heading}
        title={title}
      >
        <span className="flex shrink-0 items-center gap-5" aria-hidden="true">
          <span
            data-pixel-item
            className="h-1 w-16 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]"
          />
          <Icon
            data-pixel-item
            className="size-12 shrink-0 text-[var(--accent)] sm:size-14 lg:size-16"
          />
        </span>
        <span className="inline-flex whitespace-nowrap" aria-hidden="true">
          {heading.split("").map((char, index) => {
            const isAccent = heading.startsWith("MY ") && index < 2;

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