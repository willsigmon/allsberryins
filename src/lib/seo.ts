import { agency, agents, products } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  path?: string;
};

/**
 * AggregateRating requires real, verifiable aggregate review data. Populate
 * these env vars once Google review counts and average rating are confirmed,
 * then Search Console will recognize review rich snippets.
 *
 * AGENCY_REVIEW_COUNT=123
 * AGENCY_REVIEW_RATING=4.9
 */
const aggregateRatingCount = Number(process.env.AGENCY_REVIEW_COUNT);
const aggregateRatingValue = Number(process.env.AGENCY_REVIEW_RATING);
const hasVerifiedRating =
  Number.isFinite(aggregateRatingCount) &&
  Number.isFinite(aggregateRatingValue) &&
  aggregateRatingCount > 0 &&
  aggregateRatingValue > 0 &&
  aggregateRatingValue <= 5;

const aggregateRating = hasVerifiedRating
  ? {
      "@type": "AggregateRating",
      ratingValue: aggregateRatingValue.toFixed(1),
      reviewCount: aggregateRatingCount,
      bestRating: "5",
      worstRating: "1",
    }
  : undefined;

const erin = agents.find((a) => a.slug === "erin");

const erinPersonSchema = erin
  ? {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": absoluteUrl("/about#erin-allsberry"),
      name: erin.name,
      givenName: erin.firstName,
      familyName: erin.name.split(" ").slice(1).join(" ") || undefined,
      jobTitle: erin.title,
      email: erin.email,
      telephone: agency.phone,
      image: erin.photo ? absoluteUrl(erin.photo.src) : undefined,
      url: absoluteUrl(`/agents/${erin.slug}`),
      knowsAbout: products
        .filter((p) => p.slug !== "other")
        .map((p) => p.name),
      worksFor: {
        "@id": absoluteUrl("/#organization"),
      },
      hasCredential: erin.license
        ? [
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "license",
              name: `California Insurance License ${erin.license}`,
            },
          ]
        : undefined,
    }
  : undefined;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": absoluteUrl("/#organization"),
  name: agency.name,
  legalName: agency.fullName,
  url: agency.domain,
  telephone: agency.phone,
  email: agency.email,
  image: absoluteUrl("/opengraph-image"),
  logo: absoluteUrl("/media/brand/logos/allsberry-deep-blue.png"),
  priceRange: "$$",
  foundingDate: String(agency.founded),
  knowsLanguage: ["en", "es"],
  address: {
    "@type": "PostalAddress",
    streetAddress: agency.addressLine1,
    addressLocality: "Corona",
    addressRegion: "CA",
    postalCode: "92878",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: agency.geo.latitude,
    longitude: agency.geo.longitude,
  },
  hasMap: agency.socials.google,
  areaServed: [
    "Corona",
    "Inland Empire",
    "Southern California",
    "Riverside County",
    "Orange County",
    "Los Angeles County",
    "San Bernardino County",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: agency.phone,
      email: agency.email,
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  ],
  knowsAbout: products
    .filter((product) => product.slug !== "other")
    .map((product) => product.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Insurance Products",
    itemListElement: products
      .filter((product) => product.slug !== "other")
      .map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: product.name,
          description: product.description,
          serviceType:
            product.category === "commercial"
              ? "Commercial Insurance"
              : "Personal Insurance",
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: "Southern California",
        },
      })),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    agency.socials.facebook,
    agency.socials.instagram,
    agency.socials.linkedin,
    agency.socials.google,
  ],
  ...(erin ? { founder: { "@id": absoluteUrl("/about#erin-allsberry") } } : {}),
  ...(aggregateRating ? { aggregateRating } : {}),
};

export { erinPersonSchema };

export function createPersonSchema(agentSlug: string) {
  const agent = agents.find((a) => a.slug === agentSlug);
  if (!agent) {
    return undefined;
  }
  const familyName = agent.name.split(" ").slice(1).join(" ") || undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/agents/${agent.slug}#person`),
    name: agent.name,
    givenName: agent.firstName,
    familyName,
    jobTitle: agent.title,
    email: agent.email,
    telephone: agent.phone,
    image: agent.photo ? absoluteUrl(agent.photo.src) : undefined,
    url: absoluteUrl(`/agents/${agent.slug}`),
    knowsLanguage: agent.languages?.includes("Spanish") ? ["en", "es"] : ["en"],
    knowsAbout: agent.specialties,
    worksFor: {
      "@id": absoluteUrl("/#organization"),
    },
    hasCredential: agent.license
      ? [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: `California Insurance License ${agent.license}`,
          },
        ]
      : undefined,
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path ?? "/"),
    })),
  };
}
