import React from "react";

const TeamSection = () => {
  const directors = [
    {
      name: "Zulkifli Isa",
      title: "President Director",
      bio: "With over two decades of leadership in global trading and strategic investments, Zulkifli Isa is a renowned figure in navigating complex markets across Asia and the Middle East.",
      quote:
        "Strategic leadership transforms challenges into global opportunities.",
      image: "images/pak-zul.jpeg",
    },
    {
      name: "Wildan Pradana",
      title: "Shareholder",
      bio: "Wildan is a visionary leader with deep expertise in Mechanical Engineering and advanced knowledge in data management within digital ecosystems.",
      quote:
        "Innovation is the bridge that connects local potential with global success.",
      image: "https://placehold.co/400x500/1a365d/ffffff?text=Wildan+Pradana",
    },
    {
      name: "Ananda Syahputra",
      title: "Commissioner",
      bio: "Ananda Syahputra is a distinguished figure in the innovation and digital lifestyle sectors, driving dynamic projects and strengthening corporate governance strategies.",
      quote:
        "Strong governance is the foundation of sustainable global growth.",
      image: "https://placehold.co/400x500/1a365d/ffffff?text=Ananda+Syahputra",
    },
    {
      name: "Ferdian Chaniago",
      title: "Representative of Holding & Strategic Development",
      bio: "Chaniago is a distinguished infrastructure expert, known for overseeing multiple strategic projects in the energy and construction sectors.",
      quote:
        "Building sustainable foundations is the cornerstone of lasting progress.",
      image: "https://placehold.co/400x500/1a365d/ffffff?text=Ferdian+Chaniago",
    },
    {
      name: "Maria Widodo",
      title: "Director of Global Trading Operations",
      bio: "Maria brings a wealth of experience in global trading, with a proven track record in scaling trade networks and optimizing supply chain strategies across emerging markets.",
      quote: "In a dynamic world, agility in trading defines lasting success.",
      image: "https://placehold.co/400x500/1a365d/ffffff?text=Maria+Widodo",
    },
    {
      name: "Jeihan Winarta",
      title: "Director of Strategic Partnerships & Investments",
      bio: "Jeihan is a prominent investment strategist known for fostering impactful partnerships and driving long-term growth.",
      quote:
        "Strategic partnerships are the key to unlocking global expansion.",
      image: "https://placehold.co/400x500/1a365d/ffffff?text=Jeihan+Winarta",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving Global Impact Through Strategic Vision and Expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {directors.map((director, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={director.image}
                  alt={director.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">{director.name}</h3>
                    <p className="text-white/80">{director.title}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-4">{director.bio}</p>
                <blockquote className="italic text-gray-600 border-l-4 border-blue-800 pl-4 py-2">
                  &quot;{director.quote}&quot;
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
