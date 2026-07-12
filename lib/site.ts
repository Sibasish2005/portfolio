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
  title: "Sibasish Chakraborti | Full Stack Developer",
  description:
    "Developer portfolio of Sibasish Chakraborti, a full stack developer building high-performance web products with Next.js, React, FastAPI, Python, and AWS.",
  shortDescription:
    "Full stack developer portfolio focused on performant web experiences, scalable systems, and product-focused engineering.",
  jobTitle: "Full Stack Developer",
  email: "sibasishchakraborti@gmail.com",
  phone: "+919863379440",
  locale: "en_US",
  language: "en",
  themeColor: "#050505",
  resumePath: "/resume.pdf",
  socialLinks: {
    linkedIn: "https://www.linkedin.com/in/sibasish-chakraborti-5b55b82b1/",
    instagram: "https://instagram.com/sibasish__chakraborti",
    whatsapp: "https://wa.me/9863379440",
  },
  services: [
    "Full-stack web development",
    "Frontend engineering",
    "Backend systems",
    "Cloud deployment",
  ],
  keywords: [
    "Sibasish Chakraborti",
    "best web designer in Agartala",
    "best web developer in Tripura",
    "software developer in Agartala",
    "top web developer in Tripura",
    "full stack developer",
    "Next.js developer",
    "React developer",
    "FastAPI developer",
    "TypeScript portfolio",
    "developer portfolio",
    "web developer portfolio",
    "frontend engineer",
    "backend developer",
    "AWS developer",
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
