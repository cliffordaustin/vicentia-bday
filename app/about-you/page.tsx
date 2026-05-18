"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChapterNav from "../_components/ChapterNav";
import StickyNote from "../_components/StickyNote";
import {
  categoryMeta,
  loveNotes,
  type LoveCategory,
} from "../_lib/things-i-love";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES: LoveCategory[] = [
  "kindness",
  "chaos",
  "loyalty",
  "humor",
  "strength",
];

// Deterministic pseudo-random — keeps SSR/CSR markup identical.
function hash(n: number, seed: number) {
  const x = Math.sin(n * 9301 + seed * 49297) * 233280;
  return x - Math.floor(x);
}

type Layout = { x: number; y: number; rotate: number };

function buildLayout(count: number, seed: number, boardW: number, boardH: number): Layout[] {
  const noteSize = 192; // px (sm:w-48)
  const padX = 24;
  const padY = 80;
  const maxX = Math.max(0, boardW - noteSize - padX);
  const maxY = Math.max(0, boardH - noteSize - padY);
  return Array.from({ length: count }, (_, i) => ({
    x: padX + hash(i, seed * 7 + 1) * maxX,
    y: padY + hash(i, seed * 7 + 2) * maxY,
    rotate: -8 + hash(i, seed * 7 + 3) * 16,
  }));
}

export default function AboutYou() {
  const [active, setActive] = useState<Set<LoveCategory>>(
    new Set(CATEGORIES),
  );
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [seed, setSeed] = useState(1);
  const boardRef = useRef<HTMLDivElement>(null);

  // Fixed board dimensions for deterministic SSR layout. The board scrolls if
  // smaller than its content via overflow.
  const BOARD_W = 1100;
  const BOARD_H = 900;

  const layout = useMemo(
    () => buildLayout(loveNotes.length, seed, BOARD_W, BOARD_H),
    [seed],
  );

  const toggle = (c: LoveCategory) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      if (next.size === 0) return new Set(CATEGORIES); // never empty
      return next;
    });
  };

  const visibleCount = loveNotes.filter((n) => active.has(n.category)).length;

  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="flex max-w-3xl flex-col items-center gap-3 text-center"
      >
        <p className="font-hand text-2xl text-plum/60">Chapter Three</p>
        <h1 className="font-display text-5xl italic leading-tight tracking-wide text-plum drop-shadow-[0_2px_20px_rgba(31,26,23,0.15)] sm:text-7xl">
          Things I Love About You
        </h1>
        <p className="max-w-xl text-plum/70">
          A whole wall of small, true things. Drag any note. Click to read it
          bigger. Filter by what you&apos;re in the mood for.
        </p>
      </motion.header>

      {/* Controls */}
      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => {
            const meta = categoryMeta[c];
            const on = active.has(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                className="rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition"
                style={{
                  borderColor: on ? meta.bg : "rgba(31,26,23,0.2)",
                  background: on ? meta.bg : "transparent",
                  color: on ? meta.text : "rgba(31,26,23,0.55)",
                  boxShadow: on ? `0 4px 16px ${meta.bg}66` : "none",
                }}
                aria-pressed={on}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <p className="text-plum/60">
            <span className="font-display text-2xl text-plum/60">
              {visibleCount}
            </span>{" "}
            reasons (and counting)
          </p>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="rounded-full border border-plum/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-plum/70 transition hover:border-plum/30 hover:text-plum/60"
          >
            shuffle
          </button>
        </div>
      </div>

      {/* Corkboard */}
      <div className="mt-10 w-full max-w-[1180px] overflow-x-auto">
        <div
          ref={boardRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) setFocusedId(null);
          }}
          className="relative mx-auto rounded-3xl border border-plum/10 shadow-[0_30px_80px_-30px_rgba(31,26,23,0.2)]"
          style={{
            width: BOARD_W,
            height: BOARD_H,
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,210,63,0.18), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,179,209,0.25), transparent 60%), #F5E6D3",
            backgroundImage:
              "radial-gradient(rgba(120,80,30,0.08) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        >
          {loveNotes.map((note, i) => {
            const visible = active.has(note.category);
            const isFocused = focusedId === note.id;
            const isDimmed = !visible || (focusedId !== null && !isFocused);
            const pos = layout[i];
            return (
              <StickyNote
                key={note.id}
                note={note}
                x={pos.x}
                y={pos.y}
                rotate={pos.rotate}
                focused={isFocused}
                dimmed={isDimmed}
                onClick={() => setFocusedId(isFocused ? null : note.id)}
                constraintsRef={boardRef}
              />
            );
          })}

          {/* tap-to-dismiss hint when focused */}
          {focusedId && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-plum/60"
            >
              click anywhere to deselect
            </motion.p>
          )}
        </div>
      </div>

      <div className="mt-24 w-full max-w-3xl">
        <ChapterNav slug="about-you" />
      </div>
    </section>
  );
}
