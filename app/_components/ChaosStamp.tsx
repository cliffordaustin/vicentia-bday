"use client";

import { motion } from "framer-motion";

export default function ChaosStamp({
  text,
  rotate = -12,
  color = "#FF3EA5",
}: {
  text: string;
  rotate?: number;
  color?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 1.6, rotate: rotate - 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute font-display text-xl uppercase tracking-[0.2em] sm:text-2xl"
      style={{
        color,
        border: `3px solid ${color}`,
        padding: "0.35rem 0.85rem",
        borderRadius: "4px",
        textShadow: `0 0 6px ${color}55`,
        boxShadow: `inset 0 0 0 1px ${color}55, 0 6px 18px ${color}33`,
        background: "rgba(255, 248, 242, 0.85)",
        backdropFilter: "blur(2px)",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </motion.span>
  );
}
