import { RevealImage } from "@/components/ui/RevealImage";
import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { promise } from "@/data/content";
import { media } from "@/data/media";
import { disciplineCount, serviceList } from "@/data/services";
import { site } from "@/data/site";

export function AboutStory() {
  return (
    <section
      data-theme="sand"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-sand py-[var(--spacing-section)] text-umber"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-sand opacity-60" />
      <div className="shell relative grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow index="01" tone="sand">
            Who we are
          </Eyebrow>
          <RevealText as="h2" id="story-title" className="mt-8 text-headline font-semibold text-balance">
            One licensed company, accountable from structure to finish.
          </RevealText>
        </div>

        <div className="col-span-12 space-y-6 text-lead text-umber-soft lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p>
            {site.legalName} is a limited liability company licensed by Dubai&apos;s Department of Economy and
            Tourism and registered with the Dubai Chamber. Our head office is in Dubai.
          </p>
          <p>
            We bring {disciplineCount} disciplines together — {serviceList} — so
            the people who build a space understand how it will be finished, used and maintained.
          </p>
          <p>
            Our promise is deliberate: <span className="font-serif text-[1.15em] italic text-umber">{site.tagline}</span>{" "}
            You set the ambition. We bring the technical knowledge to deliver it properly.
          </p>
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-6">
          <RevealImage
            media={media.glassFacadeSky}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="col-span-12 aspect-[4/5] md:col-span-5"
            caption="Fig. 01 — Envelope"
          />
          <RevealImage
            media={media.scaffoldWorker}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="col-span-12 aspect-[16/11] md:col-span-7 md:mt-32"
            from="right"
            caption="Fig. 02 — Execution"
          />
        </div>

        <div className="col-span-12 grid grid-cols-1 border-t border-umber/15 md:grid-cols-2">
          {[promise.vision, promise.expertise].map((p, i) => (
            <div
              key={p.label}
              className={i === 0 ? "py-10 md:pr-12" : "border-t border-umber/15 py-10 md:border-l md:border-t-0 md:pl-12"}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-copper">0{i + 1}</p>
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
