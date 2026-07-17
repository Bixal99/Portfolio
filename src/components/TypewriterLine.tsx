"use client";

import { useEffect, useMemo, useState } from "react";

const phrases = [
  "Software Engineer",
  "AI Engineer",
  "Full-Stack Developer",
  "Startup Engineer",
  "Web Developer",
  "Open-Source Contributor",
  "AI Enthusiast",
];

type TypewriterLineProps = {
  align?: "left" | "center";
};

export function TypewriterLine({ align = "center" }: TypewriterLineProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const current = phrases[phraseIndex] ?? phrases[0];

  useEffect(() => {
    const finishedTyping = !deleting && charIndex >= current.length;
    const finishedDeleting = deleting && charIndex <= 0;
    const delay = finishedTyping ? 1800 : deleting ? 28 : 70;

    const timeout = window.setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
        return;
      }

      if (finishedDeleting) {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
        setCharIndex(1);
        return;
      }

      setCharIndex((index) => index + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, current.length, deleting, phraseIndex]);

  const text = useMemo(
    () => current.slice(0, Math.max(charIndex, 0)),
    [charIndex, current],
  );

  return (
    <p
      className={`theme-typewriter flex min-h-8 w-full items-center overflow-visible text-[clamp(1.05rem,1.7vw,1.32rem)] font-semibold uppercase tracking-[0.22em] ${
        align === "left" ? "justify-start text-left" : "justify-center text-center"
      }`}
      aria-live="polite"
    >
      <span className="inline-flex max-w-full items-center justify-start whitespace-nowrap">
        <span className="inline-block whitespace-nowrap text-[var(--accent)] drop-shadow-[0_0_18px_rgba(var(--accent-rgb),0.48)]">
          {text || "\u00a0"}
        </span>
        <span
          className="theme-typewriter-cursor ml-1.5 inline-block h-[1.15em] w-[2px] shrink-0 rounded-full bg-[var(--accent)]"
          aria-hidden="true"
        />
      </span>
    </p>
  );
}
