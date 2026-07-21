import type { Metadata } from "next";

import { getHomeJsonLd, serializeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import AboutSection from "./components/about";
import ContactSection from "./components/contact";
import HeroSection from "./components/hero";
import Navbar from "./components/navbar";
import ProjectsSection from "./components/projects";

const homeDescription =
  "Sibasish Chakraborti is the best freelancer in Agartala, Tripura (Phone: +91 9863379440), offering the best UI UX design and custom build softwares. Specializing in Next.js, React, FastAPI, Python, and AWS for custom software solutions and high-performance web applications across Northeast India.";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: homeDescription,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Best Freelancer in Agartala, Tripura (Best UI UX & Custom Build Softwares)`,
      },
    ],
  },
  twitter: {
    title: siteConfig.title,
    description: homeDescription,
    images: ["/twitter-image"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getHomeJsonLd()) }}
      />
      <header>
        <Navbar />
      </header>
      <main id="main-content" className="bg-black text-white">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
      <footer className="bg-[#050505] text-white">
        <ContactSection />
        <div className="sr-only">
          <p>© {new Date().getFullYear()} Sibasish Chakraborti — Best Freelancer in Agartala, Tripura, India. Best UI UX & Custom Build Softwares. All rights reserved.</p>
          <address>
            Sibasish Chakraborti, Agartala, Tripura, India — 799001.
            Direct Phone: +91 9863379440 | Mobile: 9863379440 | Email: sibasishchakraborti@gmail.com.
            Best freelancer in Agartala, Tripura providing top-tier UI UX design, custom build softwares, full-stack web development, and cloud software engineering.
          </address>
        </div>
      </footer>
    </>
  );
}

