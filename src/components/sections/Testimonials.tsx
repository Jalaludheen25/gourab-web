import { Eyebrow } from "@/components/ui/SectionHeading";
import { clients, testimonials } from "@/data/testimonials";

/**
 * Editorial testimonials — renders nothing until genuine, approved quotes
 * are added to data/testimonials.ts.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="relative bg-obsidian py-[var(--spacing-section)]">
      <div className="shell">
        <Eyebrow>Clients on Gourab</Eyebrow>
        <h2 id="testimonials-title" className="sr-only">
          Testimonials
        </h2>
        <ul className="mt-14 space-y-24">
          {testimonials.map((t) => (
            <li key={`${t.name}-${t.company ?? ""}`} className="grid grid-cols-12 gap-6">
              <span aria-hidden className="col-span-12 font-serif text-8xl leading-none text-gold lg:col-span-1">
                “
              </span>
              <figure className="col-span-12 lg:col-span-10">
                <blockquote className="text-statement font-medium text-steel-50">{t.quote}</blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5">
                  <span className="text-steel-100">{t.name}</span>
                  {(t.role || t.company) && (
                    <span className="text-steel-400">{[t.role, t.company].filter(Boolean).join(", ")}</span>
                  )}
                  {t.project && <span className="eyebrow text-steel-500">{t.project}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Monochrome client wall — hidden until real client logos are supplied */
export function ClientWall() {
  if (clients.length === 0) return null;

  return (
    <section aria-labelledby="clients-title" className="relative overflow-hidden border-y border-white/[0.07] bg-obsidian py-16">
      <div className="shell">
        <h2 id="clients-title" className="eyebrow text-steel-500">
          Clients & partners
        </h2>
      </div>
      <div className="mt-10 flex w-max animate-marquee gap-20 px-10 motion-reduce:animate-none">
        {[...clients, ...clients].map((c, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- small monochrome SVG/PNG logos
          <img
            key={`${c.name}-${i}`}
            src={c.logo}
            alt={i < clients.length ? c.name : ""}
            aria-hidden={i >= clients.length}
            className="h-10 w-auto opacity-50 grayscale transition-opacity hover:opacity-100"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
