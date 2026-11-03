"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollToHash, setLenis } from "@/components/scrollTo";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Handle in-page anchor links through Lenis
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (id && id.length > 1) {
        // getElementById rather than querySelector: ids are plain, and this
        // avoids blowing up on a hash that would not parse as a selector.
        if (scrollToHash(id.slice(1))) {
          e.preventDefault();
          history.replaceState(null, "", id);
        }
      }
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
