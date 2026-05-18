"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { candles, type CakeCandle } from "../_lib/wishes";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BirthdayCake() {
  const [lit, setLit] = useState<Set<string>>(new Set());
  const [blown, setBlown] = useState(false);
  const allLit = lit.size === candles.length;

  const toggleCandle = (id: string) => {
    if (blown) return;
    setLit((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const blowOut = () => {
    if (!allLit || blown) return;
    setBlown(true);
    setLit(new Set());
    confetti({
      particleCount: 180,
      spread: 120,
      startVelocity: 40,
      origin: { y: 0.55 },
      colors: ["#FF3EA5", "#FFD23F", "#FFB3D1", "#9B5DE5", "#FFF8F2"],
      scalar: 1,
    });
  };

  const relight = () => {
    setBlown(false);
    setLit(new Set());
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* Cake */}
      <div className="relative w-full max-w-md">
        {/* Candles row */}
        <div className="relative mx-auto flex h-32 items-end justify-center gap-3 sm:gap-5">
          {candles.map((c) => (
            <Candle
              key={c.id}
              candle={c}
              isLit={lit.has(c.id)}
              blown={blown}
              onClick={() => toggleCandle(c.id)}
            />
          ))}
        </div>

        {/* Cake tiers */}
        <div className="relative mx-auto -mt-4 w-full max-w-sm">
          {/* Top tier */}
          <div className="mx-auto h-16 w-44 rounded-t-lg bg-linear-to-b from-blush to-hot-pink/60 shadow-[inset_0_-6px_0_rgba(31,26,23,0.08)]" />
          {/* Frosting drip */}
          <svg
            viewBox="0 0 176 14"
            preserveAspectRatio="none"
            className="mx-auto -mt-1 block h-3 w-44 fill-cream"
            aria-hidden
          >
            <path d="M0 0 Q 10 14 22 4 Q 36 14 50 6 Q 64 14 78 4 Q 92 14 106 5 Q 120 14 134 4 Q 148 14 162 5 Q 170 12 176 4 L176 14 L0 14 Z" />
          </svg>
          {/* Middle tier */}
          <div className="mx-auto h-20 w-64 rounded-t-md bg-linear-to-b from-cream to-blush/40 shadow-[inset_0_-6px_0_rgba(31,26,23,0.06)]" />
          {/* Sprinkles */}
          <div className="pointer-events-none absolute left-1/2 top-[5.2rem] flex h-1 w-56 -translate-x-1/2 justify-around">
            {["#FF3EA5", "#FFD23F", "#9B5DE5", "#00B8A9", "#FF3EA5", "#FFD23F", "#9B5DE5"].map(
              (color, i) => (
                <span
                  key={i}
                  className="inline-block h-1.5 w-3 rounded-full"
                  style={{ background: color, transform: `rotate(${i % 2 ? 30 : -30}deg)` }}
                />
              ),
            )}
          </div>
          {/* Bottom tier */}
          <svg
            viewBox="0 0 256 14"
            preserveAspectRatio="none"
            className="mx-auto block h-3 w-64 fill-blush"
            aria-hidden
          >
            <path d="M0 0 Q 16 14 32 4 Q 48 14 64 5 Q 80 14 96 4 Q 112 14 128 5 Q 144 14 160 4 Q 176 14 192 5 Q 208 14 224 4 Q 240 14 256 4 L256 14 L0 14 Z" />
          </svg>
          <div className="mx-auto h-24 w-80 rounded-md bg-linear-to-b from-hot-pink to-hot-pink/70 shadow-[0_30px_60px_-30px_rgba(255,62,165,0.6),inset_0_-8px_0_rgba(31,26,23,0.08)]" />
          {/* Plate */}
          <div className="mx-auto -mt-1 h-3 w-96 rounded-full bg-plum/15 blur-[2px]" />
        </div>
      </div>

      {/* Status & controls */}
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <AnimatePresence mode="wait">
          {!blown ? (
            <motion.p
              key="status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-hand text-2xl text-plum/80"
            >
              {lit.size === 0
                ? "tap each candle to light it ✦"
                : allLit
                  ? "close your eyes, make a wish, then blow →"
                  : `${lit.size} of ${candles.length} lit…`}
            </motion.p>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center gap-2"
            >
              <p className="font-hand text-3xl text-hot-pink">
                wish made ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {allLit && !blown && (
          <motion.button
            type="button"
            onClick={blowOut}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-hot-pink px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-cream shadow-[0_10px_30px_-8px_rgba(255,62,165,0.55)] transition hover:scale-[1.04]"
          >
            blow them out
            <span aria-hidden>🌬️</span>
          </motion.button>
        )}

        {blown && (
          <button
            type="button"
            onClick={relight}
            className="text-xs uppercase tracking-[0.25em] text-plum/40 transition hover:text-hot-pink"
          >
            ↻ light them again
          </button>
        )}
      </div>

    </div>
  );
}

function Candle({
  candle,
  isLit,
  blown,
  onClick,
}: {
  candle: CakeCandle;
  isLit: boolean;
  blown: boolean;
  onClick: () => void;
}) {
  void candle;
  void blown;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLit ? "Extinguish candle" : "Light candle"}
      aria-pressed={isLit}
      className="group relative flex h-full flex-col items-center justify-end focus:outline-none"
    >
      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.span
            key="flame"
            aria-hidden
            initial={{ opacity: 0, scale: 0.4, y: 6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ opacity: 0, scale: 0.4, y: 8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="candle-flame relative mb-1 block h-5 w-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 70%, #FFE9A3 0%, #FFB347 40%, #FF6F00 75%, transparent 100%)",
              boxShadow: "0 0 18px 6px rgba(255,179,71,0.55), 0 0 40px 10px rgba(255,62,165,0.25)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Wick */}
      <span
        aria-hidden
        className="mb-0.5 block h-1 w-0.5 rounded-full bg-plum/70"
      />

      {/* Stick */}
      <span
        aria-hidden
        className={`block h-14 w-2 rounded-sm transition group-hover:translate-y-[-2px] ${
          isLit ? "shadow-[0_0_18px_rgba(255,179,71,0.5)]" : ""
        }`}
        style={{
          background:
            "repeating-linear-gradient(180deg, #FF3EA5 0 6px, #FFD23F 6px 12px, #9B5DE5 12px 18px, #00B8A9 18px 24px)",
        }}
      />

      <style>{`
        .candle-flame {
          animation: flame-flicker 1.2s ease-in-out infinite alternate;
          transform-origin: 50% 100%;
        }
        @keyframes flame-flicker {
          0%   { transform: scale(1) rotate(-2deg); }
          50%  { transform: scale(1.08, 1.12) rotate(1deg); }
          100% { transform: scale(0.96, 1.04) rotate(-1deg); }
        }
      `}</style>
    </button>
  );
}
