"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/ui/section-heading";
import { tap } from "@/lib/haptics";
import { reviewQuoteKeys, reviewQuoteSources } from "@/lib/review-sources";
import { agency } from "@/lib/site-data";

export function ReviewsSection() {
  const t = useTranslations("home.reviewsSection");
  const tReviews = useTranslations("reviews");
  const reviews = reviewQuoteKeys.map((key) => ({
    name: tReviews(`${key}.name`),
    body: tReviews(`${key}.body`),
    source: reviewQuoteSources[key],
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
              <p className="mt-3 font-display text-2xl font-extrabold text-gray-900">
                {t("googleReviewsLabel")}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t("googleReviewsBody")}
              </p>
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

        {reviews.length ? (
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
                  <span className="absolute -top-1 left-5 select-none font-serif text-6xl leading-none text-blue/8" aria-hidden="true">&ldquo;</span>
                  <p className="mt-6 flex-1 text-base leading-7 text-gray-600">&ldquo;{review.body}&rdquo;</p>
                  <div className="mt-6 h-px w-full bg-gray-100" />
                  <p className="mt-4 font-display text-lg font-bold text-gray-900">{review.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-600">
                    {t("quotedFrom", { source: review.source })}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-gray-100 bg-gray-50 px-6 py-10 text-center">
            <p className="font-display text-2xl font-bold text-gray-900">{t("emptyHeading")}</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">{t("emptyBody")}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href={agency.googleReviewUrl}
            target="_blank"
            rel="noreferrer noopener"
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
