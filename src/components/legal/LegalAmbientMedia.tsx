type LegalAmbientBackdropProps = {
  title: string;
};

/** Gradient-only atmosphere — no photos or posters on legal pages. */
export function LegalAmbientBackdrop({ title }: LegalAmbientBackdropProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -left-1/4 top-[-20%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.2),transparent_68%)] blur-2xl" />
      <div className="absolute -right-1/5 bottom-[-10%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent" />
      <span className="sr-only">{title} backdrop</span>
    </div>
  );
}
