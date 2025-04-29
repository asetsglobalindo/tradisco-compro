import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModernTeamSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const directors = [
    {
      name: "Zulkifli Isa",
      title: "President Director",
      bio: "With over two decades of leadership in global trading and strategic investments, Zulkifli Isa is a renowned figure in navigating complex markets across Asia and the Middle East. His expertise in high-stakes negotiation and risk management has driven Tradisco's exponential growth in global trading sectors, establishing the company as a formidable player in the international market landscape.",
      quote:
        "Strategic leadership transforms challenges into global opportunities.",
      image: "/images/pak-zul.jpeg",
    },
    {
      name: "Wildan Pradana",
      title: "Shareholder",
      bio: "Wildan is a visionary leader with deep expertise in Mechanical Engineering and advanced knowledge in data management within digital ecosystems. His track record includes pioneering mechanical digital transformation initiatives and leading market entries across Southeast Asia. Wildan's approach focuses on integrating cutting-edge technologies to optimize operational efficiency and expand Tradisco's global digital footprint.",
      quote:
        "Innovation is the bridge that connects local potential with global success.",
      image: "/images/pak-wil.jpeg",
    },
    {
      name: "Ananda Syahputra",
      title: "Commissioner",
      bio: "Ananda Syahputra is a distinguished figure in the innovation and digital lifestyle sectors, driving dynamic projects and strengthening corporate governance strategies. His expertise lies in fostering creative, sustainable ideas and ensuring strategic alignment with global market trends. As Commissioner, Ananda provides critical oversight and guidance, ensuring Tradisco's ventures align with long-term growth objectives and global standards.",
      quote:
        "Strong governance is the foundation of sustainable global growth.",
      image:
        "https://placehold.co/800x1000/1a365d/ffffff?text=Ananda+Syahputra",
    },
    {
      name: "Ferdian Chaniago",
      title: "Representative of Holding & Strategic Development",
      bio: "Chaniago is a distinguished infrastructure expert, known for overseeing multiple strategic projects in the energy and construction sectors. With over 25 years of global experience, his leadership has been instrumental in elevating Tradisco's infrastructure portfolio, aligning each development with international standards and sustainable practices.",
      quote:
        "Building sustainable foundations is the cornerstone of lasting progress.",
      image:
        "https://placehold.co/800x1000/1a365d/ffffff?text=Ferdian+Chaniago",
    },
    {
      name: "Maria Widodo",
      title: "Director of Global Trading Operations",
      bio: "Maria brings a wealth of experience in global trading, with a proven track record in scaling trade networks and optimizing supply chain strategies across emerging markets. Her strategic foresight and operational excellence have positioned Tradisco at the forefront of global trading innovation.",
      quote: "In a dynamic world, agility in trading defines lasting success.",
      image: "/images/maria~_~.jpeg",
    },
    {
      name: "Jeihan Winarta",
      title: "Director of Strategic Partnerships & Investments",
      bio: "Jeihan is a prominent investment strategist known for fostering impactful partnerships and driving long-term growth. With extensive experience in capital markets and corporate finance, Jeihan plays a pivotal role in securing Tradisco's strategic alliances and enhancing its investment frameworks.",
      quote:
        "Strategic partnerships are the key to unlocking global expansion.",
      image: "https://placehold.co/800x1000/1a365d/ffffff?text=Jeihan+Winarta",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Board of Directors
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-blue-800 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Driving Global Impact Through Strategic Vision and Expertise
          </motion.p>
        </div>

        {/* Desktop View with Feature Card and Grid */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Feature Card - Left Side */}
          <div className="col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden h-full"
              >
                <div className="relative h-96">
                  <motion.img
                    src={directors[activeTab].image}
                    alt={directors[activeTab].name}
                    className="w-full h-full object-cover object-center"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                    <div className="p-8 text-white">
                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl font-bold mb-1"
                      >
                        {directors[activeTab].name}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl text-white/90 mb-4"
                      >
                        {directors[activeTab].title}
                      </motion.p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-700 text-lg mb-6 leading-relaxed"
                  >
                    {directors[activeTab].bio}
                  </motion.p>
                  <motion.blockquote
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="italic text-xl text-gray-800 border-l-4 border-blue-800 pl-6 py-2"
                  >
                    &quot;{directors[activeTab].quote}&quot;
                  </motion.blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grid of Other Directors - Right Side */}
          <div className="col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {directors.map((director, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`cursor-pointer overflow-hidden rounded-xl ${
                    activeTab === index
                      ? "ring-4 ring-blue-800 shadow-xl"
                      : "shadow-md hover:shadow-lg"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="relative aspect-[4/5]">
                    <img
                      src={director.image}
                      alt={director.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h4 className="text-sm font-bold">{director.name}</h4>
                        <p className="text-xs text-white/80">
                          {director.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet View with Carousel */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="relative h-80">
                <motion.img
                  src={directors[activeTab].image}
                  alt={directors[activeTab].name}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                  <div className="p-6 text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-2xl font-bold mb-1"
                    >
                      {directors[activeTab].name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="text-white/90"
                    >
                      {directors[activeTab].title}
                    </motion.p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-gray-700 mb-4"
                >
                  {directors[activeTab].bio}
                </motion.p>
                <motion.blockquote
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="italic text-gray-600 border-l-4 border-blue-800 pl-4 py-2"
                >
                  "{directors[activeTab].quote}"
                </motion.blockquote>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {directors.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`w-3 h-3 rounded-full ${
                  activeTab === index ? "bg-blue-800 w-6" : "bg-gray-300"
                }`}
                aria-label={`View director ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Thumbnails */}
          <div className="flex overflow-x-auto mt-6 pb-4 space-x-3 px-2">
            {directors.map((director, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex-none w-16 h-16 rounded-lg overflow-hidden cursor-pointer ${
                  activeTab === index ? "ring-2 ring-blue-800" : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                <img
                  src={director.image}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTeamSection;
