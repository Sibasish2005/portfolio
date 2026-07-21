"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            Sibasish Chakraborti — Best Software Engineer & Web Developer in Agartala, Tripura
          </h1>
          <p>
            Welcome to the portfolio of Sibasish Chakraborti, the best software engineer, web developer, and web designer in Agartala, Tripura (Phone: +91 9863379440). 
            As a top-rated software engineer and full stack developer in Northeast India, Sibasish specializes in building premium web applications, 
            scalable microservices, high-performance APIs, and cloud products using Next.js, React, TypeScript, FastAPI, Python, and AWS.
          </p>
          <p>
            Looking for the best software engineer in Agartala, Tripura? Sibasish Chakraborti offers professional software development, 
            web engineering, UI/UX design, e-commerce development, and cloud deployment services for businesses in Agartala, 
            Tripura, and globally. Direct Contact: +91 9863379440 / 9863379440.
          </p>
        </div>

        <NextImage
          src={isMobile ? "/mobile-hero-1.png" : "/hero-section/hero image.png"}
          alt="Hero background"
          fill
          priority
          className="object-cover object-top opacity-85"
          sizes="100vw"
          quality={80}
        />

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
          {/* ── Desktop: absolute positioned overlays (unchanged) ── */}
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
                      <p className="text-[10px] tracking-widest uppercase text-white/50 mb-1.5">
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



          {/* ── Mobile: flow-based layout to prevent overlap ── */}
          <div className="md:hidden absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-16 pt-4 gap-5 pointer-events-auto">
            <div className="hero-mobile-stagger">
              <h1
                id="hero-title-mobile"
                className="text-4xl xs:text-5xl font-light text-white leading-snug tracking-tight text-center pb-2"
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
              <p className="text-xs uppercase tracking-widest text-white/50 text-center">
                Full Stack Developer
              </p>
            </div>

            <div
              ref={skillsMobileRef}
              className="hero-mobile-stagger"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                {SKILLS_MOBILE.map((skill) => (
                  <p
                    key={skill}
                    className="text-[9px] tracking-widest uppercase text-white/30"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
