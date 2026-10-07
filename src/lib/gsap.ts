"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Shared easing vocabulary (mirrors the CSS tokens) */
export const EASE = {
  expo: "expo.out",
  quart: "power4.inOut",
  swift: "power3.inOut",
  soft: "power2.out",
} as const;
