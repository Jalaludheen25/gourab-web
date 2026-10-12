import { ProjectCard } from "@/components/projects/ProjectCard";
import { PortfolioPending } from "@/components/projects/PortfolioPending";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { media } from "@/data/media";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Project case studies from Gourab Technical Services L.L.C — construction, fit-out, interiors, maintenance, hospitality and cleaning in Dubai.",
  path: "/projects",
});

export default function ProjectsPage() {
  const hasProjects = projects.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={hasProjects ? "Work that *speaks.*" : "Real work, *properly documented.*"}
        intro={
          hasProjects
            ? "Selected projects across construction, fit-out, interiors, maintenance, hospitality and cleaning."
            : "We only publish genuine GTS projects. Case studies will appear here as they are approved for release."
        }
        image={media.cranesDusk}
        crumbs={[{ name: "Projects", path: "/projects" }]}
        size="compact"
      />

      <section aria-label="Project list" className="bg-obsidian pb-[var(--spacing-section)] pt-12 lg:pt-16">
        <div className="shell">
          {hasProjects ? (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
              {projects.map((p, i) => (
                <li key={p.slug} className={i % 2 === 1 ? "lg:mt-40" : undefined}>
                  <ProjectCard project={p} index={i} sizes="(min-width: 1024px) 46vw, 100vw" />
                </li>
              ))}
            </ul>
          ) : (
            <PortfolioPending sheet="01" />
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
