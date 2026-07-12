"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Briefcase,
  Camera,
  Code2,
  Mail,
  MessageCircle,
  Terminal,
  Zap,
} from "lucide-react";

import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const floatingElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(".contact-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".contact-reveal", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".headline-line", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      floatingElementsRef.current.forEach((element) => {
        gsap.to(element, {
          y: "-=4",
          duration: gsap.utils.random(3, 4),
          delay: gsap.utils.random(0, 1),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  const handleMouseEnter = (target: HTMLElement) => {
    gsap.to(target, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      borderColor: "rgba(255,255,255,0.15)",
      backgroundColor: "rgba(255,255,255,0.04)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    const arrow = target.querySelector(".arrow-icon");

    if (arrow) {
      gsap.to(arrow, { x: 3, y: -3, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    target: HTMLElement
  ) => {
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.05;

    gsap.to(target, {
      x,
      y: -10 + y,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target, {
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      borderColor: "rgba(255,255,255,0.08)",
      backgroundColor: "rgba(255,255,255,0.02)",
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });

    const arrow = target.querySelector(".arrow-icon");

    if (arrow) {
      gsap.to(arrow, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    }

    gsap.to(target, {
      y: "-=4",
      duration: gsap.utils.random(3, 4),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.6,
      overwrite: "auto",
    });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      aria-labelledby="contact-heading"
      className="relative w-full min-h-[100dvh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center pt-28 pb-24 px-8 md:px-12 lg:px-20 z-10"
    >
      <div
        aria-hidden="true"
        className="contact-bg absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050505] to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.15] bg-[url('/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="flex-1 flex flex-col justify-center">
          <div className="contact-reveal flex items-center gap-4 mb-8">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/60 text-[10px] md:text-xs tracking-[0.3em] font-semibold uppercase">
              Available for Freelance & Full-Time
            </span>
          </div>

          <h2
            id="contact-heading"
            className="text-4xl md:text-7xl lg:text-[6rem] leading-[0.95] font-bold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-8"
          >
            <div className="overflow-hidden">
              <div className="headline-line">LET&apos;S BUILD</div>
            </div>
            <div className="overflow-hidden">
              <div className="headline-line text-white/40">SOMETHING</div>
            </div>
            <div className="overflow-hidden">
              <div className="headline-line">
                AWESOME{" "}
                <span className="inline-block hover:rotate-12 transition-transform duration-300">
                  {"\u263B"}
                </span>
              </div>
            </div>
          </h2>

          <p className="contact-reveal text-white/60 text-sm md:text-base leading-relaxed max-w-md font-light">
            I&apos;m always open to discussing new opportunities, exciting
            projects, or just having a tech chat. Let&apos;s connect and create
            impact together.
          </p>
        </div>

        {/* Mobile: stacked contact cards */}
        <div className="flex-1 lg:hidden flex flex-col gap-4 w-full">
          {[
            {
              href: siteConfig.socialLinks.whatsapp,
              label: "Chat on WhatsApp",
              icon: MessageCircle,
              title: "WhatsApp",
              detail: "9863379440",
            },
            {
              href: siteConfig.socialLinks.linkedIn,
              label: "Open LinkedIn profile",
              icon: Briefcase,
              title: "LinkedIn",
              detail: "/in/sibasish-chakraborti",
            },
            {
              href: `mailto:${siteConfig.email}`,
              label: "Send an email",
              icon: Mail,
              title: "Prefer Email?",
              detail: siteConfig.email,
            },
            {
              href: siteConfig.socialLinks.instagram,
              label: "Open Instagram profile",
              icon: Camera,
              title: "Instagram",
              detail: "@sibasish__chakraborti",
            },
          ].map(({ href, label, icon: Icon, title, detail }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="contact-reveal flex items-center gap-4 p-4 bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-2xl active:scale-[0.98] active:bg-white/[0.05] transition-transform duration-150"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-0.5">
                  {title}
                </p>
                <p className="text-white text-sm font-medium tracking-wide truncate">
                  {detail}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/30 shrink-0" />
            </a>
          ))}
        </div>

        {/* Desktop: structured premium grid */}
        <div className="hidden lg:flex flex-1 flex-col justify-center gap-6 relative min-h-[600px] w-full max-w-[650px] mx-auto z-20">
          {/* Top Row: Asymmetrical Grid */}
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-6 w-full">
            {/* WhatsApp */}
            <a
              ref={(element) => {
                if (element) floatingElementsRef.current[0] = element;
              }}
              href={siteConfig.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              onMouseEnter={(event) => handleMouseEnter(event.currentTarget)}
              onMouseMove={(event) =>
                handleMouseMove(event, event.currentTarget)
              }
              onMouseLeave={(event) => handleMouseLeave(event.currentTarget)}
              className="contact-reveal group flex flex-col justify-between p-8 w-full min-h-[180px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-[2rem] shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-5 h-5 text-white opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">
                  WhatsApp
                </p>
                <p className="text-white text-base font-medium tracking-wide">
                  9863379440
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              ref={(element) => {
                if (element) floatingElementsRef.current[1] = element;
              }}
              href={siteConfig.socialLinks.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              onMouseEnter={(event) => handleMouseEnter(event.currentTarget)}
              onMouseMove={(event) =>
                handleMouseMove(event, event.currentTarget)
              }
              onMouseLeave={(event) => handleMouseLeave(event.currentTarget)}
              className="contact-reveal group flex flex-col justify-between p-8 w-full min-h-[180px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-[2rem] shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-5 h-5 text-white opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">
                  LinkedIn
                </p>
                <p className="text-white/90 text-sm leading-relaxed line-clamp-1">
                  /in/sibasish-chakraborti
                </p>
              </div>
            </a>
          </div>

          {/* Bottom Row: Asymmetrical Grid (reversed) */}
          <div className="grid grid-cols-[0.9fr_1.1fr] gap-6 w-full">
            {/* Instagram */}
            <a
              ref={(element) => {
                if (element) floatingElementsRef.current[3] = element;
              }}
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Instagram profile"
              onMouseEnter={(event) => handleMouseEnter(event.currentTarget)}
              onMouseMove={(event) =>
                handleMouseMove(event, event.currentTarget)
              }
              onMouseLeave={(event) => handleMouseLeave(event.currentTarget)}
              className="contact-reveal group flex flex-col justify-between p-8 w-full min-h-[180px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-[2rem] shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-5 h-5 text-white opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">
                  Instagram
                </p>
                <p className="text-white/90 text-sm font-medium">
                  @sibasish__chakraborti
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              ref={(element) => {
                if (element) floatingElementsRef.current[2] = element;
              }}
              href={`mailto:${siteConfig.email}`}
              aria-label="Send an email"
              onMouseEnter={(event) => handleMouseEnter(event.currentTarget)}
              onMouseMove={(event) =>
                handleMouseMove(event, event.currentTarget)
              }
              onMouseLeave={(event) => handleMouseLeave(event.currentTarget)}
              className="contact-reveal group flex flex-col justify-between p-8 w-full min-h-[180px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-[2rem] shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-5 h-5 text-white opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">
                  Prefer Email?
                </p>
                <p className="text-white text-base font-medium tracking-wide">
                  {siteConfig.email}
                </p>
              </div>
            </a>
          </div>

          {/* Stat Badges Row */}
          <div className="flex items-center justify-between gap-4 mt-2 w-full">
            <div
              ref={(element) => {
                if (element) floatingElementsRef.current[4] = element;
              }}
              className="contact-reveal flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-[1.5rem] bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-lg pointer-events-none"
            >
              <Code2 className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">
                2+ Projects
              </span>
            </div>

            <div
              ref={(element) => {
                if (element) floatingElementsRef.current[5] = element;
              }}
              className="contact-reveal flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-[1.5rem] bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-lg pointer-events-none"
            >
              <Terminal className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">
                Problem Solver
              </span>
            </div>

            <div
              ref={(element) => {
                if (element) floatingElementsRef.current[6] = element;
              }}
              className="contact-reveal flex-1 flex items-center justify-center gap-3 py-4 px-2 rounded-[1.5rem] bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-lg pointer-events-none"
            >
              <Zap className="w-4 h-4 text-white/40" />
              <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">
                100% Commitment
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative mt-16 lg:absolute lg:bottom-8 w-full text-center z-10">
        <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-semibold">
          {"\u00A9"} {new Date().getFullYear()} Sibasish Chakraborti. All
          rights reserved.
        </p>
      </footer>
    </section>
  );
}
