"use client";

import { useCallback, useState } from "react";

export function useUnlocked() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => setUnlocked(new Set()), []);
  const has = useCallback((id: string) => unlocked.has(id), [unlocked]);

  return { unlocked, unlock, reset, has, hydrated: true, count: unlocked.size };
}
