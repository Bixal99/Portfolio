"use client";

import React, { useState } from "react";
import { Orbit as OrbitIcon } from "lucide-react";
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

    const dustItems = [
      { delay: "-4s", radius: "220px", color: "#5dd3b6" },
      { delay: "-11s", radius: "320px", color: "#ffffff" },
      { delay: "-19s", radius: "400px", color: "#5dd3b6" },
      { delay: "-28s", radius: "480px", color: "#94a3b8" },
      { delay: "-7s", radius: "260px", color: "#5dd3b6" },
      { delay: "-15s", radius: "440px", color: "#eab308" },
      { delay: "-23s", radius: "520px", color: "#5dd3b6" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "solar-system-root relative mx-auto flex h-[480px] w-full max-w-full select-none items-start justify-center overflow-hidden perspective-[1200px] pt-2 sm:h-[560px] sm:pt-4 md:h-[680px] md:max-w-[1200px] lg:h-[760px]",
          className,
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .solar-system-root {
            --radius-inner: 260px;
            --radius-mid: 400px;
            --radius-outer: 510px;
            --radius-far: 580px;
          }

          @media (max-width: 768px) {
            .solar-system-root {
              --radius-inner: 160px;
              --radius-mid: 245px;
              --radius-outer: 310px;
              --radius-far: 355px;
            }
          }

          @media (max-width: 480px) {
            .solar-system-root {
              --radius-inner: 135px;
              --radius-mid: 205px;
              --radius-outer: 265px;
              --radius-far: 305px;
            }
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

          @keyframes custom-sun-pulse {
            0% { transform: scale(0.9); opacity: 0.7; }
            100% { transform: scale(1.1); opacity: 1; }
          }

          @keyframes custom-spin-clockwise {
            0% { transform: rotateX(58deg) rotateY(-8deg) rotateZ(0deg); }
            100% { transform: rotateX(58deg) rotateY(-8deg) rotateZ(360deg); }
          }
          @keyframes custom-spin-counter {
            0% { transform: rotateX(58deg) rotateY(-8deg) rotateZ(0deg); }
            100% { transform: rotateX(58deg) rotateY(-8deg) rotateZ(-360deg); }
          }

          .animate-custom-orbit {
            animation: custom-orbitMove var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-billboard {
            animation: custom-billboardCancel var(--orbit-duration) linear infinite;
            animation-play-state: var(--orbit-play-state);
          }
          .animate-custom-sun-pulse {
            animation: custom-sun-pulse 4s ease-in-out infinite alternate;
          }
          .animate-custom-spin-cw {
            animation: custom-spin-clockwise 20s linear infinite;
          }
          .animate-custom-spin-ccw {
            animation: custom-spin-counter 30s linear infinite;
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
            background: rgba(0, 0, 0, 0.78);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 9999px;
            color: #ffffff;
            user-select: none;
            cursor: pointer;
            pointer-events: auto;
            touch-action: manipulation;
            transition: border-color 0.08s ease, background 0.08s ease, box-shadow 0.08s ease, scale 0.08s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }

          /* Larger invisible hit area around the whole circle */
          .orbit-logo-card::before {
            content: '';
            position: absolute;
            inset: -12px;
            border-radius: 9999px;
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
            background: rgba(0, 0, 0, 0.92);
            color: #fff;
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
        `,
          }}
        />

        <div
          className="absolute left-1/2 top-[42%] flex h-[640px] w-[640px] items-center justify-center sm:h-[780px] sm:w-[780px] md:top-[46%] md:h-[1200px] md:w-[1200px]"
          style={{
            transform:
              "translate(-50%, -50%) rotateX(58deg) rotateY(-8deg) translateY(-2%)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="pointer-events-none absolute z-20 flex h-[110px] w-[110px] items-center justify-center md:h-[150px] md:w-[150px]"
            style={{
              transform: "rotateY(8deg) rotateX(-58deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="animate-custom-sun-pulse absolute z-10 h-[100px] w-[100px] rounded-full bg-[rgba(var(--accent-rgb),0.22)] blur-md filter md:h-[140px] md:w-[140px]" />

            {centerLogo ? (
              typeof centerLogo === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="relative z-20 h-16 w-16 rounded-full border-2 border-[var(--accent)]/40 bg-black p-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] outline outline-1 -outline-offset-1 outline-white/10 md:h-24 md:w-24 md:p-3"
                  src={centerLogo}
                  alt={centerLogoAlt}
                  width={96}
                  height={96}
                />
              ) : (
                <div className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--accent)]/40 bg-black p-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] md:h-24 md:w-24">
                  {centerLogo}
                </div>
              )
            ) : (
              <div className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--accent)]/40 bg-black p-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] md:h-24 md:w-24">
                <OrbitIcon
                  className="h-9 w-9 animate-spin text-[var(--accent)]"
                  style={{ animationDuration: "10s" }}
                />
              </div>
            )}

            <div className="animate-custom-spin-cw pointer-events-none absolute h-[125px] w-[125px] rounded-full border border-dashed border-[var(--accent)]/55 shadow-[0_0_12px_rgba(var(--accent-rgb),0.45),0_0_28px_rgba(var(--accent-rgb),0.2)] md:h-[160px] md:w-[160px]" />
            <div className="animate-custom-spin-ccw pointer-events-none absolute h-[165px] w-[165px] rounded-full border border-dashed border-[var(--accent)]/35 shadow-[0_0_10px_rgba(var(--accent-rgb),0.3),0_0_24px_rgba(var(--accent-rgb),0.15)] md:h-[210px] md:w-[210px]" />
          </div>

          {dustItems.map((dust, idx) => (
            <div
              key={idx}
              className="animate-custom-orbit pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full opacity-70"
              style={{
                background: dust.color,
                boxShadow: `0 0 8px ${dust.color}, 0 0 16px ${dust.color}`,
                animationDelay: dust.delay,
                animationPlayState: isPaused ? "paused" : "running",
                animationDuration: `${24 / speedMultiplier}s`,
                ["--orbit-radius" as string]: dust.radius,
                ["--orbit-duration" as string]: `${24 / speedMultiplier}s`,
                ["--orbit-play-state" as string]: isPaused
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
                const isHovered = hoveredId === item.id;
                const playState = isPaused ? "paused" : "running";

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

                    <div
                      onPointerEnter={() => setHoveredId(item.id)}
                      onPointerLeave={() => setHoveredId(null)}
                      onPointerDown={() => setHoveredId(item.id)}
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
                      <div
                        className="pointer-events-none transition-transform duration-75"
                        style={{
                          transform: isHovered ? "scale(1.12)" : "scale(1)",
                          color: item.color,
                        }}
                      >
                        {item.svg}
                      </div>
                      <div
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
                      </div>
                    </div>
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
