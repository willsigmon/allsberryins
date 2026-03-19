import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, Phone, QrCode, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { AgentContactForm } from "@/components/forms/agent-contact-form";
import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { agency, agents, getAgentBySlug } from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

type AgentPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return {};
  }

  return createPageMetadata({
    title: agent.name,
    description: `${agent.name}, ${agent.title} at Allsberry Insurance Agency. Based in Corona, CA, serving Southern California. Contact ${agent.firstName} for personalized insurance guidance.`,
    path: `/agents/${agent.slug}`,
    keywords: [agent.name, agent.title, "Southern California insurance agent", "Corona insurance agent"],
  });
}

export default async function AgentPage({ params, searchParams }: AgentPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const entryPoint = typeof query.entry === "string" ? query.entry : undefined;
  const directPageUrl = absoluteUrl(
    buildTrackedHref(`/agents/${agent.slug}`, {
      agent: agent.slug,
      entry: "qr-profile",
    }),
  );

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: agent.name,
    jobTitle: agent.title,
    worksFor: {
      "@type": "InsuranceAgency",
      name: agency.fullName,
      url: agency.domain,
    },
    telephone: agent.phone,
    email: agent.email,
    url: absoluteUrl(`/agents/${agent.slug}`),
    description: agent.bio,
  };

  const agentHighlights = [
    {
      label: "Coverage focus",
      value: agent.specialties.join(" • "),
    },
    {
      label: "Office",
      value: agency.fullAddress,
    },
    {
      label: "Mobile-first flow",
      value: "Tap to call, scan, or start a quote online",
    },
  ];
  const phoneHref = agent.phoneHref ?? agency.phoneHref;

  return (
    <div className="pt-32 pb-20" style={{ backgroundImage: "var(--hero-bg)" }}>
      <StructuredData data={personSchema} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[2.75rem] p-2 shadow-[0_35px_95px_-58px_rgba(0,32,92,0.85)]"
          style={{ backgroundImage: "var(--agent-shell-gradient)" }}
        >
          <div className="grid gap-8 rounded-[2.35rem] bg-white p-6 lg:grid-cols-[1.02fr_0.98fr] lg:p-8">
            <div
              className="rounded-[2.2rem] border border-gray-100 p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.4)]"
              style={{ backgroundImage: "var(--panel-gradient)" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                Direct agent page
              </div>

              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                {agent.photo ? (
                  <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-xl">
                    <Image
                      src={agent.photo.src}
                      alt={agent.photo.alt}
                      width={144}
                      height={144}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[linear-gradient(145deg,#00205c_0%,#0066b3_100%)] text-5xl font-display font-extrabold text-white shadow-xl">
                    {agent.initials}
                  </div>
                )}

                <div>
                  <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    {agent.name}
                  </h1>
                  <p className="mt-3 text-base font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {agent.title}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agent.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-8 text-lg leading-8 text-gray-600">{agent.bio}</p>
              {agent.license ? (
                <p className="mt-5 text-sm font-semibold text-blue">{agent.license}</p>
              ) : null}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href={phoneHref}
                  className="rounded-[1.6rem] border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 transition hover:border-blue hover:text-blue"
                >
                  <Phone className="mb-3 h-5 w-5 text-blue" />
                  {agent.phone}
                </Link>
                <Link
                  href={`mailto:${agent.email}`}
                  className="rounded-[1.6rem] border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 transition hover:border-blue hover:text-blue"
                >
                  <Mail className="mb-3 h-5 w-5 text-blue" />
                  {agent.email}
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {agentHighlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-[1.5rem] border border-gray-100 bg-white px-4 py-4 shadow-[0_16px_32px_-30px_rgba(0,32,92,0.4)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                      {highlight.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                      {highlight.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2.2rem] border border-gray-100 bg-white p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                      Direct link
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
                      Scan to visit {agent.firstName}&apos;s page
                    </h2>
                    <p className="mt-4 text-base leading-8 text-gray-600">
                      Great for print materials, desk signage, referrals, or follow-up texts.
                      Scan from your phone to save {agent.firstName}&apos;s contact info instantly.
                    </p>
                    <Link
                      href={buildTrackedHref("/quote", {
                        agent: agent.slug,
                        entry: "agent-page-quote",
                        product: agent.slug === "brahm" ? "business" : "home",
                      })}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-blue"
                    >
                      Start with {agent.firstName}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-4">
                    <QRCodeSVG
                      value={directPageUrl}
                      size={160}
                      fgColor="#00205C"
                      bgColor="#ffffff"
                      includeMargin
                    />
                  </div>
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500">
                  <QrCode className="h-4 w-4 text-blue" />
                  Scan to visit my page
                </p>
              </div>

              <div
                className="rounded-[2.2rem] border border-gray-100 p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]"
                style={{ backgroundImage: "var(--surface-gradient)" }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                  Working with {agent.firstName}
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
                  What to expect
                </h2>
                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1.4rem] border border-gray-100 bg-white px-4 py-4 text-sm leading-7 text-gray-600">
                    Call, email, or fill out the form below and {agent.firstName} will follow up
                    within one business day.
                  </div>
                  <div className="rounded-[1.4rem] border border-gray-100 bg-white px-4 py-4 text-sm leading-7 text-gray-600">
                    {agent.firstName} will review your situation, explain your options in plain
                    language, and help you compare coverage side by side.
                  </div>
                  <div className="rounded-[1.4rem] border border-gray-100 bg-white px-4 py-4 text-sm leading-7 text-gray-600">
                    Once you choose a plan, {agent.firstName} stays with you through binding,
                    renewals, and any claims that come up.
                  </div>
                </div>
              </div>
            </div>
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
      </section>
    </div>
  );
}
