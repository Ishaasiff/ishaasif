type Column = {
  x: number;
  header: string;
  accent?: boolean;
  items: [title: string, sub: string][];
};

const COLUMNS: Column[] = [
  {
    x: 70,
    header: "Source",
    items: [
      ["Page routes", "8 server pages"],
      ["Scroll input", "Lenis, rAF"],
      ["Data modules", "Typed arrays"],
      ["No backend", "No API, no DB"],
    ],
  },
  {
    x: 275,
    header: "Runtime",
    items: [
      ["Sections", "72 components"],
      ["Reveal", "Scroll sets --p"],
      ["Search matcher", "Fuzzy scoring"],
      ["Gmail compose", "Contact hand-off"],
    ],
  },
  {
    x: 480,
    header: "Output",
    accent: true,
    items: [
      ["Static HTML", "Prerendered"],
      ["CSS motion", "Fade, translate"],
      ["Search overlay", "Cmd/Ctrl+K"],
    ],
  },
];

const ROW_Y = [60, 140, 220, 300];
const BOX_W = 130;
const BOX_H = 56;

const STATS: [value: string, label: string][] = [
  ["8", "Routes"],
  ["70+", "Components"],
  ["100%", "Prerendered"],
  ["0", "Backend services"],
];

const ROLE: { label: string; body: string }[] = [
  {
    label: "Product & content",
    body: "Defined the page architecture and conversion flow, and wrote and structured all service copy, case-study content, and calls to action.",
  },
  {
    label: "Visual design",
    body: "Established the design language across typography, colour, spacing, and component states.",
  },
  {
    label: "Frontend architecture",
    body: "Built the entire Next.js App Router codebase, the shared page shell, the reusable section and primitive system, and the typed content layer.",
  },
  {
    label: "Interaction & motion design",
    body: "Authored all scroll choreography, hover states, transitions, counters, and micro-interactions, including the reduced-motion fallbacks.",
  },
  {
    label: 'Illustration / "3D"',
    body: 'Designed and hand-built every 3D visual with CSS transforms, gradients, and SVG — server racks, phones, laptops, property models, and the VR/AR scenes — with no WebGL or 3D engine.',
  },
  {
    label: "Search",
    body: "Designed the search index, the ranking algorithm, and the command-palette UI.",
  },
];

const HIGHLIGHTS: { title: string; body: string }[] = [
  {
    title: "Scroll-scrubbed reveals",
    body: "Content animates from scroll position rather than firing once on entry. It lifts in as you scroll down and reverses when you scroll up, with one shared rAF-throttled listener driving every reveal on the page.",
  },
  {
    title: "Real search, no library",
    body: "A hand-written index and fuzzy ranking sit behind a command palette opened with Cmd/Ctrl+K — no search library and no server.",
  },
  {
    title: "Smooth scrolling that survives navigation",
    body: "A single Lenis instance, globally intercepted anchors, and shared scroll logic for nav, CTAs, and search results, including cross-route hash jumps.",
  },
  {
    title: "CSS-only 3D",
    body: "Server racks, phones, laptops, and glass property models built with perspective, preserve-3d, and translateZ, with spring-smoothed pointer tilt. No WebGL.",
  },
  {
    title: "Portfolio as an interface",
    body: "A featured-card grid plus an expanding accordion gallery where panels widen on hover, tap, or focus, images shift from grayscale to colour, and the same component adapts to vertical stacking on mobile.",
  },
  {
    title: "An interactive service explorer",
    body: "Auto-advancing tabs with a progress bar that pauses on hover or focus, arrow-key support, and a cross-fading detail panel.",
  },
  {
    title: "Motion with discipline",
    body: "CSS keyframes, Framer Motion, GSAP, and scroll-linked values working together, all animating transform and opacity only, all with prefers-reduced-motion fallbacks.",
  },
  {
    title: "Contact without a backend",
    body: "The enquiry form composes a pre-filled Gmail draft in a new tab, falls back to the same tab if blocked, and keeps the visitor on the page either way.",
  },
];

const TECH_STACK: { name: string; use: string }[] = [
  {
    name: "Next.js 16 (App Router)",
    use: "Routing for all pages, static generation of every route, per-page metadata, next/font, next/image",
  },
  {
    name: "React 19",
    use: "Component model; server components for page structure, client components only for interactive islands",
  },
  {
    name: "TypeScript (strict)",
    use: "Typed content models (projects, tech, search entries, nav), safer refactors across 70+ components",
  },
  {
    name: "Tailwind CSS v4",
    use: "Entire visual system via utilities; CSS-first @theme tokens; responsive layout and arbitrary-value brand styling",
  },
  {
    name: "Framer Motion",
    use: "Page and section entrances, AnimatePresence, scroll-driven transforms, spring-based pointer tilt, animated counters",
  },
  {
    name: "Lenis",
    use: "Smooth wheel scrolling and programmatic anchor scrolling via a shared instance",
  },
  {
    name: "GSAP",
    use: "Timeline-driven glitch stat-card sequence with a synthetic cursor",
  },
  {
    name: "CSS 3D + SVG",
    use: 'All "3D" scenes and illustrations (perspective, preserve-3d, gradients, inline SVG) — no 3D library',
  },
  {
    name: "Inter and Poppins (via next/font)",
    use: "Self-hosted, preloaded brand typefaces with no layout shift",
  },
  {
    name: "PostCSS",
    use: "Tailwind pipeline",
  },
  {
    name: "ESLint",
    use: "Code quality and Next.js rules",
  },
  {
    name: "Vercel",
    use: "Deployment target, compatible with the fully static output",
  },
];

