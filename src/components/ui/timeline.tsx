"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

type TimelineProps = {
  data: TimelineEntry[];
  className?: string;
};

export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>(
    {},
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      const next = Math.max(element.scrollHeight, element.offsetHeight);
      if (next > 0) setHeight(next);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    const onLoad = () => updateHeight();
    window.addEventListener("load", onLoad);
    const timers = [80, 300, 800, 1600].map((ms) =>
      window.setTimeout(updateHeight, ms),
    );

    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
      timers.forEach(clearTimeout);
    };
  }, [data.length]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const allVisible: Record<number, boolean> = {};
      cards.forEach((_, index) => {
        allVisible[index] = true;
      });
      setVisibleCards(allVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(
            (entry.target as HTMLElement).dataset.timelineCard,
          );
          if (Number.isNaN(index)) return;
          setVisibleCards((prev) => {
            const nextVisible = entry.isIntersecting;
            if (prev[index] === nextVisible) return prev;
            return { ...prev, [index]: nextVisible };
          });
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  // Transform-only motion (scaleY + translateY) — avoids layout thrash from animating height
  const tipY = useTransform(scrollYProgress, [0, 1], [0, height]);

  useEffect(() => {
    if (height <= 0) return;

    const centers = itemRefs.current.map((item, index) => {
      if (!item) return Number.POSITIVE_INFINITY;
      const node = nodeRefs.current[index];
      const paddingTop =
        Number.parseFloat(getComputedStyle(item).paddingTop) || 0;
      return item.offsetTop + paddingTop + (node ? node.offsetHeight / 2 : 20);
    });

    const unsub = tipY.on("change", (latest) => {
      let lit = -1;
      for (let i = 0; i < centers.length; i += 1) {
        if (latest >= centers[i]) lit = i;
      }
      setActiveIndex((prev) => (prev === lit ? prev : lit));
    });

    return unsub;
  }, [height, tipY, data.length]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full bg-transparent font-sans md:px-10", className)}
    >
      <div ref={ref} className="relative mx-auto max-w-7xl overflow-hidden pb-8 md:pb-12">
        {/* Rail centered on left-8 = center of left-3 + h-10 node */}
        <div
          aria-hidden="true"
          style={{ height: height > 0 ? `${height}px` : "100%" }}
          className="pointer-events-none absolute left-8 top-0 z-20 w-1 -translate-x-1/2"
        >
          <div className="absolute inset-0 w-1 rounded-full bg-white/45 shadow-[0_0_12px_rgba(255,255,255,0.12)]" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="timeline-meteor absolute inset-x-0 top-0 h-full w-1 origin-top rounded-full will-change-transform"
          />
          <motion.div
            style={{ y: tipY }}
            className="timeline-meteor-tip absolute left-1/2 top-0 will-change-transform"
          />
        </div>

        {data.map((item, index) => {
          const isLit = index <= activeIndex;
          const isVisible = !!visibleCards[index];

          return (
            <div
              key={`${item.title}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative z-30 flex justify-start pt-10 md:gap-10 md:pt-28"
            >
              <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className="absolute left-3 z-40 flex size-10 items-center justify-center rounded-full bg-black"
                >
                  <div
                    className={cn(
                      "size-3 rounded-full border-2 transition-[transform,border-color,background-color,box-shadow] duration-500",
                      isLit
                        ? "scale-125 border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_16px_rgba(var(--accent-rgb),1),0_0_32px_rgba(var(--accent-rgb),0.65),0_0_48px_rgba(var(--accent-rgb),0.35)]"
                        : "scale-100 border-white/45 bg-white/25 shadow-none",
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    "hidden text-xl font-bold tabular-nums transition-[opacity,transform,color,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:block md:pl-20 md:text-5xl",
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0",
                    isLit && isVisible
                      ? "text-white drop-shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]"
                      : "text-white",
                  )}
                >
                  {item.title}
                </h3>
              </div>

              <div className="relative w-full min-w-0 pl-20 pr-4 md:pl-4">
                <h3
                  className={cn(
                    "mb-4 block text-left text-2xl font-bold tabular-nums transition-[opacity,transform,color,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0",
                    isLit && isVisible
                      ? "text-white drop-shadow-[0_0_18px_rgba(var(--accent-rgb),0.55)]"
                      : "text-white",
                  )}
                >
                  {item.title}
                </h3>
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-timeline-card={index}
                  className={cn(
                    "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0",
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
