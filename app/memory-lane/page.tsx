"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import ChapterNav from "../_components/ChapterNav";
import MemoryCard from "../_components/MemoryCard";
import { useUnlocked } from "../_components/useUnlocked";
import { memories } from "../_lib/memories";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MemoryLane() {
  const { has, unlock, reset, count, hydrated } = useUnlocked();
  const total = memories.length;
  const allUnlocked = hydrated && count === total;

  // Spine fill animation tied to scroll progress within the timeline section
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start center", "end center"],
  });
  const spineFill = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const spineHeight = useTransform(spineFill, [0, 1], ["0%", "100%"]);

  // 100% celebration - fire a giant confetti burst once, the first time the
  // user hits a complete state during this session.
  const celebratedRef = useRef(false);
  useEffect(() => {
    if (!allUnlocked || celebratedRef.current) return;
    celebratedRef.current = true;
    const colors = [
      "#1E6FFF",
      "#4DA3FF",
      "#7EC8FF",
      "#0047AB",
      "#A8D8FF",
      "#FF3EA5",
      "#FFD23F",
      "#FFB3D1",
    ];
    const fire = (delay: number, opts: confetti.Options) =>
      setTimeout(() => confetti({ colors, ...opts }), delay);
    fire(0, { particleCount: 120, spread: 100, origin: { y: 0.3 } });
    fire(250, { particleCount: 80, angle: 60, spread: 70, origin: { x: 0 } });
    fire(500, { particleCount: 80, angle: 120, spread: 70, origin: { x: 1 } });
    fire(900, { particleCount: 200, spread: 160, startVelocity: 45 });
  }, [allUnlocked]);

  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="flex max-w-3xl flex-col items-center gap-3 text-center"
      >
        <p className="font-hand text-2xl text-plum/60">Chapter Two</p>
        <h1 className="font-display text-5xl italic leading-tight tracking-wide text-plum drop-shadow-[0_2px_20px_rgba(155,93,229,0.25)] sm:text-7xl">
          Memory Lane
        </h1>
        <p className="max-w-xl text-plum/70">
          Every card is a year. Every year is locked until you open it. Some
          memories are loud, some are quiet - pick any one to start.
        </p>
      </motion.header>

      {/* Progress tracker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        className="mt-10 flex w-full max-w-md flex-col gap-3 rounded-2xl border border-plum/10 bg-surface p-5 shadow-[0_10px_30px_-12px_rgba(31,26,23,0.15)]"
      >
        <div className="flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-plum/50">
            Core memories unlocked
          </p>
          <p className="font-display text-2xl text-plum/60">
            {hydrated ? count : 0}
            <span className="text-plum/40"> / {total}</span>
          </p>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-plum/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #FF3EA5, #FFD23F, #00F5D4, #9B5DE5)",
              boxShadow: "0 0 20px rgba(255,62,165,0.5)",
            }}
            animate={{ width: hydrated ? `${(count / total) * 100}%` : "0%" }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
        {hydrated && count > 0 && (
          <button
            type="button"
            onClick={reset}
            className="self-end text-[11px] uppercase tracking-[0.25em] text-plum/40 transition hover:text-plum/60"
          >
            reset progress
          </button>
        )}
      </motion.div>

      {/* Timeline */}
      <div ref={spineRef} className="relative mt-20 w-full max-w-5xl">
        {/* Spine - base line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-plum/10 md:block"
        />
        {/* Spine - animated fill */}
        <motion.span
          aria-hidden
          style={{ height: spineHeight }}
          className="pointer-events-none absolute left-1/2 top-0 hidden w-px -translate-x-1/2 md:block"
        >
          <span
            className="block h-full w-full"
            style={{
              background:
                "linear-gradient(180deg, #FF3EA5, #9B5DE5, #00F5D4, #FFD23F)",
              boxShadow: "0 0 14px rgba(255,62,165,0.6)",
            }}
          />
        </motion.span>

        <div className="flex flex-col gap-16">
          {memories.map((y, i) => (
            <MemoryCard
              key={y.id}
              year={y}
              side={i % 2 === 0 ? "left" : "right"}
              unlocked={hydrated && has(y.id)}
              onUnlock={() => unlock(y.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-24 w-full max-w-3xl">
        <ChapterNav slug="memory-lane" />
      </div>
    </section>
  );
}
