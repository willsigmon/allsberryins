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
    <section className="relative overflow-hidden border-y border-navy/8 bg-[linear-gradient(90deg,#00205c_0%,#0a3578_30%,#0041a0_50%,#0a3578_70%,#00205c_100%)] py-8">
      <div className="absolute inset-0 mesh-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,179,0.15),transparent_70%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-20 gap-y-6 px-4 sm:px-6 lg:justify-center lg:gap-x-28 lg:px-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="flex items-center gap-4 text-white"
          >
            <div className="count-reveal font-display text-3xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,102,179,0.3)] sm:text-4xl">
              <CountUp end={stat.end} />
              {stat.suffix}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white/92">{stat.unit}</p>
              <p className="text-xs text-white/65">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
