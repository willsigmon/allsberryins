import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { SeoPage } from "@/lib/seo-content";

const pageTypeLabelKeys: Record<SeoPage["pageType"], "pillar" | "supporting" | "location"> = {
  pillar: "pillar",
  supporting: "supporting",
  location: "location",
};

type SeoPageCardProps = {
  page: SeoPage;
};

export function SeoPageCard({ page }: SeoPageCardProps) {
  const t = useTranslations("seoCard");

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      href={`/${page.slug}` as any}
      className="group rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_24px_55px_-45px_rgba(0,32,92,0.45)] transition hover:-translate-y-0.5 hover:border-blue/20 hover:shadow-[0_28px_70px_-45px_rgba(0,32,92,0.5)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue">
        {t(`pageType.${pageTypeLabelKeys[page.pageType]}`)}
      </p>
      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-gray-900">
        {page.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-gray-600">{page.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {page.keywords.slice(0, 2).map((keyword) => (
          <span
            key={keyword}
            className="whitespace-nowrap rounded-full bg-blue-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue"
          >
            {keyword}
          </span>
        ))}
      </div>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue">
        {t("readGuide")}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
