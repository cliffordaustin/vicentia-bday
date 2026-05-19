"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ChapterNav from "../_components/ChapterNav";

// ── Assets ──────────────────────────────────────────────────────────────────

const PHOTO_STAMP = "2026-05-19_23-33-55";
const PHOTOS = Array.from(
  { length: 20 },
  (_, i) => `/images/final_page/photo_${i + 1}_${PHOTO_STAMP}.jpg`,
);

const VIDEO_IDS = [
  6051, 6054, 6056, 6057, 6059, 6063, 6068, 6071, 6073, 6074, 6077, 6078, 6083,
  6084, 6273,
];
const VIDEOS = VIDEO_IDS.map((n) => `/images/final_page/IMG_${n}.MOV`);

const FINAL_TRACK = "/music/final-theme.mp3";

const EASE = [0.22, 1, 0.36, 1] as const;

// Deterministic pseudo-random so SSR and client render identically.
function rand(n: number, seed: number) {
  const x = Math.sin(n * 9301 + seed * 49297) * 233280;
  return x - Math.floor(x);
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function FinalChapter() {
  useFinalSoundtrack();

  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="relative flex-1 overflow-hidden">
      <FilmGrain />

      <Hero />

      <PolaroidWall photos={PHOTOS} onOpen={setLightbox} />

      <VideoReel videos={VIDEOS} />

      <CreditsRoll />

      <TheEnd />

      <div className="mx-auto w-full max-w-3xl px-6 pb-16">
        <ChapterNav slug="secret" />
      </div>

      <AnimatePresence>
        {lightbox && <PhotoLightbox src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}

// ── Soundtrack swap ─────────────────────────────────────────────────────────

function useFinalSoundtrack() {
  useEffect(() => {
    // Pause the global birthday-theme while this chapter is mounted.
    window.dispatchEvent(new Event("music:pause"));

    const audio = new Audio(FINAL_TRACK);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";

    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();

    const startOnGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      window.removeEventListener("touchstart", startOnGesture);
    };
    window.addEventListener("pointerdown", startOnGesture, { once: true });
    window.addEventListener("keydown", startOnGesture, { once: true });
    window.addEventListener("touchstart", startOnGesture, { once: true });

    const onDuck = () => { audio.volume = 0.08; };
    const onUnduck = () => { audio.volume = 0.45; };
    window.addEventListener("music:duck", onDuck);
    window.addEventListener("music:unduck", onUnduck);

    return () => {
      audio.pause();
      window.removeEventListener("pointerdown", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      window.removeEventListener("touchstart", startOnGesture);
      window.removeEventListener("music:duck", onDuck);
      window.removeEventListener("music:unduck", onUnduck);
      window.dispatchEvent(new Event("music:resume"));
    };
  }, []);
}

// ── Sections ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="font-hand text-2xl text-plum/55"
      >
        and then -
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.25 }}
        className="mt-6 font-display text-5xl italic leading-[0.95] tracking-tight text-plum sm:text-7xl md:text-8xl"
      >
        Roll the credits.
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
        className="mt-10 h-px w-40 origin-center bg-plum/30"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 1.2 }}
        className="mt-10 max-w-xl text-balance text-plum/65 sm:text-lg"
      >
        Every page before this was for you. So is this one - but louder, and
        all at once. A wall of you. A reel of you. The last room of the house,
        with the lights low and the music slow.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 1.7 }}
        className="mt-12 text-xs uppercase tracking-[0.4em] text-plum/35"
      >
        Chapter Seven · The Last One
      </motion.p>
    </header>
  );
}

