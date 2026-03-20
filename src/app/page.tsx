import { cookies } from "next/headers";

import { CarrierLogosSection } from "@/components/sections/carrier-logos-section";
import { CoverageEvaluationCta } from "@/components/sections/coverage-evaluation-cta";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TeamSection } from "@/components/sections/team-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ValuePropsSection } from "@/components/sections/value-props-section";
import { StructuredData } from "@/components/seo/structured-data";
import {
  heroProductPreferenceCookieKey,
  resolveHeroProductPreference,
} from "@/lib/hero-product-preferences";
import { agency, homePageFaqs, products } from "@/lib/site-data";
import { organizationSchema } from "@/lib/seo";

const insuranceAgencySchema = {
  ...organizationSchema,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: agency.phone,
    contactType: "customer service",
    areaServed: "Southern California",
    availableLanguage: ["English", "Spanish"],
  },
  slogan: "Simple. Affordable. Tailored for You.",
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

export default async function Home() {
  const cookieStore = await cookies();
  const initialProduct = resolveHeroProductPreference(
    cookieStore.get(heroProductPreferenceCookieKey)?.value,
  );

  return (
    <>
      <StructuredData data={[insuranceAgencySchema, websiteSchema, faqSchema]} />
      <HeroSection initialProduct={initialProduct} />
      <TrustBar />
      <ValuePropsSection />
      <ReviewsSection />
      <FaqSection />
      <ProductGridSection />
      <CoverageEvaluationCta />
      <CarrierLogosSection />
      <TeamSection />
      <CtaBanner />
    </>
  );
}
