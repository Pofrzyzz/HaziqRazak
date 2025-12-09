// src/App.jsx

import React, { useRef, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HeroWaves from "./components/HeroWaves";
import CenteredHeaderSection from "./components/CenteredHeaderSection";
import About from "./components/About";
import EducationSection from "./components/EducationSection";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import CertificationsTimeline from "./components/CertificationsTimeline";
import ExperienceTimeline from "./components/ExperienceTimeline";
import AnimatedHeader from "./components/AnimatedHeader";
import SecretPage from "./pages/SecretPage";

export default function App() {
  const heroRef = useRef(null);
  const [showAnimatedHeader, setShowAnimatedHeader] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setShowAnimatedHeader(rect.bottom <= 0);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
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
            <div ref={heroRef} className="w-full">
              <HeroWaves />
            </div>
            <Navbar />
            <About />
            <EducationSection />
            <Projects />
            <Skills />
            <CertificationsTimeline />
            <ExperienceTimeline />
          </div>
        }
      />
      <Route path="/secretpage" element={<SecretPage />} />
    </Routes>
  );
}
