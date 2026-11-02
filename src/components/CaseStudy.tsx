import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import type { ProjectCaseStudy } from "@/data/projects";

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div>
      <h2
        id={id}
        className="font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-cream"
      >
        {children}
      </h2>
      <div
        aria-hidden="true"
        className="mt-4 h-[2px] w-16 rounded-[3px] bg-[linear-gradient(to_right,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.55)]"
      />
    </div>
  );
}

function BodyParagraph({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <p
      className={`max-w-[65ch] font-body text-base leading-relaxed text-muted ${
        first ? "mt-6" : "mt-5"
      }`}
    >
      {children}
    </p>
  );
}

/** Long-form write-up shown beneath a project's architecture diagram. */
export function CaseStudy({ study }: { study: ProjectCaseStudy }) {
  return (
    <div className="mt-24">
      <Reveal>
        <dl className="grid gap-4 sm:grid-cols-3">
          {study.meta.map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-hairline bg-surface p-5">
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted/60">
                {label}
              </dt>
              <dd className="mt-2 font-body text-sm leading-relaxed text-cream">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {study.sections.map((section) => {
        const headingId = `${section.id}-heading`;
        const first = !section.intro;

        return (
          <Reveal key={section.id} delay={80}>
            <section aria-labelledby={headingId} className="mt-20">
              <SectionHeading id={headingId}>{section.heading}</SectionHeading>

              {section.intro ? <BodyParagraph first>{section.intro}</BodyParagraph> : null}

              {section.paragraphs?.map((paragraph) => (
                <BodyParagraph key={paragraph} first={first && paragraph === section.paragraphs?.[0]}>
                  {paragraph}
                </BodyParagraph>
              ))}

              {section.decisions ? (
                <ol className="mt-8 grid gap-4 md:grid-cols-2">
                  {section.decisions.map((decision, index) => (
                    <li
                      key={decision.title}
                      className="flex flex-col rounded-2xl border border-hairline bg-surface p-6"
                    >
                      <span
                        aria-hidden="true"
                        className="font-display text-sm font-semibold tabular-nums text-burgundy"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading mt-2 text-xl font-semibold leading-snug text-cream">
                        {decision.title}
                      </h3>
                      <p className="mt-3 font-body text-base leading-relaxed text-muted">
                        {decision.body}
                      </p>
                      {decision.tradeoff ? (
                        <p className="mt-auto border-l-2 border-burgundy/70 pl-4 pt-5 font-body text-sm leading-relaxed text-muted">
                          <span className="font-semibold text-cream/85">Trade-off: </span>
                          {decision.tradeoff}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : null}

              {section.stack ? (
                <div className="mt-8 overflow-hidden rounded-2xl border border-hairline">
                  <dl className="divide-y divide-hairline">
                    {section.stack.map(({ tool, why }) => (
                      <div
                        key={tool}
                        className="grid gap-1.5 px-5 py-4 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6 sm:px-6"
                      >
                        <dt className="font-display text-base font-semibold text-cream">{tool}</dt>
                        <dd className="font-body text-base leading-relaxed text-muted">{why}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              {section.points ? (
                <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
                  {section.points.map(({ label, body }) => (
                    <li key={label} className="border-l-2 border-burgundy/40 pl-4">
                      <h3 className="font-heading text-[17px] font-semibold text-cream">{label}</h3>
                      <p className="mt-1.5 font-body text-base leading-relaxed text-muted">{body}</p>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.bullets ? (
                <ul className="mt-8 grid gap-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 font-body text-base leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}
