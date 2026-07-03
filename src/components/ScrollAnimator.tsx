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
        { autoAlpha: 0, y: 46, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.11,
          ease: "power4.out",
          delay: 1.65,
        },
      );

      gsap.fromTo(
        "[data-hero-name-word]",
        { yPercent: 22, scaleX: 0.96, filter: "blur(8px)" },
        {
          yPercent: 0,
          scaleX: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          delay: 1.82,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 84, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              end: "bottom 18%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const setupPixelTitle = (title: HTMLElement) => {
        const pixels = gsap.utils.toArray<HTMLElement>(
          title.querySelectorAll("[data-pixel-item]"),
        );

        if (!pixels.length) return;

        gsap.fromTo(
          pixels,
          {
            autoAlpha: 0,
            x: (index) => (index < 2 ? -150 : -96 - index * 6),
            y: (index) => (index % 2 === 0 ? -22 : 22),
            scale: (index) => (index < 2 ? 0.34 : 0.68),
            rotationZ: (index) => (index % 2 === 0 ? -12 : 12),
            transformOrigin: "0% 50%",
            filter: "blur(16px) contrast(1.7)",
            clipPath: "inset(0 100% 0 0)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationZ: 0,
            filter: "blur(0px) contrast(1)",
            clipPath: "inset(0 0% 0 0)",
            stagger: { each: 0.07, from: "start" },
            ease: "power2.out",
            immediateRender: true,
            scrollTrigger: {
              trigger: title,
              start: "top 88%",
              end: "top 38%",
              scrub: 1.35,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      gsap.utils
        .toArray<HTMLElement>("[data-pixel-title]")
        .forEach(setupPixelTitle);

      [
        { selector: "[data-about-bullet]", trigger: "[data-about-panel]" },
        { selector: "[data-build-list] > li", trigger: "[data-coding-panel]" },
      ].forEach(({ selector, trigger }) => {
        const bullets = gsap.utils.toArray<HTMLElement>(selector);
        const triggerElement = document.querySelector<HTMLElement>(trigger);

        if (!bullets.length || !triggerElement) return;

        gsap.fromTo(
          bullets,
          {
            autoAlpha: 0,
            x: -72,
            y: 18,
            filter: "blur(14px)",
            clipPath: "inset(0 100% 0 0)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0% 0 0)",
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerElement,
              start: "top 78%",
              end: "center 42%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = group.querySelectorAll("[data-stagger-item]");
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 58, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.78,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              end: "bottom 15%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}