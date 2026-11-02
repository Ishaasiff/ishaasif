import type { ReactNode } from "react";

/* Abstract line motifs, one per project (cycled). Drawn with currentColor. */
const dots = Array.from({ length: 25 }, (_, i) => ({
  x: 16 + (i % 5) * 32,
  y: 16 + Math.floor(i / 5) * 32,
}));

const motifs: ReactNode[] = [
  <>
    {[14, 34, 54, 74].map((r) => (
      <circle key={r} cx="80" cy="80" r={r} />
    ))}
  </>,
  <>
    {dots.map((d) => (
      <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="2.5" />
    ))}
  </>,
  <>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <line key={i} x1={i * 26 - 20} y1="160" x2={i * 26 + 60} y2="0" />
    ))}
  </>,
  <>
    <path d="M10 150 A140 140 0 0 1 150 10" />
    <path d="M10 150 A100 100 0 0 1 110 50" />
    <path d="M10 150 A60 60 0 0 1 70 90" />
  </>,
  <>
    {[30, 70, 110].map((y) => (
      <path key={y} d={`M0 ${y} Q20 ${y - 30} 40 ${y} T80 ${y} T120 ${y} T160 ${y}`} />
    ))}
  </>,
  <>
    {[0, 15, 30].map((angle) => (
      <rect
        key={angle}
        x="35"
        y="35"
        width="90"
        height="90"
        transform={`rotate(${angle} 80 80)`}
      />
    ))}
  </>,
];

export function ProjectMotif({ index, className }: { index: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
    >
      {motifs[index % motifs.length]}
    </svg>
  );
}