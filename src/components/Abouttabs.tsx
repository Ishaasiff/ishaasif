"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

const tabs = [
  {
    id: "who",
    label: "Who I am",
    body: [
      "Hi! I'm Isha Asif, a curious mind, a problem solver, and a passionate Software Engineering student who loves bringing ideas to life with code. From building sleek, responsive designs on the front end to powering them with strong and efficient back-end logic, I enjoy every step of the development journey.",
    ],
  },
  {
    id: "how",
    label: "How I build",
    body: [
      "I believe every project is a story waiting to be told and I'm here to write it in clean, scalable code.",
      "I am deeply committed to my work, investing creativity and precision into every project to ensure that each design is both aesthetically pleasing and functionally efficient.",
    ],
  },
  {
    id: "next",
    label: "Where I'm headed",
    body: [
      "When I'm not coding, you'll find me exploring new tools and ideas, always looking for ways to level up and create something even better.",
      "The ultimate goal? To become a Full Stack Developer who builds software that leaves a mark.",
    ],
  },
];

export function AboutTabs() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = tabs.length - 1;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(active === last ? 0 : active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(active === 0 ? last : active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(last);
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="About Isha"
        onKeyDown={handleKeyDown}
        className="flex flex-wrap gap-x-6 gap-y-2 border-b border-hairline"
      >
        {tabs.map((tab, index) => {
          const isActive = index === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              className={`relative cursor-pointer pb-3 font-display text-base font-semibold transition-colors duration-200 outline-none focus-visible:text-cream focus-visible:underline focus-visible:decoration-burgundy focus-visible:underline-offset-8 ${
                isActive ? "text-cream" : "text-muted/60 hover:text-cream"
              }`}
            >
              {tab.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-burgundy shadow-[0_0_12px_rgba(128,0,32,0.9)] transition-transform duration-300 motion-reduce:transition-none ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* All panels share one grid cell so the box keeps the height of the tallest one */}
      <div className="mt-6 grid">
        {tabs.map((tab, index) => {
          const isActive = index === active;
          return (
            <div
              key={tab.id}
              id={`${baseId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${tab.id}`}
              className={`col-start-1 row-start-1 space-y-4 font-body text-[17px] leading-relaxed text-muted ${
                isActive ? "animate-panel-in motion-reduce:animate-none" : "invisible"
              }`}
            >
              {tab.body.map((text) => (
                <p key={text} className="max-w-[60ch]">
                  {text}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}