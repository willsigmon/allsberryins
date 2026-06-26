import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { agency } from "@/lib/site-data";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Allsberry Insurance Agency services.",
};

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Back
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-foreground">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 26, 2026</p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Use of This Website</h2>
          <p>
            By using {agency.name}&apos;s website and submitting quote or contact requests, you agree
            to these terms. Information you provide is used to respond to your insurance inquiries
            and service requests.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">SMS and Text Messaging</h2>
          <p>
            If you provide a phone number and opt in on our forms, you may receive SMS/text messages
            from {agency.name} regarding insurance quotes, policy review reminders, renewal
            follow-ups, appointment reminders, customer care, and—if you select the marketing
            option—marketing messages related to insurance products and services. Message frequency
            may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP
            for help. Consent is not a condition of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">No Guarantee of Coverage</h2>
          <p>
            Quotes and information on this site are for general guidance. Final coverage,
            premiums, and policy terms are determined by the issuing carrier and subject to
            underwriting approval.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>
            {agency.name}
            <br />
            {agency.fullAddress}
            <br />
            <a href={agency.phoneHref} className="text-primary underline">
              {agency.phone}
            </a>
            {" · "}
            <a href={agency.emailHref} className="text-primary underline">
              {agency.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
