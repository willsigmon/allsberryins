import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalPageShell, LegalSection } from "@/components/pages/legal-page-shell";
import { agency } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/metadata";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: "Privacy Policy",
    description: "How Allsberry Insurance Agency handles your personal information.",
    path: "/privacy",
    locale,
    localizeAlternates: false,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalPageShell title="Privacy Policy" updatedOn="Last updated: August 31, 2026">
      <LegalSection title="Scope">
        <p>
          This Privacy Policy applies to all individuals and entities who interact with the Website
          and the Service, regardless of their location. It encompasses the collection, use, and
          disclosure of personal information by {agency.name} and its affiliates and subsidiaries.
          This policy covers information collected through our website, mobile applications,
          SMS/MMS communications, and any other electronic means of interaction. It is important
          that you read this policy carefully to understand our practices related to your
          information.
        </p>
        <p>
          Through your interaction with {agency.name}, you may engage in activities where additional
          or separate privacy notices are presented. Those notices will apply in conjunction with
          this policy to the extent of any inconsistencies.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>When you request a quote, contact us, or use our coverage evaluation tools, we may collect:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name, email, phone number, and mailing address</li>
          <li>Insurance coverage details and policy preferences</li>
          <li>Vehicle, property, or business information for quoting</li>
          <li>
            Technical and usage information such as IP address, browser and device details,
            referring URL, pages viewed, and campaign interactions
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use It">
        <ul className="list-disc space-y-1 pl-5">
          <li>Provide insurance quotes and coverage recommendations</li>
          <li>Service your existing policies</li>
          <li>Send renewal reminders and coverage updates</li>
        </ul>
      </LegalSection>

      <LegalSection title="Website Analytics and Advertising">
        <p>
          We use limited website measurement tools to understand whether our advertising is
          effective and how visitors reach and use our site. Google Ads may measure page visits and
          advertising performance. On the paid campaign page, the Meta Pixel may send a PageView
          event to Meta for advertising measurement and audience services. These providers may
          receive technical information such as your IP address, browser or device details,
          referring URL, and page activity under their own privacy terms. This website does not
          replace the displayed phone number with a tracking number on the main marketing pages.
        </p>
        <p>
          We do not sell personal information for money. Some advertising-related disclosures may
          be considered a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; for cross-context behavioral
          advertising under California law. When your browser sends an enabled Global Privacy
          Control signal or a Do Not Track signal, this site does not load Google Ads or Meta Pixel
          for that browser visit. You can also manage advertising preferences through{" "}
          <a
            href="https://myadcenter.google.com/"
            className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy"
            rel="noreferrer"
            target="_blank"
          >
            Google My Ad Center
          </a>{" "}
          and the{" "}
          <a
            href="https://www.facebook.com/adpreferences/ad_settings"
            className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy"
            rel="noreferrer"
            target="_blank"
          >
            Meta Ad Preferences
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="SMS Privacy, Consent, and Mobile Information">
        <p>
          {agency.name} may collect your mobile phone number, SMS opt-in status, consent records,
          messaging preferences, and related information when you choose to receive text messages
          from us. This information may be collected when you submit an online form.
        </p>
        <p>
          If you have opted in to receive SMS/text messages from {agency.name}, you may receive
          messages related to insurance quotes, policy review reminders, renewal follow-ups,
          appointment reminders, customer care, billing or account-related inquiries,
          documentation requests, and marketing messages related to insurance products and
          services, including home and auto insurance bundle quote opportunities.
        </p>
        <p>
          Message frequency may vary. Message and data rates may apply. You may opt out of SMS
          messages at any time by replying STOP to any text message you receive from us. For
          assistance, reply HELP or contact us at{" "}
          <a href={agency.phoneHref} className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy">
            {agency.phone}
          </a>{" "}
          or{" "}
          <a href={agency.emailHref} className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy">
            {agency.email}
          </a>
          . Consent to receive SMS/text messages is not a condition of purchase.
        </p>
        <p>
          SMS opt-in or phone numbers for the purpose of SMS are not shared with any third parties
          or affiliate companies for marketing purposes.
        </p>
        <p>
          <strong className="text-gray-900">Opt-In Method</strong>
          <br />
          You may opt in to receive SMS messages from {agency.name} by submitting an online form.
        </p>
        <p>
          When collecting personal information, particularly for activities that involve telephony
          services such as SMS/MMS messaging, we adhere to stringent consent requirements.
          Explicit, informed, and unambiguous consent is obtained from all individuals prior to
          the collection of their personal data. This includes clear and conspicuous opt-in
          mechanisms for marketing communications and any telecommunication activities, ensuring
          compliance with regulatory standards set forth by bodies such as the CTIA, TCPA, and
          GDPR.
        </p>
        <p>
          In certain circumstances, we may require your express written consent, particularly for
          automated messaging campaigns and any data-sharing activities that fall under strict
          regulatory frameworks. Your consent may be withdrawn at any time, subject to legal or
          contractual restrictions and reasonable notice. To withdraw your consent, please contact
          us using the information provided in the &ldquo;Contact Information&rdquo; section of
          this policy.
        </p>
        <p>
          Phone numbers provided for SMS opt-in remain confidential and are not shared with third
          parties or affiliate companies for marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="Data Sharing">
        <p>
          We share quote and policy information with insurance carriers as needed to obtain quotes,
          bind coverage, and service policies on your behalf. We also use service providers that
          support website hosting, communications, analytics, and advertising as described above.
          We do not sell personal information for money.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          Depending on where you live, you may have rights to request access to, correction of, or
          deletion of your personal information, and to opt out of its sale or sharing. Submit a
          request by contacting us at{" "}
          <a href={agency.emailHref} className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy">
            {agency.email}
          </a>
          . We will verify and respond to requests as required by applicable law and will not
          discriminate against you for exercising a privacy right.
        </p>
      </LegalSection>

      <LegalSection title="Policy Updates">
        <p>
          We reserve the right to update this Privacy Policy periodically to reflect changes in
          our practices, legal requirements, and regulatory obligations. Your continued use of the
          Website and the Service constitutes your acceptance of any modifications to this policy.
          Notice of any significant updates will be provided through a prominent notice on our
          website or through direct communication channels.
        </p>
        <p>
          By using {agency.name}&apos;s services, you acknowledge that you have read, understood,
          and agree to be bound by this Privacy Policy and any other agreements that govern your
          use of our services.
        </p>
      </LegalSection>

      <LegalSection title="Contact Information">
        <p>
          {agency.name}
          <br />
          {agency.fullAddress}
          <br />
          <a href={agency.phoneHref} className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy">
            {agency.phone}
          </a>
          {" · "}
          <a href={agency.emailHref} className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:text-navy">
            {agency.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
