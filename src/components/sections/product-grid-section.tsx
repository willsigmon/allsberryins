"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getIcon } from "@/components/ui/icon-registry";
import { SectionHeading } from "@/components/ui/section-heading";
import { commercialProducts, personalProducts } from "@/lib/site-data";

export function ProductGridSection() {
  return (
    <section className="section-muted-bg py-20 sm:py-24" id="products">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Coverage lines"
          title="Insurance for Every Need"
          description="Choose a product tile to jump straight into a quote with that coverage already selected."
          align="center"
        />

        <ProductCategory
          id="personal-insurance"
          title="Personal Insurance"
          products={personalProducts}
        />
        <ProductCategory
          id="commercial-insurance"
          title="Commercial Insurance"
          products={commercialProducts}
        />
      </div>
    </section>
  );
}

function ProductCategory({
  id,
  title,
  products,
}: {
  id: string;
  title: string;
  products: typeof personalProducts;
}) {
  const isCommercial = title === "Commercial Insurance";
  const description = isCommercial
    ? "Commercial coverage built for payroll, property, liability, vehicles, and the realities of running a business."
    : "Protection for homes, vehicles, and the everyday pieces of life that deserve clear coverage.";

  const accentBg = isCommercial ? "bg-[var(--warm-accent-soft)]" : "bg-blue-light";
  const accentText = isCommercial ? "text-[var(--warm-accent)]" : "text-blue";
  const accentLabel = isCommercial ? "text-[var(--warm-accent)]" : "text-blue";
  const hoverGradient = isCommercial
    ? "group-hover:bg-[linear-gradient(135deg,#d97706,#92400e)]"
    : "group-hover:bg-[linear-gradient(135deg,#0066b3,#00205c)]";
  const hoverBorder = isCommercial
    ? "hover:border-[#d97706] hover:shadow-[0_22px_50px_-30px_rgba(217,119,6,0.35)]"
    : "hover:border-blue hover:shadow-[0_22px_50px_-30px_rgba(0,102,179,0.35)]";
  const topBar = isCommercial
    ? "bg-[linear-gradient(90deg,#92400e_0%,#d97706_50%,#f59e0b_100%)]"
    : "brand-stripe";

  return (
    <div id={id} className="mt-16 first:mt-14 scroll-mt-28">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${accentLabel}`}>{title}</p>
          <p className="mt-3 text-base leading-7 text-gray-600">{description}</p>
        </div>
      </div>
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => {
          const Icon = getIcon(product.icon);
          return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
              className="h-full"
            >
              <Link
                href={`/quote?product=${product.slug}`}
                className={`surface-card group relative flex h-full flex-col rounded-[2rem] border border-gray-100 p-6 shadow-[0_18px_40px_-34px_rgba(0,32,92,0.46)] transition duration-300 hover:-translate-y-1 ${hoverBorder} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 rounded-t-[2rem] ${topBar}`} />
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accentBg} ${accentText} transition-all duration-300 ${hoverGradient} group-hover:text-white group-hover:shadow-lg group-hover:scale-110`}>
                  <Icon className="h-7 w-7 product-icon" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-gray-900">{product.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">{product.description}</p>
                <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${accentText} transition group-hover:gap-3`}>
                  Start quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
