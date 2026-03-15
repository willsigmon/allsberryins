import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Helpful insurance articles from Allsberry Insurance Agency covering home, auto, business, and life insurance topics for Corona, CA clients.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="bg-white pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Insights"
          title="Insurance articles and practical answers"
          description="The blog lives in the navigation — not on the homepage — so the main experience stays clean while search-friendly content still has a home."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)] p-6 shadow-[0_20px_50px_-42px_rgba(0,32,92,0.5)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
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
                href={`/blog/${post.slug}`}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue transition hover:text-navy"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
