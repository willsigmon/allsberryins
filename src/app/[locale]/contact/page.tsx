import type { Metadata } from "next";
import { Clock3, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageFaqSection } from "@/components/sections/page-faq-section";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { agency } from "@/lib/site-data";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";
import { buildTrackedHref } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/utils";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const contactItems = [
    { title: t("callUs"), body: agency.phone, href: agency.phoneHref, icon: Phone, external: false },
    { title: t("email"), body: agency.email, href: agency.emailHref, icon: Mail, external: false },
    {
      title: t("serviceArea"),
      body: t("serviceAreaBody", { area: agency.serviceArea }),
      href: "/quote",
      icon: MapPin,
      external: false,
    },
    { title: t("hoursTitle"), body: agency.hours, href: "/quote", icon: Clock3, external: false },
  ] as const;

  const socialItems = [
    { label: "Facebook", href: agency.socials.facebook, icon: Facebook },
    { label: "Instagram", href: agency.socials.instagram, icon: Instagram },
    { label: "LinkedIn", href: agency.socials.linkedin, icon: Linkedin },
  ] as const;

  const contactPageFaqs: Array<{ question: string; answer: string }> = [
    { question: t("faqs.q1.question"), answer: t("faqs.q1.answer") },
    { question: t("faqs.q2.question"), answer: t("faqs.q2.answer") },
    { question: t("faqs.q3.question"), answer: t("faqs.q3.answer") },
  ];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Allsberry Insurance Agency",
    url: absoluteUrl("/contact"),
    description: t("metaDescription"),
    mainEntity: {
      "@id": organizationSchema["@id"],
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactPageFaqs.map((faq) => ({
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
      <StructuredData data={[organizationSchema, breadcrumbSchema, contactPageSchema, faqSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          description={t("subheading")}
          as="h1"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => {
            const isExternal = item.href.startsWith("http") || item.href.startsWith("tel") || item.href.startsWith("mailto");
            const commonProps = {
              key: item.title,
              className: "glass-btn rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg",
            };
            const content = (
              <>
                <item.icon className="h-5 w-5 text-blue" />
                <h2 className="mt-3 font-display text-lg font-bold text-gray-900">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">{item.body}</p>
              </>
            );
            return isExternal ? (
              <a key={item.title} href={item.href} className={commonProps.className}>
                {content}
              </a>
            ) : (
              <Link
                {...commonProps}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={item.href as any}
              >
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div
            className="rounded-[2rem] border border-gray-100 p-8 shadow-[0_28px_70px_-52px_rgba(0,32,92,0.55)]"
            style={{ backgroundImage: "var(--panel-gradient)" }}
          >
            <h2 className="font-display text-3xl font-extrabold text-gray-900">
              {t("fastHelpHeading")}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
              {t("fastHelpBody")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={buildTrackedHref("/quote", { entry: "contact-page-primary-quote" }) as any}
                className="cta-glow inline-flex items-center justify-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition hover:bg-red-hover"
              >
                {t("startYourQuote")}
              </Link>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={buildTrackedHref("/evidence-of-insurance", { entry: "contact-page-proof" }) as any}
                className="glass-btn inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-gray-900"
              >
                {t("requestProof")}
              </Link>
              <a
                href={agency.phoneHref}
                className="glass-btn inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-gray-900"
              >
                {t("callCta", { phone: agency.phone })}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400">
              {t("connectWithUs")}
            </p>
            <div className="mt-4 grid gap-3">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <PageFaqSection
          title={t("faqs.heading")}
          description={t("faqs.description")}
          faqs={contactPageFaqs}
          ctas={[
            {
              href: buildTrackedHref("/quote", { entry: "contact-faq-quote-cta" }),
              label: t("faqs.ctaQuote"),
            },
            {
              href: buildTrackedHref("/evidence-of-insurance", { entry: "contact-faq-proof-cta" }),
              label: t("faqs.ctaProof"),
            },
          ]}
        />
      </section>
    </div>
  );
}
