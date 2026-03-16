"use client";

import { motion } from "framer-motion";

import { getIcon } from "@/components/ui/icon-registry";
import { SectionHeading } from "@/components/ui/section-heading";
import { valueProps } from "@/lib/site-data";

export function ValuePropsSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(0,102,179,0.12),transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why clients choose us"
          title="Insurance guidance that feels clear, personal, and low-stress"
          description="We make insurance simple by listening first, explaining clearly, and following up until you feel confident in your coverage."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {valueProps.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_22px_45px_-38px_rgba(0,32,92,0.55)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#00205c_0%,#0066b3_70%,#da291c_100%)]" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-light text-blue">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
