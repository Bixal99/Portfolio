"use client";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNumpy,
  SiOpencv,
  SiPython,
  SiReact,
  SiStreamlit,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Database, Gamepad2, Sparkles, Workflow } from "lucide-react";
import "./MagicBento.css";

export type MagicBentoCard = {
  color?: string;
  title: string;
  description: string;
  label: string;
  href?: string;
  /** Custom body - used for stack icons and demo screen. */
  variant?: "default" | "stack" | "demo";
  technologies?: string[];
  demoUrl?: string;
};

type MagicBentoProps = {
  cards: MagicBentoCard[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
};

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "93, 211, 182";
const MOBILE_BREAKPOINT = 768;
const DEFAULT_CARD_COLOR = "#0a0a0a";

const createParticleElement = (
  x: number,
  y: number,
  color = DEFAULT_GLOW_COLOR,
) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

function ParticleCard({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}: {
  children: ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

function GlobalSpotlight({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}: {
  gridRef: RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        !!rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll(".magic-bento-card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll(".magic-bento-card").forEach((card) => {
        (card as HTMLElement).style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
}

function InteractiveCard({
  className,
  style,
  disableAnimations,
  enableTilt,
  enableMagnetism,
  clickEffect,
  glowColor,
  children,
  href,
}: {
  className: string;
  style: CSSProperties;
  disableAnimations: boolean;
  enableTilt: boolean;
  enableMagnetism: boolean;
  clickEffect: boolean;
  glowColor: string;
  children: ReactNode;
  href?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || disableAnimations) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(el, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        gsap.to(el, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (enableMagnetism) {
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
      el.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("click", handleClick);
    };
  }, [
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  if (href) {
    return (
      <a
        ref={cardRef as RefObject<HTMLAnchorElement | null>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={cardRef as RefObject<HTMLDivElement | null>}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function CardBody({
  card,
  compact = false,
}: {
  card: MagicBentoCard;
  compact?: boolean;
}) {
  const { label, title, description, variant, technologies, demoUrl, href } =
    card;

  if (variant === "stack") {
    return (
      <>
        <div className="magic-bento-card__header">
          <div className="magic-bento-card__label">{label}</div>
        </div>
        <div className="magic-bento-card__content magic-bento-card__stack">
          <div className="magic-bento-stack-icons" aria-label={description}>
            {(technologies ?? []).slice(0, 6).map((tech) => (
              <span key={tech} className="magic-bento-stack-icon" title={tech}>
                <TechGlyph name={tech} />
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (variant === "demo") {
    const url = demoUrl || href;

    return (
      <>
        <div className="magic-bento-card__header">
          <div className="magic-bento-card__label">{label}</div>
          {url ? (
            <a
              className="magic-bento-demo-open"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Open ↗
            </a>
          ) : null}
        </div>
        <div className="magic-bento-demo-screen">
          <div className="magic-bento-demo-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <div className="magic-bento-demo-url">
              {url ? url.replace(/^https?:\/\//, "") : "demo.preview"}
            </div>
          </div>
          <div className="magic-bento-demo-viewport">
            <div className="magic-bento-demo-fallback">
              <p className="magic-bento-demo-kicker">Live demo</p>
              <p className="magic-bento-card__title">{title}</p>
              <p className="magic-bento-card__description">{description}</p>
              {url ? (
                <a
                  className="magic-bento-demo-cta"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Launch demo
                </a>
              ) : (
                <p className="magic-bento-card__description">
                  Select a project to load its demo screen.
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="magic-bento-card__header">
        <div
          className="magic-bento-card__label"
          style={compact ? { fontSize: "0.72em" } : undefined}
        >
          {label}
        </div>
      </div>
      <div className="magic-bento-card__content">
        <h2
          className="magic-bento-card__title"
          style={
            compact
              ? {
                  fontSize: "0.9em",
                  ["--clamp-title" as string]: 2,
                }
              : undefined
          }
        >
          {title}
        </h2>
        <p
          className="magic-bento-card__description"
          style={
            compact
              ? {
                  fontSize: "0.68em",
                  ["--clamp-desc" as string]: 5,
                }
              : undefined
          }
        >
          {description}
        </p>
      </div>
    </>
  );
}

function TechGlyph({ name }: { name: string }) {
  const key = name.toLowerCase().replace(/[\s._-]/g, "");
  type GlyphIcon = ComponentType<{
    style?: CSSProperties;
    "aria-hidden"?: boolean;
  }>;
  const iconMap: Record<string, { Icon: GlyphIcon; color: string }> = {
    nextjs: { Icon: SiNextdotjs, color: "#ffffff" },
    typescript: { Icon: SiTypescript, color: "#3178C6" },
    javascript: { Icon: SiJavascript, color: "#F7DF1E" },
    python: { Icon: SiPython, color: "#3776AB" },
    react: { Icon: SiReact, color: "#61DAFB" },
    opencv: { Icon: SiOpencv, color: "#5C3EE8" },
    numpy: { Icon: SiNumpy, color: "#4DABCF" },
    vercel: { Icon: SiVercel, color: "#ffffff" },
    html: { Icon: SiHtml5, color: "#E34F26" },
    css: { Icon: SiCss, color: "#663399" },
    streamlit: { Icon: SiStreamlit, color: "#FF4B4B" },
    ai: { Icon: Sparkles, color: "#5DD3B6" },
    mediapipe: { Icon: Sparkles, color: "#5DD3B6" },
    fullstack: { Icon: Workflow, color: "#5DD3B6" },
    database: { Icon: Database, color: "#5DD3B6" },
    crud: { Icon: Database, color: "#5DD3B6" },
    web: { Icon: SiHtml5, color: "#E34F26" },
    automation: { Icon: Workflow, color: "#5DD3B6" },
    scraping: { Icon: Workflow, color: "#5DD3B6" },
    gamedesign: { Icon: Gamepad2, color: "#5DD3B6" },
  };
  const entry = iconMap[key];
  if (!entry) {
    return <span className="magic-bento-stack-glyph">{name.slice(0, 2)}</span>;
  }
  const { Icon, color } = entry;
  return <Icon style={{ color }} aria-hidden />;
}

export default function MagicBento({
  cards,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="card-grid bento-section" ref={gridRef}>
        {cards.map((card, index) => {
          const isFocusCard = index === 2;
          const isSpecial =
            card.variant === "stack" || card.variant === "demo";
          const baseClassName = [
            "magic-bento-card",
            textAutoHide && !isSpecial ? "magic-bento-card--text-autohide" : "",
            enableBorderGlow ? "magic-bento-card--border-glow" : "",
            card.variant === "demo" ? "magic-bento-card--demo" : "",
            card.variant === "stack" ? "magic-bento-card--stack" : "",
            isFocusCard ? "magic-bento-card--focus" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const style = {
            backgroundColor: card.color ?? DEFAULT_CARD_COLOR,
            "--glow-color": glowColor,
          } as CSSProperties;

          // Demo card keeps its own links; don't wrap the whole tile.
          const cardHref =
            card.variant === "demo" ? undefined : card.href;

          const body = <CardBody card={card} compact={isFocusCard} />;

          if (enableStars) {
            return (
              <ParticleCard
                key={`${card.label}-${index}`}
                className={baseClassName}
                style={style}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                {body}
              </ParticleCard>
            );
          }

          return (
            <InteractiveCard
              key={`${card.label}-${index}`}
              className={baseClassName}
              style={style}
              disableAnimations={shouldDisableAnimations}
              enableTilt={enableTilt}
              enableMagnetism={enableMagnetism}
              clickEffect={clickEffect && card.variant !== "demo"}
              glowColor={glowColor}
              href={cardHref}
            >
              {body}
            </InteractiveCard>
          );
        })}
      </div>
    </>
  );
}
