import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#aboutus" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#project" },
  { label: "Contact", href: "#contact" },
  { label: "CV", href: "/cv" },
];

export function Footer() {
  return (
    <footer className="min-h-[50vh] bg-transparent">
      <div className="grid grid-cols-3 gap-x-10 px-[30px] pb-[3px] pt-[30px] max-[992px]:grid-cols-2 max-[992px]:gap-y-[30px] max-[600px]:grid-cols-1 max-[600px]:text-center">
        <Reveal>
          <div>
            <h3 className="font-heading text-[17px] font-bold text-cream">Isha Asif</h3>
            <p className="pt-2.5 font-body text-muted">
              Software Engineering student passionate about full stack development, cloud computing, and emerging
              technologies.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="ml-24 text-cream max-[992px]:ml-0">
            <h3 className="font-heading mb-2 text-[17px] text-cream">Quick links</h3>
            <ul className="list-none font-body">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="leading-[25px] text-muted no-underline transition-colors duration-300 hover:text-cream hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="text-cream">
            <h3 className="font-heading mb-2 text-[17px] text-cream">Connect</h3>
            <ul className="list-none">
              <li className="grid grid-cols-[40px_40px_40px] max-[600px]:justify-center">
                <a href={site.links.mailto} aria-label="Gmail" className="leading-10 text-muted transition-colors duration-300 hover:text-cream">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="25"
                    height="25"
                    fill="currentColor"
                  >
                    <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z" />
                  </svg>
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="leading-10 text-muted transition-colors duration-300 hover:text-cream"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.653.243 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.625-5.48 5.922.43.37.813 1.102.813 2.222 0 1.606-.015 2.903-.015 3.296 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                  </svg>
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="leading-10 text-muted transition-colors duration-300 hover:text-cream"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.85 0-2.134 1.447-2.134 2.943v5.662H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.603 0 4.27 2.371 4.27 5.455v6.286zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.144.926-2.07 2.07-2.07 1.144 0 2.07.926 2.07 2.07 0 1.143-.926 2.07-2.07 2.07zM6.978 20.452H3.695V9h3.283v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.73v20.542C0 23.226.792 24 1.771 24h20.451C23.204 24 24 23.226 24 22.273V1.73C24 .774 23.204 0 22.225 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 h-[0.5px] rounded-[3px] bg-[color:var(--color-burgundy)]" />

      <p className="mt-8 text-center font-body text-muted">© 2025 Isha Asif. All Rights Reserved.</p>
    </footer>
  );
}
