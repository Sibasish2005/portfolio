"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Mail, MessageCircle, Phone, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { useMobile } from "@/hooks/use-mobile";

const SKILLS_DESKTOP = [
  {
    columns: [
      {
        title: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "TanStack Table",
        ],
      },
      { title: "Backend", items: ["FastAPI", "Python", "Node.js"] },
    ],
  },
  {
    columns: [
      { title: "Auth", items: ["Clerk", "AWS Cognito"] },
      { title: "Database", items: ["DynamoDB", "MongoDB", "PostgreSQL"] },
    ],
  },
  {
    columns: [
      { title: "Cloud", items: ["AWS Amplify", "AWS EC2", "VPS"] },
      { title: "Currently Learning", items: ["Docker", "LangChain / AI"] },
    ],
  },
];

const SKILLS_MOBILE = [
  "Next.js",
  "React",
  "TypeScript",
  "FastAPI",
  "Docker",
  "AWS",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  const [isContactOpen, setIsContactOpen] = useState(false);

  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const skillsDesktopRef = useRef<HTMLDivElement>(null);
  const skillsMobileRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* Mobile: simple entrance animation */
  useEffect(() => {
    if (!isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".hero-mobile-stagger");
      gsap.from(els, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  /* GSAP load animation — desktop only text effects */
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const gsapContext = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.1 });

      function fade(
        element: HTMLElement | null,
        startTime: number,
        duration: number,
        scaleIn = false
      ) {
        if (!element) return;

        timeline.fromTo(
          element,
          { autoAlpha: 0, y: scaleIn ? 0 : 40, scale: scaleIn ? 0.95 : 1 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "expo.out",
            duration: duration,
          },
          startTime
        );
      }

      fade(nameRef.current, 0.0, 2.0);
      fade(roleRef.current, 0.3, 2.0);
      fade(skillsDesktopRef.current, 0.6, 2.0);
      fade(skillsMobileRef.current, 0.6, 2.0);

      if (skillsDesktopRef.current) {
        skillsDesktopRef.current
          .querySelectorAll<HTMLElement>("[data-sg]")
          .forEach((group, index) => {
            const start = 0.8 + index * 0.15;

            timeline.fromTo(
              group,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "expo.out",
                duration: 1.8,
              },
              start
            );
          });
      }

      fade(ctaRef.current, 1.2, 2.0, true);
    }, section);

    return () => gsapContext.revert();
  }, [isMobile]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      aria-describedby="hero-summary"
      className="relative w-full h-[100dvh] md:h-screen"
    >
      <div className="sticky top-0 w-full h-full overflow-hidden bg-black">
        <div className="sr-only">
          <h1 id="hero-summary">
            Sibasish Chakraborti — Best Budget Software Developer, UI Engineering &amp; Web Publisher in Agartala, Tripura
          </h1>
          <p>
            Welcome to the portfolio of Sibasish Chakraborti (+91 9863379440), the best budget developer, software developer, UI engineer, and web publisher in Agartala, Tripura. 
            Offering the cheapest and best digital services, custom build softwares, modern UI engineering, and scalable web applications using Next.js, React, TypeScript, FastAPI, Python, and AWS.
          </p>
          <p>
            Looking for affordable software development or the best budget developer in Agartala, Tripura? Sibasish Chakraborti delivers professional UI engineering, 
            web publishing, e-commerce storefronts, and cloud deployment for businesses and startups in Agartala, Tripura, and across Northeast India. Direct Phone / WhatsApp: +91 9863379440.
          </p>
        </div>

        <div className="absolute inset-0">
          <NextImage
            src={isMobile ? "/mobile-hero-1.png" : "/hero-section/hero image.png"}
            alt="Hero background"
            fill
            priority
            className="object-cover object-[center_35%] md:object-top opacity-85"
            sizes="100vw"
            quality={80}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "50%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none z-10">
          {/* ── Desktop: absolute positioned overlays ── */}
          <div
            ref={nameRef}
            className="hidden md:block absolute left-auto right-10 lg:right-16 max-w-[420px] bottom-44"
          >
            <h1
              id="hero-title"
              className="text-6xl font-bold text-white leading-tight text-right"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Sibasish
              <br />
              Chakraborti
            </h1>
          </div>

          <div
            ref={roleRef}
            className="hidden md:block absolute left-auto right-10 lg:right-16 max-w-[420px] bottom-32"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/50 text-right">
              Full Stack Developer
            </p>
          </div>

          <div
            ref={skillsDesktopRef}
            className="hidden md:block absolute left-10 lg:left-16 max-w-[420px] bottom-12"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <div className="space-y-4">
              {SKILLS_DESKTOP.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-x-12">
                  {row.columns.map((column) => (
                    <div key={column.title} data-sg="" className="mb-3">
                      <p className="text-[10px] tracking-widest uppercase text-white/50 mb-1.5 font-semibold">
                        {column.title}
                      </p>
                      {column.items.map((item) => (
                        <p
                          key={item}
                          className="text-[10px] tracking-widest uppercase text-white/30 leading-[1.8]"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop: Direct Contact CTA Button ── */}
          <div
            ref={ctaRef}
            className="hidden md:flex absolute left-auto right-10 lg:right-16 bottom-14 pointer-events-auto items-center gap-4"
          >
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="group px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-blue-400/60 backdrop-blur-xl text-white font-mono text-xs tracking-[0.25em] uppercase font-semibold flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-95 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span>Contact / Direct Hire</span>
              <Phone className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* ── Mobile: flow-based layout with Contact Button ── */}
          <div className="md:hidden absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-8 pt-4 gap-3 pointer-events-auto">
            <div className="hero-mobile-stagger">
              <h1
                id="hero-title-mobile"
                className="text-4xl xs:text-5xl font-bold text-white leading-snug tracking-tight text-center pb-1"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                Sibasish
                <br />
                Chakraborti
              </h1>
            </div>

            <div
              className="hero-mobile-stagger"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-semibold text-center">
                Full Stack Developer &amp; UI Engineer
              </p>
            </div>

            <div
              ref={skillsMobileRef}
              className="hero-mobile-stagger"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 max-w-xs">
                {SKILLS_MOBILE.map((skill) => (
                  <p
                    key={skill}
                    className="text-[9px] tracking-widest uppercase text-white/40"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            {/* Mobile Contact Pop-up Trigger */}
            <div className="hero-mobile-stagger mt-1">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xl text-white font-mono text-xs tracking-[0.2em] uppercase font-semibold flex items-center gap-2.5 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span>Contact / Info</span>
                <Phone className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Contact Pop-up Modal ── */}
        {isContactOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Direct Contact Details"
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setIsContactOpen(false)}
          >
            <div
              className="relative w-full max-w-[420px] my-auto bg-[#0d0d0d] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Internal glow backdrop confined to modal */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
              >
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl" />
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="relative z-10 pr-8 mb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-[10px] uppercase tracking-widest font-semibold mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  Available for Hire
                </div>
                <h3 className="text-2xl sm:text-[26px] font-orbitron font-bold text-white tracking-wide leading-tight mb-1">
                  Direct Contact
                </h3>
                <p className="text-xs text-white/50 font-mono">
                  Best Budget Developer &amp; UI Engineer
                </p>
              </div>

              {/* Contact Links */}
              <div className="relative z-10 flex flex-col gap-2.5 mb-5 font-mono">
                {/* Direct Phone */}
                <a
                  href="tel:+919863379440"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">Phone</p>
                      <p className="text-white text-sm font-semibold tracking-wide">+91 9863379440</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 group-hover:translate-x-0.5 transition-transform">Call &rarr;</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/9863379440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center text-[#00ff88] shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">WhatsApp</p>
                      <p className="text-white text-sm font-semibold tracking-wide">+91 9863379440</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#00ff88] group-hover:translate-x-0.5 transition-transform">Chat &rarr;</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:sibasishchakraborti@gmail.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">Email</p>
                      <p className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">sibasishchakraborti@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-purple-400 shrink-0 group-hover:translate-x-0.5 transition-transform">Mail &rarr;</span>
                </a>
              </div>

              {/* Action Button to Contact Section */}
              <button
                type="button"
                onClick={() => {
                  setIsContactOpen(false);
                  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, options?: { offset?: number; duration?: number }) => void } }).__lenis;
                  if (lenis) {
                    lenis.scrollTo("#contact", { offset: 0, duration: 1.2 });
                  } else {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  setTimeout(() => {
                    ScrollTrigger.refresh();
                  }, 200);
                }}
                className="relative z-10 w-full py-3.5 px-4 rounded-xl bg-white hover:bg-white/95 text-black font-mono text-xs uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] cursor-pointer"
              >
                <span>Go to Full Contact Section</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
