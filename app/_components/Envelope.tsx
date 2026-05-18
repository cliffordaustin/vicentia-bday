"use client";

import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Envelope({
  to,
  sealInitial,
  opened,
  onOpen,
}: {
  to: string;
  sealInitial: string;
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className="relative mx-auto h-72 w-full max-w-md sm:h-80"
      style={{ perspective: 1400 }}
    >
      <AnimatePresence>
        {!opened && (
          <motion.button
            type="button"
            onClick={onOpen}
            aria-label="Open the letter"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, y: -20 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="group absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Envelope body */}
            <div
              className="absolute inset-0 overflow-hidden rounded-md"
              style={{
                background: "linear-gradient(160deg, #FFF4E6 0%, #FFE6CC 100%)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* "To Vicentia" address line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-plum/40">
                  to
                </p>
                <p
                  className="mt-1 font-hand text-4xl text-plum/80"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {to}
                </p>
              </div>

              {/* Decorative corner stamps */}
              <span className="absolute right-4 top-4 h-12 w-10 rounded-sm border-2 border-dashed border-hot-pink/40" />
              <span className="absolute bottom-4 left-4 font-hand text-xs text-plum/30">
                par avion
              </span>
            </div>

            {/* Triangular flap (still closed) */}
            <div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "55%",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #FFE6CC 0%, #F5D5B0 100%)",
                boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.08)",
              }}
            />

            {/* Wax seal */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="absolute left-1/2 top-[44%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #FF6BCB 0%, #FF3EA5 45%, #B0226E 100%)",
                color: "#FFF4E6",
                boxShadow:
                  "0 6px 16px rgba(255,62,165,0.6), inset 0 -3px 6px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.25)",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {sealInitial}
            </motion.div>

            {/* Pulse hint */}
            <motion.span
              aria-hidden
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: [0.4, 0.1, 0.4], scale: [1, 1.18, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[44%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,62,165,0.6) 0%, transparent 70%)",
              }}
            />

            <p className="absolute -bottom-10 left-0 right-0 text-center text-xs uppercase tracking-[0.3em] text-plum/60">
              tap the seal to open
            </p>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
