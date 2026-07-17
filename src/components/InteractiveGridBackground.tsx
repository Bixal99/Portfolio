"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

const CELL_SIZE = 42;
/** Strict 3×3 (9 cells) around the pointer cell */
const NEIGHBOR_RANGE = 1;
const POINTER_LERP = 0.22;
const INTENSITY_LERP = 0.28;

type GridSize = {
  columns: number;
  rows: number;
};

type CellState = {
  alpha: number;
  shadow: number;
  scale: number;
  glow: number;
};

export function InteractiveGridBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState<GridSize>({ columns: 0, rows: 0 });

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const updateGrid = () => {
      const width = layer.clientWidth || window.innerWidth;
      const height = layer.clientHeight || window.innerHeight;
      setGridSize({
        columns: Math.ceil(width / CELL_SIZE) + 1,
        rows: Math.ceil(height / CELL_SIZE) + 1,
      });
    };

    updateGrid();
    const observer = new ResizeObserver(updateGrid);
    observer.observe(layer);
    window.addEventListener("resize", updateGrid);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  const cellCount = useMemo(
    () => gridSize.columns * gridSize.rows,
    [gridSize.columns, gridSize.rows],
  );

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || gridSize.columns === 0 || cellCount === 0) return;

    const cells = Array.from(layer.children) as HTMLElement[];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      cells.forEach((cell) => {
        cell.style.setProperty("--grid-alpha", "0");
        cell.style.setProperty("--grid-shadow-alpha", "0");
        cell.style.setProperty("--grid-scale", "1");
        cell.style.setProperty("--grid-glow", "0px");
      });
      return;
    }

    const prevFps = gsap.ticker.fps();
    gsap.ticker.fps(120);
    gsap.ticker.lagSmoothing(0);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: target.x, y: target.y };
    const states = new Map<number, CellState>();
    let pointerInside = false;

    const writeCell = (index: number, state: CellState) => {
      const cell = cells[index];
      if (!cell) return;
      cell.style.setProperty("--grid-alpha", state.alpha.toFixed(3));
      cell.style.setProperty("--grid-shadow-alpha", state.shadow.toFixed(3));
      cell.style.setProperty("--grid-scale", state.scale.toFixed(3));
      cell.style.setProperty("--grid-glow", `${state.glow.toFixed(1)}px`);
    };

    const targetForOffset = (dc: number, dr: number) => {
      // Center cell: bright + sharp. Neighbors: much quieter.
      if (dc === 0 && dr === 0) {
        return { alpha: 0.48, shadow: 0.4, scale: 1.14, glow: 32 };
      }
      const isCorner = Math.abs(dc) === 1 && Math.abs(dr) === 1;
      if (isCorner) {
        return { alpha: 0.03, shadow: 0.02, scale: 1.015, glow: 3 };
      }
      return { alpha: 0.07, shadow: 0.05, scale: 1.035, glow: 6 };
    };

    const tick = () => {
      if (document.hidden) return;

      const dt = gsap.ticker.deltaRatio(60);
      const pointerK = 1 - Math.pow(1 - POINTER_LERP, dt);
      const intensityK = 1 - Math.pow(1 - INTENSITY_LERP, dt);

      smooth.x += (target.x - smooth.x) * pointerK;
      smooth.y += (target.y - smooth.y) * pointerK;

      const next = new Set<number>();

      if (pointerInside) {
        const centerCol = Math.floor(smooth.x / CELL_SIZE);
        const centerRow = Math.floor(smooth.y / CELL_SIZE);

        for (let dr = -NEIGHBOR_RANGE; dr <= NEIGHBOR_RANGE; dr += 1) {
          for (let dc = -NEIGHBOR_RANGE; dc <= NEIGHBOR_RANGE; dc += 1) {
            const col = centerCol + dc;
            const row = centerRow + dr;
            if (
              row < 0 ||
              col < 0 ||
              row >= gridSize.rows ||
              col >= gridSize.columns
            ) {
              continue;
            }

            const index = row * gridSize.columns + col;
            const desired = targetForOffset(dc, dr);
            const prev = states.get(index) ?? {
              alpha: 0,
              shadow: 0,
              scale: 1,
              glow: 0,
            };
            const nextState: CellState = {
              alpha: prev.alpha + (desired.alpha - prev.alpha) * intensityK,
              shadow: prev.shadow + (desired.shadow - prev.shadow) * intensityK,
              scale: prev.scale + (desired.scale - prev.scale) * intensityK,
              glow: prev.glow + (desired.glow - prev.glow) * intensityK,
            };
            states.set(index, nextState);
            writeCell(index, nextState);
            next.add(index);
          }
        }
      }

      states.forEach((prev, index) => {
        if (next.has(index)) return;

        const nextState: CellState = {
          alpha: prev.alpha + (0 - prev.alpha) * intensityK,
          shadow: prev.shadow + (0 - prev.shadow) * intensityK,
          scale: prev.scale + (1 - prev.scale) * intensityK,
          glow: prev.glow + (0 - prev.glow) * intensityK,
        };

        if (
          nextState.alpha < 0.002 &&
          nextState.shadow < 0.002 &&
          nextState.glow < 0.05
        ) {
          writeCell(index, { alpha: 0, shadow: 0, scale: 1, glow: 0 });
          states.delete(index);
          return;
        }

        states.set(index, nextState);
        writeCell(index, nextState);
      });
    };

    const onMove = (event: PointerEvent) => {
      const rect = layer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointerInside = false;
        return;
      }

      target.x = x;
      target.y = y;
      pointerInside = true;
    };

    const onLeave = () => {
      pointerInside = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
      gsap.ticker.fps(prevFps);
      gsap.ticker.lagSmoothing(500, 33);
      states.clear();
    };
  }, [cellCount, gridSize.columns, gridSize.rows]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="interactive-grid-bg"
      style={{
        gridTemplateColumns: `repeat(${gridSize.columns}, ${CELL_SIZE}px)`,
      }}
    >
      {Array.from({ length: cellCount }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
