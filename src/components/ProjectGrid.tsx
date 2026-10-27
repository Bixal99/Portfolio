"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ChartColumn, Eye, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProjects, projectCatalog } from "@/data/projectCatalog";
import { sectionMeta } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTechnologies } from "./ProjectTechnologies";
import styles from "./ProjectGrid.module.css";

const projectPresentation = {
  "ai-book": { lines: ["AI Book", "Assistant"], Icon: BookOpen },
  "eye-blink": { lines: ["Eye Blink", "Morse Detector"], Icon: Eye },
  churn: { lines: ["Churn", "Prediction System"], Icon: ChartColumn },
  "interview-help": { lines: ["Interview", "Help"], Icon: GraduationCap },
};

export function ProjectGrid() {
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const timeline = timelineRef.current;
    const track = trackRef.current;
    if (!root || !timeline || !track) return;
    gsap.registerPlugin(ScrollTrigger);
    const rows = Array.from(timeline.querySelectorAll<HTMLElement>("[data-project-row]"));
    const nodes = rows.map((row) => row.querySelector<HTMLElement>("[data-project-node]"));
    const fill = track.querySelector<HTMLElement>("[data-project-progress]");
    const tip = track.querySelector<HTMLElement>("[data-project-tip]");
    let railStart = 0;
    let railEnd = 0;
    let railHeight = 0;
    let stops: number[] = [];

    const measure = () => {
      const centers = rows.map((row) => row.offsetTop + row.offsetHeight / 2);
      railStart = rows[0]?.offsetTop ?? 0;
      const outro = root.querySelector<HTMLElement>("[data-project-outro]");
      railEnd = outro ? outro.offsetTop - timeline.offsetTop : timeline.offsetHeight;
      railHeight = Math.max(1, railEnd - railStart);
      stops = centers.map((center) => (center - railStart) / railHeight);
      track.style.top = railStart + "px";
      track.style.height = railHeight + "px";
    };
    measure();
    ScrollTrigger.addEventListener("refreshInit", measure);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 900px)", mobile: "(max-width: 899px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      measure();
      if (context.conditions?.reduced) return;
      const desktop = context.conditions?.desktop;
      const focusCleanups: (() => void)[] = [];
      rows.forEach((row, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const visual = row.querySelector("[data-project-visual]");
        const copy = row.querySelectorAll("[data-project-copy] > *");
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 83%", end: "bottom 15%", toggleActions: "play reverse play reverse" },
          defaults: { duration: .85, ease: "power3.out" },
        });
        reveal.fromTo(visual,
          { opacity: 0, y: desktop ? 64 : 36, x: desktop ? direction * 28 : 0, rotationY: desktop ? direction * 7 : 0, rotationX: desktop ? 6 : 0, scale: .96, transformPerspective: 1200 },
          { opacity: 1, y: 0, x: 0, rotationY: 0, rotationX: 0, scale: 1 }, 0,
        ).fromTo(copy, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: .065, duration: .65 }, .12);
        const showOnFocus = () => reveal.progress(1).pause();
        row.addEventListener("focusin", showOnFocus);
        focusCleanups.push(() => row.removeEventListener("focusin", showOnFocus));
      });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top" });
      gsap.set(tip, { y: 0 });
      const progress = gsap.timeline({
        scrollTrigger: {
          trigger: timeline,
          start: () => "top+=" + railStart + " 70%",
          end: () => "top+=" + railEnd + " 70%",
          scrub: .35,
          invalidateOnRefresh: true,
        },
        onUpdate: function(this: gsap.core.Timeline) {
          const amount = this.progress();
          const opacity = amount > 0 ? "1" : "0";
          if (tip && tip.style.opacity !== opacity) tip.style.opacity = opacity;
          nodes.forEach((node, index) => {
            const active = String(amount > 0 && amount + .001 >= stops[index]);
            if (node && node.dataset.active !== active) node.dataset.active = active;
          });
        },
      });
      progress.to(fill, { scaleY: 1, duration: 1, ease: "none" }, 0)
        .to(tip, { y: () => railHeight, duration: 1, ease: "none" }, 0);
      gsap.fromTo(root.querySelectorAll("[data-project-outro-line]"), { x: desktop ? 190 : 65, skewX: -9, filter: "blur(12px)", opacity: .25 }, {
        x: 0, skewX: 0, filter: "blur(0px)", opacity: 1, stagger: .12, ease: "power3.out", duration: 1.2,
        scrollTrigger: { trigger: root.querySelector("[data-project-outro]"), start: "top 95%", end: "center 65%", scrub: .7 },
      });
      return () => {
        focusCleanups.forEach((cleanup) => cleanup());
        rows.forEach((row) => row.querySelector("[data-project-node]")?.removeAttribute("data-active"));
      };
    }, root);
    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(root);
    return () => {
      resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refreshInit", measure);
      media.revert();
    };
  }, []);

  return (
    <section id="projects" ref={rootRef} className={styles.section} aria-label="Selected projects">
      <SectionHeading {...sectionMeta.projects} />
      <div className={styles.timeline} ref={timelineRef}>
        <div ref={trackRef} className={styles.track} aria-hidden="true">
          <div className={styles.rail} />
          <div className={"timeline-meteor " + styles.fill} data-project-progress />
          <div className={"timeline-meteor-tip " + styles.tip} data-project-tip />
        </div>
        {featuredProjects.map((project, index) => {
          const presentation = projectPresentation[project.slug as keyof typeof projectPresentation];
          const Icon = presentation.Icon;
          return (
          <article key={project.slug} className={[styles.row, index % 2 ? styles.reversed : ""].join(" ")} data-project-row aria-labelledby={"project-" + project.slug}>
            <span className={styles.node} data-project-node aria-hidden="true"><span /></span>
            <div className={styles.visual} data-project-visual><ProjectPreview project={project} /></div>
            <div className={styles.copy} data-project-copy>
              <p className={styles.eyebrow}><span className={styles.categoryIcon}><Icon size={15} aria-hidden="true" /></span><span>{project.category}</span></p>
              <h3 id={"project-" + project.slug} aria-label={project.title}><span>{presentation.lines[0]}</span>{" "}<span>{presentation.lines[1]}</span></h3>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.stack}><p className={styles.stackLabel}>Built with</p><ProjectTechnologies technologies={project.technologies} /></div>
              <ProjectLinks project={project} />
            </div>
          </article>
        );})}
      </div>
      <div className={styles.outro} data-project-outro>
        <div className={styles.outroCopy}><h3 className={styles.outroTitle}><span data-project-outro-line>Still curious?</span><span data-project-outro-line>Keep exploring.</span></h3><p className={styles.outroDescription}>More builds, experiments, and ideas brought to life.</p></div>
        <Link className={styles.archiveLink} href="/projects"><ArrowUpRight size={36} aria-hidden="true" /><span className={styles.archiveLabel}>Explore all work<span>{String(projectCatalog.length).padStart(2, "0")} projects</span></span></Link>
      </div>
    </section>
  );
}