function SectionHeading({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-cream">
      <span className="mr-3 text-base font-semibold tabular-nums text-muted/60">{number}</span>
      {children}
    </h3>
  );
}

function InnovativeDiagramSvg() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 680 400"
        role="img"
        aria-label="Static Next.js site architecture. Page routes render section components into prerendered static HTML. Scroll input drives Reveal and CSS motion. Data modules feed a client-side search overlay. There is no backend, so contact hands off to Gmail compose."
        className="mx-auto h-auto w-full min-w-[560px] max-w-[680px]"
      >
        <style>{`
          @keyframes site-flow { to { stroke-dashoffset: -20; } }
          .site-flow { animation: site-flow 0.9s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .site-flow { animation: none; } }
        `}</style>

        <defs>
          <marker id="site-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="site-arrow-burgundy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#800020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {COLUMNS.map((col) => (
          <g key={col.header}>
            <text x={col.x} y={36} fontSize={12} className="fill-muted font-body">
              {col.header}
            </text>

            {col.items.map(([title, sub], row) => {
              const y = ROW_Y[row];
              const dashed = !col.accent && row === 3;
              return (
                <g key={title}>
                  <rect
                    x={col.x}
                    y={y}
                    width={BOX_W}
                    height={BOX_H}
                    rx={8}
                    strokeWidth={1}
                    strokeDasharray={dashed ? "4 3" : undefined}
                    className={
                      col.accent
                        ? "fill-burgundy/15 stroke-burgundy"
                        : "fill-surface stroke-hairline"
                    }
                  />
                  <text
                    x={col.x + BOX_W / 2}
                    y={y + 19}
                    fontSize={14}
                    fontWeight={500}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-cream font-display"
                  >
                    {title}
                  </text>
                  <text
                    x={col.x + BOX_W / 2}
                    y={y + 38}
                    fontSize={12}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-muted font-body"
                  >
                    {sub}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        {COLUMNS.slice(0, -1).map((col, i) => {
          const next = COLUMNS[i + 1];
          const accent = next.accent;
          return col.items.slice(0, Math.max(next.items.length, 4)).map((_, row) => {
            if (!accent && row >= col.items.length) return null;
            if (accent && row >= next.items.length) return null;
            const y = ROW_Y[row] + BOX_H / 2;
            const dim = row === 3;
            return (
              <line
                key={`${col.header}-${row}`}
                x1={col.x + BOX_W}
                y1={y}
                x2={next.x - 4}
                y2={y}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="6 4"
                opacity={dim ? 0.45 : 1}
                style={dim ? { animationDuration: "1.8s" } : undefined}
                markerEnd={`url(#site-arrow-${accent ? "burgundy" : "gray"})`}
                className={`site-flow ${accent ? "stroke-burgundy" : "stroke-muted/60"}`}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}

export function InnovativeDiagram() {
  return (
    <div>
      {/* Architecture diagram */}
      <section aria-label="Innovative Widget static site architecture diagram">
        <div className="mt-8">
          <InnovativeDiagramSvg />
        </div>
      </section>

      {/* Case study description */}
      <div className="mt-16 space-y-14">
        <section aria-labelledby="innovative-overview">
          <SectionHeading number="01">
            <span id="innovative-overview">Project overview</span>
          </SectionHeading>
          <div className="mt-5 max-w-[65ch] space-y-4 font-body text-lg leading-relaxed text-muted">
            <p>
              Innovative Widget is a production marketing site for a Karachi-based digital
              agency. It is a custom-built, fully static marketing site rather than a template: a
              dark, motion-led brand experience with eight pages, interactive service explorers,
              CSS-built 3D scenes, a client-side command-palette search, and an animated
              portfolio.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-hairline bg-surface p-4">
                <dt className="font-body text-xs uppercase tracking-[0.14em] text-muted/60">
                  {label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold leading-none text-cream">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="innovative-role">
          <SectionHeading number="02">
            <span id="innovative-role">My role</span>
          </SectionHeading>
          <p className="mt-5 max-w-[65ch] font-body text-lg leading-relaxed text-muted">
            <strong className="font-semibold text-cream">
              Sole designer and developer — I built everything end to end.
            </strong>
          </p>
          <ul className="mt-5 max-w-[65ch] space-y-3 font-body text-lg leading-relaxed text-muted">
            {ROLE.map((item) => (
              <li key={item.label}>
                <span className="font-semibold text-cream">{item.label}:</span> {item.body}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="innovative-highlights">
          <SectionHeading number="03">
            <span id="innovative-highlights">What makes it interesting</span>
          </SectionHeading>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-hairline bg-surface p-5 transition-[border-color] duration-300 hover:border-burgundy/70 motion-reduce:transition-none"
              >
                <p className="font-display text-lg font-semibold leading-snug text-cream">
                  {item.title}
                </p>
                <p className="mt-2 font-body text-base leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="innovative-stack">
          <SectionHeading number="04">
            <span id="innovative-stack">Tech stack</span>
          </SectionHeading>
          <ul className="mt-5 max-w-[65ch] space-y-3 font-body text-lg leading-relaxed text-muted">
            {TECH_STACK.map((tech) => (
              <li key={tech.name}>
                <span className="font-semibold text-cream">{tech.name}</span> — {tech.use}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[65ch] border-l-2 border-burgundy pl-4 font-body text-base italic leading-relaxed text-muted">
            Every route is prerendered at build time. The only dynamic behaviour is client-side:
            search, motion, and the Gmail hand-off from the contact form.
          </p>
        </section>
      </div>
    </div>
  );
}
