"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import { whenNearViewport } from "./hooks";

/**
 * GSAP (+ ScrollTrigger + SplitText) is loaded on demand instead of being part
 * of every page's initial bundle — content paints first, motion follows.
 */
export type GsapKit = typeof import("./gsap");
type GsapContext = ReturnType<GsapKit["gsap"]["context"]>;

let kitPromise: Promise<GsapKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  kitPromise ??= import("./gsap");
  return kitPromise;
}

let refreshTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Triggers created asynchronously may be registered out of document order
 * (e.g. before a pin above them exists). Re-sort and refresh once things settle.
 */
export function scheduleScrollRefresh() {
  // Only pinned sections (desktop) shift layout for triggers created around them
  if (!window.matchMedia("(min-width: 1024px)").matches) return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    loadGsap().then(({ ScrollTrigger }) => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  }, 180);
}

/** Desktop pointer with motion allowed — where pins, parallax and intros run */
export const DESKTOP_MOTION = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
/** Any device that allows motion */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** `ctx.add(fn)` registers work created later (e.g. in observers) for automatic revert */
type Setup = (kit: GsapKit, ctx: GsapContext) => void | (() => void);

type Options = {
  deps?: DependencyList;
  /** Media query that must match at mount — otherwise GSAP is never downloaded */
  media?: string;
  /** Wait until the scope approaches the viewport before loading and running */
  lazy?: boolean;
};

/**
 * Lazy counterpart to useGSAP: loads GSAP, runs `setup` inside a
 * gsap.context scoped to `scope`, and reverts everything on cleanup.
 */
export function useLazyGsap(setup: Setup, scope: RefObject<Element | null>, options: Options = {}) {
  const { deps = [], media = MOTION_OK, lazy = false } = options;

  useEffect(() => {
    if (!window.matchMedia(media).matches) return;
    let cancelled = false;
    let ctx: GsapContext | undefined;
    let cleanup: void | (() => void);

    const start = () =>
      loadGsap().then((kit) => {
        if (cancelled) return;
        ctx = kit.gsap.context((self) => {
          cleanup = setup(kit, self);
        }, scope.current ?? undefined);
        scheduleScrollRefresh();
      });

    let stopWatching = () => {};
    if (lazy && scope.current) stopWatching = whenNearViewport(scope.current, start, "0px 0px 20% 0px");
    else start();

    return () => {
      cancelled = true;
      stopWatching();
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls re-runs via deps
  }, deps);
}
