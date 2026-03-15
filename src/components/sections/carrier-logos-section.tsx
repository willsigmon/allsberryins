"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/ui/section-heading";
import { carrierPartners } from "@/lib/site-data";

export function CarrierLogosSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Carrier access"
          title="Insurance Partners We Work With"
          description="We shop across multiple carriers so the recommendation feels tailored to your needs, not boxed into one option."
          align="center"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {carrierPartners.map((carrier, index) => (
            <motion.div
              key={carrier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.03 }}
              className="rounded-full border border-gray-100 bg-gray-50 px-5 py-4 text-center text-sm font-semibold text-gray-600 transition hover:border-blue/35 hover:bg-blue-light hover:text-navy"
            >
              {carrier}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
