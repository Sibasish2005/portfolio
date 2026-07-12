import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.siteName,
    description: `Portfolio of ${siteConfig.name} — Best Web Developer & Designer in Agartala, Tripura. Full-stack web development with Next.js, React, FastAPI, and AWS.`,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    lang: siteConfig.language,
    categories: [
      "portfolio",
      "developer",
      "technology",
      "web development",
      "web design",
      "software",
    ],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
