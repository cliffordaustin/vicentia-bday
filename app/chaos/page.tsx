"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChapterNav from "../_components/ChapterNav";
import ChaosStamp from "../_components/ChaosStamp";
import ChatScreenshot from "../_components/ChatScreenshot";
import {
  chaosChats,
  chaosPhotos,
  honorableQuotes,
  topChaos,
} from "../_lib/chaos";

const EASE = [0.22, 1, 0.36, 1] as const;

function rankBadge(rank: number) {
  if (rank === 1) return { bg: "#FFD23F", fg: "#3B2B00", label: "GOLD" };
  if (rank === 2) return { bg: "#D7D2C5", fg: "#2D1B4E", label: "SILVER" };
  if (rank === 3) return { bg: "#D08B5B", fg: "#2A1500", label: "BRONZE" };
  return { bg: "#FF3EA5", fg: "#FFF8F2", label: `#${rank}` };
}

function hash(n: number, seed: number) {
  const x = Math.sin(n * 9301 + seed * 49297) * 233280;
  return x - Math.floor(x);
}

const POLAROID_TILTS = [-6, 4, -3, 5];
const STAMP_COLORS = ["#FF3EA5", "#C9920A", "#00B8A9", "#9B5DE5"];

export default function Chaos() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="flex max-w-3xl flex-col items-center gap-3 text-center"
      >
        <p className="font-hand text-2xl text-plum/60">Chapter Four</p>
        <h1 className="font-display text-5xl italic leading-tight tracking-wide text-plum drop-shadow-[0_2px_30px_rgba(31,26,23,0.18)] sm:text-7xl">
          Chaos & Crimes
        </h1>
        <p className="max-w-xl text-plum/70">
          Evidence room. Statute of limitations: expired. Plead the fifth at
          your own risk.
        </p>
      </motion.header>

      {/* Caution banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
        className="mt-10 flex items-center gap-3 rounded-full border-2 border-dashed border-hot-pink/50 bg-blush/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-plum/60"
      >
        <span>⚠</span>
        <span>cringe ahead - proceed with affection</span>
        <span>⚠</span>
      </motion.div>

      {/* TOP 10 HALL OF SHAME */}
      <section className="mt-24 w-full max-w-3xl">
        <h2 className="text-center font-display text-3xl italic tracking-[0.2em] text-plum sm:text-4xl">
          TOP 10 DUMBEST THINGS
        </h2>
        <p className="mt-3 text-center font-hand text-xl text-plum/60">
          we&apos;ve done together (this is the short list)
        </p>

        <ol className="mt-12 flex flex-col gap-4">
          {topChaos.map((entry, i) => {
            const rank = i + 1;
            const badge = rankBadge(rank);
            const isOpen = expanded === entry.id;
            return (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : entry.id)}
                  className="group flex w-full items-start gap-5 rounded-2xl border border-plum/10 bg-surface p-5 text-left shadow-[0_10px_30px_-15px_rgba(31,26,23,0.15)] transition hover:border-plum/40 hover:shadow-[0_15px_40px_-15px_rgba(255,62,165,0.25)]"
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-xl font-display text-2xl"
                    style={{
                      background: badge.bg,
                      color: badge.fg,
                      boxShadow: `0 6px 18px ${badge.bg}66`,
                    }}
                    aria-label={`Rank ${rank}`}
                  >
                    {rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg italic text-plum sm:text-xl">
                      {entry.title}
                    </p>
                    <p className="mt-1 font-hand text-lg text-plum sm:text-xl">
                      {entry.oneLiner}
                    </p>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          key="story"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="mt-4 overflow-hidden text-sm leading-relaxed text-plum/80"
                        >
                          {entry.story}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-plum/40 transition group-hover:text-plum/60">
                      {isOpen ? "tap to collapse" : "tap for the full story →"}
                    </p>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* EVIDENCE ROOM - polaroids with stamps */}
      <section className="mt-32 w-full max-w-6xl">
        <h2 className="text-center font-display text-3xl italic tracking-[0.2em] text-plum sm:text-4xl">
          THE EVIDENCE
        </h2>
        <p className="mt-3 text-center font-hand text-xl text-plum/60">
          photos we cannot delete
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-12">
          {chaosPhotos.map((photo, i) => {
            const tilt = POLAROID_TILTS[i % POLAROID_TILTS.length];
            const stampColor = STAMP_COLORS[i % STAMP_COLORS.length];
            const stampRotate = -10 + hash(i, 41) * 20;
            return (
              <motion.figure
                key={photo.id}
                initial={{ opacity: 0, y: 30, rotate: tilt * 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                whileHover={{ rotate: 0, scale: 1.05, y: -4 }}
                className="relative w-64 bg-white p-3 pb-10 shadow-[0_25px_60px_-20px_rgba(31,26,23,0.25)]"
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
                      <span className="font-hand text-sm text-plum/40">
                        photo coming soon
                      </span>
                    </div>
                  )}
                  {photo.stamp && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ChaosStamp
                        text={photo.stamp}
                        rotate={stampRotate}
                        color={stampColor}
                      />
                    </div>
                  )}
                </div>
                <figcaption className="absolute bottom-2 left-0 right-0 px-4 text-center font-hand text-lg text-plum">
                  {photo.caption}
                </figcaption>
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 bg-hot-pink/50"
                />
              </motion.figure>
            );
          })}
        </div>
      </section>

      {/* RECEIPTS - chat screenshots */}
      <section className="mt-32 w-full max-w-6xl">
        <h2 className="text-center font-display text-3xl italic tracking-[0.2em] text-plum sm:text-4xl">
          THE RECEIPTS
        </h2>
        <p className="mt-3 text-center font-hand text-xl text-plum/60">
          screenshots we never deleted
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {chaosChats.map((chat) => (
            <ChatScreenshot key={chat.id} chat={chat} />
          ))}
        </div>
      </section>

      {/* GREATEST HITS - quotes */}
      <section className="mt-32 w-full max-w-4xl">
        <h2 className="text-center font-display text-3xl italic tracking-[0.2em] text-plum sm:text-4xl">
          GREATEST HITS
        </h2>
        <p className="mt-3 text-center font-hand text-xl text-plum/60">
          things actually said. out loud. with our chests.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {honorableQuotes.map((q, i) => {
            const tilt = -4 + hash(i, 51) * 8;
            const colors = ["#FF3EA5", "#C9920A", "#00B8A9", "#9B5DE5"];
            const color = colors[i % colors.length];
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, scale: 0.85, rotate: tilt * 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="font-hand text-2xl sm:text-3xl"
                style={{
                  color,
                  padding: "0.5rem 1rem",
                  border: `2px solid ${color}`,
                  background: "rgba(255, 248, 242, 0.85)",
                  boxShadow: `0 6px 20px ${color}33`,
                }}
              >
                &ldquo;{q}&rdquo;
              </motion.p>
            );
          })}
        </div>
      </section>

      <div className="mt-32 w-full max-w-3xl">
        <ChapterNav slug="chaos" />
      </div>
    </section>
  );
}
