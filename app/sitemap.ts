import type { MetadataRoute } from "next";

import { absoluteUrl, getBaseUrl } from "@/lib/seo";
import { portfolioProjects } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getBaseUrl();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        absoluteUrl("/about-section/about-section.png"),
        ...portfolioProjects.map((project) => absoluteUrl(project.image)),
      ],
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
