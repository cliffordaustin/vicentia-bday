"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import ChapterNav from "../_components/ChapterNav";
import BirthdayCake from "../_components/BirthdayCake";
import { bucketList, wishes, type BucketItem } from "../_lib/wishes";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const WISH_TILTS = [-1.5, 1, -0.5, 1.8, -1.2, 0.8];

export default function Wishes() {
  const [checked, setChecked] = useState<Set<string>>(
    new Set(bucketList.filter((b) => b.done).map((b) => b.id)),
  );

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-24">
      {/* Header */}
      <motion.header
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.18 } },
        }}
        className="flex max-w-3xl flex-col items-center gap-3 text-center"
      >
        <motion.p variants={fadeUp} className="font-hand text-2xl text-plum/60">
          Chapter Six
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl italic leading-tight tracking-wide text-plum sm:text-7xl"
        >
          Wishes &amp; What&apos;s Next
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-xl text-plum/70">
          Everything I&apos;m hoping for you this year — and a list of the
          ridiculous things we still owe each other.
        </motion.p>
      </motion.header>

      {/* ───────── CAKE ───────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: EASE }}
        className="mt-8 flex w-full max-w-4xl flex-col items-center"
      >
        <p className="text-center font-display text-3xl italic tracking-[0.15em] text-plum sm:text-4xl">
          MAKE A WISH
        </p>
        <p className="mt-3 text-center font-hand text-xl text-hot-pink">
          (the rules: light all five, then blow)
        </p>

        <div className="w-full">
          <BirthdayCake />
        </div>
      </motion.section>

      {/* ───────── WISHES FOR YOU ───────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
        className="mt-12 w-full max-w-5xl"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-display text-3xl italic tracking-[0.15em] text-plum sm:text-4xl"
        >
          WISHES FOR YOU
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-3 text-center font-hand text-xl text-hot-pink"
        >
          a year of soft things and bold ones
        </motion.p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishes.map((w, i) => (
            <motion.div
              key={w.id}
              variants={fadeUp}
              whileHover={{ y: -4, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative rounded-3xl border border-plum/10 bg-surface px-6 py-7 shadow-[0_15px_40px_-20px_rgba(31,26,23,0.18)]"
              style={{ transform: `rotate(${WISH_TILTS[i % WISH_TILTS.length]}deg)` }}
            >
              <span
                aria-hidden
                className="absolute -top-3 -left-2 grid h-9 w-9 place-items-center rounded-full bg-hot-pink text-cream shadow-md"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-hand text-2xl leading-snug text-plum/85">
                {w.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ───────── BUCKET LIST ───────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="mt-24 w-full max-w-3xl"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-display text-3xl italic tracking-[0.15em] text-plum sm:text-4xl"
        >
          THINGS WE STILL OWE EACH OTHER
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-3 text-center font-hand text-xl text-hot-pink"
        >
          tick them off together — no rush, but kinda rush
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-2 text-center text-xs uppercase tracking-[0.3em] text-plum/40"
        >
          {checked.size} / {bucketList.length} done
        </motion.p>

        <ul className="mt-10 flex flex-col gap-3">
          {bucketList.map((item) => (
            <motion.li key={item.id} variants={fadeUp}>
              <BucketRow
                item={item}
                done={checked.has(item.id)}
                onToggle={() => toggle(item.id)}
              />
            </motion.li>
          ))}
        </ul>
      </motion.section>

      <div className="w-full max-w-3xl">
        <ChapterNav slug="wishes" />
      </div>
    </section>
  );
}

function BucketRow({
  item,
  done,
  onToggle,
}: {
  item: BucketItem;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      className="group flex w-full items-start gap-4 rounded-2xl border border-plum/10 bg-surface p-5 text-left transition hover:border-hot-pink/40 hover:bg-cream"
    >
      <span
        aria-hidden
        className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-md border-2 transition ${
          done
            ? "border-hot-pink bg-hot-pink"
            : "border-plum/30 bg-cream group-hover:border-hot-pink"
        }`}
      >
        {done && (
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            viewBox="0 0 24 24"
            className="h-4 w-4 text-cream"
          >
            <motion.path
              d="M5 12 L10 17 L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </span>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush/40 text-xl">
        {item.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`font-display text-lg italic transition sm:text-xl ${
            done ? "text-plum/40 line-through" : "text-plum"
          }`}
        >
          {item.title}
        </p>
        <p
          className={`mt-1 font-hand text-lg transition ${
            done ? "text-plum/30 line-through" : "text-plum/65"
          }`}
        >
          {item.detail}
        </p>
      </div>
    </button>
  );
}
