"use client";

import { useSyncExternalStore } from "react";

function subscribeToQuery(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

/**
 * SSR-safe media query hook. Returns `serverValue` during SSR/hydration and
 * the live value afterwards.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    subscribeToQuery(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Desktop with a precise pointer — the only context where heavy motion, WebGL and the custom cursor run */
export function useIsDesktopPointer(): boolean {
  return useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
}

/**
 * Calls `onEnter` once when the element approaches the viewport.
 * Animation setup is deferred this way so nothing below the fold costs
 * layout or scripting time during the initial page load.
 */
export function whenNearViewport(el: Element, onEnter: () => void, rootMargin = "0px 0px -8% 0px") {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        onEnter();
      }
    },
    { rootMargin },
  );
  io.observe(el);
  return () => io.disconnect();
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
