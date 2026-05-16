import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
