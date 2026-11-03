
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

const FADE =
  "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)";

const FADE_STYLE = {
  maskImage: FADE,
  WebkitMaskImage: FADE,
} as const;

const serviceDetails = [
  {
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    tags: ["Next.js", "Node.js", "FastAPI", "Python"],
  },
  {
    tags: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    tags: ["Debugging", "Performance", "Optimization"],
  },
];

export function Services() {
  const count = services.length;

  return (
    <section
      id="services"
      className="relative overflow-clip px-[5vw] py-[12vh] [clip-path:inset(0)]"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={FADE_STYLE}
      >
        <div className="mx-auto flex h-full w-[90vw] max-w-6xl">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 border-l border-burgundy/[0.12] ${
                i === 3
                  ? "border-r"
                  : i === 1
                    ? "max-sm:border-r"
                    : ""
              } ${i > 1 ? "hidden sm:block" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* Header */}
        <Reveal>
          <div className="mb-12 md:mb-16">

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-burgundy shadow-[0_0_12px_rgba(128,0,32,0.8)]" />

              <span className="font-mono text-base tracking-wider text-muted">
                WHAT I DO / {String(count).padStart(2, "0")} SERVICES
              </span>
            </div>

            <div className="mt-6">

              <h2 className="font-heading text-[38px] font-extrabold leading-none tracking-[-0.04em] text-cream md:text-[54px]">
                Turning ideas into{" "}
                <span className="text-burgundy">reality.</span>
              </h2>

              <p className="mt-4 max-w-xl font-body text-[17px] leading-relaxed text-muted">
                I combine creative vision with technical expertise to craft
                digital experiences that look polished, perform reliably and
                solve real problems.
              </p>

            </div>

            <div className="mt-10 h-px w-full bg-gradient-to-r from-burgundy/80 via-hairline to-transparent" />
          </div>
        </Reveal>

        {/* Services */}
        <div className="space-y-3">
          {services.map((service, index) => {
            const detail = serviceDetails[index] ?? {
              tags: ["Creative Solutions", "Development"],
            };

            return (
              <Reveal key={service.title} delay={index * 80}>
                <article className="group relative overflow-hidden rounded-xl border border-hairline bg-surface transition-all duration-500 hover:border-burgundy/60 hover:bg-burgundy/[0.06]">

                  {/* Hover glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-burgundy/0 blur-[80px] transition-all duration-700 group-hover:bg-burgundy/25"
                  />

                  <div className="relative grid gap-5 p-6 md:grid-cols-[70px_minmax(0,1fr)_minmax(0,0.9fr)_40px] md:items-center md:gap-8 md:p-8">

                    {/* Number */}
                    <span className="font-mono text-base text-burgundy">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <div>
                      <h3 className="font-heading text-[17px] font-bold leading-[1.15] tracking-[-0.01em] text-white transition-colors duration-500 group-hover:text-burgundy">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description and tags */}
                    <div>
                      <p className="font-body text-[17px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-cream">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {detail.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-burgundy/30 px-3 py-1 font-mono text-base text-muted transition-all duration-300 group-hover:border-burgundy group-hover:text-cream"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-burgundy/40 text-burgundy transition-all duration-500 group-hover:translate-x-1 group-hover:bg-burgundy group-hover:text-white md:flex">
                      →
                    </div>

                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={200}>
          <div className="mt-14 flex flex-col justify-between gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center">

            <p className="font-display text-[17px] leading-relaxed text-muted">
              Have a project in mind?{" "}
              <span className="font-bold text-cream">
                Let's build something meaningful.
              </span>
            </p>

            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-burgundy px-6 py-3 font-body text-base text-white transition-all duration-300 hover:bg-burgundy"
            >
              Let's talk
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
