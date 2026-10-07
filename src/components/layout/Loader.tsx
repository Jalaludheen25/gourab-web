"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { loadGsap } from "@/lib/gsap-lazy";
import { hasSeenIntro, markIntroDone } from "@/lib/intro";
import { useLenis } from "./SmoothScroll";

/**
 * First-visit loader (desktop only, once per session):
 * dark field → gold datum line → GTS mark rises → coordinates → curtain lifts.
 * On phones/tablets, for reduced motion and for return visits the intro is
 * skipped immediately so content is never held back.
 */
export function Loader() {
  const [mounted, setMounted] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const meta = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  // Hold scrolling while the intro plays
  useEffect(() => {
    if (!mounted || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [mounted, lenis]);

  useEffect(() => {
    const el = root.current;
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || !desktop || reduced || hasSeenIntro()) {
      markIntroDone();
      setMounted(false);
      return;
    }

    let cancelled = false;
    let kill = () => {};
    // Safety net: never hold the page if the animation chunk fails to load
    const failsafe = window.setTimeout(() => {
      markIntroDone();
      setMounted(false);
    }, 4000);

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      window.clearTimeout(failsafe);
      const count = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => setMounted(false),
      });
      kill = () => tl.kill();

      tl.to(line.current, { scaleX: 1, duration: 0.9, ease: "power3.inOut" })
        .fromTo(
          mark.current,
          { clipPath: "inset(100% 0% 0% 0%)", yPercent: 12 },
          { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.1 },
          0.25,
        )
        .to(
          count,
          {
            v: 100,
            duration: 1.2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0.1,
        )
        .fromTo(meta.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.55)
        .add(() => markIntroDone(), 1.45)
        .to([mark.current, meta.current], { autoAlpha: 0, y: -16, duration: 0.5, ease: "power2.in" }, 1.35)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "power4.inOut" }, 1.5);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      kill();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="gts-loader fixed inset-0 z-[100] hidden flex-col items-center justify-center bg-obsidian"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="absolute inset-0 bg-blueprint opacity-50" />
      <div ref={mark} className="relative w-[min(26vw,320px)]">
        <Image
          src="/brand/gts-mark.png"
          alt=""
          width={900}
          height={659}
          sizes="320px"
          loading="eager"
          className="h-auto w-full"
        />
      </div>
      <span
        ref={line}
        className="bg-gold-sweep absolute left-0 right-0 top-1/2 mt-[min(13vw,160px)] h-px origin-center scale-x-0"
      />
      <div
        ref={meta}
        className="eyebrow absolute inset-x-0 bottom-10 flex items-end justify-between px-[var(--spacing-gutter)] text-steel-500 opacity-0"
      >
        <span>{site.legalName}</span>
        <span className="text-gold" ref={counter}>
          000
        </span>
        <span>{site.location.coordinates.display}</span>
      </div>
    </div>
  );
}
