"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const CELL_SIZE = 42;
const HOVER_RADIUS = 3;

type GridSize = {
  columns: number;
  rows: number;
};

export function InteractiveGridBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const activeCellsRef = useRef<Set<number>>(new Set());
  const pointerRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [gridSize, setGridSize] = useState<GridSize>({ columns: 0, rows: 0 });

  useEffect(() => {
    const updateGrid = () => {
      setGridSize({
        columns: Math.ceil(window.innerWidth / CELL_SIZE) + 1,
        rows: Math.ceil(window.innerHeight / CELL_SIZE) + 1,
      });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);

    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const cellCount = useMemo(
    () => gridSize.columns * gridSize.rows,
    [gridSize.columns, gridSize.rows],
  );

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || gridSize.columns === 0 || cellCount === 0) {
      return;
    }

    const cells = Array.from(layer.children) as HTMLElement[];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resetCell = (index: number) => {
      const cell = cells[index];
      if (!cell) return;

      cell.style.setProperty("--grid-alpha", "0");
      cell.style.setProperty("--grid-shadow-alpha", "0");
      cell.style.setProperty("--grid-scale", "1");
      cell.style.setProperty("--grid-glow", "0px");
    };

    const resetActiveCells = () => {
      activeCellsRef.current.forEach(resetCell);
      activeCellsRef.current.clear();
    };

    if (prefersReducedMotion) {
      resetActiveCells();
      return;
    }

    const paintCells = () => {
      rafRef.current = null;

      const centerCol = Math.floor(pointerRef.current.x / CELL_SIZE);
      const centerRow = Math.floor(pointerRef.current.y / CELL_SIZE);
      const nextActive = new Set<number>();

      for (let row = centerRow - HOVER_RADIUS; row <= centerRow + HOVER_RADIUS; row += 1) {
        for (let col = centerCol - HOVER_RADIUS; col <= centerCol + HOVER_RADIUS; col += 1) {
          if (row < 0 || col < 0 || row >= gridSize.rows || col >= gridSize.columns) {
            continue;
          }

          const distance = Math.hypot(col - centerCol, row - centerRow);
          if (distance > HOVER_RADIUS) {
            continue;
          }

          const index = row * gridSize.columns + col;
          const cell = cells[index];
          if (!cell) continue;

          const intensity = 1 - distance / HOVER_RADIUS;
          cell.style.setProperty("--grid-alpha", (0.05 + intensity * 0.26).toFixed(3));
          cell.style.setProperty("--grid-shadow-alpha", (0.04 + intensity * 0.24).toFixed(3));
          cell.style.setProperty("--grid-scale", (1 + intensity * 0.18).toFixed(3));
          cell.style.setProperty("--grid-glow", `${Math.round(10 + intensity * 34)}px`);
          nextActive.add(index);
        }
      }

      activeCellsRef.current.forEach((index) => {
        if (!nextActive.has(index)) {
          resetCell(index);
        }
      });

      activeCellsRef.current = nextActive;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(paintCells);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetActiveCells);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetActiveCells);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
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