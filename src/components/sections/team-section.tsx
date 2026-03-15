"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { agents } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const accentClasses = {
  blue: "bg-[linear-gradient(145deg,#0066b3_0%,#5da7df_100%)]",
  navy: "bg-[linear-gradient(145deg,#00205c_0%,#33599d_100%)]",
  red: "bg-[linear-gradient(145deg,#da291c_0%,#f6685d_100%)]",
} as const;

export function TeamSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet our team"
          title="Experienced advisors who keep the process human"
          description="Agency-first branding, with a team page that still makes the people behind the agency easy to find and trust."
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <motion.article
              key={agent.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_18px_45px_-38px_rgba(0,32,92,0.5)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#00205c_0%,#0066b3_70%,#da291c_100%)]" />
              <div className={cn("flex h-20 w-20 items-center justify-center rounded-full text-2xl font-display font-extrabold text-white shadow-xl", accentClasses[agent.accent])}>
                {agent.initials}
              </div>
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
          ))}
        </div>
      </div>
    </section>
  );
}
