import { CarrierLogosSection } from "@/components/sections/carrier-logos-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TeamSection } from "@/components/sections/team-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ValuePropsSection } from "@/components/sections/value-props-section";
import { StructuredData } from "@/components/seo/structured-data";
import { agency, homePageFaqs, products } from "@/lib/site-data";

const insuranceAgencySchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: agency.fullName,
  url: agency.domain,
  telephone: agency.phone,
  email: agency.email,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: agency.phone,
    contactType: "customer service",
    areaServed: "Southern California",
    availableLanguage: "English",
  },
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
  knowsAbout: [
    "Home insurance",
    "Auto insurance",
    "Business insurance",
    "Commercial insurance",
    "Life insurance",
    "Evidence of insurance",
    "Certificate of insurance",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Insurance coverage lines",
    itemListElement: products.slice(0, 10).map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: product.name,
        description: product.description,
      },
    })),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: agency.fullName,
  url: agency.domain,
  description:
    "Local insurance guidance, quote requests, agent pages, and proof-of-insurance support for Southern California clients.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homePageFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <StructuredData data={[insuranceAgencySchema, websiteSchema, faqSchema]} />
      <HeroSection />
      <TrustBar />
      <ValuePropsSection />
      <ReviewsSection />
      <FaqSection />
      <ProductGridSection />
      <CarrierLogosSection />
      <TeamSection />
      <CtaBanner />
    </>
  );
}
