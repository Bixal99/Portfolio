"use client";

import { useScroll, useTransform, useReducedMotion, motion, type MotionValue } from "motion/react";
import { GraduationCap } from "lucide-react";
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

function TimelineJunction({ progress, end, top, reduced }: { progress: MotionValue<number>; end?: boolean; top: number; reduced: boolean }) {
  const reveal = useTransform(progress, end ? [0.95, 1] : [0, 0.05], [0, 1]);
  const pulseOpacity = useTransform(progress, end ? [0.95, 0.975, 1] : [0, 0.025, 0.05], [0, 0.65, 0]);
  const pulseScale = useTransform(progress, end ? [0.95, 1] : [0, 0.05], [0.6, 2.3]);

  return (
    <div aria-hidden="true" data-journey-connector={end ? "end" : "start"} data-depth="2" className="pointer-events-none absolute inset-x-0 z-40 h-10 -translate-y-1/2" style={end && top === 0 ? { bottom: 0 } : { top }}>
      <div className="absolute top-1/2 left-0 h-px w-3 bg-[var(--edge)]">
        <motion.span className="absolute inset-0 origin-right bg-[var(--accent)]" style={{ scaleX: reduced ? 1 : reveal }} />
      </div>
      <div className="absolute top-1/2 right-0 left-[52px] h-px bg-[linear-gradient(90deg,var(--edge),transparent)]">
        <motion.span className="absolute inset-0 origin-left bg-[linear-gradient(90deg,var(--accent),transparent)]" style={{ scaleX: reduced ? 1 : reveal }} />
      </div>
      <span className="absolute top-1/2 left-8 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--edge)] bg-[var(--background)] text-[var(--accent)]">
        <GraduationCap size={21} strokeWidth={1.6} />
        {!reduced && <motion.span className="absolute inset-1 rounded-full border border-[var(--accent)]" style={{ opacity: pulseOpacity, scale: pulseScale }} />}
      </span>
    </div>
  );
}

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
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      // Measure the layout box, never animated absolute children. Including the
      // meteor in scrollHeight lets its own tip extend the rail on each measure.
      const next = element.offsetHeight;
      if (next > 0) setHeight(next);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [data.length]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    if (reducedMotion) {
      const allVisible: Record<number, boolean> = {};
      cards.forEach((_, index) => {
        allVisible[index] = true;
      });
      const frame = requestAnimationFrame(() => setVisibleCards(allVisible));
      return () => cancelAnimationFrame(frame);
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
  }, [data.length, reducedMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  // Transform-only motion (scaleY + translateY) — avoids layout thrash from animating height
  const railHeight = Math.max(0, height - 40);
  const tipY = useTransform(scrollYProgress, [0, 1], [0, railHeight]);
  const tipOpacity = useTransform(scrollYProgress, [0, 0.015, 0.985, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (height <= 0) return;

    const centers = itemRefs.current.map((item, index) => {
      if (!item) return Number.POSITIVE_INFINITY;
      const node = nodeRefs.current[index];
      const paddingTop =
        Number.parseFloat(getComputedStyle(item).paddingTop) || 0;
      return item.offsetTop + paddingTop + (node ? node.offsetHeight / 2 : 20);
    });

    let previous = -1;
    const updateActive = (latest: number) => {
      let lit = -1;
      for (let i = 0; i < centers.length; i += 1) {
        if (latest >= centers[i]) lit = i;
      }
      if (lit !== previous) {
        previous = lit;
        setActiveIndex(lit);
      }
    };
    const frame = requestAnimationFrame(() => updateActive(tipY.get()));
    const unsub = tipY.on("change", updateActive);

    return () => { cancelAnimationFrame(frame); unsub(); };
  }, [height, tipY, data.length]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full bg-transparent font-sans lg:px-10", className)}
    >
      <div ref={ref} className="relative mx-auto max-w-7xl pb-24 lg:pb-28">
        <TimelineJunction progress={scrollYProgress} top={0} reduced={reducedMotion} />
        <TimelineJunction progress={scrollYProgress} end top={railHeight} reduced={reducedMotion} />
        {/* Rail centered on left-8 = center of left-3 + h-10 node */}
        <div
          aria-hidden="true"
          style={{ height: railHeight > 0 ? `${railHeight}px` : "calc(100% - 40px)" }}
          className="pointer-events-none absolute left-8 top-0 z-20 w-1 -translate-x-1/2"
        >
          <div className="absolute inset-0 w-1 rounded-full bg-[var(--edge)] shadow-[0_0_12px_rgba(255,255,255,0.12)]" />
          <motion.div
            style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
            className="timeline-meteor absolute inset-x-0 top-0 h-full w-1 origin-top rounded-full will-change-transform"
          />
          {!reducedMotion && <motion.div
            style={{ y: tipY, opacity: tipOpacity }}
            className="timeline-meteor-tip absolute left-1/2 top-0 will-change-transform"
          />}
        </div>

        {data.map((item, index) => {
          const isLit = reducedMotion || index <= activeIndex;
          const isVisible = reducedMotion || !!visibleCards[index];

          return (
            <div
              key={`${item.title}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative z-30 flex justify-start pt-16 lg:gap-10 lg:pt-24"
            >
              <div className="pointer-events-none relative z-40 flex max-w-xs flex-col items-center self-start lg:w-full lg:flex-row lg:max-w-sm">
                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className="absolute left-3 z-40 flex size-10 items-center justify-center rounded-full bg-[var(--background)]"
                >
                  <div
                    className={cn(
                      "size-3 rounded-full border-2 transition-[transform,border-color,background-color,box-shadow] duration-500",
                      isLit
                        ? "scale-125 border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_16px_rgba(var(--accent-rgb),1),0_0_32px_rgba(var(--accent-rgb),0.65),0_0_48px_rgba(var(--accent-rgb),0.35)]"
                        : "scale-100 border-[var(--edge)] bg-[var(--edge)] shadow-none",
                    )}
                  />
                </div>
                <h3
                  className="hidden font-medium leading-[1.15] tracking-[-0.025em] tabular-nums text-[var(--foreground)] lg:block lg:pl-16 lg:text-[clamp(1.7rem,2.8vw,2.7rem)]"
                >
                  {item.title}
                </h3>
              </div>

              <div className="relative w-full min-w-0 pl-14 pr-2 sm:pl-20 sm:pr-4 lg:pl-4">
                <h3
                  className="mb-5 block text-left text-xl font-medium tracking-[-0.02em] tabular-nums text-[var(--foreground)] sm:text-2xl lg:hidden"
                >
                  {item.title}
                </h3>
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-timeline-card={index}
                  className={cn(
                    "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none",
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
