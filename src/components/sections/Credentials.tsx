"use client";

import { useRef, type ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { useLazyGsap } from "@/lib/gsap-lazy";
import { whenNearViewport } from "@/lib/hooks";
import { cn } from "@/lib/utils";

function Cell({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col justify-between gap-6 bg-bone p-6 sm:p-8", className)}>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-umber-soft">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function Figure({ value, note }: { value: string; note: string }) {
  return (
    <>
      <p className="font-mono text-[clamp(2.1rem,4.4vw,4.4rem)] font-medium leading-none tracking-[-0.04em] text-umber tabular-nums">
        <span className="sr-only">{value}</span>
        <span aria-hidden data-scramble={value}>
          {value}
        </span>
      </p>
      <p className="mt-3 text-sm text-umber-soft">{note}</p>
    </>
  );
}

/**
 * Verified company credentials, presented as the title block of an
 * engineering drawing. Every value comes from the Dubai commercial licence
 * or the MEA eMigrate record supplied by Gourab.
 */
export function Credentials({ index = "04" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useLazyGsap(
    ({ gsap }) => {
      const q = gsap.utils.selector(root);

      const stops = q("[data-scramble]").map((el) =>
        whenNearViewport(el, () => {
          const final = el.getAttribute("data-scramble") ?? "";
          const state = { p: 0 };
          gsap.to(state, {
            p: 1,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              const shown = Math.floor(state.p * final.length);
              el.textContent = final
                .split("")
                .map((ch, i) => (i < shown || !/\d/.test(ch) ? ch : String(Math.floor(Math.random() * 10))))
                .join("");
            },
            onComplete: () => {
              el.textContent = final;
            },
          });
        }),
      );

      const sheet = q("[data-sheet]")[0];
      if (sheet) {
        gsap.set(sheet, { clipPath: "inset(0% 0% 100% 0%)" });
        stops.push(
          whenNearViewport(sheet, () => {
            gsap.to(sheet, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
          }),
        );
      }
      return () => stops.forEach((stop) => stop());
    },
    root,
    { lazy: true },
  );

  return (
    <section
      ref={root}
      data-theme="sand"
      aria-labelledby="credentials-title"
      className="relative overflow-hidden bg-sand py-[var(--spacing-section)] text-umber"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-sand opacity-60" />
      <div className="shell relative">
        <SectionHeading
          id="credentials-title"
          index={index}
          eyebrow="Credentials"
          title="Licensed. Registered. Accountable."
          tone="sand"
          intro={
            <>
              The facts behind the name — as recorded on our Dubai commercial licence and our group&apos;s Indian
              government registration.
            </>
          }
        />

        <div data-sheet className="mt-16 border border-umber/25 bg-umber/20 p-px shadow-[0_30px_60px_-30px_rgb(42_37_31/0.35)]">
          <div className="grid grid-cols-12 gap-px">
            <Cell label="Company" className="col-span-12 lg:col-span-6">
              <p className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{site.legalName}</p>
              <p className="mt-2 text-lg text-umber-soft" lang="ar" dir="rtl">
                {site.arabicName}
              </p>
            </Cell>
            <Cell label="Legal form" className="col-span-12 sm:col-span-6 lg:col-span-3">
              <p className="text-lg font-medium leading-snug">{site.license.legalType}</p>
            </Cell>
            <Cell label="Licensing authority" className="col-span-12 sm:col-span-6 lg:col-span-3">
              <p className="text-lg font-medium leading-snug">{site.license.authority}</p>
            </Cell>

            <Cell label="Commercial licence Nº" className="col-span-12 md:col-span-4">
              <Figure value={site.license.licenseNo} note="Dubai Department of Economy and Tourism" />
            </Cell>
            <Cell label="Dubai Chamber Nº" className="col-span-12 md:col-span-4">
              <Figure value={site.license.chamberNo} note="Dubai Chamber of Commerce membership" />
            </Cell>
            <Cell label="Commercial register Nº" className="col-span-12 md:col-span-4">
              <Figure value={site.license.registerNo} note="Registered in the Emirate of Dubai" />
            </Cell>

            <Cell label="Disciplines" className="col-span-12 md:col-span-6">
              <div className="flex items-end gap-6">
                <p className="font-mono text-[clamp(2.1rem,4.4vw,4.4rem)] font-medium leading-none tracking-[-0.04em]">
                  0{services.length}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 pb-1 text-umber-soft">
                  {services.map((s) => (
                    <li key={s.slug}>{s.name}</li>
                  ))}
                </ul>
              </div>
            </Cell>
            <Cell label="Offices" className="col-span-12 md:col-span-6">
              <ul className="space-y-2">
                {site.offices.map((o) => (
                  <li key={o.label} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-umber/10 pb-2 last:border-0">
                    <span className="text-lg font-medium">
                      {[o.city, "region" in o ? o.region : undefined, o.country].filter(Boolean).join(", ")}
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-umber-soft">{o.label}</span>
                  </li>
                ))}
              </ul>
            </Cell>

            {site.group.map((g) => (
              <Cell key={g.raId} label="Group company" className="col-span-12">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.03em]">{g.name}</p>
                    <p className="mt-2 max-w-xl text-umber-soft">{g.description}</p>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs sm:grid-cols-3">
                    <div>
                      <dt className="uppercase tracking-[0.18em] text-umber-soft">RA ID</dt>
                      <dd className="mt-1 text-sm text-umber">{g.raId}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.18em] text-umber-soft">Status</dt>
                      <dd className="mt-1 flex items-center gap-2 text-sm text-umber">
                        <span aria-hidden className="size-1.5 rounded-full bg-[#3f8f5a]" />
                        {g.status}
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="uppercase tracking-[0.18em] text-umber-soft">Location</dt>
                      <dd className="mt-1 text-sm text-umber">{g.location}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-3">
                      <dt className="uppercase tracking-[0.18em] text-umber-soft">RC Nº</dt>
                      <dd className="mt-1 break-all text-sm text-umber">{g.rcNumber}</dd>
                    </div>
                  </dl>
                </div>
              </Cell>
            ))}
          </div>
        </div>

        <div aria-hidden className="eyebrow mt-5 flex flex-wrap justify-between gap-4 text-[0.6rem] text-umber-soft">
          <span>Title block — {site.legalName}</span>
          <span>Source — Dubai DET commercial licence · MEA eMigrate</span>
        </div>
      </div>
    </section>
  );
}
