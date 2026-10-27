"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference, useVisibleActivity } from "./useVisibleActivity";
import styles from "./TypewriterLine.module.css";

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
  const lineRef = useRef<HTMLParagraphElement>(null);
  const active = useVisibleActivity(lineRef);
  const reduced = useReducedMotionPreference();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const current = phrases[phraseIndex] ?? phrases[0];

  useEffect(() => {
    if (!active || reduced) return;
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
  }, [charIndex, current.length, deleting, phraseIndex, active, reduced]);

  const text = reduced ? phrases[0] : current.slice(0, Math.max(charIndex, 0));

  return (
    <p ref={lineRef} className={"theme-typewriter " + styles.line} aria-label="Software, AI and full-stack engineering">
      <span className={styles.sizer} aria-hidden="true">&quot;{longestPhrase}&quot;</span>
      <span className={styles.text} aria-hidden="true">&quot;{text}<span className={"theme-typewriter-cursor " + styles.cursor} />&quot;</span>
    </p>
  );
}
