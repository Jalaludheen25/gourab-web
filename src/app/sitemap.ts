import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1),
    page("/about", 0.8),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    page("/projects", 0.8),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.7)),
    page("/contact", 0.8),
    page("/privacy", 0.2, "yearly"),
    page("/credits", 0.1, "yearly"),
  ];
}
