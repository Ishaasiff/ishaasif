"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], label, select, summary';

/**
 * Minimal developer cursor: a monospace </> tag that tracks the pointer and
 * a solid ring that trails behind it, both in cream. Over links and buttons
 * the ring grows into a filled cream circle and the tag turns dark.
 */
export function TagCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const media = window.matchMedia("(min-width: 1025px) and (pointer: fine)");
    if (!media.matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0, ty = 0;       // pointer
    let dx = 0, dy = 0;       // dot
    let rx = 0, ry = 0;       // ring
    let dotScale = 1, ringScale = 1;
    let dotTarget = 1, ringTarget = 1;
    let frame = 0;

    const render = () => {
      const dotK = reduce ? 1 : 0.6;
      const ringK = reduce ? 1 : 0.16;

      dx += (tx - dx) * dotK;
      dy += (ty - dy) * dotK;
      rx += (tx - rx) * ringK;
      ry += (ty - ry) * ringK;
      dotScale += (dotTarget - dotScale) * 0.25;
      ringScale += (ringTarget - ringScale) * 0.2;

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${ringScale})`;

      const idle =
        Math.abs(tx - rx) < 0.1 &&
        Math.abs(ty - ry) < 0.1 &&
        Math.abs(ringTarget - ringScale) < 0.005 &&
        Math.abs(dotTarget - dotScale) < 0.005;
      frame = idle ? 0 : requestAnimationFrame(render);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const show = (visible: boolean) => {
      dot.style.opacity = ring.style.opacity = visible ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.style.opacity !== "1") {
        dx = rx = tx;
        dy = ry = ty;
        show(true);
      }
      wake();
    };

    const onOver = (e: MouseEvent) => {
      const hover = !!(e.target as Element).closest(INTERACTIVE);
      ring.dataset.filled = dot.dataset.filled = String(hover);
      ringTarget = hover ? 1.7 : 1;
      dotTarget = hover ? 1.2 : 1;
      wake();
    };

    const onDown = () => {
      ringTarget *= 0.8;
      wake();
    };
    const onUp = () => {
      ringTarget = ring.dataset.filled === "true" ? 1.7 : 1;
      wake();
    };
    const onLeave = () => show(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const base =
    "pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full opacity-0 transition-opacity duration-200 min-[1025px]:block";

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`${base} h-9 w-9 border-2 border-cream transition-colors data-[filled=true]:bg-cream`}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`${base} select-none font-mono text-[13px] font-bold leading-none tracking-tighter text-cream transition-colors data-[filled=true]:text-brand`}
      >
        {"</>"}
      </div>
    </>
  );
}