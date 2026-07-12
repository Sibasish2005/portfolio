"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const commands = [
  { cmd: "load profile", output: "loading identity...\ndone." },
  { cmd: "show name", output: "Sibasish Chakraborti" },
  { cmd: "show role", output: "Full Stack Developer" },
  {
    cmd: "show specializations",
    output:
      "Frontend Engineering\nBackend Systems\nCloud Infrastructure\nAI Integrations",
  },
  { cmd: "show current project", output: "Digital Panchayat Platform" },
  {
    cmd: "show tech stack",
    output:
      "Next.js\nReact\nTypeScript\nNode.js\nFastAPI\nPython\nAWS\nDocker\nPostgreSQL\nMongoDB\nTailwind CSS\nshadcn/ui",
  },
  {
    cmd: "show mission",
    output:
      "I'm on a mission to be the best web designer and web developer in Agartala, Tripura.\nBuilding scalable digital products that solve meaningful real-world problems as a top software developer.",
  },
  { cmd: "show location", output: "Agartala, Tripura, India" },
  { cmd: "check status", output: "true" },
];

import { useMobile } from "@/hooks/use-mobile";

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [booted, setBooted] = useState(false);
  const [activeCmdIndex, setActiveCmdIndex] = useState(-1);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [showOutputFor, setShowOutputFor] = useState(-1);
  const [loginTime, setLoginTime] = useState("");
  const isMobile = useMobile();

  useEffect(() => {
    const formatTerminalDate = (date: Date) => {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const wday = weekdays[date.getDay()];
      const mon = months[date.getMonth()];
      const day = date.getDate();
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      const ss = String(date.getSeconds()).padStart(2, "0");
      return `${wday} ${mon} ${day} ${hh}:${mm}:${ss}`;
    };
    setLoginTime(formatTerminalDate(new Date()));
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      if (isMobile) {
        /* Mobile: simple fade-in, no pin, no scroll gap */
        gsap.from(leftImageRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });

        gsap.from(mobilePanelRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          onComplete: () => setBooted(true),
        });
      } else {
        /* Desktop: cinematic pin animation */
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: false,
            toggleActions: "play none none reverse",
            onLeaveBack: () => {
              setBooted(false);
              setActiveCmdIndex(-1);
              setActiveCharIndex(0);
              setShowOutputFor(-1);
            },
          },
        });

        gsap.set(leftImageRef.current, {
          scale: 1,
          filter: "brightness(0.1) blur(10px)",
          opacity: 0,
        });
        gsap.set(rightPanelRef.current, {
          x: 50,
          opacity: 0,
          filter: "blur(15px)",
        });

        timeline.to(leftImageRef.current, {
          scale: 1.05,
          filter: "brightness(1) blur(0px)",
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        });

        timeline.to(
          rightPanelRef.current,
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            boxShadow: "0 0 60px rgba(255,255,255,0.02)",
            onComplete: () => {
              setBooted(true);
            },
          },
          "-=0.8"
        );
      }
    }, containerRef);

    return () => context.revert();
  }, [isMobile]);

  useEffect(() => {
    if (!booted) return;
    if (activeCmdIndex >= commands.length) return;

    if (activeCmdIndex === -1) {
      const timer = setTimeout(() => setActiveCmdIndex(0), 350);
      return () => clearTimeout(timer);
    }

    const currentCmd = commands[activeCmdIndex];
    if (!currentCmd) return;

    if (activeCharIndex < currentCmd.cmd.length) {
      const charTimer = setTimeout(() => {
        setActiveCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(charTimer);
    } else {
      const outputTimer = setTimeout(() => {
        setShowOutputFor(activeCmdIndex);
        setTimeout(() => {
          setActiveCmdIndex((prev) => prev + 1);
          setActiveCharIndex(0);
        }, 400);
      }, 200);
      return () => clearTimeout(outputTimer);
    }
  }, [booted, activeCmdIndex, activeCharIndex, showOutputFor]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeCmdIndex, activeCharIndex, showOutputFor]);

  return (
    <section
      id="about"
      ref={containerRef}
      aria-labelledby="about-heading"
      className="relative w-full min-h-[100dvh] md:h-screen overflow-hidden bg-black text-white perspective-[2000px] flex flex-col px-8 md:px-0"
    >
      <h2 id="about-heading" className="sr-only">
        About Sibasish Chakraborti
      </h2>

      {/* Crawlable content for Google — terminal text is client-rendered */}
      <div className="sr-only" aria-hidden="true">
        <h1>I am the best Web Designer and Web Developer in Agartala, Tripura</h1>
        <p>Name: Sibasish Chakraborti - Top Software Developer in Tripura</p>
        <p>Role: Full Stack Developer, Expert Web Designer, and Software Developer in Agartala.</p>
        <p>Specialization: Frontend Engineering, Backend Systems, Cloud Infrastructure, AI Integrations. Providing the best web development services in Tripura.</p>
        <p>Current Build: Digital Panchayat Platform - Empowering rural governance through software development.</p>
        <p>Tech Stack: Next.js, React, TypeScript, Node.js, FastAPI, Python, AWS, Docker, PostgreSQL, MongoDB, Tailwind CSS, shadcn/ui</p>
        <p>Mission: I'm on a mission to be the best web designer and web developer in Agartala, Tripura. Building scalable digital products that solve meaningful real-world problems and help local businesses grow.</p>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 h-[45dvh] md:h-full flex items-center justify-center overflow-hidden shrink-0">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"
          />

          <Image
            ref={leftImageRef}
            src="/about-section/about-section.png"
            alt="Portrait of Sibasish Chakraborti"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>

        {/* ── Mobile View: Premium Redesign ── */}
        <div className="md:hidden relative w-full flex-1 flex flex-col z-20 pb-4">
          {/* Top overlay to fade out the image bottom edge slightly */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent -translate-y-full pointer-events-none" />

          <div ref={mobilePanelRef} className="flex-1 w-full bg-[#080808] rounded-[32px] px-6 pt-8 pb-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/[0.08] overflow-y-auto">
            <div className="w-full max-w-sm mx-auto flex flex-col">

              {/* Handle bar for aesthetic */}
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />

              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase">Online</span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                  Profile.sys
                </span>
              </div>

              <h3 className="text-4xl font-light tracking-tight mb-2 text-white">
                Sibasish <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Chakraborti</span>
              </h3>

              <p className="text-xs text-white/50 font-mono uppercase tracking-[0.2em] mb-8">
                Full Stack Developer
              </p>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-8">
                <p className="text-[13px] font-light leading-relaxed text-white/80 mb-3">
                  I'm on a mission to be the <strong className="text-white font-medium">best web designer and web developer in Agartala, Tripura</strong>.
                </p>
                <p className="text-xs font-light leading-relaxed text-white/60">
                  As a passionate software developer, I specialize in crafting premium web applications, modern UIs, and robust backend systems. Building scalable digital products that solve meaningful real-world problems and help businesses thrive in the digital age.
                </p>
              </div>

              <div className="space-y-8">
                {/* Specializations */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                    <span className="w-1 h-1 bg-white/40 rounded-full" /> Specializations
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Frontend Eng", "Backend Sys", "Cloud Infra", "AI Integration"].map((spec) => (
                      <div key={spec} className="p-3 rounded-xl bg-[#111] border border-white/[0.04] text-center shadow-inner">
                        <p className="text-[11px] text-white/80 font-medium tracking-wide">{spec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Build */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                    <span className="w-1 h-1 bg-white/40 rounded-full" /> Current Build
                  </h4>
                  <div className="w-full p-4 rounded-xl bg-gradient-to-r from-white/[0.05] to-white/[0.01] border border-white/[0.05] relative overflow-hidden group">
                    <p className="relative z-10 text-sm text-white/90 font-medium tracking-wide">
                      Digital Panchayat Platform
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                    <span className="w-1 h-1 bg-white/40 rounded-full" /> Core Tech
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "MongoDB"].map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-black border border-white/[0.08] rounded-full text-[11px] text-white/70 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Desktop View: Terminal Layout ── */}
        <div className="hidden md:flex relative w-full md:w-1/2 h-[55%] md:h-full items-center justify-center p-4 md:p-8 lg:p-12 z-20">
          <Card
            ref={rightPanelRef}
            className="relative w-full max-w-[850px] h-full max-h-[80vh] flex flex-col rounded-xl md:rounded-xl overflow-hidden bg-[#0d0d0d]/95 border border-white/10 backdrop-blur-3xl"
            style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)" }}
          >
            {/* macOS Terminal Title Bar */}
            <div className="h-10 md:h-12 bg-white/[0.05] flex items-center px-4 shrink-0 relative overflow-hidden border-b border-white/[0.05]">
              <div className="flex items-center gap-2 z-10">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/20" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/20" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[13px] text-white/50 font-medium font-sans flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#52a8ff]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2h-8l-2-2z" /></svg>
                  sibasish@MacBook-Pro ~ %
                </p>
              </div>

            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto py-6 pr-6 pl-10 md:py-12 md:pr-12 md:pl-20 scrollbar-none scroll-smooth"
              style={{ fontFamily: 'Menlo, Monaco, "SF Mono", monospace' }}
            >
              <div className="w-full pb-12 text-[13px] md:text-[14px] leading-relaxed">
                <div className="text-[rgba(255,255,255,0.65)] mb-2 min-h-[1.5em]">
                  {loginTime ? `Last login: ${loginTime} on ttys000` : "\u00A0"}
                </div>
                {commands.map((command, index) => {
                  if (index > activeCmdIndex) return null;

                  const isCurrentCmd = index === activeCmdIndex;
                  const typedCmd = isCurrentCmd
                    ? command.cmd.substring(0, activeCharIndex)
                    : command.cmd;
                  const isOutputVisible = index <= showOutputFor;

                  const renderOutput = () => {
                    switch (command.cmd) {
                      case "load profile":
                        return (
                          <div className="pt-1 pb-3 text-[rgba(255,255,255,0.65)] whitespace-pre-wrap">
                            {command.output}
                          </div>
                        );
                      case "show name":
                        return (
                          <div className="pt-2 pb-4 w-full flex justify-center">
                            <div className="text-[#ffffff] text-sm md:text-base tracking-[0.4em] md:tracking-[0.6em] font-medium uppercase">
                              {command.output}
                            </div>
                          </div>
                        );
                      case "show role":
                        return (
                          <div className="pt-1 pb-3 w-full">
                            <div className="text-white/90 tracking-wider uppercase">
                              {command.output}
                            </div>
                          </div>
                        );
                      case "show specializations":
                        return (
                          <div className="pt-2 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 w-full max-w-2xl">
                            {command.output.split("\n").map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-3 text-white/80 uppercase"
                              >
                                <span className="text-white/60">•</span>
                                {item}
                              </div>
                            ))}
                          </div>
                        );
                      case "show current project":
                        return (
                          <div className="pt-1 pb-3 w-full">
                            <span className="text-white/90 tracking-wider uppercase">
                              {command.output}
                            </span>
                          </div>
                        );
                      case "show tech stack":
                        return (
                          <div className="pt-2 pb-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-4 w-full">
                            {command.output.split("\n").map((tech) => (
                              <div
                                key={tech}
                                className="flex items-center gap-2 text-white/80 uppercase"
                              >
                                <span className="text-white/50">/</span> {tech}
                              </div>
                            ))}
                          </div>
                        );
                      case "show mission":
                        return (
                          <div className="pt-2 pb-3 w-full max-w-3xl">
                            <div className="text-white/80 leading-relaxed italic">
                              &quot;{command.output.replace("\n", " ")}&quot;
                            </div>
                          </div>
                        );
                      case "show location":
                        return (
                          <div className="pt-1 pb-3 w-full">
                            <div className="text-white/90 tracking-wider uppercase flex items-center gap-2">
                              <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              {command.output}
                            </div>
                          </div>
                        );
                      case "check status":
                        return (
                          <div className="pt-2 pb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span className="text-[#22c55e] uppercase">
                              System Ready
                            </span>
                          </div>
                        );
                      default:
                        return (
                          <div className="pt-1 pb-3 text-[rgba(255,255,255,0.65)] whitespace-pre-wrap">
                            {command.output}
                          </div>
                        );
                    }
                  };

                  return (
                    <React.Fragment key={command.cmd}>
                      <div className="flex items-start gap-2">
                        <span className="text-[#98c379] shrink-0 font-medium">
                          sibasish@MacBook-Pro ~ %
                        </span>
                        <span className="text-[#ffffff] font-normal break-all relative">
                          {typedCmd}
                          {isCurrentCmd && !isOutputVisible && (
                            <span className="inline-block w-[7px] h-[15px] bg-white/80 ml-1 align-middle animate-[pulse_1s_step-end_infinite]" />
                          )}
                        </span>
                      </div>

                      {isOutputVisible && command.output && (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                          {renderOutput()}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

                {activeCmdIndex >= commands.length && (
                  <div className="flex items-start gap-2 mt-2">
                    <span className="text-[#98c379] shrink-0 font-medium">
                      sibasish@MacBook-Pro ~ %
                    </span>
                    <span className="inline-block w-[7px] h-[15px] bg-white/80 ml-1 align-middle animate-[pulse_1s_step-end_infinite]" />
                  </div>
                )}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl md:rounded-xl opacity-20 mix-blend-overlay"
              style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')", backgroundSize: "6px 6px" }}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
