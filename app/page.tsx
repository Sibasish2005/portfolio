import type { Metadata } from "next";

import { getHomeJsonLd, serializeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import AboutSection from "./components/about";
import ContactSection from "./components/contact";
import HeroSection from "./components/hero";
import Navbar from "./components/navbar";
import ProjectsSection from "./components/projects";

const homeDescription =
  "Explore the portfolio of Sibasish Chakraborti, featuring full-stack web development work across Next.js, React, FastAPI, cloud delivery, and product engineering.";

export const metadata: Metadata = {
  title: "Portfolio",
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
        alt: `${siteConfig.name} portfolio preview`,
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
        <ContactSection />
      </main>
    </>
  );
}
