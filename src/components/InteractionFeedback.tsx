"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { createInterfaceAudio } from "@/lib/interfaceAudio";
import styles from "./InteractionFeedback.module.css";

const STORAGE_KEY = "portfolio-interface-sounds";
const CHANGE_EVENT = "portfolio-interface-sounds-change";
const CONTROLS = 'button, a[href], [role="button"], [role="link"], summary, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]';
let memoryPreference = true;

function soundPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? memoryPreference : saved !== "off";
  } catch { return memoryPreference; }
}

function subscribePreference(update: () => void) {
  const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) update(); };
  window.addEventListener(CHANGE_EVENT, update);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, update);
    window.removeEventListener("storage", onStorage);
  };
}

export function InteractionFeedback() {
  const enabled = useSyncExternalStore(subscribePreference, soundPreference, () => true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const audio = createInterfaceAudio();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pulses = new Map<HTMLElement, Animation>();
    const findControl = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const control = target.closest<HTMLElement>(CONTROLS);
      if (!control || control.matches(':disabled, [aria-disabled="true"]') || control.closest('[inert], [data-feedback="off"]')) return null;
      return control;
    };

    const preferenceChanged = () => { if (!soundPreference()) audio.close(); };
    const storageChanged = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) preferenceChanged();
    };

    const click = (event: MouseEvent) => {
      if (document.hidden || !event.isTrusted || event.button !== 0) return;
      const control = findControl(event.target);
      if (!control) return;
      if (soundPreference()) audio.play();
      if (reduceMotion.matches || typeof Element.prototype.animate !== "function") return;

      // Keyboard clicks originate at the control, touch/mouse clicks at the pointer.
      const rect = control.getBoundingClientRect();
      const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
      const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
      if (pulses.size >= 6) {
        const first = pulses.entries().next().value;
        if (first) { first[1].cancel(); first[0].remove(); pulses.delete(first[0]); }
      }
      const pulse = document.createElement("span");
      pulse.className = styles.pulse;
      pulse.style.left = `${x}px`;
      pulse.style.top = `${y}px`;
      overlay.appendChild(pulse);
      const animation = pulse.animate([
        { transform: "translate(-50%, -50%) scale(.25)", opacity: .65 },
        { transform: "translate(-50%, -50%) scale(.65)", opacity: .4, offset: .3 },
        { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
      ], { duration: 420, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" });
      pulses.set(pulse, animation);
      animation.onfinish = () => { pulse.remove(); pulses.delete(pulse); };
    };

    const visibility = () => { if (document.hidden) audio.suspend(); };
    document.addEventListener("click", click, true);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener(CHANGE_EVENT, preferenceChanged);
    window.addEventListener("storage", storageChanged);
    return () => {
      document.removeEventListener("click", click, true);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener(CHANGE_EVENT, preferenceChanged);
      window.removeEventListener("storage", storageChanged);
      pulses.forEach((animation, pulse) => { animation.cancel(); pulse.remove(); });
      pulses.clear();
      audio.close();
    };
  }, []);

  const toggleSound = () => {
    memoryPreference = !soundPreference();
    try { localStorage.setItem(STORAGE_KEY, memoryPreference ? "on" : "off"); } catch { /* Memory preference still works. */ }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <>
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
      <button
        type="button"
        className={styles.soundToggle}
        data-enabled={enabled}
        data-feedback="off"
        aria-label="Interface sounds"
        aria-pressed={enabled}
        title={enabled ? "Mute interface sounds" : "Enable interface sounds"}
        onClick={toggleSound}
      >
        <Volume2 className={styles.soundOn} size={17} aria-hidden="true" />
        <VolumeX className={styles.soundOff} size={17} aria-hidden="true" />
        <span className={styles.tooltip}>Sound {enabled ? "on" : "off"}</span>
      </button>
    </>
  );
}
