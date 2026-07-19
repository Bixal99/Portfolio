"use client";

import {
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollStack.css";

gsap.registerPlugin(ScrollTrigger);

export type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
};

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 28,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);

  useLayoutEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    // Kept for React Bits API parity
    void scaleDuration;
    void useWindowScroll;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    );
    const endElement = root.querySelector<HTMLElement>(".scroll-stack-end");

    if (!cards.length || !endElement) return;

    cards.forEach((card, i) => {
      card.style.marginBottom =
        i < cards.length - 1 ? `${itemDistance}px` : "0";
    });

    if (prefersReducedMotion) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const targetScale = baseScale + i * itemScale;
        const stackOffset = itemStackDistance * i;

        gsap.set(card, {
          transformOrigin: "top center",
          force3D: true,
          zIndex: i + 1,
        });

        // Pin so each card sticks and later cards pile on top
        ScrollTrigger.create({
          trigger: card,
          start: `top-=${stackOffset} ${stackPosition}`,
          endTrigger: endElement,
          end: `top ${stackPosition}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (i === cards.length - 1 && !stackCompletedRef.current) {
              stackCompletedRef.current = true;
              onStackComplete?.();
            }
          },
          onLeaveBack: () => {
            if (i === cards.length - 1) {
              stackCompletedRef.current = false;
            }
          },
        });

        // Scale (and optional rotate) as the card settles into the stack
        gsap.fromTo(
          card,
          { scale: 1, rotation: 0 },
          {
            scale: targetScale,
            rotation: rotationAmount ? i * rotationAmount : 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: `top-=${stackOffset} ${stackPosition}`,
              end: `top-=${stackOffset} ${scaleEndPosition}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        // Soften cards once a later card stacks over them
        if (blurAmount > 0 && i < cards.length - 1) {
          const nextCard = cards[i + 1];
          if (nextCard) {
            gsap.fromTo(
              card,
              { filter: "blur(0px)" },
              {
                filter: `blur(${blurAmount}px)`,
                ease: "none",
                scrollTrigger: {
                  trigger: nextCard,
                  start: `top-=${itemStackDistance * (i + 1)} ${stackPosition}`,
                  end: `top-=${itemStackDistance * (i + 1)} ${scaleEndPosition}`,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        }

        const onEnter = () => card.classList.add("is-hovered");
        const onLeave = () => card.classList.remove("is-hovered");
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      ScrollTrigger.refresh();
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cleanups.forEach((fn) => fn());
      stackCompletedRef.current = false;
      ctx.revert();
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    children,
  ]);

  const scrollerClass = ["scroll-stack-scroller", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={scrollerClass} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
