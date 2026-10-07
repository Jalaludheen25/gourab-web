import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getNextProject, getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.cover.src.src,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const info = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
    ...(project.facts ?? []),
  ];
  const [feature, ...gallery] = project.gallery;

  return (
    <>
      <PageHero
        eyebrow={`${project.category} · ${project.location}`}
        title={project.title}
        intro={project.summary}
        image={project.cover}
        crumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />

      {/* Overview + information */}
      <section aria-labelledby="overview-title" className="bg-obsidian py-[var(--spacing-section)]">
        <div className="shell grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-title" className="sr-only">
              Project overview
            </h2>
            <div className="mt-8 space-y-6">
              {project.overview.map((p, i) => (
                <p key={p} className={i === 0 ? "text-statement font-medium text-steel-50" : "text-lead text-steel-400"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9" aria-label="Project information">
            <dl className="border-t border-white/10">
              {info.map((row) => (
                <div key={row.label} className="flex justify-between gap-6 border-b border-white/10 py-4">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-steel-500">{row.label}</dt>
                  <dd className="text-right text-steel-100">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Large image story */}
      {feature && (
        <section aria-label="Project imagery" className="bg-obsidian">
          <RevealImage media={feature} sizes="100vw" className="aspect-[16/9] w-full" />
        </section>
      )}

      {gallery.length > 0 && (
        <section aria-label="Project details" className="bg-obsidian py-[var(--spacing-section)]">
          <div className="shell grid grid-cols-12 gap-6">
            {gallery.map((m, i) => (
              <RevealImage
                key={`${m.alt}-${i}`}
                media={m}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={
                  i % 3 === 0
                    ? "col-span-12 aspect-[4/3] lg:col-span-7"
                    : i % 3 === 1
                      ? "col-span-12 aspect-[4/5] lg:col-span-4 lg:col-start-9 lg:mt-32"
                      : "col-span-12 aspect-[21/9]"
                }
                from={i % 2 ? "right" : "left"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Scope + result */}
      {(project.scope?.length || project.result) && (
        <section aria-label="Scope and result" className="bg-ink py-[var(--spacing-section)]">
          <div className="shell grid grid-cols-12 gap-x-6 gap-y-14">
            {project.scope && project.scope.length > 0 && (
              <div className="col-span-12 lg:col-span-6">
                <Eyebrow>Scope</Eyebrow>
                <ul className="mt-8 border-t border-white/10">
                  {project.scope.map((s, i) => (
                    <li key={s} className="flex gap-6 border-b border-white/10 py-4 text-steel-200">
                      <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.result && (
              <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                <Eyebrow>Completion</Eyebrow>
                <p className="mt-8 font-serif text-[clamp(1.8rem,3vw,2.8rem)] italic leading-tight text-steel-100">
                  {project.result}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Next project */}
      {next && (
        <section aria-label="Next project" className="bg-obsidian">
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="view"
            data-cursor-label="Next"
            className="group relative flex min-h-[70svh] items-end overflow-hidden"
          >
            <Image
              src={next.cover.src}
              alt={next.cover.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover opacity-60 transition-[transform,opacity] duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105 group-hover:opacity-80"
              style={{ objectPosition: next.cover.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="shell relative pb-14">
              <p className="eyebrow text-steel-400">Next project</p>
              <p className="mt-4 text-display font-bold text-steel-50">{next.title}</p>
            </div>
          </Link>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
