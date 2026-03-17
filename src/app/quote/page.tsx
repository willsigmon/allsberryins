import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Quote",
  description:
    "Request a quote from Allsberry Insurance Agency for home, auto, life, business, renters, condo, umbrella, and workers compensation coverage across Southern California.",
  path: "/quote",
});

type QuotePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams;
  const product = typeof params.product === "string" ? params.product : undefined;
  const zip = typeof params.zip === "string" ? params.zip : undefined;

  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#eef6fd_100%)] pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Get a quote"
              title="Start simple. We’ll handle the details with you."
              description="Tell us what you need and a licensed agent will follow up with options tailored to your situation."
            />
            <div className="mt-8 rounded-[2rem] border border-blue/10 bg-white p-6 shadow-[0_20px_60px_-46px_rgba(0,32,92,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue">What happens next</p>
              <ul className="mt-5 grid gap-4 text-sm leading-7 text-gray-600">
                <li>• We review the products you selected.</li>
                <li>• An agent follows up within 24 hours.</li>
                <li>• We help compare coverage options and answer questions clearly.</li>
              </ul>
            </div>
          </div>
          <QuoteForm initialProduct={product} initialZip={zip} />
        </div>
      </section>
    </div>
  );
}
