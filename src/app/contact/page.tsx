import Link from "next/link";
import type { Metadata } from "next";
import { Clock3, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { StructuredData } from "@/components/seo/structured-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { agency } from "@/lib/site-data";
import { createBreadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Allsberry Insurance Agency in Corona, CA for home, auto, life, and business insurance guidance. Call, email, or start your quote online.",
  path: "/contact",
});

const contactItems = [
  { title: "Call us", body: agency.phone, href: agency.phoneHref, icon: Phone },
  { title: "Email", body: agency.email, href: agency.emailHref, icon: Mail },
  {
    title: "Visit",
    body: `${agency.addressLine1}, ${agency.cityStateZip}`,
    href: "https://maps.google.com/?q=355+N+Sheridan+St+Ste+100+Corona+CA+92878",
    icon: MapPin,
  },
  { title: "Hours", body: agency.hours, href: "/quote", icon: Clock3 },
] as const;

const socialItems = [
  { label: "Facebook", href: agency.socials.facebook, icon: Facebook },
  { label: "Instagram", href: agency.socials.instagram, icon: Instagram },
  { label: "LinkedIn", href: agency.socials.linkedin, icon: Linkedin },
] as const;

export default function ContactPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Allsberry Insurance Agency",
    url: "https://allsberryagency.com/contact",
    description:
      "Call, email, or visit Allsberry Insurance Agency in Corona, CA for quote help, policy reviews, and proof-of-insurance requests.",
    mainEntity: {
      "@id": organizationSchema["@id"],
    },
  };

  return (
    <div className="bg-white pt-32">
      <StructuredData data={[breadcrumbSchema, contactPageSchema]} />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Reach the Allsberry team"
          description="Call us, email us, or jump straight into a quote."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-1 hover:border-blue/45 hover:bg-white hover:shadow-lg"
            >
              <item.icon className="h-5 w-5 text-blue" />
              <h2 className="mt-3 font-display text-lg font-bold text-gray-900">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{item.body}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div
            className="rounded-[2rem] border border-gray-100 p-8 shadow-[0_28px_70px_-52px_rgba(0,32,92,0.55)]"
            style={{ backgroundImage: "var(--panel-gradient)" }}
          >
            <h2 className="font-display text-3xl font-extrabold text-gray-900">
              Need coverage help fast?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
              The quote flow is the quickest way to tell us what you need. Pick a product and a
              licensed agent will follow up within one business day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="cta-glow inline-flex items-center justify-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition hover:bg-red-hover"
              >
                Start Your Quote
              </Link>
              <Link
                href="/evidence-of-insurance"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-navy transition hover:border-blue hover:text-blue"
              >
                Request Proof
              </Link>
              <Link
                href={agency.phoneHref}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-navy transition hover:border-blue hover:text-blue"
              >
                Call {agency.phone}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
              Connect with us
            </p>
            <div className="mt-4 grid gap-3">
              {socialItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue hover:text-blue"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
