import { ApproachStages } from "@/components/approach/ApproachStages";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { WhyGourab } from "@/components/sections/WhyGourab";
import { approach, stageId } from "@/data/content";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Approach",
  description:
    "How Gourab Technical Services L.L.C delivers every project — a clear, five-stage method from brief and planning to build, handover and long-term maintenance.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="From vision to handover — *and beyond.*"
        intro="A clear, five-stage method that keeps every project accountable, from the first conversation to long-term care."
        image={media.steelTubes}
        crumbs={[{ name: "Approach", path: "/approach" }]}
        aside={
          <ol className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel-300 sm:grid-cols-3">
            {approach.map((s) => (
              <li key={s.index}>
                <a href={`#${stageId(s.title)}`} className="flex gap-3 transition-colors hover:text-steel-50">
                  <span className="text-gold">{s.index}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        }
      />
      <ApproachStages index="01" />
      <WhyGourab index="02" />
      <FinalCTA image={media.dubaiBlueHour} />
    </>
  );
}
