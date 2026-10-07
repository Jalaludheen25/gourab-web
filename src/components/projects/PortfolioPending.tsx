import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

const willInclude = ["Location & programme", "Scope of works", "Project photography", "Completion notes"];

/**
 * Honest placeholder shown while Gourab's case studies are being prepared.
 * Disappears automatically once projects are added to data/projects.ts.
 */
export function PortfolioPending({ sheet = "06" }: { sheet?: string }) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-ink chamfer-both [--cut:32px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-[0.35] [mask-image:linear-gradient(to_top,black,transparent)]">
        <Image src="/brand/gts-skyline.png" alt="" width={2000} height={370} sizes="100vw" className="h-auto w-full" />
      </div>

      <div className="relative grid grid-cols-12 gap-x-6 gap-y-12 p-7 sm:p-10 lg:p-16">
        <div className="col-span-12 lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-steel-400">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-gold" />
            </span>
            Status — In preparation
          </p>
          <h3 className="mt-8 text-[clamp(2.2rem,4.6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-steel-50">
            Case studies are being{" "}
            <span className="font-serif font-normal italic text-gold">documented.</span>
          </h3>
          <p className="mt-6 max-w-xl text-lead text-steel-400">
            We&apos;re preparing our project portfolio with the detail it deserves. Each case study will be published
            here once it&apos;s approved for release. Until then, the best way to see what Gourab can do is to talk
            to us about your project.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline">
              View services
            </ButtonLink>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="border border-white/10 bg-obsidian/60 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel-500">
              <span>Sheet {sheet}</span>
              <span>Portfolio</span>
            </div>
            <p className="px-5 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel-500">
              Each case study will include
            </p>
            <ul className="px-5 pb-5 pt-3">
              {willInclude.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between border-b border-white/[0.06] py-3 text-steel-200 last:border-0"
                >
                  {item}
                  <span className="font-mono text-[0.62rem] text-steel-500">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
