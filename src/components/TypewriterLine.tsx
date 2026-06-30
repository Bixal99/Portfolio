"use client";

import { useEffect, useMemo, useState } from "react";

const phrases = [
  "Backend Developer",
  "AI Research Intern",
  "RAG Pipeline Builder",
  "Computer Science Student",
];

export function TypewriterLine() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const current = phrases[phraseIndex] ?? phrases[0];

  useEffect(() => {
    const finishedTyping = !deleting && charIndex === current.length;
    const finishedDeleting = deleting && charIndex === 0;
    const delay = finishedTyping ? 1100 : deleting ? 38 : 68;

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
  }, [charIndex, current.length, deleting]);

  const text = useMemo(() => current.slice(0, charIndex), [charIndex, current]);

  return (
    <p className="mt-5 min-h-8 text-xl font-medium text-white/62 sm:text-2xl">
      <span className="text-[var(--accent)]">{text}</span>
      <span className="ml-1 inline-block h-6 w-px translate-y-1 bg-[var(--accent)] shadow-[0_0_22px_rgba(var(--accent-rgb),0.6)]" aria-hidden="true" />
    </p>
  );
}

