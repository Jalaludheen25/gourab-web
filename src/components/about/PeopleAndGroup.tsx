import { LeadershipTeam } from "@/components/about/LeadershipTeam";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { team } from "@/data/team";

/** Leadership team and group company — details as supplied by GTS */
export function PeopleAndGroup({ index = "04" }: { index?: string }) {
  return (
    <section aria-labelledby="people-title" className="relative bg-obsidian py-[var(--spacing-section)]">
      <div className="shell">
        <SectionHeading
          id="people-title"
          index={index}
          eyebrow="People & group"
          title="Owner-led, with a registered group company."
          intro={`GTS is owned and managed by ${team[0].name}, with its head office in Dubai. Its group company, ${site.group[0].name}, is based in West Bengal, India.`}
        />

        <div className="mt-16 flex items-end justify-between gap-6 border-b border-white/10 pb-5 lg:mt-20">
          <p className="eyebrow text-steel-400">Leadership team</p>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-steel-500">
            <span className="text-gold">{String(team.length).padStart(2, "0")}</span> people
          </p>
        </div>
        <div className="mt-10">
          <LeadershipTeam />
        </div>

        {site.group.map((g) => (
          <article
            key={g.raId}
            className="mt-20 grid grid-cols-1 gap-10 border border-white/10 p-8 lg:mt-24 lg:grid-cols-12 lg:gap-12 lg:p-10"
          >
            <div className="lg:col-span-6">
              <p className="eyebrow text-steel-500">Group company</p>
              <h3 className="mt-6 text-title font-semibold text-steel-50">{g.name}</h3>
              <p className="mt-4 max-w-lg text-steel-400">{g.description}</p>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6 font-mono text-xs lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
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
    </section>
  );
}
