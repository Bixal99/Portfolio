import { featuredProjects, projectCatalog } from "@/data/projectCatalog";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectTechnologies } from "./ProjectTechnologies";
import styles from "./ProjectArchive.module.css";

const orderedProjects = [...featuredProjects, ...projectCatalog.filter((project) => !featuredProjects.some((featured) => featured.slug === project.slug))];

export function ProjectArchive() {
  return (
    <div className={styles.grid}>
      {orderedProjects.map((project) => (
        <article key={project.slug} className={styles.card} aria-labelledby={"archive-" + project.slug}>
          <ProjectPreview project={{ title: project.title, slug: project.slug, media: project.media, links: { demo: project.links.demo } }} variant="archive" />
          <div className={styles.details}>
            <div className={styles.titleRow}>
              <h2 id={"archive-" + project.slug}>{project.title}</h2>
              <span className={styles.category}>{project.category}</span>
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.stack}><ProjectTechnologies technologies={project.technologies} /></div>
            <ProjectLinks project={project} />
          </div>
        </article>
      ))}
    </div>
  );
}
