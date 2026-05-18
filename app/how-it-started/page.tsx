"use client";

import { motion, type Variants } from "framer-motion";
import ChapterNav from "../_components/ChapterNav";
import FlipCard from "../_components/FlipCard";
import { origin } from "../_lib/origin";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

const polaroidTilts = ["-rotate-3", "rotate-2", "-rotate-1"];

export default function HowItStarted() {
  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-24">
      {/* Warm candlelight glow — replaces disco intensity for this chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,210,63,0.25) 0%, rgba(255,179,209,0.15) 35%, transparent 70%)",
        }}
      />

      {/* Chapter header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.25 } },
        }}
        className="flex max-w-3xl flex-col items-center gap-4 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-hand)] text-2xl text-plum/60"
        >
          Chapter One
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-[family-name:var(--font-display)] text-5xl italic leading-tight tracking-wide text-plum drop-shadow-[0_2px_20px_rgba(31,26,23,0.15)] sm:text-7xl"
        >
          How It Started
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="max-w-xl text-base text-plum/70 sm:text-lg"
        >
          {origin.meta.place} · {origin.meta.year}
        </motion.p>
      </motion.div>

      {/* Intro paragraphs */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
        className="mt-16 flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-plum/85"
      >
        {origin.intro.paragraphs.map((p, i) => (
          <motion.p key={i} variants={fadeUp}>
            {p}
          </motion.p>
        ))}
      </motion.div>

      {/* First impressions: what I thought vs what actually happened */}
      <section className="mt-24 w-full max-w-4xl">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center font-[family-name:var(--font-display)] text-3xl tracking-[0.25em] text-plum sm:text-4xl"
        >
          FIRST IMPRESSIONS
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="mt-3 text-center font-[family-name:var(--font-hand)] text-xl text-plum/60"
        >
          spoiler: I was wrong about everything
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.18 } },
          }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {origin.impressions.map((pair, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FlipCard front={pair.thought} back={pair.reality} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Photo strip — polaroids */}
      <section className="mt-24 w-full max-w-5xl">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center font-[family-name:var(--font-display)] text-3xl tracking-[0.25em] text-plum sm:text-4xl"
        >
          THE RECEIPTS
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {origin.photos.map((photo, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              className={`relative w-64 ${polaroidTilts[i % polaroidTilts.length]} bg-white p-3 pb-12 shadow-[0_20px_50px_-10px_rgba(31,26,23,0.2)] transition hover:rotate-0 hover:scale-105`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-blush/20">
                {photo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-linear-to-br from-surface to-blush/30">
                    <span className="font-[family-name:var(--font-hand)] text-sm text-plum/40">
                      photo coming soon
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="absolute bottom-2 left-0 right-0 px-4 text-center font-[family-name:var(--font-hand)] text-lg text-plum">
                {photo.caption}
              </figcaption>
              {/* tape */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-gold-bright/60"
              />
            </motion.figure>
          ))}
        </motion.div>
      </section>

      {/* First real memory */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
        className="mt-24 w-full max-w-2xl"
      >
        <motion.p
          variants={fadeUp}
          className="text-center text-xs uppercase tracking-[0.4em] text-plum/40"
        >
          The moment it shifted
        </motion.p>
        <motion.h3
          variants={fadeUp}
          className="mt-4 text-center font-[family-name:var(--font-hand)] text-4xl text-plum sm:text-5xl"
        >
          {origin.firstMemory.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-center text-lg leading-relaxed text-plum/85 sm:text-xl"
        >
          {origin.firstMemory.body}
        </motion.p>
      </motion.section>

      <div className="mt-24 w-full max-w-3xl">
        <ChapterNav slug="how-it-started" />
      </div>
    </section>
  );
}
