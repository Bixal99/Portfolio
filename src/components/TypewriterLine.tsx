"use client";

import { useEffect, useMemo, useState } from "react";

const phrases = [
  "a Software Engineer",
  "an AI/ML Engineer",
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
      className="theme-typewriter relative inline-grid h-auto min-h-10 min-w-0 max-w-full items-center text-[clamp(1rem,3.8vw,1.8rem)] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] sm:h-10 sm:tracking-[0.22em]"
      aria-live="polite"
    >
      {/* Invisible sizer - locks width to the longest phrase so the line never shifts */}
      <span
        className="invisible col-start-1 row-start-1 inline-flex max-w-full items-center whitespace-normal text-center sm:whitespace-nowrap sm:text-left"
        aria-hidden="true"
      >
        <span>&quot;</span>
        <span>{longestPhrase}</span>
        <span className="mx-[0.06em] inline-block h-[0.95em] w-[2px] shrink-0" />
        <span>&quot;</span>
      </span>

      <span className="col-start-1 row-start-1 inline-flex max-w-full flex-wrap items-center justify-center justify-self-center whitespace-normal text-center drop-shadow-[0_0_18px_rgba(var(--accent-rgb),0.48)] sm:flex-nowrap sm:justify-start sm:justify-self-start sm:whitespace-nowrap sm:text-left">
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
