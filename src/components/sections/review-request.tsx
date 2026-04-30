import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { agency } from "@/lib/site-data";

type ReviewRequestProps = {
  variant?: "post-submit" | "inline";
};

export function ReviewRequest({ variant = "inline" }: ReviewRequestProps) {
  const t = useTranslations("reviewRequest");
  const heading = variant === "post-submit" ? t("postSubmitHeading") : t("inlineHeading");
  const body = variant === "post-submit" ? t("postSubmitBody") : t("inlineBody");

  return (
    <aside
      className="rounded-3xl border border-[#bfd7ee] bg-[#f8fbff] p-6 text-left shadow-[0_24px_60px_-50px_rgba(0,32,92,0.4)] sm:p-7"
      aria-label={t("aria")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex w-fit shrink-0 items-center gap-0.5 rounded-full bg-white px-3 py-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
              aria-hidden="true"
            />
          ))}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#082457]">{heading}</h3>
          <p className="mt-1.5 text-sm leading-6 text-[#26394f]">{body}</p>
          <a
            href={agency.googleReviewUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-hover"
          >
            {t("cta")}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
