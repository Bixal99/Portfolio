"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollAnimator() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-animate]",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-pixel-title]")
        .forEach((title) => {
          const pixels = gsap.utils.toArray<HTMLElement>(
            title.querySelectorAll("[data-pixel-item]"),
          );
          if (!pixels.length) return;

          gsap.fromTo(
            pixels,
            { autoAlpha: 0, x: -12 },
            {
              autoAlpha: 1,
              x: 0,
              stagger: 0.02,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: title,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      const setupBulletAnimation = (selector: string, trigger: string) => {
        const bullets = gsap.utils.toArray<HTMLElement>(selector);
        const triggerElement = document.querySelector<HTMLElement>(trigger);
        if (!bullets.length || !triggerElement) return;

        gsap.fromTo(
          bullets,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerElement,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      };

      setupBulletAnimation("[data-about-bullet]", "[data-about-panel]");

      const aboutLanyard = document.querySelector<HTMLElement>(
        "[data-about-lanyard]",
      );
      if (aboutLanyard) {
        gsap.fromTo(
          aboutLanyard,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#about",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = group.querySelectorAll("[data-stagger-item]");
        if (!children.length) return;

        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
