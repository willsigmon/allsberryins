"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { tap } from "@/lib/haptics";

const reviewKeys = ["classicCars", "homeowner", "restaurant", "auto"] as const;

export function ReviewsSection() {
  const t = useTranslations("home.reviewsSection");
  const tReviews = useTranslations("reviews");
  const reviews = reviewKeys.map((key) => ({
    name: tReviews(`${key}.name`),
    body: tReviews(`${key}.body`),
  }));

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
        />
        <div className="card-elevated surface-card-strong parallax-card mt-8 rounded-[2rem] border border-gray-100 p-6">
          <div className="grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
            <div className="rounded-[1.5rem] bg-blue-light p-5 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">{t("clientConfidence")}</p>
              <div className="mt-3 flex items-center justify-center gap-3 md:justify-start">
                <span className="font-display text-4xl font-extrabold text-gray-900">5★</span>
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              <span className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                {t("trustedLocalGuidance")}
              </span>
              <span className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                {t("fastFollowUp")}
              </span>
              <span className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                {t("claimsGuidance")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-x-auto pb-2">
          <div className="grid min-w-max gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:min-w-0">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                className="card-accent-strip card-elevated parallax-card relative flex h-full w-[18.5rem] snap-start flex-col rounded-[2rem] border border-gray-100 p-6 sm:w-auto"
              >
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="absolute -top-1 left-5 select-none font-serif text-6xl leading-none text-blue/8" aria-hidden="true">&ldquo;</span>
                <p className="mt-6 flex-1 text-base leading-7 text-gray-600">&ldquo;{review.body}&rdquo;</p>
                <div className="mt-6 h-px w-full bg-gray-100" />
                <p className="mt-4 font-display text-lg font-bold text-gray-900">{review.name}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-400">{t("allsberryClient")}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Allsberry+Insurance+Agency+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-blue transition hover:text-gray-900"
            onClick={() => { tap(); }}
          >
            {t("seeMoreCta")} →
          </a>
        </div>
      </div>
    </section>
  );
}
