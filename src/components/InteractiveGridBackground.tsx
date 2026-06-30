"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CELL_SIZE = 40;
const CELL_COUNT = 900;

export function InteractiveGridBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const layer = layerRef.current;
    const ring = ringRef.current;
    if (!layer || !ring) {
      return;
    }

    const cells = Array.from(layer.children) as HTMLElement[];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.set(ring, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const resetCells = (indexes: Set<number>) => {
      indexes.forEach((index) => {
        const cell = cells[index];
        if (!cell) return;

        gsap.to(cell, {
          backgroundColor: "rgba(255,255,255,0)",
          boxShadow: "0 0 0 rgba(var(--accent-rgb),0)",
          scale: 1,
          zIndex: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      });
    };

    const illuminate = () => {
      rafRef.current = null;
      const columns = Math.max(1, Math.ceil(window.innerWidth / CELL_SIZE));
      const x = Math.floor(pointerRef.current.x / CELL_SIZE);
      const y = Math.floor(pointerRef.current.y / CELL_SIZE);
      const next = new Set<number>();

      for (let row = y - 2; row <= y + 2; row += 1) {
        for (let col = x - 2; col <= x + 2; col += 1) {
          const index = row * columns + col;
          if (index >= 0 && index < cells.length) next.add(index);
        }
      }

      resetCells(activeRef.current);
      next.forEach((index) => {
        const cell = cells[index];
        if (!cell) return;

        const col = index % columns;
        const row = Math.floor(index / columns);
        const distance = Math.hypot(col - x, row - y);
        const intensity = Math.max(0, 1 - distance / 3);

        gsap.to(cell, {
          backgroundColor: `rgba(var(--accent-rgb),${0.025 + intensity * 0.16})`,
          boxShadow: `0 0 ${14 + intensity * 34}px rgba(var(--accent-rgb),${0.05 + intensity * 0.2})`,
          scale: 1 + intensity * 0.32,
          zIndex: Math.round(intensity * 10),
          duration: 0.22,
          ease: "power2.out",
          overwrite: true,
        });
      });

      activeRef.current = next;
    };

    const handleMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      gsap.to(ring, {
        x: event.clientX,
        y: event.clientY,
        autoAlpha: 1,
        duration: 0.18,
        ease: "power3.out",
        overwrite: true,
      });

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(illuminate);
      }
    };

    const handleLeave = () => {
      resetCells(activeRef.current);
      activeRef.current = new Set();
      gsap.to(ring, { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={layerRef} aria-hidden="true" className="interactive-grid-bg">
        {Array.from({ length: CELL_COUNT }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
    </>
  );
}


