import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { agency } from "@/lib/site-data";

export function CoverageEvaluationCta() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(160deg,#6b0f12_0%,#da291c_45%,#e8534a_80%,#f09080_100%)] p-8 text-center text-white shadow-[0_24px_70px_-30px_rgba(180,20,20,0.5),0_8px_20px_-8px_rgba(218,41,28,0.3)] sm:p-10">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/6 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-white/4 blur-3xl" />
          <div className="relative mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="h-4 w-4" />
            Free evaluation
          </div>

          <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Concerned about gaps in coverage?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/80">
            We offer a free evaluation of your current policy — personal or
            commercial. Send us your policy and we will review it for gaps,
            overlaps, and savings opportunities — no commitment required.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:brahm@allsberryagency.com?subject=Free%20Coverage%20Evaluation&body=Hi%20Brahm%2C%0A%0AI'd%20like%20a%20free%20evaluation%20of%20my%20current%20policy.%20I've%20attached%20it%20here.%0A%0AThank%20you!"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-blue-light"
            >
              Email Me Your Policy
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={agency.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-btn-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
            >
              Schedule a Review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
