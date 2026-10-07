"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import type { GsapKit } from "@/lib/gsap-lazy";
import { loadGsap } from "@/lib/gsap-lazy";
import { whenNearViewport } from "@/lib/hooks";
import { useIntroDone } from "@/lib/intro";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /**
   * For text that is visible on first paint (page heroes): the text is
   * hidden by CSS on desktop until the reveal runs, and left static on
   * smaller screens so it never delays Largest Contentful Paint.
   */
  aboveFold?: boolean;
};

/**
 * Masked line-by-line reveal. The split is created lazily as the text nears
 * the viewport and reverted once the animation ends, so it costs nothing at
 * load and leaves clean, responsive markup behind.
 */
export function RevealText({
  as: Tag = "p",
  id,
  children,
  className,
  delay = 0,
  stagger = 0.09,
  aboveFold = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);
  const introDone = useIntroDone();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Above-the-fold text waits for the first-visit intro to finish
    if (aboveFold && !introDone) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduced || (aboveFold && !desktop)) {
      el.style.opacity = "1";
      return;
    }

    let split: InstanceType<GsapKit["SplitText"]> | null = null;
    let tween: ReturnType<GsapKit["gsap"]["from"]> | null = null;
    let cancelled = false;
    // Opacity (not visibility) keeps the text in the accessibility tree while it waits
    el.style.opacity = "0";

    const run = () => {
      Promise.all([loadGsap(), document.fonts.ready]).then(([{ gsap, SplitText }]) => {
        if (cancelled) return;
        const isHeading = /^H[1-6]$/.test(el.tagName);
        split = SplitText.create(el, { type: "lines", mask: "lines", aria: isHeading ? "auto" : "hidden" });
        el.style.opacity = "1";
        tween = gsap.from(split.lines, {
          yPercent: 118,
          rotate: 1.5,
          transformOrigin: "0% 100%",
          duration: 1.25,
          ease: "expo.out",
          stagger,
          delay,
          onComplete: () => {
            split?.revert();
            split = null;
          },
        });
      });
    };

    let stop = () => {};
    if (aboveFold) run();
    else stop = whenNearViewport(el, run);

    return () => {
      cancelled = true;
      stop();
      tween?.kill();
      split?.revert();
      el.style.opacity = "";
    };
  }, [aboveFold, introDone, delay, stagger]);

  return (
    <Tag ref={setRef} id={id} className={cn(className)} data-reveal={aboveFold ? "fold" : undefined}>
      {children}
    </Tag>
  );
}
