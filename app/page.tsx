"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import FloatingBalloons from "./_components/FloatingBalloons";
import { chapters } from "./_lib/chapters";

const NAME = "Vicentia";
const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: EASE },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -70 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

export default function Landing() {
  const next = chapters[1];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      <FloatingBalloons />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-8"
      >
        {/* Handwritten opening line */}
        <motion.p
          variants={item}
          className="font-[family-name:var(--font-hand)] text-2xl text-plum/70 sm:text-3xl"
        >
          Today, the world celebrates you.
        </motion.p>

        {/* Name — per-letter staggered drop, all plum */}
        <motion.h1
          variants={container}
          className="font-[family-name:var(--font-display)] text-7xl font-bold italic leading-[0.9] text-plum sm:text-9xl md:text-[10rem]"
          style={{ perspective: 1000 }}
          aria-label={NAME}
        >
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letter}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-[family-name:var(--font-display)] text-xl italic tracking-[0.3em] text-plum/60 sm:text-2xl"
        >
          Happy Birthday
        </motion.p>

        {/* Intro copy */}
        <motion.p
          variants={item}
          className="max-w-xl text-base leading-relaxed text-plum/75 sm:text-lg"
        >
          From strangers to sisters — this is our story. Every page that follows
          is a little piece of us. Take your time. Smile when you need to. Cry
          if it sneaks up on you. It&apos;s all for you.
        </motion.p>

        {/* CTA — hot pink pop */}
        <motion.div variants={item} className="pt-2">
          <Link
            href={next.path}
            className="group inline-flex items-center gap-3 rounded-full bg-hot-pink px-9 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-cream shadow-[0_12px_30px_-8px_rgba(255,62,165,0.55)] transition hover:scale-[1.04] hover:shadow-[0_18px_40px_-8px_rgba(255,62,165,0.7)]"
          >
            <span>Open Your Gift</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <motion.p
          variants={item}
          className="font-[family-name:var(--font-hand)] text-lg text-plum/40"
        >
          ↓ scroll, or click above to begin
        </motion.p>
      </motion.div>
    </section>
  );
}
