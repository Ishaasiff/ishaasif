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
      ["Chat endpoint", "History from DB"],
      ["Auth routes", "JWT, bcrypt"],
      ["Notes routes", "List, edit, delete"],
      ["Schema setup", "create_all"],
    ],
  },
  {
    x: 275,
    header: "Logic",
    items: [
      ["ReAct agent", "Max 5 steps"],
      ["Controllers", "user_id filters"],
      ["SaveNote tool", "Scoped to user"],
      ["Alembic", "Planned next"],
    ],
  },
  {
    x: 480,
    header: "Data and services",
    accent: true,
    items: [
      ["Groq LLM", "gpt-oss-120b"],
      ["Neon Postgres", "Pooled, pre-ping"],
      ["Saved notes", "Per-user, cascade"],
    ],
  },
];

const ROW_Y = [60, 140, 220, 300];
const BOX_W = 130;
const BOX_H = 56;

export function StudyAssistantDiagram() {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 680 400"
        role="img"
        aria-label="AI Study Assistant backend architecture. The chat endpoint runs a ReAct agent that calls the Groq LLM. Auth routes pass through controllers that filter by user to Neon Postgres. Notes routes and the SaveNote tool write per-user saved notes. Alembic is planned next."
        className="mx-auto h-auto w-full min-w-[560px] max-w-[680px]"
      >
        <style>{`
          @keyframes study-flow { to { stroke-dashoffset: -20; } }
          .study-flow { animation: study-flow 0.9s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .study-flow { animation: none; } }
        `}</style>

        <defs>
          <marker id="study-arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="study-arrow-burgundy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
                markerEnd={`url(#study-arrow-${accent ? "burgundy" : "gray"})`}
                className={`study-flow ${accent ? "stroke-burgundy" : "stroke-muted/60"}`}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
