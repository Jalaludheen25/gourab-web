import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { PortfolioPending } from "@/components/projects/PortfolioPending";
import { ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

/** Home portfolio chapter — gallery when projects exist, honest pending state otherwise */
export function Portfolio({ index = "06" }: { index?: string }) {
  const hasProjects = projects.length > 0;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative bg-obsidian py-[var(--spacing-section)]">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          index={index}
          eyebrow="Projects"
          title={hasProjects ? "Selected work." : "Selected work, documented properly."}
          intro={
            hasProjects
              ? "A selection of projects delivered by Gourab across construction, fit-out, interiors and maintenance."
              : "Real projects only. Our portfolio will appear here as each case study is approved for publication."
          }
        />
      </div>

      <div className="mt-16 lg:mt-20">
        {hasProjects ? (
          <>
            <ProjectGallery projects={projects.slice(0, 6)} />
            <div className="shell mt-12">
              <ArrowLink href="/projects" className="text-steel-100">
                All projects
              </ArrowLink>
            </div>
          </>
        ) : (
          <div className="shell">
            <PortfolioPending sheet={index} />
          </div>
        )}
      </div>
    </section>
  );
}
