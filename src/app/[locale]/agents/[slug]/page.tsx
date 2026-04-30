import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, Phone, QrCode, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AgentContactForm } from "@/components/forms/agent-contact-form";
import { SaveContactButton } from "@/components/ui/save-contact-button";
import { StructuredData } from "@/components/seo/structured-data";
import { SeoPageCard } from "@/components/ui/seo-page-card";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { getSeoPagesForAgent } from "@/lib/seo-content";
import { agency, agents, getAgentBySlug, primaryProducerSlug } from "@/lib/site-data";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { getAgentQrDestination } from "@/lib/agent-qr";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    agents.map((agent) => ({ locale, slug: agent.slug })),
  );
}

type AgentPageProps = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return {};
  }

  const tBio = await getTranslations({ locale, namespace: "agents.bios" });

  return createPageMetadata({
    title: agent.name,
    description: tBio(agent.slug),
    path: `/agents/${agent.slug}`,
    keywords: [agent.name, agent.title, "Southern California insurance agent", "personalized insurance guidance"],
    locale,
  });
}

export default async function AgentPage({ params, searchParams }: AgentPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const query = await searchParams;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const tBio = await getTranslations("agents.bios");
  const agentBio = tBio(agent.slug);
  const entryPoint = typeof query.entry === "string" ? query.entry : undefined;
  const qrDestination = getAgentQrDestination(agent.slug);

  const familyName = agent.name.split(" ").slice(1).join(" ") || undefined;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/agents/${agent.slug}#person`),
    name: agent.name,
    givenName: agent.firstName,
    familyName,
    jobTitle: agent.title,
    worksFor: {
      "@id": organizationSchema["@id"],
    },
    telephone: agent.phone,
    email: agent.email,
    url: absoluteUrl(`/agents/${agent.slug}`),
    description: agentBio,
    image: agent.photo ? absoluteUrl(agent.photo.src) : undefined,
    knowsAbout: agent.specialties,
    knowsLanguage: agent.languages?.includes("Spanish") ? ["en", "es"] : ["en"],
    ...(agent.license
      ? {
          hasCredential: [
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "license",
              name: `California Insurance License ${agent.license}`,
            },
          ],
        }
      : {}),
  };
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${agent.name} | Allsberry Insurance Agency`,
    url: absoluteUrl(`/agents/${agent.slug}`),
    mainEntity: personSchema,
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: agent.name, path: `/agents/${agent.slug}` },
  ]);

  const agentHighlights = [
    {
      label: "Coverage focus",
      value: agent.specialties.join(" • "),
    },
    {
      label: "Office",
      value: `Serving ${agency.serviceArea}`,
    },
    {
      label: "Mobile-first flow",
      value: "Tap to call, scan, or start a quote online",
    },
  ];
  const phoneHref = agent.phoneHref ?? agency.phoneHref;
  const relatedSeoPages = getSeoPagesForAgent(agent.slug).slice(0, 3);

  return (
    <div className="pt-32 pb-20" style={{ backgroundImage: "var(--hero-bg)" }}>
      <StructuredData data={[breadcrumbSchema, profilePageSchema]} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.1rem] border border-blue/10 bg-white/90 p-4 shadow-[0_35px_95px_-62px_rgba(0,32,92,0.8)] backdrop-blur">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
            <article
              className="rounded-[1.75rem] border border-gray-100 p-6 shadow-[0_24px_60px_-52px_rgba(0,32,92,0.38)] lg:p-8"
              style={{ backgroundImage: "var(--panel-gradient)" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                Direct agent page
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start">
                {agent.photo ? (
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-white shadow-xl">
                    <Image
                      src={agent.photo.src}
                      alt={agent.photo.alt}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(145deg,#00205c_0%,#0066b3_100%)] text-4xl font-display font-extrabold text-white shadow-xl">
                    {agent.initials}
                  </div>
                )}

                <div className="min-w-0">
                  <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    {agent.name}
                  </h1>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                    {agent.title}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agent.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-blue-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-7 text-base leading-8 text-gray-600">{agentBio}</p>
              {agent.license ? (
                <p className="mt-4 text-sm font-semibold text-blue">{agent.license}</p>
              ) : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link
                  href={phoneHref}
                  className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-blue hover:text-blue"
                >
                  <Phone className="h-5 w-5 shrink-0 text-blue" />
                  {agent.phone}
                </Link>
                <Link
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:border-blue hover:text-blue"
                  aria-label={`Email ${agent.firstName}`}
                >
                  <Mail className="h-5 w-5 shrink-0 text-blue" />
                  Email {agent.firstName}
                </Link>
                <SaveContactButton
                  name={agent.name}
                  phone={agent.phone}
                  email={agent.email}
                  title={agent.title}
                  address="355 N Sheridan St, Ste 100, Corona, CA 92878"
                  variant="light"
                  className="rounded-2xl border-gray-200 bg-white px-4 py-3 text-sm"
                />
              </div>

              <dl className="mt-6 rounded-[1.4rem] border border-gray-100 bg-white/80 p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  {agentHighlights.map((highlight) => (
                    <div key={highlight.label} className="min-w-0">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {highlight.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                        {highlight.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </dl>
            </article>

            <aside className="grid content-start gap-5">
              <article className="rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-[0_24px_60px_-52px_rgba(0,32,92,0.4)]">
                <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                      Direct link
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-gray-900">
                      {qrDestination.isMainLandingPage
                        ? "Scan to visit the main Allsberry site"
                        : `Scan to visit ${agent.firstName}'s page`}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {qrDestination.isMainLandingPage
                        ? "Opens the main landing page for print, cards, and follow-up."
                        : "Opens the tracked profile page for print, cards, and follow-up."}
                    </p>
                  </div>
                  <div className="mx-auto rounded-[1.35rem] border border-gray-100 bg-gray-50 p-3 sm:mx-0">
                    <QRCodeSVG
                      value={qrDestination.absoluteUrl}
                      size={150}
                      fgColor="#00205C"
                      bgColor="#ffffff"
                      includeMargin
                    />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={buildTrackedHref("/quote", {
                      agent: agent.slug,
                      entry: "agent-page-quote",
                      product: agent.slug === primaryProducerSlug ? "business" : "home",
                    })}
                    className="cta-glow-blue inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-blue"
                  >
                    Start with {agent.firstName}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-400">
                    <QrCode className="h-4 w-4 text-blue" />
                    {qrDestination.entryLabel}
                  </p>
                </div>
              </article>

              <article
                className="rounded-[1.75rem] border border-gray-100 p-6 shadow-[0_24px_60px_-52px_rgba(0,32,92,0.4)]"
                style={{ backgroundImage: "var(--surface-gradient)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                  Working with {agent.firstName}
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
                  What to expect
                </h2>
                <div className="mt-5 divide-y divide-[#c8d1dc] rounded-[1.25rem] border border-[#d7dee8] bg-white/85 px-4">
                  <p className="py-4 text-sm leading-7 text-[#26394f]">
                    Call, email, or fill out the form below and {agent.firstName} will follow up
                    within one business day.
                  </p>
                  <p className="py-4 text-sm leading-7 text-[#26394f]">
                    {agent.firstName} will review your situation, explain your options in plain
                    language, and help you compare coverage side by side.
                  </p>
                  <p className="py-4 text-sm leading-7 text-[#26394f]">
                    Once you choose a plan, {agent.firstName} stays with you through binding,
                    renewals, and any claims that come up.
                  </p>
                </div>
              </article>
            </aside>
          </div>
        </div>

        <div className="mt-8 rounded-[2.4rem] border border-gray-100 bg-white p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">Lead form</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
            Get Started with {agent.firstName}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
            Share the basics and {agent.firstName} or another licensed member of the team will
            follow up within one business day.
          </p>
          <div className="mt-8">
            <AgentContactForm
              agentName={agent.name}
              agentSlug={agent.slug}
              entryPoint={entryPoint}
            />
          </div>
        </div>

        {relatedSeoPages.length ? (
          <div className="mt-8 rounded-[2.4rem] border border-gray-100 bg-white p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
              Related guides
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
              Coverage guides {agent.firstName} can help you review
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
              These pages are part of the first California home insurance search cluster we are
              building around wildfire pressure, FAIR Plan, and clear next steps.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedSeoPages.map((relatedSeoPage) => (
                <SeoPageCard key={relatedSeoPage.slug} page={relatedSeoPage} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
