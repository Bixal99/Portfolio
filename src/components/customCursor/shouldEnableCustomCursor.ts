export function shouldEnableCustomCursor(): boolean {
  if (typeof window === "undefined") return false;

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return finePointer && !reduceMotion;
}
