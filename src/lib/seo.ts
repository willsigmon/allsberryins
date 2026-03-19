import { agency } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  path?: string;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": absoluteUrl("/#organization"),
  name: agency.fullName,
  url: agency.domain,
  telephone: agency.phone,
  email: agency.email,
  image: absoluteUrl("/opengraph-image"),
  logo: absoluteUrl("/media/brand/logos/allsberry-deep-blue.png"),
  priceRange: "$$",
  foundingDate: String(agency.founded),
  areaServed: [
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
      availableLanguage: ["English"],
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [agency.socials.facebook, agency.socials.instagram, agency.socials.linkedin],
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
