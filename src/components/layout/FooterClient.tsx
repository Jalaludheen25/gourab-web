"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { whenNearViewport } from "@/lib/hooks";
import { useLenis } from "./SmoothScroll";

/** Gold datum line that draws across the footer as it enters (CSS transition) */
export function FooterLine() {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    return whenNearViewport(ref.current, () => setDrawn(true), "0px 0px -5% 0px");
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="bg-gold-sweep block h-px w-full origin-left transition-transform duration-[2000ms] ease-[var(--ease-quart)]"
      style={{ transform: drawn ? "scaleX(1)" : "scaleX(0)" }}
    />
  );
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
