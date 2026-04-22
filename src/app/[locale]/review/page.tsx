import type { Metadata } from "next";
import { Star } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { agency } from "@/lib/site-data";

const googleReviewHref = agency.googleReviewUrl;

type ReviewPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "review" });
  return createPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/review",
    locale,
  });
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("review");

  return (
    <div style={{ backgroundImage: "var(--hero-bg)" }}>
      <main className="mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pt-32">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 ring-1 ring-amber-200">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] text-gray-900 sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-gray-600 sm:text-lg">
            {t("subheading")}
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%),radial-gradient(circle_at_bottom,rgba(0,102,179,0.12),transparent_58%)] blur-2xl"
          />
          <a
            href={googleReviewHref}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative block overflow-hidden rounded-[2rem] border border-amber-200/60 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-8 text-center shadow-[0_40px_100px_-40px_rgba(0,32,92,0.42)] transition duration-500 ease-out hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_50px_120px_-40px_rgba(0,32,92,0.52)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 sm:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,transparent_42%,rgba(255,255,255,0.18)_100%)]"
            />
            <div className="relative flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-8 w-8 fill-[#f59e0b] text-[#f59e0b] drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)] sm:h-10 sm:w-10"
                  aria-hidden="true"
                />
              ))}
            </div>
            <h2 className="relative mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("ctaPrimary")}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm text-gray-600 sm:text-base">
              {t("cardBody")}
            </p>
            <div className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-red px-8 py-4 text-base font-bold text-white shadow-[0_20px_40px_-20px_rgba(218,41,28,0.6)] transition group-hover:gap-4 group-hover:shadow-[0_24px_48px_-16px_rgba(218,41,28,0.7)] sm:text-lg">
              {t("buttonLabel")}
              <span aria-hidden="true" className="text-xl">→</span>
            </div>
            <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              {t("thankYou")}
            </p>
          </a>
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs text-gray-600">
            {t("privateFeedbackIntro")}{" "}
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={"/contact?intent=feedback" as any}
              className="font-medium text-gray-600 underline underline-offset-4 transition hover:text-gray-900"
            >
              {t("privateFeedbackLink")}
            </Link>{" "}
            {t("privateFeedbackOutro")}
          </p>
          <p className="mt-4 text-[11px] text-gray-600">
            {t("callOfficeIntro")}{" "}
            <a href={agency.phoneHref} className="font-semibold text-gray-600 hover:text-gray-900">
              {agency.phone}
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
