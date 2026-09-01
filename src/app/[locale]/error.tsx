"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { agency } from "@/lib/site-data";

type LocaleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ reset }: LocaleErrorProps) {
  const t = useTranslations("errorPage");

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-32 pb-16">
      <div className="w-full max-w-xl rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 text-center shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">
          {t("eyebrow")}
        </p>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-gray-900">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {t("body")}{" "}
          <a className="font-semibold text-blue" href={agency.phoneHref}>
            {agency.phone}
          </a>
          {" · "}
          <a className="font-semibold text-blue" href={agency.emailHref}>
            {agency.email}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-red px-6 py-3 text-base font-bold text-white transition hover:bg-red-hover"
            onClick={reset}
            type="button"
          >
            {t("tryAgain")}
          </button>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-base font-bold text-gray-900 transition hover:border-blue hover:text-blue"
            href="/"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
