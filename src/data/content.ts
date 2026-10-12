import type { Differentiator, ProcessStep } from "./types";

/**
 * Editorial copy shared across pages. Written from Gourab's verified
 * positioning ("Your Vision. Our Expertise."), its service disciplines and its
 * licensing — no statistics, awards or claims beyond the supplied materials.
 */

/** Words wrapped in *asterisks* are set in the italic serif accent */
export const brandStatement =
  "Every space begins as someone's *vision.* Gourab brings the technical *expertise* to build it, fit it out, finish it and keep it performing — one Dubai company, six disciplines, a single standard of work.";

export const approach: ProcessStep[] = [
  {
    index: "01",
    title: "Brief",
    body: "We start with your vision — requirements, site, budget and timeline — understood properly before anything is priced.",
  },
  {
    index: "02",
    title: "Plan",
    body: "Scope, programme and specification are set out clearly, so every decision on site has a reference point.",
  },
  {
    index: "03",
    title: "Build",
    body: "Construction, fit-out and interior works carried out with technical discipline and coordinated trades.",
  },
  {
    index: "04",
    title: "Handover",
    body: "Finishing, snagging and a clean handover of a space that is ready to use from day one.",
  },
  {
    index: "05",
    title: "Maintain",
    body: "Ongoing maintenance that keeps what we deliver performing long after the keys change hands.",
  },
];

/** Anchor id for a stage on the Approach page, e.g. "stage-brief" */
export const stageId = (title: string) => `stage-${title.toLowerCase()}`;

export const differentiators: Differentiator[] = [
  {
    title: "One partner",
    body: "Six disciplines, from construction to cleaning, under one licensed company — fewer handoffs and a single point of accountability.",
  },
  {
    title: "Precision",
    body: "Technical services is in our name. Work is planned, measured and checked — not improvised on site.",
  },
  {
    title: "Beyond handover",
    body: "Because we also maintain what we deliver, we build with the long term in mind.",
  },
  {
    title: "Dubai-licensed",
    body: "Licensed by Dubai's Department of Economy and Tourism and registered with the Dubai Chamber.",
  },
];

export const promise = {
  vision: {
    label: "Your vision",
    body: "You bring the ambition — a home, a workplace, a commercial space. We listen first, and make sure we understand what success looks like to you.",
  },
  expertise: {
    label: "Our expertise",
    body: "We bring the technical discipline to deliver it — planned clearly, built carefully, finished properly and maintained for the long term.",
  },
};

/** Long-term direction for the About page. Aspirational — no claims of scale or track record. */
export const vision = {
  title: "Where we are heading.",
  intro: "Our long-term direction, and the standard we intend to keep as Gourab grows.",
  statement:
    "To be the technical partner people return to at every stage of a space's life — built to specification, finished with care, and kept performing long after the handover.",
  horizons: [
    {
      title: "One standard",
      body: "The same discipline of planning, measurement and checking on every project, whatever its size.",
    },
    {
      title: "Lasting work",
      body: "Building with maintenance in mind, so what we deliver keeps serving the people who use it.",
    },
    {
      title: "Growth with purpose",
      body: "Developing our six disciplines deliberately, never at the cost of the precision our name promises.",
    },
  ],
};
