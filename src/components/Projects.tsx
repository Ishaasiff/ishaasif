import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/Projectsgrid";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

const intro =
  "Recent work: a tutoring marketplace backend, a multi-tenant work management SaaS, an agency website and an AI study assistant.";

export const metadata: Metadata = {
  title: "Projects | Isha Asif",
  description:
    "Recent work by Isha Asif: Recrot, Workflow, Innovative Widget and AI-StudyAssistant.",
};

export function ProjectsPage() {
  const count = projects.length;

  return (
    <main
      id="projects"
      className="relative min-h-screen overflow-hidden bg-transparent px-[5vw] py-[12vh]"
    >
      {/* Ambient light, same burgundy as the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-burgundy/20 blur-[150px] light:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-[60%] h-[480px] w-[480px] rounded-full bg-burgundy/15 blur-[150px] light:hidden"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mb-14 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-burgundy shadow-[0_0_12px_rgba(128,0,32,0.8)]" />
                <span className="font-mono text-sm tracking-[0.2em] text-muted">
                  SELECTED WORK / {String(count).padStart(2, "0")} PROJECTS
                </span>
              </div>
              <h1 className="font-heading text-[38px] font-extrabold leading-none tracking-[-0.04em] text-cream md:text-[54px]">
                Projects
              </h1>
              <div
                aria-hidden="true"
                className="mt-6 h-[2px] w-24 rounded-[3px] bg-[linear-gradient(to_right,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.55)]"
              />
              <p className="mt-6 max-w-[52ch] font-body text-[17px] leading-[1.75] text-muted md:text-[18px]">
                {intro}
              </p>
            </div>

            <p className="flex items-baseline gap-2 font-display text-muted">
              <span className="text-5xl font-bold tabular-nums tracking-[-0.03em] text-cream md:text-6xl">
                {String(count).padStart(2, "0")}
              </span>
              <span className="text-base">{count === 1 ? "project" : "projects"}</span>
            </p>
          </header>
        </Reveal>

        <Reveal delay={150}>
          <ProjectsGrid />
        </Reveal>
      </div>
    </main>
  );
}