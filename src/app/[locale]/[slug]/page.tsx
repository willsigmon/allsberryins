import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SeoPageTemplate } from "@/components/pages/seo-page-template";
import { LeftoverCatalogNotice } from "@/components/ui/leftover-catalog-chrome";
import { routing } from "@/i18n/routing";
import {
  catalogLeftoverCopy,
  firstQueryValue,
  resolveSeoGuideLeftover,
} from "@/lib/catalog-leftover";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoPageBySlug, seoPages } from "@/lib/seo-content";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    seoPages.map((page) => ({ locale, slug: page.slug })),
  );
}

type SeoPageRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: SeoPageRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getSeoPageBySlug(slug);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: page.keywords,
    locale,
  });
}

export default async function SeoContentPage({ params, searchParams }: SeoPageRouteProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const query = await searchParams;
  const page = getSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const leftovers = resolveSeoGuideLeftover({
    page: {
      keywords: page.keywords,
      pageType: page.pageType,
      sectionTitles: page.sections.map((section) => section.title),
      slug: page.slug,
      title: page.title,
    },
    rawCity: firstQueryValue(query.city),
    rawTopic: firstQueryValue(query.topic),
    rawZip: firstQueryValue(query.zip),
  });
  const tLeftover = leftovers.length
    ? await getTranslations("leftoverCatalog")
    : null;

  return (
    <div className="bg-white">
      {tLeftover && leftovers.length > 0 ? (
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-2 sm:px-6 lg:px-8">
          <div className="grid gap-3">
            {leftovers.map((leftover) => {
              const copy = catalogLeftoverCopy(leftover);
              return (
                <LeftoverCatalogNotice key={`${leftover.kind}-${leftover.raw}`}>
                  {tLeftover(copy.key, { requested: copy.requested })}
                </LeftoverCatalogNotice>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className={leftovers.length > 0 ? "[&>div]:!pt-8" : undefined}>
        <SeoPageTemplate page={page} />
      </div>
    </div>
  );
}
