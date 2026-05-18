"use client";

import { useState, type ReactNode } from "react";

export default function FlipCard({
  front,
  back,
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className={`group relative h-72 w-full text-left [perspective:1200px] ${className}`}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-plum/10 bg-surface p-6 shadow-[0_10px_30px_-12px_rgba(31,26,23,0.18)] backface-hidden">
          <p className="text-xs uppercase tracking-[0.25em] text-plum/40">
            I thought
          </p>
          <p className="text-lg leading-snug text-plum/90">{front}</p>
          <p className="text-right text-xs text-plum/40">
            tap to reveal →
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-plum/30 bg-linear-to-br from-surface to-cream p-6 shadow-[0_10px_40px_-10px_rgba(31,26,23,0.2)] backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-plum/50">
            what actually happened
          </p>
          <p className="font-[family-name:var(--font-hand)] text-3xl leading-tight text-plum">
            {back}
          </p>
          <p className="text-right text-xs text-plum/40">← tap to flip back</p>
        </div>
      </div>
    </button>
  );
}
