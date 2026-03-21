"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { homePageFaqs } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function FaqItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.06 }}
      className="card-elevated hover-lift rounded-[1.8rem] border border-gray-100"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <h3 className="font-display text-xl font-bold text-gray-900">{faq.question}</h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-blue transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-7 text-gray-600">{faq.answer}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function FaqSection() {
  return (
    <section className="bg-white py-20 sm:py-24" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Straight answers for quotes, coverage, and proof requests"
          description="This section is written for real client questions, which also makes the site easier for search engines and AI answer engines to understand."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {homePageFaqs.map((faq, index) => (
              <FaqItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>

          <div className="gradient-border card-elevated rounded-[2rem] border border-blue/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
              Need the fast path?
            </p>
            <h3 className="mt-4 font-display text-3xl font-extrabold text-gray-900">
              Start with the right request.
            </h3>
            <p className="mt-4 text-base leading-8 text-gray-600">
              Use the quote flow if you are looking for coverage. Use the proof request flow if your bank, lender, or a business partner needs paperwork.
            </p>
            <div className="mt-8 grid gap-3">
              <Link
                href="/quote?product=business"
                className="glass-btn inline-flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold text-gray-900"
              >
                Start a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/evidence-of-insurance"
                className="glass-btn inline-flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold text-gray-900"
              >
                Request proof of insurance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
