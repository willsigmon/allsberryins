"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { getIcon } from "@/components/ui/icon-registry";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { press } from "@/lib/haptics";
import { commercialProducts, personalProducts } from "@/lib/site-data";

export function ProductGridSection() {
  const t = useTranslations("home.productGrid");

  return (
    <section className="grain-overlay section-muted-bg py-20 sm:py-24" id="products">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          align="center"
        />

        <ProductCategory
          id="personal-insurance"
          title={t("personalTitle")}
          description={t("personalDescription")}
          startQuote={t("startQuote")}
          products={personalProducts}
          isCommercial={false}
        />
        <ProductCategory
          id="commercial-insurance"
          title={t("commercialTitle")}
          description={t("commercialDescription")}
          startQuote={t("startQuote")}
          products={commercialProducts}
          isCommercial
        />
      </div>
    </section>
  );
}

function ProductCategory({
  id,
  title,
  description,
  startQuote,
  products,
  isCommercial,
}: {
  id: string;
  title: string;
  description: string;
  startQuote: string;
  products: typeof personalProducts;
  isCommercial: boolean;
}) {
  const tProducts = useTranslations("products");
  const wrapperClass = isCommercial
    ? "mt-16 scroll-mt-28 -mx-4 sm:-mx-6 lg:-mx-8 rounded-[2.5rem] bg-[linear-gradient(160deg,var(--navy)_0%,#0a3578_55%,#143e7a_100%)] px-4 py-12 sm:px-6 lg:px-8"
    : "mt-16 first:mt-14 scroll-mt-28";

  return (
    <div id={id} className={wrapperClass}>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${isCommercial ? "text-gold" : "text-blue"}`}>{title}</p>
          <p className={`mt-3 text-base leading-7 ${isCommercial ? "text-white/70" : "text-gray-600"}`}>{description}</p>
        </div>
      </div>
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => {
          const Icon = getIcon(product.icon);
          const name = tProducts(`${product.slug}.name` as never);
          const productDescription = tProducts(`${product.slug}.description` as never);
          return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full"
            >
              <Link
                href={`/quote?product=${product.slug}`}
                onClick={() => { press(); }}
                className={`group parallax-card relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-7 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 ${
                  isCommercial
                    ? "border-white/10 bg-white/6 backdrop-blur-lg shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-gold/30 hover:bg-white/10 hover:shadow-[0_20px_50px_-20px_rgba(194,97,12,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "border-white/80 bg-white/50 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(0,32,92,0.08),0_16px_48px_-24px_rgba(0,32,92,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-blue/20 hover:bg-white/70 hover:shadow-[0_8px_32px_-8px_rgba(0,102,179,0.15),0_24px_56px_-20px_rgba(0,32,92,0.18),inset_0_1px_0_rgba(255,255,255,1)]"
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-[3px] ${isCommercial ? "bg-[linear-gradient(90deg,var(--warm-accent)_0%,#d97706_50%,var(--gold)_100%)]" : "bg-[linear-gradient(90deg,var(--navy)_0%,var(--blue)_60%,var(--red)_100%)]"} opacity-60 transition-opacity group-hover:opacity-100`} />

                <div className="relative">
                  <div className={`absolute -inset-2 rounded-3xl ${isCommercial ? "bg-gold/0 group-hover:bg-gold/8" : "bg-blue/0 group-hover:bg-blue/6"} blur-xl transition-all duration-500`} />
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isCommercial
                      ? "bg-gold/10 text-gold group-hover:bg-[linear-gradient(135deg,#d97706,var(--warm-accent))] group-hover:text-white group-hover:shadow-[0_8px_24px_-6px_rgba(194,97,12,0.4)]"
                      : "bg-blue-light text-blue group-hover:bg-[linear-gradient(135deg,var(--blue),var(--navy))] group-hover:text-white group-hover:shadow-[0_8px_24px_-6px_rgba(0,102,179,0.35)]"
                  }`}>
                    <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                <h3 className={`mt-6 font-display text-2xl font-bold tracking-tight ${isCommercial ? "text-white" : "text-gray-900"}`}>{name}</h3>
                <p className={`mt-3 flex-1 text-sm leading-7 ${isCommercial ? "text-white/75" : "text-gray-500"}`}>{productDescription}</p>

                <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 ${isCommercial ? "text-gold" : "text-blue"}`}>
                  {startQuote}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
