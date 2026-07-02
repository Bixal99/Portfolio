import { Code2, TerminalSquare } from "lucide-react";
import { profile, techGroups } from "@/data/portfolio";

export function CodingSection() {
  const featuredGroups = techGroups.slice(1, 4);

  return (
    <section
      id="coding"
      className="relative grid min-h-dvh scroll-mt-24 items-center py-24 sm:py-28 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(420px,0.52fr)_minmax(0,0.48fr)] lg:items-center">
        <div className="hidden min-h-[72dvh] lg:block" aria-hidden="true" />

        <div data-coding-panel className="relative z-20 max-w-2xl lg:ml-auto">
          <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-white/50">
            <span className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]" aria-hidden="true" />
            <TerminalSquare className="size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <span>What I build</span>
          </div>

          <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            Systems that think, respond, and ship.
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/62 sm:text-xl sm:leading-9">
            {profile.intro}
          </p>

          <div className="mt-9 grid gap-4">
            {featuredGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="border border-white/12 bg-white/[0.025] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="grid size-11 shrink-0 place-items-center border border-[var(--accent)]/25 bg-[var(--accent)]/10 text-[var(--accent)]">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                    </div>
                    <span className="font-mono text-xs text-white/36">0{index + 1}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.slice(0, 6).map((item) => (
                      <span key={`${group.title}-${item}`} className="border border-white/10 bg-black/25 px-2.5 py-1.5 text-xs text-white/58">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            <Code2 className="size-4" aria-hidden="true" />
            <span>{profile.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}