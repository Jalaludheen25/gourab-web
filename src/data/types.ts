import type { StaticImageData } from "next/image";

export type Media = {
  src: StaticImageData;
  alt: string;
  /** Focal point for object-position, e.g. "50% 40%" */
  position?: string;
};

export type ServiceSlug = "construction" | "fit-out" | "interiors" | "maintenance" | "hospitality" | "cleaning";

export type Service = {
  slug: ServiceSlug;
  index: string;
  name: string;
  /** Short editorial line used as the service headline */
  headline: string;
  /** One-to-two sentence summary for lists and metadata */
  summary: string;
  /** Longer introduction paragraphs for the service page */
  intro: string[];
  image: Media;
  details: Media[];
  /**
   * Specific scope items Gourab confirms for this service.
   * Left empty until supplied by Gourab — the UI hides the block when empty.
   */
  scope: string[];
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export type Differentiator = {
  title: string;
  body: string;
};

export type ProjectFact = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  year?: string;
  client?: string;
  status?: "Completed" | "In progress";
  /** One-line summary for cards and metadata */
  summary: string;
  overview: string[];
  facts?: ProjectFact[];
  scope?: string[];
  result?: string;
  cover: Media;
  gallery: Media[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  project?: string;
};

export type Client = {
  name: string;
  /** Path to a monochrome logo in /public */
  logo: string;
  url?: string;
};

export type ContactPhone = { label: string; display: string; href: string };
export type ContactEmail = { label: string; address: string };
export type SocialLink = { label: string; href: string };
export type Office = {
  label: string;
  city: string;
  region?: string;
  country: string;
  /** Full street address — add when supplied */
  address?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  /** 4:5 portrait */
  photo: Media;
};
