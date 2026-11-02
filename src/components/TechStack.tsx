import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiNodedotjs,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiRedis,
  SiGit,
  SiVercel,
} from "react-icons/si";
import { FaJava, FaPaw } from "react-icons/fa";
import { Reveal } from "@/components/Reveal";

type Technology = { name: string; icon: IconType };
type TechCategory = {
  number: string;
  title: string;
  description: string;
  technologies: Technology[];
};

const techCategories: TechCategory[] = [
  {
    number: "01",
    title: "Languages",
    description: "The languages I use to build applications.",
    technologies: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Building APIs, server-side logic and backend systems.",
    technologies: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "FastAPI", icon: SiFastapi },
    ],
  },
  {
    number: "03",
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces.",
    technologies: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Zustand", icon: FaPaw },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    number: "04",
    title: "Databases",
    description: "Working with relational databases and data storage.",
    technologies: [
      { name: "MySQL", icon: SiMysql },
      { name: "Neon PostgreSQL", icon: SiPostgresql },
      { name: "SQLite", icon: SiSqlite },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    number: "05",
    title: "Tools & Deployment",
    description: "Version control, deployment and development workflow.",
    technologies: [
      { name: "Git", icon: SiGit },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function TechStack() {
  const totalTechnologies = techCategories.reduce(
    (total, c) => total + c.technologies.length,
    0
  );

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative overflow-clip px-[5vw] py-[10vh]"
    >
      {/* Background grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="mx-auto flex h-full w-[90vw] max-w-6xl">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 border-l border-burgundy/[0.12] ${
                i === 3 ? "border-r" : ""
              } ${i > 1 ? "hidden sm:block" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header */}
        <Reveal>
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-burgundy shadow-[0_0_12px_rgba(128,0,32,0.8)]" />
              <span className="font-mono text-sm tracking-[0.2em] text-muted">
                MY TOOLKIT / {pad(totalTechnologies)} TECHNOLOGIES
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <h2
                id="tech-stack-heading"
                className="font-heading text-[44px] font-extrabold leading-none tracking-[-0.04em] text-cream md:text-[54px]"
              >
                My Tech <span className="text-burgundy">Stack.</span>
              </h2>
              <p className="max-w-md font-body text-[17px] leading-relaxed text-muted">
                A collection of technologies and tools I use to transform ideas
                into functional, scalable and interactive digital experiences.
              </p>
            </div>

            <div className="mt-8 h-px w-full bg-gradient-to-r from-burgundy/80 via-hairline to-transparent" />
          </div>
        </Reveal>

        {/* Category rows: no boxes, just type, icons and hairlines */}
        <div>
          {techCategories.map((category, index) => (
            <Reveal key={category.number} delay={index * 80}>
              <section
                aria-labelledby={`cat-${category.number}`}
                className={`group/row grid gap-3 py-6 md:grid-cols-[240px_minmax(0,1fr)] md:items-center md:gap-10 ${
                  index !== 0 ? "border-t border-hairline" : ""
                }`}
              >
                {/* Category info */}
                <div className="flex gap-4">
                  <span className="font-mono text-sm tracking-widest text-burgundy">
                    {category.number}
                  </span>
                  <div>
                    <h3
                      id={`cat-${category.number}`}
                      className="font-heading text-[17px] font-bold leading-snug text-cream"
                    >
                      {category.title}
                    </h3>
                    <p className="mt-1 font-body text-[13px] leading-relaxed text-muted">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Technologies: big inline icon + name */}
                <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {category.technologies.map(({ name, icon: Icon }) => (
                    <li key={name} className="group relative">
                      <span className="flex items-center gap-2 pb-1">
                        <Icon
                          aria-hidden="true"
                          className="h-[18px] w-[18px] shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-px group-hover:scale-110 group-hover:text-burgundy motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100"
                        />
                        <span className="font-body text-[15px] font-medium text-cream transition-colors duration-300 group-hover:text-burgundy">
                          {name}
                        </span>
                      </span>

                      {/* Underline that draws in on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-px w-0 bg-burgundy transition-all duration-500 group-hover:w-full"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={200}>
          <div className="mt-4 flex flex-col gap-3 border-t border-burgundy/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-base leading-relaxed text-muted">
              Always learning, always building.
              <span className="text-cream"> Growing with every project.</span>
            </p>
            <span className="font-mono text-sm tracking-[0.2em] text-burgundy">
              {pad(techCategories.length)} CATEGORIES · {pad(totalTechnologies)} TOOLS
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}