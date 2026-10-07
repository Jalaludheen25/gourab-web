import type { Metadata } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Consistent per-page metadata with canonical URL and social cards */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.legalName,
      locale: "en_AE",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.arabicName, "GTS"],
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/gts-logo-full.png`,
    image: `${site.url}/opengraph-image.png`,
    email: site.contact.emails.map((e) => e.address),
    telephone: site.contact.phones.map((p) => p.display),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.coordinates.lat,
      longitude: site.location.coordinates.lng,
    },
    areaServed: { "@type": "Country", name: site.location.country },
    knowsAbout: services.map((s) => s.name),
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "Dubai DET Commercial License",
        value: site.license.licenseNo,
      },
      {
        "@type": "PropertyValue",
        propertyID: "Dubai Chamber Membership",
        value: site.license.chamberNo,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.summary,
          url: `${site.url}/services/${s.slug}`,
        },
      })),
    },
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.legalName,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
