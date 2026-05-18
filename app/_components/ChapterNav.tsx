"use client";

import Link from "next/link";
import { getNext, getPrev } from "../_lib/chapters";

export default function ChapterNav({ slug }: { slug: string }) {
  const prev = getPrev(slug);
  const next = getNext(slug);

  return (
    <nav className="mt-16 flex items-center justify-between gap-4 text-sm">
      {prev ? (
        <Link
          href={prev.path}
          className="group flex flex-col gap-1 text-plum/50 transition hover:text-plum"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-plum/30">
            ← Previous chapter
          </span>
          <span className="font-[family-name:var(--font-hand)] text-2xl text-plum group-hover:text-plum">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.path}
          className="group ml-auto flex flex-col items-end gap-1 text-plum/50 transition hover:text-plum"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-plum/30">
            Next chapter →
          </span>
          <span className="font-[family-name:var(--font-hand)] text-2xl text-plum group-hover:text-plum">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
