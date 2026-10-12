import { ArrowLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { promise } from "@/data/content";
import { media } from "@/data/media";
import { capitalize, disciplineCount, serviceList } from "@/data/services";
import { site } from "@/data/site";

/** Home "About" chapter — asymmetric editorial layout on sand */
export function AboutIntro() {
  return (
    <section
      id="about"
      data-theme="sand"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-sand py-[var(--spacing-section)] text-umber"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-sand opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="shell relative grid grid-cols-12 gap-x-6 gap-y-16">
        {/* Copy column */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <Eyebrow index="01" tone="sand">
            About Gourab
          </Eyebrow>
          <RevealText
            as="h2"
            id="about-title"
            className="mt-8 text-headline font-semibold text-balance"
          >
            A Dubai company built on a simple promise.
          </RevealText>

          <div className="mt-10 space-y-6 text-lead text-umber-soft">
            <p>
              {site.legalName} is a Dubai-licensed company delivering {serviceList}. We work from one idea: you bring the vision, we bring the expertise to realise it.
            </p>
            <p>
              {capitalize(disciplineCount)} disciplines under one roof means fewer handoffs, clearer accountability and a single standard
              carried from structure to finish — and beyond, into the life of the building.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <ArrowLink href="/about" className="text-umber">
              More about Gourab
            </ArrowLink>
            <p className="font-serif text-xl italic text-umber-soft" lang="ar" dir="rtl">
              {site.arabicName}
            </p>
          </div>
        </div>

        {/* Image composition */}
        <div className="relative col-span-12 lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <div className="relative ml-auto w-[88%] lg:w-[86%]">
            <RevealImage
              media={media.concreteWall}
              sizes="(min-width: 1024px) 44vw, 88vw"
              className="aspect-[4/5]"
              caption="Fig. 01 — Material"
            />
            {/* Dimension annotation */}
            <div aria-hidden className="absolute -left-8 top-0 hidden h-[calc(100%-2.25rem)] w-px bg-umber/25 sm:block">
              <span className="absolute -left-[3px] top-0 h-px w-[7px] bg-umber/50" />
              <span className="absolute -left-[3px] bottom-0 h-px w-[7px] bg-umber/50" />
              <span className="eyebrow absolute left-3 top-1/2 -translate-y-1/2 rotate-180 text-[0.6rem] text-umber/50 [writing-mode:vertical-rl]">
                Elevation · A–A
              </span>
            </div>
          </div>
          <div className="relative mt-8 w-[58%] sm:-mt-[24%] sm:w-[52%] lg:w-[48%]">
            <RevealImage
              media={media.rebarWorker}
              sizes="(min-width: 1024px) 24vw, 52vw"
              className="aspect-square shadow-deep"
              from="left"
              caption="Fig. 02 — On site"
            />
          </div>
        </div>

        {/* The promise */}
        <div className="col-span-12 mt-8 grid grid-cols-1 border-t border-umber/15 md:grid-cols-2">
          {[promise.vision, promise.expertise].map((p, i) => (
            <div
              key={p.label}
              className={i === 0 ? "py-10 md:pr-12" : "border-t border-umber/15 py-10 md:border-l md:border-t-0 md:pl-12"}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-copper">
                0{i + 1}
              </p>
              <h3 className="mt-4 font-serif text-[clamp(2.25rem,4vw,3.75rem)] italic leading-none tracking-[-0.02em]">
                {p.label}.
              </h3>
              <p className="mt-5 max-w-md text-umber-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
