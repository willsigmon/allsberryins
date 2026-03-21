"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { carrierAccessStat, carrierPartners } from "@/lib/site-data";

const row1 = carrierPartners.slice(0, 10);
const row2 = carrierPartners.slice(10);

function MarqueeRow({
  carriers,
  reverse = false,
}: {
  carriers: typeof carrierPartners;
  reverse?: boolean;
}) {
  const doubled = [...carriers, ...carriers];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex shrink-0 items-center gap-5"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${reverse ? "55s" : "50s"} linear infinite`,
        }}
      >
        {doubled.map((carrier, index) => (
          <div
            key={`${carrier.name}-${index}`}
            className="card-elevated flex h-[5.25rem] shrink-0 items-center gap-3 rounded-2xl border border-gray-100 px-5 py-3.5 transition hover:border-blue/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-[rgba(255,255,255,0.96)] p-2 shadow-sm">
              <Image
                src={carrier.logoSrc}
                alt={`${carrier.name} logo`}
                width={44}
                height={44}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="whitespace-nowrap text-base font-semibold text-gray-900">
              {carrier.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CarrierLogosSection() {
  return (
    <section className="grain-overlay overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Carrier access"
          title="A Sample of the Markets We Can Shop"
          description={`These logos show a representative sample of the carrier access available through the agency. The full market access goes well beyond the ${carrierAccessStat}+ options shown in the trust bar.`}
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
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />
        <MarqueeRow carriers={row1} />
        <MarqueeRow carriers={row2} reverse />
      </motion.div>
    </section>
  );
}
