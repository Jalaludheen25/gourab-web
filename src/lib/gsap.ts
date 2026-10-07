"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * GSAP core + plugins. Never import this module statically from components —
 * use `loadGsap()` / `useLazyGsap()` from ./gsap-lazy so motion code stays out
 * of the initial bundle.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, ScrollTrigger, SplitText };
