"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type CursorMode = "default" | "link" | "image" | "view";

/**
 * Desktop-only cursor. Elements opt in with data-cursor="link|image|view"
 * and an optional data-cursor-label. Native cursor is restored on touch,
 * coarse pointers and reduced motion.
 */
export function CustomCursor() {
  const enabled = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const active = enabled && !reduced;

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("View");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [role='button'], input, textarea, select, label");
      if (!target) return setMode("default");
      if (target.matches("input, textarea, select")) return setMode("default");
      const value = target.getAttribute("data-cursor");
      if (value === "view") {
        setLabel(target.getAttribute("data-cursor-label") ?? "View");
        setMode("view");
      } else if (value === "image") setMode("image");
      else setMode("link");
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      {/* Trailing ring / label */}
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className={cn(
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-500 ease-[var(--ease-expo)]",
            !visible && "opacity-0",
            mode === "default" && "size-8 border border-steel-50/25",
            mode === "link" && "size-14 border border-gold/70",
            mode === "image" && "size-20 border border-steel-50/50 backdrop-blur-[2px]",
            mode === "view" && "size-28 border border-transparent bg-gold",
            pressed && "scale-90",
          )}
        >
          <span
            className={cn(
              "flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-obsidian transition-opacity duration-300",
              mode === "view" ? "opacity-100" : "opacity-0",
            )}
          >
            {label}
            <ArrowUpRight className="size-3" strokeWidth={2} />
          </span>
        </div>
      </div>
      {/* Precise dot */}
      <div ref={dot} className="absolute left-0 top-0 will-change-transform">
        <div
          className={cn(
            "size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold transition-opacity duration-300",
            (!visible || mode === "view") && "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
