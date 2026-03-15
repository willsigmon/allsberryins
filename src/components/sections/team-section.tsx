"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { agentMicrositeFeatures, agents, type Agent } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentClasses = {
  blue: "bg-[linear-gradient(145deg,#0066b3_0%,#5da7df_100%)]",
  navy: "bg-[linear-gradient(145deg,#00205c_0%,#33599d_100%)]",
  red: "bg-[linear-gradient(145deg,#da291c_0%,#f6685d_100%)]",
} as const;

const featuredAgent = agents.find((agent) => agent.slug === "brahm");
const supportingAgents = agents.filter((agent) => agent.slug !== "brahm");
const qrPattern = new Set([0, 1, 2, 4, 6, 7, 8, 9, 12, 13, 15, 17, 18, 20, 21, 23, 24, 26, 27, 29, 31, 32, 33, 35]);

export function TeamSection() {
  if (!featuredAgent) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20 sm:py-24" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet our team"
          title="Agency-first branding with premium producer pages built in"
          description="Brahm&apos;s page is positioned as the example sub-page: a clean, mobile-ready producer landing page Erin could scale across a larger team without losing the Allsberry brand."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-[linear-gradient(160deg,#08214f_0%,#0f3a87_55%,#2d7bc6_100%)] p-6 text-white shadow-[0_24px_60px_-38px_rgba(0,32,92,0.62)] lg:col-span-2"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.75)_28%,rgba(245,197,24,0.92)_62%,#da291c_100%)]" />
            <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur">
                  Featured sub-page example
                </div>
                <h3 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-[2.7rem]">
                  {featuredAgent.name}
                </h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/74">
                  {featuredAgent.title}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/82">
                  {featuredAgent.bio} This is the producer-page pattern we can point Erin to tomorrow:
                  direct contact, QR-ready, quote-focused, and still visually anchored to the agency site.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredAgent.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/86"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid gap-3">
                  {agentMicrositeFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-2xl border border-white/14 bg-white/10 px-4 py-3 text-sm font-medium text-white/86 backdrop-blur"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/agents/${featuredAgent.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-blue-light"
                  >
                    Open Brahm&apos;s Page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/quote?product=business"
                    className="inline-flex items-center gap-2 rounded-full border border-white/24 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Start a Commercial Quote
                    <Phone className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.85rem] border border-white/14 bg-white/10 p-4 shadow-[0_20px_50px_-32px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="rounded-[1.55rem] border border-white/12 bg-[#061833] p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                    <div className="ml-3 rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">
                      allsberryagency.com/agents/brahm
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#5b86d4_0%,#17376b_100%)] text-2xl font-display font-extrabold text-white">
                          {featuredAgent.initials}
                        </div>
                        <div>
                          <p className="font-display text-xl font-extrabold text-white">
                            {featuredAgent.name}
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/64">
                            {featuredAgent.title}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white px-3 py-3 text-sm font-semibold text-navy">
                          Tap to call
                        </div>
                        <div className="rounded-2xl bg-white/10 px-3 py-3 text-sm font-semibold text-white">
                          Instant lead capture
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-[0.84fr_1.16fr]">
                      <div className="rounded-[1.35rem] bg-white p-4 text-navy">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue">
                          QR ready
                        </p>
                        <div className="mt-3 grid grid-cols-6 gap-1.5">
                          {Array.from({ length: 36 }).map((_, index) => (
                            <span
                              key={index}
                              className={cn(
                                "h-3 w-3 rounded-[2px]",
                                qrPattern.has(index) ? "bg-navy" : "bg-blue-light",
                              )}
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-xs font-medium text-gray-500">
                          Print, text, or leave-behind friendly
                        </p>
                      </div>

                      <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/64">
                          Lead form preview
                        </p>
                        <div className="mt-3 space-y-2">
                          <div className="h-10 rounded-2xl bg-white" />
                          <div className="h-10 rounded-2xl bg-white/88" />
                          <div className="h-10 rounded-2xl bg-white/76" />
                          <div className="flex h-10 items-center justify-center rounded-2xl bg-red px-4 text-sm font-bold text-white">
                            Get Started
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {supportingAgents.map((agent, index) => (
            <SupportingAgentCard key={agent.slug} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportingAgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.08 }}
      className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#00205c_0%,#0066b3_70%,#da291c_100%)]" />

      {agent.photo ? (
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white shadow-xl">
          <Image
            src={agent.photo.src}
            alt={agent.photo.alt}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "flex h-20 w-20 items-center justify-center rounded-full text-2xl font-display font-extrabold text-white shadow-xl",
            accentClasses[agent.accent],
          )}
        >
          {agent.initials}
        </div>
      )}

      <h3 className="mt-6 font-display text-2xl font-bold text-gray-900">{agent.name}</h3>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue">{agent.title}</p>
      <p className="mt-4 text-sm leading-7 text-gray-600">{agent.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {agent.specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full bg-blue-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue"
          >
            {specialty}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`mailto:${agent.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue hover:text-blue"
        >
          <Mail className="h-4 w-4" />
          Email
        </Link>
        <Link
          href={`/agents/${agent.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue"
        >
          <Phone className="h-4 w-4" />
          Meet {agent.firstName}
        </Link>
      </div>
    </motion.article>
  );
}
