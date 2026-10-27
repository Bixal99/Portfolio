import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/data/portfolio";
import styles from "./ProjectCards.module.css";

export function ProjectLinks({ project }: { project: Project }) {
  const hasRepository = /github\.com/i.test(project.links.source);
  return (
    <div className={styles.links} data-project-links>
      <a className={styles.liveLink} data-cursor-label="Open project" href={project.links.demo} target="_blank" rel="noreferrer"><span>Live project</span><span className={styles.arrowWindow}><ArrowUpRight size={17} aria-hidden="true" /></span><span className="sr-only"> (opens in a new tab)</span></a>
      {project.sourcePrivate ? <span className={styles.privateSource}><LockKeyhole size={15} aria-hidden="true" />Private repository</span> : project.links.source !== project.links.demo && <a className={styles.sourceLink} data-cursor-label={hasRepository ? "View code" : "Open site"} href={project.links.source} target="_blank" rel="noreferrer">{hasRepository ? <SiGithub size={17} aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}{hasRepository ? "Source code" : "Project site"}<span className="sr-only"> (opens in a new tab)</span></a>}
    </div>
  );
}
