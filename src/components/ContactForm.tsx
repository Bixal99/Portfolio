"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import gsap from "gsap";
import { motion } from "motion/react";

type FieldControl = HTMLInputElement | HTMLTextAreaElement;

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
};

function resetFieldVisuals(form: HTMLFormElement) {
  const controls = Array.from(form.querySelectorAll<FieldControl>("[data-field-control]"));

  controls.forEach((control) => {
    const shell = control.closest<HTMLElement>("[data-field-shell]");
    const label = shell?.querySelector<HTMLElement>("[data-field-label]");
    const line = shell?.querySelector<HTMLElement>("[data-field-underline]");
    const meter = shell?.querySelector<HTMLElement>("[data-field-meter]");

    if (shell) {
      gsap.to(shell, {
        backgroundColor: "rgba(0,0,0,0.5)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
        scale: 1,
        duration: 0.28,
        ease: "power2.out",
      });
    }

    if (label) {
      gsap.to(label, {
        color: "rgba(255,255,255,0.58)",
        x: 0,
        letterSpacing: "0.22em",
        duration: 0.28,
        ease: "power2.out",
      });
    }

    if (line) {
      gsap.to(line, { scaleX: 0, duration: 0.24, ease: "power2.out" });
    }

    if (meter) {
      gsap.to(meter, { scaleX: 0, duration: 0.24, ease: "power2.out" });
    }
  });
}

