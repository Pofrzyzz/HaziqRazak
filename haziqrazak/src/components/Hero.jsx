import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const timerRef = useRef(null);

  const handleNameClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) setShowCounter(true);
      if (newCount === 15) {
        setShowCounter(false);
        setClickCount(0);
        navigate("/secretpage");
        return 0;
      }
      // Set/reset timer for 5s
      timerRef.current = setTimeout(() => {
        setClickCount(0);
        setShowCounter(false);
      }, 5000);
      return newCount;
    });
  };

  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative"
      id="hero"
    >
      <h1
        className="text-6xl md:text-8xl font-extrabold tracking-tight transition-all duration-700 cursor-pointer select-none"
        onClick={handleNameClick}
        title="Click me!"
      >
        Haziq Razak
      </h1>
      <span className="absolute bottom-10 animate-bounce text-lg opacity-70">Scroll to begin</span>
      {showCounter && (
        <div className="fixed bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg text-2xl font-bold z-50 animate-bounce">
          🔥 Secret Counter: {clickCount}
        </div>
      )}
    </section>
  );
}
