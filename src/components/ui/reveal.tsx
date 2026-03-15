"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
