import type { ContactEmail, ContactPhone, Office, SocialLink } from "./types";

/**
 * Company facts — sourced only from the materials Gourab supplied:
 *  - GTS logo
 *  - Company letterhead and business card
 *  - Brand social post ("Your Vision. Our Expertise.")
 *  - Dubai DET Commercial License No. 1655231
 *  - MEA eMigrate recruiting-agent record (Gourab International Service)
 *
 * Anything not in those materials is left empty (null / []) so it can be
 * added later without touching components.
 */

export const site = {
  name: "Gourab Technical Services",
  shortName: "Gourab",
  legalName: "Gourab Technical Services L.L.C",
  arabicName: "غوراب للخدمات الفنية ش.ذ.م.م",
  /** Brand tagline from the Gourab social post */
  tagline: "Your Vision. Our Expertise.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gtsllcuae.com").replace(/\/$/, ""),
  description:
    "Gourab Technical Services L.L.C is a Dubai-licensed company delivering construction, fit-out, interiors, maintenance, hospitality and cleaning across the United Arab Emirates. Your Vision. Our Expertise.",

  location: {
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    /** Geographic coordinates of Dubai (city reference, not an office address) */
    coordinates: { lat: 25.2048, lng: 55.2708, display: "25.2048° N — 55.2708° E" },
    timeZone: "Asia/Dubai",
  },

  contact: {
    phones: [
      { label: "UAE", display: "+971 55 866 0118", href: "tel:+971558660118" },
    ] satisfies ContactPhone[],
    emails: [
      { label: "General enquiries", address: "gb.gmdxb@gtsllcuae.com" },
      { label: "Alternate", address: "gb.gmdubaigts@gmail.com" },
    ] satisfies ContactEmail[],
    /** WhatsApp number in international format without "+" (e.g. "971500000000") — not yet supplied */
    whatsapp: null as string | null,
    /** Working hours, e.g. "Mon–Sat, 8:00–18:00 GST" — not yet supplied */
    hours: null as string | null,
  },

  offices: [
    { label: "Head office", city: "Dubai", country: "United Arab Emirates" },
  ] satisfies Office[],

  /** Social profiles — none supplied yet */
  social: [] as SocialLink[],

  /** From the Dubai Commercial License */
  license: {
    authority: "Department of Economy and Tourism — Government of Dubai",
    authorityShort: "Dubai DET",
    licenseNo: "1655231",
    registerNo: "2931483",
    chamberNo: "702477",
    legalType: "Limited Liability Company — Single Owner",
  },

  /** Associated entity — same owner, from the MEA eMigrate record */
  group: [
    {
      name: "Gourab International Service",
      description:
        "Recruiting agent registered through the eMigrate system.",
      raId: "RA5695683",
      rcNumber: "B-1786/WB/PER/1000+/5/10077/2022",
      /** Registered office location — shown on the About page only */
      registeredOffice: ["West Bengal, Nadia, India"],
      status: "Active",
    },
  ],
} as const;

export const primaryPhone = site.contact.phones[0];
export const primaryEmail = site.contact.emails[0];

export function whatsappHref(message?: string): string | null {
  if (!site.contact.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.contact.whatsapp}${text}`;
}
