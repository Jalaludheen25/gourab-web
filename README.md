# Gourab Technical Services L.L.C — Website

Marketing website for **Gourab Technical Services L.L.C** (غوراب للخدمات الفنية ش.ذ.م.م), a Dubai-licensed company delivering construction, fit-out, interiors and maintenance. Brand line: *Your Vision. Our Expertise.*

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger, SplitText), Lenis, Three.js / React Three Fiber, Framer Motion, React Hook Form and Zod.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin for canonical URLs, sitemap, Open Graph and JSON-LD. Defaults to `https://www.gtsllcuae.com` (the domain of the company email). |
| `CONTACT_FORM_ENDPOINT` | Any endpoint accepting a JSON POST (Formspree, Make/Zapier webhook, your API). Without it, production returns 503 and the form offers a pre-filled email instead. |

---

## Content: single source of truth

All company content lives in `src/data/`. **Only verified information from the client's materials is used.** Nothing is invented.

| File | What it holds |
| --- | --- |
| `site.ts` | Legal name, Arabic name, tagline, phones, emails, offices, licence numbers, group company. `whatsapp`, `hours` and `social` are empty until supplied. |
| `team.ts` | Leadership team shown on the About page: name, designation and a 4:5 portrait (`src/assets/images/team/`, cropped from the photos in `reference/`). |
| `services.ts` | The six services: the four from the brand material (Construction, Fit-Out, Interiors, Maintenance) plus Hospitality and Cleaning, added at the client's request. Copy that counts or lists services reads `disciplineCount` / `serviceList` from here. `scope: []` is intentionally empty. Add confirmed scope items and the service page shows a *Scope* block. |
| `content.ts` | Brand statement, five-stage approach, differentiators, promise copy. |
| `projects.ts` | **Empty.** The site shows an honest "portfolio in preparation" state. Add real projects (format documented in the file) and the home gallery, `/projects`, `/projects/[slug]` case studies and sitemap appear automatically. |
| `testimonials.ts` | `testimonials` and `clients`, both **empty**. Their sections stay hidden until genuine entries are added. |
| `media.ts` | Image registry plus `imageCredits`. |

### Sources used

- GTS logo file (gold/silver, transparent): the master artwork. Every logo variant in `public/brand/` is an exact crop of it.
- Company letterhead and business card: contact details.
- Brand social post: the original four services and the tagline.
- Dubai DET Commercial Licence 1655231: legal name, legal form, register, chamber number and owner/manager.
- MEA eMigrate record: the group company, Gourab International Service (same owner), and its registered office location, West Bengal, Nadia, India (shown on the About page only).

### Not supplied yet (add when available)

Projects and project photography, testimonials, client logos, Dubai street address, WhatsApp number, working hours, social profiles, and confirmed scope per service.

### Photography

Photos in `src/assets/images/` are **CC0 / public-domain placeholders** from Wikimedia Commons and **do not depict Gourab work**. Credits are listed at `/credits`. Replace them with Gourab's own photography by swapping files or entries in `media.ts`.

---

## Design system

Defined in `src/app/globals.css` (Tailwind 4 `@theme`).

- **Palette** comes from the logo. Obsidian surfaces, a brushed-steel scale (`steel-*`) and crane gold (`gold`, `gold-light`, `gold-deep`), plus the warm sand and copper of the company stationery for editorial chapters.
- **Type** is Manrope (display and body, echoing the geometric wordmark), Instrument Serif italic (accents) and Geist Mono (technical labels). The fluid scale is `text-mega`, `text-display`, `text-headline`, `text-title`, `text-statement` and `text-lead`.
- **Motifs:**
  - `chamfer` and `chamfer-both`: the 45° cut from the G/T/S letterforms.
  - `text-steel-metal` and `text-gold-metal`: gradient finishes.
  - `bg-blueprint` (plus its fine and sand variants): drawing grids.
  - `bg-gold-sweep`: the datum line.
  - `grain`: film grain.
- **Motion** tokens are `ease-expo`, `ease-quart`, `ease-swift` and `ease-soft`.

`src/lib/utils.ts` registers the custom font-size tokens with tailwind-merge. Keep it in sync if you add sizes.

## Architecture notes

```
src/app/            routes, metadata files (sitemap, robots, manifest, icons, OG), /api/contact
src/components/
  layout/           Navbar, MobileMenu, Footer, Loader, PageTransition, SmoothScroll, CustomCursor
  home/             Hero (+ HeroVisual), Statement, AboutIntro, ServicesShowcase
  sections/         reusable chapters: ProcessTimeline, Credentials, WhyGourab, Portfolio, DubaiChapter, FinalCTA, PageHero…
  three/HeroScene   the WebGL hero ("the logo, built")
  ui/               RevealText, RevealImage, Button/ArrowLink, Magnetic, SectionHeading, Hydrate…
src/data/           content (see above)
src/lib/            gsap-lazy (on-demand GSAP), hooks, intro store, seo/JSON-LD, contact schema
```

- **Animation loads on demand.** Never import `src/lib/gsap.ts` statically. Use `loadGsap()` or `useLazyGsap(setup, scopeRef, { lazy, media })` from `src/lib/gsap-lazy.ts`, so motion code stays out of the initial bundle and below-the-fold chapters only set up as they approach.
- **3D hero:**
  - Runs only on desktop fine pointers with *hardware* WebGL (`failIfMajorPerformanceCaveat`) and without reduced motion. Everyone else gets the cinematic photograph.
  - Shaders compile in parallel (`compileAsync`) before the first frame.
  - Shader error checks are dev-only.
  - The render loop pauses when the hero is off-screen.
- **Intro:** a desktop-only first-visit loader, once per session. Phones never wait on animation before content is visible.
- **Accessibility:**
  - Skip link, visible focus states and a full `prefers-reduced-motion` path.
  - Reveal states use opacity, not `visibility`, so text stays in the accessibility tree.
  - SplitText copies are screen-reader safe.
  - Contrast-checked tokens.
- **Rendering:** Cache Components is disabled on purpose. Every page is statically generated, and routes unmount between navigations (which keeps GSAP/WebGL lifecycles simple). Re-enabling it requires `generateStaticParams` in `/projects/[slug]` to return at least one param.

## Pages

`/`, `/about`, `/approach`, `/services`, `/services/[slug]` (6), `/projects`, `/projects/[slug]`, `/contact`, `/privacy`, `/credits`, plus a branded 404.
