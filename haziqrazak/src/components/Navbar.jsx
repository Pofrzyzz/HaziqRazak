import React, { useState, useEffect } from "react";

// Animated Hamburger/Infinity/X Icon

function AnimatedMenuIcon({ open, onClick }) {
  // Animated flowing infinity symbol using strokeDashoffset
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let frame;
    const animate = () => {
      setTick(performance.now());
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);
  // Animate dashoffset in one direction, smoothly
  const speed = 0.23; // px/ms
  const dashLength = 350; // Make the visible dash even longer for more persistence
  const gapLength = 250; // Shorter gap
  const dashOffset = (tick * speed) % (dashLength + gapLength);
  return (
    <button
      className="relative w-16 h-16 flex items-center justify-center focus:outline-none"
      aria-label="Menu"
      onClick={onClick}
      style={{ background: "none", border: "none", padding: 0 }}
    >
      {/* Animated Custom Symbol */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${!open ? "opacity-100" : "opacity-0"}`}
        width="80" height="40" viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(90deg) translateY(1px) translateX(15px)' }}
      >
        <path
          d="M 50 50 C 20 50, 20 0, 50 0 C 80 0, 80 50, 50 50 C 20 50, 20 100, 50 100 C 80 100, 80 50, 50 50"
          fill="none"
          stroke="white"
          strokeWidth="14"
          strokeDasharray={`${dashLength} ${gapLength}`}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {/* X Icon */}
      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        width="80" height="80" viewBox="0 0 48 48"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block', margin: 'auto' }}
      >
        <line x1="14" y1="14" x2="34" y2="34" />
        <line x1="34" y1="14" x2="14" y2="34" />
      </svg>
    </button>
  );
}

const MENU_SECTIONS = [
  { id: "home", label: "HOME", href: "#" },
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "projects", label: "PROJECTS", href: "#projects" },
  { id: "skills", label: "SKILLS", href: "#skills" },
  { id: "timeline", label: "TIMELINE", href: "#timeline" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Listen for scroll to update active section
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      // Get section positions
      const aboutEl = document.getElementById('about');
      const projectsEl = document.getElementById('projects');
      const aboutTop = aboutEl ? aboutEl.getBoundingClientRect().top + window.scrollY : Infinity;
      const projectsTop = projectsEl ? projectsEl.getBoundingClientRect().top + window.scrollY : Infinity;
      if (scrollY < aboutTop - 80) {
        setActiveSection('home');
      } else if (scrollY >= aboutTop - 80 && scrollY < projectsTop - 80) {
        setActiveSection('about');
      } else if (scrollY >= projectsTop - 80 && scrollY < document.body.scrollHeight) {
        // Fallback: use offsets for other sections
        const offsets = MENU_SECTIONS.map(({ id, href }) => {
          if (id === 'home' || id === 'about') return null;
          const el = document.getElementById(href.replace('#', ''));
          return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null;
        }).filter(Boolean);
        const current = offsets.reduce((acc, cur) => (scrollY + 120 >= cur.top ? cur : acc), offsets[0]);
        setActiveSection(current ? current.id : 'projects');
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll to section
  function scrollToSection(href) {
    if (href === "#") {
      // Scroll to center of hero section
      const hero = document.getElementById('hero') || document.querySelector('[data-hero], .hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollY = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Scroll to center of section
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      } else {
        window.location.hash = href;
      }
    }
    setMenuOpen(false);
  }

  // Use a more interesting font (Montserrat or fallback)
  const fontClass = "font-mono"; // Change to e.g. 'font-montserrat' if you add it to Tailwind config

  return (
    <nav className="fixed top-0 right-0 w-full z-50 flex justify-end items-start px-8 py-6" style={{ background: 'none' }}>
      <div style={{ zIndex: 101 }}>
        <AnimatedMenuIcon open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
      </div>
      {/* Menu (show/hide on menuOpen) */}
      <div
        className={`transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center`}
        style={{ zIndex: 100 }}
      >
        {MENU_SECTIONS.map(({ id, label, href }) => {
          const isActive = id === activeSection;
          return (
            <button
              key={id}
              className={`relative text-white text-4xl mb-8 tracking-widest ${fontClass} font-extrabold transition-all duration-200 px-2 ${isActive ? "line-through opacity-60" : "opacity-100 group"}`}
              style={{ letterSpacing: '0.2em', outline: 'none', background: 'none', border: 'none' }}
              {...(!isActive ? { onClick: () => scrollToSection(href) } : {})}
              tabIndex={isActive ? -1 : 0}
              aria-disabled={isActive}
              disabled={isActive}
            >
              <span>{label}</span>
              {/* Animated underline for hover (not underline, but a bar that grows) */}
              {!isActive && (
                <span
                  className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-white/80 to-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
