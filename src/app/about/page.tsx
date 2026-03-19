import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react";

import { PageFaqSection } from "@/components/sections/page-faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { agency, agents, officialProfile } from "@/lib/site-data";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn more about Allsberry Insurance Agency, our roots in Corona, CA, and the team helping Southern California families and businesses protect what matters most.",
  path: "/about",
});

const aboutPageDescription =
  "Learn more about Allsberry Insurance Agency, our roots in Corona, CA, and the team helping Southern California families and businesses protect what matters most.";

const aboutPageFaqs: Array<{ question: string; answer: string }> = [
  {
    question: "How long has Allsberry Insurance Agency served Southern California?",
    answer:
      "The agency has served the area since 1994, with Erin leading the business since 2009 and continuing the same local, personal approach.",
  },
  {
    question: "What kinds of coverage do you help with?",
    answer:
      "The team helps with home, auto, renters, life, umbrella, condo, and commercial coverage, plus the proof-of-insurance requests that come with real-world policy management.",
  },
  {
    question: "Who do I talk to if I want to start a quote?",
    answer:
      "You can start online or reach out directly. The team will route you to the right licensed agent based on what you need and how quickly you need help.",
  },
];

export default function AboutPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Allsberry Insurance Agency",
    url: absoluteUrl("/about"),
    description: aboutPageDescription,
    about: {
      "@id": organizationSchema["@id"],
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aboutPageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white pt-32">
      <StructuredData data={[organizationSchema, breadcrumbSchema, aboutPageSchema, faqSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-18 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">
              About the agency
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Local guidance, clean communication, and coverage that fits real life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Allsberry Insurance Agency has served Southern California since 1994, rooted in Corona, CA. Erin
              has led the agency since 2009 with a simple belief: insurance should feel tailored,
              understandable, and genuinely helpful.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Serving since", value: String(agency.founded) },
                { label: "Office hours", value: "Mon–Fri · 8–5" },
                { label: "Primary focus", value: "Home • Auto • Business" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] border border-gray-100 bg-gray-50 p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
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
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                    Agency leadership
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-gray-900">
                    Erin Allsberry
                  </h2>
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    Owner & Principal Agent
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    title: "Clear options",
                    description:
                      "Coverage choices explained in plain language so the best fit is easy to understand.",
                    icon: BadgeCheck,
                  },
                  {
                    title: "Tailored advice",
                    description:
                      "Recommendations shaped around your household, vehicles, business, and long-term goals.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Local context",
                    description:
                      "An agency that knows Southern California growth, local markets, and the realities behind California insurance decisions.",
                    icon: MapPin,
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-100 p-5">
                    <item.icon className="h-6 w-6 text-blue" />
                    <h3 className="mt-4 font-display text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
                  </div>
                ))}
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
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Recognition
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
            eyebrow="Our team"
            title="The people clients actually work with"
            description="Insurance works best when you know who you are working with. Here are the people behind your coverage."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {agents.map((agent) => (
              <div
                key={agent.slug}
                className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
              >
                <div className="flex items-center gap-4">
                  {agent.photo ? (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white shadow-md">
                      <Image
                        src={agent.photo.src}
                        alt={agent.photo.alt}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(145deg,#00205c_0%,#0066b3_100%)] text-xl font-display font-extrabold text-white">
                      {agent.initials}
                    </div>
                  )}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-gray-900">{agent.name}</h2>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-blue">
                      {agent.title}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-gray-600">{agent.bio}</p>
                <Link
                  href={buildTrackedHref(`/agents/${agent.slug}`, {
                    agent: agent.slug,
                    entry: "about-team-card",
                  })}
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

      <PageFaqSection
        eyebrow="About the agency"
        title="A few practical questions before you reach out"
        description="This section helps new visitors understand the agency faster and gives AI systems a cleaner summary of who the team serves."
        faqs={aboutPageFaqs}
        ctas={[
          {
            href: buildTrackedHref("/contact", {
              entry: "about-faq-contact-cta",
            }),
            label: "Contact the team",
          },
          {
            href: buildTrackedHref("/quote", {
              entry: "about-faq-quote-cta",
            }),
            label: "Start a quote",
          },
        ]}
      />
    </div>
  );
}
