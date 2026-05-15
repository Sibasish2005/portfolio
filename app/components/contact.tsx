"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Mail, 
  MessageCircle, 
  Camera, 
  Briefcase,
  Code2,
  Layers,
  Zap,
  Terminal
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const floatingElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background parallax
      gsap.to(".contact-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Reveal animation
      gsap.from(".contact-reveal", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
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
        }
      });

      // Subtle Idle Breathing Motion
      floatingElementsRef.current.forEach((el, index) => {
        gsap.to(el, {
          y: "-=4",
          scale: 1.01,
          rotation: 0.5,
          duration: gsap.utils.random(3, 4),
          delay: gsap.utils.random(0, 1),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        
        // Micro animation for icons inside cards
        const icon = el.querySelector('.lucide');
        if (icon) {
          gsap.to(icon, {
            rotation: 2,
            scale: 1.05,
            duration: gsap.utils.random(2, 3),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
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
    const arrow = target.querySelector('.arrow-icon');
    if (arrow) {
      gsap.to(arrow, { x: 3, y: -3, duration: 0.3, ease: "power2.out" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05; // 3-8px max parallax
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    
    gsap.to(target, {
      x: x,
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
      ease: "power2.out", // smooth, NO elastic bounce
      overwrite: "auto",
    });
    const arrow = target.querySelector('.arrow-icon');
    if (arrow) {
      gsap.to(arrow, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    }
    
    // Restart idle breathing
    gsap.to(target, {
      y: "-=4",
      scale: 1.01,
      rotation: 0.5,
      duration: gsap.utils.random(3, 4),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.6,
      overwrite: "auto"
    });
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 lg:px-20 z-10"
    >
      {/* Deep Space / Atmospheric Background */}
      <div className="contact-bg absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050505] to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
        {/* Subtle noise/texture overlay */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('/noise.png')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Headline */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="contact-reveal flex items-center gap-4 mb-8">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/60 text-[10px] md:text-xs tracking-[0.3em] font-semibold uppercase">
              Available for Freelance & Full-Time
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] font-bold text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] mb-8">
            <div className="overflow-hidden"><div className="headline-line">LET'S BUILD</div></div>
            <div className="overflow-hidden"><div className="headline-line text-white/40">SOMETHING</div></div>
            <div className="overflow-hidden">
              <div className="headline-line">AWESOME <span className="inline-block hover:rotate-12 transition-transform duration-300">☻</span></div>
            </div>
          </h2>
          
          <p className="contact-reveal text-white/60 text-sm md:text-base leading-relaxed max-w-md font-light">
            I'm always open to discussing new opportunities, exciting projects, or just having a tech chat. Let's connect and create impact together.
          </p>
        </div>

        {/* Right Column: Floating Anti-Gravity Cards */}
        <div className="flex-1 relative min-h-[600px] flex items-center justify-center">
          
          {/* Main Social Cards */}
          <div className="absolute w-full h-full">
            
            {/* WhatsApp */}
            <a 
              ref={el => { if (el) floatingElementsRef.current[0] = el; }}
              href="https://wa.me/9863379440"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="contact-reveal absolute top-[10%] left-[5%] md:left-[10%] group flex flex-col gap-4 p-6 w-[240px] md:w-[280px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-3xl transition-shadow shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-4 h-4 opacity-50 transition-opacity" />
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">WhatsApp</h4>
                <p className="text-white text-sm font-medium tracking-wide">9863379440</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a 
              ref={el => { if (el) floatingElementsRef.current[1] = el; }}
              href="https://www.linkedin.com/in/sibasish-chakraborti-5b55b82b1/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="contact-reveal absolute top-[30%] right-[0%] md:-right-[5%] lg:right-[5%] group flex flex-col gap-4 p-6 w-[260px] md:w-[300px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-3xl transition-shadow shadow-xl z-20"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-4 h-4 opacity-50 transition-opacity" />
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">LinkedIn</h4>
                <p className="text-white/90 text-xs leading-relaxed line-clamp-1">/in/sibasish-chakraborti</p>
              </div>
            </a>

            {/* Email */}
            <a 
              ref={el => { if (el) floatingElementsRef.current[2] = el; }}
              href="mailto:sibasishchakraborti@gmail.com"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="contact-reveal absolute bottom-[15%] left-[0%] md:left-[15%] group flex flex-col gap-4 p-6 w-[260px] md:w-[320px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-3xl transition-shadow shadow-xl z-30"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-4 h-4 opacity-50 transition-opacity" />
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">Prefer Email?</h4>
                <p className="text-white text-xs md:text-sm font-medium tracking-wide">sibasishchakraborti@gmail.com</p>
              </div>
            </a>

            {/* Instagram */}
            <a 
              ref={el => { if (el) floatingElementsRef.current[3] = el; }}
              href="https://instagram.com/sibasish__chakraborti"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="contact-reveal absolute bottom-[0%] right-[10%] md:right-[15%] group flex flex-col gap-4 p-6 w-[220px] md:w-[260px] bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.08] rounded-3xl transition-shadow shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="arrow-icon w-4 h-4 opacity-50 transition-opacity" />
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">Instagram</h4>
                <p className="text-white/90 text-xs font-medium">@sibasish__chakraborti</p>
              </div>
            </a>

            {/* Small Stat Cards Floating Around */}
            <div 
              ref={el => { if (el) floatingElementsRef.current[4] = el; }}
              className="contact-reveal hidden md:flex absolute top-[60%] left-[5%] flex-col items-center justify-center p-4 w-[110px] h-[110px] rounded-2xl bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-lg pointer-events-none"
            >
              <Code2 className="w-5 h-5 text-white/40 mb-2" />
              <span className="text-xl font-bold text-white mb-1">2+</span>
              <span className="text-[8px] text-white/40 uppercase tracking-widest text-center">Projects</span>
            </div>
            

            <div 
              ref={el => { if (el) floatingElementsRef.current[5] = el; }}
              className="contact-reveal hidden lg:flex absolute top-[15%] right-[25%] flex-col items-center justify-center p-4 w-[120px] h-[120px] rounded-2xl bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-lg pointer-events-none"
            >
              <Terminal className="w-5 h-5 text-white/40 mb-2" />
              <span className="text-sm font-semibold text-white/80 mb-1 text-center">Problem<br/>Solver</span>
            </div>

            <div 
              ref={el => { if (el) floatingElementsRef.current[6] = el; }}
              className="contact-reveal hidden md:flex absolute bottom-[35%] right-[5%] flex-col items-center justify-center p-4 w-[100px] h-[100px] rounded-2xl bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-lg pointer-events-none z-10"
            >
              <Zap className="w-5 h-5 text-white/40 mb-2" />
              <span className="text-xl font-bold text-white mb-1">100%</span>
              <span className="text-[8px] text-white/40 uppercase tracking-widest text-center">Commitment</span>
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-8 w-full text-center z-10">
        <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-semibold">
          © {new Date().getFullYear()} Sibasish Chakraborti. All rights reserved.
        </p>
      </div>
    </section>
  );
}
