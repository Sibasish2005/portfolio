# Project Context: Portfolio Next (Sibasish Chakraborti)

> **Canonical URL**: [https://sibasishdev.in](https://sibasishdev.in)  
> **Repository Name**: `portfolio-next`  
> **Owner / Author**: Sibasish Chakraborti (`sibasishdev`)  
> **Primary Identity**: Best Freelancer, Software Engineer & UI/UX Designer in Agartala, Tripura, India

---

## 1. Project Overview & Objectives

`portfolio-next` is a high-performance, visually immersive developer portfolio and personal branding web application built for **Sibasish Chakraborti**. It serves three main objectives:

1. **Portfolio & Brand Showcase**: Interactive, fluid presentation of key projects (DIGIPANCH, POYODHARA, BEYOND PINKS), full-stack skill sets, and services.
2. **Local SEO, GEO & AEO (AI Engine Optimization) Authority Engine**: Highly optimized metadata, comprehensive JSON-LD semantic graph (WebSite, Person, Brand, LocalBusiness, CreativeWork, FAQ), geographical coordinates for Agartala/Tripura, dynamic OpenGraph/Twitter card generators, and specialized LLM discovery files (`llms.txt`, `llms-full.txt`).
3. **AI & Resume Intelligence Subsystem**: Modules for parsing PDF resumes and extracting structured entity data using Groq SDK and Zod schema validation.

---

## 2. Tech Stack & Dependencies

### Core Framework & Runtime
- **Next.js**: `16.2.6` (App Router, Server Components, `next/font`)
- **React**: `19.2.4` & React DOM `19.2.4`
- **TypeScript**: `^5` (Strict mode, ESNext target)
- **Node.js**: Node 20+

### Styling & Design System
- **Tailwind CSS**: `v4.x` (`@tailwindcss/postcss`)
- **PostCSS**: `postcss.config.mjs`
- **Component Primitives**: `@base-ui/react`, `shadcn/ui`, `class-variance-authority`, `clsx`, `tailwind-merge`
- **Icons**: `lucide-react`
- **Fonts**:
  - `Geist` (`--font-sans`)
  - `DM Mono` (`--font-dm-mono`)
  - `Orbitron` (`--font-orbitron`)
- **Color Palette**: Dark-first, minimalist black (`#000000`, `#050505`) with subtle translucent borders, glassmorphism, and accent highlights.

### Animation & Interactions
- **GSAP**: `3.15.0` with `ScrollTrigger` plugin for scroll-driven animations and pinning.
- **Framer Motion**: `12.38.0` for micro-interactions and component transitions.
- **tw-animate-css**: `^1.4.0`

### AI, Parsing & Validation
- **Groq SDK**: `groq-sdk` (`^1.5.0`) for fast LLM inference.
- **Zod**: `^4.4.3` for strict schema definitions (`lib/schema.ts`).
- **pdf-parse**: `^1.0.5` for raw text extraction from PDF files (`lib/pdf.ts`).

---

## 3. Directory & File Structure

```text
portfolio-next/
├── AGENTS.md                  # Critical agent instructions (Next.js 16 breaking conventions)
├── CLAUDE.md                  # Claude-specific entrypoint
├── PROJECT_CONTEXT.md         # Full project architecture & context (this document)
├── README.md                  # Default Next.js starter documentation
├── app/                       # Next.js App Router root
│   ├── globals.css            # Tailwind v4 theme, fonts, custom scrollbars
│   ├── layout.tsx             # Root layout, fonts, SEO tags, geo metadata, skip-link
│   ├── page.tsx               # Main landing page assembling hero, about, projects, contact
│   ├── manifest.ts            # Web App Manifest generator
│   ├── robots.ts              # Robots.txt configuration
│   ├── sitemap.ts             # Dynamic XML sitemap generator
│   ├── opengraph-image.tsx    # Dynamic OpenGraph 1200x630 image generator via ImageResponse
│   ├── twitter-image.tsx      # Dynamic Twitter card image generator
│   ├── not-found.tsx          # Custom 404 handler
│   ├── components/            # Page section components
│   │   ├── navbar.tsx         # Fixed navigation with responsive mobile menu
│   │   ├── hero.tsx           # GSAP-animated hero section with interactive skill cards
│   │   ├── about.tsx          # Professional background, story, and expertise
│   │   ├── projects.tsx       # Featured project showcase cards & details
│   │   ├── contact.tsx        # Contact details, WhatsApp/Phone, email, and social links
│   │   └── not-found-page.tsx # 404 UI component
│   └── resume/                # Resume routes & parsing interfaces
├── components/
│   └── ui/                    # Reusable UI primitives (shadcn-compatible)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── separator.tsx
│       └── tooltip.tsx
├── hooks/
│   └── use-mobile.ts          # Media query hook detecting mobile viewport (< 768px)
├── lib/                       # Utilities and core business logic
│   ├── site.ts                # Site configuration, project data, keywords, contact info
│   ├── seo.ts                 # Full JSON-LD schema builder (Schema.org) & URL helpers
│   ├── utils.ts               # cn() class merging utility (clsx + twMerge)
│   ├── schema.ts              # Zod schemas for Resume & Experience extraction
│   ├── pdf.ts                 # PDF file reader using pdf-parse
│   ├── llm.ts                 # LLM client & Groq integration helpers
│   └── parser.ts              # Resume parsing pipeline
├── public/                    # Static assets
│   ├── .well-known/           # Well-known standards (llms.txt discovery)
│   ├── llms.txt               # LLM-optimized summary context
│   ├── llms-full.txt          # LLM-optimized full comprehensive context
│   ├── resume.pdf             # Static downloadable resume
│   ├── project-section/       # Images for portfolio projects (digi-panch, poyodhara, etc.)
│   ├── hero-section/          # Hero imagery and visual assets
│   └── favicon.ico            # Favicon
├── package.json
├── tsconfig.json              # Path aliases: "@/*" -> ["./*"]
└── vercel.json                # Vercel deployment configuration
```

---

## 4. Key Architectural Systems

### A. Landing Page & Animations (`app/components/`)
- **`navbar.tsx`**: Pinned navigation bar with smooth backdrop transitions and mobile drawer toggle. Adds `.menu-open` class to `<body>` to lock scrolling when open.
- **`hero.tsx`**: Uses `gsap` and `ScrollTrigger` to coordinate staggered text entrances and multi-column skill matrices (Frontend, Backend, Auth, Database, Cloud, Emerging Tech).
- **`projects.tsx`**: Renders portfolio projects with problem/solution/impact framing, tech badges, and external links.
- **`contact.tsx`**: High-conversion footer section highlighting direct phone contact, WhatsApp, email, and geographic location in Agartala, Tripura.

### B. SEO, GEO & AEO Strategy (`lib/seo.ts`, `lib/site.ts`, `app/layout.tsx`)
- **Complete Schema.org Graph (`lib/seo.ts`)**:
  - `WebSite`: Site entity metadata
  - `Person`: Profile of Sibasish Chakraborti, social links, job title, image
  - `Organization` / `Brand`: Brand credentials
  - `LocalBusiness`: Geolocation (Latitude `23.8315`, Longitude `91.2868`), Agartala postal code `799001`, telephone number `+91 9863379440`
  - `CreativeWork`: Individual project nodes for each portfolio project
  - `ItemList` / `OfferCatalog`: Service listings
  - `FAQPage`: Explicit Q&A nodes tailored for search snippets and AI answer engines
- **Dynamic OG Images (`app/opengraph-image.tsx`)**: Generates branded SVG/PNG cards at edge runtime using `next/og`.
- **LLM Manifests (`public/llms.txt`, `public/llms-full.txt`)**: Standalone plain text files designed for automated ingestion by AI agents (ChatGPT, Claude, Perplexity).

### C. Resume & AI Subsystem (`lib/`)
- **`lib/schema.ts`**: Defines Zod validation structures (`ResumeSchema`, `ExperienceSchema`) to ensure typed output from LLMs.
- **`lib/pdf.ts`**: Ingests local/uploaded PDF buffers and extracts raw text via `pdf-parse`.
- **`lib/llm.ts` & `lib/parser.ts`**: Intended for invoking Groq / LLM to structure unstructured resume text into validated JSON conforming to `ResumeSchema`.

---

## 5. Projects Showcase Data

| Project | Badge / Domain | Key Tech Stack | Live Link |
|---|---|---|---|
| **DIGIPANCH** | AI Powered Rural Administration | Next.js, FastAPI, PostgreSQL | [digipanch.live](https://www.digipanch.live) |
| **POYODHARA** | Premium Product Showcase | React, Next.js, Tailwind CSS, GSAP | [poyodhara.vercel.app](https://poyodhara.vercel.app/) |
| **BEYOND PINKS** | Fashion Brand Storefront | Next.js, React, Tailwind CSS | [byondpinks.vercel.app](https://byondpinks.vercel.app/) |

---

## 6. Developer Workflows & Commands

### Prerequisites
- Node.js `20.x` or higher
- `npm`, `pnpm`, or `bun`

### CLI Commands
```bash
# Install dependencies
npm install

# Run development server (runs on http://localhost:3000)
npm run dev

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```

### Environment Variables
For AI/Groq-assisted features (e.g. `lib/llm.ts`):
```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## 7. Important Development Guidelines

1. **Next.js 16 Conventions**: Note `AGENTS.md` — this project uses Next.js 16 with React 19. Ensure compliance with Server/Client component boundaries (`"use client"` directive when utilizing React hooks, GSAP, or browser APIs).
2. **Tailwind CSS v4 Syntax**: Configuration is managed via `@theme` inline blocks in [globals.css](file:///app/globals.css) and `@import "tailwindcss";`, rather than legacy `tailwind.config.js`.
3. **Animation Hydration**: GSAP plugins (`ScrollTrigger`) should be initialized within `useEffect` or client components to prevent SSR hydration mismatches.
4. **Metadata & Canonical URLs**: Whenever modifying routes or pages, ensure canonical links and Schema.org references are updated in [site.ts](file:///lib/site.ts) or [seo.ts](file:///lib/seo.ts).
