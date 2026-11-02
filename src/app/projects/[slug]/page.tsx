import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMotif } from "@/components/ProjectMotif";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { projectDiagrams } from "@/components/diagrams";
import { CaseStudy } from "@/components/CaseStudy";
import { Navbar } from "@/components/Navbar";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Isha Asif`,
    description: project.description,
  };
}

function ArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
        flip ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const count = projects.length;
  const previous = projects[(index - 1 + count) % count];
  const next = projects[(index + 1) % count];
  const diagram = projectDiagrams[project.slug];
  const isLive = Boolean(project.liveUrl);

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent px-[5vw] pb-[10vh] pt-32 md:pt-40">
      <Navbar />

      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-burgundy/20 blur-[150px]"
      />
      <ProjectMotif
        index={index}
        className="pointer-events-none absolute -right-10 top-28 hidden h-[460px] w-[460px] text-burgundy opacity-25 md:block"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 font-display text-[15px] font-semibold text-cream/70 outline-none transition-colors duration-300 hover:text-cream focus-visible:text-cream focus-visible:underline focus-visible:decoration-burgundy focus-visible:underline-offset-8 motion-reduce:transition-none"
          >
            <ArrowIcon flip />
            All projects
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={100}>
          <div className="mt-12 flex items-center gap-3 font-display text-sm">
            <span className="font-semibold tabular-nums text-muted/60">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-hairline" />
            <span className="inline-flex items-center gap-2 text-muted">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  isLive ? "bg-burgundy shadow-[0_0_10px_rgba(192,48,84,0.9)]" : "bg-muted/40"
                }`}
              />
              {isLive ? "Live" : "In progress"}
            </span>
          </div>

          <h1 className="mt-5 font-heading text-[58px] font-extrabold leading-none tracking-[-0.04em] text-cream md:text-[84px]">
            {project.title}
          </h1>
          <div
            aria-hidden="true"
            className="mt-6 h-[2px] w-24 rounded-[3px] bg-[linear-gradient(to_right,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.55)]"
          />
        </Reveal>

        {/* Lead + action */}
        <Reveal delay={200}>
          <p className="mt-10 max-w-[56ch] font-body text-lg leading-[1.75] text-muted">
            {project.description}
          </p>

          <div className="mt-8">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2.5 border-b-2 border-burgundy pb-1 font-body text-base font-semibold text-cream outline-none transition-colors duration-300 hover:border-[#c03054] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none"
              >
                Open live site
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <span aria-disabled="true" className="font-body text-base font-semibold text-muted/50">
                Not live yet
              </span>
            )}
          </div>
        </Reveal>

        {/* Architecture diagram */}
        {diagram ? (
          <Reveal delay={250}>
            <section
              aria-label={`${project.title} architecture diagram`}
              className="mt-20 border-t border-hairline pt-12"
            >
              <h2 className="font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-cream md:text-[34px]">
                {diagram.heading}
              </h2>
              <p className="mt-3 max-w-[60ch] font-body text-[17px] leading-[1.75] text-muted">
                {diagram.description}
              </p>
              <div className="mt-8">
                <diagram.Component />
              </div>
            </section>
          </Reveal>
        ) : null}

        {project.caseStudy ? (
          <div className="mt-16">
            <CaseStudy study={project.caseStudy} />
          </div>
        ) : null}

        {/* Previous / next */}
        {count > 1 ? (
          <Reveal delay={300}>
            <nav
              aria-label="More projects"
              className="mt-24 grid gap-4 border-t border-hairline pt-10 sm:grid-cols-2"
            >
              {[
                { label: "Previous project", target: previous, flip: true },
                { label: "Next project", target: next, flip: false },
              ].map(({ label, target, flip }) => (
                <Link
                  key={label}
                  href={`/projects/${target.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border border-hairline bg-brand p-6 outline-none transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-burgundy/70 hover:shadow-[0_24px_50px_-18px_rgba(128,0,32,0.75)] focus-visible:ring-2 focus-visible:ring-burgundy motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8 ${
                    flip ? "" : "sm:text-right"
                  }`}
                >
                  <p
                    className={`flex items-center gap-2 font-body text-sm text-muted/70 ${
                      flip ? "" : "sm:justify-end"
                    }`}
                  >
                    {flip ? <ArrowIcon flip /> : null}
                    {label}
                    {flip ? null : <ArrowIcon />}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-cream md:text-[28px]">
                    {target.title}
                  </p>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[linear-gradient(to_right,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.7)] transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </Link>
              ))}
            </nav>
          </Reveal>
        ) : null}
      </div>
    </main>
  );
}