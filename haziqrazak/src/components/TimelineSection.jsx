
import AnimatedFadeIn from "./AnimatedFadeIn";

// Timeline data structure
export const timelineData = [
  {
    type: "Education",
    title: "Unity Secondary School",
    subtitle: "O-levels",
    date: "2019–2022",
    details: [
      "Vice-President, Unique Media Productions",
      "Student Role Model Award",
      "Winner of Intra-School Photography Competition",
    ],
  },
  {
    type: "Education",
    title: "Ngee Ann Polytechnic",
    subtitle: "Information Technology",
    date: "2023–2026",
    details: [
      "Participated in ICT Society",
      "Specialization in Cloud Computing & Cloud Architecture",
    ],
  },
  {
    type: "Experience",
    title: "OCBC Ignite Internship",
    subtitle: "Internship",
    date: "2025–2026",
    details: [
      "Full Stack Developer Intern",
      "Official Start Date: 17th March 2025",
    ],
  },
  {
    type: "Experience",
    title: "Photography Assistant",
    subtitle: "Freelance",
    date: "2021–2022",
    details: [
      "Gained hands on training for professional photoshoots",
      "Experience setting up sets at Gardens by the Bay and Botanic Gardens",
    ],
  },
  {
    type: "Experience",
    title: "Bellman, Marriott Tangs Plaza",
    subtitle: "Part-Time",
    date: "2022–2024",
    details: [
      "Enhanced customer service & communication skills",
      "Positive guest feedback recognition",
    ],
  },
];

export const certificationsData = [
  {
    type: "Certifications",
    title: "Professional Scrum Master™ I (PSM I)",
    subtitle: "May 2024",
    date: "2024",
    details: ["Scrum.org"],
    link: "https://www.credly.com/badges/19628356-d1c2-4f2f-9383-4c0139acc829/linked_in_profile",
  },
  {
    type: "Certifications",
    title: "Go (Basic)",
    subtitle: "HackerRank",
    date: "2024",
    details: [],
    link: "https://www.hackerrank.com/certificates/9b49f85d5336",
  },
  {
    type: "Certifications",
    title: "SQL (Basic)",
    subtitle: "HackerRank",
    date: "2024",
    details: [],
    link: "https://www.hackerrank.com/certificates/iframe/f1e17d3784cf",
  },
  {
    type: "Certifications",
    title: "SQL (Intermediate)",
    subtitle: "HackerRank",
    date: "2024",
    details: [],
    link: "https://www.hackerrank.com/certificates/iframe/b6787b9fb5a0",
  },
  {
    type: "Certifications",
    title: "Python (Basic)",
    subtitle: "HackerRank",
    date: "2024",
    details: [],
    link: "https://www.hackerrank.com/certificates/508683d4132a",
  },
  {
    type: "Certifications",
    title: "C# (Basic)",
    subtitle: "HackerRank",
    date: "2024",
    details: [],
    link: "https://www.hackerrank.com/certificates/f856ffdf6442",
  },
];

export default function TimelineSection() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white" id="timeline" data-section="timeline">
      <div className="max-w-3xl w-full px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">Timeline</h2>
        <div className="relative border-l-4 border-white/20 pl-8">
          {timelineData.map((item, idx) => (
            <AnimatedFadeIn key={idx} delay={idx * 0.1}>
              <div className="mb-12 group transition-transform duration-500 relative">
                <div className="absolute -left-5 top-2 w-4 h-4 rounded-full bg-white group-hover:bg-black border-2 border-black group-hover:border-white transition-colors duration-300" />
                <div className="bg-white/10 p-6 rounded-lg shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold tracking-wide uppercase opacity-80">
                      {item.type}
                    </span>
                    <span className="text-xs font-mono opacity-60">{item.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400 transition-colors duration-200">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <div className="text-md font-medium mb-2 opacity-80">{item.subtitle}</div>
                  <ul className="list-disc list-inside text-sm opacity-80">
                    {item.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
