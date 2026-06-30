"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollExperience() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 36 });
      gsap.set("[data-hero-line]", { autoAlpha: 0, yPercent: 80, rotateX: -18 });
      gsap.set("[data-project-card], [data-tech-card], [data-education-item]", {
        transformPerspective: 900,
        transformOrigin: "50% 100%",
      });

      gsap.timeline({ defaults: { ease: "power4.out" } })
        .to("[data-hero-line]", {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.12,
        })
        .fromTo(
          "[data-hero-card]",
          { autoAlpha: 0, y: 28, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.08 },
          "-=0.45",
        );

      gsap.to(".ambient-light-one", {
        yPercent: 28,
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      gsap.to(".ambient-light-two", {
        yPercent: -24,
        xPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      document.querySelectorAll("section").forEach((section) => {
        const revealItems = section.querySelectorAll("[data-reveal]");

        if (revealItems.length) {
          gsap.to(revealItems, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "bottom 55%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      document.querySelectorAll("[data-timeline-wrap]").forEach((wrap) => {
        gsap.fromTo(
          wrap.querySelector("[data-timeline-line]"),
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 72%",
              end: "bottom 35%",
              scrub: 0.8,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 70, rotateX: -10 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            delay: (index % 3) * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-tech-card]").forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 48, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

