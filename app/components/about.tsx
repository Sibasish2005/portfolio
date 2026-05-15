"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

const commands = [
  { cmd: "boot.profile()", output: "loading identity...\ndone." },
  { cmd: "fetch.identity()", output: "Sibasish Chakraborti" },
  { cmd: "fetch.role()", output: "Full Stack Developer" },
  { cmd: "fetch.specialization()", output: "Frontend Engineering\nBackend Systems\nCloud Infrastructure\nAI Integrations" },
  { cmd: "fetch.current_build()", output: "Digital Panchayat Platform" },
  { cmd: "fetch.tech_stack()", output: "Next.js\nReact\nTypeScript\nNode.js\nFastAPI\nPython\nAWS\nDocker\nPostgreSQL\nMongoDB\nTailwind CSS\nshadcn/ui" },
  { cmd: "fetch.mission()", output: "Building scalable digital products\nthat solve meaningful real-world problems." },
  { cmd: "status.ready()", output: "true" },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [booted, setBooted] = useState(false);
  const [activeCmdIndex, setActiveCmdIndex] = useState(-1);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [showOutputFor, setShowOutputFor] = useState(-1);

  // Cinematic GSAP Entrance
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
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
          }
        }
      });

      // Reset initial state for smooth scroll re-entry
      gsap.set(leftImageRef.current, { scale: 1, filter: "brightness(0.1) blur(10px)", opacity: 0 });
      gsap.set(rightPanelRef.current, { x: 50, opacity: 0, filter: "blur(15px)" });

      // Phase 1 & 2: Portrait zoom and fade
      tl.to(leftImageRef.current, {
        scale: 1.05,
        filter: "brightness(1) blur(0px)",
        opacity: 1,
        duration: 3,
        ease: "power2.out",
      });

      // Phase 3: Terminal HUD Panel Emerges
      tl.to(rightPanelRef.current, {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
        boxShadow: "0 0 60px rgba(255,255,255,0.02)",
        onComplete: () => {
          setBooted(true);
        }
      }, "-=2.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Realistic Human Typing Logic
  useEffect(() => {
    if (!booted) return;

    if (activeCmdIndex >= commands.length) return; // Done typing everything

    if (activeCmdIndex === -1) {
       // Initial pause before first command
       const timer = setTimeout(() => setActiveCmdIndex(0), 800);
       return () => clearTimeout(timer);
    }

    const currentCmd = commands[activeCmdIndex].cmd;

    // Typing the command characters
    if (activeCharIndex < currentCmd.length) {
      // Simulate random human typing speed (30ms to 90ms)
      let delay = Math.random() * 60 + 30;
      // Occasional longer hesitation to feel human (5% chance of 200-400ms pause)
      if (Math.random() < 0.05) delay += Math.random() * 200 + 200; 

      const timer = setTimeout(() => {
        setActiveCharIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } 
    // Finished typing the command, wait to hit Enter
    else if (activeCharIndex === currentCmd.length) {
      if (showOutputFor < activeCmdIndex) {
        // Pause before showing output (processing execution)
        const timer = setTimeout(() => {
          setShowOutputFor(activeCmdIndex);
        }, Math.random() * 300 + 200); 
        return () => clearTimeout(timer);
      } else {
        // Output is shown. Wait before typing next command
        const timer = setTimeout(() => {
          setActiveCmdIndex(prev => prev + 1);
          setActiveCharIndex(0);
        }, Math.random() * 600 + 400); 
        return () => clearTimeout(timer);
      }
    }
  }, [booted, activeCmdIndex, activeCharIndex, showOutputFor]);

  // Auto-scroll terminal to bottom as it types
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeCmdIndex, activeCharIndex, showOutputFor]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black text-white perspective-[2000px]"
    >
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        {/* Left Side: Cinematic Portrait Continuation */}
        <div className="relative w-full md:w-1/2 h-[45%] md:h-full flex items-center justify-center overflow-hidden">
          {/* Deep cinematic shadows to blend with the void (Edge only, keeping face clear) */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

          <img
            ref={leftImageRef}
            src="/about-section/about-section.png"
            alt="Profile Silhouette"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>

        {/* Right Side: Terminal HUD */}
        <div className="relative w-full md:w-1/2 h-[55%] md:h-full flex items-center justify-center p-4 md:p-8 lg:p-12 z-20">
          <Card
            ref={rightPanelRef}
            className="relative w-full max-w-[850px] h-full max-h-[80vh] flex flex-col rounded-xl md:rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.08] backdrop-blur-3xl"
            style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.01)" }}
          >
            {/* Soft Glow Edges */}
            <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* HUD Header */}
            <div className="h-12 md:h-14 bg-white/[0.02] flex items-center px-6 shrink-0 relative overflow-hidden">
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium" style={{ fontFamily: "var(--font-orbitron)" }}>
                SYSTEM PROFILE // AUTHORIZED ACCESS
              </p>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>
            </div>

            <Separator className="bg-white/[0.04] h-[1px]" />

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto py-8 pl-8 pr-6 md:py-12 md:pl-16 md:pr-10 lg:pl-20 scrollbar-none scroll-smooth" 
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <div className="w-full space-y-8 md:space-y-10 pb-12">
                {commands.map((cmd, i) => {
                  if (i > activeCmdIndex) return null; // Not reached yet

                  const isCurrentCmd = i === activeCmdIndex;
                  const typedCmd = isCurrentCmd ? cmd.cmd.substring(0, activeCharIndex) : cmd.cmd;
                  const isOutputVisible = i <= showOutputFor;

                  const renderOutput = () => {
                    switch (cmd.cmd) {
                      case "boot.profile()":
                        return (
                          <div className="pl-7 text-white/40 text-[11px] md:text-[13px] tracking-wide leading-[2] whitespace-pre-wrap">
                            {cmd.output}
                          </div>
                        );
                      case "fetch.identity()":
                        return (
                          <div className="pl-7 pt-2 pb-2 w-full pr-6">
                            <div className="text-center text-white/90 text-sm md:text-base lg:text-lg tracking-[0.4em] font-medium uppercase border-y border-white/[0.05] py-6 bg-white/[0.01]">
                              {cmd.output}
                            </div>
                          </div>
                        );
                      case "fetch.role()":
                        return (
                          <div className="pl-7 pt-1 pb-2 w-full">
                            <div className="inline-block px-4 py-2 border border-white/10 bg-white/[0.03] text-white/70 text-xs md:text-sm tracking-[0.2em] rounded uppercase">
                              {cmd.output}
                            </div>
                          </div>
                        );
                      case "fetch.specialization()":
                        return (
                          <div className="pl-7 pt-2 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 w-full max-w-2xl">
                            {cmd.output.split("\n").map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-white/50 text-[11px] md:text-[12px] tracking-widest uppercase">
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                {item}
                              </div>
                            ))}
                          </div>
                        );
                      case "fetch.current_build()":
                        return (
                          <div className="pl-7 pt-1 pb-2 flex items-center gap-4 w-full">
                            <span className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" />
                            <span className="text-white/60 text-[11px] md:text-xs tracking-widest uppercase">{cmd.output}</span>
                          </div>
                        );
                      case "fetch.tech_stack()":
                        return (
                          <div className="pl-7 pt-3 pb-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4 w-full">
                            {cmd.output.split("\n").map((tech, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-white/40 text-[10px] md:text-[11px] tracking-wider uppercase">
                                <span className="text-white/20">/</span> {tech}
                              </div>
                            ))}
                          </div>
                        );
                      case "fetch.mission()":
                        return (
                          <div className="pl-7 pt-4 pb-2 w-full max-w-2xl pr-6">
                            <div className="border-l-2 border-white/20 pl-6 py-2 text-white/50 text-xs md:text-[13px] leading-relaxed tracking-widest italic">
                              "{cmd.output.replace("\n", " ")}"
                            </div>
                          </div>
                        );
                      case "status.ready()":
                        return (
                          <div className="pl-7 pt-2 pb-2 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                            <span className="text-green-400/80 tracking-[0.2em] text-[10px] md:text-xs uppercase">System Ready</span>
                          </div>
                        );
                      default:
                        return (
                          <div className="pl-7 text-white/40 text-[11px] md:text-[13px] tracking-wide leading-[2] whitespace-pre-wrap">
                            {cmd.output}
                          </div>
                        );
                    }
                  };

                  return (
                    <React.Fragment key={cmd.cmd}>
                      {/* Command Input */}
                      <div className="flex items-start gap-4 text-xs md:text-sm">
                        <span className="text-white/20 shrink-0 mt-[1px] font-light">{">"}</span>
                        <span className="text-white/70 tracking-widest font-light break-all relative">
                          {typedCmd}
                          {/* Active Blinking Cursor while typing */}
                          {isCurrentCmd && !isOutputVisible && (
                            <span className="inline-block w-1.5 h-[14px] md:h-[16px] bg-white/60 ml-1.5 align-middle animate-[pulse_0.8s_ease-in-out_infinite]" />
                          )}
                        </span>
                      </div>

                      {/* Command Output */}
                      {isOutputVisible && cmd.output && (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-500">
                          {renderOutput()}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Final Idle Cursor */}
                {activeCmdIndex >= commands.length && (
                  <div className="flex items-center gap-4 mt-8 pt-4">
                    <span className="text-white/20 shrink-0 font-light">{">"}</span>
                    <span className="w-1.5 h-[14px] md:h-[16px] bg-white/40 animate-[pulse_1s_ease-in-out_infinite]" />
                  </div>
                )}
              </div>
            </div>

            {/* Premium Cinematic Scanlines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl md:rounded-2xl opacity-10 mix-blend-overlay">
              <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px]" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

