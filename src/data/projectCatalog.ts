import { projects, type Project } from "./portfolio";
import { projectMedia, type ProjectMedia } from "./projectMedia";

export type CatalogProject = Project & { slug: string; media: ProjectMedia };

export const projectCatalog: CatalogProject[] = projects.map((project, index) => ({
  ...project,
  slug: projectMedia[index].slug,
  media: projectMedia[index],
}));

export const featuredProjects = ["ai-book", "eye-blink", "churn", "interview-help"].map(
  (slug) => projectCatalog.find((project) => project.slug === slug)!,
);
