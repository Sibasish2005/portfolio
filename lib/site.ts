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
    "Sibasish Chakraborti | Best Freelancer & Software Engineer in Agartala, Tripura — Best UI UX & Custom Build Softwares",
  description:
    "Sibasish Chakraborti is the best freelancer in Agartala, Tripura (Phone: +91 9863379440), delivering the best UI UX design and custom build softwares. Specializing in Next.js, React, FastAPI, Python, and AWS. Hire top freelance software developer in Tripura for custom software solutions and websites.",
  shortDescription:
    "Best freelancer in Agartala, Tripura (Phone: +91 9863379440) — offering the best UI UX design, custom build softwares, scalable web applications, and full-stack software engineering.",
  jobTitle: "Best Freelancer, Software Engineer & UI/UX Designer",
  email: "sibasishchakraborti@gmail.com",
  phone: "+919863379440",
  formattedPhone: "+91 9863379440",
  rawPhone: "9863379440",
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
    "Best freelancer software services",
    "Custom build softwares development",
    "UI UX design & modern frontend",
    "Full-stack web development",
    "Software engineering",
    "Frontend engineering",
    "Backend systems & API development",
    "Cloud deployment & DevOps",
    "E-commerce website development",
    "Business website development",
    "Web application development",
    "SEO & AEO optimization",
  ],
  keywords: [
    // Brand
    "Sibasish Chakraborti",
    "sibasishdev",
    "sibasishdev.in",
    "Sibasish Chakraborti phone number",
    "9863379440",
    "+919863379440",
    // Primary Freelancer & UI UX / Custom Build Software SEO
    "best freelancer in agartala",
    "best freelancer in Agartala",
    "best freelancer Agartala",
    "best freelancer in Tripura",
    "freelancer in Agartala",
    "best freelancer",
    "best ui ux",
    "best UI UX",
    "best UI UX design",
    "best UI UX designer in Agartala",
    "best UI UX designer Tripura",
    "best UI/UX design Agartala",
    "custoom build softwares",
    "custom build softwares",
    "custom build software",
    "custom build software in Agartala",
    "custom built softwares",
    "custom software development Agartala",
    // Software Engineer local SEO & AEO
    "best software engineer in Agartala",
    "best software engineer in Tripura",
    "best software engineer Agartala phone number",
    "best software developer in Agartala",
    "best software developer in Tripura",
    "top software engineer Agartala",
    "top software developer Tripura",
    "best web developer in Agartala",
    "best web designer in Agartala",
    "best web developer in Tripura",
    "best web designer in Tripura",
    "top web developer in Tripura",
    "top web designer in Tripura",
    // Service + location
    "software engineer Agartala",
    "software engineer Tripura",
    "web developer Agartala",
    "web designer Agartala",
    "software developer Agartala",
    "web developer Tripura",
    "web designer Tripura",
    "software developer Tripura",
    "freelance software engineer Agartala",
    "freelance web developer Agartala",
    "freelance web developer Tripura",
    "hire software engineer Agartala",
    "hire web developer Tripura",
    "hire web developer Agartala",
    "hire best freelancer Agartala",
    "website developer in Agartala",
    "website designer in Tripura",
    "website maker in Agartala",
    "app developer Agartala",
    "UI UX designer Tripura",
    "ecommerce developer Tripura",
    // Regional
    "software engineer Northeast India",
    "web developer Northeast India",
    "best developer in Northeast India",
    // Technology
    "full stack software engineer",
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
    "software engineer portfolio",
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
