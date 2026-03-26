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
    <section className="grain-overlay section-muted-bg relative overflow-hidden py-20 sm:py-24">
      <div className="section-glow absolute inset-x-0 top-0 h-56" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why clients choose us"
          title="Insurance guidance that feels clear, personal, and low-stress"
          align="center"
        />
        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {valueProps.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <Link
                  href={buildTrackedHref("/quote", { entry: `value-prop-${item.title.toLowerCase().replace(/\s+/g, "-")}` })}
                  onClick={() => { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10); }}
                  className="card-accent-strip parallax-card group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-100 p-6 transition hover:border-blue/30"
                >
                  <div className="icon-glow flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-light text-blue">
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
