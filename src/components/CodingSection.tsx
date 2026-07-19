"use client";

import {
  BrainCircuit,
  Eye,
  GitBranch,
  Layers,
  Network,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const codingTitle = "WHAT I BUILD";

const buildCards: ReadonlyArray<{
  index: string;
  tag: string;
  lead: string;
  rest: string;
  Icon: LucideIcon;
}> = [
  {
    index: "01",
    tag: "Intelligence",
    lead: "AI-powered workflows",
    rest: "that turn messy inputs into useful, practical decisions, from prompt pipelines to evaluation loops that stay reliable in production.",
    Icon: BrainCircuit,
  },
  {
    index: "02",
    tag: "Product",
    lead: "Full-stack products",
    rest: "with clean interfaces, dependable APIs, auth, and real deployment flow so ideas ship as working systems, not demos.",
    Icon: Layers,
  },
  {
    index: "03",
    tag: "Vision",
    lead: "Computer-vision and automation tools",
    rest: "shaped around real academic, startup, and personal project needs: detection, tracking, and scripts that remove repetitive work.",
    Icon: Eye,
  },
  {
    index: "04",
    tag: "Community",
    lead: "Open-source contributions",
    rest: "that help the community and improve the ecosystem through clear PRs, docs, and tools others can actually reuse.",
    Icon: GitBranch,
  },
  {
    index: "05",
    tag: "Systems",
    lead: "Systems that learn and scale",
    rest: "connecting models, data, and UX into products that stay fast, measurable, and ready for the next iteration.",
    Icon: Network,
  },
];

export function CodingSection() {
  return (
    <section
      id="coding"
      className="relative scroll-mt-24 pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28"
    >
      <div data-coding-panel className="relative z-20 min-w-0 max-w-full">
        <h2
          data-pixel-title
          className="flex min-w-0 max-w-full items-center gap-3 text-balance text-[clamp(1.55rem,7.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:gap-5 sm:text-6xl lg:gap-6 lg:text-7xl"
        >
          <span className="flex shrink-0 items-center gap-2.5 sm:gap-5" aria-hidden="true">
            <span
              data-pixel-item
              className="h-1 w-8 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)] sm:w-16"
            />
            <TerminalSquare
              data-pixel-item
              className="size-8 shrink-0 text-[var(--accent)] sm:size-14 lg:size-16"
            />
          </span>
          <span
            className="inline-flex min-w-0 sm:whitespace-nowrap"
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

        <div className="mt-6 mx-auto w-full min-w-0 max-w-6xl sm:mt-8 lg:max-w-7xl">
          <ScrollStack
            useWindowScroll
            itemDistance={36}
            itemStackDistance={40}
            stackPosition="18%"
            scaleEndPosition="8%"
            baseScale={0.82}
            itemScale={0.035}
            rotationAmount={0}
            blurAmount={2}
          >
            {buildCards.map((card) => {
              const { Icon } = card;

              return (
                <ScrollStackItem key={card.index}>
                  <span className="scroll-stack-card-watermark" aria-hidden="true">
                    {card.index}
                  </span>

                  <div className="scroll-stack-card-layout">
                    <div className="scroll-stack-card-copy">
                      <div className="scroll-stack-card-meta">
                        <span className="scroll-stack-card-index">
                          {card.index}
                        </span>
                        <span className="scroll-stack-card-tag">{card.tag}</span>
                      </div>
                      <h2>{card.lead}</h2>
                      <p>{card.rest}</p>
                    </div>

                    <div className="scroll-stack-card-icon" aria-hidden="true">
                      <span className="scroll-stack-card-icon-glow" />
                      <span className="scroll-stack-card-icon-ring">
                        <Icon strokeWidth={1.5} className="scroll-stack-card-icon-svg" />
                      </span>
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
