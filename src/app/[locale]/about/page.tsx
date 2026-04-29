import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Globe, MapPin, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageFaqSection } from "@/components/sections/page-faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { agency, officialProfile, publicAgentRoster } from "@/lib/site-data";
import { createBreadcrumbSchema, erinPersonSchema, organizationSchema } from "@/lib/seo";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tTeam = await getTranslations("home.team");
  const tBio = await getTranslations("agents.bios");

  const aboutPageFaqs: Array<{ question: string; answer: string }> = [
    { question: t("faqs.q1.question"), answer: t("faqs.q1.answer") },
    { question: t("faqs.q2.question"), answer: t("faqs.q2.answer") },
    { question: t("faqs.q3.question"), answer: t("faqs.q3.answer") },
  ];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Allsberry Insurance Agency",
    url: absoluteUrl("/about"),
    description: t("metaDescription"),
    inLanguage: locale === "es" ? "es" : "en",
    about: {
      "@id": organizationSchema["@id"],
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "es" ? "es" : "en",
    mainEntity: aboutPageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const valuesIcons = [BadgeCheck, ShieldCheck, MapPin];
  const valueKeys = ["clarity", "responsiveness", "localExpertise"] as const;

  return (
    <div className="bg-white pt-32">
      <StructuredData
        data={[
          organizationSchema,
          breadcrumbSchema,
          aboutPageSchema,
          faqSchema,
          ...(erinPersonSchema ? [erinPersonSchema] : []),
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-18 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">
              {t("eyebrow")}
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {t("heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {t("intro")}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: t("stats.servingSinceLabel"), value: String(agency.founded) },
                { label: t("stats.hoursLabel"), value: t("stats.hoursValue") },
                { label: t("stats.bilingualLabel"), value: t("stats.bilingualValue") },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] border border-gray-100 bg-gray-50 p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-[2rem] border border-gray-100 p-8 shadow-[0_25px_70px_-52px_rgba(0,32,92,0.5)]"
            style={{ backgroundImage: "var(--elevated-shell-gradient)" }}
          >
            <div className="grid gap-6 rounded-[1.8rem] bg-white p-6">
              <div className="flex items-center gap-5">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <Image
                    src={officialProfile.headshot.src}
                    alt={officialProfile.headshot.alt}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                    {t("leadership.label")}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-gray-900">
                    Erin Allsberry
                  </h2>
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    {t("leadership.title")}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {valueKeys.map((key, index) => {
                  const Icon = valuesIcons[index];
                  return (
                    <div key={key} className="rounded-2xl border border-gray-100 p-5">
                      <Icon className="h-6 w-6 text-blue" />
                      <h3 className="mt-4 font-display text-xl font-bold text-gray-900">
                        {t(`values.items.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-gray-600">{t(`values.items.${key}.description`)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {officialProfile.badges.map((badge) => (
                  <div
                    key={badge.title}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">
                      <Image
                        src={badge.image.src}
                        alt={badge.image.alt}
                        width={badge.title.includes("Prime") ? 5111 : 1258}
                        height={badge.title.includes("Prime") ? 5037 : 658}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {t("recognitionLabel")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{badge.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("teamSection.eyebrow")}
            title={t("teamSection.title")}
            description={t("teamSection.description")}
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publicAgentRoster.map((agent) => (
              <div
                key={agent.slug}
                className="rounded-[1.75rem] border border-gray-100 bg-white p-5 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
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
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#00205c_0%,#0066b3_100%)] text-lg font-display font-extrabold text-white">
                      {agent.initials}
                    </div>
                  )}
                  <div>
                    <h2 className="font-display text-xl font-bold text-gray-900">{agent.name}</h2>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                      {agent.title}
                    </p>
                    {agent.languages && agent.languages.length > 1 && (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <Globe className="h-3 w-3" />
                        {tTeam("seHablaEspanol")}
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-gray-600 line-clamp-3">{tBio(agent.slug)}</p>
                <Link
                  href={buildTrackedHref(`/agents/${agent.slug}`, {
                    agent: agent.slug,
                    entry: "about-team-card",
                  })}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue transition hover:text-gray-900"
                >
                  {tTeam("meetAgent", { name: agent.firstName })}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageFaqSection
        eyebrow={t("eyebrow")}
        title={t("faqs.heading")}
        faqs={aboutPageFaqs}
        ctas={[
          {
            href: buildTrackedHref("/contact", {
              entry: "about-faq-contact-cta",
            }),
            label: t("faqs.ctaContact"),
          },
          {
            href: buildTrackedHref("/quote", {
              entry: "about-faq-quote-cta",
            }),
            label: t("faqs.ctaQuote"),
          },
        ]}
      />
      {/* suppress unused import warning — agency used in metadata */}
      <span className="sr-only" aria-hidden="true">{agency.name}</span>
    </div>
  );
}
