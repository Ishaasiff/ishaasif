export const site = {
  name: "Isha Asif",
  role: "Software Engineering Student | Web Developer",
  headline: "Isha Asif",
  location: "Karachi, Pakistan",
  email: "ishaasif439@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/isha-asif-9a9172300/",
    github: "https://github.com/Ishaasiff",
    mailto: "mailto:ishaasif439@gmail.com",
    gmailInbox: "https://mail.google.com/mail/u/0/#inbox",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  id: string;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#aboutus", id: "aboutus" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const socialLinks = [
  { label: "LinkedIn", href: site.links.linkedin, icon: "/linkedin.png", width: 421, height: 421 },
  { label: "GitHub", href: site.links.github, icon: "/github.png", width: 421, height: 421 },
  { label: "Gmail", href: site.links.mailto, icon: "/gmail.png", width: 421, height: 421 },
] as const;

export const services = [
  {
    title: "WEB DEVELOPMENT",
    description: "Designing responsive and engaging websites tailored to user needs.",
  },
  {
    title: "FULL STACK DEVELOPMENT",
    description: "Creating custom web apps that are fast, secure, and easy to use.",
  },
  {
    title: "DATABASE DESIGN",
    description: "Integrating databases seemlessly with the applications for smooth performance",
  },
  {
    title: "BUG FIXING AND OPTIMIZATION",
    description: "Debugging and enhancing your existing projects for better user experience",
  },
] as const;
