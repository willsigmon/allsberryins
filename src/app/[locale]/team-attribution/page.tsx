import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { AttributionWorkbench } from "@/components/team/attribution-workbench";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAgentQrDestination } from "@/lib/agent-qr";
import { createPageMetadata } from "@/lib/metadata";
import { agents, primaryProducerSlug } from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

type TeamAttributionPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TeamAttributionPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...createPageMetadata({
      title: "Team Attribution",
      description: "Internal Allsberry team readout for tracked agent links and attribution QA.",
      path: "/team-attribution",
      locale,
    }),
    robots: {
      follow: false,
      index: false,
    },
  };
}

const agentLinkSets = agents.map((agent) => ({
  directUrl: getAgentQrDestination(agent.slug).absoluteUrl,
  name: agent.name,
  proofUrl: absoluteUrl(
    buildTrackedHref("/evidence-of-insurance", {
      agent: agent.slug,
      audience: agent.slug === primaryProducerSlug ? "Business Owner" : "Home / Auto Owner",
      entry: "team-dashboard-proof",
    }),
  ),
  quoteUrl: absoluteUrl(
    buildTrackedHref("/quote", {
      agent: agent.slug,
      entry: "team-dashboard-quote",
      product: agent.slug === primaryProducerSlug ? "business" : "home",
    }),
  ),
  slug: agent.slug,
  title: agent.title,
}));

export default async function TeamAttributionPage({ params }: TeamAttributionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-32" style={{ backgroundImage: "var(--hero-bg)" }}>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Internal team tools"
          title="Tracked links and attribution QA"
          description="A lightweight readout for the Allsberry team. Use it to grab the right tracked URLs, confirm agent attribution is sticking, and QA the Siteleads label before campaigns go out."
        />

        <div className="mt-10">
          <AttributionWorkbench agents={agentLinkSets} />
        </div>
      </section>
    </div>
  );
}
