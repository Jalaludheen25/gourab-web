"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { loadGsap } from "@/lib/gsap-lazy";

function labelFor(pathname: string): string {
  if (pathname === "/") return "Home";
  const nav = mainNav.find((n) => n.href.split("#")[0] === pathname);
  if (nav) return nav.label;
  const seg = pathname.split("/").filter(Boolean).pop() ?? "";
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Architectural curtain between routes. Internal link clicks are intercepted
 * in the capture phase (Next's <Link> bails on defaultPrevented), the curtain
 * rises, the route changes underneath, then the curtain lifts away.
 * Modified clicks, hash links, downloads and reduced-motion users get native
 * behaviour.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const fallback = useRef<number | undefined>(undefined);

  const reveal = useCallback(() => {
    window.clearTimeout(fallback.current);
    const el = overlay.current;
    if (!el) return;
    loadGsap().then(({ gsap }) => {
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { visibility: "hidden" });
            busy.current = false;
          },
        })
        .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut", delay: 0.12 });
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition !== undefined) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page — let anchors/hash behave natively

      e.preventDefault();
      if (busy.current) return;
      busy.current = true;

      const el = overlay.current;
      if (!el) return;
      if (label.current) label.current.textContent = labelFor(url.pathname);
      const target = url.pathname + url.search + url.hash;

      loadGsap()
        .then(({ gsap }) => {
          gsap
            .timeline()
            .set(el, { visibility: "visible", yPercent: 100 })
            .set(line.current, { scaleX: 0 })
            .to(el, { yPercent: 0, duration: 0.65, ease: "power4.inOut" })
            .to(line.current, { scaleX: 1, duration: 0.5, ease: "expo.out" }, "-=0.25")
            .add(() => {
              router.push(target);
              fallback.current = window.setTimeout(reveal, 2500);
            });
        })
        .catch(() => {
          // Animation unavailable — navigate without the curtain
          busy.current = false;
          router.push(target);
        });
    };

    // Warm the animation module on first intent so the curtain starts instantly
    const warm = () => void loadGsap();
    window.addEventListener("pointerdown", warm, { once: true, capture: true });
    window.addEventListener("focusin", warm, { once: true });
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("pointerdown", warm, true);
      window.removeEventListener("focusin", warm);
      window.removeEventListener("click", onClick, true);
    };
  }, [router, reveal]);

  // The new route has rendered underneath — lift the curtain
  useEffect(() => {
    if (!busy.current) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(reveal);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname, reveal]);

  return (
    <>
      {children}
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian"
        style={{ visibility: "hidden" }}
      >
        <div className="absolute inset-0 bg-blueprint opacity-60" />
        <div className="relative flex flex-col items-center gap-6">
          <Logo variant="stacked" className="w-44" />
          <span className="eyebrow text-steel-400" ref={label} />
        </div>
        <span ref={line} className="bg-gold-sweep absolute inset-x-0 bottom-0 h-px origin-left" />
      </div>
    </>
  );
}
