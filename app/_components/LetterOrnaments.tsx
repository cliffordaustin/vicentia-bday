"use client";

// Reusable hand-drawn ornaments for the letter page.

export function WashiTape({
  className = "",
  rotate = -6,
  color = "#FF3EA5",
}: {
  className?: string;
  rotate?: number;
  color?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-7 w-28 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: `repeating-linear-gradient(45deg, ${color}aa 0 8px, ${color}66 8px 16px)`,
        boxShadow:
          "0 2px 6px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.25)",
      }}
    />
  );
}

export function WavyUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="relative inline-block"
      style={{ paddingBottom: "0.25em" }}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-2 w-full"
      >
        <path
          d="M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4"
          fill="none"
          stroke="#FF3EA5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function MarginDoodle({
  type,
  className = "",
  rotate = 0,
}: {
  type: "heart" | "star" | "swirl";
  className?: string;
  rotate?: number;
}) {
  const stroke = "#C4365D";
  if (type === "heart") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`pointer-events-none absolute h-6 w-6 ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <path
          d="M12 21s-7-4.5-9.5-9C0.6 8 3 4 6.5 4c2 0 3.5 1.2 5.5 3.2C14 5.2 15.5 4 17.5 4 21 4 23.4 8 21.5 12c-2.5 4.5-9.5 9-9.5 9z"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`pointer-events-none absolute h-6 w-6 ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <path
          d="M12 3 L14 10 L21 10 L15.5 14 L17.5 21 L12 17 L6.5 21 L8.5 14 L3 10 L10 10 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 12"
      className={`pointer-events-none absolute h-3 w-10 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M1 6 Q 5 1, 9 6 T 17 6 T 25 6 T 31 6"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OrnamentDivider() {
  return (
    <div
      aria-hidden
      className="my-10 flex items-center justify-center gap-3 text-plum/40"
    >
      <span className="h-px w-16 bg-current" />
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-16 bg-current" />
    </div>
  );
}

export function SignatureFlourish() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 40"
      className="mt-2 h-6 w-44"
    >
      <path
        d="M2 28 Q 30 6, 60 24 T 120 22 Q 150 4, 188 26"
        fill="none"
        stroke="#FF3EA5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M150 18 q 3 -4 7 -2 q 4 2 0 6 q -3 3 -8 -1"
        fill="none"
        stroke="#FF3EA5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaperClip() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 80"
      className="h-20 w-10"
    >
      <path
        d="M14 8 Q 14 4 18 4 Q 22 4 22 8 L22 60 Q 22 70 16 70 Q 8 70 8 60 L8 22 Q 8 14 16 14 Q 24 14 24 22 L24 56"
        fill="none"
        stroke="#9ba3b3"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
