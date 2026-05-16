import type { MetadataRoute } from "next";

import { absoluteUrl, getBaseUrl } from "@/lib/seo";
import { portfolioProjects } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getBaseUrl();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        absoluteUrl("/about-section/about-section.png"),
        ...portfolioProjects.map((project) => absoluteUrl(project.image)),
      ],
    },
  ];
}
