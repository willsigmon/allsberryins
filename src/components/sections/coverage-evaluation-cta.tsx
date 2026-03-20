import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { agency } from "@/lib/site-data";
import { buildTrackedHref } from "@/lib/tracking";

export function CoverageEvaluationCta() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-gray-100 bg-[linear-gradient(160deg,#08214f_0%,#0f3a87_55%,#2d7bc6_100%)] p-8 text-center text-white shadow-[0_24px_60px_-38px_rgba(0,32,92,0.62)] sm:p-10">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="h-4 w-4" />
            Free evaluation
          </div>

          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Concerned about gaps in coverage?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/80">
            We offer a free evaluation of your current policy. Share your
            declarations page with our team and we will review it for gaps,
            overlaps, and savings opportunities — no commitment required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`mailto:${agency.email}?subject=Coverage%20Evaluation%20Request&body=Hi%20Allsberry%20team%2C%0A%0AI'd%20like%20a%20free%20evaluation%20of%20my%20current%20policy.%20I've%20attached%20my%20declarations%20page.%0A%0AThank%20you!`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
            >
              Email Your Declarations Page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={buildTrackedHref("/contact", {
                entry: "coverage-evaluation-cta",
              })}
              className="inline-flex items-center gap-2 rounded-full border border-white/24 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Schedule a Review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
