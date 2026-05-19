const COLORS = ["#60A5FA", "#3B82F6", "#1D4ED8", "#7DD3FC", "#0EA5E9", "#A5B4FC"];

// Deterministic pseudo-random so SSR and client render identically and we don't
// need any effect / state. Seeded by index - same output every render.
function hash(n: number, seed: number) {
  const x = Math.sin(n * 9301 + seed * 49297) * 233280;
  return x - Math.floor(x);
}

export default function AmbientSparkles({ count = 24 }: { count?: number }) {
  // Round all floats - long decimals serialize differently between
  // Next's SSR and the client and cause hydration mismatches.
  const r2 = (n: number) => n.toFixed(2);
  const sparkles = Array.from({ length: count }, (_, i) => {
    const sizeNum = 2 + hash(i, 1) * 4;
    const color = COLORS[Math.floor(hash(i, 5) * COLORS.length)];
    return {
      id: i,
      left: r2(hash(i, 2) * 100),
      top: r2(hash(i, 3) * 100),
      size: r2(sizeNum),
      glow: r2(sizeNum * 3),
      delay: r2(hash(i, 4) * 6),
      duration: r2(3 + hash(i, 6) * 4),
      color,
    };
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${s.glow}px ${s.color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      <style>{`
        .sparkle {
          animation-name: sparkle-twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0;
        }
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50%      { opacity: 0.9; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
