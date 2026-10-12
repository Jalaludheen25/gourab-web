"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { capitalize, disciplineCount, services } from "@/data/services";
import { DESKTOP_MOTION, useLazyGsap } from "@/lib/gsap-lazy";
import { cn } from "@/lib/utils";

export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useLazyGsap(
    ({ gsap, ScrollTrigger }) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => window.innerHeight * (services.length - 0.35);
        ScrollTrigger.create({
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(services.length - 1, Math.floor(self.progress * services.length));
            setActive((prev) => (prev === i ? prev : i));
          },
        });
        gsap.fromTo(
          "[data-svc-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pin.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    root,
    { media: DESKTOP_MOTION },
  );

  const current = services[active];

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="relative bg-obsidian">
      <div ref={pin} className="relative overflow-hidden lg:h-screen">
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-blueprint opacity-40 lg:block" />
        <div className="shell relative grid h-full grid-cols-12 gap-x-6 py-[var(--spacing-section)] lg:py-0 lg:pb-12 lg:pt-28">
          {/* Index */}
          <div className="col-span-12 flex flex-col lg:col-span-6">
            <Eyebrow index="02">Services</Eyebrow>
            <h2 id="services-title" className="mt-7 text-headline font-semibold text-steel-50 text-balance">
              {capitalize(disciplineCount)} disciplines.
              <br />
              <span className="font-serif font-normal italic text-steel-400">One standard.</span>
            </h2>

            <ol className="mt-12 lg:mt-auto">
              {services.map((s, i) => (
                <li key={s.slug} className="border-t border-white/[0.08] last:border-b lg:border-0 lg:last:border-0">
                  <Link
                    href={`/services/${s.slug}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-cursor="link"
                    className="group relative flex items-baseline gap-5 py-6 lg:py-1.5"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-[var(--spacing-gutter)] top-1/2 hidden h-px -translate-y-1/2 bg-gold transition-all duration-700 ease-[var(--ease-expo)] lg:block",
                        active === i ? "w-[calc(var(--spacing-gutter)-0.75rem)]" : "w-0",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-xs transition-colors duration-500",
                        active === i ? "text-gold" : "text-steel-500",
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "text-[clamp(2.25rem,min(4.2vw,7vh),5rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-colors duration-500",
                        active === i ? "text-steel-50" : "text-steel-50 lg:text-steel-600 lg:group-hover:text-steel-400",
                      )}
                    >
                      {s.name}
                    </span>
                  </Link>

                  {/* Phone / tablet: inline image + summary */}
                  <div className="pb-10 lg:hidden">
                    <RevealImage media={s.image} sizes="100vw" className="aspect-[4/3]" />
                    <p className="mt-6 max-w-xl text-lead text-steel-400">{s.summary}</p>
                    <ArrowLink href={`/services/${s.slug}`} className="mt-6 text-steel-100">
                      Explore {s.name}
                    </ArrowLink>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Desktop stage */}
          <div className="relative col-span-6 col-start-7 hidden h-full flex-col lg:flex">
            <div className="relative flex-1 overflow-hidden bg-graphite chamfer [--cut:28px]" data-cursor="image">
              {services.map((s, i) => (
                <div
                  key={s.slug}
                  aria-hidden={active !== i}
                  className="absolute inset-0 transition-[clip-path] duration-[1300ms] ease-[var(--ease-expo)]"
                  style={{
                    clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    zIndex: i,
                  }}
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="50vw"
                    placeholder="blur"
                    className={cn(
                      "object-cover transition-transform duration-[1800ms] ease-[var(--ease-expo)]",
                      active === i ? "scale-100" : "scale-110",
                    )}
                    style={{ objectPosition: s.image.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/10" />
                </div>
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-8">
                <span className="text-steel-metal text-[clamp(5rem,9vw,9.5rem)] font-bold leading-[0.8] tracking-[-0.06em]">
                  {current.index}
                </span>
                <span className="eyebrow text-steel-200">{current.name}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-[1fr_auto] gap-8">
              <div key={current.slug} className="animate-rise">
                <p className="text-xl font-medium tracking-[-0.02em] text-steel-50">{current.headline}</p>
                <p className="mt-3 max-w-lg text-steel-400">{current.summary}</p>
                <ArrowLink href={`/services/${current.slug}`} className="mt-6 text-steel-100">
                  Explore {current.name}
                </ArrowLink>
              </div>
              <div className="flex items-stretch gap-4">
                <span className="relative block w-px overflow-hidden bg-white/10">
                  <span data-svc-progress className="absolute inset-0 origin-top bg-gold" />
                </span>
                <span className="eyebrow self-end text-steel-500">
                  <span className="text-steel-100">{current.index}</span> / 0{services.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
