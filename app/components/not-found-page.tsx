"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Terminal } from "lucide-react";

import Navbar from "./navbar";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".bg-gradient-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.inOut" }
      );

      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".visual-card", {
        y: 60,
        opacity: 0,
        rotation: 2,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.to(".visual-card", {
        y: "-=12",
        rotation: "-=1",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.3,
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col font-sans"
    >
      <Navbar />

      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="bg-gradient-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050505] to-[#050505]" />
        <div className="absolute inset-0 opacity-[0.15] bg-[url('/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex-1 w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center pt-24 pb-12 gap-16 lg:gap-24">
        <div className="flex-1 flex flex-col justify-center w-full mt-10 lg:mt-0">
          <div className="reveal-text text-[10px] md:text-xs tracking-[0.3em] font-semibold uppercase text-white/50 mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse" />
            System Notice
          </div>

          <h1 className="reveal-text text-8xl md:text-[9rem] lg:text-[11rem] leading-none font-bold text-white tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-6">
            404
          </h1>

          <h2 className="reveal-text text-2xl md:text-3xl lg:text-4xl leading-tight font-bold text-white tracking-tight mb-8">
            THIS PAGE DOESN&apos;T EXIST.
            <br />
            <span className="text-white/40">BUT THE TALENT DOES.</span>
          </h2>

          <p className="reveal-text text-white/60 text-sm md:text-base leading-relaxed max-w-lg font-light mb-12">
            I may not have years of corporate experience on paper, but every
            strong engineer gets their first opportunity somewhere. Hire me.
            Let me turn curiosity, consistency, and execution into impact.
          </p>

          <div className="reveal-text flex flex-col sm:flex-row gap-6">
            <Link
              href="/#contact"
              className="group relative flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Hire to Create Experience</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/80 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center px-8 py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase text-white/60 border border-white/10 hover:bg-white/5 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end items-center relative">
          <div className="visual-card w-full max-w-[480px] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-wider">
                <Terminal className="w-3 h-3" />
                404.log
              </div>
            </div>

            <div className="font-mono text-xs md:text-sm space-y-4 text-white/60">
              <div className="flex gap-4">
                <span className="text-white/30">01</span>
                <span>
                  <span className="text-red-400">Error:</span> Route navigation
                  failed.
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-white/30">02</span>
                <span>
                  Target path <span className="text-white">unreachable</span>.
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-white/30">03</span>
                <span className="text-white/30">
                  Initializing fallback protocols...
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-white/30">04</span>
                <span className="text-green-400">Success:</span>
              </div>
              <div className="flex gap-4">
                <span className="text-white/30">05</span>
                <span>Developer profile intercepted.</span>
              </div>
              <div className="flex gap-4 mt-8 pt-4 border-t border-white/[0.05]">
                <span className="text-white/30">06</span>
                <span className="text-white/80 animate-pulse">
                  Waiting for recruiter connection_
                </span>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none z-[-1]" />
        </div>
      </div>

      <div className="absolute bottom-8 w-full text-center z-10 opacity-40">
        <p className="text-[10px] text-white tracking-[0.2em] uppercase font-semibold">
          {"\u00A9"} {new Date().getFullYear()} SIBASISH CHAKRABORTI
        </p>
      </div>
    </main>
  );
}
