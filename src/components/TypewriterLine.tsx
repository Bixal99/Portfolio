"use client";

import { useEffect, useMemo, useState } from "react";

const phrases = [
  "a Software Engineer",
  "an AI Engineer",
  "a Full-Stack Developer",
  "a Startup Engineer",
  "a Web Developer",
  "an Open-Source Contributor",
  "an AI Enthusiast",
];

const longestPhrase = phrases.reduce((a, b) => (a.length >= b.length ? a : b));

export function TypewriterLine() {
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
      className="theme-typewriter relative inline-grid h-10 items-center text-[clamp(1.35rem,2.6vw,1.8rem)] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]"
      aria-live="polite"
    >
      {/* Invisible sizer - locks width to the longest phrase so the line never shifts */}
      <span
        className="invisible col-start-1 row-start-1 inline-flex items-center whitespace-nowrap"
        aria-hidden="true"
      >
        <span>&quot;</span>
        <span>{longestPhrase}</span>
        <span className="mx-[0.06em] inline-block h-[0.95em] w-[2px] shrink-0" />
        <span>&quot;</span>
      </span>

      <span className="col-start-1 row-start-1 inline-flex items-center justify-self-start whitespace-nowrap drop-shadow-[0_0_18px_rgba(var(--accent-rgb),0.48)]">
        <span aria-hidden="true">&quot;</span>
        <span>{text}</span>
        <span
          className="theme-typewriter-cursor mx-[0.06em] inline-block h-[0.95em] w-[2px] shrink-0 translate-y-[0.05em] rounded-full"
          aria-hidden="true"
        />
        <span aria-hidden="true">&quot;</span>
      </span>
    </p>
  );
}
