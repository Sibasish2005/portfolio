import "server-only";

import { portfolioProjects, siteConfig } from "@/lib/site";

export function getBaseUrl() {
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

  return configuredUrl.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${getBaseUrl()}/`).toString();
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function getHomeJsonLd() {
  const siteUrl = getBaseUrl();
  const pageId = `${siteUrl}#webpage`;
  const websiteId = `${siteUrl}#website`;
  const personId = `${siteUrl}#person`;
  const brandId = `${siteUrl}#brand`;
  const servicesId = `${siteUrl}#services`;
  const projectsId = `${siteUrl}#projects`;

  const projectNodes = portfolioProjects.map((project) => ({
    "@type": "CreativeWork",
    "@id": `${siteUrl}#project-${project.slug}`,
    name: project.name,
    url: project.liveUrl,
    description: project.shortDescription,
    image: absoluteUrl(project.image),
    creator: { "@id": personId },
    isPartOf: { "@id": pageId },
    genre: project.badge,
    keywords: project.stack.join(", "),
    about: [project.problem, project.solution, project.impact],
    inLanguage: "en",
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteConfig.siteName,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": brandId },
      },
      {
        "@type": "Organization",
        "@id": brandId,
        name: siteConfig.siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/favicon.ico"),
        },
        founder: { "@id": personId },
        sameAs: [
          siteConfig.socialLinks.linkedIn,
          siteConfig.socialLinks.instagram,
        ],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteUrl,
        image: absoluteUrl("/about-section/about-section.png"),
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        sameAs: [
          siteConfig.socialLinks.linkedIn,
          siteConfig.socialLinks.instagram,
        ],
        worksFor: { "@id": brandId },
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "FastAPI",
          "Python",
          "AWS",
          "Tailwind CSS",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": servicesId,
        name: `${siteConfig.name} Development Services`,
        url: siteUrl,
        description:
          "Freelance and product-focused software development spanning frontend engineering, backend systems, and cloud delivery.",
        provider: { "@id": personId },
        serviceType: [...siteConfig.services],
      },
      {
        "@type": "CollectionPage",
        "@id": pageId,
        url: siteUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/about-section/about-section.png"),
        },
        hasPart: projectNodes.map((project) => ({ "@id": project["@id"] })),
      },
      {
        "@type": "ItemList",
        "@id": projectsId,
        name: "Featured portfolio projects",
        itemListElement: portfolioProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: project.liveUrl,
          item: { "@id": `${siteUrl}#project-${project.slug}` },
        })),
      },
      ...projectNodes,
    ],
  };
}
