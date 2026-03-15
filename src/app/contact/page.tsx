import Link from "next/link";
import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { agency } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Allsberry Insurance Agency in Corona, CA for home, auto, life, and business insurance guidance. Call, email, or start your quote online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-white pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-18 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Reach the Allsberry team"
          description="Call us, email us, or jump straight into a quote. However you reach out, the goal is a fast and helpful next step."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5">
            {[
              {
                title: "Call us",
                body: agency.phone,
                href: agency.phoneHref,
                icon: Phone,
              },
              {
                title: "Email",
                body: agency.email,
                href: agency.emailHref,
                icon: Mail,
              },
              {
                title: "Visit the office",
                body: `${agency.addressLine1}, ${agency.cityStateZip}`,
                href: "https://maps.google.com/?q=355+N+Sheridan+St+Ste+100+Corona+CA+92878",
                icon: MapPin,
              },
              {
                title: "Hours",
                body: agency.hours,
                href: "/quote",
                icon: Clock3,
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-[2rem] border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:border-blue/45 hover:bg-white"
              >
                <item.icon className="h-6 w-6 text-blue" />
                <h2 className="mt-5 font-display text-2xl font-bold text-gray-900">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-gray-600">{item.body}</p>
              </Link>
            ))}
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#eef6fd_100%)] p-8 shadow-[0_28px_70px_-52px_rgba(0,32,92,0.55)]">
            <h2 className="font-display text-3xl font-extrabold text-gray-900">Need coverage help fast?</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
              The quote flow is the quickest way to tell us what you need, especially if you want a product pre-selected and ready for follow-up.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-white bg-white p-6 shadow-sm">
              <ul className="grid gap-4 text-sm leading-7 text-gray-600">
                <li>• Home, auto, life, renters, condo, and umbrella insurance</li>
                <li>• Business insurance, workers comp, commercial auto, and liability coverage</li>
                <li>• Corona and Inland Empire clients looking for cleaner guidance and faster follow-up</li>
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full bg-red px-7 py-4 text-base font-bold text-white transition hover:bg-red-hover"
              >
                Start Your Quote
              </Link>
              <Link
                href={agency.phoneHref}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-7 py-4 text-base font-bold text-navy transition hover:border-blue hover:text-blue"
              >
                Call {agency.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
