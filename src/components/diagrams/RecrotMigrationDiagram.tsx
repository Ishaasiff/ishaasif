type Column = {
  x: number;
  header: string;
  accent?: boolean;
  items: [title: string, sub: string][];
};

const COLUMNS: Column[] = [
  {
    x: 70,
    header: "Firebase today",
    items: [
      ["Firestore", "All collections"],
      ["Firebase Auth", "Users, sessions"],
      ["Storage", "Files and proofs"],
      ["Unused data", "3 legacy sets"],
    ],
  },
  {
    x: 275,
    header: "Migrate",
    items: [
      ["Transform", "Fix types, enums"],
      ["Auth import", "Re-issue logins"],
      ["File copy", "New bucket URLs"],
      ["Dropped", "Not migrated"],
    ],
  },
  {
    x: 480,
    header: "New stack",
    accent: true,
    items: [
      ["Neon Postgres", "Enforced in DB"],
      ["FastAPI auth", "Admin web-only"],
      ["Object store", "S3 or R2"],
    ],
  },
];

const ROW_Y = [60, 140, 220, 300];
const BOX_W = 130;
const BOX_H = 56;

const KEY_DECISIONS: { title: string; body: string }[] = [
  {
    title: "PostgreSQL over Firestore",
    body: "The existing document-based database had inconsistencies in data types, status fields, and reference data. A relational schema provides explicit relationships, constraints, consistent data types, and transactions for workflows such as hiring and subscription management. The trade-off is that the migration requires deliberate schema mapping and data conversion rather than a simple database switch.",
  },
  {
    title: "FastAPI as a centralized backend",
    body: "Instead of duplicating business logic across web and mobile clients, a versioned REST API provides one place to enforce business rules, validate requests, and control access. This adds a backend layer to maintain but makes future client expansion easier.",
  },
  {
    title: "JWT authentication and role-based access control",
    body: "The API design uses short-lived access tokens and refresh tokens, with permissions based on user roles. Administrators remain web-only, while tutors, parents, and companies can use the planned shared backend from web or mobile clients.",
  },
  {
    title: "A structured relational schema",
    body: "I worked on defining separate entities and consistent status fields for users, role-specific profiles, jobs, applications, subscriptions, payments, and notifications. The schema also addresses legacy data inconsistencies identified during the migration planning.",
  },
  {
    title: "Keep Firebase Cloud Messaging where practical",
    body: "FCM was identified as a notification service worth retaining rather than replacing automatically. Push notifications can continue independently of the database migration, avoiding unnecessary changes to a working notification component. The final provider decision remains subject to the migration plan.",
  },
];

const TECH_STACK: { name: string; use: string }[] = [
  { name: "Python + FastAPI", use: "REST API architecture and request handling." },
  { name: "PostgreSQL + NeonDB", use: "Relational data storage and managed database hosting." },
  { name: "SQLAlchemy (async) + Alembic", use: "Database access, ORM models, and schema migrations." },
  { name: "JWT", use: "API authentication and role-aware access control." },
  { name: "Next.js", use: "Existing web application that the new API is designed to support." },
  { name: "Firebase Cloud Messaging (FCM)", use: "Existing push notification infrastructure considered for retention." },
];

function MigrationDiagramSvg() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 680 400"
        role="img"
        aria-label="Migration pipeline. Firestore, Firebase Auth and Storage are transformed, imported and copied into Neon Postgres, FastAPI auth and an object store. Unused data is dropped."
        className="mx-auto h-auto w-full min-w-[560px] max-w-[680px]"
      >
        <style>{`
          @keyframes recrot-flow { to { stroke-dashoffset: -20; } }
          .recrot-flow { animation: recrot-flow 0.9s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .recrot-flow { animation: none; } }
        `}</style>

        <defs>
          <marker id="recrot-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="recrot-arrow-burgundy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
                markerEnd={`url(#recrot-arrow-${accent ? "burgundy" : "gray"})`}
                className={`recrot-flow ${accent ? "stroke-burgundy" : "stroke-muted/60"}`}
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

