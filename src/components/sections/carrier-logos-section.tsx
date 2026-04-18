"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { carrierAccessStat, carrierPartners } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

const row1 = carrierPartners.slice(0, 10);
const row2 = carrierPartners.slice(10);

function MarqueeRow({
  carriers,
  reverse = false,
}: {
  carriers: typeof carrierPartners;
  reverse?: boolean;
}) {
  const t = useTranslations("home.carrierLogos");
  const doubled = [...carriers, ...carriers];
  return (
    <div className="flex overflow-hidden py-3">
      <div
        className="flex shrink-0 items-center gap-5"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${reverse ? "55s" : "50s"} linear infinite`,
        }}
      >
        {doubled.map((carrier, index) => (
          <Link
            key={`${carrier.name}-${index}`}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={`/carriers/${slugify(carrier.name)}` as any}
            aria-label={t("carrierLearnMore", { carrier: carrier.name })}
            className="card-elevated flex h-[5.25rem] shrink-0 items-center gap-3 rounded-2xl border border-gray-100 px-5 py-3.5 transition-all hover:border-blue/30 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-[rgba(255,255,255,0.96)] p-2 shadow-sm">
              <Image
                src={carrier.logoSrc}
                alt={t("carrierLogoAlt", { carrier: carrier.name })}
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="whitespace-nowrap text-base font-semibold text-gray-900">
              {carrier.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CarrierLogosSection() {
  const t = useTranslations("home.carrierLogos");

  return (
    <section className="grain-overlay overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description", { count: carrierAccessStat })}
          align="center"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mt-12 grid gap-4"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <MarqueeRow carriers={row1} />
        <MarqueeRow carriers={row2} reverse />
      </motion.div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/carriers"
          className="inline-flex items-center justify-center rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-navy/40"
        >
          {t("seeAllCta")} →
        </Link>
      </div>
    </section>
  );
}
