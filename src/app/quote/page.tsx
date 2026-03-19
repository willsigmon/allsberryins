import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { getAgentBySlug } from "@/lib/site-data";
import { buildTrackedHref, normalizeAgentSlug } from "@/lib/tracking";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Quote",
  description:
    "Request a quote from Allsberry Insurance Agency for home, auto, life, business, renters, condo, umbrella, and workers compensation coverage across Southern California.",
  path: "/quote",
});

type QuotePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams;
  const product = typeof params.product === "string" ? params.product : undefined;
  const zip = typeof params.zip === "string" ? params.zip : undefined;
  const entryPoint = typeof params.entry === "string" ? params.entry : undefined;
  const assignedAgentSlug =
    typeof params.agent === "string" ? normalizeAgentSlug(params.agent) : undefined;
  const assignedAgent = assignedAgentSlug ? getAgentBySlug(assignedAgentSlug) : undefined;

  return (
    <div className="pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Get a quote"
              title="Start simple. We’ll handle the details with you."
              description="Tell us what you need and a licensed agent will follow up with options tailored to your situation."
            />
            <div className="mt-8 rounded-[2rem] border border-blue/10 bg-white p-6 shadow-[0_20px_60px_-46px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">What happens next</p>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-gray-600">
                <li>• We review the products you selected.</li>
                <li>• An agent follows up within 24 hours.</li>
                <li>• We help compare coverage options and answer questions clearly.</li>
              </ul>
              {assignedAgent ? (
                <div className="mt-5 rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-navy">
                  Preferred follow-up: {assignedAgent.name}
                </div>
              ) : null}
              <p className="mt-5 text-sm leading-7 text-gray-500">
                Need a certificate or proof of insurance instead of a quote? Use the dedicated{" "}
                <a
                  className="font-semibold text-blue hover:text-navy"
                  href={buildTrackedHref("/evidence-of-insurance", {
                    agent: assignedAgentSlug,
                    entry: entryPoint ?? (assignedAgentSlug ? "quote-page-proof-handoff" : undefined),
                  })}
                >
                  proof request flow
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
      </section>
    </div>
  );
}
