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
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${site.legalName} — ${site.tagline}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <AboutIntro />
      <ServicesShowcase />
      <ProcessTimeline index="03" />
      <Credentials index="04" />
      <WhyGourab index="05" />
      <Portfolio index="06" />
      <DubaiChapter index="07" />
      <ClientWall />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
