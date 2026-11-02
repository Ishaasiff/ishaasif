import { Reveal } from "@/components/Reveal";
import { AboutPortrait } from "@/components/Aboutportrait";
import { AboutTabs } from "@/components/Abouttabs";

// const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

export function About() {
  return (
    
    <section
      id="aboutus"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent px-[5vw] py-[12vh]"
    >
      {/* Ambient burgundy glow behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-burgundy/25 blur-[140px] light:hidden"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal>
          <AboutPortrait />
        </Reveal>

        <Reveal delay={120}>
          <div>
            <h2 className="font-heading text-[38px] font-extrabold leading-none tracking-[-0.04em] text-cream md:text-[54px]">
              About Me
              <span className="block text-burgundy">Software Engineering student</span>
            </h2>

            <div className="mt-8">
              <AboutTabs />
            </div>

          </div>
        </Reveal>
      </div>

      {/* Closing divider, kept from the original design */}
      <div
        aria-hidden="true"
        className="absolute bottom-[5vh] left-1/2 h-[2px] w-4/5 -translate-x-1/2 rounded-[3px] bg-[linear-gradient(to_right,transparent,#800020,transparent)] shadow-[0_0_20px_rgba(128,0,32,0.55)] light:hidden"
      />
    </section>
  );
}