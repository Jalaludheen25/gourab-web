"use client";

import Image from "next/image";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { DubaiClock } from "./DubaiClock";

/**
 * Pinned cinematic chapter: the skyline opens from a narrow architectural
 * aperture to full bleed while the copy resolves. Static on phones.
 */
export function DubaiChapter({ index = "07" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q("[data-dubai-stage]")[0],
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          q("[data-dubai-frame]"),
          { clipPath: "inset(20% 31% 20% 31%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1 },
          0,
        )
          .fromTo(q("[data-dubai-img]"), { scale: 1.35 }, { scale: 1.02, ease: "power2.out", duration: 1 }, 0)
          .fromTo(q("[data-dubai-word]"), { yPercent: 0, opacity: 1 }, { yPercent: -40, opacity: 0, duration: 0.45 }, 0.05)
          .fromTo(q("[data-dubai-copy]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06 }, 0.62);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="dubai-title" className="relative bg-obsidian">
      <div data-dubai-stage className="relative overflow-hidden lg:h-screen">
        {/* Aperture */}
        <div
          data-dubai-frame
          className="relative h-[85svh] w-full overflow-hidden lg:absolute lg:inset-0 lg:h-auto"
          data-cursor="image"
        >
          <Image
            data-dubai-img
            src={media.dubaiBlueHour.src}
            alt={media.dubaiBlueHour.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: media.dubaiBlueHour.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/50" />
          <div aria-hidden className="grain absolute inset-0" />
        </div>

        {/* Oversized word (desktop opening frame) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <p
            data-dubai-word
            className="text-center text-[clamp(6rem,21vw,24rem)] font-bold leading-none tracking-[-0.07em] text-steel-50 mix-blend-difference"
          >
            Dubai
          </p>
        </div>

        {/* Copy */}
        <div className="shell absolute inset-x-0 bottom-0 pb-10 lg:pb-14">
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <div data-dubai-copy>
                <Eyebrow index={index}>Home ground</Eyebrow>
              </div>
              <h2
                id="dubai-title"
                data-dubai-copy
                className="mt-7 text-headline font-semibold text-steel-50 text-balance"
              >
                Licensed in Dubai.{" "}
                <span className="font-serif font-normal italic text-steel-300">Working to its standard.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p data-dubai-copy className="text-lead text-steel-300">
                Dubai sets one of the highest bars for the built environment anywhere. Gourab is based here, licensed
                here, and works to the pace and expectations the city demands.
              </p>
              <div
                data-dubai-copy
                className="eyebrow mt-8 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-4 text-steel-400"
              >
                <span>{site.location.coordinates.display}</span>
                <DubaiClock className="text-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
