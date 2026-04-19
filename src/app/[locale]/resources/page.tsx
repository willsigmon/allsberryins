import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { SeoPageCard } from "@/components/ui/seo-page-card";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { seoPages } from "@/lib/seo-content";
import { absoluteUrl } from "@/lib/utils";

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/resources",
    locale,
    keywords: [
      "california insurance resources",
      "homeowners insurance california",
      "ca fair plan guide",
      "insurance agent corona ca",
    ],
  });
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "California insurance resources",
    url: absoluteUrl("/resources"),
    hasPart: seoPages.map((page) => ({
      "@type": page.pageType === "location" ? "WebPage" : "Article",
      name: page.title,
      url: absoluteUrl(`/${page.slug}`),
      dateModified: page.lastReviewed,
      keywords: page.keywords.join(", "),
    })),
  };

  return (
    <div className="bg-white pt-32">
      <StructuredData data={[breadcrumbSchema, collectionSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          description={t("subheading")}
          as="h1"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {seoPages.map((page) => (
            <SeoPageCard key={page.slug} page={page} />
          ))}
        </div>
      </section>
    </div>
  );
}
