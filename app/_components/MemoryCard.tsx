"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import confetti from "canvas-confetti";
import { accentColors, type MemoryYear } from "../_lib/memories";
import { ChipRenderer } from "./MemoryChips";

const EASE = [0.22, 1, 0.36, 1] as const;

function burst(accentHex: string) {
  const colors = [accentHex, "#FFD23F", "#FFFFFF"];
  confetti({
    particleCount: 70,
    spread: 80,
    startVelocity: 35,
    origin: { y: 0.5 },
    colors,
    scalar: 0.9,
    ticks: 200,
  });
}

const lockedVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const unlockedVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(10px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function MemoryCard({
  year,
  side,
  unlocked,
  onUnlock,
}: {
  year: MemoryYear;
  side: "left" | "right";
  unlocked: boolean;
  onUnlock: () => void;
}) {
  const accent = accentColors[year.accent];

  const handleUnlock = () => {
    if (unlocked) return;
    burst(accent.hex);
    onUnlock();
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={unlocked ? unlockedVariants : lockedVariants}
      className={`relative w-full md:w-[46%] ${side === "left" ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
    >
      {/* Connector dot on the spine */}
      <span
        aria-hidden
        className="absolute top-8 hidden h-4 w-4 -translate-y-1/2 rounded-full md:block"
        style={{
          [side === "left" ? "right" : "left"]: "-0.5rem",
          background: accent.hex,
          boxShadow: `0 0 20px ${accent.glow}, 0 0 6px ${accent.hex}`,
        }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {unlocked ? (
          <motion.div
            key="open"
            variants={unlockedVariants}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-3xl border bg-cream p-6 shadow-[0_30px_80px_-30px_rgba(31,26,23,0.25)] sm:p-8"
            style={{
              borderColor: `${accent.hex}44`,
              boxShadow: `0 30px 80px -30px ${accent.glow}, 0 0 0 1px ${accent.hex}22`,
            }}
          >
            <header className="mb-6 flex items-baseline justify-between gap-4">
              <div>
                <p
                  className="font-display text-4xl leading-none sm:text-5xl"
                  style={{ color: accent.hex }}
                >
                  {year.year}
                </p>
                <p className="mt-2 font-hand text-xl text-plum/70">
                  {year.era}
                </p>
              </div>
              <span
                className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em]"
                style={{
                  borderColor: `${accent.hex}88`,
                  color: accent.hex,
                }}
              >
                unlocked
              </span>
            </header>

            <div className="grid gap-4">
              {year.chips.map((chip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.7,
                    ease: EASE,
                  }}
                >
                  <ChipRenderer chip={chip} accentHex={accent.hex} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="locked"
            type="button"
            onClick={handleUnlock}
            variants={lockedVariants}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full overflow-hidden rounded-3xl border border-plum/10 bg-surface p-8 text-left"
            style={{
              boxShadow: `inset 0 0 40px ${accent.glow}, 0 16px 40px -20px ${accent.glow}`,
            }}
            aria-label={`Unlock memory: ${year.year}`}
          >
            {/* Shimmer */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(110deg, transparent 30%, ${accent.hex}33 50%, transparent 70%)`,
                backgroundSize: "200% 100%",
                animation: "memory-shimmer 4s linear infinite",
              }}
            />

            <div className="relative flex items-start gap-5">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl text-cream"
                style={{
                  background: accent.hex,
                  boxShadow: `0 0 30px ${accent.glow}`,
                }}
                aria-hidden
              >
                🔒
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className="font-display text-3xl leading-none opacity-80"
                  style={{ color: accent.hex }}
                >
                  {year.year}
                </p>
                <p className="mt-2 font-hand text-lg text-plum/60">
                  {year.era}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-plum/70">
                  {year.teaser}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-plum/50 transition group-hover:text-plum">
                  tap to unlock
                  <span aria-hidden>→</span>
                </p>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes memory-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.article>
  );
}
