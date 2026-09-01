"use client";

import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = ["About", "Projects", "Contact"] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => document.body.classList.remove("menu-open");
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  }, []);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 inset-x-0 z-[110] py-4 md:py-6 px-5 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between transition-all duration-500 ease-out bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/[0.04] md:border-transparent"
      >
        <a
          href="#home"
          aria-label="Go to home section"
          className="font-orbitron text-white text-base md:text-lg font-bold tracking-[0.35em] uppercase select-none group flex items-center gap-1.5 transition-colors hover:text-blue-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
        >
          <span className="text-blue-400 font-mono text-sm group-hover:translate-x-0.5 transition-transform">&gt;</span>
          SIV<span className="text-blue-400">.</span>DEV
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-white/50 hover:text-white font-medium transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            >
              {link}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF in a new tab"
            className="font-mono border border-white/25 px-6 py-2.5 rounded-lg text-xs tracking-[0.3em] uppercase text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden relative w-7 h-5 flex flex-col justify-between items-stretch z-[110]"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen ? true : false}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
          />
          <span
            className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""
              }`}
          />
          <span
            className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-black z-[100] md:hidden flex flex-col items-center justify-center transition-all duration-500 ${isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <nav aria-label="Mobile" className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                const target = document.getElementById(link.toLowerCase());
                if (target) {
                  setTimeout(() => {
                    target.scrollIntoView({ behavior: "smooth" });
                  }, 120);
                }
              }}
              className="font-mono text-2xl uppercase tracking-widest text-white hover:text-blue-400 transition-colors duration-300"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform, color",
                transitionDuration: "0.4s, 0.4s, 0.3s",
                transitionTimingFunction: "ease",
                transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div
          className="absolute bottom-16 left-0 right-0 px-8"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
          }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            aria-label="Open resume PDF in a new tab"
            className="font-mono block w-full text-center border border-white/20 py-4 text-[11px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
