"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [parts, setParts] = useState<Parts | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-5" aria-hidden>
        {["DAYS", "HRS", "MIN", "SEC"].map((l) => (
          <Cell key={l} value="--" label={l} />
        ))}
      </div>
    );
  }

  if (!parts) {
    return (
      <p className="font-hand text-2xl text-hot-pink">
        the day is here ✨
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5">
      <Cell value={parts.days} label="DAYS" />
      <Cell value={String(parts.hours).padStart(2, "0")} label="HRS" />
      <Cell value={String(parts.minutes).padStart(2, "0")} label="MIN" />
      <Cell value={String(parts.seconds).padStart(2, "0")} label="SEC" />
    </div>
  );
}

function Cell({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-plum/10 bg-surface px-4 py-5 shadow-[0_10px_30px_-15px_rgba(31,26,23,0.18)] sm:px-6 sm:py-6">
      <span className="font-display text-4xl italic leading-none text-plum sm:text-5xl">
        {value}
      </span>
      <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-plum/50">
        {label}
      </span>
    </div>
  );
}
