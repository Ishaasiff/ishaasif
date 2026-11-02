import type { Metadata } from "next";
import { Geist, Open_Sans, Poppins, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { FixedBackground } from "@/components/FixedBackground";
import { TagCursor } from "@/components/TagCursor";
import  Preloader  from "@/components/Preloader";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Isha Asif | Software Engineering Student & Full Stack Developer",
    template: "%s | Isha Asif",
  },
  description:
    "Portfolio of Isha Asif — a passionate full stack developer and software engineering student building scalable web applications with modern front-end and back-end technologies.",
  keywords: [
    "Isha Asif",
    "Full Stack Developer",
    "Software Engineering Student",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Isha Asif" }],
  creator: "Isha Asif",
  openGraph: {
    type: "website",
    title: "Isha Asif | Software Engineering Student & Full Stack Developer",
    description:
      "Portfolio of Isha Asif — a passionate full stack developer and software engineering student building scalable web applications.",
    url: siteUrl,
    siteName: "Isha Asif",
    images: [{ url: "/avatar-new.png", width: 360, height: 360, alt: "Isha Asif" }],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${openSans.variable} ${geist.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    if (theme !== 'light') {
                      localStorage.setItem('theme', 'dark');
                    }
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <FixedBackground />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <TagCursor />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
