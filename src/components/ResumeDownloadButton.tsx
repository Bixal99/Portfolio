"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styles from "./ResumeDownloadButton.module.css";

type ResumeDownloadButtonProps = {
  href: string;
  label?: string;
  placement?: "floating" | "inline";
};

export function ResumeDownloadButton({ href, label = "Download CV", placement = "inline" }: ResumeDownloadButtonProps) {
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!requested) return;
    const timer = window.setTimeout(() => setRequested(false), 2200);
    return () => window.clearTimeout(timer);
  }, [requested]);

  return (
    <a
      href={href}
      download="Mohammad-Bilal-CV.pdf"
      aria-label={label}
      className={[styles.button, placement === "floating" ? styles.floating : styles.inline, requested ? styles.done : ""].filter(Boolean).join(" ")}
      onClick={() => setRequested(true)}
    >
      <span className={styles.circle} aria-hidden="true"><Download className={styles.icon} strokeWidth={1.7} /></span>
      <span className={styles.labelTrack} aria-hidden="true">
        <span className={styles.title + " " + styles.downloadTitle}>{label}</span>
        <span className={styles.title + " " + styles.doneTitle}>Download started</span>
      </span>
      <span className="sr-only" role="status">{requested ? "CV download started." : ""}</span>
    </a>
  );
}
