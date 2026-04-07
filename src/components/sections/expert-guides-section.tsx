import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SeoPageCard } from "@/components/ui/seo-page-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedSeoPages } from "@/lib/seo-content";

export function ExpertGuidesSection() {
  const featuredPages = getFeaturedSeoPages();

  return (
    <section className="bg-[linear-gradient(180deg,var(--white)_0%,rgba(0,102,179,0.04)_100%)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Expert guides"
            title="Search-friendly answers for California insurance questions"
            description="We are building the site around clear, first-party guidance instead of stuffing keywords into the homepage. Start with the question you actually need answered."
          />
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 self-start text-sm font-bold text-blue transition hover:text-navy"
          >
            Browse all resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredPages.map((page) => (
            <SeoPageCard key={page.slug} page={page} />
          ))}
        </div>
      </div>
    </section>
  );
}
