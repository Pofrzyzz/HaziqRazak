import React from "react";
import { motion } from "framer-motion";
import {
  SiGoland,
  SiAdobephotoshop,
  SiFlask,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiVite,
  SiPython,
  SiFirebase,
  SiMongodb,
} from "react-icons/si";

export default function Skills() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white" id="skills" data-section="skills">
      <div className="w-full px-4 mb-16">
        <h2 className="text-4xl font-bold mb-10 text-center">Skills & Proficiencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Golang", logo: <SiGoland size={40} />, proficiency: "Intermediate" },
            { name: "Adobe Photoshop", logo: <SiAdobephotoshop size={40} />, proficiency: "Advanced" },
            { name: "Flask", logo: <SiFlask size={40} />, proficiency: "Intermediate" },
            { name: "JavaScript", logo: <SiJavascript size={40} />, proficiency: "Advanced" },
            { name: "Node.js", logo: <SiNodedotjs size={40} />, proficiency: "Intermediate" },
            { name: "React", logo: <SiReact size={40} />, proficiency: "Advanced" },
            { name: "Vite", logo: <SiVite size={40} />, proficiency: "Intermediate" },
            { name: "Python", logo: <SiPython size={40} />, proficiency: "Advanced" },
            { name: "Firebase", logo: <SiFirebase size={40} />, proficiency: "Intermediate" },
            { name: "MongoDB", logo: <SiMongodb size={40} />, proficiency: "Intermediate" },
            // Add more with appropriate icons or fallback
            { name: "SQL", logo: <span className="text-3xl">🗄️</span>, proficiency: "Advanced" },
            { name: "AWS", logo: <span className="text-3xl">☁️</span>, proficiency: "Intermediate" },
            { name: "HTML", logo: <span className="text-3xl">📄</span>, proficiency: "Advanced" },
            { name: "CSS", logo: <span className="text-3xl">🎨</span>, proficiency: "Advanced" },
            { name: "C#", logo: <span className="text-3xl">#️⃣</span>, proficiency: "Intermediate" },
            { name: "SSMS", logo: <span className="text-3xl">🗃️</span>, proficiency: "Intermediate" },
          ].map((skill, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 w-full"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/30 rounded-full overflow-hidden">
                {skill.logo}
              </div>
              <h3 className="text-xl font-bold mb-1 text-center">{skill.name}</h3>
              <div className="text-md font-medium mb-2 opacity-80 text-center">{skill.proficiency}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
