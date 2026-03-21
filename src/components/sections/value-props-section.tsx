"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getIcon } from "@/components/ui/icon-registry";
import { SectionHeading } from "@/components/ui/section-heading";
import { valueProps } from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";

export function ValuePropsSection() {
  return (
    <section className="section-muted-bg relative overflow-hidden py-20 sm:py-24">
      <div className="section-glow absolute inset-x-0 top-0 h-56" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why clients choose us"
          title="Insurance guidance that feels clear, personal, and low-stress"
          description="We make insurance simple by listening first, explaining clearly, and following up until you feel confident in your coverage."
          align="center"
        />
        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {valueProps.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
              >
                <Link
                  href={buildTrackedHref("/quote", { entry: `value-prop-${item.title.toLowerCase().replace(/\s+/g, "-")}` })}
                  onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); }}
                  className="parallax-card surface-card group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-white p-6 shadow-[0_22px_45px_-38px_rgba(0,32,92,0.55)] ring-1 ring-gray-100 transition hover:border-blue/30 hover:shadow-[0_28px_55px_-34px_rgba(0,102,179,0.3)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#da291c_0%,#ffffff_50%,#0066b3_100%)]" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-light text-blue">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-blue transition group-hover:gap-3">
                    Get a Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
