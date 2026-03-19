"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { carrierAccessStat, carrierPartners } from "@/lib/site-data";

function carrierBadge(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const row1 = carrierPartners.slice(0, 10);
const row2 = carrierPartners.slice(10);

function MarqueeRow({ carriers, reverse = false }: { carriers: readonly { readonly name: string; readonly domain: string }[]; reverse?: boolean }) {
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
            className="flex shrink-0 items-center gap-3 rounded-2xl border border-gray-100 bg-[linear-gradient(135deg,#f8fafb_0%,#ffffff_100%)] px-5 py-3.5 shadow-[0_4px_20px_-12px_rgba(0,32,92,0.15)] transition hover:border-blue/30 hover:shadow-[0_8px_30px_-10px_rgba(0,102,179,0.25)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-light text-xs font-bold tracking-[0.18em] text-blue">
              {carrierBadge(carrier.name)}
            </div>
            <span className="text-base font-semibold text-gray-700 whitespace-nowrap">
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
    <section className="bg-white py-20 sm:py-24 overflow-hidden">
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
        <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
        <MarqueeRow carriers={row1} />
        <MarqueeRow carriers={row2} reverse />
      </motion.div>
    </section>
  );
}
