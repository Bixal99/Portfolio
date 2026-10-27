import type { CSSProperties } from "react";
import { getTechnologyColor, TechnologyMark } from "./TechnologyMark";
import styles from "./ProjectTechnologies.module.css";

export function ProjectTechnologies({ technologies }: { technologies: string[] }) {
  return (
    <ul className={styles.list} aria-label="Technologies used">
      {technologies.map((technology) => (
        <li key={technology} className={styles.item} style={{ "--tech-color": getTechnologyColor(technology) } as CSSProperties}>
          <span className={styles.iconWell} tabIndex={0} role="img" aria-label={technology}><TechnologyMark name={technology} className={styles.icon} /></span>
          <span className={styles.name} aria-hidden="true">{technology}</span>
        </li>
      ))}
    </ul>
  );
}
