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
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import {
  heroProductPreferenceCookieKey,
  resolveHeroProductPreference,
} from "@/lib/hero-product-preferences";
import { homeLeftoverHeroProduct, readHomeLeftovers, type HomeLeftover } from "@/lib/home-leftover";
import { agency, agents, heroProductSlugs, products, type ProductSlug } from "@/lib/site-data";
import { organizationSchema } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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

function leftoverNoticeCopy(
  leftover: HomeLeftover,
  tLeftover: Awaited<ReturnType<typeof getTranslations>>,
  tProducts: Awaited<ReturnType<typeof getTranslations>>,
) {
  switch (leftover.kind) {
    case "unknown-agent":
      return { body: tLeftover("unknownAgent"), href: undefined, cta: undefined };
    case "known-agent":
      return {
        body: tLeftover("knownAgent", { name: leftover.agentName }),
        href: `/agents/${leftover.agentSlug}`,
        cta: tLeftover("knownAgentCta", { name: leftover.agentName }),
      };
    case "unknown-product":
      return { body: tLeftover("unknownProduct"), href: undefined, cta: undefined };
    case "known-product": {
      const name = tProducts(`${leftover.productSlug}.name` as never);
      return {
        body: tLeftover("knownProduct", { name }),
        href: `/quote?product=${leftover.productSlug}`,
        cta: tLeftover("knownProductCta", { name }),
      };
    }
    case "known-hero-product": {
      const name = tProducts(`${leftover.productSlug}.name` as never);
      return {
        body: tLeftover("knownHeroProduct", { name }),
        href: `/quote?product=${leftover.productSlug}`,
        cta: tLeftover("knownHeroProductCta", { name }),
      };
    }
    default: {
      const exhaustive: never = leftover;
      return exhaustive;
    }
  }
}

export default async function Home({ params, searchParams }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const tFaq = await getTranslations("homeFaqs");
  const tLeftover = await getTranslations("home.leftover");

  const cookieStore = await cookies();
  const search = await searchParams;
  const leftovers = readHomeLeftovers(search, {
    agents,
    heroProductSlugs,
    products,
  });
  const leftoverHeroProduct = homeLeftoverHeroProduct(leftovers);
  const initialProduct =
    leftoverHeroProduct && heroProductSlugs.includes(leftoverHeroProduct as ProductSlug)
      ? (leftoverHeroProduct as ProductSlug)
      : resolveHeroProductPreference(
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
      <HeroSection key={leftoverHeroProduct ?? "preferred"} initialProduct={initialProduct} />
      {leftovers.length > 0 ? (
        <div className="bg-white px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {leftovers.map((leftover) => {
              const copy = leftoverNoticeCopy(leftover, tLeftover, t);
              const key =
                leftover.kind === "known-agent"
                  ? `${leftover.kind}-${leftover.agentSlug}`
                  : leftover.kind === "known-product" || leftover.kind === "known-hero-product"
                    ? `${leftover.kind}-${leftover.productSlug}`
                    : leftover.kind;

              return (
                <aside
                  key={key}
                  className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800"
                >
                  <p>{copy.body}</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                    {copy.href && copy.cta ? (
                      <Link
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        href={copy.href as any}
                        className="font-semibold underline underline-offset-4 hover:text-amber-950"
                      >
                        {copy.cta}
                      </Link>
                    ) : null}
                    <Link
                      href="/"
                      className="font-semibold underline underline-offset-4 hover:text-amber-950"
                    >
                      {tLeftover("reset")}
                    </Link>
                  </p>
                </aside>
              );
            })}
          </div>
        </div>
      ) : null}
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
