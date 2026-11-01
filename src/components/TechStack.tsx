"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { sectionMeta, techSkills } from "@/data/portfolio";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./SectionHeading";
import { TechnologyMark } from "./TechnologyMark";
import styles from "./TechStack.module.css";

const rows = [techSkills.slice(0, 21), techSkills.slice(21)];

function moveSpotlight(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  card.style.setProperty("--mouse-x", `${x * 100}%`);
  card.style.setProperty("--mouse-y", `${y * 100}%`);
}

export function TechStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let visible = true;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      sync();
    }, { threshold: 0.05 });
    observer.observe(stage);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <AnimatedSection id="stack" className="!pb-8 !pt-8 sm:!pb-10 sm:!pt-10 lg:!pb-12 lg:!pt-12">
      <div className={styles.header}>
        <SectionHeading {...sectionMeta.stack} className="!mb-0" />
      </div>

      <div ref={stageRef} className={styles.stage} data-paused={!active}>
        {rows.map((skills, rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.row} ${rowIndex === 0 ? styles.right : styles.left}`}
            data-skill-row={rowIndex === 0 ? "right" : "left"}
            role="group"
            aria-label={rowIndex === 0 ? "Languages, web development and AI tools" : "AI, data and developer tools"}
          >
            <div className={styles.track}>
              {[0, 1].map((copy) => (
                <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
                  {skills.map((skill) => (
                    <li key={skill.icon} className={styles.item}>
                      <div
                        className={styles.card}
                        data-cursor-label={skill.category}
                        onPointerMove={moveSpotlight}
                      >
                        <TechnologyMark name={skill.name} icon={skill.icon} className={styles.mark} variant="original" />
                        <span className={styles.name}>{skill.name}</span>
                        <span className={styles.category}>{skill.category}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
