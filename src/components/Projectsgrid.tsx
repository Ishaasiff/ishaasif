"use client";

import Link from "next/link";
import { ProjectMotif } from "@/components/ProjectMotif";
import { projects } from "@/data/projects";

/** Bento layout on a 4-column grid: which tiles get extra room, by project count. */
function spanFor(count: number, index: number) {
  const big = "lg:col-span-2 lg:row-span-2";
  const wide = "lg:col-span-2";
  if (count === 1) return "lg:col-span-4";
  if (count === 2) return wide;
  if (count === 3) return index === 0 ? big : wide;
  if (count === 4) return index === 0 ? big : index === 3 ? wide : "";
  if (count === 5) return index === 0 ? big : "";
  if (count === 6) return index === 0 ? big : index === 3 ? wide : index >= 4 ? wide : "";
  if (count === 7) return index === 0 ? big : index >= 5 ? wide : "";
  if (count === 8) return index === 0 ? big : index === 7 ? wide : "";
  return index === 0 ? big : "";
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** The project cards. Used by the /projects page and by the home page section. */
export function ProjectsGrid() {
  const count = projects.length;

  return (
    <div className="grid auto-rows-[minmax(300px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {projects.map((project, index) => {
        const isBig = index === 0 && count > 2;
        const isLive = Boolean(project.liveUrl);

        return (
          <article
            key={project.slug}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-hairline bg-brand px-6 pb-6 pt-20 transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-burgundy/70 hover:shadow-[0_24px_50px_-18px_rgba(128,0,32,0.75)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:px-8 md:pb-7 ${spanFor(
              count,
              index,
            )}`}
          >
            {/* Whole-card link to the detail page, sitting under the content */}
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-[1] rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
            >
              <span className="sr-only">View details: {project.title}</span>
            </Link>

            {/* Top row: number and status */}
            <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-3 font-display text-sm md:left-8 md:top-8">
              <span className="font-semibold tabular-nums text-muted/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-5 bg-hairline" />
              <span className="inline-flex items-center gap-2 text-muted">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    isLive
                      ? "bg-burgundy shadow-[0_0_10px_rgba(192,48,84,0.9)]"
                      : "bg-muted/40"
                  }`}
                />
                {isLive ? "Live" : "In progress"}
              </span>
            </div>

            {/* Line motif: brightens and turns slightly on hover */}
            <ProjectMotif
              index={index}
              className={`pointer-events-none absolute right-4 top-4 origin-center text-burgundy opacity-40 transition-[opacity,transform] duration-700 ease-out group-hover:rotate-6 group-hover:scale-110 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:transform-none ${
                isBig ? "h-56 w-56 md:h-64 md:w-64" : "h-24 w-24 md:h-28 md:w-28"
              }`}
            />

            <div className="pointer-events-none relative z-[2]">
              <h3
                className={`font-heading font-bold leading-[1.1] tracking-[-0.02em] text-cream ${
                  isBig ? "text-[34px] md:text-[54px]" : "text-[26px] md:text-[30px]"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`mt-3 max-w-[46ch] font-body text-[15px] leading-[1.7] text-muted ${
                  isBig ? "" : "line-clamp-4"
                }`}
              >
                {project.description}
              </p>

              {/* Actions: text links, matching the hero */}
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-hairline pt-4">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/live pointer-events-auto inline-flex items-center gap-2 border-b-2 border-burgundy pb-0.5 font-body text-[15px] font-semibold text-cream outline-none transition-colors duration-300 hover:border-[#c03054] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none"
                  >
                    Live site
                    <ExternalIcon />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-muted/50"
                  >
                    Not live yet
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-3 font-display text-[15px] font-semibold text-cream/70 transition-colors duration-300 group-hover:text-cream"
                >
                  Details
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-hairline transition-[background-color,border-color,box-shadow] duration-300 group-hover:border-burgundy group-hover:bg-burgundy group-hover:shadow-[0_0_20px_rgba(128,0,32,0.8)] motion-reduce:transition-none">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45 motion-reduce:transition-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </div>
            </div>

            {/* Neon rule draws in on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[linear-gradient(to_right,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.7)] transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </article>
        );
      })}
    </div>
  );
}