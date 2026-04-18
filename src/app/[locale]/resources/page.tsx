import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { SeoPageCard } from "@/components/ui/seo-page-card";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { seoPages } from "@/lib/seo-content";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "California Insurance Resources",
  description:
    "Search-friendly California insurance guides from Allsberry Insurance Agency covering home insurance, wildfire pressure, FAIR Plan, DIC coverage, and local Corona office help.",
  path: "/resources",
  keywords: [
    "california insurance resources",
    "homeowners insurance california",
    "ca fair plan guide",
    "insurance agent corona ca",
  ],
});

export default function ResourcesPage() {
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
          eyebrow="Resources"
          title="California insurance answers with local context"
          description="This hub organizes the pages designed to help both modern search tools and real Southern California shoppers find the clearest next step. Start with the question you need answered today, then move into a quote or local conversation when you are ready."
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
