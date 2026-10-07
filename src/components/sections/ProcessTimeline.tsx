"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

function CropMarks() {
  const mark = "absolute size-5 border-steel-600";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-[var(--spacing-gutter)] hidden lg:block">
      <span className={`${mark} left-0 top-0 border-l border-t`} />
      <span className={`${mark} right-0 top-0 border-r border-t`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span className={`${mark} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

/** Five-stage method drawn as a technical dimension line */
export function ProcessTimeline({ index = "03" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);
      const track = q("[data-track]")[0];

      const tl = gsap.timeline({
        scrollTrigger: { trigger: track, start: "top 78%", end: "bottom 45%", scrub: 0.8 },
      });
      tl.fromTo(q("[data-dim-line]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0)
        .fromTo(q("[data-dim-line-v]"), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1 }, 0);
      q("[data-node]").forEach((node, i, all) => {
        tl.fromTo(
          node,
          { backgroundColor: "rgba(242,194,48,0)", scale: 0.6 },
          { backgroundColor: "rgba(242,194,48,1)", scale: 1, duration: 0.12, ease: "none" },
          (i / Math.max(1, all.length - 1)) * 0.88,
        );
      });

      gsap.from(q("[data-step]"), {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: track, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="approach"
      aria-labelledby="approach-title"
      className="relative overflow-hidden bg-ink py-[var(--spacing-section)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-80" />
      <CropMarks />

      <div className="shell relative">
        <SectionHeading
          id="approach-title"
          index={index}
          eyebrow="Approach"
          title="From vision to handover — and beyond."
          intro="A clear, five-stage method that keeps every project accountable, from the first conversation to long-term care."
        />

        <div data-track className="relative mt-20 lg:mt-28">
          {/* Horizontal dimension line (desktop) */}
          <div aria-hidden className="absolute inset-x-0 top-[5px] hidden lg:block">
            <span className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-steel-500" />
            <span className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-steel-500" />
            <span className="block h-px w-full bg-white/10" />
            <span data-dim-line className="absolute inset-x-0 top-0 block h-px origin-left bg-gold" />
            <span className="eyebrow absolute -top-8 left-1/2 -translate-x-1/2 bg-ink px-4 text-[0.6rem] text-steel-500">
              Programme · Brief → Maintain
            </span>
          </div>

          {/* Vertical line (phones) */}
          <div aria-hidden className="absolute bottom-0 left-[5px] top-0 lg:hidden">
            <span className="block h-full w-px bg-white/10" />
            <span data-dim-line-v className="absolute inset-0 block w-px origin-top bg-gold" />
          </div>

          <ol className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-0">
            {approach.map((step) => (
              <li key={step.index} className="relative pl-10 lg:pl-0 lg:pr-8">
                <span
                  data-node
                  aria-hidden
                  className="absolute left-0 top-0 block size-[11px] border border-gold bg-gold/0 lg:relative"
                />
                <div data-step>
                  <p className="mt-0 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-steel-500 lg:mt-8">
                    Stage <span className="text-gold">{step.index}</span>
                  </p>
                  <h3 className="mt-4 text-title font-semibold text-steel-50">{step.title}</h3>
                  <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-steel-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div aria-hidden className="eyebrow mt-20 flex flex-wrap justify-between gap-4 border-t border-white/[0.07] pt-5 text-[0.6rem] text-steel-500">
          <span>DWG — GTS / Method</span>
          <span>Scale — NTS</span>
          <span>Sheet {index} / 07</span>
        </div>
      </div>
    </section>
  );
}
