import React from "react";

export default function Hero() {
  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative"
      id="hero"
    >
      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight transition-all duration-700">
        Haziq Razak
      </h1>
      <span className="absolute bottom-10 animate-bounce text-lg opacity-70">Scroll to begin</span>
    </section>
  );
}
