"use client";

import { useEffect, useRef, useState } from "react";
import { RevealImage } from "@/components/ui/RevealImage";
import { RevealText } from "@/components/ui/RevealText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { approach, stageId } from "@/data/content";
import { media } from "@/data/media";
import type { Media } from "@/data/types";
import { cn } from "@/lib/utils";

const stageMedia: Media[] = [
  media.glassFacadeSky,
  media.concreteRibs,
  media.scaffoldWorker,
  media.whiteStair,
  media.toolWall,
];

/** The five stages in depth: a sticky counter and rail (desktop) beside long-form stage panels */
export function ApproachStages({ index = "01" }: { index?: string }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const total = approach.length;

  // A stage is "current" while it crosses the middle band of the viewport
  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-stage]");
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="stages-title" className="relative bg-obsidian py-[var(--spacing-section)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />

      <div className="shell relative grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-9rem)] lg:flex-col">
            <Eyebrow index={index}>The method</Eyebrow>
            <h2 id="stages-title" className="mt-7 text-headline font-semibold text-steel-50 text-balance">
              Five stages.
              <br />
              <span className="font-serif font-normal italic text-steel-400">One clear line.</span>
            </h2>

            {/* Odometer-style stage counter */}
            <div aria-hidden className="mt-auto hidden pt-10 lg:block">
              <div className="relative h-[clamp(6rem,11vw,10.5rem)] overflow-hidden">
                {approach.map((s, i) => (
                  <span
                    key={s.index}
                    className="text-steel-metal absolute inset-0 text-[clamp(6rem,11vw,10.5rem)] font-semibold leading-none tracking-[-0.06em] transition-transform duration-[900ms] ease-[var(--ease-expo)]"
                    style={{ transform: `translateY(${(i - active) * 100}%)` }}
                  >
                    {s.index}
                  </span>
                ))}
              </div>
            </div>

            <nav aria-label="Stages" className="mt-8 hidden lg:block">
              <div className="relative">
                <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-white/10" />
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-px origin-top bg-gold transition-transform duration-700 ease-[var(--ease-expo)]"
                  style={{ transform: `scaleY(${(active + 1) / total})` }}
                />
                <ol>
                  {approach.map((s, i) => (
                    <li key={s.index}>
                      <a
                        href={`#${stageId(s.title)}`}
                        aria-current={i === active ? "step" : undefined}
                        data-cursor="link"
                        className={cn(
                          "flex items-baseline gap-4 py-1.5 pl-6 text-lg font-medium tracking-[-0.01em] transition-colors duration-500",
                          i === active ? "text-steel-50" : "text-steel-500 hover:text-steel-300",
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[0.66rem] transition-colors duration-500",
                            i === active ? "text-gold" : "text-steel-600",
                          )}
                        >
                          {s.index}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          </div>
        </div>

        <ol ref={list} className="col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {approach.map((s, i) => (
            <li
              key={s.index}
              id={stageId(s.title)}
              data-stage={i}
              className="scroll-mt-28 border-t border-white/10 py-14 first:border-t-0 first:pt-0 lg:flex lg:min-h-[85svh] lg:flex-col lg:justify-center lg:py-20 lg:first:pt-20"
            >
              <div className="flex items-end justify-between gap-6">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-steel-500">
                  Stage <span className="text-gold">{s.index}</span> / 0{total}
                </p>
                <span
                  aria-hidden
                  className="text-steel-metal text-6xl font-semibold leading-none tracking-[-0.06em] lg:hidden"
                >
                  {s.index}
                </span>
              </div>
              <RevealText
                as="h3"
                className="mt-6 text-[clamp(2.75rem,5.5vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-steel-50"
              >
                {`${s.title}.`}
              </RevealText>
              <p className="mt-6 max-w-lg text-lead text-steel-400">{s.body}</p>
              <RevealImage
                media={stageMedia[i]}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="mt-10 aspect-[16/10]"
                from={i % 2 ? "right" : "left"}
                caption={`Fig. ${s.index} — ${s.title}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
