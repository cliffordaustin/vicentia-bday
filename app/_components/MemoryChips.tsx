"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { MemoryChip, MediaItem } from "../_lib/memories";

export function ChipRenderer({
  chip,
  accentHex,
}: {
  chip: MemoryChip;
  accentHex: string;
}) {
  switch (chip.type) {
    case "story":
      return <StoryChip title={chip.title} body={chip.body} />;
    case "quote":
      return <QuoteChip text={chip.text} speaker={chip.speaker} accent={accentHex} />;
    case "joke":
      return <JokeChip text={chip.text} accent={accentHex} />;
    case "media":
      return <MediaCarousel items={chip.items} caption={chip.caption} accent={accentHex} />;
    case "voice":
      return <VoiceChip src={chip.src} label={chip.label} accent={accentHex} />;
  }
}

const CHIP_BASE = "rounded-2xl border border-plum/10 bg-surface p-5";

function StoryChip({ title, body }: { title?: string; body: string }) {
  return (
    <div className={CHIP_BASE}>
      {title && (
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-plum/40">
          {title}
        </p>
      )}
      <p className="text-base leading-relaxed text-plum/85">{body}</p>
    </div>
  );
}

function QuoteChip({
  text,
  speaker,
  accent,
}: {
  text: string;
  speaker?: string;
  accent: string;
}) {
  return (
    <figure className={CHIP_BASE}>
      <blockquote
        className="font-hand text-2xl leading-snug"
        style={{ color: accent }}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
      {speaker && (
        <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-plum/40">
          - {speaker}
        </figcaption>
      )}
    </figure>
  );
}

function JokeChip({ text, accent }: { text: string; accent: string }) {
  const [peeked, setPeeked] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setPeeked((p) => !p)}
      className="group relative w-full overflow-hidden rounded-2xl border border-plum/10 bg-surface p-5 text-left"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-plum/40">
        Inside joke
      </p>
      <p
        className="mt-2 font-hand text-2xl leading-snug transition"
        style={{
          color: accent,
          filter: peeked ? "blur(0px)" : "blur(6px)",
        }}
      >
        {text}
      </p>
      {!peeked && (
        <span className="mt-2 inline-block text-xs text-plum/40">
          tap to reveal →
        </span>
      )}
    </button>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  items,
  startIdx,
  caption,
  accent,
  onClose,
}: {
  items: MediaItem[];
  startIdx: number;
  caption?: string;
  accent: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const current = items[idx];
  const multiple = items.length > 1;

  const prev = useCallback(() => setIdx((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIdx((i) => Math.min(items.length - 1, i + 1)),
    [items.length]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Make sure background music is restored if the lightbox closes mid-video.
  useEffect(() => {
    return () => { window.dispatchEvent(new Event("music:unduck")); };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        ✕
      </button>

      {/* Media */}
      <div
        className="relative flex max-h-[80vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {current.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.src}
                alt={caption ?? `media ${idx + 1}`}
                className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              />
            ) : (
              <video
                key={current.src}
                src={current.src}
                controls
                autoPlay
                playsInline
                onPlay={() => window.dispatchEvent(new Event("music:duck"))}
                onPause={() => window.dispatchEvent(new Event("music:unduck"))}
                onEnded={() => window.dispatchEvent(new Event("music:unduck"))}
                className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Prev / next */}
        {multiple && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              disabled={idx === 0}
              aria-label="Previous"
              className="absolute -left-14 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 disabled:opacity-20"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              disabled={idx === items.length - 1}
              aria-label="Next"
              className="absolute -right-14 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 disabled:opacity-20"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption + dots */}
      <div
        className="mt-4 flex flex-col items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {caption && (
          <p className="font-hand text-xl text-white/80">{caption}</p>
        )}
        {multiple && (
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to item ${i + 1}`}
                className="h-2 w-2 rounded-full transition"
                style={{ background: i === idx ? accent : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
}

// ── Media carousel (thumbnail view) ─────────────────────────────────────────

function MediaCarousel({
  items,
  caption,
  accent,
}: {
  items: MediaItem[];
  caption?: string;
  accent: string;
}) {
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = items[idx];
  const multiple = items.length > 1;

  return (
    <>
      <figure className="overflow-hidden rounded-2xl border border-plum/10 bg-surface">
        {/* Thumbnail viewport - click to expand */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block aspect-4/3 w-full overflow-hidden bg-blush/20 focus-visible:outline-none"
          aria-label="Tap to view full size"
        >
          {current.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.src}
              alt={caption ?? `media ${idx + 1}`}
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          ) : (
            <video
              key={current.src}
              src={current.src}
              playsInline
              muted
              className="h-full w-full object-cover"
            />
          )}

          {/* Expand hint */}
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
            <span className="scale-75 rounded-full bg-black/40 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition group-hover:scale-100 group-hover:opacity-100">
              {current.kind === "video" ? "▶  tap to play" : "⤢  tap to expand"}
            </span>
          </span>

          {/* Carousel arrows */}
          {multiple && (
            <>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); setIdx((i) => i - 1); }}
                onKeyDown={(e) => e.key === "Enter" && (e.stopPropagation(), setIdx((i) => i - 1))}
                aria-label="Previous"
                aria-disabled={idx === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-lg text-white backdrop-blur-sm transition hover:bg-black/60 aria-disabled:opacity-30"
              >
                ‹
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); setIdx((i) => i + 1); }}
                onKeyDown={(e) => e.key === "Enter" && (e.stopPropagation(), setIdx((i) => i + 1))}
                aria-label="Next"
                aria-disabled={idx === items.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-lg text-white backdrop-blur-sm transition hover:bg-black/60 aria-disabled:opacity-30"
              >
                ›
              </span>
              <span className="absolute bottom-2 right-3 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                {idx + 1} / {items.length}
              </span>
            </>
          )}
        </button>

        {/* Dot indicators */}
        {multiple && (
          <div className="flex justify-center gap-2 pb-1 pt-3">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to item ${i + 1}`}
                className="h-2 w-2 rounded-full transition"
                style={{ background: i === idx ? accent : `${accent}44` }}
              />
            ))}
          </div>
        )}

        {caption && (
          <figcaption className="px-4 py-3 font-hand text-lg text-plum">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            items={items}
            startIdx={idx}
            caption={caption}
            accent={accent}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function VoiceChip({
  src,
  label,
  accent,
}: {
  src: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-plum/10 bg-surface p-4">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-cream"
        style={{ background: accent, boxShadow: `0 0 20px ${accent}88` }}
        aria-hidden
      >
        🎙
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-plum">{label}</p>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls src={src} className="mt-1 w-full" />
      </div>
    </div>
  );
}
