"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { team } from "@/data/team";
import { whenNearViewport } from "@/lib/hooks";

/**
 * Leadership portraits in matching 4:5 frames on the sand tone. The white
 * studio backgrounds are multiplied into the sand so all three sit evenly.
 * Frames rise in with a vertical mask once the grid nears the viewport.
 */
export function LeadershipTeam() {
  const root = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.reveal = "armed";
    const stop = whenNearViewport(
      el,
      () => requestAnimationFrame(() => (el.dataset.reveal = "shown")),
      "0px 0px -12% 0px",
    );
    return () => {
      stop();
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <ul ref={root} className="group/team grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-3">
      {team.map((m, i) => (
        <li key={m.name} className="group/card">
          <figure>
            <div
              className="transition-[clip-path] duration-[1400ms] ease-[var(--ease-expo)] [clip-path:inset(0%_0%_0%_0%)] group-data-[reveal=armed]/team:[clip-path:inset(100%_0%_0%_0%)]"
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className="relative isolate aspect-[4/5] overflow-hidden bg-sand chamfer [--cut:22px]" data-cursor="image">
                <Image
                  src={m.photo.src}
                  alt={m.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1440px) 440px, (min-width: 640px) 32vw, 100vw"
                  className="object-cover mix-blend-multiply transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover/card:scale-[1.035] group-data-[reveal=armed]/team:scale-[1.15]"
                  style={{ objectPosition: m.photo.position, transitionDelay: `${i * 140}ms` }}
                />
                <span
                  aria-hidden
                  className="absolute left-5 top-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-umber-soft"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
            <figcaption
              className="mt-6 border-t border-white/10 pt-5 transition-[opacity,translate] duration-1000 ease-[var(--ease-expo)] group-data-[reveal=armed]/team:translate-y-4 group-data-[reveal=armed]/team:opacity-0"
              style={{ transitionDelay: `${300 + i * 140}ms` }}
            >
              <h3 className="text-title font-semibold text-steel-50">{m.name}</h3>
              <p className="mt-2 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.2em] text-gold">{m.role}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
