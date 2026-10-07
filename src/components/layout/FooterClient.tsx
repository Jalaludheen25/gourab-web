"use client";

import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

/** Gold datum line that draws across the footer as it enters */
export function FooterLine() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      },
    );
  });
  return <span ref={ref} aria-hidden className="bg-gold-sweep block h-px w-full origin-left" />;
}

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-2 uppercase text-steel-400 transition-colors hover:text-steel-50"
      data-cursor="link"
    >
      Back to top
      <ArrowUp className="size-3.5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1" strokeWidth={1.5} />
    </button>
  );
}
