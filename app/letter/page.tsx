"use client";

import { useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import ChapterNav from "../_components/ChapterNav";
import Envelope from "../_components/Envelope";
import {
  MarginDoodle,
  OrnamentDivider,
  PaperClip,
  SignatureFlourish,
  WashiTape,
  WavyUnderline,
} from "../_components/LetterOrnaments";
import {
  letter,
  type LetterParagraph,
  type LetterSegment,
} from "../_lib/letter";

const EASE = [0.22, 1, 0.36, 1] as const;

const PAGE_BG: React.CSSProperties = {
  background:
    "linear-gradient(180deg, #FFF8EC 0%, #FFEFD4 100%), radial-gradient(rgba(120,80,30,0.05) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 4px 4px",
  color: "#3A220E",
  boxShadow:
    "0 40px 80px -20px rgba(0,0,0,0.55), 0 1px 0 rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.06)",
};

function renderParagraphBody(body: LetterParagraph["body"]) {
  if (typeof body === "string") return body;
  return (body as LetterSegment[]).map((seg, i) => {
    if (seg.type === "break") return <br key={i} />;
    if (seg.type === "highlight")
      return (
        <Fragment key={i}>
          <WavyUnderline>
            <span className="text-plum/85">{seg.body}</span>
          </WavyUnderline>
        </Fragment>
      );
    return <Fragment key={i}>{seg.body}</Fragment>;
  });
}

export default function LetterPage() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    confetti({
      particleCount: 30,
      spread: 50,
      startVelocity: 20,
      origin: { y: 0.45 },
      colors: ["#FFD23F", "#FFB3D1", "#FFF4E6"],
      scalar: 0.7,
      ticks: 120,
    });
    setOpened(true);
  };

  const hasPhoto = letter.clippedPhoto?.src !== undefined;

  return (
    <section className="relative flex-1 flex flex-col items-center px-6 py-24">
      {/* Warm candlelight glow - gentle on a light theme */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,210,63,0.10) 0%, rgba(255,179,209,0.06) 40%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <p className="font-hand text-2xl text-plum/60">Chapter Five</p>
          <h1 className="font-display text-4xl italic leading-tight tracking-wide text-plum drop-shadow-[0_2px_20px_rgba(31,26,23,0.15)] sm:text-6xl">
            A Letter to You
          </h1>
          <p className="max-w-md text-plum/70">
            Read this slowly. It&apos;s the part I almost couldn&apos;t write,
            so please don&apos;t rush it.
          </p>
        </motion.header>

        {/* Envelope - collapses out of the layout once opened */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              key="envelope"
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-16 w-full overflow-hidden"
            >
              <Envelope
                to={letter.envelope.to}
                sealInitial={letter.envelope.sealInitial}
                opened={opened}
                onOpen={handleOpen}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The stationery */}
        <AnimatePresence>
          {opened && (
            <motion.div
              key="stationery"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
              className="relative mt-12 w-full max-w-3xl"
            >
              {/* Decorative under-page (second sheet peeking out behind) */}
              <div
                aria-hidden
                className="absolute -bottom-4 left-4 right-4 -z-10 h-10 rounded-md"
                style={{
                  ...PAGE_BG,
                  transform: "rotate(1.2deg)",
                  filter: "brightness(0.96)",
                }}
              />
              <div
                aria-hidden
                className="absolute -bottom-2 left-2 right-2 -z-10 h-12 rounded-md"
                style={{
                  ...PAGE_BG,
                  transform: "rotate(-0.6deg)",
                  filter: "brightness(0.98)",
                }}
              />

              {/* Main page */}
              <article
                className="relative overflow-hidden rounded-md px-8 py-14 sm:px-16 sm:py-20"
                style={PAGE_BG}
              >
                {/* Washi tape at top corners */}
                <WashiTape className="-left-6 -top-2" rotate={-12} color="#FF3EA5" />
                <WashiTape className="-right-6 -top-2" rotate={10} color="#FFD23F" />

                {/* Warm vignette */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, rgba(255,210,63,0.14) 0%, transparent 60%)",
                  }}
                />

                {/* Margin doodles scattered */}
                <MarginDoodle type="heart" className="left-4 top-32" rotate={-15} />
                <MarginDoodle type="star" className="right-6 top-48" rotate={20} />
                <MarginDoodle type="swirl" className="left-8 bottom-44" />
                <MarginDoodle type="heart" className="right-10 bottom-32" rotate={12} />

                {/* Clipped photo */}
                {hasPhoto && (
                  <motion.figure
                    initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: -4 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
                    className="absolute -right-6 top-24 z-10 hidden w-40 bg-white p-2 pb-6 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.5)] sm:block"
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2">
                      <PaperClip />
                    </span>
                    <div className="relative aspect-square w-full overflow-hidden bg-plum/5">
                      {letter.clippedPhoto.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={letter.clippedPhoto.src}
                          alt={letter.clippedPhoto.caption}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center bg-plum/5">
                          <span className="font-hand text-xs text-plum/40">
                            photo
                          </span>
                        </div>
                      )}
                    </div>
                    <figcaption className="mt-1 text-center font-hand text-sm text-plum/60">
                      {letter.clippedPhoto.caption}
                    </figcaption>
                  </motion.figure>
                )}

                {/* Greeting with drop-cap */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
                  className="relative flex items-baseline gap-3"
                >
                  <span
                    className="font-display text-6xl leading-none text-plum sm:text-7xl"
                    style={{ textShadow: "0 2px 0 rgba(0,0,0,0.04)" }}
                    aria-hidden
                  >
                    {letter.greeting.charAt(0)}
                  </span>
                  <span className="font-hand text-4xl text-plum/85 sm:text-5xl">
                    {letter.greeting.slice(1)}
                  </span>
                </motion.div>

                {/* Sections */}
                <div className="relative mt-12 flex flex-col">
                  {letter.sections.map((section, si) => (
                    <Fragment key={si}>
                      {section.paragraphs.map((p, pi) => (
                        <motion.p
                          key={`p-${si}-${pi}`}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{
                            duration: 1,
                            ease: EASE,
                            delay: 0.08,
                          }}
                          className="font-hand text-2xl leading-relaxed text-plum/85 sm:text-3xl"
                          style={{ marginBottom: "1.5rem" }}
                        >
                          {renderParagraphBody(p.body)}
                        </motion.p>
                      ))}

                      {section.pullQuote && (
                        <motion.blockquote
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1, ease: EASE }}
                          className="relative my-10 self-center max-w-md text-center font-hand text-4xl leading-snug text-plum/85 sm:text-5xl"
                          style={{ textShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
                        >
                          <span aria-hidden className="absolute -left-4 -top-4 text-5xl text-plum/30">
                            &ldquo;
                          </span>
                          {section.pullQuote}
                          <span aria-hidden className="absolute -bottom-8 -right-4 text-5xl text-plum/30">
                            &rdquo;
                          </span>
                        </motion.blockquote>
                      )}

                      {si < letter.sections.length - 1 && <OrnamentDivider />}
                    </Fragment>
                  ))}
                </div>

                {/* Sign-off */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="relative mt-14 flex flex-col items-end"
                >
                  <p className="font-hand text-2xl text-plum/80 sm:text-3xl">
                    {letter.signoff}
                  </p>
                  <p
                    className="font-hand text-5xl text-plum sm:text-6xl"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    {letter.sender}
                  </p>
                  <SignatureFlourish />
                </motion.div>

                {/* Post-script */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  className="relative mt-12 border-t border-night/15 pt-6"
                >
                  <p className="font-hand text-xl text-plum/65 sm:text-2xl">
                    <span className="mr-2 font-display text-plum/70">
                      P.S.
                    </span>
                    {letter.postscript}
                  </p>
                </motion.div>

                {/* Bottom-right tiny doodle */}
                <MarginDoodle
                  type="heart"
                  className="right-6 bottom-6 opacity-60"
                  rotate={-8}
                />
              </article>

              {/* Washi tape at bottom corners */}
              <WashiTape className="-left-4 -bottom-2" rotate={-8} color="#00F5D4" />
              <WashiTape className="-right-4 -bottom-2" rotate={6} color="#9B5DE5" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24 w-full max-w-3xl">
          <ChapterNav slug="letter" />
        </div>
      </div>
    </section>
  );
}
