import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoPageTemplate } from "@/components/pages/seo-page-template";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoPageBySlug, seoPages } from "@/lib/seo-content";

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

type SeoPageRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SeoPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPageBySlug(slug);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function SeoContentPage({ params }: SeoPageRouteProps) {
  const { slug } = await params;
  const page = getSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SeoPageTemplate page={page} />;
}
