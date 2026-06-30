import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  icon: ComponentType<LucideProps>;
};

export function SectionHeading({ kicker, title, icon: Icon }: SectionHeadingProps) {
  return (
    <div data-animate className="mb-12 max-w-5xl">
      <div className="mb-8 inline-flex items-center gap-3 border border-white/15 bg-white/[0.018] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-white/72">
        <Icon className="size-4 text-[var(--accent)]" aria-hidden="true" />
        {kicker}
      </div>
      <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
        {title}
      </h2>
    </div>
  );
}
