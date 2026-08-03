"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import styles from "./ResumeDownloadButton.module.css";

type DownloadState = "idle" | "loading" | "done" | "open";

type ResumeDownloadButtonProps = {
  href: string;
  files?: string[];
  label?: string;
  placement?: "floating" | "inline";
};

function downloadFile(fileHref: string) {
  const link = document.createElement("a");
  link.href = fileHref;
  link.download = fileHref.split("/").pop() || "resume.pdf";
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadFiles(hrefs: string[]) {
  hrefs.forEach((fileHref, index) => {
    window.setTimeout(() => downloadFile(fileHref), index * 350);
  });
}

export function ResumeDownloadButton({
  href,
  files,
  label = "Download CV",
  placement = "inline",
}: ResumeDownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const downloadHrefs = useMemo(
    () => (files?.length ? files : [href]),
    [files, href],
  );
  const downloadKey = downloadHrefs.join("|");

  useEffect(() => {
    if (downloadState !== "loading") {
      return;
    }

    const downloadTimer = window.setTimeout(() => {
      downloadFiles(downloadKey.split("|"));
      setDownloadState("done");
    }, 3700);

    return () => window.clearTimeout(downloadTimer);
  }, [downloadState, downloadKey]);

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
      suppressHydrationWarning
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
