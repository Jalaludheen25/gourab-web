"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/gsap-lazy";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Pulls its child gently toward the pointer. Mouse only; inert on touch. */
export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let detach = () => {};

    // GSAP is only fetched once the pointer first reaches the element
    const arm = () => {
      el.removeEventListener("pointerenter", arm);
      loadGsap().then(({ gsap }) => {
        if (cancelled) return;
        const toX = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
        const toY = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const r = el.getBoundingClientRect();
          toX((e.clientX - (r.left + r.width / 2)) * strength);
          toY((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const reset = () => {
          toX(0);
          toY(0);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", reset);
        detach = () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", reset);
          gsap.set(el, { clearProps: "transform" });
        };
      });
    };
    el.addEventListener("pointerenter", arm);

    return () => {
      cancelled = true;
      el.removeEventListener("pointerenter", arm);
      detach();
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}
