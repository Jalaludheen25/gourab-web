import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicePanel } from "@/components/services/ServicePanel";
import { media } from "@/data/media";
import { capitalize, disciplineCount, services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Construction, fit-out, interiors, maintenance, hospitality and cleaning from Gourab Technical Services L.L.C — six disciplines delivered to a single standard in Dubai.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={`${capitalize(disciplineCount)} disciplines. *One standard.*`}
        intro="From structure to finish to long-term care — every Gourab service is delivered with the same technical discipline and the same accountability."
        image={media.siteAerial}
        crumbs={[{ name: "Services", path: "/services" }]}
        aside={
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-300">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="flex gap-3 transition-colors hover:text-steel-50">
                  <span className="text-gold">{s.index}</span>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <section aria-label="Service overview" className="bg-obsidian pb-[calc(var(--spacing-section)*0.5)]">
        <div className="shell">
          {services.map((s, i) => (
            <div key={s.slug} id={s.slug} className="scroll-mt-24">
              <ServicePanel service={s} flip={i % 2 === 1} />
            </div>
          ))}
        </div>
      </section>

      <ProcessTimeline index="02" />
      <FinalCTA image={media.cranesDusk} />
    </>
  );
}
