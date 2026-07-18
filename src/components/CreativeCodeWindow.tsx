"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileCode2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const files = [
  {
    name: "greeting.py",
    accent: "text-[var(--accent)]",
    label: "Intro",
    lines: [
      "name = \"Bilal\"",
      "energy = 100",
      "",
      "if energy > 70:",
      "    print(f\"{name} is ready to build.\")",
      "else:",
      "    print(\"Coffee first, code second.\")",
    ],
  },
  {
    name: "coffee.py",
    accent: "text-[#c084fc]",
    label: "Coffee",
    lines: [
      "cups = 2",
      "deadline = \"tonight\"",
      "",
      "if cups >= 2:",
      "    print(\"Ship the feature.\")",
      "else:",
      "    print(\"Brew one more cup.\")",
    ],
  },
  {
    name: "focus.py",
    accent: "text-[#8ab4ff]",
    label: "Focus",
    lines: [
      "notifications = False",
      "playlist = \"lofi\"",
      "",
      "if not notifications:",
      "    print(\"Deep work mode is on.\")",
      "else:",
      "    print(\"Mute the noise and restart.\")",
    ],
  },
  {
    name: "weekend.py",
    accent: "text-[#fb923c]",
    label: "Fun",
    lines: [
      "bugs = 0",
      "pizza = True",
      "",
      "if bugs == 0 and pizza:",
      "    print(\"Weekend unlocked.\")",
      "else:",
      "    print(\"One last commit.\")",
    ],
  },
  {
    name: "deploy.py",
    accent: "text-[#34d399]",
    label: "Deploy",
    lines: [
      "build_passed = True",
      "server_awake = True",
      "",
      "if build_passed and server_awake:",
      "    print(\"Launch it clean.\")",
      "else:",
      "    print(\"Fix, test, deploy again.\")",
    ],
  },
  {
    name: "idea.py",
    accent: "text-[#facc15]",
    label: "Idea",
    lines: [
      "idea = \"tiny app\"",
      "time = \"midnight\"",
      "",
      "if idea and time:",
      "    print(\"Prototype before sleep.\")",
      "else:",
      "    print(\"Save it for morning.\")",
    ],
  },
  {
    name: "client.py",
    accent: "text-[#38bdf8]",
    label: "Client",
    lines: [
      "message_sent = True",
      "reply_fast = True",
      "",
      "if message_sent and reply_fast:",
      "    print(\"Project momentum is high.\")",
      "else:",
      "    print(\"Follow up with clarity.\")",
    ],
  },
  {
    name: "solve_error.py",
    accent: "text-[#f472b6]",
    label: "Debug",
    lines: [
      "error_fixed = True",
      "tests_green = True",
      "",
      "if error_fixed and tests_green:",
      "    print(\"Push with confidence.\")",
      "else:",
      "    print(\"Read logs, then try again.\")",
    ],
  },
];

const TYPE_DELAY_MS = 50;
const LOOP_DELAY_MS = 3000;
const codeFontFamily =
  '"JetBrains Mono", "SFMono-Regular", "Cascadia Code", "Cascadia Mono", "Fira Code", Consolas, monospace';

function highlight(line: string) {
  const parts = line.split(
    /(f".*?"|".*?"|\bclass\b|\bdef\b|\bif\b|\belse\b|\breturn\b|\bprint\b|\bTrue\b|\bFalse\b|\band\b|\bnot\b|\bself\b)/g,
  );

  return parts.map((part, index) => {
    if (/^(class|def|return|and|not)$/.test(part)) {
      return (
        <span key={index} className="text-[#635bff]">
          {part}
        </span>
      );
    }

    if (/^(if|else)$/.test(part)) {
      return (
        <span key={index} className="text-[var(--accent)]">
          {part}
        </span>
      );
    }

    if (part === "print") {
      return (
        <span key={index} className="text-[#8ab4ff]">
          {part}
        </span>
      );
    }

    if (/^(True|False)$/.test(part)) {
      return (
        <span key={index} className="text-[#c084fc]">
          {part}
        </span>
      );
    }

    if (part === "self") {
      return (
        <span key={index} className="text-[#7c3aed]">
          {part}
        </span>
      );
    }

    if (/^f?".*"$/.test(part)) {
      return (
        <span key={index} className="text-[#00d69d]">
          {part}
        </span>
      );
    }

    return part;
  });
}

