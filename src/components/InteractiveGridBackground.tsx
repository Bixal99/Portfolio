"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const CELLS = Array.from({ length: 25 }, (_, index) => index);

export function InteractiveGridBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const glow = glowRef.current;
    const cellLayer = cellsRef.current;
    const host = layer?.parentElement;
    if (!layer || !glow || !cellLayer || !host) return;

    const capability = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cellSize = parseFloat(getComputedStyle(layer).getPropertyValue("--grid-cell-size")) || 42;
    const pool = Array.from(cellLayer.children).map((element) => ({ element: element as HTMLElement, key: "", lastUsed: 0, target: 0 }));
    let frame = 0;
    let x = 0;
    let y = 0;
    let clientX = 0;
    let clientY = 0;
    let currentKey = "";
    let serial = 0;

    const paint = () => {
      frame = 0;
      const rect = layer.getBoundingClientRect();
      x = clientX - rect.left;
      y = clientY - rect.top;
      glow.style.transform = `translate(${x - 84}px, ${y - 84}px)`;
      glow.style.opacity = "1";
      const column = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      const key = `${column}:${row}`;
      if (key === currentKey) return;
      currentKey = key;
      const targets = new Map([[key, { column, row, opacity: 1 }]]);
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        targets.set(`${column + dx}:${row + dy}`, { column: column + dx, row: row + dy, opacity: .35 });
      }
      for (const slot of pool) {
        if (slot.target && !targets.has(slot.key)) {
          slot.target = 0;
          gsap.to(slot.element, { opacity: 0, duration: reduced.matches ? 0 : .42, ease: "power2.out", overwrite: true });
        }
      }
      for (const [targetKey, target] of targets) {
        let slot = pool.find((candidate) => candidate.key === targetKey);
        if (!slot) {
          slot = pool.filter((candidate) => !targets.has(candidate.key)).sort((a, b) => a.lastUsed - b.lastUsed)[0];
          gsap.killTweensOf(slot.element);
          gsap.set(slot.element, { x: target.column * cellSize, y: target.row * cellSize, opacity: 0 });
          slot.key = targetKey;
        }
        slot.lastUsed = ++serial;
        slot.target = target.opacity;
        gsap.to(slot.element, { opacity: target.opacity, duration: reduced.matches ? 0 : .16, ease: "power2.out", overwrite: true });
      }
    };
    const hide = () => {
      glow.style.opacity = "0";
      currentKey = "";
      cancelAnimationFrame(frame);
      frame = 0;
      for (const slot of pool) {
        slot.target = 0;
        gsap.to(slot.element, { opacity: 0, duration: document.hidden || reduced.matches ? 0 : .24, overwrite: true });
      }
    };
    const onMove = (event: PointerEvent) => {
      if (!capability.matches || document.hidden || event.pointerType === "touch") return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    capability.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    document.addEventListener("visibilitychange", hide);
    return () => {
      hide();
      pool.forEach((slot) => gsap.killTweensOf(slot.element));
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      capability.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
      document.removeEventListener("visibilitychange", hide);
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="interactive-grid-bg">
      <div ref={glowRef} className="interactive-grid-glow" />
      <div ref={cellsRef} className="interactive-grid-cells">{CELLS.map((index) => <span key={index} className="interactive-grid-cell" />)}</div>
    </div>
  );
}
