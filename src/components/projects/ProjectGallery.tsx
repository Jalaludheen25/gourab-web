"use client";

import { useRef } from "react";
import type { Project } from "@/data/types";
import { DESKTOP_MOTION, useLazyGsap } from "@/lib/gsap-lazy";
import { ProjectCard } from "./ProjectCard";

/**
 * Desktop: pinned horizontal gallery driven by vertical scroll.
 * Phones / tablets / reduced motion: vertical stack.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLazyGsap(
    ({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el || projects.length < 2) return;
        const distance = () => el.scrollWidth - window.innerWidth;
        const scroller = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-gallery-card]").forEach((card) => {
          gsap.fromTo(
            card.querySelector("img"),
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scroller,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    root,
    { deps: [projects.length], media: DESKTOP_MOTION },
  );

  return (
    <div ref={root} className="relative lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
      <div
        ref={track}
        className="shell flex flex-col gap-20 lg:w-max lg:max-w-none lg:flex-row lg:items-center lg:gap-[6vw] lg:pr-[20vw]"
      >
        {projects.map((p, i) => (
          <div key={p.slug} data-gallery-card className="w-full lg:w-[58vw] lg:max-w-[1100px]">
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
