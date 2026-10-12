import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { DubaiClock } from "@/components/sections/DubaiClock";
import { RevealImage } from "@/components/ui/RevealImage";
import { media } from "@/data/media";
import { site, whatsappHref } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with Gourab Technical Services L.L.C. Call +971 55 866 0118 or email gb.gmdxb@gtsllcuae.com — construction, fit-out, interiors, maintenance, hospitality and cleaning in Dubai.",
  path: "/contact",
});

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 py-7">
      <p className="eyebrow text-steel-500">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  const whatsapp = whatsappHref("Hello Gourab, I'd like to discuss a project.");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a *project.*"
        intro="Tell us about your vision — from construction and fit-out to hospitality and cleaning — and we'll bring the expertise."
        crumbs={[{ name: "Contact", path: "/contact" }]}
        size="tight"
      />

      <section aria-label="Enquiry form and contact details" className="bg-obsidian pb-[var(--spacing-section)] pt-16 lg:pt-24">
        <div className="shell grid grid-cols-12 gap-x-6 gap-y-20">
          <div className="col-span-12 lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
            <DetailBlock label="Call">
              <ul className="space-y-3">
                {site.contact.phones.map((p) => (
                  <li key={p.href} className="flex items-baseline justify-between gap-4">
                    <a href={p.href} className="link-draw text-2xl font-medium tracking-[-0.02em] text-steel-50">
                      {p.display}
                    </a>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel-500">{p.label}</span>
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock label="Write">
              <ul className="space-y-3">
                {site.contact.emails.map((e) => (
                  <li key={e.address} className="break-all">
                    <a href={`mailto:${e.address}`} className="link-draw text-lg text-steel-100">
                      {e.address}
                    </a>
                  </li>
                ))}
              </ul>
            </DetailBlock>

            {whatsapp && (
              <DetailBlock label="WhatsApp">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link-draw text-lg text-steel-100">
                  Message us on WhatsApp
                </a>
              </DetailBlock>
            )}

            <DetailBlock label="Offices">
              <ul className="space-y-4">
                {site.offices.map((o) => (
                  <li key={o.label}>
                    <p className="text-lg text-steel-100">
                      {[o.city, "region" in o ? o.region : undefined, o.country].filter(Boolean).join(", ")}
                    </p>
                    <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-steel-500">{o.label}</p>
                  </li>
                ))}
              </ul>
            </DetailBlock>

            {site.contact.hours && (
              <DetailBlock label="Hours">
                <p className="text-steel-200">{site.contact.hours}</p>
              </DetailBlock>
            )}

            {site.social.length > 0 && (
              <DetailBlock label="Follow">
                <ul className="flex flex-wrap gap-4">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw text-steel-100">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            )}

            <DetailBlock label="Dubai now">
              <p className="flex items-center justify-between font-mono text-sm text-steel-300">
                <DubaiClock className="text-gold" />
                <span className="text-steel-500">{site.location.coordinates.display}</span>
              </p>
            </DetailBlock>

            <p className="border-t border-white/10 pt-7 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-steel-500">
              {site.legalName} · {site.license.authorityShort} Commercial Licence Nº {site.license.licenseNo}
            </p>
          </aside>
        </div>
      </section>

      <section aria-label="Dubai" className="bg-obsidian pb-[var(--spacing-section)]">
        <div className="shell">
          <RevealImage media={media.dubaiNightTower} sizes="100vw" className="aspect-[21/9]" caption="Dubai, United Arab Emirates" />
        </div>
      </section>
    </>
  );
}