export function RecrotMigrationDiagram() {
  return (
    <div>
      {/* Architecture diagram */}
      <section
        aria-label="Migration architecture diagram"
        
      >
        {/* <h2 className="font-display text-2xl font-bold leading-[1.15] tracking-[-0.01em] text-cream">
          Migration architecture
        </h2>
        <p className="mt-3 max-w-[60ch] font-body text-base leading-relaxed text-muted">
          How data moves from Firebase to the new Neon Postgres and FastAPI stack.
        </p> */}
        <div className="mt-8">
          <MigrationDiagramSvg />
        </div>
      </section>

      {/* Case study description */}
      <div className="mt-16 space-y-14">
        <section aria-labelledby="recrot-summary">
          <SectionHeading number="01">
            <span id="recrot-summary">One-line summary and my role</span>
          </SectionHeading>
          <p className="mt-5 max-w-[65ch] font-body text-lg leading-relaxed text-muted">
            <strong className="font-semibold text-cream">
              Recrot is a tutoring marketplace connecting parents and companies with tutors.
            </strong>{" "}
            As the sole backend internee on this project, I worked on the backend migration
            architecture, PostgreSQL database design, and FastAPI REST API specification to
            support a more reliable platform and a future mobile app.
          </p>
        </section>

        <section aria-labelledby="recrot-problem">
          <SectionHeading number="02">
            <span id="recrot-problem">The problem</span>
          </SectionHeading>
          <div className="mt-5 max-w-[65ch] space-y-4 font-body text-lg leading-relaxed text-muted">
            <p>
              In Pakistan, tutoring opportunities are often shared through WhatsApp groups,
              Facebook posts, and word of mouth. Parents searching for a tutor with specific
              qualifications, subjects, and location preferences have limited ways to discover
              suitable candidates and evaluate their experience. Tutors face the opposite
              problem: they can miss relevant opportunities simply because they are not part of
              the right network at the right time.
            </p>
            <p>
              Manual matching also creates opportunities for delays and unnecessary
              intermediaries. A centralized tutoring marketplace can make job discovery,
              applications, hiring, and tutor profiles more accessible and organized.
            </p>
            <p>
              Recrot already provided a digital platform for these workflows, but its backend
              needed a more consistent data model and a centralized API to support future
              expansion beyond the web application.
            </p>
          </div>
        </section>

        <section aria-labelledby="recrot-solution">
          <SectionHeading number="03">
            <span id="recrot-solution">The solution and my decisions</span>
          </SectionHeading>
          <div className="mt-5 max-w-[65ch] space-y-4 font-body text-lg leading-relaxed text-muted">
            <p>
              I worked on the backend architecture for migrating Recrot from Firebase/Firestore
              to NeonDB (PostgreSQL), with FastAPI providing a centralized REST API for the
              existing web application and a planned mobile application.
            </p>
            <p>
              My focus was on designing a backend that could manage multiple user roles,
              tutoring jobs, applications, hiring workflows, tutor subscriptions, payments,
              notifications, and administrative operations through a consistent API.
            </p>
          </div>

          <h4 className="font-heading mt-8 text-xl font-semibold text-cream">
            Key technical decisions
          </h4>
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

          <p className="mt-6 max-w-[65ch] font-body text-lg leading-relaxed text-muted">
            The main trade-off was balancing a more maintainable, extensible backend against
            the effort and risk involved in migrating existing data and preserving current web
            functionality.
          </p>
        </section>

        <section aria-labelledby="recrot-stack">
          <SectionHeading number="04">
            <span id="recrot-stack">Tech stack</span>
          </SectionHeading>
          <ul className="mt-5 max-w-[65ch] space-y-3 font-body text-lg leading-relaxed text-muted">
            {TECH_STACK.map((tech) => (
              <li key={tech.name}>
                <span className="font-semibold text-cream">{tech.name}</span> — {tech.use}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[65ch] font-body text-lg leading-relaxed text-muted">
            <span className="font-semibold text-cream">My contribution:</span> Backend
            architecture, database schema design, API specification, migration planning, and
            authentication and authorization design.
          </p>

          <p className="mt-6 max-w-[65ch] border-l-2 border-burgundy pl-4 font-body text-base italic leading-relaxed text-muted">
            Project status note: The migration and mobile application were documented as
            planned initiatives in the project requirements. This case study describes the
            backend design work and proposed architecture, rather than claiming the entire
            migration or mobile app was completed.
          </p>
        </section>
      </div>
    </div>
  );
}