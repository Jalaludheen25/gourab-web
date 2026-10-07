"use client";

import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { media } from "@/data/media";
import { primaryEmail, primaryPhone } from "@/data/site";
import type { Media } from "@/data/types";
import { gsap, useGSAP } from "@/lib/gsap";

/** Closing call to action — full-bleed architectural image, calm motion */
export function FinalCTA({ image = media.dubaiAerialNight }: { image?: Media }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q("[data-cta-img]"),
        { yPercent: -10, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(q("[data-cta-line]"), {
        yPercent: 110,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0 -z-10">
        <div data-cta-img className="absolute -inset-y-[12%] inset-x-0">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: image.position }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-obsidian)_0%,rgb(10_11_13/0.55)_35%,rgb(10_11_13/0.7)_70%,var(--color-obsidian)_100%)]" />
        <div aria-hidden className="grain absolute inset-0" />
      </div>

      <div className="shell relative pb-16 pt-40 lg:pb-24">
        <Eyebrow>Start a project</Eyebrow>
        <h2
          id="cta-title"
          className="mt-8 text-[clamp(3rem,9vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.055em] text-steel-50"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-cta-line className="block">
              Let&apos;s build
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-cta-line className="block">
              something
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] pr-[0.1em]">
            <span data-cta-line className="text-gold-metal block font-serif font-normal italic tracking-[-0.03em]">
              exceptional.
            </span>
          </span>
        </h2>

        <div className="mt-12 flex flex-col gap-10 border-t border-white/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-lead text-steel-300">
            Tell us about your vision — we&apos;ll bring the expertise. Construction, fit-out, interiors and
            maintenance across Dubai and the UAE.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Start a project
            </ButtonLink>
            <ButtonLink href={primaryPhone.href} size="lg" variant="outline">
              Call {primaryPhone.display}
            </ButtonLink>
          </div>
        </div>
        <p className="eyebrow mt-6 text-steel-500">
          Or write to{" "}
          <a href={`mailto:${primaryEmail.address}`} className="link-draw normal-case tracking-normal text-steel-200">
            {primaryEmail.address}
          </a>
        </p>
      </div>
    </section>
  );
}
