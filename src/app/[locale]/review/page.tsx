import Link from "next/link";
import type { Metadata } from "next";
import { Star } from "lucide-react";

import { createPageMetadata } from "@/lib/metadata";
import { agency } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  title: "Share Your Experience",
  description:
    "Your review on Google helps other Southern California families find a real local agency. It takes under a minute.",
  path: "/review",
});

const googleReviewHref = agency.googleReviewUrl;

export default function ReviewPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-28 pt-16 sm:px-8 sm:pt-24">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 ring-1 ring-amber-200">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
          Thank you
        </span>
        <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] text-navy sm:text-5xl">
          Would you share one kind word with your neighbors?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-gray-600 sm:text-lg">
          A quick Google review is how other Corona, Norco, Eastvale, and
          Riverside families find us. It takes about 30 seconds — and it means
          the world to the team.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-100/80 via-amber-50/40 to-orange-100/40 blur-2xl"
        />
        <a
          href={googleReviewHref}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative block overflow-hidden rounded-[2rem] border border-amber-200/70 bg-gradient-to-br from-white via-amber-50/50 to-white p-8 text-center shadow-[0_40px_100px_-40px_rgba(245,158,11,0.35)] transition duration-500 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_50px_120px_-40px_rgba(245,158,11,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 sm:p-12"
        >
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-8 w-8 fill-[#f59e0b] text-[#f59e0b] drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)] sm:h-10 sm:w-10"
                aria-hidden="true"
              />
            ))}
          </div>
          <h2 className="mt-6 text-2xl font-bold text-navy sm:text-3xl">
            Leave a Google review
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-600 sm:text-base">
            Takes about 30 seconds. Opens in a new tab — we&rsquo;ll be right
            here when you&rsquo;re done.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-red px-8 py-4 text-base font-bold text-white shadow-[0_20px_40px_-20px_rgba(218,41,28,0.6)] transition group-hover:gap-4 group-hover:shadow-[0_24px_48px_-16px_rgba(218,41,28,0.7)] sm:text-lg">
            Write a review on Google
            <span aria-hidden="true" className="text-xl">→</span>
          </div>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
            Thank you — it makes our week
          </p>
        </a>
      </div>

      <div className="mt-14 text-center">
        <p className="text-xs text-gray-400">
          Something didn&rsquo;t land the way it should have?{" "}
          <Link
            href="/contact?intent=feedback"
            className="text-gray-500 underline underline-offset-4 transition hover:text-gray-700"
          >
            Tell us privately
          </Link>{" "}
          — a note goes straight to Erin.
        </p>
        <p className="mt-4 text-[11px] text-gray-400">
          Or call the office directly at{" "}
          <a href={agency.phoneHref} className="font-semibold text-gray-500 hover:text-gray-700">
            {agency.phone}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
