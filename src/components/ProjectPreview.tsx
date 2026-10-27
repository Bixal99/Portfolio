"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Pause, Play, X } from "lucide-react";
import type { CatalogProject } from "@/data/projectCatalog";
import styles from "./ProjectCards.module.css";

type PreviewProject = Pick<CatalogProject, "title" | "slug" | "media"> & {
  links: Pick<CatalogProject["links"], "demo">;
};

export function ProjectPreview({ project, variant = "feature" }: { project: PreviewProject; variant?: "feature" | "archive" }) {
  const { media } = project;
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const isFeature = variant === "feature";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !started || failed) return;
    void video.play().catch(() => {});
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) video.pause();
    }, { threshold: 0.05 });
    observer.observe(video);
    const pauseHidden = () => { if (document.hidden) video.pause(); };
    document.addEventListener("visibilitychange", pauseHidden);
    return () => { video.pause(); observer.disconnect(); document.removeEventListener("visibilitychange", pauseHidden); };
  }, [started, failed]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || started) return;
    const capability = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let clientX = 0;
    let clientY = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--light-x", "50%");
      card.style.setProperty("--light-y", "50%");
      card.removeAttribute("data-illuminated");
    };
    const paint = () => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
      card.style.setProperty("--light-x", `${x * 100}%`);
      card.style.setProperty("--light-y", `${y * 100}%`);
      card.setAttribute("data-illuminated", "true");
    };
    const move = (event: PointerEvent) => {
      if (!capability.matches || event.pointerType !== "mouse") return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const visibility = () => { if (document.hidden) reset(); };
    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    capability.addEventListener("change", reset);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      reset();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      capability.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [started]);

  function togglePlayback() {
    if (!started) { setStarted(true); return; }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  const posterSizes = isFeature
    ? "(max-width: 540px) calc(100vw - 64px), (max-width: 639px) calc(100vw - 82px), (max-width: 1023px) calc(100vw - 106px), (max-width: 1099px) calc(100vw - 138px), (max-width: 1279px) calc(50vw - 104px), 536px"
    : "(max-width: 760px) calc(100vw - 40px), (max-width: 1279px) calc(50vw - 72px), 568px";
  const poster = <Image src={"/covers/posters/" + project.slug + ".webp"} alt={project.title + " illustrated project poster"} fill sizes={posterSizes} className={styles.poster} />;
  const resetPreview = () => { setStarted(false); setFailed(false); setPlaying(false); };

  return (
    <div className={[styles.preview, isFeature ? "" : styles.archivePreview].join(" ")}>
      <div ref={cardRef} className={[styles.mediaCard, isFeature ? styles.featureMedia : styles.archiveMedia].join(" ")}>
        <div className={styles.media} data-demo-screen={started && !failed ? "" : undefined}>
          {!started || failed ? poster : (
            <video ref={videoRef} src={media.video} className={styles.video} preload="none" playsInline controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setFailed(true)} aria-label={project.title + ": " + media.label} />
          )}
          {failed && <div className={styles.failure}><p>The video could not load.</p><a href={project.links.demo} target="_blank" rel="noreferrer">Open live project <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a></div>}
        </div>
      </div>
      <div className={styles.demoActions}>
        {media.video && !failed ? (
          <button type="button" className={styles.demoButton} data-cursor-label={playing ? "Pause" : "Play demo"} onClick={togglePlayback} aria-label={(playing ? "Pause " : started ? "Resume " : "Watch ") + project.title + " demo"}>
            <span className={styles.playIcon}>{playing ? <Pause size={13} fill="currentColor" aria-hidden="true" /> : <Play size={13} fill="currentColor" aria-hidden="true" />}</span>
            <span>{playing ? "Pause demo" : started ? "Resume demo" : "Watch demo"}</span>
            <ArrowUpRight className={styles.playArrow} size={16} aria-hidden="true" />
          </button>
        ) : (
          <a className={styles.demoButton} data-cursor-label="Explore" href={project.links.demo} target="_blank" rel="noreferrer">Explore project <ArrowUpRight className={styles.playArrow} size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        )}
        {started ? <button type="button" className={styles.closeDemo} onClick={resetPreview}><X size={14} aria-hidden="true" />Close demo</button> : <span className={styles.demoLabel}>{media.label}</span>}
      </div>
      {(media.note || !isFeature) && <p className={styles.mediaNote} aria-hidden={!media.note || undefined}>{media.note ?? ""}</p>}
    </div>
  );
}
