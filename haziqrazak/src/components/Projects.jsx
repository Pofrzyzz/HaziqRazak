import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import personalWebsiteImg from "../assets/personalWebsite.png";
import myJamsImg from "../assets/myJams.png";
import battleshipBotImg from "../assets/battleshipBot.png";

export default function Projects() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white py-8 px-2 sm:px-4" id="projects" data-section="projects">
      <div className="w-full max-w-6xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Personal Website */}
          <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 w-full animate-skill-card">
            <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/30 rounded-lg overflow-hidden">
              <img src={personalWebsiteImg} alt="Personal Website" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-center">Personal Website</h3>
            <div className="text-md font-medium mb-2 opacity-80 text-center">React, Next.js, Vite</div>
            <ul className="list-disc list-inside text-sm opacity-80 text-center mb-2">
              <li>Modern UI & CI/CD pipeline on Vercel</li>
              <li>Integrated previous experience into this project</li>
            </ul>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/Pofrzyzz/haziqrazak" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition text-base">
                  <FaGithub className="mr-2" size={18} />
                  GitHub
                </button>
              </a>
              <a href="https://haziqrazak.com" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition text-base">
                  <FaExternalLinkAlt className="mr-2" size={16} />
                  Website
                </button>
              </a>
            </div>
          </div>
          {/* MyJams */}
          <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 w-full animate-skill-card">
            <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/30 rounded-lg overflow-hidden">
              <img src={myJamsImg} alt="MyJams" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-center">MyJams</h3>
            <div className="text-md font-medium mb-2 opacity-80 text-center">HTML, CSS, JS</div>
            <ul className="list-disc list-inside text-sm opacity-80 text-center mb-2">
              <li>Showcases personal playlists</li>
              <li>Experimented with custom audio player</li>
            </ul>
            <div className="flex space-x-4 mt-2">
              <a href="https://pofrzyzz.github.io/MyJams/" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition text-base">
                  <FaExternalLinkAlt className="mr-2" size={16} />
                  Live Demo
                </button>
              </a>
            </div>
          </div>
          {/* BattleShip Bot */}
          <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 w-full animate-skill-card">
            <div className="w-full h-32 mb-4 flex items-center justify-center bg-white/30 rounded-lg overflow-hidden">
              <img src={battleshipBotImg} alt="BattleShip Bot" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-center">BattleShip Bot</h3>
            <div className="text-md font-medium mb-2 opacity-80 text-center">Python</div>
            <ul className="list-disc list-inside text-sm opacity-80 text-center mb-2">
              <li>Discord-based game with OOP approach</li>
              <li>Learned containerization basics</li>
            </ul>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/Pofrzyzz/BattleShipGame" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition text-base">
                  <FaGithub className="mr-2" size={18} />
                  GitHub
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
