import Link from "next/link";
import { ArrowLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { RevealText } from "@/components/ui/RevealText";
import type { Service } from "@/data/types";
import { cn } from "@/lib/utils";

/** Large alternating service panel used on /services */
export function ServicePanel({ service, flip = false }: { service: Service; flip?: boolean }) {
  return (
    <article className="grid grid-cols-12 items-center gap-x-6 gap-y-10 border-t border-white/10 py-16 lg:py-24">
      <div className={cn("col-span-12 lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
        <Link href={`/services/${service.slug}`} aria-label={service.name} tabIndex={-1} className="block">
          <RevealImage
            media={service.image}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="aspect-[4/3] lg:aspect-[16/11]"
            from={flip ? "right" : "left"}
          />
        </Link>
      </div>
      <div className={cn("col-span-12 lg:col-span-5", flip ? "lg:order-1 lg:col-start-1 lg:pr-8" : "lg:col-start-8 lg:pl-8")}>
        <p className="font-mono text-xs text-gold">{service.index}</p>
        <RevealText as="h2" className="mt-4 text-[clamp(2.75rem,4.3vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.05em] text-steel-50">
          {service.name}
        </RevealText>
        <p className="mt-6 font-serif text-2xl italic text-steel-300">{service.headline}</p>
        <p className="mt-6 max-w-md text-steel-400">{service.summary}</p>
        <ArrowLink href={`/services/${service.slug}`} className="mt-10 text-steel-100">
          Explore {service.name}
        </ArrowLink>
      </div>
    </article>
  );
}
