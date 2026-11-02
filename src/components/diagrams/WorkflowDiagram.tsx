type Column = {
  x: number;
  header: string;
  accent?: boolean;
  items: [title: string, sub: string][];
};

const COLUMNS: Column[] = [
  {
    x: 70,
    header: "Entry",
    items: [
      ["FastAPI", "Routes, /health"],
      ["JWT auth", "Access, refresh"],
      ["Invite tokens", "Invite, reset"],
      ["Alembic", "Versioned schema"],
    ],
  },
  {
    x: 275,
    header: "Logic",
    items: [
      ["Controllers", "Business rules"],
      ["RBAC checks", "Org, project roles"],
      ["Email sender", "app/core/email"],
      ["Migrations", "upgrade head"],
    ],
  },
  {
    x: 480,
    header: "Data and services",
    accent: true,
    items: [
      ["PostgreSQL", "Multi-tenant"],
      ["Activity logs", "Audit trail"],
      ["SMTP email", "Invites, resets"],
    ],
  },
];

const ROW_Y = [60, 140, 220, 300];
const BOX_W = 130;
const BOX_H = 56;

const KEY_DECISIONS: { title: string; body: string }[] = [
  {
    title: "Relational data model over document store",
    body: "I chose PostgreSQL with SQLAlchemy because projects, tasks, subtasks, assignees, teams, and permissions all have complex relationships. This made reporting (burndown, workload, org overviews) far simpler and more reliable than trying to denormalize everything in a document DB.",
  },
  {
    title: "Multi-tenancy with strict scoping",
    body: "Every resource is scoped to an organization to enforce data isolation, with role-based access control to prevent over-permissioning. The trade-off is more complex queries, but it's critical for any tool serving multiple companies.",
  },
  {
    title: "Flexibility where it matters",
    body: "I made task statuses customizable per project (since every team tracks work differently) while keeping core entities structured. This balances flexibility with the ability to still aggregate progress and generate reports.",
  },
  {
    title: "Auditability built-in",
    body: "Activity logs were added to track changes across the system, giving organizations accountability without needing to bolt on external tooling.",
  },
  {
    title: "Async-first API",
    body: "Built with FastAPI and SQLAlchemy async to keep the API responsive as usage scales, trading a bit of ORM complexity for better concurrency.",
  },
];

const TECH_STACK: { name: string; use: string }[] = [
  { name: "FastAPI", use: "Fast, async Python API with automatic OpenAPI docs for easy integration." },
  { name: "SQLAlchemy 2 (async)", use: "Clean ORM that handles complex relational models and async DB access." },
  { name: "PostgreSQL + asyncpg", use: "Reliable, ACID-compliant DB well-suited for relational data and reporting queries." },
  { name: "Alembic", use: "Version-controlled schema migrations to safely evolve the DB over time." },
  { name: "JWT + bcrypt", use: "Stateless auth with secure password hashing." },
];

function WorkflowDiagramSvg() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 680 400"
        role="img"
        aria-label="Workflow backend architecture. FastAPI routes to controllers and PostgreSQL. JWT auth leads to RBAC checks and activity logs. Invite tokens lead to the email sender and SMTP email. Alembic migrations are a supporting step."
        className="mx-auto h-auto w-full min-w-[560px] max-w-[680px]"
      >
        <style>{`
          @keyframes workflow-flow { to { stroke-dashoffset: -20; } }
          .workflow-flow { animation: workflow-flow 0.9s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .workflow-flow { animation: none; } }
        `}</style>

        <defs>
          <marker id="workflow-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="workflow-arrow-burgundy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
                markerEnd={`url(#workflow-arrow-${accent ? "burgundy" : "gray"})`}
                className={`workflow-flow ${accent ? "stroke-burgundy" : "stroke-muted/60"}`}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}

function SectionHeading({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-cream">
      <span className="mr-3 text-base font-semibold tabular-nums text-muted/60">{number}</span>
      {children}
    </h3>
  );
}

export function WorkflowDiagram() {
  return (
    <div>
      {/* Architecture diagram */}
      <section aria-label="Workflow backend architecture diagram">
        <div className="mt-8">
          <WorkflowDiagramSvg />
        </div>
      </section>

      {/* Case study description */}
      <div className="mt-16 space-y-14">
        <section aria-labelledby="workflow-summary">
          <SectionHeading number="01">
            <span id="workflow-summary">One-line summary and my role</span>
          </SectionHeading>
          <p className="mt-5 max-w-[65ch] font-body text-lg leading-relaxed text-muted">
            <strong className="font-semibold text-cream">
              Built Workflow, a multi-tenant work management API
            </strong>{" "}
            that helps organizations replace ad-hoc task tracking (emails, chats, spreadsheets)
            with structured project workflows, and implemented its API, authentication,
            permissions, and reporting features from the ground up.
          </p>
        </section>

        <section aria-labelledby="workflow-problem">
          <SectionHeading number="02">
            <span id="workflow-problem">The problem</span>
          </SectionHeading>
          <div className="mt-5 max-w-[65ch] space-y-4 font-body text-lg leading-relaxed text-muted">
            <p>
              Most organizations struggle to coordinate work as they scale. Tasks get lost
              across emails, Slack messages, and spreadsheets, with no single source of truth
              for who's doing what or when it's due.
            </p>
            <p>
              Managers lack visibility into team workloads, project progress, or whether
              deadlines are at risk, while team members waste time in status meetings just to
              figure out priorities.
            </p>
            <p>
              Without clear ownership, role boundaries, or an audit trail, accountability breaks
              down and work falls through the cracks.
            </p>
          </div>
        </section>

        <section aria-labelledby="workflow-solution">
          <SectionHeading number="03">
            <span id="workflow-solution">The solution and my decisions</span>
          </SectionHeading>
          <div className="mt-5 max-w-[65ch] space-y-4 font-body text-lg leading-relaxed text-muted">
            <p>
              I built Workflow as a multi-tenant API that gives each organization its own
              isolated workspace with teams, projects, and granular permissions at both the
              organization and project level.
            </p>
          </div>

          <h4 className="font-heading mt-8 text-xl font-semibold text-cream">Key decisions</h4>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {KEY_DECISIONS.map((item) => (
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

        <section aria-labelledby="workflow-stack">
          <SectionHeading number="04">
            <span id="workflow-stack">Tech stack</span>
          </SectionHeading>
          <ul className="mt-5 max-w-[65ch] space-y-3 font-body text-lg leading-relaxed text-muted">
            {TECH_STACK.map((tech) => (
              <li key={tech.name}>
                <span className="font-semibold text-cream">{tech.name}</span> — {tech.use}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}