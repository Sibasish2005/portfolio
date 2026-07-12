import "server-only";

import { portfolioProjects, siteConfig } from "@/lib/site";

export function getBaseUrl() {
  return "https://sibasishdev.in";
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
  const localBusinessId = `${siteUrl}#localbusiness`;
  const breadcrumbId = `${siteUrl}#breadcrumb`;

  const { location } = siteConfig;

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
      /* ── WebSite ── */
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteConfig.siteName,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": brandId },
      },

      /* ── Organization / Brand ── */
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
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: "customer service",
          areaServed: ["IN"],
          availableLanguage: ["English", "Hindi", "Bengali"],
        },
      },

      /* ── Person (massively expanded) ── */
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
        nationality: {
          "@type": "Country",
          name: "India",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.state,
          addressCountry: location.country,
          postalCode: location.postalCode,
        },
        sameAs: [
          siteConfig.socialLinks.linkedIn,
          siteConfig.socialLinks.instagram,
        ],
        worksFor: { "@id": brandId },
        hasOccupation: [
          {
            "@type": "Occupation",
            name: "Web Developer",
            occupationLocation: {
              "@type": "City",
              name: `${location.city}, ${location.state}, ${location.country}`,
            },
            description:
              "Full stack web developer specializing in building high-performance websites and web applications using modern technologies like Next.js, React, and FastAPI.",
            skills:
              "Next.js, React, TypeScript, FastAPI, Python, Node.js, AWS, Docker, PostgreSQL, MongoDB, Tailwind CSS",
          },
          {
            "@type": "Occupation",
            name: "Web Designer",
            occupationLocation: {
              "@type": "City",
              name: `${location.city}, ${location.state}, ${location.country}`,
            },
            description:
              "Expert web designer creating premium, conversion-focused user interfaces with modern design principles, responsive layouts, and micro-animations.",
            skills:
              "UI/UX Design, Responsive Design, Figma, Tailwind CSS, CSS Animations, shadcn/ui, Design Systems",
          },
          {
            "@type": "Occupation",
            name: "Software Developer",
            occupationLocation: {
              "@type": "City",
              name: `${location.city}, ${location.state}, ${location.country}`,
            },
            description:
              "Software developer building scalable digital products, backend APIs, cloud-deployed systems, and AI-integrated applications.",
            skills:
              "Python, FastAPI, Node.js, AWS, Docker, PostgreSQL, MongoDB, REST APIs, LangChain",
          },
        ],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "JavaScript",
          "FastAPI",
          "Python",
          "Node.js",
          "AWS",
          "Docker",
          "PostgreSQL",
          "MongoDB",
          "DynamoDB",
          "Tailwind CSS",
          "shadcn/ui",
          "HTML",
          "CSS",
          "Git",
          "REST APIs",
          "Web Development",
          "Web Design",
          "UI/UX Design",
          "Cloud Computing",
          "Full Stack Development",
          "Frontend Engineering",
          "Backend Development",
          "SEO Optimization",
        ],
        knowsLanguage: [
          { "@type": "Language", name: "English" },
          { "@type": "Language", name: "Hindi" },
          { "@type": "Language", name: "Bengali" },
        ],
      },

      /* ── LocalBusiness (critical for local SEO) ── */
      {
        "@type": "LocalBusiness",
        "@id": localBusinessId,
        name: `${siteConfig.name} — Web Development Services`,
        description: `${siteConfig.name} provides premium web development, web design, and software development services in ${location.city}, ${location.state}. Hire the best web developer in Tripura for your next project.`,
        url: siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        image: absoluteUrl("/about-section/about-section.png"),
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.state,
          addressCountry: location.country,
          postalCode: location.postalCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.latitude,
          longitude: location.longitude,
        },
        areaServed: [
          { "@type": "City", name: "Agartala" },
          { "@type": "State", name: "Tripura" },
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: location.latitude,
              longitude: location.longitude,
            },
            geoRadius: "500000",
          },
          { "@type": "Country", name: "India" },
        ],
        priceRange: "$$",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
        sameAs: [
          siteConfig.socialLinks.linkedIn,
          siteConfig.socialLinks.instagram,
        ],
      },

      /* ── ProfessionalService (expanded with area) ── */
      {
        "@type": "ProfessionalService",
        "@id": servicesId,
        name: `${siteConfig.name} — Professional Web Development & Design`,
        url: siteUrl,
        description: `Professional web development, web design, and software development services by ${siteConfig.name} in ${location.city}, ${location.state}. Specializing in Next.js, React, FastAPI, and cloud-deployed applications for businesses across India.`,
        provider: { "@id": personId },
        serviceType: [...siteConfig.services],
        areaServed: [
          { "@type": "City", name: "Agartala" },
          { "@type": "State", name: "Tripura" },
          { "@type": "Country", name: "India" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: siteConfig.services.map((service, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service,
              description: `Professional ${service.toLowerCase()} services by ${siteConfig.name} in ${location.city}, ${location.state}.`,
            },
          })),
        },
      },

      /* ── ProfilePage ── */
      {
        "@type": "ProfilePage",
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
        dateCreated: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        inLanguage: "en",
      },

      /* ── BreadcrumbList ── */
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${siteUrl}#about`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Projects",
            item: `${siteUrl}#projects`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Contact",
            item: `${siteUrl}#contact`,
          },
        ],
      },

      /* ── ItemList (projects) ── */
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

      /* ── Individual project nodes ── */
      ...projectNodes,
    ],
  };
}
