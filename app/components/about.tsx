"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

const commands = [
  { cmd: "boot.profile()", output: "loading identity...\ndone." },
  { cmd: "fetch.identity()", output: "Sibasish Chakraborti" },
  { cmd: "fetch.role()", output: "Full Stack Developer" },
  {
    cmd: "fetch.specialization()",
    output:
      "Frontend Engineering\nBackend Systems\nCloud Infrastructure\nAI Integrations",
  },
  { cmd: "fetch.current_build()", output: "Digital Panchayat Platform" },
  {
    cmd: "fetch.tech_stack()",
    output:
      "Next.js\nReact\nTypeScript\nNode.js\nFastAPI\nPython\nAWS\nDocker\nPostgreSQL\nMongoDB\nTailwind CSS\nshadcn/ui",
  },
  {
    cmd: "fetch.mission()",
    output:
      "Building scalable digital products\nthat solve meaningful real-world problems.",
  },
  { cmd: "status.ready()", output: "true" },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [booted, setBooted] = useState(false);
  const [activeCmdIndex, setActiveCmdIndex] = useState(-1);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [showOutputFor, setShowOutputFor] = useState(-1);
  const [loginTime, setLoginTime] = useState("");

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
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    const context = gsap.context(() => {
      if (mobile) {
        /* Mobile: simple fade-in, no pin, no scroll gap */
        gsap.from(leftImageRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
        gsap.from(rightPanelRef.current, {
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
        /* Desktop: original cinematic pin animation */
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
  }, []);

  useEffect(() => {
    if (!booted) return;
    if (activeCmdIndex >= commands.length) return;

    if (activeCmdIndex === -1) {
      const timer = setTimeout(() => setActiveCmdIndex(0), 350);
      return () => clearTimeout(timer);
    }

    const currentCmd = commands[activeCmdIndex].cmd;

    if (activeCharIndex < currentCmd.length) {
      let delay = Math.random() * 20 + 10;

      if (Math.random() < 0.02) {
        delay += Math.random() * 50 + 50;
      }

      const timer = setTimeout(() => {
        setActiveCharIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }

    if (activeCharIndex === currentCmd.length) {
      if (showOutputFor < activeCmdIndex) {
        const timer = setTimeout(() => {
          setShowOutputFor(activeCmdIndex);
        }, Math.random() * 100 + 50);

        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => {
        setActiveCmdIndex((prev) => prev + 1);
        setActiveCharIndex(0);
      }, Math.random() * 150 + 100);

      return () => clearTimeout(timer);
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
      className="relative w-full min-h-[100dvh] md:h-screen overflow-hidden bg-black text-white perspective-[2000px]"
    >
      <h2 id="about-heading" className="sr-only">
        About Sibasish Chakraborti
      </h2>

      {/* Crawlable content for Google — terminal text is client-rendered */}
      <div className="sr-only" aria-hidden="true">
        <p>Name: Sibasish Chakraborti</p>
        <p>Role: Full Stack Developer</p>
        <p>Specialization: Frontend Engineering, Backend Systems, Cloud Infrastructure, AI Integrations</p>
        <p>Current Build: Digital Panchayat Platform</p>
        <p>Tech Stack: Next.js, React, TypeScript, Node.js, FastAPI, Python, AWS, Docker, PostgreSQL, MongoDB, Tailwind CSS, shadcn/ui</p>
        <p>Mission: Building scalable digital products that solve meaningful real-world problems.</p>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 h-[45%] md:h-full flex items-center justify-center overflow-hidden">
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

        <div className="relative w-full md:w-1/2 h-[55%] md:h-full flex items-center justify-center p-4 md:p-8 lg:p-12 z-20">
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
                  <svg className="w-4 h-4 text-[#52a8ff]" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>
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
                      case "boot.profile()":
                        return (
                          <div className="pt-1 pb-3 text-[rgba(255,255,255,0.65)] whitespace-pre-wrap">
                            {command.output}
                          </div>
                        );
                      case "fetch.identity()":
                        return (
                          <div className="pt-2 pb-4 w-full flex justify-center">
                            <div className="text-[#ffffff] text-sm md:text-base tracking-[0.4em] md:tracking-[0.6em] font-medium uppercase">
                              {command.output}
                            </div>
                          </div>
                        );
                      case "fetch.role()":
                        return (
                          <div className="pt-1 pb-3 w-full">
                            <div className="text-white/90 tracking-wider uppercase">
                              {command.output}
                            </div>
                          </div>
                        );
                      case "fetch.specialization()":
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
                      case "fetch.current_build()":
                        return (
                          <div className="pt-1 pb-3 w-full">
                            <span className="text-white/90 tracking-wider uppercase">
                              {command.output}
                            </span>
                          </div>
                        );
                      case "fetch.tech_stack()":
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
                      case "fetch.mission()":
                        return (
                          <div className="pt-2 pb-3 w-full max-w-3xl">
                            <div className="text-white/80 leading-relaxed italic">
                              &quot;{command.output.replace("\n", " ")}&quot;
                            </div>
                          </div>
                        );
                      case "status.ready()":
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
