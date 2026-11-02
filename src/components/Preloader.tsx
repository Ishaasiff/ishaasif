"use client";

import { useEffect, useState } from "react";
import { Bodoni_Moda } from "next/font/google";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: "400" });

// ====== EDIT THESE ======
const NAME = "Isha Asif";
const TAGLINE = "Software Engineer and Web Developer";
const DURATION = 1300; // ms for the counter to reach 100%
const SHOW_ONCE_PER_SESSION = false;
// ========================

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (SHOW_ONCE_PER_SESSION && sessionStorage.getItem("seen-intro")) {
      setGone(true);
      return;
    }

    document.body.style.overflow = "hidden"; // lock scroll while loading

    const start = performance.now();
    let raf = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 2); // fast start, slow finish
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        t1 = setTimeout(() => {
          setLeaving(true); // slide the overlay up
          document.body.style.overflow = "";
          sessionStorage.setItem("seen-intro", "1");
          t2 = setTimeout(() => setGone(true), 550); // unmount after the slide
        }, 225);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1b1a1d] text-[#f4efe6]
        transition-transform duration-[550ms] ease-[cubic-bezier(.77,0,.18,1)]
        ${leaving ? "-translate-y-full" : "translate-y-0"}`}
    >
      {/* Self-contained keyframes: no Tailwind config needed */}
      <style>{`
        .pl-rise { transform: translateY(110%); animation: pl-rise .65s cubic-bezier(.2,.8,.2,1) forwards; }
        .pl-fade { opacity: 0; animation: pl-fade .55s ease .7s forwards; }
        @keyframes pl-rise { to { transform: translateY(0); } }
        @keyframes pl-fade { to { opacity: 1; } }
      `}</style>

      {/* Name: each letter slides up out of its own mask */}
      <h1
        className={`${bodoni.className} flex whitespace-pre text-[clamp(3rem,9vw,7.5rem)] leading-[1.1] tracking-tight`}
      >
        {[...NAME].map((char, i) => (
          <span key={i} className="inline-block overflow-hidden py-[0.08em]">
            <span
              className="pl-rise inline-block"
              style={{ animationDelay: `${i * 52}ms` }}
            >
              {char}
            </span>
          </span>
        ))}
      </h1>

      {/* Tagline fades in after the name */}
      <p className="pl-fade mt-6 text-[.95rem] tracking-wide text-[#8d8a90]">
        {TAGLINE}
      </p>

      {/* Progress line + percentage */}
      <div className="relative mt-10 h-px w-[min(240px,60vw)] bg-[#3a383d]">
        <div
          className="absolute inset-y-0 left-0 bg-[#c9534a]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-3 text-[.8rem] tabular-nums text-[#cfcac2]">
        {progress}%
      </span>
    </div>
  );
}