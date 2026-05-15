"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const START_FRAME = 40; // UPDATE THIS: Change this to the frame number of the image you uploaded (e.g., 40)
const END_FRAME = 154; // Reduced to 154 since the .png files stop here
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

const SKILLS_DESKTOP = [
  {
    columns: [
      { title: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Table"] },
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

const SKILLS_MOBILE = ["Next.js", "React", "TypeScript", "FastAPI", "Docker", "AWS"];

function frameSrc(i: number): string {
  // i is 0-indexed relative to the START_FRAME
  return `/hero-section/ezgif-frame-${String(START_FRAME + i).padStart(3, "0")}.png`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const frameRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const skillsDRef = useRef<HTMLDivElement>(null);
  const skillsMRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── Preload frames ──
  useEffect(() => {
    let count = 0;
    let dead = false;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (dead) return;
        // Decode image before marking it ready to prevent main-thread stutter during drawImage
        if (img.decode) {
          img.decode().then(() => {
            if (dead) return;
            imagesRef.current[i] = img;
            count++;
            setProgress(Math.round((count / TOTAL_FRAMES) * 100));
            if (count === TOTAL_FRAMES) setLoaded(true);
          }).catch(() => {
            if (dead) return;
            imagesRef.current[i] = img;
            count++;
            setProgress(Math.round((count / TOTAL_FRAMES) * 100));
            if (count === TOTAL_FRAMES) setLoaded(true);
          });
        } else {
          imagesRef.current[i] = img;
          count++;
          setProgress(Math.round((count / TOTAL_FRAMES) * 100));
          if (count === TOTAL_FRAMES) setLoaded(true);
        }
      };
      img.onerror = () => {
        if (dead) return;
        count++;
        setProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) setLoaded(true);
      };
    }

    return () => { dead = true; };
  }, []);

  // ── Canvas rendering + GSAP ──
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let cw = 0;
    let ch = 0;

    function updateCanvasSize() {
      const rect = canvas!.getBoundingClientRect();
      cw = Math.round(rect.width);
      ch = Math.round(rect.height);
      if (canvas!.width !== cw || canvas!.height !== ch) {
        canvas!.width = cw;
        canvas!.height = ch;
      }
    }

    // Initialize size
    updateCanvasSize();

    // ── Draw function: object-fit cover ──
    function render(idx: number) {
      const img = imagesRef.current[idx];
      if (!img || !img.naturalWidth || !ctx || !canvas) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Object-fit: cover — scale image to fill, center crop
      const scale = Math.max(cw / iw, ch / ih);
      const dw = Math.round(iw * scale);
      const dh = Math.round(ih * scale);
      const dx = Math.round((cw - dw) / 2);
      const dy = Math.round((ch - dh) / 2);

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
    }

    // Initial render
    render(0);

    // Resize handler
    function onResize() {
      updateCanvasSize();
      render(frameRef.current);
    }
    window.addEventListener("resize", onResize);

    // ── GSAP Context ──
    const gsapCtx = gsap.context(() => {
      // Create a native GSAP Timeline for maximum performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Near-instant 0.1s scrub for tight responsiveness without being raw
        }
      });

      // Canvas Frame Animation (Duration = 1)
      const playhead = { frame: 0 };
      tl.to(playhead, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: () => {
          if (playhead.frame !== frameRef.current) {
            frameRef.current = playhead.frame;
            render(playhead.frame);
          }
        }
      }, 0);

      // ── Native Overlay Animations ──
      function fade(el: HTMLElement | null, start: number, end: number, scaleIn = false) {
        if (!el) return;
        tl.fromTo(el,
          { autoAlpha: 0, y: scaleIn ? 0 : 30, scale: scaleIn ? 0.9 : 1 },
          { autoAlpha: 1, y: 0, scale: 1, ease: "power1.out", duration: end - start },
          start
        );
      }

      fade(nameRef.current, 0.12, 0.22);
      fade(roleRef.current, 0.30, 0.38);
      fade(skillsDRef.current, 0.42, 0.52);
      fade(skillsMRef.current, 0.42, 0.52);

      // Stagger skill groups
      if (skillsDRef.current) {
        skillsDRef.current.querySelectorAll<HTMLElement>("[data-sg]").forEach((g, i) => {
          const s0 = 0.43 + i * 0.013;
          tl.fromTo(g,
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, ease: "power1.out", duration: 0.05 },
            s0
          );
        });
      }

      fade(ctaRef.current, 0.64, 0.72, true);
    }, section);

    return () => {
      window.removeEventListener("resize", onResize);
      gsapCtx.revert();
    };
  }, [loaded]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)" }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
          }}
        />

        {/* Loading */}
        {!loaded && (
          <div
            className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 md:left-10 md:bottom-10 md:translate-x-0"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-[1.5px] bg-white/10 overflow-hidden rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-white/50 rounded-full"
                  style={{ width: `${progress}%`, transition: "width 150ms linear" }}
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-white/50 whitespace-nowrap">
                Loading... {progress}%
              </span>
            </div>
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ visibility: loaded ? "visible" : "hidden" }}>

          <div ref={nameRef} className="absolute left-0 right-0 px-6 md:left-auto md:right-10 md:px-0 lg:right-16 md:max-w-[420px] bottom-52 md:bottom-44">
            <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight text-center md:text-right" style={{ fontFamily: "var(--font-orbitron)" }}>
              Sibasish<br />Chakraborti
            </h1>
          </div>

          <div ref={roleRef} className="absolute left-0 right-0 px-6 md:left-auto md:right-10 md:px-0 lg:right-16 md:max-w-[420px] bottom-44 md:bottom-32" style={{ fontFamily: "var(--font-dm-mono)" }}>
            <p className="text-xs md:text-sm uppercase tracking-widest md:tracking-[0.3em] text-white/50 text-center md:text-right">
              Full Stack Developer
            </p>
          </div>

          <div ref={skillsDRef} className="hidden md:block absolute left-10 lg:left-16 max-w-[420px] bottom-12" style={{ fontFamily: "var(--font-dm-mono)" }}>
            <div className="space-y-4">
              {SKILLS_DESKTOP.map((row, ri) => (
                <div key={ri} className="grid grid-cols-2 gap-x-12">
                  {row.columns.map((col) => (
                    <div key={col.title} data-sg="" className="mb-3">
                      <p className="text-[10px] tracking-widest uppercase text-white/50 mb-1.5">{col.title}</p>
                      {col.items.map((item) => (
                        <p key={item} className="text-[10px] tracking-widest uppercase text-white/30 leading-[1.8]">{item}</p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div ref={skillsMRef} className="md:hidden absolute bottom-24 left-0 right-0 px-6" style={{ fontFamily: "var(--font-dm-mono)" }}>
            <div className="flex flex-col items-center gap-1">
              {SKILLS_MOBILE.map((skill) => (
                <p key={skill} className="text-[9px] tracking-widest uppercase text-white/30">{skill}</p>
              ))}
            </div>
          </div>

          <div ref={ctaRef} className="absolute left-0 right-0 px-8 md:left-10 md:right-auto md:px-0 lg:left-16 bottom-8 md:bottom-10 pointer-events-auto" style={{ fontFamily: "var(--font-dm-mono)" }}>
            <a href="#projects" className="block w-4/5 mx-auto md:w-auto md:mx-0 md:inline-block text-center border border-white/20 px-8 py-3 text-[10px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300">
              View My Work ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
