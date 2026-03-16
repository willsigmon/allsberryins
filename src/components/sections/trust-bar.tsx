"use client";

import { motion } from "framer-motion";
import { CalendarRange, MapPin, ShieldCheck, Users } from "lucide-react";

import { trustHighlights } from "@/lib/site-data";

const icons = [CalendarRange, Users, MapPin, ShieldCheck] as const;

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-blue/10 bg-white py-4 sm:py-5">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6 xl:px-8">
        {trustHighlights.map((highlight, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-gray-100 bg-white px-4 py-3 text-center"
            >
              <Icon className="mx-auto h-4 w-4 text-blue" />
              <p className="mt-2 text-xl font-bold text-gray-900">{highlight.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {highlight.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
