"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { loadGsap, scheduleScrollRefresh } from "@/lib/gsap-lazy";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis
 * share a single frame loop. Desktop pointers only (both libraries are
 * loaded on demand); disabled for reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    // Touch devices keep native scrolling; reduced-motion users get no smoothing
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)").matches) return;

    let cancelled = false;
    let teardown = () => {};

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const instance = new LenisCtor({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: { offset: -80 },
      });
      instance.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
      teardown = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
      };
    });

    return () => {
      cancelled = true;
      teardown();
      setLenis(null);
    };
  }, []);

  // Reset scroll on route change, then honour any #hash once layout settles
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => {
      scheduleScrollRefresh();
      const hash = window.location.hash;
      if (hash.length > 1) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          if (lenis) lenis.scrollTo(target, { immediate: true, force: true, offset: -80 });
          else target.scrollIntoView();
        }
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
