import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { EvidenceRequestForm } from "@/components/forms/evidence-request-form";
import { PageFaqSection } from "@/components/sections/page-faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { agency, getAgentBySlug, primaryProducerSlug } from "@/lib/site-data";
import { buildTrackedHref, normalizeAgentSlug } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

type EvidencePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: EvidencePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "evidenceOfInsurance" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/evidence-of-insurance",
    locale,
    keywords: [
      "evidence of insurance Southern California",
      "certificate of insurance request",
      "proof of insurance request",
      "mortgagee update insurance",
      "COI request Southern California",
    ],
  });
}

export default async function EvidenceOfInsurancePage({ params, searchParams }: EvidencePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("evidenceOfInsurance");
  const sp = await searchParams;

  const audience = typeof sp.audience === "string" ? sp.audience : undefined;
  const entryPoint = typeof sp.entry === "string" ? sp.entry : undefined;
  const assignedAgentSlug =
    typeof sp.agent === "string" ? normalizeAgentSlug(sp.agent) : undefined;
  const assignedAgent = assignedAgentSlug ? getAgentBySlug(assignedAgentSlug) : undefined;

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
    { name: "Proof of Insurance", path: "/evidence-of-insurance" },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Proof of Insurance Request",
    serviceType: "Evidence of insurance and COI request",
    provider: {
      "@id": organizationSchema["@id"],
    },
    areaServed: organizationSchema.areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/evidence-of-insurance"),
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
            <div className="mt-8 rounded-[2rem] border border-blue/10 bg-white p-6 shadow-[0_20px_60px_-46px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                {t("helpsUsMoveFaster")}
              </p>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-gray-600">
                <li>• {t("helpBullet1")}</li>
                <li>• {t("helpBullet2")}</li>
                <li>• {t("helpBullet3")}</li>
              </ul>
              {assignedAgent ? (
                <div className="mt-5 rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-gray-900">
                  {t("preferredFollowUp", { name: assignedAgent.name })}
                </div>
              ) : null}
              <p className="mt-5 text-sm font-semibold text-gray-900">
                {t("callInstead", { phone: agency.phone })}
              </p>
            </div>
          </div>
          <EvidenceRequestForm
            initialAudience={audience}
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
              href: assignedAgentSlug
                ? buildTrackedHref(`/agents/${assignedAgentSlug}`, {
                    agent: assignedAgentSlug,
                    entry: entryPoint ?? "evidence-faq-agent-cta",
                  })
                : buildTrackedHref("/contact", {
                    entry: entryPoint ?? "evidence-faq-contact-cta",
                  }),
              label: assignedAgent ? t("faqs.workWithAgent", { name: assignedAgent.firstName }) : t("faqs.talkToTeam"),
            },
            {
              href: buildTrackedHref("/quote", {
                agent: assignedAgentSlug,
                entry: entryPoint ?? "evidence-faq-quote-cta",
                product: assignedAgentSlug === primaryProducerSlug ? "business" : "home",
              }),
              label: t("faqs.ctaQuote"),
            },
          ]}
        />
      </section>
    </div>
  );
}
