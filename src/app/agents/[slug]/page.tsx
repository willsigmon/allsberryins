import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { AgentContactForm } from "@/components/forms/agent-contact-form";
import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { agency, agents, getAgentBySlug } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

type AgentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return {};
  }

  return createPageMetadata({
    title: agent.name,
    description: `${agent.name}, ${agent.title} at Allsberry Insurance Agency in Corona, CA. Contact ${agent.firstName} for personalized insurance guidance.`,
    path: `/agents/${agent.slug}`,
    keywords: [agent.name, agent.title, "Corona insurance agent"],
  });
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

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

  return (
    <div className="bg-white pt-32">
      <StructuredData data={personSchema} />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
          <div className="rounded-[2.5rem] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#eef6fd_100%)] p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.55)]">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[linear-gradient(145deg,#00205c_0%,#0066b3_100%)] text-5xl font-display font-extrabold text-white shadow-xl">
              {agent.initials}
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.26em] text-blue">Agent profile</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {agent.name}
            </h1>
            <p className="mt-3 text-base font-semibold uppercase tracking-[0.2em] text-gray-500">{agent.title}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{agent.bio}</p>
            {agent.license ? (
              <p className="mt-5 text-sm font-semibold text-blue">{agent.license}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              {agent.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href={agency.phoneHref}
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
          </div>

          <div className="grid gap-8">
            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">Direct link</p>
                  <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">Scan to visit {agent.firstName}&apos;s page</h2>
                  <p className="mt-4 text-base leading-8 text-gray-600">
                    Great for print materials, desk signage, referrals, or follow-up texts. Mobile traffic was called out as important, so this keeps the flow easy.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-gray-100 bg-gray-50 p-4">
                  <QRCodeSVG
                    value={absoluteUrl(`/agents/${agent.slug}`)}
                    size={160}
                    fgColor="#00205C"
                    bgColor="#ffffff"
                    includeMargin
                  />
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-gray-500">Scan to visit my page</p>
            </div>

            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">Lead form</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-gray-900">
                Get Started with {agent.firstName}
              </h2>
              <p className="mt-4 text-base leading-8 text-gray-600">
                Share the basics and {agent.firstName} or another licensed member of the team will follow up.
              </p>
              <div className="mt-8">
                <AgentContactForm agentName={agent.name} agentSlug={agent.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
