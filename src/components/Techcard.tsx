"use client";

import type { MouseEvent, ReactNode } from "react";

type TechCardProps = {
  name: string;
  /** Short text badge, or pass a ReactNode (e.g. an SVG / react-icons icon) */
  icon: ReactNode;
};

/**
 * Technology card with a cursor-following burgundy spotlight.
 * Client component only because of the mouse tracking.
 */
export function TechCard({ name, icon }: TechCardProps) {
  const handleMove = (e: MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <li
      onMouseMove={handleMove}
      className="group relative flex min-h-[88px] items-center gap-3 overflow-hidden rounded-xl border border-hairline bg-surface p-4 transition-all duration-500 hover:-translate-y-1 hover:border-burgundy/70 hover:shadow-[0_10px_34px_rgba(128,0,32,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Spotlight that follows the cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), rgba(128,0,32,0.22), transparent 70%)",
        }}
      />

      {/* Icon badge */}
      <span
        aria-hidden="true"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-burgundy/30 bg-burgundy/[0.08] font-mono text-sm font-bold text-burgundy transition-all duration-500 group-hover:rotate-[-4deg] group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-white motion-reduce:group-hover:rotate-0"
      >
        {icon}
      </span>

      {/* Name */}
      <span className="relative font-body text-[15px] font-semibold leading-tight text-cream transition-colors duration-300 group-hover:text-white">
        {name}
      </span>

      {/* Arrow that slides in on hover */}
      <span
        aria-hidden="true"
        className="relative ml-auto -translate-x-2 font-mono text-sm text-burgundy opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
      >
        ↗
      </span>

      {/* Underline sweep */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-burgundy transition-all duration-500 group-hover:w-full"
      />
    </li>
  );
}