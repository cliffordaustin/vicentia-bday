const BALLOON_COLORS = ["#FF3EA5", "#FFB3D1", "#FFD23F", "#9B5DE5", "#00F5D4"];

function hash(n: number, seed: number) {
  const x = Math.sin(n * 9301 + seed * 49297) * 233280;
  return x - Math.floor(x);
}

export default function FloatingBalloons({ count = 14 }: { count?: number }) {
  // Round all numeric style values - long floats serialize differently
  // between Next's SSR and the client and cause hydration mismatches.
  const r2 = (n: number) => n.toFixed(2);
  const balloons = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: r2(hash(i, 21) * 100),
    size: r2(18 + hash(i, 22) * 22),
    height: r2((18 + hash(i, 22) * 22) * 1.2),
    delay: r2(hash(i, 23) * 14),
    duration: r2(14 + hash(i, 24) * 10),
    drift: r2(-60 + hash(i, 25) * 120),
    color: BALLOON_COLORS[Math.floor(hash(i, 26) * BALLOON_COLORS.length)],
    sway: r2(8 + hash(i, 27) * 16),
    glow: r2((18 + hash(i, 22) * 22) * 0.6),
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={
            {
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.height}px`,
              background: `radial-gradient(circle at 30% 25%, #ffffffaa 0%, ${b.color}cc 40%, ${b.color} 70%)`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              "--drift": `${b.drift}px`,
              "--sway": `${b.sway}px`,
              "--string-color": b.color,
              boxShadow: `0 0 ${b.glow}px ${b.color}55`,
            } as React.CSSProperties
          }
        />
      ))}
      <style>{`
        .balloon {
          position: absolute;
          bottom: -10vh;
          border-radius: 50% 50% 48% 48% / 55% 55% 45% 45%;
          opacity: 0;
          animation-name: balloon-rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .balloon::before {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 5px solid var(--string-color);
        }
        .balloon::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--string-color), transparent);
          transform: translateX(-50%);
        }
        @keyframes balloon-rise {
          0%   { transform: translate3d(0, 0, 0); opacity: 0; }
          8%   { opacity: 0.9; }
          50%  { transform: translate3d(var(--sway), -55vh, 0); }
          92%  { opacity: 0.9; }
          100% { transform: translate3d(var(--drift), -120vh, 0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
