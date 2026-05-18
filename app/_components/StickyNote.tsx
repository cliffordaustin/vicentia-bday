"use client";

import { motion, type PanInfo } from "framer-motion";
import { useState } from "react";
import { categoryMeta, type LoveNote } from "../_lib/things-i-love";

export default function StickyNote({
  note,
  x,
  y,
  rotate,
  focused,
  dimmed,
  onClick,
  constraintsRef,
}: {
  note: LoveNote;
  x: number;
  y: number;
  rotate: number;
  focused: boolean;
  dimmed: boolean;
  onClick: () => void;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const meta = categoryMeta[note.category];
  const [dragging, setDragging] = useState(false);
  const [moved, setMoved] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
    setMoved(false);
  };
  const handleDrag = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) + Math.abs(info.offset.y) > 4) {
      setMoved(true);
    }
  };
  const handleDragEnd = () => {
    setDragging(false);
    setTimeout(() => setMoved(false), 50);
  };

  return (
    <motion.button
      type="button"
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.15}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (!moved) onClick();
      }}
      whileHover={focused ? undefined : { scale: 1.06, rotate: 0 }}
      whileTap={focused ? undefined : { scale: 0.97 }}
      initial={{ opacity: 0, y: 20, rotate: rotate * 1.4 }}
      animate={{
        opacity: dimmed ? 0.25 : 1,
        scale: focused ? 1.4 : 1,
        rotate: focused ? 0 : rotate,
        x,
        y,
        zIndex: focused ? 50 : dragging ? 40 : 10,
        filter: dimmed ? "blur(2px)" : "blur(0px)",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        opacity: { duration: 0.4 },
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        background: meta.bg,
        color: meta.text,
        cursor: dragging ? "grabbing" : "grab",
        boxShadow:
          "0 12px 24px -8px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.4) inset",
      }}
      className="flex h-44 w-44 select-none flex-col justify-between rounded-sm p-4 text-left font-hand text-lg leading-snug sm:h-48 sm:w-48 sm:text-xl"
    >
      {/* Push pin */}
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full"
        style={{
          background: meta.pin,
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.5)",
        }}
      />
      <p className="break-words">{note.text}</p>
      <p
        className="text-[10px] uppercase tracking-[0.25em] opacity-60"
        style={{ color: meta.text }}
      >
        {meta.label}
      </p>
    </motion.button>
  );
}
