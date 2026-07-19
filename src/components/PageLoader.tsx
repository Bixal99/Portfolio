"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DRAWER_MS,
  LEGAL_CURTAIN_DOM_ID,
  consumeHorizontalCurtain,
  peekHorizontalCurtain,
  revealCurtain,
} from "@/lib/legal-transition";

const PROGRESS_MS = 2200;
const HOLD_MS = 180;
const CONTENT_FADE_MS = 280;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type Phase = "boot" | "loading" | "hold" | "fade" | "drawer" | "done";
type BootMode = "normal" | "dom-reveal" | "horizontal-drawer";

function readBootMode(): BootMode {
  if (typeof window === "undefined") return "normal";
  if (!peekHorizontalCurtain()) return "normal";
  if (document.getElementById(LEGAL_CURTAIN_DOM_ID)) return "dom-reveal";
  return "horizontal-drawer";
}

function scrollToHashTarget() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  });
}

export function PageLoader() {
  const [bootMode, setBootMode] = useState<BootMode>("normal");
  const [phase, setPhase] = useState<Phase>("boot");
  const [progress, setProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const useHorizontal = bootMode !== "normal";
  const skipReactDrawer = bootMode === "dom-reveal";
  const rafRef = useRef<number | null>(null);

  // Client-only: avoids SSR/client portalTarget hydration mismatch
  useEffect(() => {
    const mode = readBootMode();
    setBootMode(mode);
    setPhase(mode === "normal" ? "boot" : "drawer");
    setPortalTarget(document.body);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;
    const timers: number[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
    };

    if (bootMode === "dom-reveal") {
      revealCurtain(() => {
        if (!cancelled) {
          setPhase("done");
          scrollToHashTarget();
        }
      });
      return () => {
        cancelled = true;
        for (const id of timers) window.clearTimeout(id);
      };
    }

    if (bootMode === "horizontal-drawer") {
      consumeHorizontalCurtain();
      schedule(() => {
        if (!cancelled) {
          setPhase("done");
          scrollToHashTarget();
        }
      }, DRAWER_MS + 40);
      return () => {
        cancelled = true;
        for (const id of timers) window.clearTimeout(id);
      };
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? 400 : PROGRESS_MS;
    const start = performance.now();

    // Defer first phase paint to avoid sync setState-in-effect lint on mount path.
    schedule(() => {
      if (!cancelled) setPhase("loading");
    }, 0);

    const finish = () => {
      if (cancelled) return;

      if (reduceMotion) {
        setPhase("fade");
        schedule(() => setPhase("done"), 220);
        return;
      }

      setPhase("hold");
      schedule(() => {
        setPhase("fade");
        schedule(() => {
          setPhase("drawer");
          schedule(() => setPhase("done"), DRAWER_MS);
        }, CONTENT_FADE_MS);
      }, HOLD_MS);
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(easeOutCubic(t) * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      finish();
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      for (const id of timers) window.clearTimeout(id);
    };
  }, [bootMode, ready]);

  useEffect(() => {
    if (phase !== "drawer" || skipReactDrawer) return;

    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setDrawerOpen(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [phase, skipReactDrawer]);

  useEffect(() => {
    if (!ready || phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.pageLoader = "1";
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.pageLoader;
    };
  }, [phase, ready]);

  if (!ready || !portalTarget || phase === "done") return null;

  const mix = progress / 100;
  const r = Math.round(255 + (93 - 255) * mix);
  const g = Math.round(255 + (211 - 255) * mix);
  const b = Math.round(255 + (182 - 255) * mix);

  const showCounter =
    phase === "loading" || phase === "hold" || phase === "fade";
  const contentFading = phase === "fade";
  const showShell =
    phase === "boot" ||
    phase === "loading" ||
    phase === "hold" ||
    phase === "fade";

  const ui = (
    <div
      role="status"
      aria-live="polite"
      aria-busy={phase === "loading"}
      aria-label={showCounter ? `Loading ${progress}%` : "Loading"}
      className="fixed inset-0 z-[10060]"
    >
      {showShell ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
          {showCounter ? (
            <>
              <div
                className={`relative z-10 flex flex-col items-center justify-center transition-[opacity,transform,filter] duration-[280ms] ease-[cubic-bezier(0.2,0,0,1)] ${
                  contentFading
                    ? "-translate-y-3 opacity-0 blur-[4px]"
                    : "opacity-100 blur-0"
                }`}
              >
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80vw,34rem)] w-[min(100vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.18),transparent_68%)]"
                  aria-hidden="true"
                />

                <p
                  className="relative text-[clamp(4.5rem,18vw,11rem)] font-bold leading-none tracking-tight tabular-nums"
                  style={{ color: `rgb(${r}, ${g}, ${b})` }}
                >
                  {progress}
                  <span className="text-[0.45em] font-semibold">%</span>
                </p>

                <p className="relative mt-6 max-w-[90vw] text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] pl-[0.2em] sm:text-base sm:tracking-[0.32em] sm:pl-[0.32em]">
                  Loading Portfolio
                </p>
              </div>

              <div
                className={`absolute inset-x-0 bottom-0 h-px bg-white/10 transition-opacity duration-[280ms] ${
                  contentFading ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
              >
                <div
                  className="h-full bg-[var(--accent)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {phase === "drawer" && !skipReactDrawer ? (
        useHorizontal ? (
          <>
            <div
              className="absolute inset-y-0 left-0 z-10 w-1/2 bg-black transition-transform duration-[780ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: drawerOpen ? "translateX(-105%)" : "translateX(0)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 right-0 z-10 w-1/2 bg-black transition-transform duration-[780ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: drawerOpen ? "translateX(105%)" : "translateX(0)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-x-0 top-0 z-10 h-1/2 bg-black transition-transform duration-[780ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: drawerOpen ? "translateY(-105%)" : "translateY(0)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-black transition-transform duration-[780ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: drawerOpen ? "translateY(105%)" : "translateY(0)",
              }}
              aria-hidden="true"
            />
          </>
        )
      ) : null}
    </div>
  );

  return createPortal(ui, portalTarget);
}
