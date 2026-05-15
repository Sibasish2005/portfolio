"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Lock, 
  Lightbulb, 
  TrendingUp, 
  Layers, 
  ExternalLink, 
  Code, 
  Landmark, 
  PackageSearch, 
  ShoppingBag, 
  Sparkles 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "DIGIPANCH",
    badge: "AI POWERED RURAL ADMINISTRATION",
    badgeIcon: Landmark,
    shortDescription: "Empowering rural governance with AI-driven digital solutions, transparent administration, and citizen-first services.",
    problem: "Traditional rural governance workflows are fragmented, manual, and difficult for citizens to access.",
    solution: "Built a digital-first governance platform enabling streamlined citizen services and administrative workflows.",
    impact: "Designed scalable multi-role architecture for real-world governance digitization.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "AWS", "Docker"],
    liveUrl: "https://digi-panch.vercel.app/",
    githubUrl: "",
    image: "/project-section/digi-panch.png"
  },
  {
    name: "POYODHARA",
    badge: "PREMIUM PRODUCT SHOWCASE",
    badgeIcon: Sparkles,
    shortDescription: "Elevating local bottled water brands with a modern, engaging digital storefront and premium product presentation.",
    problem: "Local bottled water businesses often lack modern digital storefronts and effective product presentation.",
    solution: "Created a premium brand-focused product showcase website for customer engagement.",
    impact: "Improved product presentation and online business visibility.",
    stack: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://poyodhara.vercel.app/",
    githubUrl: "",
    image: "/project-section/poyodhara.png"
  },
  // {
  //   name: "NOVOKART",
  //   badge: "MODERN E-COMMERCE STOREFRONT",
  //   badgeIcon: PackageSearch,
  //   shortDescription: "Redefining handcrafted commerce with an elegant, curated product browsing experience and premium storytelling.",
  //   problem: "Traditional product discovery in handcrafted commerce lacks premium user experience.",
  //   solution: "Built an elegant modern e-commerce storefront for curated product browsing.",
  //   impact: "Enhanced shopping UX and premium product storytelling.",
  //   stack: ["Next.js", "React", "Tailwind CSS"],
  //   liveUrl: "https://demokart-3az7a97y5-sibasish2005s-projects.vercel.app/",
  //   githubUrl: "",
  //   image: "/project-section/novokart.png"
  // },
  {
    name: "BEYOND PINKS",
    badge: "FASHION BRAND IDENTITY",
    badgeIcon: ShoppingBag,
    shortDescription: "A visually striking digital storefront designed to drive conversion, enhance discoverability, and elevate fashion branding.",
    problem: "Fashion brands require visually strong digital storefronts to drive conversion and brand identity.",
    solution: "Created a clean fashion-focused e-commerce shopping experience.",
    impact: "Improved product discoverability and modern shopping interaction.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://byondpinks.vercel.app/",
    githubUrl: "",
    image: "/project-section/beyound-pinks.png"
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.project-panel');
      
      // Global initial states setup
      gsap.set(panels.slice(1), { autoAlpha: 0, scale: 1.02, filter: "blur(10px)" });
      gsap.set(panels[0], { autoAlpha: 1, scale: 1, filter: "blur(0px)" });

      panels.forEach((panel, i) => {
        const contentElems = panel.querySelectorAll('.project-content-stagger');
        if (i > 0) {
           gsap.set(contentElems, { opacity: 0, y: 15 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 panels
          pin: true,
          scrub: 1.2, // Smooth luxury scrub
        }
      });

      panels.forEach((panel, i) => {
        const contentElems = panel.querySelectorAll('.project-content-stagger');

        if (i === 0) {
          // Pause on first panel
          tl.to({}, { duration: 1 });
          return;
        }

        const prevPanel = panels[i - 1];
        const prevContent = prevPanel.querySelectorAll('.project-content-stagger');

        const startTime = (i - 1) * 2 + 1;

        // Transition OUT previous panel
        tl.to(prevPanel, { autoAlpha: 0, scale: 1.02, filter: "blur(10px)", duration: 1, ease: "power2.inOut" }, startTime);
        tl.to(prevContent, { opacity: 0, y: -15, stagger: 0.03, duration: 0.4, ease: "power2.inOut" }, startTime);

        // Transition IN current panel
        tl.to(panel, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.inOut" }, startTime);
        tl.to(contentElems, { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }, startTime + 0.4);

        // Pause on new panel
        tl.to({}, { duration: 1 });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center perspective-[2000px]"
    >
      {/* Cinematic Showcase Container */}
      <div 
        className="relative z-10 w-[94vw] md:w-[92vw] max-w-[1700px] h-[85vh] md:h-[82vh] rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/[0.08]"
      >
        {projects.map((project, index) => (
          <div key={index} className="project-panel absolute inset-0 w-full h-full flex flex-col md:flex-row overflow-hidden rounded-[32px]">
            
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full z-0 bg-[#050505]">
              <img 
                src={project.image} 
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Unified translucent cinematic overlay as requested */}
              <div className="absolute inset-0 bg-[rgba(5,5,5,0.45)] backdrop-blur-[12px] saturate-[130%]" />
              {/* Subtle directional vignette for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/60" />
            </div>

            {/* Top Right Corner Link */}
            {project.liveUrl && (
              <div className="absolute top-10 right-10 z-30 project-content-stagger pointer-events-auto hidden md:block">
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors shadow-lg group">
                  <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </a>
              </div>
            )}

            {/* Left Side: Storytelling (45%) */}
            <div className="relative z-10 w-full md:w-[45%] h-1/2 md:h-full flex flex-col justify-between p-8 md:p-14 lg:p-20 pointer-events-none -translate-y-6 translate-x-4 md:-translate-y-12 md:translate-x-8">
              
              {/* Top Progress Indicator */}
              <div className="flex flex-col gap-4 project-content-stagger">
                <span className="text-white/80 font-medium text-[10px] md:text-[11px] tracking-[0.3em] uppercase">
                  PROJECT {String(index + 1).padStart(2, '0')} <span className="opacity-40">/ {String(projects.length).padStart(2, '0')}</span>
                </span>
                <div className="flex gap-3">
                  {projects.map((_, dotIdx) => (
                    <div 
                      key={dotIdx} 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-700 shadow-xl border border-white/20 ${dotIdx === index ? 'bg-white' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & CTA */}
              <div className="flex flex-col justify-end mt-auto">
                
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md w-fit mb-6 project-content-stagger shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                  {React.createElement(project.badgeIcon, { className: "w-3 h-3 text-blue-400" })}
                  <span className="text-[9px] md:text-[10px] text-white/80 font-semibold tracking-[0.15em] uppercase">
                    {project.badge}
                  </span>
                </div>

                <h2 className="project-content-stagger text-5xl md:text-6xl lg:text-[6rem] leading-[0.95] font-bold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-6">
                  {project.name}
                </h2>
                
                <p className="project-content-stagger text-white/80 text-sm md:text-base leading-relaxed max-w-md font-light drop-shadow-md mb-10">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-4 project-content-stagger pointer-events-auto">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group px-6 py-4 bg-white/95 hover:bg-white text-black text-[11px] md:text-xs font-bold uppercase tracking-[0.1em] rounded-xl transition-all duration-500 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Project
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.1em] rounded-xl hover:bg-white/10 transition-all duration-500 flex items-center gap-3"
                    >
                      <Code className="w-4 h-4" />
                      Source Code
                      <ArrowRight className="w-4 h-4 transition-all duration-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Case Study Breakdown (55%) */}
            <div className="relative z-20 w-full md:w-[55%] h-1/2 md:h-full flex flex-col justify-center p-8 md:p-14 lg:p-20 pointer-events-auto overflow-y-auto scrollbar-none">
              
              <div className="flex flex-col gap-10 md:gap-8 lg:gap-10 w-full max-w-lg mx-auto md:ml-auto md:mr-0">
                
                {/* Problem */}
                <div className="flex gap-6 project-content-stagger group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/[0.08]">
                    <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-semibold">The Problem</h4>
                    <p className="text-sm md:text-[15px] leading-relaxed font-light text-white/90 drop-shadow-md">{project.problem}</p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex gap-6 project-content-stagger group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/[0.08]">
                    <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-semibold">The Solution</h4>
                    <p className="text-sm md:text-[15px] leading-relaxed font-light text-white/90 drop-shadow-md">{project.solution}</p>
                  </div>
                </div>

                {/* Impact */}
                <div className="flex gap-6 project-content-stagger group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/[0.08]">
                    <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-semibold">The Impact</h4>
                    <p className="text-sm md:text-[15px] leading-relaxed font-light text-white/90 drop-shadow-md">{project.impact}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex gap-6 project-content-stagger group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Layers className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-4 font-semibold">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {project.stack.map(tech => (
                        <span key={tech} className="px-4 py-2 bg-white/[0.05] backdrop-blur-md border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full text-[10px] tracking-[0.1em] text-white/90 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
