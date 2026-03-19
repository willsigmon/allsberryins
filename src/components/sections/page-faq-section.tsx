import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

type PageFaq = {
  question: string;
  answer: string;
};

type FaqCta = {
  href: string;
  label: string;
};

type PageFaqSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  faqs: readonly PageFaq[];
  ctas?: readonly FaqCta[];
};

export function PageFaqSection({
  eyebrow = "Frequently asked",
  title,
  description,
  faqs,
  ctas = [],
}: PageFaqSectionProps) {
  return (
    <section className="mt-14 border-t border-gray-100 pt-14">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.8rem] border border-gray-100 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-6 shadow-[0_22px_45px_-38px_rgba(0,32,92,0.4)]"
            >
              <h2 className="font-display text-xl font-bold text-gray-900">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">{faq.answer}</p>
            </article>
          ))}
        </div>

        {ctas.length ? (
          <div className="rounded-[2rem] border border-blue/10 bg-[linear-gradient(180deg,var(--white)_0%,var(--gray-50)_100%)] p-8 shadow-[0_26px_60px_-44px_rgba(0,32,92,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">
              Need the fast path?
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-gray-900">
              Start with the right next step.
            </h2>
            <div className="mt-8 grid gap-3">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-900 transition hover:border-blue hover:text-blue"
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
