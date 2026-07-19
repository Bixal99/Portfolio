export const LEGAL_CURTAIN_KEY = "portfolio-legal-curtain";
export const LEGAL_CURTAIN_DOM_ID = "portfolio-legal-curtain-root";
export const DRAWER_MS = 780;
export const DRAWER_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
export const CURTAIN_HOLD_MS = 180;

export function markHorizontalCurtain(): void {
  try {
    sessionStorage.setItem(LEGAL_CURTAIN_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function peekHorizontalCurtain(): boolean {
  try {
    return sessionStorage.getItem(LEGAL_CURTAIN_KEY) === "1";
  } catch {
    return false;
  }
}

export function consumeHorizontalCurtain(): boolean {
  try {
    const v = sessionStorage.getItem(LEGAL_CURTAIN_KEY);
    if (v) sessionStorage.removeItem(LEGAL_CURTAIN_KEY);
    return v === "1";
  } catch {
    return false;
  }
}

/** Paint a full-screen left/right black cover that survives route unmounts. */
export function coverWithCurtain(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(LEGAL_CURTAIN_DOM_ID)) return;

  const root = document.createElement("div");
  root.id = LEGAL_CURTAIN_DOM_ID;
  root.setAttribute("aria-hidden", "true");
  root.style.cssText =
    "position:fixed;inset:0;z-index:10050;pointer-events:none;";

  const left = document.createElement("div");
  left.dataset.side = "left";
  left.style.cssText =
    "position:absolute;top:0;bottom:0;left:0;width:50%;background:#000;transform:translateX(0);";

  const right = document.createElement("div");
  right.dataset.side = "right";
  right.style.cssText =
    "position:absolute;top:0;bottom:0;right:0;width:50%;background:#000;transform:translateX(0);";

  root.append(left, right);
  document.body.appendChild(root);
  markHorizontalCurtain();
}

/** Slide cover halves outward, then remove the DOM node. */
export function revealCurtain(onDone?: () => void): void {
  if (typeof document === "undefined") {
    onDone?.();
    return;
  }

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const root = document.getElementById(LEGAL_CURTAIN_DOM_ID);
  if (!root) {
    consumeHorizontalCurtain();
    onDone?.();
    return;
  }

  if (reduce) {
    root.remove();
    consumeHorizontalCurtain();
    onDone?.();
    return;
  }

  const left = root.querySelector('[data-side="left"]') as HTMLElement | null;
  const right = root.querySelector('[data-side="right"]') as HTMLElement | null;
  const transition = `transform ${DRAWER_MS}ms ${DRAWER_EASE}`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (left) {
        left.style.transition = transition;
        left.style.transform = "translateX(-105%)";
      }
      if (right) {
        right.style.transition = transition;
        right.style.transform = "translateX(105%)";
      }
    });
  });

  window.setTimeout(() => {
    root.remove();
    consumeHorizontalCurtain();
    onDone?.();
  }, DRAWER_MS);
}

/** Client navigate with left/right curtain (same family as PageLoader drawers). */
export function navigateWithLegalCurtain(
  push: (href: string) => void,
  href: string,
  currentPath?: string,
): void {
  if (currentPath && href === currentPath) return;

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    push(href);
    return;
  }

  coverWithCurtain();
  push(href);
}
