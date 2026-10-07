import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { legalNav, mainNav } from "@/data/navigation";
import { services } from "@/data/services";
import { site, whatsappHref } from "@/data/site";
import { BackToTop, FooterLine } from "./FooterClient";

const year = new Date().getFullYear();

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-6 text-steel-500">{title}</p>
      {children}
    </div>
  );
}

export function Footer() {
  const whatsapp = whatsappHref();

  return (
    <footer className="relative overflow-hidden bg-obsidian pt-24 text-steel-300 lg:pt-32" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />

      <div className="shell relative">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 pb-20">
          <div className="col-span-12 lg:col-span-5">
            <Link href="/" aria-label="Gourab Technical Services — home" className="block w-full max-w-[380px]" data-cursor="link">
              <Logo variant="wordmark" />
            </Link>
            <p className="mt-10 font-serif text-[clamp(1.9rem,3vw,2.75rem)] italic leading-[1.05] text-steel-100">
              Your Vision.
              <br />
              <span className="text-gold">Our Expertise.</span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel-500" lang="ar" dir="rtl">
              {site.arabicName}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-2">
            <Column title="Navigate">
              <ul className="space-y-3 text-[0.95rem]">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-draw text-steel-300 hover:text-steel-50">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-2">
            <Column title="Services">
              <ul className="space-y-3 text-[0.95rem]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="link-draw text-steel-300 hover:text-steel-50">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <Column title="Contact">
              <ul className="space-y-3 text-[0.95rem]">
                {site.contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="link-draw text-steel-200 hover:text-steel-50">
                      {p.display}
                    </a>
                    <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel-500">{p.label}</span>
                  </li>
                ))}
                {site.contact.emails.map((e) => (
                  <li key={e.address} className="break-all">
                    <a href={`mailto:${e.address}`} className="link-draw text-steel-200 hover:text-steel-50">
                      {e.address}
                    </a>
                  </li>
                ))}
                {whatsapp && (
                  <li>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link-draw text-steel-200 hover:text-steel-50">
                      WhatsApp
                    </a>
                  </li>
                )}
                {site.contact.hours && <li className="text-steel-500">{site.contact.hours}</li>}
              </ul>
              <ul className="mt-8 space-y-4 text-sm">
                {site.offices.map((o) => (
                  <li key={o.label}>
                    <span className="eyebrow block text-steel-500">{o.label}</span>
                    <span className="mt-1 block text-steel-300">
                      {[o.city, "region" in o ? o.region : undefined, o.country].filter(Boolean).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
              {site.social.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-4 text-sm">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Column>
          </div>
        </div>

        <FooterLine />

        <div className="flex flex-col gap-6 py-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-steel-500 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>
            {site.license.authorityShort} Commercial Licence Nº {site.license.licenseNo}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-steel-200">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <BackToTop />
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden className="relative mx-auto mt-4 w-full max-w-[1760px] px-[var(--spacing-gutter)] opacity-[0.22]">
        <Image src="/brand/gts-skyline.png" alt="" width={2000} height={370} sizes="100vw" className="h-auto w-full" />
      </div>
    </footer>
  );
}
