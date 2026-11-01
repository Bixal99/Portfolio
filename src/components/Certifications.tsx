"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Award, FileWarning } from "lucide-react";
import gsap from "gsap";
import { certificates } from "@/data/certificates";
import { LightSection } from "./LightSection";
import { SectionHeading } from "./SectionHeading";
import { useCertificateRotation } from "./useCertificateRotation";
import { useReducedMotionPreference } from "./useVisibleActivity";

export const Certifications = () => {
  const [selected, setSelected] = useState(0);
  const [failedPreviews, setFailedPreviews] = useState<Record<string, boolean>>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const previousCertificate = useRef(selected);
  const morphFilterId = useId();
  const reducedMotion = useReducedMotionPreference();
  const handleAdvance = useCallback(() => setSelected((index) => (index + 1) % certificates.length), []);
  useCertificateRotation(galleryRef, selected, handleAdvance);

  const certificate = certificates[selected];
  const certificateDocument = `/certificates/${certificate.id}.pdf`;

  useEffect(() => {
    const displacement = displacementRef.current;
    const changed = previousCertificate.current !== selected;
    previousCertificate.current = selected;
    if (!displacement || !changed || reducedMotion) return;

    const morph = gsap.timeline()
      .to(displacement, { attr: { scale: 12 }, duration: 0.3, ease: "power2.inOut" })
      .to(displacement, { attr: { scale: 0 }, duration: 0.6, ease: "power3.out" });
    return () => {
      morph.kill();
      displacement.setAttribute("scale", "0");
    };
  }, [selected, reducedMotion]);

  const handleNavigateCertificates = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.target !== event.currentTarget) return;
    const destinations: Record<string, number> = {
      ArrowRight: (selected + 1) % certificates.length,
      ArrowLeft: (selected - 1 + certificates.length) % certificates.length,
      Home: 0,
      End: certificates.length - 1,
    };
    const next = destinations[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
  };

  const handlePreviewError = (id: string): void => {
    setFailedPreviews((previous) => ({ ...previous, [id]: true }));
  };

  return (
    <LightSection id="certificates" className="py-10 sm:py-12 lg:py-14">
      <SectionHeading kicker="MY CERTIFICATES" title="Certificates" icon={Award} compact className="!mb-7 sm:!mb-9" />

      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute size-0">
        <defs>
          <filter id={morphFilterId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={1} seed={8} result="morphNoise" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="morphNoise" scale={0} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div ref={galleryRef} role="region" aria-roledescription="carousel" aria-label="Certificates">
        <p id="certificate-navigation-help" className="sr-only">Use the left and right arrow keys to browse certificates.</p>
        <div
          id="certificate-exhibit"
          role="group"
          aria-roledescription="slide"
          aria-live="off"
          aria-label={`${selected + 1} of ${certificates.length}: ${certificate.title}`}
          aria-describedby="certificate-navigation-help"
          tabIndex={0}
          onKeyDown={handleNavigateCertificates}
          className="mx-auto max-w-[600px] outline-none focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-[var(--accent)]"
        >
          <a
            data-certificate-action
            href={certificateDocument}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${certificate.title} (PDF, opens in a new tab)`}
            className="block outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4"
          >
            <div className="relative isolate aspect-[842/595] w-full overflow-hidden bg-white shadow-[0_8px_24px_rgba(20,33,61,0.08)]" style={{ filter: reducedMotion ? undefined : `url("#${morphFilterId}")` }}>
              {certificates.map((item, index) => (
                <div
                  key={item.id}
                  data-certificate-preview={item.id}
                  data-active={selected === index}
                  aria-hidden={selected !== index}
                  className="pointer-events-none absolute inset-0 z-0 scale-[0.98] opacity-0 blur-[6px] transition-[opacity,transform,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] data-[active=true]:z-10 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:blur-none motion-reduce:transform-none motion-reduce:blur-none motion-reduce:transition-none"
                >
                  {failedPreviews[item.id] ? (
                    <span className="absolute inset-0 grid place-items-center text-[var(--accent)]" aria-hidden="true"><FileWarning size={32} /></span>
                  ) : (
                    <Image
                      src={`/certificates/${item.id}.webp`}
                      alt={`${item.title} certificate`}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 64px), 600px"
                      className="object-contain"
                      onError={() => handlePreviewError(item.id)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 grid min-h-14 text-center">
              {certificates.map((item, index) => (
                <h3
                  key={item.id}
                  data-active={selected === index}
                  aria-hidden={selected !== index}
                  className="col-start-1 row-start-1 scale-[0.98] text-balance text-xl font-medium leading-snug tracking-[-0.02em] text-[var(--foreground)] opacity-0 blur-[3px] transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:blur-none motion-reduce:transform-none motion-reduce:blur-none motion-reduce:transition-none sm:text-2xl"
                >
                  {item.title}
                </h3>
              ))}
            </div>
          </a>
        </div>
      </div>
    </LightSection>
  );
};
