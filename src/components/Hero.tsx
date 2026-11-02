"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import avatarImage from "../../public/avatar-hero.png";
import { Reveal } from "@/components/Reveal";
import { site, socialLinks } from "@/data/site";

const role = site.headline;

const nameSize = "font-heading text-[clamp(4.5rem,20vw,18rem)] font-extrabold leading-none tracking-[-0.04em]";

// Mouse parallax: each layer moves a different amount, set from --mx / --my on the section.
const layer = (x: number, y: number) => ({
  transform: `translate3d(calc(var(--mx,0)*${x}px),calc(var(--my,0)*${y}px),0)`,
});
const layerClass = "transition-transform duration-300 ease-out will-change-transform";

// Name split so each letter can rise in, one orchestrated moment on load.
function Line({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="block overflow-hidden py-[0.06em] -my-[0.06em]" aria-hidden="true">
      {text.split("").map((char, i) => (
        <span key={i} className="hero-letter" style={{ ["--i" as string]: i + offset }}>
          {char}
        </span>
      ))}
    </span>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-[18px] w-[18px] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden bg-transparent px-6 pb-12 pt-24 font-display text-left md:px-12 lg:block lg:pb-0 lg:pt-0"
    >
      <style>{`
        @keyframes hero-rise { from { transform: translateY(105%); } to { transform: translateY(0); } }
        @keyframes hero-fade { from { opacity: 0; } to { opacity: 1; } }
        .hero-letter { display: inline-block; animation: hero-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--i, 0) * 70ms + 150ms); }
        .hero-echo { animation: hero-fade 1.2s ease 0.9s both; }
        @media (prefers-reduced-motion: reduce) { .hero-letter, .hero-echo { animation: none; } }
      `}</style>

      {/* Fine film grain for a less flat, more premium surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ── Stage ─────────────────────────────────────────────────── */}
      <div className="relative h-[54svh] lg:absolute lg:inset-0 lg:h-auto">
        {/* Ring + disc (furthest layer, moves most, opposite to the portrait) */}
        <div aria-hidden="true" className={`absolute inset-0 ${layerClass}`} style={layer(-22, -12)}>
          <div className="absolute bottom-0 left-1/2 aspect-square w-[min(125vw,880px)] -translate-x-1/2 translate-y-[34%] rounded-full border border-[rgba(128,0,32,0.45)] lg:translate-y-[24%]" />
          <div className="absolute bottom-0 left-1/2 aspect-square w-[min(92vw,700px)] -translate-x-1/2 translate-y-[28%] rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(128,0,32,0.9),rgba(128,0,32,0.12)_72%)] shadow-[0_0_120px_rgba(128,0,32,0.35)] light:opacity-60 lg:translate-y-[18%]" />
        </div>

        {/* Name: letters rise in, then an outlined echo fades in behind */}
        <div className="absolute inset-x-0 top-2 z-10 lg:top-[12svh]">
          <div className={`${layerClass}`} style={layer(14, 7)}>
            <div className={`relative text-center ${nameSize}`}>
              <div
                aria-hidden="true"
                className="hero-echo pointer-events-none absolute inset-0 translate-x-[0.035em] translate-y-[0.045em] select-none text-transparent [-webkit-text-stroke:1.5px_rgba(192,48,84,0.85)] light:[-webkit-text-stroke:1.5px_rgba(128,0,32,0.7)]"
              >
                Isha
                <br />
                Asif
              </div>
              <h1 className="relative text-cream">
                <span className="sr-only">Isha Asif</span>
                <Line text="Isha" />
                <Line text="Asif" offset={4} />
              </h1>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <Reveal
          delay={150}
          className="absolute inset-x-0 bottom-0 z-20 flex h-[92%] justify-center lg:h-[88svh]"
        >
          <div className={`h-full ${layerClass}`} style={layer(-8, -4)}>
            <Image
              src={avatarImage}
              alt="Isha Asif"
              priority
              className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
            />
          </div>
        </Reveal>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 z-30 hidden h-12 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/50 to-white/10 motion-safe:animate-pulse light:via-black/40 light:to-black/10 lg:block"
        />
      </div>

      {/* ── Intro block: role, bio and actions together ───────────── */}
      <div className="relative z-30 mt-8 lg:absolute lg:inset-x-12 lg:bottom-28 lg:mt-0">
        <div className="mx-auto w-full max-w-[1300px]">
          <div className="max-w-[400px]">
            <Reveal delay={250} className="border-l-2 border-[#800020] pl-5">
              <p className="text-xl font-semibold tracking-[-0.01em] text-cream md:text-2xl">Full Stack Developer</p>
              <p className="mt-1 text-sm text-muted">{role}</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                I build scalable web applications with modern front-end and back-end technologies.
              </p>
            </Reveal>

            <Reveal delay={320} className="mt-5 pl-5">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href="/cv.pdf"
                  download
                  className="group inline-flex items-center gap-2 border-b-2 border-[#800020] pb-1 text-[15px] font-semibold text-cream transition-colors duration-200 hover:border-[#c03054] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2415d]"
                >
                  Download CV
                  <DownloadIcon />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-[15px] font-semibold text-cream/70 transition-colors duration-200 hover:border-white/40 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2415d] light:hover:border-black/40"
                >
                  Contact me
                  <ArrowIcon className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Social icons (kept disabled, as in your version)
              <ul className="mt-5 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 p-2.5 opacity-70 transition-all duration-200 hover:border-[#800020] hover:bg-[rgba(128,0,32,0.2)] hover:opacity-100">
                      <img src={social.icon} alt="" className="h-full w-full object-contain" />
                    </a>
                  </li>
                ))}
              </ul>
              */}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}