import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { agency } from "@/lib/site-data";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Allsberry Insurance Agency handles your personal information.",
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">&larr; Back</Link>
      <h1 className="mt-4 text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 30, 2026</p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Scope</h2>
          <p>
            This Privacy Policy applies to all individuals and entities who interact with the Website
            and the Service, regardless of their location. It encompasses the collection, use, and
            disclosure of personal information by {agency.name} and its affiliates and subsidiaries.
            This policy covers information collected through our website, mobile applications,
            SMS/MMS communications, and any other electronic means of interaction. It is important
            that you read this policy carefully to understand our practices related to your
            information.
          </p>
          <p className="mt-3">
            Through your interaction with {agency.name}, you may engage in activities where additional
            or separate privacy notices are presented. Those notices will apply in conjunction with
            this policy to the extent of any inconsistencies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Information We Collect</h2>
          <p>When you request a quote, contact us, or use our coverage evaluation tools, we may collect:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Name, email, phone number, and mailing address</li>
            <li>Insurance coverage details and policy preferences</li>
            <li>Vehicle, property, or business information for quoting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">How We Use It</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Provide insurance quotes and coverage recommendations</li>
            <li>Service your existing policies</li>
            <li>Send renewal reminders and coverage updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">SMS Privacy, Consent, and Mobile Information</h2>
          <p>
            {agency.name} may collect your mobile phone number, SMS opt-in status, consent records,
            messaging preferences, and related information when you choose to receive text messages
            from us. This information may be collected when you submit an online form, request an
            insurance quote, communicate with us, or otherwise provide consent to receive SMS/text
            messages.
          </p>
          <p className="mt-3">
            If you have opted in to receive SMS/text messages from {agency.name}, you may receive
            messages related to insurance quotes, policy review reminders, renewal follow-ups,
            appointment reminders, customer care, billing or account-related inquiries,
            documentation requests, and marketing messages related to insurance products and
            services, including home and auto insurance bundle quote opportunities.
          </p>
          <p className="mt-3">
            Message frequency may vary. Message and data rates may apply. You may opt out of SMS
            messages at any time by replying STOP to any text message you receive from us. For
            assistance, reply HELP or contact us at{" "}
            <a href={agency.phoneHref} className="text-primary underline">{agency.phone}</a> or{" "}
            <a href={agency.emailHref} className="text-primary underline">{agency.email}</a>.
            Consent to receive SMS/text messages is not a condition of purchase.
          </p>
          <p className="mt-3">
            When collecting personal information, particularly for activities that involve telephony
            services such as SMS/MMS messaging, we adhere to stringent consent requirements.
            Explicit, informed, and unambiguous consent is obtained from all individuals prior to
            the collection of their personal data. This includes clear and conspicuous opt-in
            mechanisms for marketing communications and any telecommunication activities, ensuring
            compliance with regulatory standards set forth by bodies such as the CTIA, TCPA, and
            GDPR.
          </p>
          <p className="mt-3">
            In certain circumstances, we may require your express written consent, particularly for
            automated messaging campaigns and any data-sharing activities that fall under strict
            regulatory frameworks. Your consent may be withdrawn at any time, subject to legal or
            contractual restrictions and reasonable notice. To withdraw your consent, please contact
            us using the information provided in the &ldquo;Contact Information&rdquo; section of
            this policy.
          </p>
          <p className="mt-3">
            Phone numbers provided for SMS opt-in will remain confidential and will not be shared
            with any third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Data Sharing</h2>
          <p>We share information with insurance carriers solely to obtain quotes and bind coverage on your behalf. We do not sell your personal information.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your data by contacting us at <a href={agency.emailHref} className="text-primary underline">{agency.email}</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Policy Updates</h2>
          <p>
            We reserve the right to update this Privacy Policy periodically to reflect changes in
            our practices, legal requirements, and regulatory obligations. Your continued use of the
            Website and the Service constitutes your acceptance of any modifications to this policy.
            Notice of any significant updates will be provided through a prominent notice on our
            website or through direct communication channels.
          </p>
          <p className="mt-3">
            By using {agency.name}&apos;s services, you acknowledge that you have read, understood,
            and agree to be bound by this Privacy Policy and any other agreements that govern your
            use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
          <p>
            {agency.name}
            <br />
            Powered by High Street Insurance Partners
            <br />
            {agency.fullAddress}
            <br />
            <a href={agency.phoneHref} className="text-primary underline">{agency.phone}</a>
            {" · "}
            <a href={agency.emailHref} className="text-primary underline">{agency.email}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
