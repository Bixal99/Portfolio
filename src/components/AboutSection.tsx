import { BrainCircuit, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative grid min-h-dvh scroll-mt-24 items-center py-24 sm:py-28 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.46fr)_minmax(420px,0.54fr)] lg:items-center">
        <div data-about-panel className="relative z-20 max-w-2xl">
          <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase leading-6 tracking-[0.28em] text-white/50">
            <span className="h-px w-10 shrink-0 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]" aria-hidden="true" />
            <BrainCircuit className="size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <span>About me</span>
          </div>

          <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            I build calm, capable AI software.
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/62 sm:text-xl sm:leading-9">
            {profile.summary}
          </p>

          <div className="mt-9 grid gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/52 sm:grid-cols-2">
            <a href={`mailto:${profile.email}`} className="group inline-flex min-h-14 items-center gap-3 border border-white/12 bg-white/[0.025] px-4 transition hover:border-[var(--accent)] hover:text-white">
              <Mail className="size-4 text-[var(--accent)]" aria-hidden="true" />
              <span className="truncate normal-case tracking-normal">{profile.email}</span>
            </a>
            <div className="inline-flex min-h-14 items-center gap-3 border border-white/12 bg-white/[0.025] px-4">
              <MapPin className="size-4 text-[var(--accent)]" aria-hidden="true" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="hidden min-h-[70dvh] lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}