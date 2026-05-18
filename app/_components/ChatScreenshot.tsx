"use client";

import { motion } from "framer-motion";
import type { ChaosChat } from "../_lib/chaos";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ChatScreenshot({ chat }: { chat: ChaosChat }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="w-full max-w-sm overflow-hidden rounded-3xl border border-plum/10 bg-cream shadow-[0_25px_60px_-20px_rgba(31,26,23,0.25)]"
    >
      <header className="flex items-center justify-between border-b border-plum/10 bg-surface px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-hot-pink/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-bright/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-disco-purple/70" />
        </span>
        <p className="text-xs uppercase tracking-[0.25em] text-plum/50">
          {chat.title}
        </p>
        <span className="text-xs text-plum/30">●●●</span>
      </header>

      <div className="space-y-2 px-4 py-5">
        {chat.messages.map((msg, i) => {
          const mine = msg.from === "me";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, x: mine ? 20 : -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-snug ${
                  mine
                    ? "rounded-br-md bg-hot-pink text-cream"
                    : "rounded-bl-md bg-surface text-plum border border-plum/10"
                }`}
              >
                {msg.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.figure>
  );
}
