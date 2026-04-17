import { agency, products } from "@/lib/site-data";
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
  ...(aggregateRating ? { aggregateRating } : {}),
};

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
