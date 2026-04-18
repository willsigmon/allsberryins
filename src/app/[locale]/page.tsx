import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CarrierLogosSection } from "@/components/sections/carrier-logos-section";
import { CoverageEvaluationCta } from "@/components/sections/coverage-evaluation-cta";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ExpertGuidesSection } from "@/components/sections/expert-guides-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { ReviewTicker } from "@/components/sections/review-ticker";
import { TeamSection } from "@/components/sections/team-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ValuePropsSection } from "@/components/sections/value-props-section";
import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import {
  heroProductPreferenceCookieKey,
  resolveHeroProductPreference,
} from "@/lib/hero-product-preferences";
import { agency, products } from "@/lib/site-data";
import { organizationSchema } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";

  return createPageMetadata({
    title: isSpanish
      ? "Allsberry Insurance Agency — Corona, CA Seguros"
      : "Allsberry Insurance Agency — Corona, CA Insurance",
    description: isSpanish
      ? "Agencia independiente en Corona, CA. Comparamos aseguradoras para hogar, auto, vida y comercial. Servicio bilingüe en Southern California."
      : "Independent insurance agency in Corona, CA. We shop carriers for home, auto, life & business coverage. Bilingual service across Southern California.",
    path: "/",
    locale,
    absoluteTitle: true,
  });
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const tFaq = await getTranslations("homeFaqs");

  const cookieStore = await cookies();
  const initialProduct = resolveHeroProductPreference(
    cookieStore.get(heroProductPreferenceCookieKey)?.value,
  );

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
      "Wildfire home insurance",
      "California FAIR Plan",
      "Difference in Conditions insurance",
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
          name: t(`${product.slug}.name` as never),
          description: t(`${product.slug}.description` as never),
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
      "Local insurance guidance, quote requests, agent pages, and proof-of-insurance support from a Corona, California agency serving Southern California clients.",
    inLanguage: locale === "es" ? "es" : "en",
  };

  const faqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "es" ? "es" : "en",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: tFaq(`${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`${key}.answer`),
      },
    })),
  };

  return (
    <>
      <StructuredData data={[insuranceAgencySchema, websiteSchema, faqSchema]} />
      <HeroSection initialProduct={initialProduct} />
      <ReviewTicker />
      <TrustBar />
      <ValuePropsSection />
      <FaqSection />
      <ProductGridSection />
      <ExpertGuidesSection />
      <CoverageEvaluationCta />
      <CarrierLogosSection />
      <TeamSection />
      <CtaBanner />
    </>
  );
}
