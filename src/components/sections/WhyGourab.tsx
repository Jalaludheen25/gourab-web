"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiators } from "@/data/content";
import { useLazyGsap } from "@/lib/gsap-lazy";
import { whenNearViewport } from "@/lib/hooks";

/** Differentiators as oversized statements, not icon cards */
export function WhyGourab({ index = "05" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useLazyGsap(
    ({ gsap }) => {
      const stops = gsap.utils.toArray<HTMLElement>("[data-why-row]").map((row) => {
        const title = row.querySelector("[data-why-title]");
        const fades = row.querySelectorAll("[data-why-fade]");
        gsap.set(title, { yPercent: 105 });
        gsap.set(fades, { opacity: 0, y: 20 });
        return whenNearViewport(row, () => {
          gsap.to(title, { yPercent: 0, duration: 1.4, ease: "expo.out" });
          gsap.to(fades, { opacity: 1, y: 0, duration: 1.2, delay: 0.15, ease: "expo.out" });
        });
      });
      return () => stops.forEach((stop) => stop());
    },
    root,
    { lazy: true },
  );

  return (
    <section ref={root} aria-labelledby="why-title" className="relative bg-obsidian pb-[calc(var(--spacing-section)*0.55)] pt-[var(--spacing-section)]">
      <div className="shell">
        <SectionHeading
          id="why-title"
          index={index}
          eyebrow="Why Gourab"
          title="What the name stands for."
          intro="Four reasons clients can hold us to — each grounded in how Gourab is set up, not in slogans."
        />

        <ul className="mt-16 border-t border-white/10 lg:mt-24">
          {differentiators.map((d, i) => (
            <li
              key={d.title}
              data-why-row
              className="group relative grid grid-cols-12 items-end gap-x-6 gap-y-4 border-b border-white/10 py-9 lg:py-12"
            >
              <span
                aria-hidden
                className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-x-100"
              />
              <span data-why-fade className="col-span-12 font-mono text-xs text-steel-500 lg:col-span-1 lg:self-start lg:pt-4">
                0{i + 1}
              </span>
              <div className="col-span-12 overflow-hidden pb-[0.08em] lg:col-span-7">
                <h3
                  data-why-title
                  className="text-[clamp(2.5rem,6.4vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-steel-50 transition-transform duration-700 ease-[var(--ease-expo)] lg:group-hover:translate-x-4"
                >
                  {d.title}
                  <span className="text-gold">.</span>
                </h3>
              </div>
              <p data-why-fade className="col-span-12 max-w-sm text-[1.02rem] leading-relaxed text-steel-400 lg:col-span-4 lg:col-start-9">
                {d.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
