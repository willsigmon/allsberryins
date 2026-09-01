import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { QuoteForm } from "@/components/forms/quote-form";
import { PageFaqSection } from "@/components/sections/page-faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { resolveQuoteEntryNotices, type QuoteEntryNotice } from "@/lib/quote-entry";
import { agency, agents, carrierPartners, getAgentBySlug, productSelectionOptions } from "@/lib/site-data";
import { buildTrackedHref, normalizeAgentSlug } from "@/lib/tracking";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type QuotePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quote" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/quote",
    locale,
  });
}

export default async function QuotePage({ params, searchParams }: QuotePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quote");
  const searchParamsValue = await searchParams;
  const product = typeof searchParamsValue.product === "string" ? searchParamsValue.product : undefined;
  const zip = typeof searchParamsValue.zip === "string" ? searchParamsValue.zip : undefined;
  const entryPoint = typeof searchParamsValue.entry === "string" ? searchParamsValue.entry : undefined;
  const carrier = typeof searchParamsValue.carrier === "string" ? searchParamsValue.carrier : undefined;
  const assignedAgentSlug =
    typeof searchParamsValue.agent === "string" ? normalizeAgentSlug(searchParamsValue.agent) : undefined;
  const assignedAgent = assignedAgentSlug ? getAgentBySlug(assignedAgentSlug) : undefined;
  const entryNotices = resolveQuoteEntryNotices(
    { agent: assignedAgentSlug, carrier, product },
    {
      agentSlugs: agents.map((item) => item.slug),
      carrierNames: carrierPartners.map((item) => item.name),
      productSlugs: productSelectionOptions,
    },
  );

  const pageFaqs = [
    { question: t("faqs.q1.question"), answer: t("faqs.q1.answer") },
    { question: t("faqs.q2.question"), answer: t("faqs.q2.answer") },
    { question: t("faqs.q3.question"), answer: t("faqs.q3.answer") },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Get a Quote", path: "/quote" },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Insurance Quote Request",
    serviceType: "Insurance quote request",
    provider: {
      "@id": organizationSchema["@id"],
    },
    areaServed: organizationSchema.areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/quote"),
      servicePhone: agency.phoneHref.replace("tel:", ""),
    },
  };

  return (
    <div className="pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <StructuredData data={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("heading")}
              description={t("subheading")}
              as="h1"
            />
            <div className="mt-8 rounded-card-lg border border-blue/10 bg-white p-6 shadow-[0_20px_60px_-46px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">{t("whatHappensNext")}</p>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-gray-600">
                <li>• {t("next1")}</li>
                <li>• {t("next2")}</li>
                <li>• {t("next3")}</li>
              </ul>
              {assignedAgent ? (
                <div className="mt-5 rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-gray-900">
                  {t("preferredFollowUp", { name: assignedAgent.name })}
                </div>
              ) : null}
              {entryNotices.length ? (
                <ul className="mt-5 grid gap-3">
                  {entryNotices.map((notice) => (
                    <li
                      key={quoteEntryNoticeKey(notice)}
                      className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-950"
                    >
                      {notice.kind === "known-carrier"
                        ? t("knownCarrierNotice", { carrier: notice.carrierName })
                        : notice.kind === "unknown-product"
                          ? t("unknownProductNotice")
                          : notice.kind === "unknown-carrier"
                            ? t("unknownCarrierNotice")
                            : t("unknownAgentNotice")}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-5 text-sm leading-7 text-gray-600">
                {t("needProofIntro")}{" "}
                <a
                  className="font-semibold text-blue hover:text-gray-900"
                  href={buildTrackedHref("/evidence-of-insurance", {
                    agent: assignedAgentSlug,
                    entry: entryPoint ?? (assignedAgentSlug ? "quote-page-proof-handoff" : undefined),
                  })}
                >
                  {t("needProofLink")}
                </a>
                .
              </p>
            </div>
          </div>
          <QuoteForm
            initialProduct={product}
            initialZip={zip}
            assignedAgentSlug={assignedAgentSlug}
            entryPoint={entryPoint}
          />
        </div>
        <PageFaqSection
          title={t("faqs.heading")}
          description={t("faqs.description")}
          faqs={pageFaqs}
          ctas={[
            {
              href: buildTrackedHref("/evidence-of-insurance", {
                agent: assignedAgentSlug,
                entry: entryPoint ?? "quote-faq-proof-cta",
              }),
              label: t("faqs.ctaProof"),
            },
            {
              href: buildTrackedHref("/contact", {
                agent: assignedAgentSlug,
                entry: entryPoint ?? "quote-faq-contact-cta",
              }),
              label: t("faqs.ctaContact"),
            },
          ]}
        />
      </section>
    </div>
  );
}

function quoteEntryNoticeKey(notice: QuoteEntryNotice): string {
  return notice.kind === "known-carrier" ? `${notice.kind}-${notice.carrierName}` : notice.kind;
}
