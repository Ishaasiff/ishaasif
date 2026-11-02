"use client";

import { useId, useRef, type PointerEvent } from "react";

const RING_TEXT = "Let\u2019s build something that matters \u2022 ";

/**
 * Circular call to action ringed by slowly turning text. With a mouse, the
 * whole thing leans toward the cursor (magnetic pull) and settles back when
 * the cursor leaves. Touch and reduced-motion users get the static version.
 */
export function ContactCta({ href }: { href: string }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const pathId = `ring-${useId().replace(/:/g, "")}`;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const area = areaRef.current;
    const mover = moverRef.current;
    if (!area || !mover) return;

    const rect = area.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mover.style.setProperty("--tx", `${dx * 0.2}px`);
    mover.style.setProperty("--ty", `${dy * 0.2}px`);
  }

  function handleLeave() {
    const mover = moverRef.current;
    if (!mover) return;
    mover.style.setProperty("--tx", "0px");
    mover.style.setProperty("--ty", "0px");
  }

  return (
    <div
      ref={areaRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative grid h-[320px] w-[320px] max-w-full place-items-center"
    >
      <div
        ref={moverRef}
        className="relative h-[260px] w-[260px] transition-transform duration-300 ease-out [transform:translate3d(var(--tx,0px),var(--ty,0px),0)] motion-reduce:transform-none"
      >
        {/* Turning text ring */}
        <svg
          viewBox="0 0 260 260"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
        >
          <defs>
            <path
              id={pathId}
              d="M130,130 m-112,0 a112,112 0 1,1 224,0 a112,112 0 1,1 -224,0"
            />
          </defs>
          <text
            className="fill-muted/70 font-body text-[13px] font-semibold uppercase"
            textLength="700"
            lengthAdjust="spacing"
          >
            <textPath href={`#${pathId}`}>{RING_TEXT + RING_TEXT}</textPath>
          </text>
        </svg>

        {/* Soft halo */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/40 blur-[40px] light:hidden"
        />

        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="group absolute left-1/2 top-1/2 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border-2 border-burgundy bg-burgundy font-display text-base font-semibold text-on-accent shadow-[0_0_30px_rgba(128,0,32,0.6)] transition-[background-color,box-shadow,scale] duration-300 hover:scale-105 hover:bg-burgundy-hover hover:shadow-[0_0_20px_rgba(128,0,32,0.8),0_0_50px_rgba(128,0,32,0.45)] focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none"
        >
          Email me
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45 group-focus-visible:-rotate-45 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}