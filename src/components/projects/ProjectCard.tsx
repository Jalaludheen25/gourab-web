import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

/** Portfolio card — large image with architectural metadata strip */
export function ProjectCard({
  project,
  index,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  project: Project;
  index: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="view"
      data-cursor-label="View project"
      className={cn("group block", className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite chamfer [--cut:24px]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
          style={{ objectPosition: project.cover.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
        <span className="text-steel-metal absolute bottom-5 left-6 text-[clamp(3rem,6vw,6rem)] font-bold leading-none tracking-[-0.06em]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-4 border-t border-white/10 pt-5">
        <h3 className="col-span-12 text-title font-semibold text-steel-50 md:col-span-6">{project.title}</h3>
        <dl className="col-span-12 grid grid-cols-3 gap-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] md:col-span-6">
          <div>
            <dt className="text-steel-500">Location</dt>
            <dd className="mt-1 text-steel-200">{project.location}</dd>
          </div>
          <div>
            <dt className="text-steel-500">Category</dt>
            <dd className="mt-1 text-steel-200">{project.category}</dd>
          </div>
          {project.year && (
            <div>
              <dt className="text-steel-500">Year</dt>
              <dd className="mt-1 text-steel-200">{project.year}</dd>
            </div>
          )}
        </dl>
      </div>
    </Link>
  );
}
