"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function isNearPageEnd() {
  const documentHeight = document.documentElement.scrollHeight;
  const viewportBottom = window.scrollY + window.innerHeight;
  return documentHeight - viewportBottom < 520;
}

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        setVisible(isNearPageEnd() && window.scrollY > window.innerHeight * 0.8);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.15, ease: "easeIn" } }}
          whileHover={{ width: 148, boxShadow: "0 0 0 4px rgba(93,211,182,0.16), 0 0 42px rgba(93,211,182,0.28)" }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="group fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--accent)]/35 bg-black/82 text-white shadow-[0_0_0_4px_rgba(var(--accent-rgb),0.12),0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-colors duration-150 hover:bg-[var(--accent)] hover:text-black sm:bottom-8 sm:right-8"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(var(--accent-rgb),0.34),transparent_58%)] opacity-80 transition-opacity duration-150 group-hover:opacity-100"
          />
          <svg
            className="relative z-10 size-3.5 shrink-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-1 group-hover:scale-[0.25] group-hover:opacity-0"
            viewBox="0 0 384 512"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
          <span className="absolute z-10 translate-y-1 scale-[0.25] whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.16em] opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            Back to Top
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
