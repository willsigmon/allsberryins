import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CtaBanner } from "@/components/sections/cta-banner";
import { StructuredData } from "@/components/seo/structured-data";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { carrierPartners } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

const path = "/carriers";

type CarriersPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CarriersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "carriersPage" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path,
    locale,
    keywords: [
      "Allsberry insurance carriers",
      "independent insurance agent Corona",
      "carrier partners California",
    ],
  });
}

export default async function CarriersIndexPage({ params }: CarriersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("carriersPage");
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
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            {t("subheading")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {carrierPartners.map((carrier) => {
            const slug = slugify(carrier.name);
            return (
              <Link
                key={carrier.name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={`/carriers/${slug}` as any}
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
                    {t("visitCarrier", { carrier: carrier.name })} →
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
