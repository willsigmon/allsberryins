import { Building2, CheckCircle2, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { carrierPartners } from "@/lib/site-data";

export function CarrierLogosSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Insurance carrier access"
          title="Insurance Partners We Work With"
          description="We compare options across established carriers so your quote is built for your coverage goals, not one-size-fits-all pricing."
          align="center"
        />
        <div className="mt-10 rounded-[2rem] border border-gray-100 bg-gray-50 p-6 shadow-[0_20px_48px_-42px_rgba(0,32,92,0.4)] sm:p-7">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {carrierPartners.map((carrier, index) => (
              <article
                key={carrier.name}
                className="group rounded-xl border border-gray-200 bg-white p-4 text-left shadow-[0_12px_28px_-24px_rgba(0,32,92,0.45)] transition hover:-translate-y-0.5 hover:border-blue hover:shadow-[0_18px_35px_-26px_rgba(0,102,179,0.4)]"
                style={{
                  transitionDelay: `${Math.min(index, 15) * 20}ms`,
                }}
              >
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
                  <ShieldCheck className="h-4 w-4 text-blue" />
                  {carrier.name}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-400">Carrier access</p>
              </article>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm text-gray-600">
            <Building2 className="mt-0.5 h-4 w-4 text-blue" />
            <span>
              Carriers are selected based on local fit, product strength, and licensing so your quote options stay practical.
            </span>
          </p>
          <div className="mt-4 inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue" />
              Clean comparisons
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue" />
              Licensed partner channels
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue" />
              Multi-line coverage support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
