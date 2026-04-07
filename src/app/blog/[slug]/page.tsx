import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { StructuredData } from "@/components/seo/structured-data";
import { SeoPageCard } from "@/components/ui/seo-page-card";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoPagesBySlugs } from "@/lib/seo-content";
import { blogPosts, getBlogPostBySlug } from "@/lib/site-data";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@id": organizationSchema["@id"],
    },
    publisher: {
      "@id": organizationSchema["@id"],
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
    keywords: post.tags.join(", "),
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const relatedPosts = blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .filter((candidate) => candidate.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);
  const relatedSeoPages = getSeoPagesBySlugs(post.relatedSeoPageSlugs ?? []);

  return (
    <div className="bg-white pt-32">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />
      <article className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
          Back to Blog
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-9 text-gray-600">{post.intro}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-12">
          {post.sections.map((section) => (
            <section key={section.heading} className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900">{section.heading}</h2>
              <p className="mt-4 text-base leading-8 text-gray-600">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-6 grid gap-3 text-base leading-8 text-gray-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-[2.2rem] border border-blue/10 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-8 shadow-[0_26px_60px_-44px_rgba(0,32,92,0.45)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
            Next step
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-gray-900">
            Want help applying this to your policy?
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Link
              href="/quote?product=home"
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              Start a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              Talk to the team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/evidence-of-insurance"
              className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            >
              Request proof
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {relatedSeoPages.length ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-extrabold text-gray-900">
              Related California insurance guides
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedSeoPages.map((relatedSeoPage) => (
                <SeoPageCard key={relatedSeoPage.slug} page={relatedSeoPage} />
              ))}
            </div>
          </section>
        ) : null}

        {relatedPosts.length ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-extrabold text-gray-900">
              Related reading
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="rounded-[1.8rem] border border-gray-100 bg-gray-50 p-6 transition hover:border-blue/30 hover:bg-white hover:shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">
                    Related article
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-gray-900">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </div>
  );
}
