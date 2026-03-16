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
          title="Insurance guidance for real families and small businesses"
          description="Practical explainers on home, auto, business, and life coverage to help you make confident coverage decisions."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)] p-6 shadow-[0_20px_50px_-42px_rgba(0,32,92,0.5)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-gray-900">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue"
                  >
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

        <div className="mt-14 rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">Prefer a quick answer?</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
            Ready to compare real coverage options?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
            Compare your options in minutes. Share your ZIP code and priorities, and one of our licensed agents
            will follow up with options made for your household, vehicle, and business.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 text-sm font-bold text-white transition hover:bg-red-hover"
            >
              Start a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-bold text-navy transition hover:border-blue hover:text-blue"
            >
              Contact the Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
