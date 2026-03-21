"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { carrierAccessStat } from "@/lib/site-data";

const stats = [
  { end: 20, suffix: "+", unit: "Years", label: "Serving Southern California" },
  { end: 5000, suffix: "+", unit: "Households & Businesses", label: "Protected across SoCal" },
  { end: carrierAccessStat, suffix: "+", unit: "Carriers", label: "Markets we can shop" },
];

function CountUp({ end, duration = 1.6 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
}

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-black/20 bg-[linear-gradient(90deg,#001033_0%,#001a4d_20%,#00307a_50%,#001a4d_80%,#001033_100%)] py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,102,179,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(218,41,28,0.06),transparent_50%)]" />
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="flex items-center gap-5 text-white"
          >
            <div className="count-reveal font-display text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ textShadow: "0 2px 0 rgba(0,0,0,0.3), 0 4px 12px rgba(0,102,179,0.25), 0 1px 0 rgba(255,255,255,0.08)" }}>
              <CountUp end={stat.end} />
              {stat.suffix}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">{stat.unit}</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/55">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
