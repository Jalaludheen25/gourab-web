"use client";

import { useRef } from "react";
import { Emphasis } from "@/components/ui/Emphasis";
import { brandStatement } from "@/data/content";
import { site } from "@/data/site";
import { useLazyGsap } from "@/lib/gsap-lazy";

/** Editorial positioning statement — words light up with scroll progress */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useLazyGsap(
    ({ gsap, SplitText }) => {
      // Runs only as the statement approaches (lazy), so nothing costs at load
      const text = root.current?.querySelector("[data-statement]");
      if (!text) return;
      const split = SplitText.create(text, { type: "words", aria: "hidden" });
      const scrollTrigger = { trigger: text, start: "top 78%", end: "bottom 52%", scrub: 0.6 };
      gsap.fromTo(split.words, { opacity: 0.5 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger });
      gsap.fromTo("[data-statement-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger });
      return () => split.revert();
    },
    root,
    { lazy: true },
  );

  return (
    <section ref={root} aria-label="Positioning" className="relative overflow-hidden bg-obsidian py-[var(--spacing-section)]">
      <div className="shell grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 flex flex-col justify-between gap-6 lg:col-span-3">
          <p className="eyebrow flex items-center gap-3 text-steel-500">
            <span aria-hidden className="size-1.5 bg-gold" />
            Positioning
          </p>
          <div className="hidden lg:block">
            <p className="font-serif text-2xl italic text-steel-300">{site.tagline}</p>
            <p className="mt-2 text-sm text-steel-500" lang="ar" dir="rtl">
              {site.arabicName}
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <p data-statement className="text-statement font-medium text-steel-50 text-balance">
            <Emphasis text={brandStatement} accentClassName="text-gold" />
          </p>
          <span aria-hidden data-statement-line className="bg-gold-sweep mt-12 block h-px w-full origin-left" />
        </div>
      </div>
    </section>
  );
}
