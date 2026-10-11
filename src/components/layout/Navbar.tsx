"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/data/navigation";
import { loadGsap } from "@/lib/gsap-lazy";
import { useIntroDone } from "@/lib/intro";
import { cn } from "@/lib/utils";
import { useLenis } from "./SmoothScroll";

// The full-screen menu (and framer-motion) only loads once it is first opened
const MobileMenu = dynamic(() => import("./MobileMenu").then((m) => m.MobileMenu), { ssr: false });

export function Navbar() {
  const pathname = usePathname();
  const introDone = useIntroDone();
  const lenis = useLenis();
  const header = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  // Compact + hide-on-scroll-down behaviour
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Enter after the intro on desktop
  // (CSS only hides it on desktop with motion allowed — elsewhere it is already visible)
  useEffect(() => {
    const el = header.current;
    if (!introDone || !el) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, yPercent: -60 },
        { autoAlpha: 1, yPercent: 0, duration: 1.2, ease: "expo.out", delay: 0.55 },
      );
    });
    return () => {
      cancelled = true;
    };
  }, [introDone]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
  }, [open, lenis]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (href.includes("#")) return false;
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-expo)]",
          hidden && !open ? "-translate-y-[110%]" : "translate-y-0",
        )}
      >
        <div ref={header} data-intro className="relative">
        <div
          className={cn(
            "absolute inset-0 border-b transition-all duration-700 ease-[var(--ease-expo)]",
            scrolled && !open
              ? "border-white/[0.06] bg-obsidian/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        />
        <nav
          aria-label="Primary"
          className={cn(
            "shell relative flex items-center justify-between transition-[height] duration-700 ease-[var(--ease-expo)]",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-[var(--header-h)]",
          )}
        >
          <Link
            href="/"
            aria-label="Gourab Technical Services — home"
            className={cn(
              "relative z-10 block transition-[height] duration-700 ease-[var(--ease-expo)]",
              scrolled ? "h-9 lg:h-10" : "h-11 lg:h-10",
            )}
            data-cursor="link"
          >
            <Logo variant="lockup" eager className="h-full" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative flex items-start gap-1.5 px-4 py-2 text-[0.9rem] font-medium tracking-[-0.01em] transition-colors duration-300",
                    isActive(item.href) ? "text-steel-50" : "text-steel-300 hover:text-steel-50",
                  )}
                >
                  <span className="font-mono text-[0.58rem] leading-none tracking-normal text-steel-500 transition-colors group-hover:text-gold">
                    0{i + 1}
                  </span>
                  <span className="relative">
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ease-[var(--ease-expo)]",
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <div className="hidden lg:block">
              <ButtonLink href="/contact" size="md" className="h-11 whitespace-nowrap">
                Request a quote
              </ButtonLink>
            </div>
            <button
              type="button"
              onPointerDown={() => setMenuLoaded(true)}
              onFocus={() => setMenuLoaded(true)}
              onClick={() => {
                setMenuLoaded(true);
                setOpen((v) => !v);
              }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 items-center gap-3 pl-3 text-steel-50 lg:hidden"
            >
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em]">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative block h-3 w-7" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)]",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px bg-gold transition-all duration-500 ease-[var(--ease-expo)]",
                    open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
        </div>
      </header>

      {menuLoaded && <MobileMenu open={open} onClose={closeMenu} />}
    </>
  );
}
