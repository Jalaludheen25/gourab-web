import { SectionHeading } from "@/components/ui/SectionHeading";
import { vision } from "@/data/content";

export function Vision({ index = "02" }: { index?: string }) {
  return (
    <section aria-labelledby="vision-title" className="relative overflow-hidden bg-obsidian py-[var(--spacing-section)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
      <div className="shell relative">
        <SectionHeading id="vision-title" index={index} eyebrow="Vision" title={vision.title} intro={vision.intro} />

        <p className="mt-16 max-w-4xl font-serif text-[clamp(1.75rem,3.4vw,3.25rem)] italic leading-[1.15] tracking-[-0.01em] text-steel-100 text-balance">
          {vision.statement}
        </p>

        <ol className="mt-20 grid grid-cols-1 border-t border-white/10 md:grid-cols-3">
          {vision.horizons.map((h, i) => (
            <li
              key={h.title}
              className={
                i === 0
                  ? "py-10 md:pr-10"
                  : "border-t border-white/10 py-10 md:border-l md:border-t-0 md:px-10"
              }
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-gold">0{i + 1}</p>
              <h3 className="mt-5 text-title font-semibold text-steel-50">{h.title}</h3>
              <p className="mt-4 max-w-sm text-steel-400">{h.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
