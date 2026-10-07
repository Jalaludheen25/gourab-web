import type { ReactNode } from "react";

/** Calm long-form layout for legal and reference pages */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <section className="bg-obsidian pb-[var(--spacing-section)] pt-12">
      <div className="shell grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 text-[1.05rem] leading-relaxed text-steel-300 lg:col-span-7 lg:col-start-4 [&_a]:text-steel-50 [&_a]:underline [&_a]:decoration-gold/50 [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-steel-50 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1">
          {children}
        </div>
      </div>
    </section>
  );
}
