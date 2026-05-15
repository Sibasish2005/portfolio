"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = ["About", "Projects", "Contact"] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ── Body scroll lock when mobile menu is open ──
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
  }, []);

  return (
    <>
      {/* ── Desktop + Mobile Top Bar ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-6 md:px-8 lg:px-16 transition-all duration-500 ease-out bg-transparent border-b border-transparent"
      >
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-white text-sm tracking-[0.3em] uppercase select-none"
        >
          SIV.dev
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono border border-white/20 px-5 py-2 text-[10px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden relative w-7 h-5 flex flex-col justify-between items-stretch z-[110]"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
              isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${
              isMenuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
              isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        className={`fixed inset-0 bg-black z-[100] md:hidden flex flex-col items-center justify-center transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={closeMenu}
              className="font-mono text-2xl uppercase tracking-widest text-white hover:text-white/60 transition-colors duration-300"
              style={{
                transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.4s ease, transform 0.4s ease, color 0.3s ease",
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
            className="font-mono block w-full text-center border border-white/20 py-4 text-[11px] tracking-[0.3em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
