import { media } from "./media";
import type { Service, ServiceSlug } from "./types";

/**
 * Gourab's service lines: the four on the company's brand material
 * (CONSTRUCTION | FIT-OUT | MAINTENANCE | INTERIORS), plus Hospitality and
 * Cleaning, added at Gourab's request.
 *
 * Copy describes each discipline in general terms only. `scope` is left
 * empty on purpose — add the specific works Gourab confirms and the service
 * page will show a "Scope" block automatically.
 */
export const services: Service[] = [
  {
    slug: "construction",
    index: "01",
    name: "Construction",
    headline: "Structure, built with discipline.",
    summary:
      "Construction delivered with technical rigour — planned before it starts, coordinated on site and built to the specification you approve.",
    intro: [
      "Every built environment starts with structure. Our construction work is approached the way our name suggests: technically, carefully and with a clear plan before anything happens on site.",
      "We keep scope, programme and specification visible throughout, so decisions on site always trace back to what was agreed — and you always know where your project stands.",
    ],
    image: media.cranesDusk,
    details: [media.siteAerial, media.rebarWorker],
    scope: [],
  },
  {
    slug: "fit-out",
    index: "02",
    name: "Fit-Out",
    headline: "From bare shell to working space.",
    summary:
      "Fit-out that turns empty space into a functional environment — coordinated, sequenced and finished to the agreed standard.",
    intro: [
      "Fit-out is where a space becomes usable. It depends on careful sequencing, coordinated trades and close attention to the details people will touch and use every day.",
      "We plan the work around how the space needs to function, then deliver it in an orderly way — keeping you informed from the first day on site to handover.",
    ],
    image: media.marbleLobby,
    details: [media.kitchenInterior, media.whiteStair],
    scope: [],
  },
  {
    slug: "interiors",
    index: "03",
    name: "Interiors",
    headline: "Spaces finished with intent.",
    summary:
      "Interior works where materials, detailing and finishes come together into spaces that feel considered and are made to last.",
    intro: [
      "Good interiors are a sum of decisions — material, junction, light and proportion. Our interiors work treats each of those decisions with the same care.",
      "Your vision sets the direction. Our role is to bring the technical expertise that turns it into a finished interior that looks right and performs every day.",
    ],
    image: media.loftInterior,
    details: [media.spiralStair, media.concreteRibs],
    scope: [],
  },
  {
    slug: "maintenance",
    index: "04",
    name: "Maintenance",
    headline: "Keeping what's built performing.",
    summary:
      "Maintenance that protects your property and keeps its spaces, systems and finishes in good working order.",
    intro: [
      "A building's life begins at handover. Maintenance protects the investment made in it and keeps it working the way it was intended.",
      "Because we also build, fit out and finish, we understand how spaces are put together — and what it takes to keep them performing over time.",
    ],
    image: media.spanners,
    details: [media.toolWall, media.scaffoldWorker],
    scope: [],
  },
  {
    slug: "hospitality",
    index: "05",
    name: "Hospitality",
    headline: "Spaces made ready for guests.",
    summary:
      "Hospitality work for hotels, restaurants and guest-facing venues — spaces prepared, presented and kept to the standard guests notice.",
    intro: [
      "Hospitality spaces are judged in moments — the first step into a lobby, a table by the window, a room at the end of a long day. Every detail is noticed.",
      "We bring the same technical discipline to guest-facing spaces as to everything else we do, so they look the way they were intended and stay ready for the people who use them.",
    ],
    image: media.restaurantDusk,
    details: [media.entranceHall, media.wineGlasses],
    scope: [],
  },
  {
    slug: "cleaning",
    index: "06",
    name: "Cleaning",
    headline: "Clean spaces, properly kept.",
    summary:
      "Cleaning for homes, workplaces and commercial buildings — careful, thorough and planned around how each space is used.",
    intro: [
      "A clean space is the clearest sign that a building is cared for. It protects finishes and materials, and makes every space more pleasant to use.",
      "We approach cleaning with the same planning as our technical work — understanding the space, its materials and the routine it needs, then delivering it consistently.",
    ],
    image: media.windowCleanersTower,
    details: [media.ropeAccessCleaning, media.windowCleanersFacade],
    scope: [],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAdjacentService(slug: ServiceSlug): Service {
  const i = services.findIndex((s) => s.slug === slug);
  return services[(i + 1) % services.length];
}

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** The number of services as a word ("six"), so copy stays in step with the list */
export const disciplineCount = numberWords[services.length] ?? String(services.length);

/** "construction, fit-out, interiors, maintenance, hospitality and cleaning" */
export const serviceList = services
  .map((s) => s.name.toLowerCase())
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1");

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
