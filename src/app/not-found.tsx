import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-obsidian">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-80" />
      <div className="shell relative pb-16 pt-40">
        <p className="eyebrow text-gold">Error 404 · Sheet not found</p>
        <h1 className="mt-8 text-[clamp(6rem,24vw,22rem)] font-bold leading-[0.8] tracking-[-0.07em]">
          <span className="text-steel-metal">404</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-lead text-steel-300">
            This page isn&apos;t part of the plan. It may have moved, or the address may be mistyped.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-20">
        <Image src="/brand/gts-skyline.png" alt="" width={2000} height={370} sizes="100vw" className="h-auto w-full" />
      </div>
    </section>
  );
}
