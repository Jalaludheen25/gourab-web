"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Media } from "@/data/types";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { whenNearViewport } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  media: Media;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Clip-path wipe as the frame enters the viewport */
  reveal?: boolean;
  /** Subtle scroll-linked parallax inside the frame (desktop only) */
  parallax?: boolean;
  /** Load immediately (above-the-fold imagery) */
  eager?: boolean;
  /** Direction of the wipe */
  from?: "bottom" | "left" | "right";
  caption?: string;
  overlay?: boolean;
};

const clipFrom = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Image frame with a masked reveal and slow settle. The reveal is armed
 * lazily near the viewport; parallax is reserved for desktop pointers.
 */
export function RevealImage({
  media,
  sizes,
  className,
  imageClassName,
  reveal = true,
  parallax = true,
  eager = false,
  from = "bottom",
  caption,
  overlay = false,
}: RevealImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    const img = inner.current;
    if (!el || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tweens: (gsap.core.Tween | ScrollTrigger)[] = [];
    let stop = () => {};

    if (reveal) {
      gsap.set(el, { clipPath: clipFrom[from] });
      gsap.set(img, { scale: 1.28 });
      stop = whenNearViewport(
        el,
        () => {
          tweens.push(gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }));
          tweens.push(gsap.to(img, { scale: 1, duration: 2, ease: "expo.out" }));
        },
        "0px 0px -10% 0px",
      );
    }

    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (parallax && desktop) {
      const p = gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      tweens.push(p);
    }

    return () => {
      stop();
      tweens.forEach((t) => t.kill());
      gsap.set([el, img], { clearProps: "clipPath,transform" });
    };
  }, [reveal, parallax, from]);

  return (
    <figure className={cn("relative", className)}>
      <div ref={frame} className="relative h-full w-full overflow-hidden bg-graphite" data-cursor="image">
        <div
          ref={inner}
          className={cn("absolute", parallax ? "-inset-y-[9%] inset-x-0" : "inset-0")}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            placeholder="blur"
            loading={eager ? "eager" : "lazy"}
            className={cn("object-cover", imageClassName)}
            style={{ objectPosition: media.position }}
          />
        </div>
        {overlay && <div aria-hidden className="absolute inset-0 bg-obsidian/25" />}
      </div>
      {caption && (
        <figcaption className="eyebrow mt-3 flex items-center gap-3 text-current opacity-70">
          <span aria-hidden className="h-px w-5 bg-current" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
