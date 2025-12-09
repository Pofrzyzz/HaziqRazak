import React from "react";
import { motion } from "framer-motion";
import { certificationsData } from "./TimelineSection";

export default function CertificationsTimeline() {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-black text-white py-16" id="certifications" data-section="certifications">
      <h2 className="text-3xl font-bold mb-10 text-center">Certifications</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {certificationsData.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 w-full"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/30 rounded-full">
              <span className="text-3xl">📜</span>
            </div>
            <span className="text-xs font-mono opacity-60 mb-1">{item.date}</span>
            <h3 className="text-xl font-bold mb-1 text-center">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400 transition-colors duration-200">
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>
            <div className="text-md font-medium mb-2 opacity-80 text-center">{item.subtitle}</div>
            <ul className="list-disc list-inside text-sm opacity-80 text-center">
              {item.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
