import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LightSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const LightSection = ({ id, children, className }: LightSectionProps) => (
  <section
    id={id}
    data-section-theme="light"
    className={cn(
      "relative isolate scroll-mt-28 text-[var(--foreground)] [color-scheme:light]",
      "[--background:#dbe2f0] [--foreground:#14213d] [--foreground-rgb:20,33,61] [--surface:#e6ecf6] [--surface-soft:#d4deee] [--muted:#40526c] [--edge:#b4c1d5] [--accent:#1f50c6] [--accent-rgb:31,80,198] [--accent-hover:#183fa4] [--accent-soft:#cfdcf4] [--on-accent:#ffffff]",
    )}
  >
    <div aria-hidden="true" data-theme-transition="in" className="pointer-events-none relative h-20 sm:h-28 lg:h-36">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#080b12_0%,#111827_22%,#34435b_47%,#92a2bc_74%,#dbe2f0_100%)]" />
    </div>
    <div data-light-surface className={cn(
      "relative isolate before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-[var(--background)] before:content-['']",
      className,
    )}>
      {children}
    </div>
    <div aria-hidden="true" data-theme-transition="out" className="pointer-events-none relative h-20 sm:h-28 lg:h-36">
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#dbe2f0_0%,#92a2bc_26%,#34435b_53%,#111827_78%,#080b12_100%)]" />
    </div>
  </section>
);
