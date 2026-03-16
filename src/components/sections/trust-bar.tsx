"use client";

import { motion } from "framer-motion";
import { CalendarRange, MapPin, ShieldCheck, Users } from "lucide-react";

import { trustHighlights } from "@/lib/site-data";

const icons = [CalendarRange, Users, MapPin, ShieldCheck] as const;

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-navy/8 bg-[linear-gradient(90deg,#00205c_0%,#0041a0_50%,#00205c_100%)] py-6 sm:py-8">
      <div className="absolute inset-0 mesh-bg opacity-35" />
      <div className="relative mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-4 lg:px-8">
        {trustHighlights.map((highlight, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-[1.65rem] border border-white/10 bg-white/8 p-5 text-white backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">
                    {highlight.label}
                  </p>
                  <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white">
                    {highlight.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{highlight.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
