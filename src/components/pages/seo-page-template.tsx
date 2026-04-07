import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Phone } from "lucide-react";

import { StructuredData } from "@/components/seo/structured-data";
import { PageFaqSection } from "@/components/sections/page-faq-section";
import { SeoPageCard } from "@/components/ui/seo-page-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SeoPage } from "@/lib/seo-content";
import { getSeoPagesBySlugs } from "@/lib/seo-content";
import { agency, agents, blogPosts } from "@/lib/site-data";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type SeoPageTemplateProps = {
  page: SeoPage;
};

export function SeoPageTemplate({ page }: SeoPageTemplateProps) {
  const relatedPages = getSeoPagesBySlugs(page.relatedPageSlugs ?? []).filter(
    (relatedPage) => relatedPage.slug !== page.slug,
  );
  const relatedPosts = blogPosts.filter((post) => page.relatedBlogSlugs?.includes(post.slug));
  const relatedAgents = agents.filter((agent) => page.relatedAgentSlugs?.includes(agent.slug));
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: page.title, path: `/${page.slug}` },
  ]);
  const articleSchema =
    page.pageType === "location"
      ? {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.description,
          url: absoluteUrl(`/${page.slug}`),
          about: page.keywords,
          mainEntity: {
            "@id": organizationSchema["@id"],
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          dateModified: page.lastReviewed,
          author: {
            "@id": organizationSchema["@id"],
          },
          publisher: {
            "@id": organizationSchema["@id"],
          },
          mainEntityOfPage: absoluteUrl(`/${page.slug}`),
          keywords: page.keywords.join(", "),
          about: page.keywords,
        };
  const faqSchema = page.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="bg-white pt-32 pb-24">
      <StructuredData
        data={[organizationSchema, breadcrumbSchema, articleSchema, ...(faqSchema ? [faqSchema] : [])]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2.6rem] border border-gray-100 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-8 shadow-[0_30px_80px_-55px_rgba(0,32,92,0.45)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{page.answer}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {page.keyPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.6rem] border border-gray-100 bg-white px-5 py-5 text-sm font-semibold leading-7 text-gray-900 shadow-[0_20px_40px_-36px_rgba(0,32,92,0.35)]"
                >
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote?product=home"
                className="cta-glow-blue inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-blue"
              >
                Start a home quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
              >
                Talk to the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {page.keywords.slice(0, 5).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-blue-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[2.2rem] border border-gray-100 bg-navy p-8 text-white shadow-[0_30px_80px_-55px_rgba(0,32,92,0.65)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-light">
                Local context
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
                Southern California guidance, not generic filler
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80">{page.heroSummary}</p>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-light" />
                  <div>
                    <p>{agency.addressLine1}</p>
                    <p>{agency.cityStateZip}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-light" />
                  <div>
                    <p>{agency.phone}</p>
                    <p>{agency.hours}</p>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                {page.reviewedBy}
              </p>
            </div>

            <div className="rounded-[2.2rem] border border-gray-100 bg-white p-8 shadow-[0_24px_60px_-45px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                Who this page is for
              </p>
              <div className="mt-5 grid gap-3">
                {page.whoItsFor.map((audience) => (
                  <div
                    key={audience}
                    className="rounded-[1.4rem] border border-gray-100 bg-gray-50 px-4 py-4 text-sm leading-7 text-gray-600"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What matters"
          title="Plain-English guidance for the decision in front of you"
          description="Each section answers one real question instead of trying to rank for everything at once."
        />
        <div className="mt-10 grid gap-6">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-8 shadow-[0_22px_50px_-40px_rgba(0,32,92,0.4)]"
            >
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-gray-900">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-gray-600">{section.body}</p>
              {section.bullets?.length ? (
                <ul className="mt-6 grid gap-3 text-base leading-8 text-gray-600">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.callout ? (
                <div className="mt-6 rounded-[1.4rem] border border-blue/10 bg-blue-light/35 px-5 py-4 text-sm font-semibold leading-7 text-blue">
                  {section.callout}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {page.comparison ? (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.2rem] border border-gray-100 bg-white p-8 shadow-[0_28px_70px_-50px_rgba(0,32,92,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
              Comparison
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900">
              {page.comparison.title}
            </h2>
            {page.comparison.description ? (
              <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
                {page.comparison.description}
              </p>
            ) : null}
            <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-gray-100">
              <div className="grid grid-cols-[0.9fr_1fr_1fr] bg-navy px-5 py-4 text-sm font-semibold text-white">
                <div>Question</div>
                <div>{page.comparison.leftLabel}</div>
                <div>{page.comparison.rightLabel}</div>
              </div>
              {page.comparison.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[0.9fr_1fr_1fr] gap-4 border-t border-gray-100 px-5 py-5 text-sm leading-7 text-gray-600"
                >
                  <div className="font-semibold text-gray-900">{row.label}</div>
                  <div>{row.left}</div>
                  <div>{row.right}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PageFaqSection
        title="Questions people usually ask next"
        description="These FAQs are written to be genuinely useful for searchers and answer engines, not stuffed into the page as filler."
        faqs={page.faqs}
        ctas={[
          { href: "/quote?product=home", label: "Start a quote" },
          { href: "/contact", label: "Contact the office" },
          { href: "/insurance-agency-corona-ca", label: "See the Corona office page" },
        ]}
      />

      {relatedPages.length ? (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Keep going"
            title="Related guides in this California insurance cluster"
            description="The goal is one strong authority wedge, not scattered pages that compete with each other."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {relatedPages.map((relatedPage) => (
              <SeoPageCard key={relatedPage.slug} page={relatedPage} />
            ))}
          </div>
        </section>
      ) : null}

      {relatedPosts.length ? (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Related reading"
            title="Supporting articles from the Allsberry blog"
            description="These posts reinforce the wedge with practical follow-up questions and renewal guidance."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_24px_55px_-45px_rgba(0,32,92,0.45)] transition hover:border-blue/20 hover:shadow-[0_28px_70px_-45px_rgba(0,32,92,0.5)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                  Blog article
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {relatedAgents.length ? (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="People behind the page"
            title="Talk to a local team member about this topic"
            description="First-party expertise is stronger when a real office, real people, and clear next steps are easy to verify."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedAgents.map((agent) => (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_24px_55px_-45px_rgba(0,32,92,0.45)] transition hover:border-blue/20 hover:shadow-[0_28px_70px_-45px_rgba(0,32,92,0.5)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
                  {agent.title}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-gray-900">
                  {agent.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">{agent.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {agent.specialties.slice(0, 3).map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-blue-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {page.references?.length ? (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.2rem] border border-gray-100 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-8 shadow-[0_24px_55px_-45px_rgba(0,32,92,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
              Official references
            </p>
            <div className="mt-6 grid gap-4">
              {page.references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-4 rounded-[1.5rem] border border-gray-100 bg-white px-5 py-4 transition hover:border-blue/20"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{reference.label}</p>
                    <p className="mt-1 text-sm text-gray-500">{reference.source}</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-blue transition group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
