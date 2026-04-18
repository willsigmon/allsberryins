import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { SeoPageTemplate } from "@/components/pages/seo-page-template";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoPageBySlug, seoPages } from "@/lib/seo-content";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    seoPages.map((page) => ({ locale, slug: page.slug })),
  );
}

type SeoPageRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
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

export default async function SeoContentPage({ params }: SeoPageRouteProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SeoPageTemplate page={page} />;
}
