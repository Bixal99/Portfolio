"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const phrases = ["AI Engineer", "Backend Developer", "Full-Stack Developer", "Startup Engineer", "Open Source Contributor", "Tech Enthusiast"];

export function TypewriterLine() {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const [started, setStarted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const current = phrases[phraseIndex] ?? phrases[0];

  useEffect(() => {
    let frame = 0;

    const waitUntilVisible = () => {
      const line = lineRef.current;

      if (!line) {
        frame = window.requestAnimationFrame(waitUntilVisible);
        return;
      }

      const rect = line.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const topElement = document.elementFromPoint(x, y);
      const visible =
        rect.width > 0 &&
        rect.height > 0 &&
        window.getComputedStyle(line).visibility !== "hidden" &&
        topElement !== null &&
        line.contains(topElement);

      if (visible) {
        setStarted(true);
        return;
      }

      frame = window.requestAnimationFrame(waitUntilVisible);
    };

    waitUntilVisible();

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    const finishedTyping = !deleting && charIndex === current.length;
    const finishedDeleting = deleting && charIndex === 0;
    const delay = finishedTyping ? 1850 : deleting ? 24 : 72;

    const timeout = window.setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
        return;
      }

      if (finishedDeleting) {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
        return;
      }

      setCharIndex((index) => index + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, current.length, deleting, started]);

  const text = useMemo(() => current.slice(0, charIndex), [charIndex, current]);

  return (
    <p
      ref={lineRef}
      className="theme-typewriter mt-6 flex min-h-8 items-center text-[clamp(0.95rem,1.5vw,1.18rem)] font-semibold uppercase tracking-[0.26em]"
      style={{ color: "var(--typewriter-color, var(--accent))" }}
      aria-live="polite"
    >
      <span className="inline-block text-[var(--typewriter-color,var(--accent))] drop-shadow-[0_0_18px_rgba(var(--typewriter-rgb),0.48)]">
        {text || "\u00a0"}
      </span>
      <span
        className="theme-typewriter-cursor ml-1.5 inline-block h-[1.25em] w-[2px] rounded-full bg-[var(--typewriter-color,var(--accent))] shadow-[0_0_18px_rgba(var(--typewriter-rgb),0.72)]"
        aria-hidden="true"
      />
    </p>
  );
}