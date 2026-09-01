import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CtaBanner } from "@/components/sections/cta-banner";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { agency, publicAgentRoster } from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

const path = "/agents";

type AgentsIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AgentsIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "agents" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path,
    locale,
    keywords: [
      "Allsberry Insurance Agency agents",
      "insurance agent Corona CA",
      "Erin Allsberry",
    ],
  });
}

export default async function AgentsIndexPage({ params }: AgentsIndexPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("agents");
  const tNav = await getTranslations("nav");
  const tTeam = await getTranslations("home.team");
  const tBio = await getTranslations("agents.bios");

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: tNav("home"), path: "/" },
    { name: tNav("agents"), path },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("listHeading"),
    description: t("metaDescription"),
    url: absoluteUrl(path),
    isPartOf: {
      "@id": organizationSchema["@id"],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publicAgentRoster.map((agent, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: agent.name,
        url: absoluteUrl(`/agents/${agent.slug}`),
      })),
    },
  };

  return (
    <div className="bg-white pt-28 pb-24">
      <StructuredData data={[organizationSchema, breadcrumbSchema, collectionSchema]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("listHeading")}
          description={t("listSubheading")}
          as="h1"
        />
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
          {agency.fullAddress}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {publicAgentRoster.map((agent) => (
            <article
              key={agent.slug}
              className="rounded-card border border-gray-100 bg-white p-5 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
            >
              <div className="flex items-center gap-4">
                {agent.photo ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white shadow-md">
                    <Image
                      src={agent.photo.src}
                      alt={agent.photo.alt}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--navy)_0%,var(--blue)_100%)] text-lg font-display font-extrabold text-white">
                    {agent.initials}
                  </div>
                )}
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900">{agent.name}</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                    {agent.title}
                  </p>
                  {agent.languages && agent.languages.length > 1 ? (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-warm-accent">
                      <Globe className="h-3 w-3" />
                      {tTeam("seHablaEspanol")}
                    </p>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-600 line-clamp-3">{tBio(agent.slug)}</p>
              <Link
                href={buildTrackedHref(`/agents/${agent.slug}`, {
                  agent: agent.slug,
                  entry: "agents-directory-card",
                })}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue transition hover:text-gray-900"
              >
                {tTeam("meetAgent", { name: agent.firstName })}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}
