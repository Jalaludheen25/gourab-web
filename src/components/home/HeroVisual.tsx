"use client";

import dynamic from "next/dynamic";
import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { media } from "@/data/media";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/lib/hooks";
import { useIntroDone } from "@/lib/intro";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

let webglCache: boolean | null = null;
/**
 * True only for hardware-accelerated WebGL. `failIfMajorPerformanceCaveat`
 * rejects software rasterisers (SwiftShader, llvmpipe, blocklisted GPUs),
 * where the scene would stutter — those visitors get the photograph instead.
 */
function detectWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    const opts: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true };
    const gl = (canvas.getContext("webgl2", opts) || canvas.getContext("webgl", opts)) as WebGLRenderingContext | null;
    let accelerated = !!gl;
    if (gl) {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
      if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) accelerated = false;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    webglCache = accelerated;
  } catch {
    webglCache = false;
  }
  return webglCache;
}
const noopSubscribe = () => () => {};

const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Hero backdrop.
 * Desktop (fine pointer, WebGL, motion allowed): the 3D structure, loaded
 * lazily so it never blocks first paint.
 * Phones / tablets / reduced motion / no WebGL: cinematic Dubai photograph.
 */
export function HeroVisual() {
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const introDone = useIntroDone();
  const use3D = desktop && !reduced && webgl;

  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [mount3D, setMount3D] = useState(false);

  // Build the scene only after the intro, when the main thread is idle
  useEffect(() => {
    if (!use3D || !introDone) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setMount3D(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(() => setMount3D(true), 300);
    return () => globalThis.clearTimeout(id);
  }, [use3D, introDone]);

  useEffect(() => {
    if (!use3D || !container.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(container.current);
    return () => io.disconnect();
  }, [use3D]);

  // Phone-first art direction: the photograph is never downloaded on desktop
  const { props: mobileImg } = getImageProps({
    src: media.dubaiBlueHour.src,
    alt: "",
    fill: true,
    sizes: "100vw",
    quality: 70,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <div ref={container} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Phone / tablet photograph */}
      <picture className="absolute inset-0 lg:hidden">
        <source media="(min-width: 1024px)" srcSet={BLANK} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is supplied via the spread next/image props */}
        <img
          {...mobileImg}
          className="h-full w-full animate-slow-zoom object-cover"
          style={{ ...mobileImg.style, objectPosition: media.dubaiBlueHour.position }}
        />
      </picture>

      {/* Desktop atmosphere — always present beneath the 3D layer */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_72%_42%,rgb(242_194_48/0.10),transparent_65%),radial-gradient(ellipse_50%_70%_at_85%_100%,rgb(134_170_255/0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-blueprint opacity-60 [mask-image:radial-gradient(ellipse_80%_80%_at_70%_50%,black,transparent)]" />
      </div>

      {/* Desktop fallback photograph when 3D is unavailable */}
      {desktop && !use3D && (
        <Image
          src={media.dubaiBlueHour.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="hidden object-cover lg:block"
          style={{ objectPosition: media.dubaiBlueHour.position }}
        />
      )}

      {use3D && mount3D && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[2400ms] ease-[var(--ease-soft)]",
            ready && introDone ? "opacity-100" : "opacity-0",
          )}
        >
          <HeroScene active={inView} play={ready && introDone} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
