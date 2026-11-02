"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/data/site";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const previousScroll = useRef(0);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(navLinks[0]?.id ?? "");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [progress, setProgress] = useState(0);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const applyTheme = (value: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.toggle("light", value === "light");
    root.classList.toggle("dark", value === "dark");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const currentTheme = stored === "light" ? "light" : "dark";
    setTheme(currentTheme);
    applyTheme(currentTheme);
    if (!stored) localStorage.setItem("theme", "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  /* Hide while scrolling down, show while scrolling up; add a backdrop once scrolled. */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > previousScroll.current && current > 80);
      setScrolled(current > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(current / max, 1) : 0);
      previousScroll.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile menu on outside click or Escape. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* Slide the highlight under the active link (desktop only). */
  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeId];
      setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId]);

  /* Highlight the section currently in view. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2415d]";

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-[1000] px-4 pt-4 transition-transform duration-300 ease-out md:px-8"
      style={{ transform: hidden && !menuOpen ? "translateY(-130%)" : "translateY(0)" }}
    >
      <nav
        ref={navRef}
        id="navbar"
        aria-label="Main"
        className={`pointer-events-auto relative mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 md:px-5 ${
          scrolled
            ? "border-white/10 bg-[rgba(14,9,11,0.78)] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] light:border-black/10 light:bg-[rgba(255,255,255,0.8)] light:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.2)]"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          id="logo"
          href="#home"
          className={`flex items-center gap-2.5 rounded-lg font-display text-xl font-bold tracking-[-0.02em] text-cream md:text-[1.35rem] ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-[3px] bg-[#800020] shadow-[0_0_12px_rgba(128,0,32,0.9)]"
          />
          {site.name}
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Links: dropdown panel on mobile, inline row on desktop */}
          <div className="static md:relative">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute top-0 -z-10 hidden h-full rounded-lg bg-[rgba(128,0,32,0.3)] transition-all duration-300 ease-out md:block ${
                indicator ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: indicator?.left ?? 0, width: indicator?.width ?? 0 }}
            />
          <ul
            className={`absolute inset-x-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-2xl border border-white/10 bg-[rgba(14,9,11,0.94)] p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-200 light:border-black/10 light:bg-[rgba(255,255,255,0.96)] light:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] md:static md:visible md:translate-y-0 md:flex-row md:gap-1 md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:shadow-none md:backdrop-blur-none md:light:bg-transparent ${
              menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;

              return (
                <li key={link.id}>
                  <a
                    ref={(el) => {
                      linkRefs.current[link.id] = el;
                    }}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 md:py-2 ${focusRing} ${
                      isActive
                        ? "text-cream max-md:bg-[rgba(128,0,32,0.3)]"
                        : "text-cream/70 hover:bg-white/5 hover:text-cream light:hover:bg-black/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-cream transition-colors duration-200 hover:border-[#800020] hover:bg-[rgba(128,0,32,0.2)] light:border-black/10 ${focusRing}`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger morphs into an X */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((open) => !open);
            }}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 md:hidden light:border-black/10 ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className={`absolute h-[2px] w-5 rounded-full bg-cream transition-transform duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-[2px] w-5 rounded-full bg-cream transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-[2px] w-5 rounded-full bg-cream transition-transform duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
        </div>

        {/* Scroll progress */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-5 bottom-0 h-[2px] origin-left rounded-full bg-[#c03054] transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </nav>
    </header>
  );
}