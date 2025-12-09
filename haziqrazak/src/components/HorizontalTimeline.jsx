import React, { useRef, useEffect } from "react";
import AnimatedFadeIn from "./AnimatedFadeIn";
import { timelineData } from "./TimelineSection";

export default function HorizontalTimeline() {
  const containerRef = useRef(null);

  // Scroll hijack: vertical scroll moves horizontally until end, then resumes vertical
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e) => {
      // Only hijack if can scroll horizontally
      if (
        (e.deltaY > 0 && container.scrollLeft + container.clientWidth < container.scrollWidth) ||
        (e.deltaY < 0 && container.scrollLeft > 0)
      ) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-black text-white py-16" id="timeline" data-section="timeline">
      <h2 className="text-4xl font-bold mb-10 text-center">Timeline</h2>
      <div
        ref={containerRef}
        className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap px-8 pb-8 flex gap-8 min-h-[340px]"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {timelineData.map((item, idx) => (
          <AnimatedFadeIn key={idx} delay={idx * 0.1}>
            <div className="inline-block align-top min-w-[320px] max-w-xs bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 group hover:scale-105 transition-transform duration-300 relative" style={{ scrollSnapAlign: 'start' }}>
              <div className="w-4 h-4 rounded-full bg-white absolute -top-6 left-1/2 -translate-x-1/2" />
              <span className="text-xs font-mono opacity-60 mb-1 block">{item.date}</span>
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <div className="text-md font-medium mb-2 opacity-80">{item.subtitle}</div>
              <ul className="list-disc list-inside text-sm opacity-80">
                {item.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </AnimatedFadeIn>
        ))}
      </div>
    </section>
  );
}
