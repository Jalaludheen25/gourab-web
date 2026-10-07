import { PageHero } from "@/components/sections/PageHero";
import { Prose } from "@/components/sections/Prose";
import { imageCredits } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Image credits",
  description: "Sources and licences for the photography used on this website.",
  path: "/credits",
});

export default function CreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reference"
        title="Image *credits.*"
        crumbs={[{ name: "Image credits", path: "/credits" }]}
        size="compact"
      />
      <Prose>
        <p>
          Photography on this website is illustrative and does not depict Gourab projects. All images are released
          into the public domain (CC0 or equivalent) and were sourced through Wikimedia Commons. We thank the
          photographers below.
        </p>
        <ul className="!ml-0 mt-10 divide-y divide-white/10 border-y border-white/10">
          {imageCredits.map((c) => (
            <li key={c.key} className="!ml-0 flex !list-none flex-col gap-1 py-4 !pl-0 sm:flex-row sm:items-baseline sm:justify-between">
              <span>
                <span className="text-steel-100">{c.title}</span>
                <span className="text-steel-500"> — {c.author}</span>
              </span>
              <span className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.14em]">
                <span className="text-steel-500">{c.license}</span>
                <a href={c.source} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </span>
            </li>
          ))}
        </ul>
      </Prose>
    </>
  );
}
