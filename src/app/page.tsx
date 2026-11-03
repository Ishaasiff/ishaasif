import { SkillsMarquee } from "@/components/SkillsMarquee";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { ProjectsPage } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import SmoothScroll from "@/components/SmoothScroll";
export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SkillsMarquee />
        <About />
        <Services />
        <ProjectsPage />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
