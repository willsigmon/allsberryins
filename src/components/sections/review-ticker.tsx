"use client";

import { useTranslations } from "next-intl";

import { reviewQuoteKeys, reviewQuoteSources } from "@/lib/review-sources";

export function ReviewTicker() {
  const t = useTranslations("reviews");
  const tSection = useTranslations("home.reviewsSection");
  const reviews = reviewQuoteKeys.map((key) => ({
    name: t(`${key}.name`),
    body: t(`${key}.body`),
    source: reviewQuoteSources[key],
  }));
  const tickerReviews = [...reviews, ...reviews];

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="glass-tinted overflow-hidden border-y border-blue/8 py-6">
      <div className="relative">
        <div className="animate-ticker flex gap-6">
          {tickerReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              aria-hidden={index >= reviews.length ? "true" : undefined}
              className="glass-btn flex shrink-0 items-center gap-4 rounded-2xl px-6 py-4 shadow-sm"
            >
              <p className="max-w-lg text-sm leading-6 text-gray-600">
                &ldquo;{review.body}&rdquo;
              </p>
              <span className="whitespace-nowrap text-xs font-semibold text-gray-900">
                — {review.name}
              </span>
              <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {tSection("quotedFrom", { source: review.source })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
