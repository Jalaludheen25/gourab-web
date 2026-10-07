import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { approach } from "@/data/content";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} in Dubai`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const [lead, ...rest] = service.intro;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "City", name: site.location.city },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <PageHero
        eyebrow={`Service ${service.index} / 0${services.length}`}
        title={`${service.name}`}
        intro={<p className="font-serif text-3xl italic leading-tight text-steel-100">{service.headline}</p>}
        image={service.image}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        aside={<p className="text-steel-300">{service.summary}</p>}
      />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="bg-obsidian py-[var(--spacing-section)]">
        <div className="shell grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-3">
            <Eyebrow index={service.index}>Overview</Eyebrow>
            <h2 id="overview-title" className="sr-only">
              {service.name} overview
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <p className="text-statement font-medium text-steel-50 text-balance">{lead}</p>
            {rest.map((p) => (
              <p key={p} className="mt-8 max-w-2xl text-lead text-steel-400">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Detail imagery */}
        <div className="shell mt-24 grid grid-cols-12 gap-6 lg:mt-32">
          {service.details[0] && (
            <RevealImage
              media={service.details[0]}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="col-span-12 aspect-[4/3] lg:col-span-7"
              caption={`Fig. ${service.index}.1`}
            />
          )}
          {service.details[1] && (
            <RevealImage
              media={service.details[1]}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="col-span-12 aspect-[4/5] lg:col-span-4 lg:col-start-9 lg:mt-40"
              from="right"
              caption={`Fig. ${service.index}.2`}
            />
          )}
        </div>
      </section>

      {/* Scope — only when Gourab has confirmed specific items */}
      {service.scope.length > 0 && (
        <section aria-labelledby="scope-title" className="bg-ink py-[var(--spacing-section)]">
          <div className="shell grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow>Scope</Eyebrow>
              <h2 id="scope-title" className="mt-6 text-headline font-semibold text-steel-50">
                What&apos;s included
              </h2>
            </div>
            <ul className="col-span-12 border-t border-white/10 lg:col-span-7 lg:col-start-6">
              {service.scope.map((item, i) => (
                <li key={item} className="flex gap-6 border-b border-white/10 py-5 text-lg text-steel-200">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* How we deliver */}
      <section aria-labelledby="deliver-title" className="relative overflow-hidden bg-ink py-[var(--spacing-section)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-70" />
        <div className="shell relative grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Approach</Eyebrow>
            <h2 id="deliver-title" className="mt-6 text-headline font-semibold text-steel-50 text-balance">
              How we deliver {service.name.toLowerCase()}.
            </h2>
            <ArrowLink href="/about#approach" className="mt-10 text-steel-100">
              Our full approach
            </ArrowLink>
          </div>
          <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
            {approach.map((step) => (
              <li
                key={step.index}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/10 py-7 last:border-b sm:grid-cols-[3.5rem_10rem_1fr]"
              >
                <span className="font-mono text-xs text-gold">{step.index}</span>
                <h3 className="text-xl font-semibold text-steel-50">{step.title}</h3>
                <p className="col-span-2 text-steel-400 sm:col-span-1">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other services */}
      <section aria-labelledby="other-title" className="bg-obsidian py-[var(--spacing-section)]">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Other disciplines</Eyebrow>
              <h2 id="other-title" className="mt-6 text-headline font-semibold text-steel-50">
                One partner, end to end.
              </h2>
            </div>
            <ArrowLink href="/services" className="text-steel-100">
              All services
            </ArrowLink>
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block" data-cursor="view" data-cursor-label="Explore">
                  <div className="relative aspect-[4/5] overflow-hidden bg-graphite chamfer [--cut:20px]">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 768px) 32vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105"
                      style={{ objectPosition: s.image.position }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="font-mono text-xs text-gold">{s.index}</span>
                      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-steel-50">{s.name}</p>
                      <p className="mt-2 text-sm text-steel-300">{s.headline}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA image={service.details[0] ?? service.image} />
    </>
  );
}
