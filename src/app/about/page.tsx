import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { agency, agents } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn more about Allsberry Insurance Agency, our Corona roots, and the team helping Inland Empire families and businesses protect what matters most.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-white pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-18 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">About the agency</p>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Local guidance, clean communication, and coverage that fits real life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Allsberry Insurance Agency has served Corona and the Inland Empire since 1994. Erin has led the agency since 2009 with a simple belief: insurance should feel tailored, understandable, and genuinely helpful.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Serving since", value: String(agency.founded) },
                { label: "Office hours", value: "Mon–Fri" },
                { label: "Primary focus", value: "Home • Auto • Business" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] border border-gray-100 bg-gray-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">{stat.label}</p>
                  <p className="mt-3 font-display text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-gray-100 bg-[linear-gradient(160deg,#f8fafb_0%,#e8f0f8_100%)] p-8 shadow-[0_25px_70px_-52px_rgba(0,32,92,0.5)]">
            <div className="rounded-[1.8rem] bg-white p-6">
              <h2 className="font-display text-2xl font-bold text-gray-900">What clients should feel here</h2>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Clear options",
                    description: "Coverage choices explained in plain language so the best fit is easy to understand.",
                    icon: BadgeCheck,
                  },
                  {
                    title: "Tailored advice",
                    description: "Recommendations shaped around your household, vehicles, business, and long-term goals.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Local context",
                    description: "An agency that knows Corona, Inland Empire growth, and the realities behind California insurance decisions.",
                    icon: MapPin,
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-100 p-5">
                    <item.icon className="h-6 w-6 text-blue" />
                    <h3 className="mt-4 font-display text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
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
            eyebrow="Our team"
            title="The people clients actually work with"
            description="Agency-first branding was non-negotiable, but trust still grows faster when faces, names, and strengths are easy to find."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {agents.map((agent) => (
              <div key={agent.slug} className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]">
                <h2 className="font-display text-2xl font-bold text-gray-900">{agent.name}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue">{agent.title}</p>
                <p className="mt-4 text-sm leading-7 text-gray-600">{agent.bio}</p>
                <Link
                  href={`/agents/${agent.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-blue transition hover:text-navy"
                >
                  Meet {agent.firstName}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
