"use client";

import React, { useEffect, useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

const BADGE_ICONS: Record<string, LucideIcon> = {
  digipanch: Landmark,
  poyodhara: Sparkles,
  "beyond-pinks": ShoppingBag,
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) {
      /* Mobile: simple fade-in for each card, no pin */
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".mobile-project-card")
          .forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 40,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            });
          });
      }, containerRef);
      return () => context.revert();
    }

    /* Desktop: original cinematic pinned scroll-through */
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");

      gsap.set(panels.slice(1), {
        autoAlpha: 0,
        scale: 1.05,
        filter: "blur(20px)",
      });
      gsap.set(panels[0], { autoAlpha: 1, scale: 1, filter: "blur(0px)" });

      panels.forEach((panel, index) => {
        const contentElements =
          panel.querySelectorAll(".project-content-stagger");

        if (index > 0) {
          gsap.set(contentElements, { opacity: 0, y: 30 });
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 150}%`,
          pin: true,
          scrub: 2.5,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.8, max: 1.5 },
            delay: 0.01,
            ease: "power3.inOut",
          },
        },
      });

      panels.forEach((panel, index) => {
        const contentElements =
          panel.querySelectorAll(".project-content-stagger");

        if (index === 0) {
          timeline.to({}, { duration: 1 });
          return;
        }

        const previousPanel = panels[index - 1];
        const previousContent =
          previousPanel.querySelectorAll(".project-content-stagger");
        const startTime = (index - 1) * 2 + 1;

        timeline.to(
          previousPanel,
          {
            autoAlpha: 0,
            scale: 0.95,
            filter: "blur(20px)",
            duration: 1.5,
            ease: "power3.inOut",
          },
          startTime
        );
        timeline.to(
          previousContent,
          {
            opacity: 0,
            y: -30,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.inOut",
          },
          startTime
        );

        timeline.to(
          panel,
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.inOut",
          },
          startTime + 0.3
        );
        timeline.to(
          contentElements,
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
          },
          startTime + 0.8
        );

        timeline.to({}, { duration: 1 });
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
        className="relative w-full bg-[#050505] py-20 px-4"
      >
        <h2
          id="projects-heading"
          className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold mb-8 text-center"
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          Selected Projects
        </h2>

        <div className="flex flex-col gap-8">
          {portfolioProjects.map((project, index) => {
            const BadgeIcon = BADGE_ICONS[project.slug] ?? Sparkles;

            return (
              <article
                key={project.slug}
                aria-labelledby={`project-title-${project.slug}`}
                className="mobile-project-card relative w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A]"
              >
                {/* Background image */}
                <div className="relative w-full h-48">
                  <Image
                    src={project.image}
                    alt={`${project.name} project preview`}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0A0A0A]"
                  />
                  {/* Badge overlay */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
                    <BadgeIcon className="w-3 h-3 text-blue-400" />
                    <span className="text-[9px] text-white/80 font-semibold tracking-[0.15em] uppercase">
                      {project.badge}
                    </span>
                  </div>
                  {/* Index indicator */}
                  <span className="absolute top-4 left-4 text-white/60 font-medium text-[10px] tracking-[0.3em] uppercase">
                    {String(index + 1).padStart(2, "0")}{" "}
                    <span className="opacity-40">
                      / {String(portfolioProjects.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-5">
                  <h3
                    id={`project-title-${project.slug}`}
                    className="text-2xl font-bold text-white tracking-tight leading-tight"
                  >
                    {project.name}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    {project.shortDescription}
                  </p>

                  {/* Problem / Solution / Impact */}
                  <div className="space-y-4">
                    {[
                      {
                        icon: Lock,
                        label: "Problem",
                        text: project.problem,
                      },
                      {
                        icon: Lightbulb,
                        label: "Solution",
                        text: project.solution,
                      },
                      {
                        icon: TrendingUp,
                        label: "Impact",
                        text: project.impact,
                      },
                    ].map(({ icon: Icon, label, text }) => (
                      <div key={label} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white/60" />
                        </div>
                        <div className="flex-1 pb-4 border-b border-white/[0.06]">
                          <h4 className="text-[9px] text-white/60 tracking-[0.2em] uppercase mb-1.5 font-semibold">
                            {label}
                          </h4>
                          <p className="text-xs leading-relaxed font-light text-white/80">
                            {text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-white/50" />
                      <h4 className="text-[9px] text-white/60 tracking-[0.2em] uppercase font-semibold">
                        Tech Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-[10px] tracking-[0.1em] text-white/80 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} live project`}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/95 text-black text-[11px] font-bold uppercase tracking-[0.1em] rounded-xl"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} source code`}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/[0.05] border border-white/10 text-white text-[11px] font-bold uppercase tracking-[0.1em] rounded-xl"
                      >
                        <Code className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
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
      <h2 id="projects-heading" className="sr-only">
        Selected projects
      </h2>

      <div className="relative z-10 w-[92vw] max-w-[1700px] h-[82vh] rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/[0.08]">
        {portfolioProjects.map((project, index) => {
          const BadgeIcon = BADGE_ICONS[project.slug] ?? Sparkles;

          return (
            <article
              key={project.slug}
              aria-labelledby={`project-title-${project.slug}`}
              className="project-panel absolute inset-0 w-full h-full flex flex-row overflow-hidden rounded-[32px]"
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
                  <span className="text-white/80 font-medium text-[11px] tracking-[0.3em] uppercase">
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
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-700 shadow-xl border border-white/20 ${
                          dotIndex === index ? "bg-white" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end mt-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md w-fit mb-6 project-content-stagger shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                    <BadgeIcon className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] text-white/80 font-semibold tracking-[0.15em] uppercase">
                      {project.badge}
                    </span>
                  </div>

                  <h3
                    id={`project-title-${project.slug}`}
                    className="project-content-stagger text-6xl lg:text-[6rem] leading-[0.95] font-bold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-6"
                  >
                    {project.name}
                  </h3>

                  <p className="project-content-stagger text-white/80 text-base leading-relaxed max-w-md font-light drop-shadow-md mb-10">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-4 project-content-stagger pointer-events-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} live project`}
                        className="group px-6 py-4 bg-white/95 hover:bg-white text-black text-xs font-bold uppercase tracking-[0.1em] rounded-xl transition-all duration-500 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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
                        className="group px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs font-bold uppercase tracking-[0.1em] rounded-xl hover:bg-white/10 transition-all duration-500 flex items-center gap-3"
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Lock className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-white/[0.08]">
                      <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-semibold">
                        The Problem
                      </h4>
                      <p className="text-[15px] leading-relaxed font-light text-white/90 drop-shadow-md">
                        {project.problem}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-white/[0.08]">
                      <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-semibold">
                        The Solution
                      </h4>
                      <p className="text-[15px] leading-relaxed font-light text-white/90 drop-shadow-md">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1 pb-8 border-b border-white/[0.08]">
                      <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-3 font-semibold">
                        The Impact
                      </h4>
                      <p className="text-[15px] leading-relaxed font-light text-white/90 drop-shadow-md">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 project-content-stagger group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Layers className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] text-white/70 tracking-[0.2em] uppercase mb-4 font-semibold">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-white/[0.05] backdrop-blur-md border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full text-[10px] tracking-[0.1em] text-white/90 font-medium"
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
