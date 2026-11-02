"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import avatarImage from "../../public/avatar-new.png";

/**
 * Arched portrait that tilts toward the cursor and catches a soft spotlight.
 * Pointer position is written straight to CSS variables (no React re-renders).
 * Touch input and reduced-motion users get the static version.
 */
export function AboutPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  }

  function handleLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      className="group relative mx-auto w-full max-w-[320px] [perspective:1000px] lg:max-w-[380px]"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div
        ref={cardRef}
        className="relative transition-transform duration-200 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] motion-reduce:transform-none"
      >
        {/* Offset burgundy outline: sits behind the photo to give depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-3xl border-2 border-burgundy transition-transform duration-300 group-hover:translate-x-5 group-hover:translate-y-5 motion-reduce:transition-none"
        />

        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-brand shadow-[0_20px_60px_-15px_rgba(128,0,32,0.7)] light:shadow-none">
          <Image
            src={avatarImage}
            alt="Isha Asif"
            fill
            priority
            sizes="(max-width: 1024px) 320px, 380px"
            className="object-cover"
          />

          {/* Burgundy wash that fades into the page at the base */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(128,0,32,0.35),transparent_45%)]"
          />

          {/* Cursor spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden bg-[radial-gradient(240px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.16),transparent_70%)]"
          />
        </div>
      </div>
    </div>
  );
}