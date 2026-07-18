"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/Lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full min-h-[420px] w-full items-center justify-center"
      aria-hidden="true"
    >
      <div className="size-40 rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-2xl" />
    </div>
  ),
});

export function AboutLanyard() {
  return (
    <div
      data-about-lanyard
      className="relative mx-auto w-full max-w-xl cursor-grab md:mx-0 md:ml-auto md:max-w-none"
      aria-label="Interactive ID card"
    >
      <div className="cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] active:cursor-grabbing">
        <div className="relative h-[min(70vh,560px)] w-full md:h-[min(72vh,620px)]">
          <Lanyard
            position={[0, 0, 13]}
            gravity={[0, -40, 0]}
            fov={18}
            frontImage="/Me.jpeg"
            backImage="/Me.jpeg"
            imageFit="cover"
            lanyardWidth={1}
            cardScale={2.7}
            hangY={4.7}
          />
        </div>
      </div>
    </div>
  );
}
