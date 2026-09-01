import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalPageShell, LegalSection } from "@/components/pages/legal-page-shell";
import { agency } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/metadata";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: "Terms & Conditions",
    description: "Terms and conditions for using Allsberry Insurance Agency services.",
    path: "/terms",
    locale,
    localizeAlternates: false,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPageShell title="Terms & Conditions" updatedOn="Last updated: June 26, 2026">
      <LegalSection title="Use of This Website">
        <p>
          By using {agency.name}&apos;s website and submitting quote or contact requests, you agree
          to these terms. Information you provide is used to respond to your insurance inquiries
          and service requests.
        </p>
      </LegalSection>

      <LegalSection title="SMS and Text Messaging">
        <p>
          If you provide a phone number and opt in on our forms, you may receive SMS/text messages
          from {agency.name} regarding insurance quotes, policy review reminders, renewal
          follow-ups, appointment reminders, customer care, and—if you select the marketing
          option—marketing messages related to insurance products and services. Message frequency
          may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP
          for help. Consent is not a condition of purchase.
        </p>
      </LegalSection>

      <LegalSection title="No Guarantee of Coverage">
        <p>
          Quotes and information on this site are for general guidance. Final coverage, premiums,
          and policy terms are determined by the issuing carrier and subject to underwriting
          approval.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          {agency.name}
          <br />
          {agency.fullAddress}
          <br />
          <a
            href={agency.phoneHref}
            className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy"
          >
            {agency.phone}
          </a>
          {" · "}
          <a
            href={agency.emailHref}
            className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy"
          >
            {agency.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
