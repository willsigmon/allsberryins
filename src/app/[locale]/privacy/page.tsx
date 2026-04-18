import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

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
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 29, 2026</p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
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
          <h2 className="text-lg font-semibold text-foreground">Data Sharing</h2>
          <p>We share information with insurance carriers solely to obtain quotes and bind coverage on your behalf. We do not sell your personal information.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your data by contacting us at <a href="mailto:carter.helms@highstreetins.com" className="text-primary underline">carter.helms@highstreetins.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>Allsberry Insurance Agency<br />Powered by High Street Insurance Partners<br /><a href="mailto:carter.helms@highstreetins.com" className="text-primary underline">carter.helms@highstreetins.com</a></p>
        </section>
      </div>
    </main>
  );
}
