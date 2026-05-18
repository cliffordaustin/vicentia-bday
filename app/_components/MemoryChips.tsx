"use client";

import { useState } from "react";
import type { MemoryChip } from "../_lib/memories";

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
    case "song":
      return <SongChip title={chip.title} artist={chip.artist} url={chip.url} accent={accentHex} />;
    case "joke":
      return <JokeChip text={chip.text} accent={accentHex} />;
    case "photo":
      return <PhotoChip src={chip.src} caption={chip.caption} />;
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
          — {speaker}
        </figcaption>
      )}
    </figure>
  );
}

function SongChip({
  title,
  artist,
  url,
  accent,
}: {
  title: string;
  artist: string;
  url?: string;
  accent: string;
}) {
  const inner = (
    <>
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-cream"
        style={{ background: accent, boxShadow: `0 0 20px ${accent}88` }}
        aria-hidden
      >
        ♪
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-plum">{title}</p>
        <p className="truncate text-xs text-plum/60">{artist}</p>
      </div>
    </>
  );
  const base =
    "flex items-center gap-3 rounded-2xl border border-plum/10 bg-surface p-4 transition hover:border-plum/40";
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className={base}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
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

function PhotoChip({
  src,
  caption,
}: {
  src: string | null;
  caption: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-plum/10 bg-surface">
      <div className="relative aspect-4/3 w-full bg-blush/20">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={caption}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-linear-to-br from-surface to-blush/30">
            <span className="font-hand text-sm text-plum/40">
              photo coming soon
            </span>
          </div>
        )}
      </div>
      <figcaption className="px-4 py-3 font-hand text-lg text-plum">
        {caption}
      </figcaption>
    </figure>
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
