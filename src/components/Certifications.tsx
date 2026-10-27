"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowDownToLine, ArrowUpRight, Award, Check, FileWarning } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certificates } from "@/data/certificates";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import styles from "./Certifications.module.css";
import { useCertificateRotation } from "./useCertificateRotation";

export function Certifications() {
  const [selected, setSelected] = useState(0);
  const [failedPreview, setFailedPreview] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const advance = useCallback(() => setSelected((index) => (index + 1) % certificates.length), []);
  useCertificateRotation(galleryRef, selected, advance);
  const certificate = certificates[selected];
  const document = `/certificates/${certificate.id}.pdf`;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(panel.querySelectorAll("[data-credential-reveal]"),
        { opacity: .7, y: 8 },
        {
          opacity: 1, y: 0, duration: .3, stagger: .035, ease: "expo.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: panel, start: "top 88%", once: true },
        },
      );
    });
    return () => media.revert();
  }, [selected]);

  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % certificates.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + certificates.length) % certificates.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = certificates.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <AnimatedSection id="certificates" className={styles.section}>
      <SectionHeading kicker="MY CERTIFICATIONS" title="Certifications" icon={Award} className={styles.heading} />
      <div ref={galleryRef} className={styles.gallery}>
      <div className={styles.selector} role="tablist" aria-label="Choose a certificate">
        {certificates.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            type="button"
            role="tab"
            id={`${item.id}-tab`}
            aria-selected={selected === index}
            aria-controls="certificate-exhibit"
            tabIndex={selected === index ? 0 : -1}
            className={styles.tab}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigateTabs(event, index)}
          >
            <span className={styles.tabIssuer}>{item.organization}</span><span className={styles.tabTitle}>{item.title}</span>
          </button>
        ))}
      </div>

      <div ref={panelRef} id="certificate-exhibit" role="tabpanel" aria-live="off" aria-labelledby={`${certificate.id}-tab`} className={styles.exhibit} tabIndex={0}>
        <div className={styles.details} data-credential-reveal>
          <p className={styles.issuer}>{certificate.organization}<span>{certificate.issuer}</span></p>
          <h3>{certificate.title}</h3>
          <p className={styles.meta}><span>{certificate.type}</span><time dateTime={certificate.date}>{certificate.displayDate}</time></p>
          <div className={styles.topics}>
            <h4>Topics covered</h4>
            <ul>{certificate.skills.map((skill) => <li key={skill}><Check size={15} aria-hidden="true" />{skill}</li>)}</ul>
          </div>
        </div>

        <div className={styles.documentColumn} data-credential-reveal>
          <a className={styles.documentFrame} data-certificate-action data-cursor-label="View PDF" href={document} target="_blank" rel="noopener noreferrer" aria-label={`Open ${certificate.title} certificate (PDF, new tab)`}>
            <div className={styles.paper}>
              {failedPreview === certificate.id ? (
                <span className={styles.previewFallback}><FileWarning size={28} aria-hidden="true" /><span>Preview unavailable</span><span>Open the original PDF <ArrowUpRight size={14} aria-hidden="true" /></span></span>
              ) : (
                <Image
                  key={certificate.id}
                  src={`/certificates/${certificate.id}.webp`}
                  alt={`${certificate.organization} ${certificate.title} certificate of completion`}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 50px), (max-width: 999px) calc(100vw - 80px), (max-width: 1279px) 53vw, 650px"
                  className={styles.documentImage}
                  style={{ objectFit: "contain" }}
                  onError={() => setFailedPreview(certificate.id)}
                />
              )}
            </div>
          </a>
          <div className={styles.actions}>
            <a className={styles.view} data-certificate-action data-cursor-label="Open PDF" href={document} target="_blank" rel="noopener noreferrer">Open certificate<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (PDF, new tab)</span></a>
            <a className={styles.download} data-certificate-action data-cursor-label="Download" href={document} download><ArrowDownToLine size={16} aria-hidden="true" /><span>Download PDF</span></a>
          </div>
        </div>
      </div>
      </div>
    </AnimatedSection>
  );
}
