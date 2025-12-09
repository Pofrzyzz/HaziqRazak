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
  { id: "hero", label: "HOME", href: "#hero" },
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "education", label: "EDUCATION", href: "#education" },
  { id: "projects", label: "PROJECTS", href: "#projects" },
  { id: "skills", label: "SKILLS", href: "#skills" },
  { id: "certifications", label: "CERTIFICATIONS", href: "#certifications" },
  { id: "experience", label: "EXPERIENCE", href: "#experience" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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
        setActiveSection('hero');
      } else if (scrollY >= aboutTop - 80 && scrollY < projectsTop - 80) {
        setActiveSection('about');
      } else if (scrollY >= projectsTop - 80 && scrollY < document.body.scrollHeight) {
        // Fallback: use offsets for other sections
        const offsets = MENU_SECTIONS.map(({ id, href }) => {
          if (id === 'hero' || id === 'about') return null;
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
          // Add offset for all except hero
          const handleClick = (e) => {
            setMenuOpen(false);
            if (id !== 'hero') {
              e.preventDefault();
              const el = document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
              if (el) {
                const rect = el.getBoundingClientRect();
                // Offset by 80px for better section detection
                const scrollY = window.scrollY + rect.top - 80;
                window.scrollTo({ top: scrollY, behavior: 'smooth' });
                // Update hash in URL
                history.replaceState(null, '', href);
              }
            }
          };
          return (
            <a
              key={id}
              href={href}
              className={`relative text-white text-4xl mb-8 tracking-widest ${fontClass} font-extrabold transition-all duration-200 px-2 opacity-100 group`}
              style={{ letterSpacing: '0.2em', outline: 'none', background: 'none', border: 'none' }}
              tabIndex={0}
              aria-disabled={false}
              onClick={handleClick}
            >
              <AnimatedLetters text={label} />
              <span
                className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-white/80 to-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}

// Per-letter hover animation component
function AnimatedLetters({ text }) {
  return (
    <span className="inline-block animated-letters">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animated-letter"
          style={{ transitionDelay: `${i * 40}ms` }}
          aria-hidden="true"
        >
          <span className="letter-front">{char}</span>
          <span className="letter-back">{char}</span>
        </span>
      ))}
    </span>
  )
}
