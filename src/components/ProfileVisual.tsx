import Image from "next/image";

export function ProfileVisual() {
  return (
    <div data-hero-animate data-parallax className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div className="absolute -inset-6 border border-white/8 bg-white/[0.015]" aria-hidden="true" />
      <div className="relative overflow-hidden border border-white/14 bg-[#070707] shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
        <Image
          src="/Me.jpeg"
          alt="Portrait of Mohammad Bilal"
          width={896}
          height={1195}
          priority
          className="aspect-[4/5] w-full object-cover object-[50%_28%] opacity-95 grayscale-[12%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}
