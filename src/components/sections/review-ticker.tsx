"use client";

import { Star } from "lucide-react";

import { reviews } from "@/lib/site-data";

const tickerReviews = [...reviews, ...reviews];

export function ReviewTicker() {
  return (
    <section className="glass overflow-hidden border-y border-gray-100 py-4">
      <div className="relative">
        <div className="animate-ticker flex gap-6">
          {tickerReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex shrink-0 items-center gap-4 rounded-full border border-gray-100 bg-gray-50 px-5 py-2.5 shadow-sm"
            >
              <div className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="max-w-sm truncate text-sm text-gray-600">
                &ldquo;{review.body.slice(0, 80)}...&rdquo;
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