function PolaroidWall({
  photos,
  onOpen,
}: {
  photos: string[];
  onOpen: (src: string) => void;
}) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
      <SectionLabel kicker="Reel 1" title="A Wall of You" />

      <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((src, i) => {
          const tilt = (rand(i, 11) - 0.5) * 8; // -4° → +4°
          const lift = rand(i, 12) * 14;
          const captionIdx = Math.floor(rand(i, 7) * POLAROID_CAPTIONS.length);
          return (
            <motion.button
              key={src}
              type="button"
              onClick={() => onOpen(src)}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: -lift, rotate: tilt }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: (i % 6) * 0.06,
              }}
              whileHover={{ y: -lift - 8, rotate: tilt * 0.4, scale: 1.04, zIndex: 5 }}
              className="group relative block rounded-sm bg-cream p-3 pb-10 shadow-[0_18px_40px_-22px_rgba(31,26,23,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
            >
              {/* sticky tape */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 bg-blush/40 mix-blend-multiply"
              />
              <div className="relative aspect-square w-full overflow-hidden bg-plum/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`memory ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="absolute inset-x-3 bottom-2 truncate text-center font-hand text-base text-plum/70">
                {POLAROID_CAPTIONS[captionIdx]}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

const POLAROID_CAPTIONS = [
  "us, again",
  "this one",
  "ours.",
  "remember?",
  "always",
  "the good one",
  "keep this",
  "soft day",
  "loud day",
  "forever",
  "yours",
  "frame it",
  "♡",
  "the look",
  "best day",
];

function VideoReel({ videos }: { videos: string[] }) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
      <SectionLabel kicker="Reel 2" title="The Moving Pictures" />

      <p className="mx-auto mt-4 max-w-md text-center font-hand text-xl text-hot-pink">
        tap any tile to play with sound
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {videos.map((src, i) => (
          <ReelTile key={src} src={src} index={i} />
        ))}
      </div>
    </section>
  );
}

function ReelTile({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [open, setOpen] = useState(false);
  const tilt = (rand(index, 21) - 0.5) * 3;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: EASE, delay: (index % 4) * 0.05 }}
        whileHover={{ y: -4, scale: 1.02 }}
        style={{ rotate: `${tilt}deg` }}
        className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-plum/10 bg-plum/5 shadow-[0_15px_35px_-20px_rgba(31,26,23,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
        aria-label={`Play clip ${index + 1}`}
      >
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-plum/40 via-transparent to-transparent p-3 text-cream"
        >
          <span className="font-hand text-lg">clip {String(index + 1).padStart(2, "0")}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-plum shadow-md opacity-0 transition group-hover:opacity-100">
            ▶
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && <VideoLightbox src={src} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function CreditsRoll() {
  return (
    <section className="relative z-10 mx-auto mt-24 w-full max-w-3xl overflow-hidden px-6 py-24 text-center">
      <SectionLabel kicker="Closing credits" title="A film in seven chapters" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
        }}
        className="mt-14 flex flex-col gap-10 font-display text-plum"
      >
        {CREDITS.map((row, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-plum/40">
              {row.role}
            </p>
            <p className="text-2xl italic sm:text-3xl">{row.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const CREDITS = [
  { role: "Starring", name: "Vicentia" },
  { role: "Co-starring", name: "Me, lucky to be here" },
  { role: "Original score by", name: "every inside joke we ever made" },
  { role: "Directed by", name: "the years" },
  { role: "Produced by", name: "every late-night call" },
  { role: "Costume design", name: "whatever you decided that morning" },
  { role: "Special thanks", name: "to whoever sat us together first" },
  { role: "Filmed on location", name: "wherever you were" },
];

function TheEnd() {
  return (
    <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="flex flex-col items-center gap-8"
      >
        <span className="text-xs uppercase tracking-[0.5em] text-plum/35">
          fin.
        </span>

        <h2 className="font-display text-7xl italic leading-none text-plum sm:text-9xl">
          The End.
        </h2>

        <div className="h-px w-24 bg-plum/30" />

        <p className="max-w-md font-hand text-2xl leading-snug text-plum/75">
          but only of the website. <br />
          the rest of it - me and you - <br />
          keeps going.
        </p>

        <p className="mt-6 font-hand text-xl text-hot-pink">
          happy birthday, again. ♡
        </p>

        <p className="mt-12 text-[10px] uppercase tracking-[0.5em] text-plum/30">
          made with love · {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  );
}

// ── Small helpers ───────────────────────────────────────────────────────────

function SectionLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="text-xs uppercase tracking-[0.4em] text-plum/40"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE, delay: 0.05 }}
        className="mt-3 font-display text-4xl italic text-plum sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}

function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          "radial-gradient(rgba(31,26,23,0.6) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

function PhotoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        ✕
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
      />
    </motion.div>,
    document.body,
  );
}

function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // duck the page soundtrack while a clip plays with sound
    window.dispatchEvent(new Event("music:duck"));
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("music:unduck"));
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        ✕
      </button>
      <video
        src={src}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
      />
    </motion.div>,
    document.body,
  );
}

