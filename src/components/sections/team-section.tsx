"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { agents, type Agent } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentClasses = {
  blue: "bg-[linear-gradient(145deg,#0066b3_0%,#5da7df_100%)]",
  navy: "bg-[linear-gradient(145deg,#00205c_0%,#33599d_100%)]",
  red: "bg-[linear-gradient(145deg,#da291c_0%,#f6685d_100%)]",
} as const;

const featuredAgent = agents.find((agent) => agent.slug === "brahm");
const supportingAgents = agents.filter((agent) => agent.slug !== "brahm");

export function TeamSection() {
  if (!featuredAgent) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20 sm:py-24" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet our team"
          title="Local Agents Who Know Your Coverage"
          description="Every client gets a dedicated agent who listens, explains your options clearly, and stays with you from quote through claims."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-[linear-gradient(160deg,#08214f_0%,#0f3a87_55%,#2d7bc6_100%)] p-8 text-white shadow-[0_24px_60px_-38px_rgba(0,32,92,0.62)] lg:col-span-2"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.75)_28%,rgba(245,197,24,0.92)_62%,#da291c_100%)]" />
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
              {featuredAgent.photo ? (
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-xl lg:h-28 lg:w-28">
                  <Image
                    src={featuredAgent.photo.src}
                    alt={featuredAgent.photo.alt}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex h-24 w-24 items-center justify-center rounded-full text-3xl font-display font-extrabold text-white shadow-xl lg:h-28 lg:w-28 lg:text-4xl",
                    accentClasses[featuredAgent.accent],
                  )}
                >
                  {featuredAgent.initials}
                </div>
              )}

              <div>
                <p className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/74">
                  Featured example of the scalable producer-page pattern
                </p>
                <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {featuredAgent.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/74">
                  {featuredAgent.title}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/82">
                  {featuredAgent.bio}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                  A dedicated page like Brahm&apos;s can scale across Erin&apos;s broader 10-agent licensed
                  team, giving each producer a direct link, QR code, and lead capture flow.
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

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`mailto:${featuredAgent.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/24 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Link>
                  <Link
                    href={`/agents/${featuredAgent.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-blue-light"
                  >
                    Meet {featuredAgent.firstName}
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
