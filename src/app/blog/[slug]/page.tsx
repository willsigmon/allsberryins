import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { blogPosts, getBlogPostBySlug } from "@/lib/site-data";
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
      "@type": "Organization",
      name: "Allsberry Insurance Agency",
    },
    publisher: {
      "@type": "Organization",
      name: "Allsberry Insurance Agency",
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <div className="bg-white pt-32">
      <StructuredData data={articleSchema} />
      <article className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
          Back to Blog
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
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
      </article>
    </div>
  );
}
