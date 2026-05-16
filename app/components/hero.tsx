"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const START_FRAME = 40;
const END_FRAME = 154;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

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

function frameSrc(index: number) {
  return `/hero-section/ezgif-frame-${String(START_FRAME + index).padStart(3, "0")}.png`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const frameRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const skillsDesktopRef = useRef<HTMLDivElement>(null);
  const skillsMobileRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* Detect mobile once on mount */
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    if (mobile) setLoaded(true);
  }, []);

  /* Preload frames — desktop only */
  useEffect(() => {
    if (isMobile) return;

    let count = 0;
    let cancelled = false;

    for (let index = 0; index < TOTAL_FRAMES; index += 1) {
      const image = new Image();
      image.src = frameSrc(index);

      image.onload = () => {
        if (cancelled) return;

        const markReady = () => {
          if (cancelled) return;
          imagesRef.current[index] = image;
          count += 1;
          setProgress(Math.round((count / TOTAL_FRAMES) * 100));

          if (count === TOTAL_FRAMES) {
            setLoaded(true);
          }
        };

        if (image.decode) {
          image.decode().then(markReady).catch(markReady);
          return;
        }

        markReady();
      };

      image.onerror = () => {
        if (cancelled) return;

        count += 1;
        setProgress(Math.round((count / TOTAL_FRAMES) * 100));

        if (count === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  /* GSAP scroll animation — desktop only */
  useEffect(() => {
    if (!loaded || isMobile) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return;

    const context = canvas.getContext("2d", { alpha: false });

    if (!context) return;

    const currentCanvas = canvas;
    const currentContext = context;

    let canvasWidth = 0;
    let canvasHeight = 0;

    function updateCanvasSize() {
      const rect = currentCanvas.getBoundingClientRect();
      canvasWidth = Math.round(rect.width);
      canvasHeight = Math.round(rect.height);

      if (
        currentCanvas.width !== canvasWidth ||
        currentCanvas.height !== canvasHeight
      ) {
        currentCanvas.width = canvasWidth;
        currentCanvas.height = canvasHeight;
      }
    }

    function render(index: number) {
      const image = imagesRef.current[index];

      if (!image || !image.naturalWidth) return;

      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
      const drawWidth = Math.round(imageWidth * scale);
      const drawHeight = Math.round(imageHeight * scale);
      const drawX = Math.round((canvasWidth - drawWidth) / 2);
      const drawY = Math.round((canvasHeight - drawHeight) / 2);

      currentContext.clearRect(0, 0, canvasWidth, canvasHeight);
      currentContext.drawImage(
        image,
        0,
        0,
        imageWidth,
        imageHeight,
        drawX,
        drawY,
        drawWidth,
        drawHeight
      );
    }

    updateCanvasSize();
    render(0);

    function onResize() {
      updateCanvasSize();
      render(frameRef.current);
    }

    window.addEventListener("resize", onResize);

    const gsapContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      });

      const playhead = { frame: 0 };

      timeline.to(
        playhead,
        {
          frame: TOTAL_FRAMES - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
          onUpdate: () => {
            if (playhead.frame === frameRef.current) return;

            frameRef.current = playhead.frame;
            render(playhead.frame);
          },
        },
        0
      );

      function fade(
        element: HTMLElement | null,
        start: number,
        end: number,
        scaleIn = false
      ) {
        if (!element) return;

        timeline.fromTo(
          element,
          { autoAlpha: 0, y: scaleIn ? 0 : 30, scale: scaleIn ? 0.9 : 1 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power1.out",
            duration: end - start,
          },
          start
        );
      }

      fade(nameRef.current, 0.12, 0.22);
      fade(roleRef.current, 0.3, 0.38);
      fade(skillsDesktopRef.current, 0.42, 0.52);
      fade(skillsMobileRef.current, 0.42, 0.52);

      if (skillsDesktopRef.current) {
        skillsDesktopRef.current
          .querySelectorAll<HTMLElement>("[data-sg]")
          .forEach((group, index) => {
            const start = 0.43 + index * 0.013;

            timeline.fromTo(
              group,
              { autoAlpha: 0, y: 15 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power1.out",
                duration: 0.05,
              },
              start
            );
          });
      }

      fade(ctaRef.current, 0.64, 0.72, true);
    }, section);

    return () => {
      window.removeEventListener("resize", onResize);
      gsapContext.revert();
    };
  }, [loaded, isMobile]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      aria-describedby="hero-summary"
      className="relative w-full"
      style={{ height: isMobile ? "100vh" : "500vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <p id="hero-summary" className="sr-only">
          Portfolio introduction for Sibasish Chakraborti, a full stack
          developer specializing in Next.js, React, TypeScript, FastAPI, and
          cloud delivery.
        </p>

        {isMobile ? (
          <NextImage
            src="/mobile-hero-1.png"
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "60%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
          }}
        />

        {!loaded && !isMobile && (
          <div
            className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 md:left-10 md:bottom-10 md:translate-x-0"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-[1.5px] bg-white/10 overflow-hidden rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-white/50 rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 150ms linear",
                  }}
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-white/50 whitespace-nowrap">
                Loading... {progress}%
              </span>
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ visibility: loaded ? "visible" : "hidden" }}
        >
          <div
            ref={nameRef}
            className="absolute left-0 right-0 px-6 md:left-auto md:right-10 md:px-0 lg:right-16 md:max-w-[420px] bottom-52 md:bottom-44"
          >
            <h1
              id="hero-title"
              className="text-3xl md:text-6xl font-bold text-white leading-tight text-center md:text-right"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Sibasish
              <br />
              Chakraborti
            </h1>
          </div>

          <div
            ref={roleRef}
            className="absolute left-0 right-0 px-6 md:left-auto md:right-10 md:px-0 lg:right-16 md:max-w-[420px] bottom-44 md:bottom-32"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <p className="text-xs md:text-sm uppercase tracking-widest md:tracking-[0.3em] text-white/50 text-center md:text-right">
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

          <div
            ref={skillsMobileRef}
            className="md:hidden absolute bottom-24 left-0 right-0 px-6"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <div className="flex flex-col items-center gap-1">
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

          <div
            ref={ctaRef}
            className="absolute left-0 right-0 px-8 md:left-10 md:right-auto md:px-0 lg:left-16 bottom-8 md:bottom-10 pointer-events-auto"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <a
              href="#projects"
              aria-label="Jump to selected projects"
              className="block w-4/5 mx-auto md:w-auto md:mx-0 md:inline-block text-center border border-white/20 px-8 py-3 text-[10px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              View My Work {"\u2193"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
