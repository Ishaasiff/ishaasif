"use client";

import type Lenis from "lenis";

/**
 * Shared handle on the single Lenis instance.
 *
 * SmoothScroll owns the instance but other components need to drive it (in-page
 * anchors, search results), and the instance is created inside an effect so it
 * cannot simply be imported. Keeping it here avoids a second rAF loop or a
 * `window` global.
 */
let instance: Lenis | null = null;

/** Hash to scroll to once the destination route has finished rendering. */
let pendingHash: string | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/** Remember a hash to honour after the next client-side navigation completes. */
export const setPendingHash = (hash: string) => {
  pendingHash = hash;
};

/** Read and clear the queued hash. */
export const consumePendingHash = () => {
  const hash = pendingHash;
  pendingHash = null;
  return hash;
};

/**
 * Smooth-scrolls to an element id using Lenis, so hash jumps animate the same way
 * everywhere on the site. Falls back to native scrolling before Lenis mounts.
 * Returns false when no element carries that id on the current page.
 */
export const scrollToHash = (hash: string) => {
  const target = document.getElementById(hash);
  if (!target) return false;
  if (instance) instance.scrollTo(target, { offset: 0, duration: 1.2 });
  else target.scrollIntoView({ behavior: "smooth" });
  return true;
};

/**
 * Splits a href into its path and hash, e.g. "/ssd-hosting#pricing".
 * The path defaults to "/" when the href is a bare hash.
 */
export const splitHref = (href: string) => {
  const [path, hash] = href.split("#");
  return { path: path || "/", hash: hash ?? "" };
};