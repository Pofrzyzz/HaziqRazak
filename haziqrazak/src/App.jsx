// src/App.jsx

import React, { useRef, useState, useEffect } from "react";

import HeroWaves from "./components/HeroWaves";
import CenteredHeaderSection from "./components/CenteredHeaderSection";
import About from "./components/About";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";

import Skills from "./components/Skills";
import TimelineSection from "./components/TimelineSection";

import AnimatedHeader from "./components/AnimatedHeader";

export default function App() {
  const heroRef = useRef(null);
  const [showAnimatedHeader, setShowAnimatedHeader] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // If the hero is fully out of view (bottom <= 0), show AnimatedHeader
      setShowAnimatedHeader(rect.bottom <= 0);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>{`
        html, body, .w-full.min-h-screen {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, .w-full.min-h-screen::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
      {showAnimatedHeader && <AnimatedHeader heroRef={heroRef} />}
      <div ref={heroRef} className="w-full h-full">
        <HeroWaves />
      </div>

      <Navbar />

      {/* Main Content Sections */}
      <About />
      <Projects />
      <Skills />
      <TimelineSection />
    </div>
  );
}
