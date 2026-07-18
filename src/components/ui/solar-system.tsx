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
      { delay: "-4s", radius: "200px", color: "#5dd3b6" },
      { delay: "-11s", radius: "280px", color: "#ffffff" },
      { delay: "-19s", radius: "340px", color: "#5dd3b6" },
      { delay: "-28s", radius: "400px", color: "#94a3b8" },
      { delay: "-7s", radius: "240px", color: "#5dd3b6" },
      { delay: "-15s", radius: "360px", color: "#eab308" },
      { delay: "-23s", radius: "420px", color: "#5dd3b6" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "solar-system-root relative flex h-[400px] w-full max-w-[1200px] select-none items-center justify-center overflow-visible perspective-[1200px] md:h-[560px]",
          className,
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .solar-system-root {
            --radius-inner: 280px;
            --radius-mid: 430px;
            --radius-outer: 520px;
            --radius-far: 610px;
          }

          @media (max-width: 768px) {
            .solar-system-root {
              --radius-inner: 150px;
              --radius-mid: 230px;
              --radius-outer: 300px;
              --radius-far: 365px;
            }
          }

          @media (max-width: 480px) {
            .solar-system-root {
              --radius-inner: 115px;
              --radius-mid: 175px;
              --radius-outer: 230px;
              --radius-far: 280px;
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
              transform: translate(-50%, -50%) rotateZ(0deg) rotateY(10deg) rotateX(-65deg);
            }
            100% {
              transform: translate(-50%, -50%) rotateZ(360deg) rotateY(10deg) rotateX(-65deg);
            }
          }

          @keyframes custom-sun-pulse {
            0% { transform: scale(0.9); opacity: 0.7; }
            100% { transform: scale(1.1); opacity: 1; }
          }

          @keyframes custom-spin-clockwise {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(360deg); }
          }
          @keyframes custom-spin-counter {
            0% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateY(-10deg) rotateZ(-360deg); }
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
            width: 3rem;
            height: 3rem;
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
            inset: -14px;
            border-radius: 9999px;
          }

          @media (min-width: 768px) {
            .orbit-logo-card {
              width: 3.4rem;
              height: 3.4rem;
            }

            .orbit-logo-card::before {
              inset: -18px;
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
          className="absolute flex h-[440px] w-[440px] items-center justify-center md:h-[1200px] md:w-[1200px]"
          style={{
            transform: "rotateX(65deg) rotateY(-10deg) translateY(-12%)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="pointer-events-none absolute z-20 flex h-[100px] w-[100px] items-center justify-center md:h-[130px] md:w-[130px]"
            style={{
              transform: "rotateY(10deg) rotateX(-65deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="animate-custom-sun-pulse absolute z-10 h-[90px] w-[90px] rounded-full bg-[rgba(var(--accent-rgb),0.22)] blur-md filter md:h-[120px] md:w-[120px]" />

            {centerLogo ? (
              typeof centerLogo === "string" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="relative z-20 h-14 w-14 rounded-full border-2 border-[var(--accent)]/40 bg-black p-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] md:h-20 md:w-20 md:p-3"
                  src={centerLogo}
                  alt={centerLogoAlt}
                  width={80}
                  height={80}
                />
              ) : (
                <div className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--accent)]/40 bg-black p-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] md:h-20 md:w-20">
                  {centerLogo}
                </div>
              )
            ) : (
              <div className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--accent)]/40 bg-black p-2 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] md:h-20 md:w-20">
                <OrbitIcon
                  className="h-8 w-8 animate-spin text-[var(--accent)]"
                  style={{ animationDuration: "10s" }}
                />
              </div>
            )}

            <div className="animate-custom-spin-cw pointer-events-none absolute h-[110px] w-[110px] rounded-full border border-dashed border-[var(--accent)]/55 shadow-[0_0_12px_rgba(var(--accent-rgb),0.45),0_0_28px_rgba(var(--accent-rgb),0.2)] md:h-[140px] md:w-[140px]" />
            <div className="animate-custom-spin-ccw pointer-events-none absolute h-[150px] w-[150px] rounded-full border border-dashed border-[var(--accent)]/35 shadow-[0_0_10px_rgba(var(--accent-rgb),0.3),0_0_24px_rgba(var(--accent-rgb),0.15)] md:h-[185px] md:w-[185px]" />
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
                const delayValue = -(orbit.speed / arr.length) * idx;
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
                      className="pointer-events-none absolute right-0 top-1/2 z-0 h-[2px] origin-right -translate-y-1/2 transition-opacity duration-75"
                      style={{
                        width: orbit.radiusClass,
                        opacity: isHovered ? 1 : 0.45,
                        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(var(--accent-rgb),0.35) 18%, ${item.color} 78%, ${item.color} 100%)`,
                        boxShadow: `0 0 8px ${item.color}, 0 0 18px ${item.color}aa, 0 0 32px rgba(var(--accent-rgb),0.45)`,
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
