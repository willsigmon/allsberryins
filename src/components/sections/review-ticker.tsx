"use client";

import { Star } from "lucide-react";

import { reviews } from "@/lib/site-data";

const tickerReviews = [...reviews, ...reviews];

export function ReviewTicker() {
  return (
    <section className="glass-tinted overflow-hidden border-y border-blue/8 py-6">
      <div className="relative">
        <div className="animate-ticker flex gap-6">
          {tickerReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="glass-btn flex shrink-0 items-center gap-4 rounded-2xl px-6 py-4 shadow-sm"
            >
              <div className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="max-w-lg text-sm leading-6 text-gray-600">
                &ldquo;{review.body}&rdquo;
              </p>
              <span className="whitespace-nowrap text-xs font-semibold text-gray-900">
                — {review.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
