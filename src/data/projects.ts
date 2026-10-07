import type { Project } from "./types";

/**
 * Gourab project portfolio.
 *
 * No projects have been supplied yet, so this list is intentionally empty and
 * the site shows a "portfolio in preparation" state. Add real projects here —
 * the home gallery, /projects index, /projects/[slug] case studies, sitemap
 * and structured data all update automatically.
 *
 * Example entry (do NOT publish placeholder projects):
 *
 * {
 *   slug: "project-name",
 *   title: "Project Name",
 *   location: "Business Bay, Dubai",
 *   category: "Fit-Out",
 *   year: "2026",
 *   client: "Client name (optional)",
 *   status: "Completed",
 *   summary: "One-line description used on cards and in metadata.",
 *   overview: ["Paragraph one…", "Paragraph two…"],
 *   facts: [{ label: "Area", value: "1,200 m²" }],
 *   scope: ["Item one", "Item two"],
 *   result: "Short completion statement.",
 *   cover: { src: importedImage, alt: "Describe the photo" },
 *   gallery: [{ src: importedImage, alt: "…" }],
 * }
 *
 * Images: put project photos in src/assets/projects/<slug>/ and import them
 * at the top of this file so next/image can optimise them.
 */
export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  if (projects.length < 2) return undefined;
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
