import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/sections/cta-banner";
import { StructuredData } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { carrierPartners } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

const path = "/carriers";

export const metadata = createPageMetadata({
  title: "Insurance Carrier Partners",
  description:
    "Compare insurance carrier partners available through Allsberry Insurance Agency — home, auto, business, and life coverage from 20+ carriers, serving Corona and all of Southern California.",
  path,
  keywords: [
    "Allsberry insurance carriers",
    "independent insurance agent Corona",
    "carrier partners California",
  ],
});

export default function CarriersIndexPage() {
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Carriers", path },
  ]);

  return (
    <div className="bg-white pt-28 pb-24">
      <StructuredData data={breadcrumb} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">
            Carrier partners
          </p>
          <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">
            Independent access to 20+ insurance carriers
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            We shop the market so you don&rsquo;t have to. Every carrier below is a direct
            appointment — we place coverage where it fits your situation, not where a quota
            says it should go. Tap any carrier to see how we use them for our clients.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {carrierPartners.map((carrier) => {
            const slug = slugify(carrier.name);
            return (
              <Link
                key={carrier.name}
                href={`/carriers/${slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-[0_18px_46px_-36px_rgba(0,32,92,0.25)] transition hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-[0_26px_56px_-34px_rgba(0,32,92,0.4)]"
              >
                <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-50 p-2">
                  <Image
                    src={carrier.logoSrc}
                    alt={`${carrier.name} logo`}
                    width={72}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-base font-semibold text-navy group-hover:text-blue">
                    {carrier.name}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    View carrier page →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}
