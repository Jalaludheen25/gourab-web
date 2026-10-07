import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Emphasis } from "@/components/ui/Emphasis";
import { RevealText } from "@/components/ui/RevealText";
import type { Media } from "@/data/types";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Crumb = { name: string; path: string };

type PageHeroProps = {
  eyebrow: string;
  /** Use *asterisks* for the italic serif accent */
  title: string;
  intro?: ReactNode;
  image?: Media;
  crumbs: Crumb[];
  aside?: ReactNode;
  /** full: 86svh · compact: 64svh · tight: content height (forms) */
  size?: "full" | "compact" | "tight";
};

/** Inner-page hero with breadcrumb, editorial title and optional full-bleed image */
export function PageHero({ eyebrow, title, intro, image, crumbs, aside, size = "full" }: PageHeroProps) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <section
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden bg-obsidian",
        size === "full" && "min-h-[86svh]",
        size === "compact" && "min-h-[64svh]",
      )}
    >
      <JsonLd data={breadcrumbJsonLd(trail)} />
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            className="animate-slow-zoom object-cover"
            style={{ objectPosition: image.position }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_11_13/0.82)_0%,rgb(10_11_13/0.45)_38%,rgb(10_11_13/0.88)_78%,var(--color-obsidian)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_11_13/0.7)_0%,transparent_65%)]" />
          <div aria-hidden className="grain absolute inset-0" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 bg-blueprint-fine opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      )}

      <div className={cn("shell relative pt-36", size === "tight" ? "pb-4" : "pb-12 lg:pb-16")}>
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="eyebrow flex flex-wrap items-center gap-2 text-steel-500">
            {trail.map((c, i) => (
              <Fragment key={c.path}>
                {i > 0 && <li aria-hidden className="text-steel-700">/</li>}
                <li>
                  {i < trail.length - 1 ? (
                    <Link href={c.path} className="transition-colors hover:text-steel-100">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-gold">
                      {c.name}
                    </span>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>

        <p className="eyebrow mb-6 text-steel-400">{eyebrow}</p>
        <RevealText
          as="h1"
          aboveFold
          className="max-w-[16ch] text-display font-bold text-steel-50 text-balance"
        >
          <Emphasis text={title} accentClassName="text-gold" />
        </RevealText>

        {(intro || aside) && (
          <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-white/10 pt-8">
            {intro && <div className="col-span-12 max-w-xl text-lead text-steel-300 lg:col-span-6">{intro}</div>}
            {aside && <div className="col-span-12 lg:col-span-5 lg:col-start-8">{aside}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
