"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getIcon } from "@/components/ui/icon-registry";
import { SectionHeading } from "@/components/ui/section-heading";
import { commercialProducts, personalProducts } from "@/lib/site-data";

export function ProductGridSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24" id="products">
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
  const description =
    title === "Personal Insurance"
      ? "Protection for homes, vehicles, and the everyday pieces of life that deserve clear coverage."
      : "Commercial coverage built for payroll, property, liability, vehicles, and the realities of running a business.";

  return (
    <div id={id} className="mt-16 first:mt-14 scroll-mt-28">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue">{title}</p>
          <p className="mt-3 text-base leading-7 text-gray-600">{description}</p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => {
          const Icon = getIcon(product.icon);
          return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
            >
              <Link
                href={`/quote?product=${product.slug}`}
                className="group flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_40px_-34px_rgba(0,32,92,0.46)] transition duration-300 hover:-translate-y-1 hover:border-blue hover:shadow-[0_22px_50px_-30px_rgba(0,102,179,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-light text-blue transition group-hover:bg-blue group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-gray-900">{product.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">{product.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue transition group-hover:text-navy">
                  Start quote
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
