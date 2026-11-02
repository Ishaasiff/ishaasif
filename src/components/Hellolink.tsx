"use client";

import { useRef, type PointerEvent } from "react";

function Row({ filled }: { filled?: boolean }) {
  return (
    <span
      className={`flex items-center justify-between gap-6 text-[clamp(56px,13vw,200px)] leading-none ${
        filled
          ? "text-burgundy [-webkit-text-stroke:1.5px_#800020] [text-shadow:0_0_60px_rgba(128,0,32,0.8)]"
          : "text-transparent [-webkit-text-stroke:1.5px_var(--color-muted)]"
      }`}
    >
      <span className="font-display font-bold leading-[1.05] tracking-[-0.03em]">
        Say hello
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-500 ease-out group-hover:-rotate-45 group-focus-visible:-rotate-45 motion-reduce:transition-none"
        fill="none"
        stroke={filled ? "#800020" : "var(--color-muted)"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

/**
 * A giant outlined "Say hello" link. A burgundy filled copy sits on top and is
 * revealed only inside a soft circle that follows the cursor, so the letters
 * seem to light up where you point. Touch and keyboard users get the filled
 * version straight away.
 */
export function HelloLink({ href }: { href: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const link = linkRef.current;
    if (!link) return;
    const rect = link.getBoundingClientRect();
    link.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    link.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onPointerMove={handleMove}
      className="group relative block select-none outline-none"
    >
      <Row />

      {/* Filled copy, revealed under the cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block opacity-0 transition-opacity duration-300 [mask-image:radial-gradient(circle_240px_at_var(--mx,50%)_var(--my,50%),black_35%,transparent_100%)] group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-visible:[mask-image:none] pointer-coarse:opacity-100 pointer-coarse:[mask-image:none] motion-reduce:transition-none"
      >
        <Row filled />
      </span>

      {/* Neon rule draws in on hover or focus */}
      <span
        aria-hidden="true"
        className="mt-4 block h-[2px] w-full origin-left scale-x-[0.12] bg-[linear-gradient(to_right,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.55)] transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 pointer-coarse:scale-x-100 motion-reduce:transition-none"
      />

      <span className="sr-only">Email me (opens in a new tab)</span>
    </a>
  );
}