import type { Metadata } from "next";

import { EvidenceRequestForm } from "@/components/forms/evidence-request-form";
import { PageFaqSection } from "@/components/sections/page-faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { agency, getAgentBySlug } from "@/lib/site-data";
import { buildTrackedHref, normalizeAgentSlug } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Proof of Insurance",
  description:
    "Request evidence of insurance, a certificate of insurance, or a mortgagee update from Allsberry Insurance Agency across Southern California.",
  path: "/evidence-of-insurance",
  keywords: [
    "evidence of insurance Southern California",
    "certificate of insurance request",
    "proof of insurance request",
    "mortgagee update insurance",
    "COI request Southern California",
  ],
});

type EvidencePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EvidenceOfInsurancePage({
  searchParams,
}: EvidencePageProps) {
  const params = await searchParams;
  const audience = typeof params.audience === "string" ? params.audience : undefined;
  const entryPoint = typeof params.entry === "string" ? params.entry : undefined;
  const assignedAgentSlug =
    typeof params.agent === "string" ? normalizeAgentSlug(params.agent) : undefined;
  const assignedAgent = assignedAgentSlug ? getAgentBySlug(assignedAgentSlug) : undefined;
  const pageFaqs = [
    {
      question: "Can I request proof of insurance online?",
      answer:
        "Yes. Share the basics here and the agency can follow up with the right evidence of insurance, COI details, or mortgagee update.",
    },
    {
      question: "What kinds of documentation can Allsberry Insurance Agency help with?",
      answer:
        "The team can help with evidence of insurance, certificates of insurance, escrow or closing requests, and mortgagee or loss payee updates.",
    },
    {
      question: "What helps the team turn around my request faster?",
      answer:
        "Include who needs the document, any due date, and any mortgagee, escrow, property, or certificate notes you already have so the request can be routed cleanly.",
    },
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
      servicePhone: "+1-951-739-5959",
    },
  };

  return (
    <div className="pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <StructuredData data={[breadcrumbSchema, serviceSchema, faqSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Proof of insurance"
              title="Need evidence of coverage fast?"
              description="Use this request flow for certificates of insurance, escrow or mortgage requests, and proof of coverage follow-up."
            />
            <div className="mt-8 rounded-[2rem] border border-blue/10 bg-white p-6 shadow-[0_20px_60px_-46px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                What helps us move faster
              </p>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-gray-600">
                <li>• Tell us who needs the proof.</li>
                <li>• Add a due date if escrow or underwriting is waiting on it.</li>
                <li>• Include any loan, property, or certificate notes you already have.</li>
              </ul>
              {assignedAgent ? (
                <div className="mt-5 rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-gray-900">
                  Preferred follow-up: {assignedAgent.name}
                </div>
              ) : null}
              <p className="mt-5 text-sm font-semibold text-gray-900">
                Need to call instead? {agency.phone}
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
          title="Documentation questions we can answer right here"
          description="This page now matches the FAQ schema with visible answers, which is cleaner for users and safer for search engines."
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
              label: assignedAgent ? `Work with ${assignedAgent.firstName}` : "Talk to the team",
            },
            {
              href: buildTrackedHref("/quote", {
                agent: assignedAgentSlug,
                entry: entryPoint ?? "evidence-faq-quote-cta",
                product: assignedAgentSlug === "brahm" ? "business" : "home",
              }),
              label: "Start a coverage quote instead",
            },
          ]}
        />
      </section>
    </div>
  );
}
