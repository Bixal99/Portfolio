import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  icon: ComponentType<LucideProps>;
};

export function SectionHeading({ kicker, title, icon: Icon }: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div data-animate className="mb-12 max-w-5xl">
      <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-white/50">
        <span className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]" aria-hidden="true" />
        <Icon className="size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
        <span>{kicker}</span>
      </div>
      <h2 data-heading-text className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <span data-heading-word className="inline-block">
              {word}{index < words.length - 1 ? "\u00a0" : ""}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
