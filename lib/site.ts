export type PortfolioProject = {
  slug: string;
  name: string;
  badge: string;
  shortDescription: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
};

export const siteConfig = {
  name: "Sibasish Chakraborti",
  siteName: "sibasishdev.in",
  title:
    "Sibasish Chakraborti | Best Web Developer & Designer in Agartala, Tripura",
  description:
    "Sibasish Chakraborti is the best web developer and web designer in Agartala, Tripura. Specializing in full-stack development with Next.js, React, FastAPI, and AWS. Hire the top software developer in Tripura for premium websites, web apps, and digital products.",
  shortDescription:
    "Best web developer and designer in Agartala, Tripura — building premium web experiences, scalable systems, and product-focused digital solutions for businesses across Northeast India.",
  jobTitle: "Full Stack Web Developer & Designer",
  email: "sibasishchakraborti@gmail.com",
  phone: "+919863379440",
  locale: "en_US",
  language: "en",
  themeColor: "#050505",
  resumePath: "/resume.pdf",
  location: {
    city: "Agartala",
    state: "Tripura",
    country: "India",
    region: "Northeast India",
    postalCode: "799001",
    latitude: 23.8315,
    longitude: 91.2868,
  },
  socialLinks: {
    linkedIn: "https://www.linkedin.com/in/sibasish-chakraborti-5b55b82b1/",
    instagram: "https://instagram.com/sibasish__chakraborti",
    whatsapp: "https://wa.me/9863379440",
  },
  services: [
    "Full-stack web development",
    "Frontend engineering",
    "Backend systems & API development",
    "Cloud deployment & DevOps",
    "UI/UX design",
    "E-commerce website development",
    "Business website development",
    "Web application development",
    "SEO-optimized website design",
  ],
  keywords: [
    // Brand
    "Sibasish Chakraborti",
    "sibasishdev",
    "sibasishdev.in",
    // Primary local SEO
    "best web developer in Agartala",
    "best web designer in Agartala",
    "best web developer in Tripura",
    "best web designer in Tripura",
    "best software developer in Agartala",
    "best software developer in Tripura",
    "top web developer in Tripura",
    "top web designer in Tripura",
    // Service + location
    "web developer Agartala",
    "web designer Agartala",
    "software developer Agartala",
    "web developer Tripura",
    "web designer Tripura",
    "software developer Tripura",
    "freelance web developer Agartala",
    "freelance web developer Tripura",
    "hire web developer Tripura",
    "hire web developer Agartala",
    "website developer in Agartala",
    "website designer in Tripura",
    "website maker in Agartala",
    "app developer Agartala",
    "UI UX designer Tripura",
    "ecommerce developer Tripura",
    // Regional
    "web developer Northeast India",
    "best developer in Northeast India",
    // Technology
    "full stack developer",
    "Next.js developer",
    "React developer",
    "FastAPI developer",
    "TypeScript developer",
    "Node.js developer",
    "Python developer",
    "AWS developer",
    // Generic
    "developer portfolio",
    "web developer portfolio",
    "frontend engineer",
    "backend developer",
    "full stack web developer India",
  ],
} as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "digipanch",
    name: "DIGIPANCH",
    badge: "AI Powered Rural Administration",
    shortDescription:
      "Empowering rural governance with AI-driven digital solutions, transparent administration, and citizen-first services.",
    problem:
      "Traditional rural governance workflows are fragmented, manual, and difficult for citizens to access.",
    solution:
      "Built a digital-first governance platform enabling streamlined citizen services and administrative workflows.",
    impact:
      "Designed scalable multi-role architecture for real-world governance digitization.",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    liveUrl: "https://www.digipanch.live",
    image: "/project-section/digi-panch.png",
  },
  {
    slug: "poyodhara",
    name: "POYODHARA",
    badge: "Premium Product Showcase",
    shortDescription:
      "Elevating local bottled water brands with a modern, engaging digital storefront and premium product presentation.",
    problem:
      "Local bottled water businesses often lack modern digital storefronts and effective product presentation.",
    solution:
      "Created a premium brand-focused product showcase website for customer engagement.",
    impact: "Improved product presentation and online business visibility.",
    stack: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://poyodhara.vercel.app/",
    image: "/project-section/poyodhara.png",
  },
  {
    slug: "beyond-pinks",
    name: "BEYOND PINKS",
    badge: "Fashion Brand Identity",
    shortDescription:
      "A visually striking digital storefront designed to drive conversion, enhance discoverability, and elevate fashion branding.",
    problem:
      "Fashion brands require visually strong digital storefronts to drive conversion and brand identity.",
    solution:
      "Created a clean fashion-focused e-commerce shopping experience.",
    impact:
      "Improved product discoverability and modern shopping interaction.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://byondpinks.vercel.app/",
    image: "/project-section/beyound-pinks.png",
  },
];
