import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaDownload } from "react-icons/fa";

export default function About() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white" id="about" data-section="about">
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-xl mb-6 leading-relaxed">
          My name is <strong>Haziq</strong> and I’m a student from <strong>Singapore</strong>.<br />
          I'm currently pursuing Information Technology at Ngee Ann Polytechnic. <br />
          My interests include games, F1 and web dev.
        </p>
        <div className="flex space-x-6 mb-6 justify-center">
          <a
            href="mailto:haziqrazak14.27@gmail.com"
            className="hover:text-gray-300"
            aria-label="Email"
          >
            <FaEnvelope size={28} />
          </a>
          <a
            href="https://github.com/Pofrzyzz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
            aria-label="GitHub"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/haziqrazakiscool/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://www.instagram.com/pofrzcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
            aria-label="Instagram"
          >
            <FaInstagram size={28} />
          </a>
        </div>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition text-xl"
        >
          <FaDownload size={22} />
          <span>Download Resume</span>
        </a>
      </div>
    </section>
  );
}
