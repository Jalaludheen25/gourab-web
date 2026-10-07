import type { Metadata } from "next";
import { AboutIntro } from "@/components/home/AboutIntro";
import { Hero } from "@/components/home/Hero";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Statement } from "@/components/home/Statement";
import { Credentials } from "@/components/sections/Credentials";
import { DubaiChapter } from "@/components/sections/DubaiChapter";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Portfolio } from "@/components/sections/Portfolio";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ClientWall, Testimonials } from "@/components/sections/Testimonials";
import { WhyGourab } from "@/components/sections/WhyGourab";
import { Hydrate } from "@/components/ui/Hydrate";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${site.legalName} — ${site.tagline}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Separate boundaries let React hydrate below-the-fold chapters in small chunks */}
      <Hydrate>
        <Statement />
      </Hydrate>
      <Hydrate>
        <AboutIntro />
      </Hydrate>
      <Hydrate offscreen>
        <ServicesShowcase />
      </Hydrate>
      <Hydrate offscreen>
        <ProcessTimeline index="03" />
      </Hydrate>
      <Hydrate offscreen>
        <Credentials index="04" />
      </Hydrate>
      <Hydrate offscreen>
        <WhyGourab index="05" />
      </Hydrate>
      <Hydrate offscreen>
        <Portfolio index="06" />
      </Hydrate>
      <Hydrate offscreen>
        <DubaiChapter index="07" />
      </Hydrate>
      <Hydrate offscreen>
        <ClientWall />
        <Testimonials />
      </Hydrate>
      <Hydrate offscreen>
        <FinalCTA />
      </Hydrate>
    </>
  );
}
