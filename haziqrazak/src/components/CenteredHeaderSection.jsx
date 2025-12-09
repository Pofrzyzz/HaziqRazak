import React from "react";
import AnimatedHeader from "./AnimatedHeader";

export default function CenteredHeaderSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden select-none">
      <div className="relative z-10 flex justify-center items-center" style={{ pointerEvents: "none" }}>
        <h1 className="flex text-white text-6xl md:text-8xl font-extrabold tracking-tight text-center" style={{ mixBlendMode: "difference", color: "#fff" }}>
          <AnimatedHeader />
        </h1>
      </div>
    </section>
  );
}
