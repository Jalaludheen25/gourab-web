"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { loadGsap, scheduleScrollRefresh } from "@/lib/gsap-lazy";
import { useIntroDone } from "@/lib/intro";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useIntroDone();

  // Desktop-only motion. Phones (and reduced motion) render the composition
  // statically and never download GSAP for the hero.
  useEffect(() => {
    if (!introDone) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      ctx = gsap.context(() => {
        // Entrance
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .set("[data-intro]", { autoAlpha: 1 })
          .from("[data-hero-line]", { yPercent: 115, rotate: 2, duration: 1.6, stagger: 0.13 }, 0.05)
          .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 14, duration: 1 }, 0.2)
          .from("[data-hero-datum]", { scaleX: 0, duration: 1.8, ease: "expo.inOut" }, 0.35)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 26, duration: 1.3, stagger: 0.08 }, 0.6)
          .from("[data-hero-meta]", { autoAlpha: 0, y: 12, duration: 1, stagger: 0.05 }, 0.85);

        // Content drifts upward and dims as the hero leaves
        gsap.to("[data-hero-content]", {
          yPercent: -14,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }, root.current);
      scheduleScrollRefresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [introDone]);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-obsidian"
    >
      <HeroVisual />

      {/* Legibility veils */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/30 lg:bg-[linear-gradient(90deg,var(--color-obsidian)_0%,rgb(10_11_13/0.82)_30%,rgb(10_11_13/0.15)_62%,transparent_80%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      {/* Vertical licence marker */}
      <div className="absolute right-[var(--spacing-gutter)] top-1/2 hidden -translate-y-1/2 xl:block">
        <p className="eyebrow whitespace-nowrap text-steel-500 [writing-mode:vertical-rl]">
          <span data-intro data-hero-meta className="inline-block">
            {site.license.authorityShort} Licence Nº {site.license.licenseNo}
          </span>
        </p>
      </div>

      <div data-hero-content className="shell relative flex flex-1 flex-col justify-end pb-8 pt-32 lg:pb-10">
        <p
          data-intro
          data-hero-eyebrow
          className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-steel-300 max-lg:animate-rise lg:mb-9"
        >
          <span className="text-gold">{site.legalName}</span>
          <span aria-hidden className="h-px w-8 bg-steel-600" />
          <span>
            {site.location.city} · {site.location.country}
          </span>
        </p>

        <h1
          id="hero-title"
          data-intro
          className="whitespace-nowrap text-[clamp(2.3rem,11.6vw,4.5rem)] font-bold leading-[0.88] tracking-[-0.055em] text-steel-50 lg:text-[clamp(3.1rem,8.6vw,10.25rem)]"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block max-lg:animate-rise">
              Your <span className="text-steel-metal">Vision.</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-hero-line className="block max-lg:animate-rise max-lg:[animation-delay:120ms]">
              Our{" "}
              <span className="text-gold-metal font-serif text-[1.08em] font-normal italic tracking-[-0.03em]">
                Expertise.
              </span>
            </span>
          </span>
        </h1>

        <span
          data-intro
          data-hero-datum
          aria-hidden
          className="bg-gold-sweep mt-8 block h-px w-full max-w-[min(100%,52rem)] origin-left lg:mt-10"
        />

        <div className="mt-8 max-w-[38rem] lg:mt-10">
          <p
            data-intro
            data-hero-fade
            className="text-lead text-steel-300 max-lg:animate-rise max-lg:[animation-delay:220ms] max-sm:min-h-[4lh]"
          >
            From construction to cleaning — six disciplines delivered from Dubai with technical precision and a
            single standard of work.
          </p>
          <div
            data-intro
            data-hero-fade
            className="mt-8 flex flex-col gap-3 max-lg:animate-rise max-lg:[animation-delay:300ms] sm:flex-row"
          >
            <ButtonLink href="/contact" size="lg">
              Start a project
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              Explore services
            </ButtonLink>
          </div>
        </div>

        {/* Index bar */}
        <div className="mt-12 grid grid-cols-2 border-t border-white/10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 xl:grid-cols-[repeat(6,minmax(0,1fr))_auto]">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-intro
              data-hero-meta
              data-cursor="link"
              className="group flex items-center gap-3 border-b border-white/10 py-4 pr-4 text-sm text-steel-300 transition-colors hover:text-steel-50 sm:border-b-0"
            >
              <span className="font-mono text-[0.62rem] text-gold">{s.index}</span>
              <span className="relative">
                {s.name}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-[var(--ease-expo)] group-hover:w-full" />
              </span>
            </Link>
          ))}
          <div
            data-intro
            data-hero-meta
            className="hidden items-center gap-6 py-4 xl:flex"
          >
            <span className="eyebrow text-steel-500">{site.location.coordinates.display}</span>
            <span className="flex items-center gap-3">
              <span className="eyebrow text-steel-400">Scroll</span>
              <span className="relative block h-9 w-px overflow-hidden bg-white/10">
                <span className="absolute inset-0 animate-scroll-cue bg-gold" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
