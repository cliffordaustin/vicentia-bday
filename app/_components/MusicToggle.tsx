"use client";

import { useEffect, useRef, useState } from "react";

const TRACK_SRC = "/music/birthday-theme.mp3";
const BASE_VOLUME = 0.4;
const DUCKED_VOLUME = 0.05;

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const duckedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = BASE_VOLUME;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.addEventListener("error", () => setReady(false));
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    audioRef.current = audio;

    // Try to autoplay. Most browsers block this without a user gesture,
    // so fall back to starting on the first interaction with the page.
    // `suppressed` is flipped by pages that swap in their own soundtrack
    // (e.g. the final chapter) to prevent overlap on refresh.
    let suppressed = false;
    const tryPlay = () => {
      if (suppressed) return;
      audio.play().catch(() => {});
    };
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

    // Ducking: lower the volume while a video is playing, restore after.
    const onDuck = () => {
      duckedRef.current = true;
      audio.volume = DUCKED_VOLUME;
    };
    const onUnduck = () => {
      duckedRef.current = false;
      audio.volume = BASE_VOLUME;
    };
    window.addEventListener("music:duck", onDuck);
    window.addEventListener("music:unduck", onUnduck);

    // Full pause/resume - used when a page swaps in its own soundtrack.
    const onPause = () => {
      suppressed = true;
      audio.pause();
    };
    const onResume = () => {
      suppressed = false;
      audio.play().catch(() => {});
    };
    window.addEventListener("music:pause", onPause);
    window.addEventListener("music:resume", onResume);

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("pointerdown", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      window.removeEventListener("touchstart", startOnGesture);
      window.removeEventListener("music:duck", onDuck);
      window.removeEventListener("music:unduck", onUnduck);
      window.removeEventListener("music:pause", onPause);
      window.removeEventListener("music:resume", onResume);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {
        /* ignored */
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause background music" : "Play background music"}
      aria-pressed={playing}
      disabled={!ready}
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-plum/15 bg-cream/80 text-plum shadow-md backdrop-blur-md transition hover:scale-105 hover:border-plum/40 hover:text-plum disabled:opacity-30"
    >
      <span className={`text-lg ${playing ? "animate-music-spin" : ""}`}>
        {playing ? "♪" : "♫"}
      </span>
    </button>
  );
}
