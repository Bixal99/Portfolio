"use client";

import { TerminalSquare } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const codingTitle = "WHAT I BUILD";

const buildCards = [
  {
    index: "01",
    lead: "AI-powered workflows",
    rest: "that turn messy inputs into useful, practical decisions, from prompt pipelines to evaluation loops that stay reliable in production.",
  },
  {
    index: "02",
    lead: "Full-stack products",
    rest: "with clean interfaces, dependable APIs, auth, and real deployment flow so ideas ship as working systems, not demos.",
  },
  {
    index: "03",
    lead: "Computer-vision and automation tools",
    rest: "shaped around real academic, startup, and personal project needs: detection, tracking, and scripts that remove repetitive work.",
  },
  {
    index: "04",
    lead: "Open-source contributions",
    rest: "that help the community and improve the ecosystem through clear PRs, docs, and tools others can actually reuse.",
  },
  {
    index: "05",
    lead: "Systems that learn and scale",
    rest: "connecting models, data, and UX into products that stay fast, measurable, and ready for the next iteration.",
  },
] as const;

export function CodingSection() {
  return (
    <section
      id="coding"
      className="relative scroll-mt-24 pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28"
    >
      <div data-coding-panel className="relative z-20">
        <h2
          data-pixel-title
          className="flex items-center gap-6 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
        >
          <span className="flex shrink-0 items-center gap-5" aria-hidden="true">
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
                  className={`inline-block will-change-transform ${isAccent ? "text-[var(--accent)]" : ""
                    }`}
                  aria-hidden="true"
                >
                  {char === " " ? "\u00a0" : char}
                </span>
              );
            })}
          </span>
        </h2>

        <div className="mt-8 mx-auto w-full max-w-6xl lg:max-w-7xl">
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
            {buildCards.map((card) => (
              <ScrollStackItem key={card.index}>
                <span className="scroll-stack-card-index" aria-hidden="true">
                  {card.index}
                </span>
                <h2>{card.lead}</h2>
                <p>{card.rest}</p>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
