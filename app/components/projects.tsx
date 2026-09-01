"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Code,
  ExternalLink,
  Landmark,
  Layers,
  Lightbulb,
  Lock,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { portfolioProjects } from "@/lib/site";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const BADGE_ICONS: Record<string, LucideIcon> = {
  digipanch: Landmark,
  poyodhara: Sparkles,
  "beyond-pinks": ShoppingBag,
};

import { useMobile } from "@/hooks/use-mobile";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      /* Mobile: simple fade-in for each card, no pin */
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".mobile-project-card")
          .forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          });
      }, containerRef);
      return () => context.revert();
    }

    /* Desktop: cinematic pinned sliding scroll-through */
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      const numPanels = panels.length;
      if (numPanels === 0) return;

      // Initial state: First panel active, rest placed slightly lower and faded
      gsap.set(panels[0], {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
      });

      if (numPanels > 1) {
        gsap.set(panels.slice(1), {
          autoAlpha: 0,
          yPercent: 20,
          scale: 0.96,
        });
      }

      panels.forEach((panel, index) => {
        const contentElements =
          panel.querySelectorAll(".project-content-stagger");

        if (index > 0) {
          gsap.set(contentElements, { opacity: 0, y: 24 });
        }
      });

      if (numPanels <= 1) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(numPanels - 1) * 120}%`,
          pin: true,
          scrub: 1.2,
          snap: {
            snapTo: 1 / (numPanels - 1),
            duration: { min: 0.3, max: 0.6 },
            delay: 0.15,
            ease: "power2.out",
          },
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) return;

        const previousPanel = panels[index - 1];
        const previousContent =
          previousPanel.querySelectorAll(".project-content-stagger");
        const currentContent =
          panel.querySelectorAll(".project-content-stagger");

        // Slide previous panel slightly upwards and fade with slight perspective depth
        timeline.to(
          previousPanel,
          {
            autoAlpha: 0,
            yPercent: -12,
            scale: 0.94,
            duration: 1,
            ease: "power2.inOut",
          }
        );

        timeline.to(
          previousContent,
          {
            opacity: 0,
            y: -16,
            stagger: 0.02,
            duration: 0.45,
            ease: "power2.in",
          },
          "<"
        );

        // Slide in current panel from below seamlessly
        timeline.to(
          panel,
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "<0.15"
        );

        // Stagger in new content
        timeline.to(
          currentContent,
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
          },
          "<0.25"
        );

        // Rest window where project is held steady before next transition begins
        timeline.to({}, { duration: 0.8 });
      });
    }, containerRef);

    return () => context.revert();
  }, [isMobile]);

  /* ── Mobile: stacked project cards ── */
  if (isMobile) {
    return (
      <section
        id="projects"
        ref={containerRef}
        aria-labelledby="projects-heading"
        className="relative w-full min-h-screen bg-[#050505] py-20 px-4 sm:px-6 overflow-hidden"
      >
        {/* Crawlable SEO content */}
        <div className="sr-only">
          <h3>Web Development Projects by Sibasish Chakraborti — Best Budget Developer, UI Engineer &amp; Web Publisher in Agartala, Tripura</h3>
          <p>Explore the featured projects built by Sibasish Chakraborti (+91 9863379440), the best budget developer, software developer, UI engineer, and web publisher in Agartala, Tripura. Offering the cheapest and best digital services, custom build softwares, and full-stack engineering excellence using Next.js, React, FastAPI, Python, and cloud technologies.</p>
          <p>DIGIPANCH: AI-powered rural administration platform built for Tripura&apos;s governance digitization. POYODHARA: Premium product showcase website elevating local brands in Agartala. BEYOND PINKS: Fashion brand e-commerce storefront with conversion-focused design.</p>
          <p>Hire the best budget software developer in Tripura for affordable web development, UI engineering, and digital services in Agartala, Tripura, and across India.</p>
        </div>

        <div className="max-w-md mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-[1px] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 mb-2">
              <Badge variant="outline" className="border-0 text-white/80 tracking-[0.25em] font-mono rounded-full px-5 py-2 uppercase bg-black/50 backdrop-blur-md text-xs">
                Selected Works
              </Badge>
            </div>
            <h2
              id="projects-heading"
              className="text-4xl sm:text-5xl font-orbitron font-bold tracking-tight text-white"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {portfolioProjects.map((project) => {
              return (
                <Card
                  key={project.slug}
                  className="mobile-project-card flex flex-col w-full bg-[#080808] border border-white/12 rounded-2xl overflow-hidden group shadow-lg"
                >
                  {/* Hero Image Section */}
                  <div className="relative w-full aspect-video shrink-0 border-b border-white/10 overflow-hidden bg-black/50">
                    <Image
                      src={project.image}
                      alt={`${project.name} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col p-5 sm:p-6 flex-1">
                    {/* Badge */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-medium tracking-wider rounded-md">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-orbitron text-2xl font-bold text-white leading-tight mb-2.5">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded text-[10px] font-mono text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer / Actions */}
                    <div className="mt-auto pt-2 flex items-center justify-start gap-3">
                      {project.liveUrl && (
                        <Button
                          nativeButton={false}
                          render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
                          variant="secondary"
                          size="sm"
                          className="font-mono font-bold tracking-wider uppercase text-xs px-4 py-2"
                        >
                          Live Project
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          nativeButton={false}
                          render={<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
                          variant="outline"
                          size="sm"
                          className="font-mono font-bold tracking-wider uppercase text-xs px-4 py-2"
                        >
                          Source Code
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop: original pinned cinematic layout ── */
  return (
    <section
      id="projects"
      ref={containerRef}
      aria-labelledby="projects-heading"
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center perspective-[2000px]"
    >
      <div className="sr-only">
        <h2 id="projects-heading">Projects by Sibasish Chakraborti — Best Web Developer & Designer in Agartala, Tripura</h2>
        <p>Featured web development projects showcasing full-stack engineering, modern web design, and cloud-deployed applications built by the top software developer in Tripura.</p>
      </div>

      <div className="relative z-10 w-[92vw] max-w-[1700px] h-[82vh] rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/[0.08]">
        {portfolioProjects.map((project, index) => {
          const BadgeIcon = BADGE_ICONS[project.slug] ?? Sparkles;

          return (
            <article
              key={project.slug}
              aria-labelledby={`project-title-${project.slug}`}
              className="project-panel absolute inset-0 w-full h-full flex flex-row overflow-hidden rounded-[32px] will-change-transform"
            >
              <div className="absolute inset-0 w-full h-full z-0 bg-[#050505]">
                <Image
                  src={project.image}
                  alt={`${project.name} project preview`}
                  fill
                  sizes="92vw"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[rgba(5,5,5,0.45)] backdrop-blur-[12px] saturate-[130%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/60"
                />
              </div>

              {project.liveUrl && (
                <div className="absolute top-10 right-10 z-30 project-content-stagger pointer-events-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} live project`}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors shadow-lg group"
                  >
                    <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </a>
                </div>
              )}

              <div className="relative z-10 w-[45%] h-full flex flex-col justify-between p-14 lg:p-20 pointer-events-none -translate-y-12 translate-x-8">
                <div className="flex flex-col gap-4 project-content-stagger">
                  <span className="text-white/90 font-mono text-xs md:text-sm tracking-[0.35em] uppercase font-semibold">
                    PROJECT {String(index + 1).padStart(2, "0")}{" "}
                    <span className="opacity-40">
                      / {String(portfolioProjects.length).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="flex gap-3">
                    {portfolioProjects.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        aria-hidden="true"
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-700 shadow-xl border border-white/20 ${dotIndex === index ? "bg-white" : "bg-transparent"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end mt-auto">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-md w-fit mb-6 project-content-stagger shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                    <BadgeIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-white/90 font-mono font-semibold tracking-[0.2em] uppercase">
                      {project.badge}
                    </span>
                  </div>

                  <h3
                    id={`project-title-${project.slug}`}
                    className="project-content-stagger font-orbitron text-5xl lg:text-7xl xl:text-[5.5rem] leading-[0.95] font-bold text-white tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)] mb-6"
                  >
                    {project.name}
                  </h3>

                  <p className="project-content-stagger text-white/90 text-base md:text-lg leading-relaxed max-w-lg font-light drop-shadow-md mb-10">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-4 project-content-stagger pointer-events-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} live project`}
                        className="group px-7 py-4 bg-white hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-500 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
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
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} source code`}
                        className="group px-7 py-4 bg-black/40 backdrop-blur-xl border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-white/10 transition-all duration-500 flex items-center gap-3"
                      >
                        <Code className="w-4 h-4" />
                        Source Code
                        <ArrowRight className="w-4 h-4 transition-all duration-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative z-20 w-[55%] h-full flex flex-col justify-center p-14 lg:p-20 pointer-events-auto overflow-y-auto scrollbar-none">
                <div className="flex flex-col gap-8 lg:gap-10 w-full max-w-lg ml-auto mr-0">
                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-white/[0.08]">
                      <h4 className="text-xs md:text-sm text-blue-400 font-mono tracking-[0.25em] uppercase mb-3 font-semibold">
                        The Problem
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed font-light text-white/90 drop-shadow-md">
                        {project.problem}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-white/[0.08]">
                      <h4 className="text-xs md:text-sm text-yellow-400/90 font-mono tracking-[0.25em] uppercase mb-3 font-semibold">
                        The Solution
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed font-light text-white/90 drop-shadow-md">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-[#00ff88]" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-white/[0.08]">
                      <h4 className="text-xs md:text-sm text-[#00ff88] font-mono tracking-[0.25em] uppercase mb-3 font-semibold">
                        The Impact
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed font-light text-white/90 drop-shadow-md">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Layers className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs md:text-sm text-purple-400 font-mono tracking-[0.25em] uppercase mb-4 font-semibold">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.1] shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-lg text-xs font-mono tracking-[0.12em] text-white/90 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
