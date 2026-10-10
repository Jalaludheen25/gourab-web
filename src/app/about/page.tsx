import { AboutStory } from "@/components/about/AboutStory";
import { Vision } from "@/components/about/Vision";
import { PeopleAndGroup } from "@/components/about/PeopleAndGroup";
import { Credentials } from "@/components/sections/Credentials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyGourab } from "@/components/sections/WhyGourab";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Gourab Technical Services L.L.C is a Dubai-licensed company delivering construction, fit-out, interiors and maintenance. Your Vision. Our Expertise.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Gourab"
        title="Your vision. *Our expertise.*"
        intro={`${site.legalName} is a Dubai-licensed technical services company — one partner for construction, fit-out, interiors and maintenance.`}
        image={media.glassTowers}
        crumbs={[{ name: "About", path: "/about" }]}
        aside={
          <dl className="grid grid-cols-2 gap-6 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
            <div>
              <dt className="text-steel-500">Head office</dt>
              <dd className="mt-2 text-steel-100">Dubai, UAE</dd>
            </div>
            <div>
              <dt className="text-steel-500">Licence Nº</dt>
              <dd className="mt-2 text-steel-100">{site.license.licenseNo}</dd>
            </div>
          </dl>
        }
      />
      <AboutStory />
      <Vision index="02" />
      <ProcessTimeline index="03" />
      <Credentials index="04" />
      <PeopleAndGroup index="05" />
      <WhyGourab index="06" />
      <FinalCTA image={media.dubaiNightWater} />
    </>
  );
}
