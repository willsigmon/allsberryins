import { CarrierLogosSection } from "@/components/sections/carrier-logos-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TeamSection } from "@/components/sections/team-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ValuePropsSection } from "@/components/sections/value-props-section";
import { StructuredData } from "@/components/seo/structured-data";
import { agency } from "@/lib/site-data";

const insuranceAgencySchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: agency.fullName,
  url: agency.domain,
  telephone: agency.phone,
  email: agency.email,
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [agency.socials.facebook, agency.socials.instagram, agency.socials.linkedin],
  slogan: "Simple. Affordable. Tailored for You.",
  areaServed: ["Southern California", "Corona", "Riverside County", "Los Angeles County", "Orange County", "San Bernardino County"],
};

export default function Home() {
  return (
    <>
      <StructuredData data={insuranceAgencySchema} />
      <HeroSection />
      <TrustBar />
      <ValuePropsSection />
      <ReviewsSection />
      <ProductGridSection />
      <CarrierLogosSection />
      <TeamSection />
      <CtaBanner />
    </>
  );
}
