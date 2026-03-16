"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { reviews } from "@/lib/site-data";

export function ReviewsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client confidence"
          title="What Our Clients Say"
          description="Common feedback themes include clear guidance, fast follow-up, and support that stays steady from quote through claims."
          align="center"
        />

        <div className="mt-8 rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)] p-6 shadow-[0_24px_50px_-44px_rgba(0,32,92,0.45)]">
          <div className="grid gap-5 md:grid-cols-[0.82fr_1.18fr] md:items-center">
            <div className="rounded-[1.5rem] bg-blue-light p-5 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">Common feedback themes</p>
              <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
                <span className="font-display text-4xl font-extrabold text-navy">5★</span>
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Clients want responsive service, simple explanations, and steady support when life gets busy.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              <span className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                Clear guidance
              </span>
              <span className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                Fast follow-up
              </span>
              <span className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                Claims support
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto pb-2">
          <div className="grid min-w-max gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:min-w-0">
            {reviews.map((review, index) => (
              <motion.article
                key={`${review.name}-${index}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                className="relative w-[19.5rem] snap-start rounded-[2rem] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafb_100%)] p-6 shadow-[0_24px_50px_-42px_rgba(0,32,92,0.55)] sm:w-auto"
              >
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="absolute right-5 top-5 h-10 w-10 text-blue/12" />
                <p className="mt-6 text-base leading-7 text-gray-600">“{review.body}”</p>
                <div className="mt-6 h-px w-full bg-gray-100" />
                <p className="mt-4 font-display text-lg font-bold text-gray-900">{review.name}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Client perspective</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 font-semibold text-blue transition hover:text-navy"
          >
            Start your quote →
          </Link>
        </div>
      </div>
    </section>
  );
}