function FormField({ label, name, type = "text", placeholder, multiline = false, rows = 10 }: FieldProps) {
  const controlClass = "relative z-10 w-full bg-transparent text-base text-white outline-none transition-[caret-color] placeholder:text-white/25 focus:placeholder:text-white/38";

  return (
    <label
      data-field-shell
      className="group relative grid gap-3 overflow-hidden rounded-xl bg-black/50 px-4 py-3 shadow-[var(--shadow-border),inset_0_1px_0_rgba(255,255,255,0.06)] transition-[box-shadow,background-color] duration-150"
    >
      <span
        data-field-label
        className="relative z-10 text-[11px] font-bold uppercase leading-none tracking-[0.22em] text-white/58"
      >
        {label}
      </span>
      {multiline ? (
        <textarea
          suppressHydrationWarning
          data-field-control
          name={name}
          required
          rows={rows}
          placeholder={placeholder}
          className={`${controlClass} min-h-[260px] resize-none py-1 leading-7`}
        />
      ) : (
        <input
          suppressHydrationWarning
          data-field-control
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className={`${controlClass} min-h-9`}
        />
      )}
      <span
        data-field-underline
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[var(--accent)] shadow-[0_0_24px_rgba(var(--accent-rgb),0.7)]"
      />
      <span
        data-field-meter
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] via-white to-[var(--accent)] opacity-75"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(var(--accent-rgb),0.08),transparent_38%,rgba(255,255,255,0.035))] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
      />
    </label>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!form || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set("[data-field-underline], [data-field-meter]", {
        transformOrigin: "left center",
      });

      gsap.fromTo(
        "[data-field-shell]",
        { autoAlpha: 0, y: 24, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          ease: "power3.out",
          stagger: 0.055,
          delay: 0.18,
        },
      );
    }, form);

    const controls = Array.from(form.querySelectorAll<FieldControl>("[data-field-control]"));
    const cleanups = controls.map((control) => {
      const shell = control.closest<HTMLElement>("[data-field-shell]");
      const label = shell?.querySelector<HTMLElement>("[data-field-label]");
      const line = shell?.querySelector<HTMLElement>("[data-field-underline]");
      const meter = shell?.querySelector<HTMLElement>("[data-field-meter]");
      const maxVisualLength = control instanceof HTMLTextAreaElement ? 220 : 72;

      const activate = () => {
        if (shell) {
          gsap.to(shell, {
            backgroundColor: "rgba(255,255,255,0.045)",
            boxShadow: "0 0 0 1px rgba(var(--accent-rgb),0.18), 0 18px 46px rgba(var(--accent-rgb),0.11), inset 0 1px 0 rgba(255,255,255,0.1)",
            scale: 1.01,
            duration: 0.32,
            ease: "power3.out",
          });
        }

        if (label) {
          gsap.to(label, {
            color: "var(--accent)",
            x: 4,
            letterSpacing: "0.28em",
            duration: 0.3,
            ease: "power3.out",
          });
        }

        if (line) {
          gsap.to(line, { scaleX: 1, duration: 0.42, ease: "power4.out" });
        }
      };

      const settle = () => {
        if (control.value.trim()) {
          return;
        }

        if (shell) {
          gsap.to(shell, {
            backgroundColor: "rgba(0,0,0,0.5)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (label) {
          gsap.to(label, {
            color: "rgba(255,255,255,0.58)",
            x: 0,
            letterSpacing: "0.22em",
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (line) {
          gsap.to(line, { scaleX: 0, duration: 0.3, ease: "power2.out" });
        }

        if (meter) {
          gsap.to(meter, { scaleX: 0, duration: 0.24, ease: "power2.out" });
        }
      };

      const respondToInput = () => {
        const progress = Math.min(1, Math.max(0.08, control.value.length / maxVisualLength));

        if (meter) {
          gsap.to(meter, { scaleX: control.value ? progress : 0, duration: 0.22, ease: "power2.out" });
        }

        if (shell) {
          gsap.fromTo(
            shell,
            { boxShadow: "0 0 0 1px rgba(var(--accent-rgb),0.28), 0 0 28px rgba(var(--accent-rgb),0.16)" },
            {
              boxShadow: "0 0 0 1px rgba(var(--accent-rgb),0.18), 0 18px 46px rgba(var(--accent-rgb),0.11), inset 0 1px 0 rgba(255,255,255,0.1)",
              duration: 0.34,
              ease: "power2.out",
            },
          );
        }
      };

      control.addEventListener("focus", activate);
      control.addEventListener("blur", settle);
      control.addEventListener("input", respondToInput);

      return () => {
        control.removeEventListener("focus", activate);
        control.removeEventListener("blur", settle);
        control.removeEventListener("input", respondToInput);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <form
      ref={formRef}
      data-animate
      data-footer-reveal
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.reset();
        resetFieldVisuals(event.currentTarget);
        setSent(true);
      }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.035] p-5 shadow-[var(--shadow-border),0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--accent)] before:to-transparent sm:p-7 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(var(--accent-rgb),0.07),transparent_32%,rgba(255,255,255,0.035)_72%,transparent)]"
      />
      <div className="relative grid gap-4 sm:grid-cols-2">
        <FormField label="Name" name="name" placeholder="Your name" />
        <FormField label="Email" name="email" type="email" placeholder="you@example.com" />
      </div>

      <div className="relative mt-4">
        <FormField label="Subject" name="subject" placeholder="What should we build?" />
      </div>

      <div className="relative mt-4">
        <FormField
          label="Message"
          name="message"
          placeholder="Share the goal, timeline, or problem you want to solve."
          multiline
          rows={10}
        />
      </div>

      <div className="relative mt-auto flex flex-col items-stretch gap-4 pt-8 sm:flex-row sm:items-center sm:justify-end">
        <motion.button
          type="submit"
          suppressHydrationWarning
          whileHover={{ y: -3 }}
          whileTap={{ y: 0, scale: 0.96 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[var(--accent)] py-4 pl-4 pr-5 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_18px_52px_rgba(var(--accent-rgb),0.22)] transition-colors duration-150 hover:bg-white sm:w-auto"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-white/35 opacity-0 transition-[left,opacity] duration-500 group-hover:left-[125%] group-hover:opacity-100"
          />
          <Send className="relative z-10 size-4" aria-hidden="true" />
          <span className="relative z-10">Send Message</span>
        </motion.button>
        {sent ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-sm text-[var(--accent)]"
            role="status"
          >
            Message noted. Use the email link if you want to send it directly.
          </motion.p>
        ) : null}
      </div>
    </form>
  );
}