import React from "react";

export default function Projects() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white" id="projects" data-section="projects">
      <div className="max-w-3xl w-full px-4">
        <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Website */}
          <div className="bg-zinc-900 rounded-lg shadow-lg p-6 border border-zinc-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Personal Website</h3>
              <p className="text-gray-300 mb-2">React, Next.js, Vite</p>
              <ul className="list-disc list-inside text-gray-400 mb-2 text-sm">
                <li>Modern UI & CI/CD pipeline on Vercel</li>
                <li>Integrated previous experience into this project</li>
              </ul>
            </div>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/Pofrzyzz/haziqrazak" target="_blank" rel="noopener noreferrer" className="underline text-gray-300 hover:text-white">GitHub</a>
              <a href="https://haziqrazak.com" target="_blank" rel="noopener noreferrer" className="underline text-gray-300 hover:text-white">Website</a>
            </div>
          </div>
          {/* MyJams */}
          <div className="bg-zinc-900 rounded-lg shadow-lg p-6 border border-zinc-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">MyJams</h3>
              <p className="text-gray-300 mb-2">HTML, CSS, JS</p>
              <ul className="list-disc list-inside text-gray-400 mb-2 text-sm">
                <li>Showcases personal playlists</li>
                <li>Experimented with custom audio player</li>
              </ul>
            </div>
            <div className="flex space-x-4 mt-2">
              <a href="https://pofrzyzz.github.io/MyJams/" target="_blank" rel="noopener noreferrer" className="underline text-gray-300 hover:text-white">Live Demo</a>
            </div>
          </div>
          {/* BattleShip Bot */}
          <div className="bg-zinc-900 rounded-lg shadow-lg p-6 border border-zinc-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">BattleShip Bot</h3>
              <p className="text-gray-300 mb-2">Python</p>
              <ul className="list-disc list-inside text-gray-400 mb-2 text-sm">
                <li>Discord-based game with OOP approach</li>
                <li>Learned containerization basics</li>
              </ul>
            </div>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/Pofrzyzz/BattleShipGame" target="_blank" rel="noopener noreferrer" className="underline text-gray-300 hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
