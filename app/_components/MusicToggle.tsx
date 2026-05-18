"use client";

import { useEffect, useRef, useState } from "react";

const TRACK_SRC = "/music/birthday-theme.mp3";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.addEventListener("error", () => setReady(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
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
