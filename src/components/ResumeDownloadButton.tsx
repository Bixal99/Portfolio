"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styles from "./ResumeDownloadButton.module.css";

type DownloadState = "idle" | "loading" | "done" | "open";

type ResumeDownloadButtonProps = {
  href: string;
  label?: string;
  placement?: "floating" | "inline";
};

function downloadFile(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = "";
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function ResumeDownloadButton({
  href,
  label = "Download CV",
  placement = "inline",
}: ResumeDownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");

  useEffect(() => {
    if (downloadState !== "loading") {
      return;
    }

    const downloadTimer = window.setTimeout(() => {
      downloadFile(href);
      setDownloadState("done");
    }, 3700);

    return () => window.clearTimeout(downloadTimer);
  }, [downloadState, href]);

  useEffect(() => {
    if (downloadState !== "done") {
      return;
    }

    const openTimer = window.setTimeout(() => {
      setDownloadState("open");
    }, 1200);

    return () => window.clearTimeout(openTimer);
  }, [downloadState]);

  useEffect(() => {
    if (downloadState !== "open") {
      return;
    }

    const resetTimer = window.setTimeout(() => {
      setDownloadState("idle");
    }, 5000);

    return () => window.clearTimeout(resetTimer);
  }, [downloadState]);

  return (
    <button
      type="button"
      aria-label={
        downloadState === "done"
          ? "CV downloaded"
          : downloadState === "open"
            ? "Open CV"
            : label
      }
      aria-busy={downloadState === "loading"}
      className={[
        styles.button,
        placement === "floating" ? styles.floating : styles.inline,
        downloadState === "loading" ? styles.loading : "",
        downloadState === "done" ? styles.done : "",
        downloadState === "open" ? styles.open : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        if (downloadState === "idle") {
          setDownloadState("loading");
          return;
        }

        if (downloadState === "open") {
          window.open(href, "_blank", "noreferrer");
        }
      }}
    >
      <span className={styles.circle} aria-hidden="true">
        <Download className={styles.icon} strokeWidth={1.7} />
        <span className={styles.square} />
      </span>
      <span className={styles.labelTrack} aria-hidden="true">
        <span className={`${styles.title} ${styles.downloadTitle}`}>{label}</span>
        <span className={`${styles.title} ${styles.doneTitle}`}>Done</span>
        <span className={`${styles.title} ${styles.openTitle}`}>Open</span>
      </span>
    </button>
  );
}
