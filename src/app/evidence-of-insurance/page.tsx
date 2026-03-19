import type { Metadata } from "next";

import { EvidenceRequestForm } from "@/components/forms/evidence-request-form";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { agency, getAgentBySlug } from "@/lib/site-data";
import { normalizeAgentSlug } from "@/lib/tracking";

export const metadata: Metadata = createPageMetadata({
  title: "Proof of Insurance",
  description:
    "Request evidence of insurance, a certificate of insurance, or a mortgagee update from Allsberry Insurance Agency in Corona, CA.",
  path: "/evidence-of-insurance",
  keywords: [
    "evidence of insurance Corona CA",
    "certificate of insurance Corona",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I request proof of insurance online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Share the basics here and the agency can follow up with the right evidence of insurance, COI details, or mortgagee update.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of documentation can Allsberry Insurance Agency help with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The team can help with evidence of insurance, certificates of insurance, escrow or closing requests, and mortgagee or loss payee updates.",
        },
      },
    ],
  };

  return (
    <div className="pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <StructuredData data={faqSchema} />
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
                <div className="mt-5 rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-navy">
                  Preferred follow-up: {assignedAgent.name}
                </div>
              ) : null}
              <p className="mt-5 text-sm font-semibold text-navy">
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
      </section>
    </div>
  );
}
