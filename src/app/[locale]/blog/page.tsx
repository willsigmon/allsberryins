import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/site-data";
import { createBreadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/blog",
    locale,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Insurance articles and practical answers",
    url: absoluteUrl("/blog"),
    hasPart: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      keywords: post.tags.join(", "),
    })),
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  };

  const dateLocale = locale === "es" ? "es-US" : "en-US";

  return (
    <div className="bg-white pt-32">
      <StructuredData data={[breadcrumbSchema, collectionSchema, itemListSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          description={t("subheading")}
          as="h1"
        />
        {locale === "es" && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
            {t("articlesInEnglishNotice")}
          </div>
        )}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-gray-100 p-6 shadow-[0_20px_50px_-42px_rgba(0,32,92,0.5)]"
              style={{ backgroundImage: "var(--surface-card)" }}
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span>{new Date(post.publishedAt).toLocaleDateString(dateLocale, { month: "long", day: "numeric", year: "numeric" })}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-gray-900">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={`/blog/${post.slug}` as any}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue transition hover:text-gray-900"
              >
                {t("readArticle")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_26px_60px_-44px_rgba(0,32,92,0.45)]" style={{ backgroundImage: "var(--surface-card)" }}>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
            {t("keepMovingEyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-gray-900">
            {t("keepMovingHeading")}
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Link
              href="/quote?product=home"
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              {t("keepMovingHomeAuto")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quote?product=business"
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              {t("keepMovingBusiness")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/evidence-of-insurance"
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              {t("keepMovingProof")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
