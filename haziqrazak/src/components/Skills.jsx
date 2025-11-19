import React from "react";

export default function Skills() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white" id="skills" data-section="skills">
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6">Skills & Proficiencies</h2>
        <ul className="list-disc list-inside text-lg space-y-1 text-gray-300 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 justify-items-center">
          <li>Golang</li>
          <li>Adobe Photoshop</li>
          <li>Flask</li>
          <li>SQL</li>
          <li>AWS</li>
          <li>JavaScript</li>
          <li>Node</li>
          <li>React</li>
          <li>Vite</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>C#</li>
          <li>Python</li>
          <li>Firebase</li>
          <li>MongoDB</li>
          <li>SSMS</li>
        </ul>
      </div>
    </section>
  );
}
