"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SolarSystemItem {
  id: string;
  label: string;
  type?: string;
  badge?: string;
  desc?: string;
  color: string;
  svg: React.ReactNode;
}

export interface OrbitConfig {
  id: string;
  name: string;
  radiusClass: string;
  radiusPx: number;
  speed: number;
  items: SolarSystemItem[];
}

export interface SolarSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  centerLogo?: string | React.ReactNode;
  centerLogoAlt?: string;
  orbits?: OrbitConfig[];
  isPaused?: boolean;
  speedMultiplier?: number;
}

const DEFAULT_ORBITS: OrbitConfig[] = [];

export const SolarSystem = React.forwardRef<HTMLDivElement, SolarSystemProps>(
  (
    {
      centerLogo,
      centerLogoAlt = "Core Engine",
      orbits = DEFAULT_ORBITS,
      isPaused = false,
      speedMultiplier = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const orbitPaused = isPaused;

    const dustItems = [
      { delay: "-4s", radius: "calc(var(--radius-outer) * .43)", color: "var(--accent)" },
      { delay: "-11s", radius: "calc(var(--radius-outer) * .63)", color: "#ffffff" },
      { delay: "-19s", radius: "var(--radius-mid)", color: "var(--accent)" },
      { delay: "-28s", radius: "calc(var(--radius-outer) * .94)", color: "var(--muted)" },
      { delay: "-7s", radius: "var(--radius-inner)", color: "var(--accent)" },
      { delay: "-15s", radius: "calc(var(--radius-outer) * .86)", color: "var(--accent-hover)" },
      { delay: "-23s", radius: "var(--radius-outer)", color: "var(--accent)" },
    ];

    return (
      <div
        ref={ref}
        data-orbit-paused={orbitPaused}
        className={cn(
          "solar-system-root relative mx-auto w-full max-w-[1200px] select-none",
          className,
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .solar-system-root {
            font-family: var(--font-poppins), Poppins, sans-serif;
            container-type: inline-size;
            aspect-ratio: 1.5;
            min-height: 360px;
            max-height: 760px;
            overflow: visible;
            perspective: 1600px;
            --radius-outer: min(510px, 40cqw);
            --radius-mid: calc(var(--radius-outer) * .78);
            --radius-inner: calc(var(--radius-outer) * .51);
          }

          @keyframes custom-orbitMove {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg) translateX(var(--orbit-radius));
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(-360deg) translateX(var(--orbit-radius));
            }
          }

          @keyframes custom-billboardCancel {
            0% {
              transform: translate(-50%, -50%) rotateZ(0deg) rotateY(8deg) rotateX(-58deg);
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(360deg) rotateY(8deg) rotateX(-58deg);
            }
          }

          .animate-custom-orbit {
            animation: custom-orbitMove var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-billboard {
            animation: custom-billboardCancel var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .skill-core {
            position: absolute;
            z-index: 20;
            display: grid;
            place-items: center;
            width: 78px;
            height: 78px;
            border: 1px solid var(--edge);
            border-radius: 16px;
            background: var(--background);
            color: var(--foreground);
            pointer-events: none;
          }
          .skill-core-corners {
            position: absolute;
            inset: -6px;
            width: calc(100% + 12px);
            height: calc(100% + 12px);
            fill: none;
            stroke: var(--accent);
            stroke-width: 1.1;
            stroke-linecap: round;
            opacity: .7;
          }
          .skill-core-image { max-width: 70%; max-height: 70%; object-fit: contain; }
          @media (max-width: 767px) {
            .skill-core { width: 58px; height: 58px; border-radius: 12px; }
          }

          .orbit-logo-card {
            position: absolute;
            left: 50%;
            top: 50%;
            display: grid;
            place-items: center;
            width: 3.1rem;
            height: 3.1rem;
            padding: 0;
            background: var(--surface);

            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 9999px;
            color: var(--foreground);
            user-select: none;
            cursor: pointer;
            pointer-events: auto;
            touch-action: manipulation;
            transition: border-color 0.08s ease, background 0.08s ease, box-shadow 0.08s ease, scale 0.08s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }

          .orbit-logo-card::before {
            content: none;
          }

          @media (min-width: 768px) {
            .orbit-logo-card {
              width: 3.75rem;
              height: 3.75rem;
            }

            .orbit-logo-card::before {
              inset: -16px;
            }
          }

          .orbit-tooltip {
            position: absolute;
            left: 50%;
            bottom: calc(100% + 10px);
            transform: translateX(-50%);
            padding: 0.35rem 0.7rem;
            border-radius: 0.4rem;
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: var(--surface-soft);
            color: var(--foreground);
            font-family: var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.02em;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.08s ease;
            box-shadow: 0 8px 28px rgba(0, 0, 0, 0.55);
            z-index: 40;
          }

          .orbit-tooltip.is-visible {
            opacity: 1;
          }

          .solar-system-root[data-orbit-paused="true"] * {
            animation-play-state: paused !important;
          }
          .orbit-logo-card:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 5px;
          }
          @media (prefers-reduced-motion: reduce) {
            .solar-system-root * { animation: none !important; transition: none !important; }
            .solar-system-root .animate-custom-orbit {
              transform: translate(-50%, -50%) rotateZ(var(--orbit-angle, 0deg)) translateX(var(--orbit-radius)) !important;
            }
            .solar-system-root .animate-custom-billboard {
              transform: translate(-50%, -50%) rotateZ(calc(-1 * var(--orbit-angle, 0deg))) rotateY(8deg) rotateX(-58deg) !important;
            }
            .solar-system-root .solar-dust { display: none; }
          }
        `,
          }}
        />

        <div
          className="absolute left-1/2 top-[46%] flex h-full w-full items-center justify-center"
          style={{
            transform:
              "translate(-50%, -50%) rotateX(58deg) rotateY(-8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="skill-core"
            role="img"
            aria-label={centerLogoAlt}
            style={{
              transform: "rotateY(8deg) rotateX(-58deg)",
            }}
          >
            {centerLogo ? (
              typeof centerLogo === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="skill-core-image"
                  src={centerLogo}
                  alt={centerLogoAlt}
                  width={96}
                  height={96}
                />
              ) : (
                centerLogo
              )
            ) : (
              <span>MB</span>
            )}

            <svg className="skill-core-corners" viewBox="0 0 90 90" aria-hidden="true"><path d="M5 21V13a8 8 0 0 1 8-8h8M69 5h8a8 8 0 0 1 8 8v8M85 69v8a8 8 0 0 1-8 8h-8M21 85h-8a8 8 0 0 1-8-8v-8" /></svg>
          </div>

          {dustItems.map((dust, idx) => (
            <div
              key={idx}
              className="solar-dust animate-custom-orbit pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full opacity-70"
              style={{
                background: dust.color,
                boxShadow: `0 0 8px ${dust.color}, 0 0 16px ${dust.color}`,
                animationDelay: dust.delay,
                animationPlayState: orbitPaused ? "paused" : "running",
                animationDuration: `${24 / speedMultiplier}s`,
                ["--orbit-radius" as string]: dust.radius,
                ["--orbit-duration" as string]: `${24 / speedMultiplier}s`,
                ["--orbit-play-state" as string]: orbitPaused
                  ? "paused"
                  : "running",
              }}
            />
          ))}

          {orbits.map((orbit) => (
            <React.Fragment key={orbit.id}>
              <div
                className="pointer-events-none absolute rounded-full border border-dashed border-[rgba(var(--accent-rgb),0.55)]"
                style={{
                  width: `calc(2 * ${orbit.radiusClass})`,
                  height: `calc(2 * ${orbit.radiusClass})`,
                  boxShadow:
                    "0 0 10px rgba(var(--accent-rgb), 0.55), 0 0 28px rgba(var(--accent-rgb), 0.28), 0 0 48px rgba(var(--accent-rgb), 0.12), inset 0 0 18px rgba(var(--accent-rgb), 0.08)",
                  ["--orbit-radius" as string]: orbit.radiusClass,
                }}
              />

              {orbit.items.map((item, idx, arr) => {
                // Stagger orbit start angles so rings don't stack icons on the same rays
                const phase =
                  orbit.id === "mid" ? 0.12 : orbit.id === "outer" ? 0.22 : 0;
                const delayValue =
                  -(orbit.speed / arr.length) * idx - orbit.speed * phase;
                const durationValue = orbit.speed / speedMultiplier;
                const staticAngle = -360 * (idx / arr.length + phase);
                const isHovered = hoveredId === item.id;
                const playState = orbitPaused ? "paused" : "running";

                return (
                  <div
                    key={item.id}
                    className="animate-custom-orbit pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
                    style={{
                      animationDelay: `${delayValue}s`,
                      animationDuration: `${durationValue}s`,
                      animationPlayState: playState,
                      ["--orbit-radius" as string]: orbit.radiusClass,
                      ["--orbit-duration" as string]: `${durationValue}s`,
                      ["--orbit-play-state" as string]: playState,
                      ["--hover-color" as string]: item.color,
                      ["--orbit-angle" as string]: `${staticAngle}deg`,
                      zIndex: isHovered ? 40 : 10,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute right-0 top-1/2 z-0 h-[2px] origin-right -translate-y-1/2 transition-opacity duration-150 ease-out"
                      style={{
                        width: orbit.radiusClass,
                        opacity: isHovered ? 1 : 0,
                        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(var(--accent-rgb),0.35) 18%, ${item.color} 78%, ${item.color} 100%)`,
                        boxShadow: isHovered
                          ? `0 0 8px ${item.color}, 0 0 18px ${item.color}aa, 0 0 32px rgba(var(--accent-rgb),0.45)`
                          : "none",
                      }}
                    />

                    <button
                      type="button"
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      onPointerEnter={() => setHoveredId(item.id)}
                      onPointerLeave={() => setHoveredId(null)}
                      className="orbit-logo-card animate-custom-billboard"
                      aria-label={item.label}
                      style={{
                        animationDelay: `${delayValue}s`,
                        animationDuration: `${durationValue}s`,
                        animationPlayState: playState,
                        borderColor: isHovered ? item.color : undefined,
                        boxShadow: isHovered
                          ? `0 0 20px rgba(0, 0, 0, 0.6), 0 0 15px ${item.color}35`
                          : undefined,
                        scale: isHovered ? 1.1 : 1,
                        ["--orbit-duration" as string]: `${durationValue}s`,
                        ["--orbit-play-state" as string]: playState,
                      }}
                    >
                      <span
                        className="pointer-events-none transition-transform duration-75"
                        style={{
                          transform: isHovered ? "scale(1.12)" : "scale(1)",
                          color: item.color,
                        }}
                      >
                        {item.svg}
                      </span>
                      <span
                        className={`orbit-tooltip${isHovered ? " is-visible" : ""}`}
                        style={{
                          borderColor: isHovered
                            ? `${item.color}66`
                            : undefined,
                          boxShadow: isHovered
                            ? `0 8px 28px rgba(0,0,0,0.55), 0 0 16px ${item.color}33`
                            : undefined,
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
);

SolarSystem.displayName = "SolarSystem";
