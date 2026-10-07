"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/data/navigation";
import { services } from "@/data/services";
import { primaryEmail, primaryPhone, site } from "@/data/site";

const ease = [0.76, 0, 0.24, 1] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const lastPath = useRef(pathname);

  // Close when the route changes
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Escape to close + move focus into the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("a")?.focus(), 450);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, ease }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-obsidian pt-24 lg:hidden"
          data-lenis-prevent
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" />

          <nav aria-label="Mobile" className="shell relative flex-1">
            <ul className="border-t border-white/[0.07]">
              {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-white/[0.07]">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: 0.9, ease, delay: 0.18 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline justify-between py-4 text-[clamp(2.4rem,11vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] text-steel-50 active:text-gold"
                    >
                      {item.label}
                      <span className="font-mono text-xs tracking-normal text-gold">0{i}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.55 }}
              className="mt-8"
            >
              <p className="eyebrow mb-4 text-steel-500">Services</p>
              <ul className="no-scrollbar -mx-[var(--spacing-gutter)] flex gap-3 overflow-x-auto px-[var(--spacing-gutter)] pb-2">
                {services.map((s) => (
                  <li key={s.slug} className="shrink-0">
                    <Link href={`/services/${s.slug}`} onClick={onClose} className="block w-40">
                      <span className="relative block aspect-[4/5] overflow-hidden bg-graphite chamfer">
                        <Image
                          src={s.image.src}
                          alt=""
                          fill
                          sizes="160px"
                          className="object-cover opacity-80"
                          style={{ objectPosition: s.image.position }}
                        />
                      </span>
                      <span className="mt-2 flex items-center gap-2 text-sm text-steel-200">
                        <span className="font-mono text-[0.6rem] text-gold">{s.index}</span>
                        {s.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="shell relative mt-10 space-y-6 pb-10"
          >
            <ButtonLink href="/contact" size="lg" className="w-full" magnetic={false}>
              Start a project
            </ButtonLink>
            <div className="grid grid-cols-1 gap-2 font-mono text-xs tracking-wide text-steel-400 sm:grid-cols-2">
              <a href={primaryPhone.href} className="py-1">
                {primaryPhone.display}
              </a>
              <a href={`mailto:${primaryEmail.address}`} className="break-all py-1">
                {primaryEmail.address}
              </a>
            </div>
            <p className="eyebrow text-steel-500">
              {site.location.city} · {site.location.country}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
