import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** Leadership and group company — verified details only */
export function PeopleAndGroup({ index = "04" }: { index?: string }) {
  return (
    <section aria-labelledby="people-title" className="relative bg-obsidian py-[var(--spacing-section)]">
      <div className="shell">
        <SectionHeading
          id="people-title"
          index={index}
          eyebrow="People & group"
          title="Owner-led, with a registered group company."
          intro={`Gourab is owned and managed by ${site.leadership[0].name}, with its head office in Dubai. Its group company, ${site.group[0].name}, is based in West Bengal, India.`}
        />

        <div className="mt-16 grid grid-cols-12 gap-6">
          {site.leadership.map((person) => (
            <article
              key={person.name}
              className="relative col-span-12 flex flex-col justify-between gap-16 overflow-hidden border border-white/10 bg-ink p-8 chamfer [--cut:24px] lg:col-span-5"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" />
              <div className="relative flex items-start justify-between">
                <p className="eyebrow text-steel-500">Leadership</p>
                <span aria-hidden className="text-steel-metal text-7xl font-bold tracking-[-0.06em]">
                  {initials(person.name)}
                </span>
              </div>
              <div className="relative">
                <h3 className="text-title font-semibold text-steel-50">{person.name}</h3>
                <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">{person.role}</p>
              </div>
            </article>
          ))}

          {site.group.map((g) => (
            <article
              key={g.raId}
              className="col-span-12 flex flex-col justify-between gap-10 border border-white/10 p-8 lg:col-span-7"
            >
              <div>
                <p className="eyebrow text-steel-500">Group company</p>
                <h3 className="mt-6 text-title font-semibold text-steel-50">{g.name}</h3>
                <p className="mt-4 max-w-lg text-steel-400">{g.description}</p>
              </div>
              <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6 font-mono text-xs">
                <div>
                  <dt className="uppercase tracking-[0.18em] text-steel-500">RA ID</dt>
                  <dd className="mt-2 text-steel-200">{g.raId}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.18em] text-steel-500">Status</dt>
                  <dd className="mt-2 flex items-center gap-2 text-steel-200">
                    <span aria-hidden className="size-1.5 rounded-full bg-[#5fbf7f]" />
                    {g.status}
                  </dd>
                </div>
                <div className="col-span-2 border-t border-white/10 pt-6">
                  <dt className="uppercase tracking-[0.18em] text-steel-500">Registered office · West Bengal</dt>
                  <dd className="mt-3">
                    <address className="font-sans text-base not-italic leading-relaxed text-steel-200">
                      {g.registeredOffice.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