type CreativeCodeWindowProps = {
  cardOnly?: boolean;
};

export function CreativeCodeWindow({ cardOnly = false }: CreativeCodeWindowProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFile, setActiveFile] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const currentFile = files[activeFile] ?? files[0];
  const fullText = useMemo(() => currentFile.lines.join("\n"), [currentFile]);
  const codeFontStyle = useMemo(
    () => ({
      fontFamily: codeFontFamily,
      fontWeight: 700,
    }),
    [],
  );
  const generatedPercent = Math.min(
    100,
    Math.round((typedChars / fullText.length) * 100),
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (prefersReducedMotion || !section) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-code-card]",
        { y: 80, rotateX: -12, autoAlpha: 0, transformPerspective: 900 },
        {
          y: 0,
          rotateX: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.requestAnimationFrame(() => setTypedChars(fullText.length));
      return;
    }

    let nextChar = 0;
    let timeoutId: number | undefined;
    let cancelled = false;

    const resetFrame = window.requestAnimationFrame(() => setTypedChars(0));

    const typeNextChar = () => {
      if (cancelled) return;

      nextChar += 1;
      setTypedChars(Math.min(nextChar, fullText.length));

      if (nextChar >= fullText.length) {
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          nextChar = 0;
          setTypedChars(0);
          timeoutId = window.setTimeout(typeNextChar, TYPE_DELAY_MS);
        }, LOOP_DELAY_MS);
        return;
      }

      timeoutId = window.setTimeout(typeNextChar, TYPE_DELAY_MS);
    };

    timeoutId = window.setTimeout(typeNextChar, TYPE_DELAY_MS);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(resetFrame);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [fullText]);

  const typedText = fullText.slice(0, typedChars);
  const renderedLines = typedText.split("\n");
  const lastLineIndex = renderedLines.length - 1;
  const codeCard = (
    <div
      data-code-card
      className="w-full overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.045] shadow-[0_40px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl"
      style={codeFontStyle}
    >
      <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.035] px-4 py-4 sm:flex-row sm:items-center">
        <div className="flex shrink-0 gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 overflow-hidden" role="tablist" aria-label="Code files">
          {files.map((file, index) => {
            const selected = index === activeFile;

            return (
              <button
                key={file.name}
                type="button"
                suppressHydrationWarning
                role="tab"
                aria-selected={selected}
                aria-controls="code-window-panel"
                onClick={() => {
                  setTypedChars(0);
                  setActiveFile(index);
                }}
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition ${
                  selected
                    ? "border-[var(--accent)]/45 bg-white/12 text-white shadow-[0_0_32px_rgba(var(--accent-rgb),0.18)]"
                    : "border-transparent bg-transparent text-white/42 hover:border-white/10 hover:bg-white/[0.055]"
                } ${file.accent}`}
              >
                <FileCode2 className="size-3.5" aria-hidden="true" />
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="code-window-panel"
        role="tabpanel"
        className="grid grid-cols-[48px_1fr] px-0 py-6 text-xs leading-7 sm:grid-cols-[56px_1fr] sm:text-sm"
      >
        <div className="select-none border-r border-white/10 text-right text-white/24">
          {Array.from({ length: currentFile.lines.length }).map((_, index) => (
            <div key={index} className="pr-3 sm:pr-4">{index + 1}</div>
          ))}
        </div>
        <pre className="min-h-[224px] overflow-hidden px-4 text-white/82 sm:px-5">
          {renderedLines.map((line, index) => (
            <div key={`${currentFile.name}-${index}-${line}`}>
              {highlight(line || " ")}
              {index === lastLineIndex ? (
                <span className="theme-typewriter-cursor inline-block h-5 w-px translate-y-1 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.7)]" />
              ) : null}
            </div>
          ))}
        </pre>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
        <span>{currentFile.label} Mode</span>
        <span>{generatedPercent}% generated</span>
      </div>
    </div>
  );

  if (cardOnly) {
    return codeCard;
  }

  return (
    <section ref={sectionRef} id="code-lab" className="relative py-14 sm:py-16 lg:py-20">
      {codeCard}
    </section>
  );
}
