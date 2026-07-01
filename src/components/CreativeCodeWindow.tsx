"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileCode2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const files = [
  {
    name: "greeting.py",
    accent: "text-[var(--accent)]",
    label: "Intro",
    lines: [
      "def codegen(coffee):",
      "    energy = coffee * 150",
      "    while energy > 0:",
      "        build_backend_apis()",
      "        ship_ai_features()",
      "        energy -= 20",
      "    return \"Refueling required...\"",
    ],
  },
  {
    name: "rag_stack.py",
    accent: "text-[#c084fc]",
    label: "AI",
    lines: [
      "class RagPipeline:",
      "    def __init__(self):",
      "        self.sources = [\"docs\", \"web\", \"pdfs\"]",
      "        self.vector_db = \"Pinecone\"",
      "",
      "    def answer(self, question):",
      "        context = retrieve_relevant_chunks(question)",
      "        return generate_grounded_response(context)",
    ],
  },
  {
    name: "solve_error.py",
    accent: "text-[#fb923c]",
    label: "Debug",
    lines: [
      "try:",
      "    deploy_next_feature()",
      "except ProductionBug as issue:",
      "    logs = inspect_runtime(issue)",
      "    patch = write_small_fix(logs)",
      "    run_tests(patch)",
      "finally:",
      "    document_what_changed()",
    ],
  },
];

function highlight(line: string) {
  return line
    .replace(/(class|def|return|while|try|except|finally|as|self)/g, '<span class="text-[var(--accent)]">$1</span>')
    .replace(/(RagPipeline|ProductionBug|__init__|answer)/g, '<span class="text-[var(--accent-secondary)]">$1</span>')
    .replace(/(&quot;.*?&quot;|".*?")/g, '<span class="text-white/72">$1</span>')
    .replace(/(build_backend_apis|ship_ai_features|retrieve_relevant_chunks|generate_grounded_response|deploy_next_feature|inspect_runtime|write_small_fix|run_tests|document_what_changed)/g, '<span class="text-[#8ab4ff]">$1</span>');
}

export function CreativeCodeWindow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFile, setActiveFile] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const currentFile = files[activeFile] ?? files[0];
  const fullText = useMemo(() => currentFile.lines.join("\n"), [currentFile]);

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
      gsap.fromTo(
        "[data-code-chip]",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
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

    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setTypedChars((count) => {
        if (count >= fullText.length) {
          window.clearInterval(interval);
          return count;
        }
        return Math.min(fullText.length, count + (frame % 5 === 0 ? 2 : 1));
      });
    }, 24);

    return () => window.clearInterval(interval);
  }, [fullText]);

  const typedText = fullText.slice(0, typedChars);
  const renderedLines = typedText.split("\n");

  return (
    <section ref={sectionRef} id="code-lab" className="relative py-20 sm:py-24 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div data-animate>
          <div className="mb-5 inline-flex items-center gap-3 border border-white/15 bg-white/[0.025] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
            <Sparkles className="size-4 text-[var(--accent)]" aria-hidden="true" />
            Creative Lab
          </div>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
            Click a file. Watch the portfolio write itself.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-white/58">
            The editor now behaves like the reference: every tab is clickable, and each file types its own backend, AI, or debugging story.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["RAG pipelines", "Backend APIs", "AI products"].map((item) => (
              <span key={item} data-code-chip className="border border-white/12 bg-white/[0.025] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div data-code-card className="overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[0.045] shadow-[0_40px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.035] px-4 py-4 sm:flex-row sm:items-center">
            <div className="flex shrink-0 gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex min-w-0 gap-2 overflow-x-auto" role="tablist" aria-label="Code files">
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

          <div id="code-window-panel" role="tabpanel" className="grid grid-cols-[48px_1fr] px-0 py-6 font-mono text-xs leading-7 sm:grid-cols-[56px_1fr] sm:text-sm">
            <div className="select-none border-r border-white/10 text-right text-white/24">
              {Array.from({ length: currentFile.lines.length }).map((_, index) => (
                <div key={index} className="pr-3 sm:pr-4">{index + 1}</div>
              ))}
            </div>
            <pre className="min-h-[224px] overflow-hidden px-4 text-white/82 sm:px-5">
              {renderedLines.map((line, index) => (
                <div key={`${currentFile.name}-${index}-${line}`} dangerouslySetInnerHTML={{ __html: highlight(line || " ") }} />
              ))}
              <span className="inline-block h-5 w-px translate-y-1 bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.7)]" />
            </pre>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
            <span>{currentFile.label} Mode</span>
            <span>{Math.round((typedChars / fullText.length) * 100)}% generated</span>
          </div>
        </div>
      </div>
    </section>
  );
}


