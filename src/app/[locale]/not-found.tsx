import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { agency } from "@/lib/site-data";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tCta = useTranslations("cta");
  const popularLinks = [
    { labelKey: "quoteLabel", descKey: "quoteDesc", href: "/quote" as const },
    { labelKey: "teamLabel", descKey: "teamDesc", href: "/about" as const },
    { labelKey: "proofLabel", descKey: "proofDesc", href: "/evidence-of-insurance" as const },
    { labelKey: "carriersLabel", descKey: "carriersDesc", href: "/carriers" as const },
    { labelKey: "blogLabel", descKey: "blogDesc", href: "/blog" as const },
    { labelKey: "contactLabel", descKey: "contactDesc", href: "/contact" as const },
  ];

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 pt-32 pb-16">
      <div className="w-full max-w-3xl rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 text-center shadow-[0_30px_70px_-52px_rgba(0,32,92,0.45)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">
          {t("heading")}
        </p>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-gray-900">
          {t("lookslikeThisPageIsntHere")}
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {t("subheading")}{" "}
          <a href={agency.phoneHref} className="font-semibold text-blue">
            {agency.phone}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-red px-6 py-3 text-base font-bold text-white transition hover:bg-red-hover"
          >
            {t("goHome")}
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-base font-bold text-gray-900 transition hover:border-blue hover:text-blue"
          >
            {tCta("startQuote")}
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          {popularLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 transition hover:border-blue/40 hover:bg-blue/5"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-blue group-hover:bg-red" />
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-navy group-hover:text-blue">
                  {t(`popularLinks.${item.labelKey}` as never)}
                </span>
                <span className="text-xs text-gray-500">{t(`popularLinks.${item.descKey}` as never)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
