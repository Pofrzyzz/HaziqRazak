
import React, { useEffect, useState } from "react";

// WavyText component (same as in HeroWaves)
function WavyText({ text, className }) {
  const [tick, setTick] = React.useState(0);
  useEffect(() => {
    let frame;
    const animate = () => {
      setTick(performance.now());
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: `translateY(${Math.sin(tick / 600 + i * 0.5) * 10}px)`,
            transition: "transform 0.1s",
            willChange: "transform"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function AnimatedHeader({ heroRef }) {
  const [progress, setProgress] = useState(0); // 0 = hidden, 1 = fully shown

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      // Animate in as you scroll past 30% of hero, fully shown after 100px past hero
      const windowH = window.innerHeight;
      const heroBottom = heroRect.bottom;
      let p = 0;
      if (heroBottom < windowH * 0.7) {
        // Start animating in
        p = Math.min(1, (windowH * 0.7 - heroBottom) / 100);
      }
      setProgress(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef]);

  // Interpolate scale and opacity
  const scale = 0.7 + 0.3 * progress;
  const opacity = progress;
  const y = 30 - 30 * progress;

  return (
    <div
      className="fixed top-0 left-0 w-full flex justify-center z-40 pointer-events-none"
      style={{ height: 0 }}
    >
      <span
        className="font-extrabold tracking-tight text-white select-none"
        style={{
          fontSize: `clamp(2rem, ${2 + 2 * scale}vw, 2.5rem)` ,
          opacity,
          transform: `scale(${scale}) translateY(${y}px)` ,
          transition: "opacity 0.2s, transform 0.2s, font-size 0.2s",
          willChange: "opacity, transform, font-size"
        }}
      >
        <WavyText text="Haziq Razak" />
      </span>
    </div>
  );
}
